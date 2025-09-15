import { StyleSheet,View, Text, Dimensions, Image, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Index() {
  const patients = [
    { id: 1, name: 'John Doe', photo: 'https://example.com/john.jpg' },
    { id: 2, name: 'Jane Smith', photo: 'https://example.com/jane.jpg' },
    { id: 3, name: 'Alice Johnson', photo: 'https://example.com/alice.jpg' },
    { id: 4, name: 'Bob Brown', photo: 'https://example.com/bob.jpg' },
    { id: 5, name: 'Charlie Davis', photo: 'https://example.com/charlie.jpg' },
    { id: 6, name: 'Diana Evans', photo: 'https://example.com/diana.jpg' },
  ];
  const [selectedPatient, setSelectedPatient] = useState<number | null>(null);
  const [caregiverId, setCaregiverId] = useState<string>('');
  const handlePatientSelect = (patient: { id: number; name: string; photo: string }) => {
    if(selectedPatient === patient.id) {
      setSelectedPatient(null);
      return;
    }
    setSelectedPatient(patient.id);
  };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Link Caregiver</Text>

                <View style={styles.icons}>
                    <MaterialIcons name="calendar-today" size={24} color="#333" style={styles.icon} />
                    <Ionicons name="mail-unread-outline" size={24} color="#333" />
                </View>
            </View>

            <View style={styles.patientContainer}>
                <Text style={styles.patientText}>
                    choose a patient to link with:
                </Text>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 20 }}
                >
                  <View style={styles.gridContainer}>
                    {patients.map((patient) => (
                      <View key={patient.id} style={{...styles.patientInfoContainer, opacity: selectedPatient === patient.id ? 0.5 : 1}} onTouchEnd={() => handlePatientSelect(patient)}>
                        <Image
                          source={require('../../assets/default-profile.webp')}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            backgroundColor: '#ffffff',
                          }}
                        />
                        <Text style={styles.patientName}>{patient.name}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
            </View>

            <View style={{alignItems: 'center', marginTop: 10, width: '90%', flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20}}>
              <TextInput
                placeholder="Enter caregiver ID"
                value={caregiverId}
                editable={selectedPatient !== null}
                onChangeText={setCaregiverId}
                style={{
                  borderWidth: 2,
                  borderColor: '#000000ff',
                  borderRadius: 20,
                  padding: 10,
                  width: '80%',
                  backgroundColor: selectedPatient !== null ? '#ffffff' : '#A5D8FF',
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  console.log(`Linking patient ID ${selectedPatient} with caregiver ID ${caregiverId}`);
                }}
                disabled={selectedPatient === null || caregiverId.trim() === ''}
              >
                <MaterialCommunityIcons name="qrcode-scan" size={32} color="black" style={{ opacity: selectedPatient === null ? 0.5 : 1 }} />
              </TouchableOpacity>
            </View>

            <View style={{width: '90%', borderColor: '#000000ff', borderWidth: 2, alignItems: 'center', flexDirection: 'row', padding: 10, borderRadius: 10, gap: 10, backgroundColor: '#48B0FF'}}>
                <Image
                  source={require('../../assets/default-profile.webp')}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 30,
                    backgroundColor: '#ffffff',
                  }}
                />
                <Text style={{textAlign: 'center', fontSize: 16}}>Profile Image</Text>
            </View>
        </SafeAreaView>
    );
}

const screenHeigth = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: screenHeigth * 0.02,
    backgroundColor: '#A5D8FF',
    alignItems: "center",
  },
  header: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-between", // separa título e iconos
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderColor: "#000000ff",
    borderBottomWidth: 1, // línea inferior
    borderBottomColor: "#000000ff",
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
  patientContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: "#000000ff",
    borderWidth: 1,
    height: screenHeigth * 0.3,
    maxHeight: screenHeigth * 0.3,
    marginBottom: 10,
  },
  patientText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    borderColor: "#000000ff",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  patientInfoContainer: {
    width: '40%',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: "#000000ff",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#E0F0FF',
  },
  patientName: {
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});