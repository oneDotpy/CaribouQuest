import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '75%',
  },
  nameText: {
    fontSize: 35,
    fontFamily: FONT.bold,
    marginTop: 15,
    marginLeft: 10
  },
  questText: {
    fontSize: 17,
    fontFamily: FONT.regular,
    marginTop: 0.2,
    marginLeft: 13
  },
  generateBtn: {
    width: 340,
    height: 51,
    backgroundColor: COLORS.yellow1,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 50,
    marginLeft: 20
  }
});

export default styles