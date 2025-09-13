import { StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('window').height;
const fontSizePlaceholder = 15;

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeight * 0.02,
    backgroundColor: '#A5D8FF',
    alignItems: "center",
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#000000ff",
    borderBottomWidth: 1, 
    borderBottomColor: "#000000ff",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "500",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  containerInput: {
    width: "90%",
    alignSelf: "center",
    height: screenHeight * 0.6,
  },
  textInput: {
    fontSize: 18,
    fontWeight: "600",
  },
  pickerStyle: {
    height: 50,
    width: "100%",
    fontSize: fontSizePlaceholder,
  },
  buttonUpload: {
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    width: '50%',
    borderWidth: 1,
    borderColor: '#000000',
  },
});
