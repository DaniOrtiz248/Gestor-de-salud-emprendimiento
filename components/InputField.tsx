import { Text, TextInput, View, StyleSheet } from 'react-native';

export default function InputField({ label, placeholder, keyboardType, onChangeText, style } : { label?: string; placeholder: string; keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad' | 'visible-password'; onChangeText: (text: string) => void, style?: object }) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={placeholder}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 25 },
  label: { fontSize: 18, fontWeight: '600'},
  input: {
    borderBottomWidth: 1,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingTop: 5,
    fontSize: 15,
  },
});
