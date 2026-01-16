# 🏥 Gestor de Salud Comunitario - JADOS

[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-54.0-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

Aplicación móvil integral para la gestión de salud de pacientes y familiares, desarrollada como proyecto emprendedor por estudiantes de la Universidad Tecnológica de Pereira (UTP).

## 👥 Autores

- **Daniel Andrés Ortiz Solano** - Estudiante de Ingeniería de Sistemas - UTP
- **Juan David Álvarez Mejía** - Estudiante de Ingeniería de Sistemas - UTP

📍 **Universidad Tecnológica de Pereira (UTP)**  
📅 **Semestre 8 - Proyecto de Emprendimiento**  
📍 **Pereira, Colombia**

## 📋 Descripción del Proyecto

JADOS es una solución móvil diseñada para facilitar la gestión integral de la salud de pacientes, especialmente orientada a familias y cuidadores. La aplicación permite llevar un control completo de medicamentos, citas médicas, historial clínico y más, todo desde un dispositivo móvil.

### 🎯 Problema que Resuelve

En Colombia, muchas familias tienen dificultades para:
- Organizar los horarios de medicación de sus pacientes
- Recordar citas médicas importantes
- Mantener un historial médico centralizado
- Gestionar múltiples pacientes en el entorno familiar
- Acceder a información de centros de salud de manera rápida

JADOS centraliza toda esta información en una aplicación intuitiva y fácil de usar.

## ✨ Características Principales

### 🏠 Dashboard Familiar
- Vista general del estado de salud de los pacientes
- Recordatorios de medicamentos del día
- Próximas citas médicas
- Integración con noticias de salud (Sura)

### 💊 Gestión de Medicamentos
- **Control de administración**: Horarios programados con marcado de tomas
- **Recordatorios**: Notificaciones para tomas pendientes
- **Medicamentos por reclamar**: Lista de medicamentos pendientes en farmacia
- **Agenda de medicamentos**: Programación de nuevos tratamientos

### 📅 Gestión de Citas Médicas
- Agendar nuevas citas
- Visualizar calendario de citas
- Agregar notas a las citas
- Eliminar o reprogramar citas
- Búsqueda de centros de salud disponibles

### 🏥 Centros de Salud
- Directorio de centros médicos
- Información de contacto y ubicación
- Integración con el sistema de citas

### 📋 Historial Médico
- Registro completo del paciente
- Historial de consultas
- Diagnósticos previos
- Tratamientos realizados

### 👨‍👩‍👧 Gestión de Pacientes
- Crear perfiles de pacientes familiares
- Vincular cuidadores
- Ver lista completa de pacientes a cargo
- Datos personales y de contacto

### 🌟 Funcionalidades Premium
- Consejos de salud personalizados
- Acceso a contenido educativo
- Noticias del sector salud

### 🆘 Soporte
- Centro de ayuda integrado
- Contacto directo con soporte
- Preguntas frecuentes

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React Native** - Framework de desarrollo móvil multiplataforma
- **TypeScript** - Tipado estático para mayor robustez del código
- **Expo** - Plataforma para desarrollo y despliegue
- **Expo Router** - Navegación basada en sistema de archivos

### UI/UX
- **React Native Safe Area Context** - Manejo de áreas seguras
- **React Native Gesture Handler** - Gestos táctiles
- **React Native Reanimated** - Animaciones fluidas
- **@expo/vector-icons** - Iconografía (MaterialIcons, Ionicons, etc.)
- **@react-native-picker/picker** - Selectores nativos

### Estado y Contexto
- **Context API** - Manejo de estado global
  - `AuthContext`: Autenticación de usuarios
  - `DataContext`: Gestión de datos de pacientes, medicamentos y citas

### Estilos
- **StyleSheet API** - Estilos modulares y reutilizables
- Componentes de diseño personalizados:
  - `PrimaryButton`
  - `InputField`
  - `Menu`
  - `HeaderMenu`

## 📁 Estructura del Proyecto

```
Gestor-de-salud-emprendimiento/
├── app/                          # Pantallas de la aplicación (Expo Router)
│   ├── _layout.tsx              # Layout raíz
│   ├── index.tsx                # Pantalla de inicio de sesión
│   ├── signUp/                  # Registro de usuarios
│   ├── dashboardFamily/         # Dashboard principal
│   ├── CreatePatientFamily/     # Crear paciente
│   ├── viewPatientsFamily/      # Ver pacientes
│   ├── linkCaregiver/           # Vincular cuidador
│   ├── medications/             # Gestión de medicamentos
│   │   ├── index.tsx
│   │   ├── schedule.tsx
│   │   └── daily.tsx
│   ├── appointments/            # Gestión de citas
│   │   ├── index.tsx
│   │   ├── schedule.tsx
│   │   └── browse.tsx
│   ├── medical-history/         # Historial médico
│   ├── centers/                 # Centros de salud
│   ├── news/                    # Noticias de salud
│   ├── premium-tips/            # Contenido premium
│   ├── support/                 # Soporte
│   └── profile/                 # Perfil de usuario
├── components/                   # Componentes reutilizables
│   ├── PrimaryButton.tsx
│   ├── InputField.tsx
│   ├── Menu.tsx
│   ├── HeaderMenu.tsx
│   └── patient.tsx
├── context/                      # Contextos de React
│   ├── AuthContext.tsx
│   └── DataContext.tsx
├── styles/                       # Estilos modulares
│   ├── signInStyle.jsx
│   ├── signUpStyle.jsx
│   └── createPatientStyle.jsx
├── assets/                       # Recursos estáticos
│   ├── fonts/                   # Fuentes (Nunito)
│   ├── logo-jados.png
│   └── sura.png
├── app.json                      # Configuración de Expo
├── package.json                  # Dependencias del proyecto
└── tsconfig.json                 # Configuración de TypeScript
```

## 🚀 Instalación y Configuración

### Prerrequisitos

- **Node.js** (v18 o superior)
- **npm** o **yarn**
- **Expo CLI** (opcional, recomendado)
- **Expo Go** (app en tu dispositivo móvil) o emuladores

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/DaniOrtiz248/Gestor-de-salud-emprendimiento.git
cd Gestor-de-salud-emprendimiento
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Iniciar el proyecto**
```bash
npm start
# o
expo start
```

4. **Ejecutar en dispositivo**
- Escanea el código QR con **Expo Go** (Android/iOS)
- O presiona `a` para Android o `i` para iOS en el emulador

### Scripts Disponibles

```bash
npm start          # Inicia el servidor de desarrollo
npm run android    # Ejecuta en Android
npm run ios        # Ejecuta en iOS
npm run web        # Ejecuta en navegador web
```

## 📱 Capturas de Pantalla

> _Próximamente: Capturas de pantalla de las principales funcionalidades_

## 🎨 Paleta de Colores

- **Primario**: `#A5D8FF` (Azul claro)
- **Secundario**: `#007AFF` (Azul iOS)
- **Fondo**: `#FFFFFF` (Blanco)
- **Texto**: `#333333` (Gris oscuro)

## 🔐 Autenticación

El sistema cuenta con:
- Registro de usuarios
- Inicio de sesión con email y contraseña
- Gestión de sesiones con Context API
- Protección de rutas privadas

## 📊 Modelo de Datos

### Paciente
```typescript
{
  id: string,
  name: string,
  age: number,
  sex: 'male' | 'female',
  address: string,
  phone: string
}
```

### Medicamento
```typescript
{
  id: string,
  name: string,
  schedule: string[],
  taken: { [time: string]: boolean },
  toPickUp: boolean
}
```

### Cita Médica
```typescript
{
  id: string,
  date: string,
  centerId: string,
  notes?: string
}
```

## 🔮 Roadmap

- [ ] Integración con backend real (Firebase/AWS)
- [ ] Notificaciones push para recordatorios
- [ ] Modo offline con sincronización
- [ ] Exportación de historial médico a PDF
- [ ] Integración con wearables
- [ ] Chat en tiempo real con soporte
- [ ] Versión web responsive

## 🤝 Contribuciones

Este es un proyecto académico-emprendedor. Si deseas contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es propiedad de los autores y se encuentra en desarrollo como parte de un proyecto emprendedor de la Universidad Tecnológica de Pereira.

## 📞 Contacto

**Daniel Andrés Ortiz Solano**
- GitHub: [@DaniOrtiz248](https://github.com/DaniOrtiz248)

**Juan David Álvarez Mejía**
- GitHub: _[Perfil pendiente]_

**Proyecto Link**: [https://github.com/DaniOrtiz248/Gestor-de-salud-emprendimiento](https://github.com/DaniOrtiz248/Gestor-de-salud-emprendimiento)

---

<p align="center">
  Desarrollado con ❤️ por estudiantes de la Universidad Tecnológica de Pereira
  <br>
  <strong>UTP - Ingeniería de Sistemas y Computación</strong>
  <br>
  Pereira, Colombia 🇨🇴
</p>
