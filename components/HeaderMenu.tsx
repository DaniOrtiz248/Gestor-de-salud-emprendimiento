import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Modal, SafeAreaView } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HeaderMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const go = (path: string) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <>
      <SafeAreaView pointerEvents="box-none" style={styles.safe}>
        <View style={styles.floatingContainer} pointerEvents="box-none">
          <TouchableOpacity onPress={() => setOpen(true)} style={styles.floatingButton}>
            <MaterialIcons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal visible={open} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Menú</Text>
            <TouchableOpacity style={styles.item} onPress={() => go('/appointments')}>
              <MaterialCommunityIcons name="calendar" size={20} color="#000" />
              <Text style={styles.itemText}>Citas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => go('/medications')}>
              <MaterialCommunityIcons name="pill" size={20} color="#000" />
              <Text style={styles.itemText}>Medicamentos</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => go('/news')}>
              <MaterialIcons name="article" size={20} color="#000" />
              <Text style={styles.itemText}>Noticias</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => go('/centers')}>
              <MaterialIcons name="place" size={20} color="#000" />
              <Text style={styles.itemText}>Puntos de salud</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.item, { marginTop: 12 }]} onPress={() => setOpen(false)}>
              <Text style={{ color: '#007AFF' }}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  safe: { position: 'absolute', top: 0, right: 0, left: 0, zIndex: 50 },
  floatingContainer: { position: 'absolute', top: 12, right: 12, zIndex: 60, alignItems: 'flex-end' },
  floatingButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#5C6B73', justifyContent: 'center', alignItems: 'center', elevation: 6 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)', justifyContent: 'center', padding: 20 },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 12 },
  modalTitle: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  itemText: { marginLeft: 12, fontSize: 16 },
});
