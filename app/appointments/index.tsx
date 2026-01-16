import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useData } from '../../context/DataContext';
import PrimaryButton from '../../components/PrimaryButton';

export default function Index() {
  const { appointments, removeAppointment, centers } = useData();
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Citas</Text>
      </View>

      <PrimaryButton text="Agendar cita" onPress={() => router.push('/appointments/schedule')} />

      <FlatList
        data={appointments}
        keyExtractor={(i) => i.id}
        style={{ width: '90%', marginTop: 20 }}
        ListEmptyComponent={() => <Text>No hay citas agendadas</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={{ fontWeight: '600' }}>{item.date}</Text>
            <Text>{centers.find((c) => c.id === item.centerId)?.name ?? 'Sin centro'}</Text>
            {item.notes ? <Text>{item.notes}</Text> : null}
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
              <TouchableOpacity onPress={() => Alert.alert('Eliminar', 'Eliminar esta cita?', [{ text: 'Cancelar' }, { text: 'Eliminar', style: 'destructive', onPress: () => removeAppointment(item.id) }])}>
                <Text style={{ color: 'red' }}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#A5D8FF' },
  header: { width: '90%', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#000' },
  title: { fontSize: 24, fontWeight: '600' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginBottom: 12 },
});
