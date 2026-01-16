import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import PrimaryButton from '../../components/PrimaryButton';

export default function Index() {
  const { centers, addCenter } = useData();
  const [name, setName] = useState('');
  const [schedule, setSchedule] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Puntos de salud</Text></View>

      <View style={{ width: '90%', marginTop: 16 }}>
        <Text style={{ fontWeight: '600' }}>Agregar punto</Text>
        <TextInput placeholder="Nombre" value={name} onChangeText={setName} style={styles.input} />
        <TextInput placeholder="Horario" value={schedule} onChangeText={setSchedule} style={styles.input} />
        <PrimaryButton text="Agregar" onPress={() => { if (name && schedule) { addCenter({ name, schedule }); setName(''); setSchedule(''); } }} />

        <Text style={{ fontWeight: '700', marginTop: 12 }}>Listado</Text>
        <FlatList
          data={centers}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={{ fontWeight: '700' }}>{item.name}</Text>
              <Text>{item.schedule}</Text>
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
  input: { backgroundColor: '#fff', padding: 10, borderRadius: 6, marginVertical: 8 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 8, marginTop: 8 },
});
