import { StyleSheet } from "react-native"
import { Colors } from "./Colors"

module.exports = StyleSheet.create({
  mainContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.mainTheme,
  },
  description: {
    fontSize: 20,
    textAlign: 'center'
  },
  header: {
    fontFamily: 'Caveat_600SemiBold',
    fontSize: 40,
    textAlign: 'center',
  },
  folderHeader: {
    fontFamily: 'Caveat_600SemiBold',
    fontSize: 30,
  }
})