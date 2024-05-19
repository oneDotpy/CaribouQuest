import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  loginText: {
    fontFamily: FONT.bold,
    fontSize: 50,
    color: COLORS.primary,
    justifyContent: "center",
    alignContent: 'center',
    marginTop: 50
  },
  loginContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 50
  },
  loginImage: {
    objectFit: 'contain',
  },
  welcomeText: {
    fontFamily: FONT.bold,
    fontStyle: 'bold',
    fontSize: 28,
    marginTop: 29,
    alignContent: 'center'
  },
  signinText: {
    fontFamily: FONT.regular,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 85
  },
  singinInputContainer: {
    width: 340,
    height: 51,
    backgroundColor: COLORS.yellow1,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20
  },
  signinInputText: {
    marginTop: 15,
    marginLeft: 5
  },
  singinBtn: {
    width: 340,
    height: 51,
    backgroundColor: COLORS.yellow1,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 110
  },
  placeholderTxt : {
    fontFamily: FONT.medium,
    marginLeft: 10,
  },
  icon: {
    alignContent:"center",
    marginLeft: 300
  },
  singinBg: {
    width: 390,
    height: 292.24
  },
  userName: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    color: COLORS.secondary,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    marginTop: 2,
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
    color: COLORS.primary
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
});

export default styles;
