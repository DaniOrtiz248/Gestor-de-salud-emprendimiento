import { StatusBar } from 'expo-status-bar';
import { StyleSheet,View, Text, Image, Dimensions, TouchableOpacity, FlatList, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useMemo, useEffect } from 'react';
import { useFonts } from 'expo-font';
import { router } from 'expo-router';
import Menu from "../../components/Menu";
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';


export default function Index() {

  const { logout } = useAuth();
  const { medications, appointments, news } = useData();
  const [showSuraModal, setShowSuraModal] = useState(false);
  const [loaded, error] = useFonts({
    'Nunito-Bold': require('../../assets/fonts/Nunito-Bold.ttf'),
    'Nunito-Regular': require('../../assets/fonts/Nunito-Regular.ttf'),
    'Nunito-SemiBold': require('../../assets/fonts/Nunito-SemiBold.ttf')
  });

  // Show Sura modal on first load
  useEffect(() => {
    setShowSuraModal(true);
  }, []);

  // medications of today (we treat schedules as daily times)
  const medsToday = useMemo(() => medications, [medications]);

  // next appointment (nearest future)
  const nextAppointment = useMemo(() => {
    const now = Date.now();
    const future = appointments
      .map(a => ({ ...a, ts: Date.parse(a.date) }))
      .filter(a => !isNaN(a.ts) && a.ts >= now)
      .sort((a,b) => a.ts - b.ts);
    return future[0];
  }, [appointments]);

  // find a news from Sura
  const suraNews = useMemo(() => news.find(n => n.title.toLowerCase().includes('sura') || n.content.toLowerCase().includes('sura')), [news]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bienvenido</Text>
          <Text style={styles.title}>Dashboard</Text>
        </View>

        <View style={styles.icons}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => router.push('/support')}
          >
            <MaterialCommunityIcons name="headset" size={24} color="#1d1d1d" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.iconButton, styles.premiumIconButton]}
            onPress={() => router.push('/premium-tips')}
          >
            <MaterialCommunityIcons name="crown" size={24} color="#f59e0b" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {/* Medications today */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name="pill" size={24} color="#5C6B73" />
            <Text style={styles.sectionTitle}>Medicamentos de hoy</Text>
          </View>
          {medsToday.length === 0 ? (
            <View style={styles.emptyCard}>
              <MaterialCommunityIcons name="pill-off" size={40} color="#ccc" />
              <Text style={styles.empty}>No hay medicamentos registrados</Text>
            </View>
          ) : (
            <FlatList
              data={medsToday}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(i) => i.id}
              renderItem={({ item }) => (
                <View style={styles.medCard}>
                  <View style={styles.medHeader}>
                    <MaterialCommunityIcons name="pill" size={20} color="#48B0FF" />
                    <Text style={styles.medName}>{item.name}</Text>
                  </View>
                  <View style={styles.medBadge}>
                    <Text style={styles.medBadgeText}>{item.toPickUp ? 'Por reclamar' : 'En administración'}</Text>
                  </View>
                  {item.schedule.map(t => (
                    <View key={t} style={styles.medRow}>
                      <View style={styles.timeContainer}>
                        <MaterialIcons name="access-time" size={14} color="#5C6B73" />
                        <Text style={styles.medTime}>{t}</Text>
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: item.taken[t] ? '#B4E1D6' : '#FFE8CC' }]}>
                        <Text style={[styles.statusText, { color: item.taken[t] ? '#2d5c4f' : '#9b6b00' }]}>
                          {item.taken[t] ? '✓ Tomado' : 'Pendiente'}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            />
          )}
        </View>

        {/* Next appointment */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="event" size={24} color="#5C6B73" />
            <Text style={styles.sectionTitle}>Próxima cita</Text>
          </View>
          {nextAppointment ? (
            <View style={styles.apptCard}>
              <View style={styles.apptIconRow}>
                <View style={styles.apptIconCircle}>
                  <MaterialIcons name="event-available" size={28} color="#48B0FF" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.apptDate}>{new Date(nextAppointment.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</Text>
                  <Text style={styles.apptTime}>{new Date(nextAppointment.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</Text>
                  {nextAppointment.notes ? <Text style={styles.apptNotes}>{nextAppointment.notes}</Text> : null}
                </View>
                <MaterialIcons name="arrow-forward-ios" size={18} color="#999" />
              </View>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <MaterialIcons name="event-busy" size={40} color="#ccc" />
              <Text style={styles.empty}>No hay citas próximas</Text>
            </View>
          )}
        </View>

        {/* Sura news */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="article" size={24} color="#5C6B73" />
            <Text style={styles.sectionTitle}>Noticias de Sura</Text>
          </View>
          {suraNews ? (
            <View style={styles.newsCard}>
              <View style={styles.newsHeader}>
                <View style={styles.suraLogo}>
                  <Text style={styles.suraLogoText}>SURA</Text>
                </View>
                <Text style={styles.newsDate}>{new Date(suraNews.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</Text>
              </View>
              <Text style={styles.newsTitle}>{suraNews.title}</Text>
              <Text style={styles.newsContent}>{suraNews.content}</Text>
              <TouchableOpacity style={styles.newsButton}>
                <Text style={styles.newsButtonText}>Leer más</Text>
                <MaterialIcons name="arrow-forward" size={16} color="#48B0FF" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <MaterialIcons name="info-outline" size={40} color="#ccc" />
              <Text style={styles.empty}>No hay noticias de Sura</Text>
            </View>
          )}
        </View>

        {/* Premium Promotion */}
        <View style={styles.section}>
          <View style={styles.premiumCard}>
            <View style={styles.premiumHeader}>
              <View style={styles.premiumBadge}>
                <MaterialCommunityIcons name="crown" size={20} color="#f59e0b" />
                <Text style={styles.premiumBadgeText}>PREMIUM</Text>
              </View>
              <View style={styles.priceTag}>
                <Text style={styles.priceAmount}>$5.000</Text>
                <Text style={styles.priceText}>/mes</Text>
              </View>
            </View>

            <Text style={styles.premiumTitle}>Mejora tu experiencia con JADOS Premium</Text>
            <Text style={styles.premiumSubtitle}>Atención personalizada y beneficios exclusivos</Text>

            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <MaterialIcons name="call" size={18} color="#10b981" />
                </View>
                <Text style={styles.benefitText}>Llamadas periódicas de seguimiento</Text>
              </View>

              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <MaterialCommunityIcons name="account-heart" size={18} color="#10b981" />
                </View>
                <Text style={styles.benefitText}>Asesor personal dedicado</Text>
              </View>

              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <MaterialCommunityIcons name="food-apple" size={18} color="#10b981" />
                </View>
                <Text style={styles.benefitText}>Consejos de nutrición y estilo de vida</Text>
              </View>

              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <MaterialCommunityIcons name="hand-heart" size={18} color="#10b981" />
                </View>
                <Text style={styles.benefitText}>Verificación de tu comodidad con la app</Text>
              </View>

              <View style={styles.benefitItem}>
                <View style={styles.benefitIcon}>
                  <MaterialIcons name="priority-high" size={18} color="#10b981" />
                </View>
                <Text style={styles.benefitText}>Atención prioritaria en soporte</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.premiumButton}>
              <MaterialCommunityIcons name="crown" size={20} color="#fff" />
              <Text style={styles.premiumButtonText}>Suscribirme a Premium</Text>
            </TouchableOpacity>

            <Text style={styles.premiumFooter}>Cancela cuando quieras • Sin compromisos</Text>
          </View>
        </View>

        <View style={{ height: 100 }} />
      </View>
      </ScrollView>

      {/* Sura Welcome Modal */}
      <Modal
        visible={showSuraModal}
        animationType="fade"
        transparent={false}
        statusBarTranslucent
      >
        <View style={styles.modalContainer}>
          {/* Close Button */}
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => setShowSuraModal(false)}
          >
            <MaterialIcons name="close" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Content */}
          <View style={styles.modalContent}>
            {/* Sura Logo */}
            <Image 
              source={require('../../assets/sura.png')}
              style={styles.suraModalLogo}
              resizeMode="contain"
            />

            {/* Welcome Text */}
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Tu salud, nuestra prioridad</Text>
              <Text style={styles.welcomeSubtitle}>EPS Sura - Protección integral</Text>
            </View>

            {/* Benefits */}
            <View style={styles.benefitsSection}>
              <View style={styles.benefitRow}>
                <View style={styles.benefitIconCircle}>
                  <MaterialIcons name="medical-services" size={28} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.benefitTitle}>Más de 500 centros médicos</Text>
                  <Text style={styles.benefitDescription}>
                    Red nacional con la mejor infraestructura hospitalaria
                  </Text>
                </View>
              </View>

              <View style={styles.benefitRow}>
                <View style={styles.benefitIconCircle}>
                  <MaterialCommunityIcons name="doctor" size={28} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.benefitTitle}>Especialistas certificados</Text>
                  <Text style={styles.benefitDescription}>
                    Atención de calidad con médicos altamente calificados
                  </Text>
                </View>
              </View>

              <View style={styles.benefitRow}>
                <View style={styles.benefitIconCircle}>
                  <MaterialCommunityIcons name="phone-in-talk" size={28} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.benefitTitle}>Línea 24/7 de atención</Text>
                  <Text style={styles.benefitDescription}>
                    Estamos disponibles cuando más nos necesites
                  </Text>
                </View>
              </View>
            </View>

            {/* CTA Button */}
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowSuraModal(false)}
            >
              <Text style={styles.modalButtonText}>Conocer más</Text>
              <MaterialIcons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>

            {/* Footer */}
            <Text style={styles.modalFooter}>
              Sura EPS - Más de 75 años cuidando tu salud
            </Text>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const screenHeigth = Dimensions.get('window').height

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
    paddingTop: screenHeigth * 0.02,
    paddingBottom: 16,
    backgroundColor: '#A5D8FF',
  },
  greeting: {
    fontSize: 14,
    color: '#5C6B73',
    marginBottom: 2,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: '#1d1d1d',
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  premiumIconButton: {
    backgroundColor: '#fef3c7',
    borderWidth: 1.5,
    borderColor: '#f59e0b',
    marginLeft: 8,
  },
  content: { width: '100%', alignItems: 'center', paddingTop: 4 },
  section: { width: '92%', marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1d1d1d' },
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
  empty: { color: '#999', marginTop: 8, fontSize: 14 },
  medCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginRight: 12,
    width: 240,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  medHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 8 },
  medName: { fontWeight: '700', fontSize: 16, color: '#1d1d1d', flex: 1 },
  medBadge: {
    backgroundColor: '#E8F5FD',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  medBadgeText: { fontSize: 12, color: '#48B0FF', fontWeight: '600' },
  medRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 },
  timeContainer: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  medTime: { fontWeight: '600', fontSize: 14, color: '#5C6B73' },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  statusText: { fontSize: 12, fontWeight: '600' },
  apptCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  apptIconRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  apptIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E8F5FD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  apptDate: { fontWeight: '700', fontSize: 16, color: '#1d1d1d', textTransform: 'capitalize' },
  apptTime: { fontSize: 14, color: '#48B0FF', fontWeight: '600', marginTop: 2 },
  apptNotes: { color: '#666', marginTop: 8, fontSize: 13 },
  newsCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  newsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  suraLogo: {
    backgroundColor: '#5C6B73',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  suraLogoText: { color: '#fff', fontWeight: '700', fontSize: 14, letterSpacing: 1 },
  newsTitle: { fontWeight: '700', fontSize: 17, color: '#1d1d1d', marginBottom: 8 },
  newsContent: { color: '#555', fontSize: 14, lineHeight: 20 },
  newsDate: { color: '#999', fontSize: 12, fontWeight: '600' },
  newsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 4,
  },
  newsButtonText: { color: '#48B0FF', fontWeight: '600', fontSize: 14 },
  premiumCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#f59e0b',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  premiumHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  premiumBadgeText: {
    color: '#f59e0b',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  priceTag: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  priceAmount: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f59e0b',
  },
  priceText: {
    fontSize: 14,
    color: '#999',
    marginLeft: 2,
  },
  premiumTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  premiumSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 18,
  },
  benefitsList: {
    gap: 12,
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#d1fae5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: '#1d1d1d',
    fontWeight: '500',
  },
  premiumButton: {
    backgroundColor: '#f59e0b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  premiumButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  premiumFooter: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: '#5C6B73',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
    paddingVertical: 40,
  },
  suraModalLogo: {
    width: 200,
    height: 200,
    marginBottom: 30,
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 34,
  },
  welcomeSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#B4E1D6',
    textAlign: 'center',
  },
  benefitsSection: {
    width: '100%',
    gap: 24,
    marginBottom: 40,
  },
  benefitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  benefitIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#48B0FF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 13,
    color: '#E8F5FD',
    lineHeight: 18,
  },
  modalButton: {
    backgroundColor: '#48B0FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  modalFooter: {
    fontSize: 12,
    color: '#B4E1D6',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
