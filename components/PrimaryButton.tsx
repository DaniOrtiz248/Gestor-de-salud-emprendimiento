import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function PrimaryButton({ text, onPress, style } : { text: string; onPress: () => void; style?: object }) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

const fontFamilyButton = 'Nunito-Bold';
const fontSizeTitle = 16;
const fontWeightTitle = '600';
const lineHeightTitle = 22;
const letterSpacingTitle = 0.5;
const textTransformTitle = 'uppercase';

const styles = StyleSheet.create({
  button: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
    width: '60%',
    backgroundColor: '#000',
  },
  text: {
    color: '#fff',
    fontFamily: fontFamilyButton,
    fontSize: fontSizeTitle,
    fontWeight: fontWeightTitle,
    lineHeight: lineHeightTitle,
    letterSpacing: letterSpacingTitle,
    textTransform: textTransformTitle,
  },
});
