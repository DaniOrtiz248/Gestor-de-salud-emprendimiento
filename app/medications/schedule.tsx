import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useData } from '../../context/DataContext';
import PrimaryButton from '../../components/PrimaryButton';

export default function Schedule() {
  const { addMedication } = useData();
  const [name, setName] = useState('');
  const [toPickUp, setToPickUp] = useState(false);
  const [timesText, setTimesText] = useState('08:00,14:00');
  const router = useRouter();

  const onSubmit = () => {
    if (!name) return Alert.alert('Error', 'Ingrese nombre');
    const schedule = timesText.split(',').map((s) => s.trim()).filter(Boolean);
    addMedication({ name, toPickUp, schedule });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Agregar medicamento</Text></View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput placeholder="Nombre del medicamento" value={name} onChangeText={setName} style={styles.input} />

        <Text style={styles.label}>¿Por reclamar?</Text>
        <TouchableOpacity onPress={() => setToPickUp(!toPickUp)} style={{ marginBottom: 12 }}>
          <Text style={{ color: toPickUp ? 'green' : '#000' }}>{toPickUp ? 'Sí' : 'No'}</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Horarios (separados por coma)</Text>
        <TextInput placeholder="08:00,14:00" value={timesText} onChangeText={setTimesText} style={styles.input} />

        <PrimaryButton text="Guardar" onPress={onSubmit} style={{ marginTop: 16 }} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#A5D8FF' },
  header: { width: '90%', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#000' },
  title: { fontSize: 24, fontWeight: '600' },
  form: { width: '90%', marginTop: 20 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '600' },
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 6 },
});
