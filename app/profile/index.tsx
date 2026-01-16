import { StyleSheet, View, Text, TextInput, Image, Dimensions, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Menu from "../../components/Menu";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { router } from 'expo-router';

export default function Index() {
    const { appointments, medications } = useData();
    const { userProfile, updateProfile, logout } = useAuth();
    
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(userProfile.name);
    const [email, setEmail] = useState(userProfile.email);
    const [phone, setPhone] = useState(userProfile.phone);
    const [age, setAge] = useState(userProfile.age?.toString() || '');
    const [bloodType, setBloodType] = useState(userProfile.bloodType || '');
    const [emergencyName, setEmergencyName] = useState(userProfile.emergencyContact?.name || '');
    const [emergencyRelation, setEmergencyRelation] = useState(userProfile.emergencyContact?.relationship || '');
    const [emergencyPhone, setEmergencyPhone] = useState(userProfile.emergencyContact?.phone || '');
    const [conditions, setConditions] = useState(userProfile.medicalConditions?.join(', ') || '');
    const [allergies, setAllergies] = useState(userProfile.allergies?.join(', ') || '');

    const medsToPick = medications.filter(m => m.toPickUp).length;
    const upcoming = appointments.length;

    const onSave = () => {
      updateProfile({
        name,
        email,
        phone,
        age: age ? parseInt(age) : undefined,
        bloodType,
        emergencyContact: emergencyName ? {
          name: emergencyName,
          relationship: emergencyRelation,
          phone: emergencyPhone,
        } : undefined,
        medicalConditions: conditions ? conditions.split(',').map(c => c.trim()).filter(c => c) : [],
        allergies: allergies ? allergies.split(',').map(a => a.trim()).filter(a => a) : [],
      });
      setIsEditing(false);
      Alert.alert('Perfil actualizado', 'Tus datos se han guardado correctamente');
    };

    const handleLogout = () => {
      Alert.alert(
        'Cerrar sesión',
        '¿Estás seguro que deseas cerrar sesión?',
        [
          { text: 'Cancelar', style: 'cancel' },
          { 
            text: 'Cerrar sesión', 
            style: 'destructive',
            onPress: () => {
              logout();
              router.replace('/');
            }
          }
        ]
      );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                  <MaterialIcons name="arrow-back" size={24} color="#1d1d1d" />
                </TouchableOpacity>
                <View>
                  <Text style={styles.subtitle}>Mi salud</Text>
                  <Text style={styles.title}>Perfil</Text>
                </View>
                <TouchableOpacity 
                  style={styles.editButton}
                  onPress={() => setIsEditing(!isEditing)}
                >
                  <MaterialIcons 
                    name={isEditing ? "close" : "edit"} 
                    size={20} 
                    color={isEditing ? "#666" : "#48B0FF"} 
                  />
                </TouchableOpacity>
            </View>

            <ScrollView 
              style={styles.scrollView} 
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >

                {/* Profile Card */}
                <View style={styles.profileCard}>
                  <Image source={require('../../assets/default-profile.webp')} style={styles.avatar} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.profileName}>{userProfile.name}</Text>
                    <Text style={styles.role}>Afiliado EPS Sura</Text>
                    <View style={styles.stats}>
                      <View style={styles.statItem}>
                        <MaterialIcons name="event" size={20} color="#48B0FF" />
                        <Text style={styles.statValue}>{upcoming}</Text>
                        <Text style={styles.statLabel}>Citas</Text>
                      </View>
                      <View style={styles.statItem}>
                        <MaterialCommunityIcons name="pill" size={20} color="#48B0FF" />
                        <Text style={styles.statValue}>{medsToPick}</Text>
                        <Text style={styles.statLabel}>Por reclamar</Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Personal Info Section */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <MaterialIcons name="person" size={22} color="#5C6B73" />
                    <Text style={styles.sectionTitle}>Información Personal</Text>
                  </View>

                  {isEditing ? (
                    <View style={styles.formCard}>
                      <Text style={styles.inputLabel}>Nombre completo</Text>
                      <TextInput value={name} onChangeText={setName} style={styles.input} />

                      <Text style={styles.inputLabel}>Edad</Text>
                      <TextInput value={age} onChangeText={setAge} style={styles.input} keyboardType='numeric' placeholder="Ej: 45" />

                      <Text style={styles.inputLabel}>Tipo de sangre</Text>
                      <TextInput value={bloodType} onChangeText={setBloodType} style={styles.input} placeholder="Ej: O+, A-, AB+" />

                      <Text style={styles.inputLabel}>Correo electrónico</Text>
                      <TextInput value={email} onChangeText={setEmail} style={styles.input} keyboardType='email-address' />

                      <Text style={styles.inputLabel}>Teléfono</Text>
                      <TextInput value={phone} onChangeText={setPhone} style={styles.input} keyboardType='phone-pad' />
                    </View>
                  ) : (
                    <View style={styles.infoCard}>
                      <View style={styles.infoRow}>
                        <MaterialIcons name="badge" size={18} color="#5C6B73" />
                        <Text style={styles.infoLabel}>Nombre</Text>
                        <Text style={styles.infoValue}>{userProfile.name}</Text>
                      </View>
                      {userProfile.age && (
                        <View style={styles.infoRow}>
                          <MaterialIcons name="cake" size={18} color="#5C6B73" />
                          <Text style={styles.infoLabel}>Edad</Text>
                          <Text style={styles.infoValue}>{userProfile.age} años</Text>
                        </View>
                      )}
                      {userProfile.bloodType && (
                        <View style={styles.infoRow}>
                          <MaterialCommunityIcons name="water" size={18} color="#5C6B73" />
                          <Text style={styles.infoLabel}>Tipo de sangre</Text>
                          <Text style={styles.infoValue}>{userProfile.bloodType}</Text>
                        </View>
                      )}
                      <View style={styles.infoRow}>
                        <MaterialIcons name="email" size={18} color="#5C6B73" />
                        <Text style={styles.infoLabel}>Email</Text>
                        <Text style={styles.infoValue}>{userProfile.email}</Text>
                      </View>
                      <View style={styles.infoRow}>
                        <MaterialIcons name="phone" size={18} color="#5C6B73" />
                        <Text style={styles.infoLabel}>Teléfono</Text>
                        <Text style={styles.infoValue}>{userProfile.phone}</Text>
                      </View>
                    </View>
                  )}
                </View>

                {/* Emergency Contact Section */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <MaterialIcons name="emergency" size={22} color="#5C6B73" />
                    <Text style={styles.sectionTitle}>Contacto de Emergencia</Text>
                  </View>

                  {isEditing ? (
                    <View style={styles.formCard}>
                      <Text style={styles.inputLabel}>Nombre</Text>
                      <TextInput value={emergencyName} onChangeText={setEmergencyName} style={styles.input} placeholder="Ej: María Pérez" />

                      <Text style={styles.inputLabel}>Parentesco</Text>
                      <TextInput value={emergencyRelation} onChangeText={setEmergencyRelation} style={styles.input} placeholder="Ej: Esposa, Hijo, Hermano" />

                      <Text style={styles.inputLabel}>Teléfono</Text>
                      <TextInput value={emergencyPhone} onChangeText={setEmergencyPhone} style={styles.input} keyboardType='phone-pad' placeholder="300 000 0000" />
                    </View>
                  ) : (
                    <View style={styles.infoCard}>
                      {userProfile.emergencyContact ? (
                        <>
                          <View style={styles.infoRow}>
                            <MaterialIcons name="person" size={18} color="#5C6B73" />
                            <Text style={styles.infoLabel}>Nombre</Text>
                            <Text style={styles.infoValue}>{userProfile.emergencyContact.name}</Text>
                          </View>
                          <View style={styles.infoRow}>
                            <MaterialCommunityIcons name="account-group" size={18} color="#5C6B73" />
                            <Text style={styles.infoLabel}>Parentesco</Text>
                            <Text style={styles.infoValue}>{userProfile.emergencyContact.relationship}</Text>
                          </View>
                          <View style={styles.infoRow}>
                            <MaterialIcons name="phone" size={18} color="#5C6B73" />
                            <Text style={styles.infoLabel}>Teléfono</Text>
                            <Text style={styles.infoValue}>{userProfile.emergencyContact.phone}</Text>
                          </View>
                        </>
                      ) : (
                        <Text style={styles.emptyText}>No hay contacto de emergencia registrado</Text>
                      )}
                    </View>
                  )}
                </View>

                {/* Medical Conditions Section */}
                <View style={styles.section}>
                  <View style={styles.sectionHeader}>
                    <MaterialCommunityIcons name="clipboard-pulse" size={22} color="#5C6B73" />
                    <Text style={styles.sectionTitle}>Condiciones Médicas</Text>
                  </View>

                  {isEditing ? (
                    <View style={styles.formCard}>
                      <Text style={styles.inputLabel}>Afecciones o enfermedades</Text>
                      <Text style={styles.inputHint}>Separadas por comas</Text>
                      <TextInput 
                        value={conditions} 
                        onChangeText={setConditions} 
                        style={[styles.input, styles.textArea]} 
                        placeholder="Ej: Hipertensión, Diabetes tipo 2"
                        multiline
                        numberOfLines={3}
                      />

                      <Text style={styles.inputLabel}>Alergias</Text>
                      <Text style={styles.inputHint}>Separadas por comas</Text>
                      <TextInput 
                        value={allergies} 
                        onChangeText={setAllergies} 
                        style={[styles.input, styles.textArea]} 
                        placeholder="Ej: Penicilina, Polen"
                        multiline
                        numberOfLines={2}
                      />
                    </View>
                  ) : (
                    <View style={styles.infoCard}>
                      <View style={styles.medicalSection}>
                        <Text style={styles.medicalSubtitle}>Afecciones</Text>
                        {userProfile.medicalConditions && userProfile.medicalConditions.length > 0 ? (
                          <View style={styles.tagsContainer}>
                            {userProfile.medicalConditions.map((condition, idx) => (
                              <View key={idx} style={[styles.tag, styles.tagCondition]}>
                                <MaterialCommunityIcons name="alert-circle" size={14} color="#dc2626" />
                                <Text style={styles.tagText}>{condition}</Text>
                              </View>
                            ))}
                          </View>
                        ) : (
                          <Text style={styles.emptyText}>Sin afecciones registradas</Text>
                        )}
                      </View>

                      <View style={styles.medicalSection}>
                        <Text style={styles.medicalSubtitle}>Alergias</Text>
                        {userProfile.allergies && userProfile.allergies.length > 0 ? (
                          <View style={styles.tagsContainer}>
                            {userProfile.allergies.map((allergy, idx) => (
                              <View key={idx} style={[styles.tag, styles.tagAllergy]}>
                                <MaterialCommunityIcons name="alert" size={14} color="#f59e0b" />
                                <Text style={styles.tagText}>{allergy}</Text>
                              </View>
                            ))}
                          </View>
                        ) : (
                          <Text style={styles.emptyText}>Sin alergias registradas</Text>
                        )}
                      </View>
                    </View>
                  )}
                </View>

                {isEditing && (
                  <TouchableOpacity style={styles.saveButton} onPress={onSave}>
                    <MaterialIcons name="check-circle" size={20} color="#fff" />
                    <Text style={styles.saveButtonText}>Guardar cambios</Text>
                  </TouchableOpacity>
                )}

                {!isEditing && (
                  <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <MaterialIcons name="logout" size={20} color="#dc2626" />
                    <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
                  </TouchableOpacity>
                )}

                <View style={{ height: 100 }} />
            </ScrollView>

        </SafeAreaView>
    );
}

const screenHeight = Dimensions.get('window').height

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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
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
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  avatar: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: '#E8F5FD',
    marginRight: 16,
  },
  profileName: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1d1d1d',
    marginBottom: 4,
  },
  role: { 
    color: '#666', 
    fontSize: 13,
    marginBottom: 12,
  },
  stats: { 
    flexDirection: 'row', 
    gap: 16,
  },
  statItem: { 
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6,
  },
  statValue: { 
    fontSize: 16, 
    fontWeight: '700',
    color: '#1d1d1d',
  },
  statLabel: { 
    color: '#666',
    fontSize: 12,
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
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    gap: 14,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoLabel: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#1d1d1d',
    fontWeight: '600',
    flex: 2,
  },
  formCard: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputLabel: { 
    fontWeight: '700', 
    fontSize: 14,
    color: '#5C6B73',
    marginTop: 12,
    marginBottom: 6,
  },
  inputHint: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
  input: { 
    backgroundColor: '#F8FAFB', 
    padding: 12, 
    borderRadius: 10,
    fontSize: 14,
    color: '#1d1d1d',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  emptyText: {
    color: '#999',
    fontSize: 13,
    fontStyle: 'italic',
  },
  medicalSection: {
    marginBottom: 16,
  },
  medicalSubtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5C6B73',
    marginBottom: 10,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  tagCondition: {
    backgroundColor: '#fee2e2',
  },
  tagAllergy: {
    backgroundColor: '#fef3c7',
  },
  tagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1d1d1d',
  },
  saveButton: { 
    marginTop: 16,
    marginHorizontal: 20,
    backgroundColor: '#48B0FF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 16,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 2,
    borderColor: '#fee2e2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  logoutButtonText: {
    color: '#dc2626',
    fontWeight: '700',
    fontSize: 16,
  },
});