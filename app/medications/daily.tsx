import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useData } from '../../context/DataContext';

const screenHeight = Dimensions.get('window').height;

export default function DailyMedications() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
  });

  const { medications, toggleMedicationTaken } = useData();
  const [selectedMed, setSelectedMed] = useState<string | null>(null);

  // Group by status
  const toPickUpMeds = useMemo(() => medications.filter(m => m.toPickUp), [medications]);
  const activeMeds = useMemo(() => medications.filter(m => !m.toPickUp), [medications]);

  // Calculate progress
  const totalDoses = useMemo(() => {
    return activeMeds.reduce((acc, med) => acc + med.schedule.length, 0);
  }, [activeMeds]);

  const takenDoses = useMemo(() => {
    return activeMeds.reduce((acc, med) => {
      const taken = med.schedule.filter(time => med.taken[time]).length;
      return acc + taken;
    }, 0);
  }, [activeMeds]);

  const progressPercent = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 0;

  const handleSync = () => {
    Alert.alert(
      "Sincronizar con Historia Clínica",
      "Esta función se conectará con el sistema de la EPS para obtener los medicamentos más recientes de tu historia clínica.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sincronizar", onPress: () => {
          // TODO: Implement sync with medical history API
          Alert.alert("Sincronizado", "Medicamentos actualizados desde historia clínica");
        }}
      ]
    );
  };

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1d1d1d" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.subtitle}>Medicamentos</Text>
          <Text style={styles.title}>Hoy</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressHeader}>
            <MaterialCommunityIcons name="pill" size={28} color="#48B0FF" />
            <View style={{ flex: 1 }}>
              <Text style={styles.progressTitle}>Progreso del día</Text>
              <Text style={styles.progressSubtitle}>{takenDoses} de {totalDoses} dosis tomadas</Text>
            </View>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/medications/schedule')}
          >
            <MaterialIcons name="add-circle" size={20} color="#48B0FF" />
            <Text style={styles.actionButtonText}>Agregar</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={handleSync}
          >
            <MaterialIcons name="sync" size={20} color="#5C6B73" />
            <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>Sincronizar</Text>
          </TouchableOpacity>
        </View>

          {/* To Pick Up Section */}
          {toPickUpMeds.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="hospital-box" size={22} color="#5C6B73" />
                <Text style={styles.sectionTitle}>Por reclamar</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{toPickUpMeds.length}</Text>
                </View>
              </View>
              {toPickUpMeds.map(med => (
                <TouchableOpacity 
                  key={med.id} 
                  style={styles.pickupCard}
                  onPress={() => setSelectedMed(selectedMed === med.id ? null : med.id)}
                >
                  <View style={styles.pickupHeader}>
                    <View style={styles.pickupIconCircle}>
                      <MaterialCommunityIcons name="alert-circle" size={24} color="#f59e0b" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.pickupName}>{med.name}</Text>
                      {med.dosage && <Text style={styles.pickupDosage}>{med.dosage}</Text>}
                      {med.purpose && <Text style={styles.pickupPurpose}>{med.purpose}</Text>}
                    </View>
                    <MaterialIcons 
                      name={selectedMed === med.id ? "expand-less" : "expand-more"} 
                      size={24} 
                      color="#666" 
                    />
                  </View>

                  {selectedMed === med.id && (
                    <View style={styles.expandedContent}>
                      {med.instructions && (
                        <View style={styles.infoRow}>
                          <MaterialIcons name="info-outline" size={16} color="#5C6B73" />
                          <Text style={styles.infoText}>{med.instructions}</Text>
                        </View>
                      )}
                      <View style={styles.infoRow}>
                        <MaterialIcons name="access-time" size={16} color="#5C6B73" />
                        <Text style={styles.infoText}>Horarios: {med.schedule.join(', ')}</Text>
                      </View>
                      <TouchableOpacity style={styles.pickupButton}>
                        <MaterialCommunityIcons name="hospital-box" size={18} color="#fff" />
                        <Text style={styles.pickupButtonText}>Ir a reclamar</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Active Medications Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="pill" size={22} color="#5C6B73" />
              <Text style={styles.sectionTitle}>Medicamentos activos</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{activeMeds.length}</Text>
              </View>
            </View>

            {activeMeds.length === 0 ? (
              <View style={styles.emptyCard}>
                <MaterialCommunityIcons name="pill-off" size={40} color="#ccc" />
                <Text style={styles.empty}>No hay medicamentos activos</Text>
              </View>
            ) : (
              activeMeds.map(med => (
                <TouchableOpacity 
                  key={med.id} 
                  style={styles.medCard}
                  onPress={() => setSelectedMed(selectedMed === med.id ? null : med.id)}
                >
                  <View style={styles.medHeader}>
                    <View style={styles.medIconCircle}>
                      <MaterialCommunityIcons name="pill" size={24} color="#48B0FF" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.medName}>{med.name}</Text>
                      {med.dosage && <Text style={styles.medDosage}>{med.dosage}</Text>}
                      {med.quantity !== undefined && (
                        <View style={styles.quantityRow}>
                          <MaterialCommunityIcons name="package-variant" size={14} color="#5C6B73" />
                          <Text style={styles.quantityText}>
                            {med.quantity} {med.quantity === 1 ? 'unidad' : 'unidades'}
                          </Text>
                        </View>
                      )}
                    </View>
                    <MaterialIcons 
                      name={selectedMed === med.id ? "expand-less" : "expand-more"} 
                      size={24} 
                      color="#666" 
                    />
                  </View>

                  {selectedMed === med.id && (
                    <View style={styles.expandedContent}>
                      {med.purpose && (
                        <View style={styles.purposeContainer}>
                          <MaterialCommunityIcons name="medical-bag" size={16} color="#48B0FF" />
                          <Text style={styles.purposeText}>{med.purpose}</Text>
                        </View>
                      )}

                      {med.instructions && (
                        <View style={styles.instructionsContainer}>
                          <MaterialIcons name="info-outline" size={16} color="#5C6B73" />
                          <Text style={styles.instructionsText}>{med.instructions}</Text>
                        </View>
                      )}

                      <View style={styles.scheduleSection}>
                        <Text style={styles.scheduleLabel}>Horarios de hoy</Text>
                        {med.schedule.map(time => (
                          <View key={time} style={styles.scheduleRow}>
                            <View style={styles.timeContainer}>
                              <MaterialIcons name="access-time" size={16} color="#48B0FF" />
                              <Text style={styles.timeText}>{time}</Text>
                            </View>
                            <TouchableOpacity 
                              style={[styles.statusButton, med.taken[time] && styles.statusButtonTaken]}
                              onPress={() => toggleMedicationTaken(med.id, time)}
                            >
                              {med.taken[time] ? (
                                <>
                                  <MaterialIcons name="check-circle" size={16} color="#2d5c4f" />
                                  <Text style={styles.statusTextTaken}>Tomado</Text>
                                </>
                              ) : (
                                <>
                                  <MaterialCommunityIcons name="pill" size={16} color="#9b6b00" />
                                  <Text style={styles.statusTextPending}>Marcar como tomado</Text>
                                </>
                              )}
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ))
            )}
          </View>

          <View style={{ height: 100 }} />
      </ScrollView>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5D8FF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: screenHeight * 0.02,
    paddingBottom: 16,
    backgroundColor: '#A5D8FF',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 12,
    color: '#5C6B73',
    marginBottom: 2,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: '#1d1d1d',
  },
  progressCard: {
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  progressSubtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  progressPercent: {
    fontSize: 24,
    fontWeight: '700',
    color: '#48B0FF',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E8F5FD',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#48B0FF',
    borderRadius: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5FD',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: '#48B0FF',
  },
  actionButtonSecondary: {
    backgroundColor: '#fff',
    borderColor: '#5C6B73',
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#48B0FF',
  },
  actionButtonTextSecondary: {
    color: '#5C6B73',
  },
  section: { 
    paddingHorizontal: 20,
    marginBottom: 24 
  },
  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12, 
    gap: 8 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1d1d1d',
    flex: 1,
  },
  badge: {
    backgroundColor: '#5C6B73',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyCard: {
    backgroundColor: '#fff',
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  empty: { 
    color: '#999', 
    marginTop: 8, 
    fontSize: 14 
  },
  pickupCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  pickupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pickupIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  pickupDosage: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  pickupPurpose: {
    fontSize: 12,
    color: '#5C6B73',
    marginTop: 4,
  },
  medCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  medHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  medIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#E8F5FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  medDosage: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  quantityText: {
    fontSize: 12,
    color: '#5C6B73',
    fontWeight: '600',
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  purposeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#E8F5FD',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  purposeText: {
    flex: 1,
    fontSize: 13,
    color: '#48B0FF',
    fontWeight: '600',
  },
  instructionsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#F8FAFB',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  instructionsText: {
    flex: 1,
    fontSize: 13,
    color: '#5C6B73',
  },
  scheduleSection: {
    gap: 10,
  },
  scheduleLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5C6B73',
    marginBottom: 4,
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  timeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1d1d1d',
  },
  statusButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: '#FFE8CC',
  },
  statusButtonTaken: {
    backgroundColor: '#B4E1D6',
  },
  statusTextPending: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9b6b00',
  },
  statusTextTaken: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2d5c4f',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#5C6B73',
  },
  pickupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#f59e0b',
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 8,
  },
  pickupButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
});
