import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { router } from 'expo-router';

type ContactChannel = {
  id: string;
  type: 'phone' | 'email' | 'web' | 'chat' | 'whatsapp';
  label: string;
  value: string;
  schedule?: string;
};

export default function Support() {
  
  const suraChannels: ContactChannel[] = [
    {
      id: 'sura_phone',
      type: 'phone',
      label: 'Línea de atención',
      value: '018000 514 747',
      schedule: '24/7',
    },
    {
      id: 'sura_whatsapp',
      type: 'whatsapp',
      label: 'WhatsApp',
      value: '+57 310 123 4567',
      schedule: 'Lun-Vie 8:00-18:00',
    },
    {
      id: 'sura_email',
      type: 'email',
      label: 'Correo electrónico',
      value: 'atencion@sura.com.co',
    },
    {
      id: 'sura_web',
      type: 'web',
      label: 'Portal web',
      value: 'https://www.sura.com',
    },
    {
      id: 'sura_app',
      type: 'chat',
      label: 'Chat en línea',
      value: 'Chat con asesor',
      schedule: 'Lun-Vie 8:00-18:00',
    },
  ];

  const jadosChannels: ContactChannel[] = [
    {
      id: 'jados_phone',
      type: 'phone',
      label: 'Soporte técnico',
      value: '601 123 4567',
      schedule: 'Lun-Vie 9:00-17:00',
    },
    {
      id: 'jados_whatsapp',
      type: 'whatsapp',
      label: 'WhatsApp',
      value: '+57 321 987 6543',
      schedule: 'Lun-Sáb 8:00-20:00',
    },
    {
      id: 'jados_email',
      type: 'email',
      label: 'Correo de soporte',
      value: 'soporte@jados.app',
    },
    {
      id: 'jados_web',
      type: 'web',
      label: 'Centro de ayuda',
      value: 'https://help.jados.app',
    },
    {
      id: 'jados_chat',
      type: 'chat',
      label: 'Chat en la app',
      value: 'Contactar soporte',
      schedule: 'Lun-Vie 9:00-18:00',
    },
  ];

  const getChannelIcon = (type: ContactChannel['type']) => {
    switch (type) {
      case 'phone':
        return { name: 'phone' as const, Icon: MaterialIcons, color: '#10b981' };
      case 'email':
        return { name: 'email' as const, Icon: MaterialIcons, color: '#f59e0b' };
      case 'web':
        return { name: 'language' as const, Icon: MaterialIcons, color: '#48B0FF' };
      case 'chat':
        return { name: 'chat' as const, Icon: MaterialIcons, color: '#8b5cf6' };
      case 'whatsapp':
        return { name: 'whatsapp' as const, Icon: MaterialCommunityIcons, color: '#25d366' };
      default:
        return { name: 'help' as const, Icon: MaterialIcons, color: '#5C6B73' };
    }
  };

  const handleContact = async (channel: ContactChannel) => {
    try {
      switch (channel.type) {
        case 'phone':
          await Linking.openURL(`tel:${channel.value.replace(/\s/g, '')}`);
          break;
        case 'whatsapp':
          const phone = channel.value.replace(/[^0-9]/g, '');
          await Linking.openURL(`https://wa.me/${phone}`);
          break;
        case 'email':
          await Linking.openURL(`mailto:${channel.value}`);
          break;
        case 'web':
          await Linking.openURL(channel.value);
          break;
        case 'chat':
          Alert.alert(
            'Chat de soporte',
            'Esta función abrirá el chat de soporte en la aplicación.',
            [{ text: 'OK' }]
          );
          break;
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo abrir el canal de contacto');
    }
  };

  const renderChannel = (channel: ContactChannel) => {
    const iconData = getChannelIcon(channel.type);
    const Icon = iconData.Icon;
    
    return (
      <TouchableOpacity
        key={channel.id}
        style={styles.channelCard}
        onPress={() => handleContact(channel)}
        activeOpacity={0.7}
      >
        <View style={[styles.channelIcon, { backgroundColor: `${iconData.color}15` }]}>
          <Icon name={iconData.name as any} size={24} color={iconData.color} />
        </View>
        
        <View style={styles.channelInfo}>
          <Text style={styles.channelLabel}>{channel.label}</Text>
          <Text style={styles.channelValue}>{channel.value}</Text>
          {channel.schedule && (
            <View style={styles.scheduleContainer}>
              <MaterialIcons name="access-time" size={12} color="#999" />
              <Text style={styles.scheduleText}>{channel.schedule}</Text>
            </View>
          )}
        </View>
        
        <MaterialIcons name="arrow-forward-ios" size={16} color="#999" />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1d1d1d" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.subtitle}>Ayuda y soporte</Text>
          <Text style={styles.title}>Canales de Atención</Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Emergency Banner */}
        <View style={styles.emergencyBanner}>
          <View style={styles.emergencyIcon}>
            <MaterialIcons name="emergency" size={28} color="#dc2626" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.emergencyTitle}>Emergencias 24/7</Text>
            <Text style={styles.emergencyText}>Línea de emergencias: 123 o 125</Text>
          </View>
        </View>

        {/* Premium Personal Advisor */}
        <TouchableOpacity 
          style={styles.premiumAdvisorCard}
          onPress={() => Alert.alert(
            'Asesor Personalizado Premium',
            'Suscríbete a JADOS Premium por $5.000/mes y obtén un asesor personal dedicado disponible por llamada, WhatsApp o chat.',
            [
              { text: 'Ahora no', style: 'cancel' },
              { text: 'Suscribirme', onPress: () => Alert.alert('¡Bienvenido a Premium!') }
            ]
          )}
          activeOpacity={0.8}
        >
          <View style={styles.premiumAdvisorIcon}>
            <MaterialCommunityIcons name="crown" size={32} color="#f59e0b" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.premiumAdvisorTitle}>Asesor Personal Dedicado</Text>
            <Text style={styles.premiumAdvisorDescription}>
              Atención prioritaria 24/7 con un experto asignado exclusivamente para ti
            </Text>
            <View style={styles.premiumFeatures}>
              <View style={styles.premiumFeatureItem}>
                <MaterialIcons name="check-circle" size={16} color="#10b981" />
                <Text style={styles.premiumFeatureText}>Respuesta inmediata</Text>
              </View>
              <View style={styles.premiumFeatureItem}>
                <MaterialIcons name="check-circle" size={16} color="#10b981" />
                <Text style={styles.premiumFeatureText}>Seguimiento personalizado</Text>
              </View>
            </View>
          </View>
          <MaterialIcons name="arrow-forward-ios" size={20} color="#f59e0b" />
        </TouchableOpacity>

        {/* Sura EPS Channels */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.providerLogo}>
              <Text style={styles.providerLogoText}>SURA</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>EPS Sura</Text>
              <Text style={styles.sectionSubtitle}>Atención al afiliado</Text>
            </View>
            <View style={styles.channelBadge}>
              <Text style={styles.channelBadgeText}>{suraChannels.length}</Text>
            </View>
          </View>

          {suraChannels.map(renderChannel)}
        </View>

        {/* JADOS App Channels */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={[styles.providerLogo, { backgroundColor: '#48B0FF' }]}>
              <Text style={styles.providerLogoText}>JADOS</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Aplicación JADOS</Text>
              <Text style={styles.sectionSubtitle}>Soporte técnico</Text>
            </View>
            <View style={styles.channelBadge}>
              <Text style={styles.channelBadgeText}>{jadosChannels.length}</Text>
            </View>
          </View>

          {jadosChannels.map(renderChannel)}
        </View>

        {/* FAQ Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MaterialIcons name="help-outline" size={24} color="#5C6B73" />
            <Text style={styles.sectionTitle}>Preguntas frecuentes</Text>
          </View>

          <TouchableOpacity style={styles.faqCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.faqQuestion}>¿Cómo agendar una cita médica?</Text>
              <Text style={styles.faqAnswer}>Ve a la sección de Citas y selecciona "Agendar"</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={16} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.faqQuestion}>¿Cómo sincronizo mis medicamentos?</Text>
              <Text style={styles.faqAnswer}>En la sección Medicamentos, toca "Sincronizar"</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={16} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.faqQuestion}>¿Dónde veo mi historial médico?</Text>
              <Text style={styles.faqAnswer}>Accede desde el botón central del menú inferior</Text>
            </View>
            <MaterialIcons name="arrow-forward-ios" size={16} color="#999" />
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A5D8FF',
  },
  header: {
    flexDirection: "row",
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#A5D8FF',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 1,
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  emergencyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fee2e2',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#dc2626',
    gap: 12,
  },
  emergencyIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#dc2626',
    marginBottom: 2,
  },
  emergencyText: {
    fontSize: 14,
    color: '#991b1b',
    fontWeight: '600',
  },
  premiumAdvisorCard: {
    backgroundColor: '#fef3c7',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 18,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 2,
    borderColor: '#f59e0b',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  premiumAdvisorIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  premiumBadgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    gap: 4,
    marginBottom: 8,
  },
  premiumBadgeTextSmall: {
    color: '#f59e0b',
    fontWeight: '700',
    fontSize: 10,
    letterSpacing: 0.5,
  },
  premiumAdvisorTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 6,
  },
  premiumAdvisorDescription: {
    fontSize: 13,
    color: '#78350f',
    lineHeight: 18,
    marginBottom: 10,
  },
  premiumFeatures: {
    gap: 6,
  },
  premiumFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  premiumFeatureText: {
    fontSize: 12,
    color: '#78350f',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 10,
  },
  providerLogo: {
    backgroundColor: '#5C6B73',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  providerLogoText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  channelBadge: {
    backgroundColor: '#B4E1D6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  channelBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  channelCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  channelIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelInfo: {
    flex: 1,
    gap: 4,
  },
  channelLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5C6B73',
  },
  channelValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  scheduleText: {
    fontSize: 11,
    color: '#999',
  },
  faqCard: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 13,
    color: '#666',
  },
});
