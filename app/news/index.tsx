import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, FlatList, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import PrimaryButton from '../../components/PrimaryButton';

export default function Index() {
  const { news, addNews } = useData();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}><Text style={styles.title}>Noticias</Text></View>

      <View style={{ width: '90%', marginTop: 16 }}>
        <Text style={{ fontWeight: '600' }}>Crear noticia</Text>
        <TextInput placeholder="Título" value={title} onChangeText={setTitle} style={styles.input} />
        <TextInput placeholder="Contenido" value={content} onChangeText={setContent} style={[styles.input, { height: 80 }]} multiline />
        <PrimaryButton text="Publicar" onPress={() => { if (title && content) { addNews({ title, content }); setTitle(''); setContent(''); } }} />

        <Text style={{ fontWeight: '700', marginTop: 12 }}>Últimas noticias</Text>
        <FlatList
          data={news}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={{ fontWeight: '700' }}>{item.title}</Text>
              <Text>{item.content}</Text>
              <Text style={{ color: '#666', marginTop: 6 }}>{new Date(item.date).toLocaleString()}</Text>
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
