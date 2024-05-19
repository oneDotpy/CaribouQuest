"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    generatedFooterComment: ()=>generatedFooterComment,
    mergeGitIgnorePaths: ()=>mergeGitIgnorePaths,
    removeGeneratedGitIgnoreContents: ()=>removeGeneratedGitIgnoreContents,
    mergeGitIgnoreContents: ()=>mergeGitIgnoreContents,
    upsertGitIgnoreContents: ()=>upsertGitIgnoreContents,
    createGeneratedHeaderComment: ()=>createGeneratedHeaderComment,
    getSanitizedGitIgnoreLines: ()=>getSanitizedGitIgnoreLines,
    createGitIgnoreHash: ()=>createGitIgnoreHash,
    removeFromGitIgnore: ()=>removeFromGitIgnore
});
function _crypto() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("crypto"));
    _crypto = function() {
        return data;
    };
    return data;
}
function _fs() {
    const data = /*#__PURE__*/ _interopRequireDefault(require("fs"));
    _fs = function() {
        return data;
    };
    return data;
}
const _log = require("../log");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const generatedHeaderPrefix = `# @generated expo-cli`;
const generatedFooterComment = `# @end expo-cli`;
function mergeGitIgnorePaths(targetGitIgnorePath, sourceGitIgnorePath) {
    if (!_fs().default.existsSync(targetGitIgnorePath)) {
        // No gitignore in the project already, no need to merge anything into anything. I guess they
        // are not using git :O
        return null;
    }
    if (!_fs().default.existsSync(sourceGitIgnorePath)) {
        // Maybe we don't have a gitignore in the template project
        return null;
    }
    const targetGitIgnore = _fs().default.readFileSync(targetGitIgnorePath).toString();
    const sourceGitIgnore = _fs().default.readFileSync(sourceGitIgnorePath).toString();
    const merged = mergeGitIgnoreContents(targetGitIgnore, sourceGitIgnore);
    // Only rewrite the file if it was modified.
    if (merged.contents) {
        _fs().default.writeFileSync(targetGitIgnorePath, merged.contents);
    }
    return merged;
}
/**
 * Get line indexes for the generated section of a gitignore.
 *
 * @param gitIgnore
 */ function getGeneratedSectionIndexes(gitIgnore) {
    const contents = gitIgnore.split("\n");
    const start = contents.findIndex((line)=>line.startsWith(generatedHeaderPrefix));
    const end = contents.findIndex((line)=>line.startsWith(generatedFooterComment));
    return {
        contents,
        start,
        end
    };
}
function removeGeneratedGitIgnoreContents(gitIgnore) {
    const { contents , start , end  } = getGeneratedSectionIndexes(gitIgnore);
    if (start > -1 && end > -1 && start < end) {
        contents.splice(start, end - start + 1);
        // TODO: We could in theory check that the contents we're removing match the hash used in the header,
        // this would ensure that we don't accidentally remove lines that someone added or removed from the generated section.
        return contents.join("\n");
    }
    return null;
}
function mergeGitIgnoreContents(targetGitIgnore, sourceGitIgnore) {
    const header = createGeneratedHeaderComment(sourceGitIgnore);
    if (!targetGitIgnore.includes(header)) {
        // Ensure the old generated gitignore contents are removed.
        const sanitizedTarget = removeGeneratedGitIgnoreContents(targetGitIgnore);
        return {
            contents: [
                sanitizedTarget != null ? sanitizedTarget : targetGitIgnore,
                header,
                `# The following patterns were generated by expo-cli`,
                ``,
                sourceGitIgnore,
                generatedFooterComment, 
            ].join("\n"),
            didMerge: true,
            didClear: !!sanitizedTarget
        };
    }
    return {
        contents: targetGitIgnore,
        didClear: false,
        didMerge: false
    };
}
function upsertGitIgnoreContents(targetGitIgnorePath, contents) {
    const targetGitIgnore = _fs().default.readFileSync(targetGitIgnorePath, {
        encoding: "utf-8",
        flag: "a+"
    });
    if (targetGitIgnore.match(new RegExp(`^${contents}[\\n\\r\\s]*$`, "m"))) {
        return null;
    }
    // If there is an existing section, update it with the new content
    if (targetGitIgnore.includes(generatedHeaderPrefix)) {
        const indexes = getGeneratedSectionIndexes(targetGitIgnore);
        contents = `${indexes.contents.slice(indexes.start + 3, indexes.end).join("\n")}\n${contents}`;
    }
    const merged = mergeGitIgnoreContents(targetGitIgnore, contents);
    if (merged.contents) {
        _fs().default.writeFileSync(targetGitIgnorePath, merged.contents);
    }
    return merged;
}
function createGeneratedHeaderComment(gitIgnore) {
    const hashKey = createGitIgnoreHash(getSanitizedGitIgnoreLines(gitIgnore).join("\n"));
    return `${generatedHeaderPrefix} ${hashKey}`;
}
function getSanitizedGitIgnoreLines(gitIgnore) {
    // filter, trim, and sort the lines.
    return gitIgnore.split("\n").filter((v)=>{
        const line = v.trim();
        // Strip comments
        if (line.startsWith("#")) {
            return false;
        }
        return !!line;
    }).sort();
}
function createGitIgnoreHash(gitIgnore) {
    // this doesn't need to be secure, the shorter the better.
    const hash = _crypto().default.createHash("sha1").update(gitIgnore).digest("hex");
    return `sync-${hash}`;
}
function removeFromGitIgnore(targetGitIgnorePath, contents) {
    try {
        if (!_fs().default.existsSync(targetGitIgnorePath)) {
            return;
        }
        let targetGitIgnore = _fs().default.readFileSync(targetGitIgnorePath, "utf-8");
        if (!targetGitIgnore.includes(contents)) {
            return null;
        }
        targetGitIgnore = targetGitIgnore.replace(`${contents}\n`, "");
        const indexes = getGeneratedSectionIndexes(targetGitIgnore);
        if (indexes.start === indexes.end - 3) {
            targetGitIgnore = targetGitIgnore.replace(new RegExp(`^${generatedHeaderPrefix}((.|\n)*)${generatedFooterComment}$`, "m"), "");
        }
        return _fs().default.writeFileSync(targetGitIgnorePath, targetGitIgnore);
    } catch (error) {
        _log.Log.error(`Failed to read/write to .gitignore path: ${targetGitIgnorePath}`);
        throw error;
    }
}

//# sourceMappingURL=mergeGitIgnorePaths.js.map