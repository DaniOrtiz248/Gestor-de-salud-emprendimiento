import { createContext, useContext, useState, ReactNode } from 'react';

export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  age?: number;
  bloodType?: string;
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
  };
  medicalConditions?: string[];
  allergies?: string[];
};

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  userProfile: UserProfile;
  updateProfile: (profile: Partial<UserProfile>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Juan Pérez',
    email: 'juan.perez@example.com',
    phone: '300 123 4567',
    age: 45,
    bloodType: 'O+',
    emergencyContact: {
      name: 'María Pérez',
      relationship: 'Esposa',
      phone: '300 987 6543',
    },
    medicalConditions: ['Hipertensión', 'Diabetes tipo 2'],
    allergies: ['Penicilina'],
  });

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const updateProfile = (profile: Partial<UserProfile>) => {
    setUserProfile(prev => ({ ...prev, ...profile }));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userProfile, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
