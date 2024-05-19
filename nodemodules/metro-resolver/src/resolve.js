"use strict";

var _FailedToResolveNameError = _interopRequireDefault(
  require("./errors/FailedToResolveNameError")
);
var _FailedToResolvePathError = _interopRequireDefault(
  require("./errors/FailedToResolvePathError")
);
var _formatFileCandidates = _interopRequireDefault(
  require("./errors/formatFileCandidates")
);
var _InvalidPackageConfigurationError = _interopRequireDefault(
  require("./errors/InvalidPackageConfigurationError")
);
var _InvalidPackageError = _interopRequireDefault(
  require("./errors/InvalidPackageError")
);
var _PackagePathNotExportedError = _interopRequireDefault(
  require("./errors/PackagePathNotExportedError")
);
var _PackageExportsResolve = require("./PackageExportsResolve");
var _PackageResolve = require("./PackageResolve");
var _resolveAsset = _interopRequireDefault(require("./resolveAsset"));
var _isAssetFile = _interopRequireDefault(require("./utils/isAssetFile"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
function resolve(context, moduleName, platform) {
  const resolveRequest = context.resolveRequest;
  if (resolveRequest && resolveRequest !== resolve) {
    return resolveRequest(
      Object.freeze({
        ...context,
        resolveRequest: resolve,
      }),
      moduleName,
      platform
    );
  }
  if (isRelativeImport(moduleName) || _path.default.isAbsolute(moduleName)) {
    const result = resolveModulePath(context, moduleName, platform);
    if (result.type === "failed") {
      throw new _FailedToResolvePathError.default(result.candidates);
    }
    return result.resolution;
  }
  const realModuleName = context.redirectModulePath(moduleName);
  if (realModuleName === false) {
    return {
      type: "empty",
    };
  }
  const { originModulePath } = context;
  const isDirectImport =
    isRelativeImport(realModuleName) ||
    _path.default.isAbsolute(realModuleName);
  if (isDirectImport) {
    const fromModuleParentIdx =
      originModulePath.lastIndexOf("node_modules" + _path.default.sep) + 13;
    const originModuleDir = originModulePath.slice(
      0,
      originModulePath.indexOf(_path.default.sep, fromModuleParentIdx)
    );
    const absPath = _path.default.join(originModuleDir, realModuleName);
    const result = resolveModulePath(context, absPath, platform);
    if (result.type === "failed") {
      throw new _FailedToResolvePathError.default(result.candidates);
    }
    return result.resolution;
  }
  if (context.allowHaste && !isDirectImport) {
    const normalizedName = normalizePath(realModuleName);
    const result = resolveHasteName(context, normalizedName, platform);
    if (result.type === "resolved") {
      return result.resolution;
    }
  }
  const { disableHierarchicalLookup } = context;
  const nodeModulesPaths = [];
  let next = _path.default.dirname(originModulePath);
  if (!disableHierarchicalLookup) {
    let candidate;
    do {
      candidate = next;
      nodeModulesPaths.push(_path.default.join(candidate, "node_modules"));
      next = _path.default.dirname(candidate);
    } while (candidate !== next);
  }
  nodeModulesPaths.push(...context.nodeModulesPaths);
  const extraPaths = [];
  const { extraNodeModules } = context;
  if (extraNodeModules) {
    let bits = _path.default.normalize(moduleName).split(_path.default.sep);
    let packageName;
    if (bits.length >= 2 && bits[0].startsWith("@")) {
      packageName = bits.slice(0, 2).join("/");
      bits = bits.slice(1);
    } else {
      packageName = bits[0];
    }
    if (extraNodeModules[packageName]) {
      bits[0] = extraNodeModules[packageName];
      extraPaths.push(_path.default.join.apply(_path.default, bits));
    }
  }
  const allDirPaths = nodeModulesPaths
    .map((nodeModulePath) => _path.default.join(nodeModulePath, realModuleName))
    .concat(extraPaths);
  for (let i = 0; i < allDirPaths.length; ++i) {
    const candidate = context.redirectModulePath(allDirPaths[i]);
    if (candidate === false) {
      return {
        type: "empty",
      };
    }
    const result = resolvePackage(context, candidate, platform);
    if (result.type === "resolved") {
      return result.resolution;
    }
  }
  throw new _FailedToResolveNameError.default(nodeModulesPaths, extraPaths);
}
function resolveModulePath(context, toModuleName, platform) {
  const modulePath = _path.default.isAbsolute(toModuleName)
    ? resolveWindowsPath(toModuleName)
    : _path.default.join(
        _path.default.dirname(context.originModulePath),
        toModuleName
      );
  const redirectedPath = context.redirectModulePath(modulePath);
  if (redirectedPath === false) {
    return resolvedAs({
      type: "empty",
    });
  }
  const dirPath = _path.default.dirname(redirectedPath);
  const fileName = _path.default.basename(redirectedPath);
  const fileResult = resolveFile(context, dirPath, fileName, platform);
  if (fileResult.type === "resolved") {
    return fileResult;
  }
  const dirResult = resolvePackageEntryPoint(context, redirectedPath, platform);
  if (dirResult.type === "resolved") {
    return dirResult;
  }
  return failedFor({
    file: fileResult.candidates,
    dir: dirResult.candidates,
  });
}
function resolveHasteName(context, moduleName, platform) {
  const modulePath = context.resolveHasteModule(moduleName);
  if (modulePath != null) {
    return resolvedAs({
      type: "sourceFile",
      filePath: modulePath,
    });
  }
  let packageName = moduleName;
  let packageJsonPath = context.resolveHastePackage(packageName);
  while (packageJsonPath == null && packageName && packageName !== ".") {
    packageName = _path.default.dirname(packageName);
    packageJsonPath = context.resolveHastePackage(packageName);
  }
  if (packageJsonPath == null) {
    return failedFor();
  }
  const packageDirPath = _path.default.dirname(packageJsonPath);
  const pathInModule = moduleName.substring(packageName.length + 1);
  const potentialModulePath = _path.default.join(packageDirPath, pathInModule);
  const result = resolvePackage(context, potentialModulePath, platform);
  if (result.type === "resolved") {
    return result;
  }
  const { candidates } = result;
  const opts = {
    moduleName,
    packageName,
    pathInModule,
    candidates,
  };
  throw new MissingFileInHastePackageError(opts);
}
class MissingFileInHastePackageError extends Error {
  constructor(opts) {
    super(
      `While resolving module \`${opts.moduleName}\`, ` +
        `the Haste package \`${opts.packageName}\` was found. However the ` +
        `module \`${opts.pathInModule}\` could not be found within ` +
        "the package. Indeed, none of these files exist:\n\n" +
        `  * \`${(0, _formatFileCandidates.default)(
          opts.candidates.file
        )}\`\n` +
        `  * \`${(0, _formatFileCandidates.default)(opts.candidates.dir)}\``
    );
    Object.assign(this, opts);
  }
}
function resolvePackage(context, modulePath, platform) {
  if (context.unstable_enablePackageExports) {
    const pkg = context.getPackageForModule(modulePath);
    const exportsField = pkg?.packageJson.exports;
    if (pkg != null && exportsField != null) {
      let conditionNamesOverride = context.unstable_conditionNames;
      if (pkg.packageJson.name === "@babel/runtime") {
        conditionNamesOverride = context.unstable_conditionNames.filter(
          (condition) => condition !== "import"
        );
      }
      try {
        const packageExportsResult = (0,
        _PackageExportsResolve.resolvePackageTargetFromExports)(
          {
            ...context,
            unstable_conditionNames: conditionNamesOverride,
          },
          pkg.rootPath,
          modulePath,
          exportsField,
          platform
        );
        if (packageExportsResult != null) {
          return resolvedAs(packageExportsResult);
        }
      } catch (e) {
        if (e instanceof _PackagePathNotExportedError.default) {
          context.unstable_logWarning(
            e.message +
              " Falling back to file-based resolution. Consider updating the " +
              "call site or asking the package maintainer(s) to expose this API."
          );
        } else if (e instanceof _InvalidPackageConfigurationError.default) {
          context.unstable_logWarning(
            e.message + " Falling back to file-based resolution."
          );
        } else {
          throw e;
        }
      }
    }
  }
  return resolveModulePath(context, modulePath, platform);
}
function resolvePackageEntryPoint(context, packagePath, platform) {
  const packageJsonPath = _path.default.join(packagePath, "package.json");
  if (!context.doesFileExist(packageJsonPath)) {
    return resolveFile(context, packagePath, "index", platform);
  }
  const packageInfo = {
    rootPath: _path.default.dirname(packageJsonPath),
    packageJson: context.getPackage(packageJsonPath) ?? {},
  };
  const mainModulePath = _path.default.join(
    packageInfo.rootPath,
    (0, _PackageResolve.getPackageEntryPoint)(context, packageInfo, platform)
  );
  const fileResult = resolveFile(
    context,
    _path.default.dirname(mainModulePath),
    _path.default.basename(mainModulePath),
    platform
  );
  if (fileResult.type === "resolved") {
    return fileResult;
  }
  const indexResult = resolveFile(context, mainModulePath, "index", platform);
  if (indexResult.type !== "resolved") {
    throw new _InvalidPackageError.default({
      packageJsonPath,
      mainModulePath,
      fileCandidates: fileResult.candidates,
      indexCandidates: indexResult.candidates,
    });
  }
  return indexResult;
}
function resolveFile(context, dirPath, fileName, platform) {
  if ((0, _isAssetFile.default)(fileName, context.assetExts)) {
    const assetResolutions = (0, _resolveAsset.default)(
      context,
      _path.default.join(dirPath, fileName)
    );
    if (assetResolutions == null) {
      return failedFor({
        type: "asset",
        name: fileName,
      });
    }
    return resolvedAs(assetResolutions);
  }
  const candidateExts = [];
  const filePathPrefix = _path.default.join(dirPath, fileName);
  const sfContext = {
    ...context,
    candidateExts,
    filePathPrefix,
  };
  const sourceFileResolution = resolveSourceFile(sfContext, platform);
  if (sourceFileResolution != null) {
    if (typeof sourceFileResolution === "string") {
      return resolvedAs({
        type: "sourceFile",
        filePath: sourceFileResolution,
      });
    }
    return resolvedAs(sourceFileResolution);
  }
  return failedFor({
    type: "sourceFile",
    filePathPrefix,
    candidateExts,
  });
}
function resolveSourceFile(context, platform) {
  let filePath = resolveSourceFileForAllExts(context, "");
  if (filePath) {
    return filePath;
  }
  const { sourceExts } = context;
  for (let i = 0; i < sourceExts.length; i++) {
    const ext = `.${sourceExts[i]}`;
    filePath = resolveSourceFileForAllExts(context, ext, platform);
    if (filePath != null) {
      return filePath;
    }
  }
  return null;
}
function resolveSourceFileForAllExts(context, sourceExt, platform) {
  if (platform != null) {
    const ext = `.${platform}${sourceExt}`;
    const filePath = resolveSourceFileForExt(context, ext);
    if (filePath) {
      return filePath;
    }
  }
  if (context.preferNativePlatform && sourceExt !== "") {
    const filePath = resolveSourceFileForExt(context, `.native${sourceExt}`);
    if (filePath) {
      return filePath;
    }
  }
  const filePath = resolveSourceFileForExt(context, sourceExt);
  return filePath;
}
function resolveSourceFileForExt(context, extension) {
  const filePath = `${context.filePathPrefix}${extension}`;
  const redirectedPath =
    extension !== "" ? context.redirectModulePath(filePath) : filePath;
  if (redirectedPath === false) {
    return {
      type: "empty",
    };
  }
  if (context.unstable_getRealPath) {
    const maybeRealPath = context.unstable_getRealPath(redirectedPath);
    if (maybeRealPath != null) {
      return maybeRealPath;
    }
  } else if (context.doesFileExist(redirectedPath)) {
    return redirectedPath;
  }
  context.candidateExts.push(extension);
  return null;
}
function resolveWindowsPath(modulePath) {
  if (_path.default.sep !== "\\") {
    return modulePath;
  }
  return _path.default.resolve(modulePath);
}
function isRelativeImport(filePath) {
  return /^[.][.]?(?:[/]|$)/.test(filePath);
}
function normalizePath(modulePath) {
  if (_path.default.sep === "/") {
    modulePath = _path.default.normalize(modulePath);
  } else if (_path.default.posix) {
    modulePath = _path.default.posix.normalize(modulePath);
  }
  return modulePath.replace(/\/$/, "");
}
function resolvedAs(resolution) {
  return {
    type: "resolved",
    resolution,
  };
}
function failedFor(candidates) {
  return {
    type: "failed",
    candidates,
  };
}
module.exports = resolve;
