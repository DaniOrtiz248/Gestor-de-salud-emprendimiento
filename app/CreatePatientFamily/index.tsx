import { View, Text, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import InputField from '../../components/InputField';
import PrimaryButton from '../../components/PrimaryButton';
import styles from '../../styles/createPatientStyle';

export default function Index() {
    const router = useRouter();
    const [selectedSex, setSelectedSex] = useState('');

    return (
        <SafeAreaView style={styles.container}>
          
            <View style={styles.header}>
                <Text style={styles.title}>Create Patient</Text>

                <View style={styles.icons}>
                    <MaterialIcons name="calendar-today" size={24} color="#333" style={styles.icon} />
                    <Ionicons name="mail-unread-outline" size={24} color="#333" />
                </View>

            </View>

            <KeyboardAvoidingView behavior='padding' style={styles.containerInput}>
                <ScrollView>

                  <InputField label="Patient Name" placeholder="Enter Patient Name" />
                  <InputField label="Patient Age" placeholder="Enter Patient Age" keyboardType="numeric" />
                  <InputField label="Patient ID" placeholder="Enter Patient ID" />

                  <Text style={[styles.textInput, { marginTop: 20 }]}>Patient Sex</Text>
                  <View style={{ borderWidth: 1, borderColor: '#000000', borderRadius: 5, marginTop: 5 }}>
                    <Picker
                        selectedValue={selectedSex}
                        onValueChange={(itemValue) => setSelectedSex(itemValue)}
                        style={styles.pickerStyle}
                    >
                        <Picker.Item label="Select Patient Sex" value="" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                    </Picker>
                  </View>

                  <InputField label="Patient Address" placeholder="Enter Patient Address" />
                  <InputField label="Patient Phone Number" placeholder="Enter Patient Phone Number" keyboardType="phone-pad" />

                  <Text style={[styles.textInput, { marginTop: 20 }]}>Patient Photo</Text>
                  <TouchableOpacity style={styles.buttonUpload}>
                      <Text>Upload Photo</Text>
                  </TouchableOpacity>

                  <View style={{ marginTop: 30, alignItems: 'center' }}>
                    <PrimaryButton text="CREATE PATIENT" onPress={() => router.push('')} style={{ marginBottom: 10 }} />
                    <PrimaryButton text="CANCEL" onPress={() => router.push('')} style={{ marginBottom: 10 }} />
                  </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
