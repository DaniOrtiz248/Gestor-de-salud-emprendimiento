import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useData } from '../../context/DataContext';
import PrimaryButton from '../../components/PrimaryButton';
import { useRouter } from 'expo-router';

export default function Index() {
  const { medications, toggleMedicationTaken } = useData();
  const router = useRouter();

  const toPickUp = medications.filter((m) => m.toPickUp);
  const scheduled = medications.filter((m) => !m.toPickUp);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Medicamentos</Text></View>

      <PrimaryButton text="Agregar medicamento" onPress={() => router.push('/medications/schedule')} />

      <View style={{ width: '90%', marginTop: 16 }}>
        <Text style={{ fontWeight: '700' }}>Por reclamar</Text>
        {toPickUp.length === 0 ? <Text>Ninguno</Text> : (
          toPickUp.map((m) => (
            <View key={m.id} style={styles.card}>
              <Text style={{ fontWeight: '600' }}>{m.name}</Text>
            </View>
          ))
        )}

        <Text style={{ fontWeight: '700', marginTop: 12 }}>Horarios de administración</Text>
        <FlatList
          data={scheduled}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={{ fontWeight: '600' }}>{item.name}</Text>
              {item.schedule.map((t) => (
                <View key={t} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
                  <Text>{t}</Text>
                  <TouchableOpacity onPress={() => toggleMedicationTaken(item.id, t)}>
                    <Text style={{ color: item.taken[t] ? 'green' : '#007AFF' }}>{item.taken[t] ? 'Tomado' : 'Marcar como tomado'}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', backgroundColor: '#A5D8FF' },
  header: { width: '90%', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#000' },
  title: { fontSize: 24, fontWeight: '600' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginTop: 8 },
});
