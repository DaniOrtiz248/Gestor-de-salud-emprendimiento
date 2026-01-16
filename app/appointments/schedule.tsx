import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useData } from '../../context/DataContext';
import PrimaryButton from '../../components/PrimaryButton';

export default function Schedule() {
  const { addAppointment, centers } = useData();
  const [date, setDate] = useState('');
  const [centerId, setCenterId] = useState<string | undefined>(centers[0]?.id);
  const [notes, setNotes] = useState('');
  const router = useRouter();

  const onSubmit = () => {
    if (!date) return Alert.alert('Error', 'Ingrese fecha y hora');
    addAppointment({ date, centerId, notes });
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Agendar cita</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Fecha y hora</Text>
        <TextInput placeholder="YYYY-MM-DD HH:MM" value={date} onChangeText={setDate} style={styles.input} />

        <Text style={styles.label}>Centro</Text>
        <View style={{ backgroundColor: '#fff', borderRadius: 6, padding: 8 }}>
          {centers.map((c) => (
            <TouchableOpacity key={c.id} onPress={() => setCenterId(c.id)} style={{ paddingVertical: 6 }}>
              <Text style={{ color: centerId === c.id ? '#007AFF' : '#000' }}>{c.name} - {c.schedule}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Notas</Text>
        <TextInput placeholder="Notas" value={notes} onChangeText={setNotes} style={styles.input} />

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
