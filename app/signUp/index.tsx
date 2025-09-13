import { Text, TextInput, Image, KeyboardAvoidingView, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import InputField from '../../components/InputField';
import styles from '../../styles/signUpStyle';
import PrimaryButton from '../../components/PrimaryButton';
import Entypo from '@expo/vector-icons/Entypo';

export default function Index() {

  const router = useRouter()
  const [userEmail, setUserEmail] = useState('')
  const [rol, setRol] = useState('select')
  const [userPassword, setUserPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.containerScroll} contentContainerStyle={{alignItems: 'center'}}>
        
        <View style={styles.arrowLeft}>
          <Entypo name="chevron-left" size={24} color="black" onPress={() => router.navigate('/')} />
        </View>
        <Image
          style={styles.logo}
          source={require('../../assets/logo-jados.png')}
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

          <InputField
            label="Name"
            placeholder="Enter name"  
            onChangeText={setUserEmail}
            keyboardType='default'
          />

          <Text style={styles.textInput}>Rol</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={rol}
              style={styles.picker}
              onValueChange={(itemValue) => setRol(itemValue)}
            >
              <Picker.Item label="Select" value="select" />
              <Picker.Item label="Cuidador" value="cuidador" />
              <Picker.Item label="Familiar" value="familiar" />
            </Picker>
          </View>

          <InputField
            label='Phone Number'
            placeholder='Enter phone number'
            onChangeText={setUserEmail}
            keyboardType='phone-pad'
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

          <Text style={styles.textInput}>Confirm Password</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder='Re-enter your password'
              onChangeText={setUserPassword}
              keyboardType='visible-password'
              style={styles.inputStylePassword}
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <MaterialIcons name={showConfirmPassword ? "visibility" : "visibility-off"} size={20} color="#000" />
            </TouchableOpacity>
          </View>
          
        </KeyboardAvoidingView>

        <PrimaryButton text="SIGN UP" onPress={() => router.navigate('/')} style={{marginTop: 30, marginBottom: 30}} />

        <View style={styles.containerView}>
          <View style={styles.childView}></View>
          <Text>SIGN UP WITH</Text>
          <View style={styles.childView}></View>
        </View>

        <Image
          style={styles.googleIcon}
          source={require('../../assets/icon-google-48.png')}
        />

        <Text style={[styles.textSubtitle, styles.textForgot]} >Have an account? <Link style={styles.textSignUp} href="/">Sign In</Link></Text>
      </ScrollView>
    </SafeAreaView>
  );
}

