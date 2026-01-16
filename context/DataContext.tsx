import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Appointment = {
  id: string;
  date: string;
  centerId?: string;
  notes?: string;
};

export type Medication = {
  id: string;
  name: string;
  toPickUp: boolean;
  schedule: string[]; // times as string e.g. '08:00'
  taken: { [time: string]: boolean };
  quantity?: number; // amount in stock
  dosage?: string; // e.g. '500mg', '1 tableta'
  purpose?: string; // e.g. 'Para el dolor', 'Antibiótico'
  instructions?: string; // additional instructions
};

export type NewsItem = {
  id: string;
  title: string;
  content: string;
  date: string;
};

export type Center = {
  id: string;
  name: string;
  schedule: string; // text description
};

export type Professional = {
  id: string;
  name: string;
  specialty: string;
  centerId: string;
  schedule: { day: string; hours: string }[];
  available: boolean;
};

type DataContextType = {
  appointments: Appointment[];
  addAppointment: (a: Omit<Appointment, 'id'>) => void;
  removeAppointment: (id: string) => void;

  medications: Medication[];
  addMedication: (m: Omit<Medication, 'id' | 'taken'>) => void;
  toggleMedicationTaken: (medId: string, time: string) => void;

  news: NewsItem[];
  addNews: (n: Omit<NewsItem, 'id' | 'date'>) => void;

  centers: Center[];
  addCenter: (c: Omit<Center, 'id'>) => void;

  professionals: Professional[];
  addProfessional: (p: Omit<Professional, 'id'>) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'apt1',
      date: '2025-11-18T10:30:00',
      centerId: 'c1',
      notes: 'Control general - Medicina General',
    },
    {
      id: 'apt2',
      date: '2025-11-22T14:00:00',
      centerId: 'c3',
      notes: 'Seguimiento cardiológico',
    },
    {
      id: 'apt3',
      date: '2025-11-25T09:00:00',
      centerId: 'c2',
      notes: 'Exámenes de laboratorio',
    },
    {
      id: 'apt4',
      date: '2025-12-01T15:30:00',
      centerId: 'c1',
      notes: 'Consulta dermatología',
    },
  ]);
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: 'med1',
      name: 'Paracetamol',
      toPickUp: false,
      schedule: ['08:00', '14:00', '20:00'],
      taken: { '08:00': false, '14:00': false, '20:00': false },
      quantity: 30,
      dosage: '500mg',
      purpose: 'Analgésico para el dolor',
      instructions: 'Tomar con alimentos',
    },
    {
      id: 'med2',
      name: 'Ibuprofeno',
      toPickUp: false,
      schedule: ['12:00', '20:00'],
      taken: { '12:00': false, '20:00': false },
      quantity: 15,
      dosage: '400mg',
      purpose: 'Antiinflamatorio',
      instructions: 'Tomar después de las comidas',
    },
    {
      id: 'med3',
      name: 'Losartán',
      toPickUp: true,
      schedule: ['08:00'],
      taken: { '08:00': false },
      quantity: 0,
      dosage: '50mg',
      purpose: 'Control de presión arterial',
      instructions: 'Tomar en ayunas',
    },
  ]);
  const [news, setNews] = useState<NewsItem[]>([
    { id: 'n1', title: 'Bienvenido', content: 'Noticias iniciales de la EPS aliada', date: new Date().toISOString() },
    { id: 'n_sura', title: 'Sura informa: nueva ruta de atención', content: 'La EPS Sura anuncia horarios ampliados en puntos seleccionados para facilitar acceso a afiliados.', date: new Date().toISOString() },
  ]);

  const [centers, setCenters] = useState<Center[]>([
    { id: 'c1', name: 'Punto de Salud Central', schedule: 'Lun-Vie 8:00-17:00' },
    { id: 'c2', name: 'Centro Médico Norte', schedule: 'Lun-Sáb 7:00-19:00' },
    { id: 'c3', name: 'Clínica Sur Sura', schedule: 'Lun-Vie 8:00-18:00' },
  ]);

  const [professionals, setProfessionals] = useState<Professional[]>([
    {
      id: 'p1',
      name: 'Dr. Carlos Mendoza',
      specialty: 'Medicina General',
      centerId: 'c1',
      schedule: [
        { day: 'Lunes', hours: '08:00-12:00' },
        { day: 'Miércoles', hours: '14:00-18:00' },
        { day: 'Viernes', hours: '08:00-12:00' },
      ],
      available: true,
    },
    {
      id: 'p2',
      name: 'Dra. Ana López',
      specialty: 'Pediatría',
      centerId: 'c2',
      schedule: [
        { day: 'Martes', hours: '09:00-13:00' },
        { day: 'Jueves', hours: '14:00-18:00' },
      ],
      available: true,
    },
    {
      id: 'p3',
      name: 'Dr. Miguel Ramírez',
      specialty: 'Cardiología',
      centerId: 'c3',
      schedule: [
        { day: 'Lunes', hours: '10:00-14:00' },
        { day: 'Miércoles', hours: '10:00-14:00' },
      ],
      available: true,
    },
    {
      id: 'p4',
      name: 'Dra. Laura Gómez',
      specialty: 'Dermatología',
      centerId: 'c1',
      schedule: [
        { day: 'Martes', hours: '08:00-12:00' },
        { day: 'Viernes', hours: '14:00-18:00' },
      ],
      available: true,
    },
    {
      id: 'p5',
      name: 'Dr. Pedro Sánchez',
      specialty: 'Ortopedia',
      centerId: 'c2',
      schedule: [
        { day: 'Lunes', hours: '14:00-18:00' },
        { day: 'Jueves', hours: '08:00-12:00' },
      ],
      available: false,
    },
  ]);

  function genId(prefix = '') {
    return prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
  }

  const addAppointment = (a: Omit<Appointment, 'id'>) => {
    const appt: Appointment = { id: genId('a_'), ...a };
    setAppointments((s) => [appt, ...s]);
  };

  const removeAppointment = (id: string) => setAppointments((s) => s.filter((x) => x.id !== id));

  const addMedication = (m: Omit<Medication, 'id' | 'taken'>) => {
    const id = genId('m_');
    const taken: { [time: string]: boolean } = {};
    m.schedule.forEach((t) => (taken[t] = false));
    const med: Medication = { id, ...m, taken } as Medication;
    setMedications((s) => [med, ...s]);
  };

  const toggleMedicationTaken = (medId: string, time: string) => {
    setMedications((s) =>
      s.map((med) => {
        if (med.id !== medId) return med;
        const next = { ...med.taken, [time]: !med.taken[time] };
        return { ...med, taken: next };
      })
    );
  };

  const addNews = (n: Omit<NewsItem, 'id' | 'date'>) => {
    const item: NewsItem = { id: genId('news_'), date: new Date().toISOString(), ...n };
    setNews((s) => [item, ...s]);
  };

  const addCenter = (c: Omit<Center, 'id'>) => {
    const center: Center = { id: genId('cent_'), ...c };
    setCenters((s) => [center, ...s]);
  };

  const addProfessional = (p: Omit<Professional, 'id'>) => {
    const prof: Professional = { id: genId('prof_'), ...p };
    setProfessionals((s) => [prof, ...s]);
  };

  return (
    <DataContext.Provider
      value={{ 
        appointments, addAppointment, removeAppointment, 
        medications, addMedication, toggleMedicationTaken, 
        news, addNews, 
        centers, addCenter,
        professionals, addProfessional 
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData must be used within DataProvider');
  return ctx;
};

export default DataContext;
