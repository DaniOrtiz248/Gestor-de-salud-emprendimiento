import { Text, TextInput, Image, KeyboardAvoidingView, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import InputField from '../components/InputField';
import PrimaryButton from '../components/PrimaryButton';
import styles from '../styles/signInStyle';

export default function Index() {

  const router = useRouter()
  const { login } = useAuth()
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      
      <Image
        style={styles.logo}
        source={require('../assets/logo-jados.png')}
      />

      <KeyboardAvoidingView
        behavior='padding'
        style={styles.containerInput}
      >

        <InputField
          label="E-Mail"
          placeholder="Enter Email address"
          onChangeText={setUserEmail}
          keyboardType="email-address"
        />

        <Text style={styles.textInput}>Password</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder='Enter Password'
            onChangeText={setUserPassword}
            keyboardType='visible-password'
            style={styles.inputStylePassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        
      </KeyboardAvoidingView>

      <Text style={[styles.textSubtitle, styles.textForgot]} >Forget Password?</Text>

      <PrimaryButton text='SIGN IN' onPress={() => {login(), router.navigate('/dashboardFamily')}} style={{marginBottom: 20}} />

      <View style={styles.containerView}>
        <View style={styles.childView}></View>
        <Text>SIGN IN WITH</Text>
        <View style={styles.childView}></View>
      </View>

      <Image
        style={styles.googleIcon}
        source={require('../assets/icon-google-48.png')}
      />

      <Text style={[styles.textSubtitle, styles.textForgot]} >Don't have an account? <Link style={styles.textSignUp} href="/signUp">Sign up</Link></Text>

    </SafeAreaView>
  );
}