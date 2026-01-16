import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useMemo } from 'react';
import { router } from 'expo-router';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

type MedicalRecord = {
  id: string;
  date: string;
  type: 'consulta' | 'examen' | 'procedimiento' | 'medicamento' | 'vacuna';
  title: string;
  description: string;
  professional?: string;
  center?: string;
  attachments?: number;
};

export default function MedicalHistory() {
  const { userProfile } = useAuth();
  const { centers, professionals } = useData();
  
  const [expandedRecords, setExpandedRecords] = useState<Set<string>>(new Set());
  const [syncDate, setSyncDate] = useState<Date>(new Date());

  // Sample medical history data
  const medicalRecords: MedicalRecord[] = useMemo(() => [
    {
      id: 'rec1',
      date: '2024-11-15',
      type: 'consulta',
      title: 'Control Anual',
      description: 'Evaluación general de salud. Presión arterial: 120/80 mmHg. Peso: 75kg. Se recomienda continuar con medicación actual.',
      professional: 'Dr. Carlos Mendoza',
      center: 'Punto de Salud Central',
    },
    {
      id: 'rec2',
      date: '2024-11-10',
      type: 'medicamento',
      title: 'Prescripción de Losartán',
      description: 'Se prescribe Losartán 50mg, tomar una tableta diaria en ayunas para control de presión arterial.',
      professional: 'Dr. Miguel Ramírez',
      center: 'Clínica Sur Sura',
    },
    {
      id: 'rec3',
      date: '2024-10-28',
      type: 'examen',
      title: 'Exámenes de Laboratorio',
      description: 'Perfil lipídico completo, glucosa en ayunas, hemograma. Resultados dentro de rangos normales.',
      center: 'Centro Médico Norte',
      attachments: 3,
    },
    {
      id: 'rec4',
      date: '2024-10-15',
      type: 'procedimiento',
      title: 'Electrocardiograma',
      description: 'ECG de 12 derivaciones. Ritmo sinusal normal. Sin alteraciones significativas.',
      professional: 'Dr. Miguel Ramírez',
      center: 'Clínica Sur Sura',
      attachments: 1,
    },
    {
      id: 'rec5',
      date: '2024-09-20',
      type: 'vacuna',
      title: 'Vacuna Influenza',
      description: 'Aplicación de vacuna contra la influenza estacional. Próxima dosis: 2025.',
      center: 'Punto de Salud Central',
    },
    {
      id: 'rec6',
      date: '2024-08-05',
      type: 'consulta',
      title: 'Consulta de Cardiología',
      description: 'Revisión de presión arterial y ajuste de medicación. Se inicia tratamiento con Losartán.',
      professional: 'Dr. Miguel Ramírez',
      center: 'Clínica Sur Sura',
    },
  ], []);

  // Group records by month
  const groupedRecords = useMemo(() => {
    const groups: { [key: string]: MedicalRecord[] } = {};
    
    medicalRecords.forEach(record => {
      const date = new Date(record.date);
      const monthKey = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long' });
      
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(record);
    });
    
    return groups;
  }, [medicalRecords]);

  const toggleExpand = (id: string) => {
    setExpandedRecords(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSync = () => {
    setSyncDate(new Date());
    Alert.alert(
      'Historial sincronizado',
      'Tu historial médico se ha actualizado con la información más reciente de Sura EPS.',
      [{ text: 'OK' }]
    );
  };

  const handleShare = async () => {
    try {
      const message = `Historial Médico - ${userProfile.name}\n\nÚltima sincronización: ${syncDate.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })}\n\nTotal de registros: ${medicalRecords.length}`;
      
      await Share.share({
        message,
        title: 'Historial Médico',
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir el historial médico');
    }
  };

  const getRecordIcon = (type: MedicalRecord['type']) => {
    switch (type) {
      case 'consulta':
        return { name: 'medical-bag' as const, color: '#48B0FF' };
      case 'examen':
        return { name: 'flask' as const, color: '#8b5cf6' };
      case 'procedimiento':
        return { name: 'heart-pulse' as const, color: '#ec4899' };
      case 'medicamento':
        return { name: 'pill' as const, color: '#10b981' };
      case 'vacuna':
        return { name: 'needle' as const, color: '#f59e0b' };
      default:
        return { name: 'file-document' as const, color: '#5C6B73' };
    }
  };

  const getRecordBadgeStyle = (type: MedicalRecord['type']) => {
    switch (type) {
      case 'consulta':
        return { backgroundColor: '#E8F5FD', color: '#48B0FF' };
      case 'examen':
        return { backgroundColor: '#f3e8ff', color: '#8b5cf6' };
      case 'procedimiento':
        return { backgroundColor: '#fce7f3', color: '#ec4899' };
      case 'medicamento':
        return { backgroundColor: '#d1fae5', color: '#10b981' };
      case 'vacuna':
        return { backgroundColor: '#fef3c7', color: '#f59e0b' };
      default:
        return { backgroundColor: '#f5f5f5', color: '#5C6B73' };
    }
  };

  const formatRecordType = (type: MedicalRecord['type']) => {
    const types = {
      consulta: 'Consulta',
      examen: 'Examen',
      procedimiento: 'Procedimiento',
      medicamento: 'Medicamento',
      vacuna: 'Vacuna',
    };
    return types[type];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#1d1d1d" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.subtitle}>Mi salud</Text>
          <Text style={styles.title}>Historial Médico</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={handleSync}>
          <MaterialCommunityIcons name="sync" size={20} color="#48B0FF" />
          <Text style={styles.actionButtonText}>Sincronizar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.actionButton, styles.shareButton]} onPress={handleShare}>
          <MaterialIcons name="share" size={20} color="#10b981" />
          <Text style={[styles.actionButtonText, { color: '#10b981' }]}>Compartir</Text>
        </TouchableOpacity>
      </View>

      {/* Sync Info */}
      <View style={styles.syncInfo}>
        <MaterialCommunityIcons name="information" size={16} color="#666" />
        <Text style={styles.syncText}>
          Última sincronización: {syncDate.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </Text>
      </View>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {Object.entries(groupedRecords).map(([month, records]) => (
          <View key={month} style={styles.monthSection}>
            <View style={styles.monthHeader}>
              <MaterialIcons name="calendar-today" size={18} color="#5C6B73" />
              <Text style={styles.monthTitle}>{month}</Text>
              <View style={styles.recordCount}>
                <Text style={styles.recordCountText}>{records.length}</Text>
              </View>
            </View>

            {records.map(record => {
              const isExpanded = expandedRecords.has(record.id);
              const iconData = getRecordIcon(record.type);
              const badgeStyle = getRecordBadgeStyle(record.type);
              const date = new Date(record.date);
              
              return (
                <TouchableOpacity
                  key={record.id}
                  style={styles.recordCard}
                  onPress={() => toggleExpand(record.id)}
                  activeOpacity={0.7}
                >
                  <View style={styles.recordHeader}>
                    <View style={[styles.recordIcon, { backgroundColor: badgeStyle.backgroundColor }]}>
                      <MaterialCommunityIcons name={iconData.name} size={22} color={iconData.color} />
                    </View>
                    
                    <View style={styles.recordInfo}>
                      <Text style={styles.recordTitle}>{record.title}</Text>
                      <View style={styles.recordMeta}>
                        <Text style={styles.recordDate}>
                          {date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                        </Text>
                        <View style={[styles.typeBadge, { backgroundColor: badgeStyle.backgroundColor }]}>
                          <Text style={[styles.typeBadgeText, { color: badgeStyle.color }]}>
                            {formatRecordType(record.type)}
                          </Text>
                        </View>
                      </View>
                    </View>
                    
                    <MaterialIcons 
                      name={isExpanded ? "expand-less" : "expand-more"} 
                      size={24} 
                      color="#5C6B73" 
                    />
                  </View>

                  {isExpanded && (
                    <View style={styles.recordDetails}>
                      <View style={styles.divider} />
                      
                      <Text style={styles.recordDescription}>{record.description}</Text>
                      
                      {record.professional && (
                        <View style={styles.detailRow}>
                          <MaterialIcons name="person" size={16} color="#666" />
                          <Text style={styles.detailText}>{record.professional}</Text>
                        </View>
                      )}
                      
                      {record.center && (
                        <View style={styles.detailRow}>
                          <MaterialCommunityIcons name="hospital-building" size={16} color="#666" />
                          <Text style={styles.detailText}>{record.center}</Text>
                        </View>
                      )}
                      
                      {record.attachments && (
                        <View style={styles.detailRow}>
                          <MaterialIcons name="attach-file" size={16} color="#48B0FF" />
                          <Text style={[styles.detailText, { color: '#48B0FF' }]}>
                            {record.attachments} {record.attachments === 1 ? 'archivo adjunto' : 'archivos adjuntos'}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        ))}

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
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  shareButton: {
    backgroundColor: '#fff',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#48B0FF',
  },
  syncInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  syncText: {
    fontSize: 12,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  monthSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#5C6B73',
    textTransform: 'capitalize',
    flex: 1,
  },
  recordCount: {
    backgroundColor: '#B4E1D6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  recordCountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  recordCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  recordIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInfo: {
    flex: 1,
    gap: 6,
  },
  recordTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1d1d1d',
  },
  recordMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  recordDate: {
    fontSize: 12,
    color: '#666',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  recordDetails: {
    marginTop: 12,
    gap: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 4,
  },
  recordDescription: {
    fontSize: 14,
    color: '#1d1d1d',
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 13,
    color: '#666',
  },
});
