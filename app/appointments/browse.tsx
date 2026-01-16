import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo } from 'react';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useData } from '../../context/DataContext';

const screenHeight = Dimensions.get('window').height;

export default function BrowseAppointments() {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("../../assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-SemiBold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
  });

  const { professionals, centers } = useData();
  const [activeTab, setActiveTab] = useState<'specialties' | 'locations' | 'professionals'>('professionals');

  // Get unique specialties
  const specialties = useMemo(() => {
    const unique = Array.from(new Set(professionals.map(p => p.specialty)));
    return unique.map(s => ({
      name: s,
      count: professionals.filter(p => p.specialty === s).length,
    }));
  }, [professionals]);

  // Professionals by location
  const professionalsByCenter = useMemo(() => {
    return centers.map(c => ({
      center: c,
      professionals: professionals.filter(p => p.centerId === c.id),
    }));
  }, [centers, professionals]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1d1d1d" />
        </TouchableOpacity>
        <View>
          <Text style={styles.subtitle}>Agenda tu cita</Text>
          <Text style={styles.title}>Profesionales</Text>
        </View>
        <View style={styles.iconButton}>
          <MaterialIcons name="search" size={24} color="#1d1d1d" />
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'professionals' && styles.tabActive]}
          onPress={() => setActiveTab('professionals')}
        >
          <MaterialIcons name="person" size={20} color={activeTab === 'professionals' ? '#48B0FF' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'professionals' && styles.tabTextActive]}>Profesionales</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'specialties' && styles.tabActive]}
          onPress={() => setActiveTab('specialties')}
        >
          <MaterialCommunityIcons name="medical-bag" size={20} color={activeTab === 'specialties' ? '#48B0FF' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'specialties' && styles.tabTextActive]}>Especialidades</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.tab, activeTab === 'locations' && styles.tabActive]}
          onPress={() => setActiveTab('locations')}
        >
          <MaterialIcons name="location-on" size={20} color={activeTab === 'locations' ? '#48B0FF' : '#666'} />
          <Text style={[styles.tabText, activeTab === 'locations' && styles.tabTextActive]}>Centros</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          
          {/* Professionals Tab */}
          {activeTab === 'professionals' && (
            <View style={styles.section}>
              {professionals.length === 0 ? (
                <View style={styles.emptyCard}>
                  <MaterialIcons name="person-off" size={40} color="#ccc" />
                  <Text style={styles.empty}>No hay profesionales disponibles</Text>
                </View>
              ) : (
                professionals.map(prof => {
                  const center = centers.find(c => c.id === prof.centerId);
                  return (
                    <View key={prof.id} style={styles.profCard}>
                      <View style={styles.profHeader}>
                        <View style={styles.profAvatar}>
                          <MaterialIcons name="person" size={32} color="#48B0FF" />
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.profName}>{prof.name}</Text>
                          <View style={styles.profRow}>
                            <MaterialCommunityIcons name="medical-bag" size={14} color="#5C6B73" />
                            <Text style={styles.profSpecialty}>{prof.specialty}</Text>
                          </View>
                          <View style={styles.profRow}>
                            <MaterialIcons name="location-on" size={14} color="#5C6B73" />
                            <Text style={styles.profLocation}>{center?.name || 'Sin ubicación'}</Text>
                          </View>
                        </View>
                        <View style={[styles.availableBadge, { backgroundColor: prof.available ? '#B4E1D6' : '#FFE8CC' }]}>
                          <Text style={[styles.availableText, { color: prof.available ? '#2d5c4f' : '#9b6b00' }]}>
                            {prof.available ? 'Disponible' : 'No disponible'}
                          </Text>
                        </View>
                      </View>

                      {/* Schedule */}
                      <View style={styles.scheduleContainer}>
                        <Text style={styles.scheduleTitle}>Horarios disponibles</Text>
                        {prof.schedule.map((slot, idx) => (
                          <View key={idx} style={styles.scheduleRow}>
                            <MaterialIcons name="access-time" size={16} color="#48B0FF" />
                            <Text style={styles.scheduleDay}>{slot.day}</Text>
                            <Text style={styles.scheduleHours}>{slot.hours}</Text>
                          </View>
                        ))}
                      </View>

                      <TouchableOpacity 
                        style={[styles.bookButton, !prof.available && styles.bookButtonDisabled]}
                        disabled={!prof.available}
                      >
                        <MaterialIcons name="event" size={18} color="#fff" />
                        <Text style={styles.bookButtonText}>Agendar cita</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })
              )}
            </View>
          )}

          {/* Specialties Tab */}
          {activeTab === 'specialties' && (
            <View style={styles.section}>
              {specialties.length === 0 ? (
                <View style={styles.emptyCard}>
                  <MaterialCommunityIcons name="medical-bag" size={40} color="#ccc" />
                  <Text style={styles.empty}>No hay especialidades registradas</Text>
                </View>
              ) : (
                specialties.map((spec, idx) => (
                  <View key={idx} style={styles.specialtyCard}>
                    <View style={styles.specialtyIconCircle}>
                      <MaterialCommunityIcons name="medical-bag" size={28} color="#48B0FF" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.specialtyName}>{spec.name}</Text>
                      <Text style={styles.specialtyCount}>{spec.count} {spec.count === 1 ? 'profesional' : 'profesionales'}</Text>
                    </View>
                    <MaterialIcons name="arrow-forward-ios" size={18} color="#999" />
                  </View>
                ))
              )}
            </View>
          )}

          {/* Locations Tab */}
          {activeTab === 'locations' && (
            <View style={styles.section}>
              {professionalsByCenter.length === 0 ? (
                <View style={styles.emptyCard}>
                  <MaterialIcons name="location-off" size={40} color="#ccc" />
                  <Text style={styles.empty}>No hay centros registrados</Text>
                </View>
              ) : (
                professionalsByCenter.map(({ center, professionals: profs }) => (
                  <View key={center.id} style={styles.centerCard}>
                    <View style={styles.centerHeader}>
                      <View style={styles.centerIconCircle}>
                        <MaterialIcons name="location-on" size={28} color="#48B0FF" />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.centerName}>{center.name}</Text>
                        <Text style={styles.centerSchedule}>{center.schedule}</Text>
                        <Text style={styles.centerCount}>{profs.length} {profs.length === 1 ? 'profesional' : 'profesionales'}</Text>
                      </View>
                    </View>

                    {profs.length > 0 && (
                      <View style={styles.centerProfsContainer}>
                        {profs.map(p => (
                          <View key={p.id} style={styles.centerProfChip}>
                            <MaterialIcons name="person" size={14} color="#48B0FF" />
                            <Text style={styles.centerProfName}>{p.name}</Text>
                            <Text style={styles.centerProfSpecialty}>· {p.specialty}</Text>
                          </View>
                        ))}
                      </View>
                    )}

                    <TouchableOpacity style={styles.viewButton}>
                      <Text style={styles.viewButtonText}>Ver profesionales</Text>
                      <MaterialIcons name="arrow-forward" size={16} color="#48B0FF" />
                    </TouchableOpacity>
                  </View>
                ))
              )}
            </View>
          )}

          <View style={{ height: 100 }} />
        </View>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tabActive: {
    backgroundColor: '#E8F5FD',
    borderWidth: 2,
    borderColor: '#48B0FF',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#48B0FF',
  },
  content: { 
    width: '100%', 
    alignItems: 'center', 
    paddingTop: 4 
  },
  section: { 
    width: '92%', 
    gap: 16 
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
  profCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  profAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8F5FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 4,
  },
  profRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  profSpecialty: {
    fontSize: 13,
    color: '#5C6B73',
    fontWeight: '600',
  },
  profLocation: {
    fontSize: 12,
    color: '#666',
  },
  availableBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  availableText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  scheduleContainer: {
    backgroundColor: '#F8FAFB',
    padding: 14,
    borderRadius: 12,
    marginBottom: 14,
  },
  scheduleTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5C6B73',
    marginBottom: 10,
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  scheduleDay: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1d1d1d',
    flex: 1,
  },
  scheduleHours: {
    fontSize: 13,
    color: '#48B0FF',
    fontWeight: '600',
  },
  bookButton: {
    backgroundColor: '#48B0FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 8,
  },
  bookButtonDisabled: {
    backgroundColor: '#ccc',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  specialtyCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  specialtyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  specialtyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 4,
  },
  specialtyCount: {
    fontSize: 13,
    color: '#666',
  },
  centerCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  centerHeader: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  centerIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 4,
  },
  centerSchedule: {
    fontSize: 13,
    color: '#48B0FF',
    fontWeight: '600',
    marginBottom: 2,
  },
  centerCount: {
    fontSize: 12,
    color: '#666',
  },
  centerProfsContainer: {
    gap: 8,
    marginBottom: 14,
  },
  centerProfChip: {
    backgroundColor: '#F8FAFB',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 6,
  },
  centerProfName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1d1d1d',
  },
  centerProfSpecialty: {
    fontSize: 12,
    color: '#666',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
  },
  viewButtonText: {
    color: '#48B0FF',
    fontSize: 14,
    fontWeight: '600',
  },
});
