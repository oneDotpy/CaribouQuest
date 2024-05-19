import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileImg: {
    marginTop:20
  },
  usernameTxt: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xxLarge,
    marginTop: 20
  },
  lvlTxt: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    marginTop: 20
  },
  lvlExpTxt: {
    fontFamily: FONT.regular,
    fontSize: SIZES.small,
    marginTop: 5
  },
  emailTxt: {
    fontFamily: FONT.regular,
    fontSize: SIZES.large,
    marginTop: 20
  },
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: SIZES.medium,
    marginTop: 150
  },
  logoImage: {
    width: "30%",
    height: "30%",
    marginTop: 5,
    marginLeft: -40
  },
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  
  
});

export default styles