import { StyleSheet, Dimensions } from 'react-native'

const screenWidth = Dimensions.get('window').width
const screenHeigth = Dimensions.get('window').height
const fontFamilyText = 'Nunito-SemiBold'
const fontSizePlaceholder = 15
const fontSizeSubtitle = 13

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeigth * 0.1,
    backgroundColor: '#A5D8FF',
    alignItems: 'center',
  },
  logo: {
    height: 50,
    objectFit: 'contain',
    marginBottom: screenHeigth * 0.05
  },
  containerInput: {
    width: screenWidth * 0.8
  },
  textInput: {
    marginTop: 30,
    fontSize: 18,
    fontWeight: '600',
  },
  textSubtitle: {
    fontFamily: fontFamilyText,
    fontSize: fontSizeSubtitle
  },
  textForgot: {
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 30
  },
  textSignUp: {
    color: '#2600FF'
  },
  googleIcon: {
    height: 35,
    objectFit: 'contain',
    marginBottom: 20
  },
  childView: {
    height: 2,
    width: screenWidth * 0.15,
    backgroundColor: '#000000',
    marginHorizontal: 10
  },
  containerView: {
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',    
    justifyContent: 'center',
    marginBottom: 10
  },
  inputWrapper:{
    flexDirection: 'row',
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    marginBottom: 30
  },
  inputStylePassword: {
    flex: 1,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingTop: 5,
    fontSize: fontSizePlaceholder,
    fontFamily: fontFamilyText
  },
});