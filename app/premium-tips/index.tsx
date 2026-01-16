import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useMemo } from 'react';

type HealthTip = {
  id: string;
  category: 'nutrition' | 'exercise' | 'lifestyle' | 'mental';
  title: string;
  specialist: string;
  specialization: string;
  content: string;
  tags: string[];
  relevantFor?: string[]; // medical conditions
};

export default function PremiumTips() {
  const { userProfile } = useAuth();

  const allTips: HealthTip[] = [
    {
      id: 'tip1',
      category: 'nutrition',
      title: 'Control de la hipertensión mediante la dieta',
      specialist: 'Dra. Laura Martínez',
      specialization: 'Nutricionista clínica',
      content: 'Para controlar la presión arterial, es fundamental reducir el consumo de sodio a menos de 2,300 mg al día. Aumente el consumo de potasio mediante frutas como plátanos y verduras de hoja verde. La dieta DASH (Dietary Approaches to Stop Hypertension) ha demostrado ser muy efectiva.',
      tags: ['Hipertensión', 'Dieta', 'Corazón'],
      relevantFor: ['Hipertensión'],
    },
    {
      id: 'tip2',
      category: 'nutrition',
      title: 'Alimentación balanceada para diabéticos',
      specialist: 'Dr. Carlos Rojas',
      specialization: 'Endocrinólogo',
      content: 'Mantenga un horario regular de comidas. Priorice carbohidratos complejos (cereales integrales, legumbres) sobre azúcares simples. El control de porciones es clave: use el método del plato (1/2 verduras, 1/4 proteína, 1/4 carbohidratos). Incluya fibra en cada comida.',
      tags: ['Diabetes', 'Nutrición', 'Control glucémico'],
      relevantFor: ['Diabetes tipo 2', 'Diabetes'],
    },
    {
      id: 'tip3',
      category: 'exercise',
      title: 'Actividad física para el control de la presión',
      specialist: 'Lic. Andrea Gómez',
      specialization: 'Fisioterapeuta deportiva',
      content: 'Realice al menos 150 minutos de actividad aeróbica moderada por semana. Caminatas rápidas, natación o ciclismo son excelentes opciones. El ejercicio regular puede reducir la presión arterial entre 5-8 mmHg. Consulte siempre con su médico antes de iniciar.',
      tags: ['Ejercicio', 'Cardiovascular', 'Prevención'],
      relevantFor: ['Hipertensión'],
    },
    {
      id: 'tip4',
      category: 'lifestyle',
      title: 'Gestión del estrés y salud cardiovascular',
      specialist: 'Dr. Miguel Sánchez',
      specialization: 'Cardiólogo',
      content: 'El estrés crónico afecta directamente la salud del corazón. Practique técnicas de relajación como meditación o yoga. Duerma 7-8 horas diarias. Mantenga conexiones sociales positivas. Considere actividades que disfrute para reducir el cortisol.',
      tags: ['Estrés', 'Salud mental', 'Prevención'],
      relevantFor: ['Hipertensión'],
    },
    {
      id: 'tip5',
      category: 'nutrition',
      title: 'Hidratación y control de azúcar en sangre',
      specialist: 'Dra. Patricia López',
      specialization: 'Nutricionista especializada en diabetes',
      content: 'Manténgase bien hidratado con agua. Evite bebidas azucaradas que elevan rápidamente la glucosa. El agua ayuda a los riñones a eliminar el exceso de azúcar. Beba al menos 8 vasos al día. Las infusiones sin azúcar también son buena opción.',
      tags: ['Hidratación', 'Diabetes', 'Prevención'],
      relevantFor: ['Diabetes tipo 2', 'Diabetes'],
    },
    {
      id: 'tip6',
      category: 'mental',
      title: 'Importancia del sueño en enfermedades crónicas',
      specialist: 'Dr. Roberto Vargas',
      specialization: 'Médico del sueño',
      content: 'La falta de sueño afecta el control de la glucosa y la presión arterial. Mantenga horarios regulares de sueño. Evite pantallas 1 hora antes de dormir. Cree un ambiente oscuro y fresco en su habitación. El sueño de calidad mejora el control metabólico.',
      tags: ['Sueño', 'Salud integral', 'Prevención'],
      relevantFor: ['Hipertensión', 'Diabetes tipo 2', 'Diabetes'],
    },
    {
      id: 'tip7',
      category: 'lifestyle',
      title: 'Abandono del tabaco para mejor salud',
      specialist: 'Dr. Fernando Castro',
      specialization: 'Neumólogo',
      content: 'Dejar de fumar es lo mejor que puede hacer por su salud. El tabaco aumenta significativamente el riesgo cardiovascular y complica el control de enfermedades crónicas. Busque apoyo profesional, use terapias de reemplazo si es necesario. Los beneficios comienzan desde el primer día.',
      tags: ['Prevención', 'Estilo de vida', 'Cardiovascular'],
      relevantFor: ['Hipertensión'],
    },
    {
      id: 'tip8',
      category: 'nutrition',
      title: 'Alimentos que favorecen el control glucémico',
      specialist: 'Dra. Isabel Herrera',
      specialization: 'Nutricionista clínica',
      content: 'Incluya alimentos con bajo índice glucémico: legumbres, vegetales de hoja verde, nueces, semillas. La canela y el vinagre de manzana pueden ayudar al control de azúcar. Evite alimentos procesados y bebidas azucaradas. Las grasas saludables (aguacate, aceite de oliva) también son importantes.',
      tags: ['Nutrición', 'Diabetes', 'Alimentos'],
      relevantFor: ['Diabetes tipo 2', 'Diabetes'],
    },
  ];

  // Filter tips based on user's medical conditions
  const relevantTips = useMemo(() => {
    if (!userProfile.medicalConditions || userProfile.medicalConditions.length === 0) {
      return allTips.slice(0, 4); // Show first 4 tips if no conditions
    }
    
    const filtered = allTips.filter(tip => 
      tip.relevantFor?.some(condition => 
        userProfile.medicalConditions?.some(userCondition =>
          userCondition.toLowerCase().includes(condition.toLowerCase()) ||
          condition.toLowerCase().includes(userCondition.toLowerCase())
        )
      )
    );
    
    return filtered.length > 0 ? filtered : allTips.slice(0, 4);
  }, [userProfile.medicalConditions]);

  const getCategoryIcon = (category: HealthTip['category']) => {
    switch (category) {
      case 'nutrition':
        return { name: 'food-apple' as const, color: '#10b981' };
      case 'exercise':
        return { name: 'run' as const, color: '#3b82f6' };
      case 'lifestyle':
        return { name: 'heart-pulse' as const, color: '#ec4899' };
      case 'mental':
        return { name: 'brain' as const, color: '#8b5cf6' };
    }
  };

  const getCategoryLabel = (category: HealthTip['category']) => {
    const labels = {
      nutrition: 'Nutrición',
      exercise: 'Ejercicio',
      lifestyle: 'Estilo de vida',
      mental: 'Salud mental',
    };
    return labels[category];
  };

  const handleUpgrade = () => {
    Alert.alert(
      'JADOS Premium',
      '¿Deseas suscribirte a Premium por $5.000/mes y acceder a todos los consejos personalizados?',
      [
        { text: 'Ahora no', style: 'cancel' },
        { text: 'Suscribirme', onPress: () => Alert.alert('¡Bienvenido a Premium!', 'Tu suscripción ha sido activada') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1d1d1d" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <View style={styles.premiumBadge}>
            <MaterialCommunityIcons name="crown" size={16} color="#f59e0b" />
            <Text style={styles.premiumBadgeText}>PREMIUM</Text>
          </View>
          <Text style={styles.title}>Consejos de Especialistas</Text>
        </View>
      </View>

      {/* Personalization Banner */}
      <View style={styles.banner}>
        <MaterialCommunityIcons name="account-heart" size={32} color="#f59e0b" />
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Consejos personalizados para ti</Text>
          <Text style={styles.bannerText}>
            {userProfile.medicalConditions && userProfile.medicalConditions.length > 0
              ? `Basados en: ${userProfile.medicalConditions.join(', ')}`
              : 'Recomendaciones generales de salud'}
          </Text>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {relevantTips.map(tip => {
          const iconData = getCategoryIcon(tip.category);
          
          return (
            <View key={tip.id} style={styles.tipCard}>
              <View style={styles.tipHeader}>
                <View style={[styles.categoryIcon, { backgroundColor: `${iconData.color}15` }]}>
                  <MaterialCommunityIcons name={iconData.name} size={24} color={iconData.color} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.categoryBadge}>
                    <Text style={[styles.categoryBadgeText, { color: iconData.color }]}>
                      {getCategoryLabel(tip.category)}
                    </Text>
                  </View>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                </View>
              </View>

              <View style={styles.specialistInfo}>
                <MaterialIcons name="verified" size={16} color="#48B0FF" />
                <Text style={styles.specialistName}>{tip.specialist}</Text>
                <Text style={styles.specialistDot}>•</Text>
                <Text style={styles.specialization}>{tip.specialization}</Text>
              </View>

              <Text style={styles.tipContent}>{tip.content}</Text>

              <View style={styles.tagsContainer}>
                {tip.tags.map((tag, idx) => (
                  <View key={idx} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

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
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
    marginBottom: 4,
  },
  premiumBadgeText: {
    color: '#f59e0b',
    fontWeight: '700',
    fontSize: 11,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: '#1d1d1d',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fef3c7',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1d1d1d',
    marginBottom: 2,
  },
  bannerText: {
    fontSize: 13,
    color: '#78350f',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  tipCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  tipHeader: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1d1d1d',
    lineHeight: 22,
  },
  specialistInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  specialistName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#48B0FF',
  },
  specialistDot: {
    color: '#ccc',
  },
  specialization: {
    fontSize: 12,
    color: '#666',
    flex: 1,
  },
  tipContent: {
    fontSize: 14,
    color: '#1d1d1d',
    lineHeight: 21,
    marginBottom: 14,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#E8F5FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  tagText: {
    fontSize: 12,
    color: '#48B0FF',
    fontWeight: '600',
  },
  ctaCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 8,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f59e0b',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1d1d1d',
    marginTop: 12,
    marginBottom: 8,
  },
  ctaText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  upgradeButton: {
    backgroundColor: '#f59e0b',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    shadowColor: '#f59e0b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  upgradeButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  ctaPrice: {
    fontSize: 12,
    color: '#999',
    marginTop: 12,
    fontStyle: 'italic',
  },
});
