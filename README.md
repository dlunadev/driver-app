# 📱 HOP - Descripción Completa del Proyecto

## 🎯 Propósito del Proyecto

**HOP** es una aplicación móvil de transporte tipo ride-sharing (similar a Uber/Cabify) desarrollada específicamente para el mercado chileno. La plataforma conecta dos tipos de usuarios:

- **Hoppies (Pasajeros)**: Usuarios que solicitan viajes desde y hacia hoteles
- **Hoppers (Conductores)**: Conductores que aceptan y realizan los viajes

La aplicación está diseñada para facilitar el transporte turístico y hotelero, con características específicas como gestión de equipaje, vuelos, movilidad reducida y múltiples pasajeros.

---

## 🏗️ Arquitectura y Estructura del Proyecto

### **Stack Tecnológico Principal**

#### **Framework Base**
- **React Native** `0.76.9` - Framework principal para desarrollo móvil multiplataforma
- **Expo SDK** `~52.0.46` - Plataforma de desarrollo que simplifica el workflow
- **Expo Router** `~4.0.16` - Sistema de navegación basado en sistema de archivos (file-based routing)
- **TypeScript** `5.3.3` - Lenguaje tipado para mayor seguridad y mantenibilidad

#### **UI/UX y Estilización**
- **Gluestack UI** - Sistema de componentes UI modular y accesible
- **NativeWind** `4.1.23` - Tailwind CSS para React Native
- **Tailwind CSS** `3.4.17` - Framework de utilidades CSS
- **React Native Reanimated** `3.16.1` - Animaciones de alto rendimiento
- **React Native Gesture Handler** `2.20.2` - Manejo avanzado de gestos
- **@legendapp/motion** `2.4.0` - Animaciones declarativas
- **Expo Linear Gradient** - Gradientes nativos

#### **Navegación y Rutas**
- **Expo Router** con navegación basada en carpetas
- **React Navigation Bottom Tabs** `7.2.0` - Navegación inferior
- **React Navigation Drawer** `7.1.1` - Menú lateral
- **React Native Screens** `4.4.0` - Optimización de pantallas nativas
- **React Native Safe Area Context** `4.12.0` - Manejo de áreas seguras

#### **Manejo de Estado y Datos**
- **SWR** `2.3.0` - React hooks para data fetching con caché inteligente
- **React Context API** - Para estado global (auth, drawer)
- **AsyncStorage** - Persistencia local de datos
- **Axios** `1.7.9` - Cliente HTTP con interceptores personalizados

#### **Formularios y Validaciones**
- **Formik** `2.4.6` - Manejo robusto de formularios
- **Yup** `1.6.1` - Esquemas de validación
- **Ajv** `8.17.1` - Validador JSON Schema

#### **Mapas y Geolocalización**
- **React Native Maps** `1.18.0` - Integración de mapas nativos
- **Expo Location** `18.0.4` - Geolocalización en tiempo real
- **Mapbox API** - Para geocoding y direcciones
- **Google Maps API** - Servicios de mapas complementarios

#### **Comunicación en Tiempo Real**
- **Socket.IO Client** `4.8.1` - WebSockets para notificaciones en vivo y tracking

#### **Notificaciones Push**
- **Expo Notifications** `0.29.13` - Sistema de notificaciones push
- **Firebase** `11.2.0` - Backend para notificaciones (FCM)

#### **Internacionalización (i18n)**
- **i18next** `24.2.0` - Framework de internacionalización
- **react-i18next** `15.4.0` - Integración con React
- **Expo Localization** `16.0.0` - Detección de idioma del dispositivo
- Soporte para múltiples idiomas (español, inglés)

#### **Gráficos y Visualización**
- **React Native Gifted Charts** `1.4.61` - Gráficos interactivos
- **React Native SVG Charts** `5.4.0` - Gráficos basados en SVG
- **React Native SVG** `15.8.0` - Renderizado de SVG

#### **Media y Archivos**
- **Expo Image Picker** `16.0.4` - Selección de imágenes
- **Expo Camera** `16.0.10` - Acceso a cámara
- **Expo Document Picker** `13.0.2` - Selección de documentos
- **Expo File System** `18.0.12` - Sistema de archivos
- **Expo Media Library** `17.0.4` - Acceso a galería

#### **Servicios de Terceros**
- **MetaMap SDK** - Verificación de identidad (KYC)
- **SumUp** `0.1.36` - Integración de pagos
- **MercadoPago** - Gateway de pagos
- **Sentry Expo** `7.0.0` - Monitoreo de errores y performance

#### **Utilidades**
- **Day.js** `1.11.13` - Manejo de fechas
- **Countries List** `3.1.1` - Lista de países
- **RutLib** `1.0.5` - Validación de RUT chileno
- **React Native Size Matters** `0.4.2` - Responsive design

#### **Developer Experience**
- **ESLint** `8.57.1` - Linting con configuración Airbnb
- **Prettier** `3.5.3` - Formateo de código
- **Husky** `9.1.7` - Git hooks
- **Lint-staged** `16.0.0` - Linting pre-commit
- **Jest** `29.7.0` - Testing framework
- **React Native Testing Library** - Testing de componentes

---

## 📂 Estructura de Carpetas Detallada

```
hop/
├── src/
│   ├── app/                    # Rutas (File-based routing con Expo Router)
│   │   ├── (auth)/            # Grupo de rutas de autenticación
│   │   │   ├── index.tsx      # Pantalla de bienvenida
│   │   │   ├── sign-in/       # Login
│   │   │   ├── sign-up/       # Registro (con wizard multi-paso)
│   │   │   ├── password/      # Recuperación de contraseña
│   │   │   ├── validation/    # Validación de cuenta
│   │   │   ├── onboarding/    # Onboarding inicial
│   │   │   └── map/           # Selección de ubicación
│   │   │
│   │   ├── (tabs)/            # Navegación principal (Bottom Tabs)
│   │   │   ├── index.tsx      # Home/Mapa principal
│   │   │   ├── booking.tsx    # Reservas activas
│   │   │   ├── history.tsx    # Historial de viajes
│   │   │   ├── wallet.tsx     # Billetera/Comisiones
│   │   │   └── profile.tsx    # Perfil de usuario
│   │   │
│   │   ├── (booking)/         # Flujo de reserva
│   │   ├── (history)/         # Detalles de historial
│   │   ├── (home)/            # Subpantallas de home
│   │   ├── (profile)/         # Edición de perfil
│   │   ├── (settings)/        # Configuraciones
│   │   ├── notification/      # Centro de notificaciones
│   │   ├── _layout.tsx        # Layout raíz con providers
│   │   ├── +not-found.tsx     # Página 404
│   │   ├── error.tsx          # Página de error
│   │   └── loading.tsx        # Pantalla de carga
│   │
│   ├── axios/                 # Configuración de Axios
│   │   └── axios.config.ts    # Instancia con interceptores
│   │
│   ├── components/            # Componentes reutilizables
│   │   ├── balance/          # Visualización de saldo
│   │   ├── booking/          # Componentes de reserva
│   │   ├── button/           # Botones personalizados
│   │   ├── calendar/         # Selector de fechas
│   │   ├── carousel/         # Carruseles
│   │   ├── chart/            # Gráficos
│   │   ├── container/        # Contenedores base
│   │   ├── forms/            # Inputs de formularios
│   │   ├── header/           # Headers personalizados
│   │   ├── hopper/           # Específicos de conductores
│   │   ├── input/            # Campos de texto
│   │   ├── keyboard/         # Teclado aware scroll
│   │   ├── linear-gradient/  # Gradientes
│   │   ├── loading/          # Indicadores de carga
│   │   ├── map_home/         # Componentes de mapa
│   │   ├── modal/            # Modales personalizados
│   │   ├── phone-number/     # Input de teléfono con código país
│   │   ├── select/           # Selectores
│   │   ├── services/         # Tarjetas de servicios
│   │   ├── sheet/            # Bottom sheets
│   │   ├── step-controls/    # Controles de wizard
│   │   ├── switch/           # Switches
│   │   ├── tabbar/           # Tab bar personalizado
│   │   ├── take_booking/     # UI de tomar viaje (hopper)
│   │   ├── text/             # Textos tipográficos
│   │   ├── tooltip/          # Tooltips
│   │   └── ui/               # Componentes base de Gluestack
│   │
│   ├── context/              # Contextos globales
│   │   ├── auth.context.tsx  # Estado de autenticación
│   │   └── drawer.context.tsx # Estado del drawer
│   │
│   ├── helpers/              # Funciones auxiliares
│   │   ├── capitalize-words.ts
│   │   ├── check-empty-fields.ts
│   │   └── [otros helpers]
│   │
│   ├── hooks/                # Hooks personalizados
│   │   ├── animations/       # Hooks de animación
│   │   ├── api/              # Hooks para APIs externas
│   │   │   ├── use-get-countries.hook.ts
│   │   │   └── use-get-direction.hook.ts
│   │   ├── location/         # Hooks de geolocalización
│   │   ├── media/            # Hooks de cámara/galería
│   │   ├── notifications/    # Hooks de notificaciones
│   │   ├── real-data/        # Hooks de datos en tiempo real
│   │   ├── swr/              # Hooks de SWR
│   │   │   ├── use-me.ts     # Usuario actual
│   │   │   ├── use-bookings.ts
│   │   │   ├── use-history.ts
│   │   │   ├── use-travel.ts
│   │   │   └── [otros hooks SWR]
│   │   └── utils/            # Hooks de utilidades
│   │
│   ├── services/             # Capa de servicios (API calls)
│   │   ├── auth.service.ts   # Autenticación y usuarios
│   │   ├── book.service.ts   # Reservas y viajes
│   │   ├── bank.service.ts   # Datos bancarios
│   │   ├── notification.service.ts
│   │   ├── report.service.ts
│   │   ├── user.service.ts
│   │   └── validation.service.ts
│   │
│   └── utils/                # Utilidades y configuración
│       ├── constants/        # Constantes
│       │   ├── Colors.ts     # Paleta de colores
│       │   ├── vehicles.constants.ts
│       │   ├── documentation.constants.ts
│       │   └── [otras constantes]
│       ├── enum/             # Enumeraciones
│       │   ├── role.enum.ts  # Roles de usuario
│       │   ├── travel.enum.ts # Estados de viaje
│       │   ├── payment.enum.ts
│       │   └── [otros enums]
│       ├── i18n/             # Internacionalización
│       │   ├── i18next.ts
│       │   └── resources.ts
│       ├── interfaces/       # TypeScript interfaces
│       │   ├── auth.interface.ts
│       │   ├── booking.interface.ts
│       │   └── [otras interfaces]
│       ├── locales/          # Traducciones
│       ├── schemas/          # Esquemas de validación Yup
│       └── types/            # TypeScript types
│
├── assets/                   # Assets estáticos
│   ├── fonts/               # Fuentes Outfit (9 variantes)
│   ├── images/              # Imágenes (icon, splash, logo)
│   ├── sounds/              # Sonidos de notificación
│   └── svg/                 # Iconos SVG
│
├── .expo/                   # Caché de Expo
├── node_modules/            # Dependencias
├── app.config.js           # Configuración de Expo
├── babel.config.js         # Configuración de Babel
├── config.ts               # Variables de configuración
├── eas.json                # Configuración de EAS Build
├── firebaseConfig.js       # Configuración de Firebase
├── global.css              # Estilos globales
├── metro.config.js         # Configuración de Metro bundler
├── package.json            # Dependencias del proyecto
├── tailwind.config.js      # Configuración de Tailwind
└── tsconfig.json           # Configuración de TypeScript
```

---

## 📱 Permisos de la Aplicación

HOP requiere los siguientes permisos del sistema operativo para funcionar correctamente:

### **Permisos de Android**

| Permiso | Uso | Obligatorio |
|---------|-----|-------------|
| `ACCESS_FINE_LOCATION` | Ubicación precisa del usuario para tracking en tiempo real y mapas | ✅ Sí |
| `ACCESS_COARSE_LOCATION` | Ubicación aproximada como respaldo | ✅ Sí |
| `CAMERA` | Tomar fotos de documentos (licencia, RUT, vehículo) y foto de perfil | ✅ Sí (Hoppers) |
| `RECORD_AUDIO` | Grabación de audio para futuras funcionalidades de soporte | ❌ No |
| `READ_EXTERNAL_STORAGE` | Leer imágenes de la galería para documentos y perfil | ✅ Sí |
| `WRITE_EXTERNAL_STORAGE` | Guardar imágenes capturadas | ✅ Sí |
| `ACCESS_NETWORK_STATE` | Verificar conectividad a internet | ✅ Sí |
| `RECEIVE` (Push Notifications) | Recibir notificaciones de estado de viajes | ✅ Sí |

### **Permisos de iOS**

| Permiso | Descripción | Uso |
|---------|-------------|-----|
| `NSLocationWhenInUseUsageDescription` | Ubicación cuando se usa la app | Tracking de viajes y mapas |
| `NSLocationAlwaysAndWhenInUseUsageDescription` | Ubicación en segundo plano | Tracking continuo para Hoppers |
| `NSCameraUsageDescription` | "Allow HOP to access your camera" | Tomar fotos de documentos |
| `NSPhotoLibraryUsageDescription` | Acceso a galería de fotos | Seleccionar fotos existentes |
| `NSMicrophoneUsageDescription` | "Allow HOP to access your microphone" | Funcionalidades futuras |
| `UIBackgroundModes` | `fetch`, `remote-notification` | Notificaciones push y actualizaciones |

### **¿Por qué necesitamos estos permisos?**

#### 📍 **Ubicación (Crítico)**
- **Hoppies**: Seleccionar origen y destino, ver conductor en tiempo real
- **Hoppers**: Tracking continuo durante el viaje, actualización de posición cada 10 segundos
- **Ambos**: Cálculo de distancias, rutas, y tarifas

#### 📷 **Cámara y Galería (Crítico para Hoppers)**
- Verificación de identidad con MetaMap (KYC)
- Documentos requeridos: licencia de conducir (ambos lados), RUT, permiso de circulación
- Fotos del vehículo (4 ángulos)
- Foto de perfil

#### 🔔 **Notificaciones Push (Crítico)**
- Nuevas solicitudes de viaje (Hoppers)
- Estado del viaje (conductor en camino, viaje iniciado, etc.)
- Confirmaciones de pago
- Mensajes del sistema

#### 🌐 **Conexión a Internet (Crítico)**
- Comunicación con API backend
- WebSockets para actualizaciones en tiempo real
- Carga y descarga de datos de viajes

---

## 🔑 Funcionalidades Principales

### **Para Hoppies (Pasajeros)**

#### 1. **Solicitud de Viajes Completa**

**Tipos de Viaje Disponibles:**
- 🚗 **Viaje Inmediato**: Solicitud instantánea con conductor disponible
- 📅 **Viaje Programado**: Reserva con fecha y hora específica (hasta 30 días)
- ✈️ **Pickup (Recogida en Aeropuerto)**: Recogida desde terminal aérea
- 🏨 **Dropoff (Hacia Aeropuerto)**: Traslado hacia terminal aérea

**Configuración Detallada:**
- 📍 Selección de origen y destino con:
  - Autocompletado de direcciones
  - Selección en mapa interactivo
  - Guardado de direcciones frecuentes
  - Detección automática de ubicación actual
- 👥 Número de pasajeros (1-8)
- 🧳 Cantidad de maletas/equipaje
- ♿ Opción de movilidad reducida (sillas de ruedas, asistencia especial)
- ✈️ Información de vuelo:
  - Aerolínea
  - Número de vuelo
  - Hora de llegada/salida
- 💵 Cálculo automático de tarifa basado en:
  - Distancia (kilómetros)
  - Tiempo estimado
  - Tipo de servicio
  - Hora del día

#### 2. **Tracking y Monitoreo en Tiempo Real**

- 📍 Visualización en vivo de:
  - Ubicación exacta del conductor
  - Ruta que está siguiendo
  - Tiempo estimado de llegada (ETA)
  - Distancia restante
- 🔔 Notificaciones push instantáneas:
  - Conductor asignado
  - Conductor en camino
  - Conductor ha llegado
  - Viaje iniciado
  - Viaje finalizado
- 📞 Comunicación directa con el conductor
- 🗺️ Actualización de posición cada 10 segundos

#### 3. **Historial y Gestión**

- 📊 **Historial Completo**:
  - Lista de todos los viajes realizados
  - Filtros por fecha, estado, tipo
  - Detalles completos de cada viaje:
    - Origen y destino
    - Fecha y hora
    - Conductor asignado
    - Monto pagado
    - Duración del viaje
    - Distancia recorrida
- ⭐ **Direcciones Favoritas**:
  - Guardado rápido de ubicaciones frecuentes
  - Etiquetas personalizadas (Casa, Trabajo, Hotel, etc.)
  - Acceso rápido en nuevas reservas
- 📊 **Estadísticas Personales**:
  - Total de viajes realizados
  - Distancia total recorrida
  - Gasto total
  - Gráficos mensuales

#### 4. **Sistema de Pagos Múltiple**

- 💳 **MercadoPago**:
  - Pago con tarjeta de crédito/débito
  - Transferencias bancarias
  - Pago en efectivo (puntos autorizados)
- 💳 **SumUp**:
  - Gateway alternativo de pagos
  - Procesamiento seguro
- 📱 **Link de Pago WhatsApp**:
  - Generación automática de link
  - Envío directo por WhatsApp
  - Pago desde navegador móvil
- 📊 **Historial de Transacciones**:
  - Registro de todos los pagos
  - Comprobantes descargables
  - Estado de pagos (pendiente, completado, cancelado)

#### 5. **Funcionalidades Adicionales para Hoppies**

- 🏨 **Integración con Hoteles**:
  - Perfil de hotel asociado
  - Reservas en nombre del hotel
  - Gestión de huéspedes
- 🔔 **Centro de Notificaciones**:
  - Historial de todas las notificaciones
  - Organización por categorías
  - Notificaciones leídas/no leídas
- 👤 **Perfil Personalizable**:
  - Foto de perfil
  - Información de contacto
  - Preferencias de viaje
  - Configuración de privacidad

### **Para Hoppers (Conductores)**

#### 1. **Sistema de Aceptación de Viajes**

- 🔔 **Notificaciones en Tiempo Real**:
  - Alerta sonora de nueva solicitud
  - Vibración del dispositivo
  - Notificación push incluso con app cerrada
- 📱 **Detalles Antes de Aceptar**:
  - Origen y destino del viaje
  - Distancia total
  - Tiempo estimado
  - Ganancia estimada (comisión)
  - Información del pasajero
  - Número de pasajeros y maletas
  - Requisitos especiales (movilidad reducida)
  - Tipo de viaje (inmediato/programado/aeropuerto)
- ⏱️ **Temporizador de Aceptación**:
  - 60 segundos para aceptar o rechazar
  - Contador regresivo visible
  - Reasignación automática si no responde
- ✅ **Opciones**:
  - Aceptar viaje
  - Rechazar viaje (sin penalización)
  - Ver en mapa antes de decidir

#### 2. **Gestión Completa de Viajes**

**Estados del Viaje:**
```
📩 REQUEST (Solicitud) 
  ↓
✅ ACCEPT (Aceptado)
  ↓
🚗 ON_WAY (En camino)
  ↓
👋 ARRIVED (Llegado)
  ↓
▶️ START (Iniciado)
  ↓
🏁 END (Finalizado)
```

**Funcionalidades por Estado:**

- **ACCEPT (Aceptado)**:
  - Confirmación instantánea al pasajero
  - Visualización de ruta al punto de origen
  - Botón "Iniciar navegación"
  - Llamada directa al pasajero

- **ON_WAY (En camino)**:
  - 🗺️ Navegación integrada con Google Maps
  - Tracking automático de posición (cada 10s)
  - Actualización de ETA en tiempo real
  - Botón "He llegado"

- **ARRIVED (Llegado)**:
  - Notificación automática al pasajero
  - Espera del pasajero
  - Botón "Iniciar viaje" (cuando el pasajero sube)

- **START (Iniciado)**:
  - Cronómetro del viaje en curso
  - Navegación al destino
  - Tracking continuo
  - Botón "Finalizar viaje"

- **END (Finalizado)**:
  - Confirmación de llegada
  - Resumen del viaje:
    - Duración total
    - Distancia recorrida
    - Comisión ganada
  - Solicitud de pago (si no está pagado)
  - Disponibilidad para nuevo viaje

#### 3. **Panel de Ganancias y Comisiones**

- 💰 **Comisiones Pendientes**:
  - Total acumulado sin retirar
  - Desglose por viaje
  - Fecha de cada comisión
  - Estado de pago

- 📊 **Estadísticas Detalladas**:
  - Ganancias diarias/semanales/mensuales
  - Número de viajes completados
  - Promedio de ganancia por viaje
  - Horas trabajadas
  - Distancia total recorrida
  - Gráficos interactivos:
    - Línea de tiempo de ganancias
    - Gráfico de barras por día
    - Comparativa mensual

- 💳 **Desglose de Comisiones**:
  - Comisión del conductor (tu ganancia)
  - Comisión de la plataforma
  - Comisión de peajes (si aplica)
  - Total del viaje

- 📝 **Historial de Retiros**:
  - Registro de pagos recibidos
  - Método de pago utilizado
  - Comprobantes descargables

#### 4. **Proceso de Validación y Onboarding Completo**

**🔐 Verificación de Identidad (KYC con MetaMap):**
- Escaneo de documento de identidad
- Verificación facial biométrica
- Validación de datos personales
- Detección de documentos falsos
- Validación en tiempo real

**📝 Documentos Requeridos (con Sistema de Carga):**

1. **Licencia de Conducir**:
   - Foto del frente
   - Foto del reverso
   - Verificación de vigencia
   - Clase de licencia compatible

2. **RUT (Rol Único Tributario)**:
   - Frente del documento
   - Reverso del documento
   - Validación de formato chileno

3. **Permiso de Circulación**:
   - Documento vigente del año actual
   - Verificación de placa/patente

4. **Decreto SEREMI**:
   - Autorización para transporte remunerado
   - Documento oficial

5. **Currículum Vitae**:
   - Experiencia en conducción
   - Referencias laborales

6. **Seguro de Pasajeros**:
   - Póliza vigente
   - Cobertura mínima requerida

7. **Fotos del Vehículo** (4 ángulos):
   - Frente
   - Lateral derecho
   - Lateral izquierdo
   - Posterior
   - Interior (opcional)

**✅ Proceso de Aprobación**:
- Envío de documentos
- Revisión por equipo administrativo
- Notificación de estado:
  - 🟋 Documentos pendientes
  - 🔍 En revisión
  - ❌ Rechazado (con motivos)
  - ✅ Aprobado
- Activación de cuenta
- Acceso completo a la plataforma

#### 5. **Funcionalidades Adicionales para Hoppers**

- 🚗 **Perfil del Vehículo**:
  - Marca, modelo, año
  - Color
  - Patente/placa
  - Número de pasajeros
  - Fotos del vehículo
  - Estado de mantenimiento

- 💳 **Información Bancaria**:
  - Banco asociado
  - Número de cuenta
  - Tipo de cuenta
  - RUT del titular
  - Configuración de retiros automáticos

- ⏰ **Gestión de Disponibilidad**:
  - Modo "Disponible" / "No disponible"
  - Horarios de trabajo preferidos
  - Zonas de operación preferidas

- 📊 **Panel de Rendimiento**:
  - Rating/calificación promedio
  - Tasa de aceptación
  - Tasa de cancelación
  - Tiempo promedio de respuesta
  - Viajes completados vs rechazados

### **Funcionalidades Comunes (Ambos Tipos de Usuario)**

#### 1. **Sistema de Autenticación y Seguridad Robusto**

**🔐 Registro de Usuario:**
- Formulario multi-paso (wizard):
  - Paso 1: Información básica (nombre, email, teléfono)
  - Paso 2: Creación de contraseña segura
  - Paso 3: Validación de RUT chileno
  - Paso 4: Selección de rol (Hoppy/Hopper)
  - Paso 5: Términos y condiciones
- Validaciones en tiempo real:
  - Formato de email válido
  - Contraseña fuerte (mínimo 8 caracteres, mayúsculas, números)
  - RUT chileno válido con dígito verificador
  - Teléfono con código de país
- Verificación de cuenta vía email

**🔑 Login Seguro:**
- Autenticación con email y contraseña
- Tokens JWT (JSON Web Tokens):
  - Access token (corta duración)
  - Refresh token (larga duración)
  - Renovación automática de tokens
- Sesión persistente:
  - Almacenamiento seguro con AsyncStorage
  - Login automático en próximo inicio
  - Cierre de sesión manual disponible

**🔓 Recuperación de Contraseña:**
- Solicitud vía email
- Link temporal de restablecimiento
- Validación de nueva contraseña
- Confirmación de cambio exitoso

**🛡️ Seguridad Adicional:**
- Encriptación de datos sensibles
- Protección contra ataques CSRF
- Rate limiting en requests
- Validación de tokens en cada request
- Logout automático en múltiples dispositivos

#### 2. **Perfil de Usuario Completo**

**👤 Información Personal Editable:**
- Nombre completo
- Email (con verificación)
- Teléfono con código de país
- RUT chileno
- Fecha de nacimiento
- Género
- Dirección completa

**📸 Foto de Perfil:**
- Captura con cámara
- Selección desde galería
- Recorte y ajuste de imagen
- Compresión automática
- Actualización instantánea

**💳 Información Bancaria (Solo Hoppers):**
- Banco
- Tipo de cuenta (corriente/vista/ahorro)
- Número de cuenta
- RUT del titular
- Email para notificaciones de pago

**🏨 Información de Hotel (Solo Hoppies):**
- Nombre del hotel
- Dirección del hotel
- Teléfono de contacto
- Email corporativo
- Puesto/cargo

**🚗 Datos del Vehículo (Solo Hoppers):**
- Marca y modelo
- Año de fabricación
- Color
- Patente/placa
- Capacidad de pasajeros
- Tipo de vehículo
- Fotos del vehículo

#### 3. **Sistema de Notificaciones Avanzado**

**🔔 Push Notifications:**
- Notificaciones en tiempo real incluso con app cerrada
- Sonido personalizado
- Vibración
- Badge counter en icono de app
- Deep linking (abre directamente la sección relevante)

**📨 Tipos de Notificaciones:**

*Para Hoppies:*
- Conductor asignado a tu viaje
- Conductor en camino
- Conductor ha llegado
- Viaje iniciado
- Viaje finalizado
- Confirmación de pago
- Viaje programado próximo (24h antes)
- Recordatorio de viaje (1h antes)

*Para Hoppers:*
- Nueva solicitud de viaje
- Viaje cancelado por pasajero
- Pago recibido
- Comisión depositada
- Documentos aprobados/rechazados
- Actualización de cuenta

**📱 Centro de Notificaciones In-App:**
- Historial completo de notificaciones
- Organización por fecha
- Filtros por tipo:
  - Viajes
  - Pagos
  - Sistema
  - Promociones
- Marcar como leído/no leído
- Eliminar notificaciones
- Borrar todas

**⚙️ Configuración de Notificaciones:**
- Activar/desactivar por tipo
- Configurar sonido
- Configurar vibración
- Horarios de no molestar

#### 4. **Internacionalización (i18n) Completa**

**🌐 Idiomas Soportados:**
- 🇪🇸 Español (predeterminado para Chile)
- 🇬🇧 Inglés (para turistas internacionales)

**🔄 Funcionalidades:**
- Detección automática del idioma del dispositivo
- Cambio manual de idioma en configuración
- Traducción completa de:
  - Interfaz de usuario
  - Mensajes de error
  - Notificaciones
  - Emails del sistema
- Formato de fecha y hora según locale
- Formato de moneda (CLP para Chile)
- Formato de números según región

**📝 Glosario Traducido:**
- Más de 500 términos traducidos
- Terminología específica de transporte
- Mensajes de validación
- Instrucciones de uso

#### 5. **Sistema de Geolocalización Avanzado**

**📍 Tracking en Tiempo Real:**
- Ubicación GPS de alta precisión
- Actualización automática cada 10 segundos
- Tracking en segundo plano (para Hoppers durante viaje)
- Optimización de batería
- Fallback a ubicación aproximada si GPS no disponible

**🗺️ Mapas Interactivos:**
- Integración con Mapbox y Google Maps
- Zoom y pan suaves
- Rotación del mapa
- Vista satelital/normal
- Tráfico en tiempo real

**🔍 Geocoding:**
- Búsqueda de direcciones con autocompletado
- Sugerencias mientras escribes
- Geocoding reverso (coordenadas → dirección)
- Validación de direcciones
- Formato de direcciones chilenas

**🛣️ Cálculo de Rutas:**
- Ruta óptima entre dos puntos
- Consideración de tráfico actual
- Rutas alternativas
- Distancia total
- Tiempo estimado de llegada (ETA)
- Actualización dinámica del ETA

**📍 Marcadores y Pins:**
- Pin de origen (verde)
- Pin de destino (rojo)
- Pin de conductor (azul, animado)
- Ruta trazada en el mapa
- Zoom automático para mostrar toda la ruta

#### 6. **Configuraciones y Personalización**

**⚙️ Configuración de Cuenta:**
- Cambio de contraseña
- Actualización de email
- Verificación en dos pasos (próximamente)
- Eliminar cuenta

**🎨 Preferencias de Aplicación:**
- Tema oscuro/claro (automático según sistema)
- Idioma de interfaz
- Unidades de medida (km/mi)
- Formato de hora (12h/24h)

**🔔 Preferencias de Notificaciones:**
- Activar/desactivar por categoría
- Sonido personalizado
- Vibración
- Notificaciones de email
- Notificaciones SMS

**🔒 Privacidad y Seguridad:**
- Control de visibilidad de perfil
- Historial de actividad
- Dispositivos conectados
- Cierre de sesión en todos los dispositivos

#### 7. **Soporte y Ayuda**

**❓ Centro de Ayuda:**
- Preguntas frecuentes (FAQ)
- Guías paso a paso
- Videos tutoriales
- Solución de problemas comunes

**📞 Contacto con Soporte:**
- Chat en vivo (próximamente)
- Email de soporte
- Teléfono de atención
- Formulario de contacto

**📢 Reportes:**
- Reportar problema técnico
- Reportar conductor/pasajero
- Sugerencias de mejora
- Feedback general

#### 8. **Accesibilidad**

**♿ Funcionalidades de Accesibilidad:**
- Soporte para lectores de pantalla
- Tamaños de texto ajustables
- Alto contraste
- Navegación por teclado
- Etiquetas ARIA
- Descripciones de imágenes

#### 9. **Performance y Optimización**

**⚡ Optimizaciones:**
- Carga rápida de aplicación
- Lazy loading de componentes
- Caché inteligente con SWR
- Compresión de imágenes
- Minimización de consumo de datos
- Optimización de batería

**📊 Monitoreo:**
- Tracking de errores con Sentry
- Analytics de uso
- Performance monitoring
- Crash reporting

---

## 🔐 Sistema de Autenticación y Autorización

### **Roles de Usuario**
```typescript
enum userRoles {
  USER_SUPER_ADMIN = 'USER_SUPER_ADMIN',  // Administrador
  USER_HOPPER = 'USER_HOPPER',            // Conductor
  USER_HOPPY = 'USER_HOPPY',              // Pasajero
}
```

### **Flujo de Autenticación**

1. **Login**:
   - Email + contraseña → Backend
   - Recibe `access_token` y `refresh_token`
   - Guarda en AsyncStorage
   - Redirige según estado del usuario

2. **Estados del Usuario**:
   - `isVerified: false` → Completar onboarding
   - `isActive: false` → Esperando validación de administrador
   - `isActive: true` → Acceso completo a la app

3. **Interceptores de Axios**:
   - Añade automáticamente el token de autorización
   - Maneja refresh automático del token en 401
   - Queue de requests durante el refresh

---

## 🗺️ Sistema de Mapas y Geolocalización

### **Servicios Utilizados**

- **Mapbox**: Geocoding, direcciones, cálculo de rutas
- **Google Maps**: Visualización de mapas, navegación
- **Expo Location**: Tracking de ubicación en tiempo real

### **Funcionalidades**

1. Selección de ubicación con autocompletado
2. Cálculo de distancia y tiempo estimado
3. Trazado de ruta entre origen y destino
4. Tracking del conductor en vivo
5. Actualización automática cada 10 segundos

---

## 💬 Sistema de Comunicación en Tiempo Real

### **Socket.IO**

```typescript
// Conexión al servidor
const socket = useSocket('url');

// Escucha eventos personalizados por usuario
socket.on(`user-${user.id}`, (message: TravelNotification) => {
  // Manejo de notificaciones en tiempo real
});
```

### **Tipos de Notificaciones**

- Nueva solicitud de viaje
- Viaje aceptado
- Conductor en camino
- Viaje iniciado
- Viaje finalizado
- Pago confirmado
- Viaje cancelado

---

## 💳 Sistema de Pagos

### **Gateways Integrados**

1. **MercadoPago**: Principal gateway de pagos
2. **SumUp**: Gateway alternativo
3. **WhatsApp**: Envío de link de pago

### **Estados de Pago**

```typescript
enum paymentStatus {
  PENDING = 'PENDING',     // Pendiente
  DONE = 'DONE',           // Pagado
  CANCELLED = 'CANCELLED', // Cancelado
  FINISHED = 'FINISHED',   // Finalizado
}
```

---

## 📊 Sistema de Comisiones (para Hoppers)

### **Estructura de Comisiones**

- **Comisión del Hopper**: Ganancia del conductor
- **Comisión de la App**: Fee de la plataforma
- **Comisión de Peajes**: Costos de peajes

### **Visualización**

- Gráficos mensuales de ganancias
- Comisiones pendientes de retiro
- Historial detallado por viaje

---

## 🌐 API Backend

### **URL Base**: `url`

### **Endpoints Principales**

#### Autenticación
- `POST /auth/login` - Login
- `GET /auth/refresh` - Refresh token
- `POST /mail/recoveryPassword` - Recuperación de contraseña

#### Usuarios
- `GET /user/logged` - Usuario actual
- `POST /user` - Crear usuario
- `PUT /user-info/:id` - Actualizar info
- `PATCH /user-vehicle/:id` - Actualizar vehículo
- `PATCH /user-documents/:id` - Subir documentos

#### Viajes
- `POST /travels` - Crear viaje
- `GET /travels` - Listar viajes (con paginación)
- `GET /travels/one/:id` - Obtener viaje
- `PATCH /travels/:id` - Actualizar viaje
- `GET /travels/frecuentAddress` - Direcciones frecuentes
- `GET /travels/commissions/:id` - Comisiones
- `GET /travels/pending-commissions/:id` - Comisiones pendientes

#### Notificaciones
- `GET /notifications/` - Listar notificaciones

#### Bancos
- `GET /banks` - Listar bancos

---

## 🎨 Sistema de Diseño

### **Paleta de Colores**

```typescript
const Colors = {
  PRIMARY: '#9FE4DD',        // Verde agua claro
  SECONDARY: '#2EC4B6',      // Verde azulado
  DARK_GREEN: "#10524B",     // Verde oscuro
  WHITE: '#FCFCFC',          // Blanco
  BLACK: '#303231',          // Negro
  ERROR: "#9A0000",          // Rojo error
  GRAY: "#8E8E8E",           // Gris
  LIGHT_GRAY: "#D1D1D1",     // Gris claro
  YELLOW: "#887605",         // Amarillo
  LIGHT_YELLOW: "#DFE992",   // Amarillo claro
  VIOLET: "#5A6EBD",         // Violeta
  LIGHT_RED: "#E9BEC0",      // Rojo claro
};
```

### **Tipografía**

Fuente principal: **Outfit**
- Outfit-Thin
- Outfit-ExtraLight
- Outfit-Light
- Outfit-Regular
- Outfit-Medium
- Outfit-SemiBold
- Outfit-Bold
- Outfit-ExtraBold
- Outfit-Black

---

## 🔐 Seguridad y Configuración de Variables de Entorno

### **Archivos de Configuración Sensibles**

El proyecto contiene varios archivos con claves API y credenciales que **NO deben ser commiteados** al repositorio. Estos archivos están listados en `.gitignore`:

#### Archivos Protegidos:
- `.env` - Variables de entorno
- `config.ts` - Configuración de APIs
- `firebaseConfig.js` - Credenciales de Firebase
- `google-services.json` - Configuración de Google Services (Android)
- `GoogleService-Info.plist` - Configuración de Google Services (iOS)
- `app.config.js` - Configuración de la app con variables sensibles

### **Configuración Inicial del Proyecto**

Al clonar el proyecto por primera vez, debes crear los archivos de configuración a partir de los templates:

1. **Variables de Entorno**:
```bash
cp .env.template .env
```
Luego edita `.env` y completa tus claves API.

2. **Configuración de TypeScript**:
```bash
cp config.ts.template config.ts
```
Edita `config.ts` con tus credenciales.

3. **Firebase**:
```bash
cp firebaseConfig.js.template firebaseConfig.js
```
Completa con tus credenciales de Firebase.

4. **Google Services** (si trabajas con Android/iOS):
Descarga los archivos de configuración desde tu proyecto de Firebase:
- `google-services.json` para Android
- `GoogleService-Info.plist` para iOS

### **Variables de Entorno Requeridas**

```env
# MetaMap (Verificación de identidad)
EXPO_METAMAP_API_KEY=""
EXPO_METAMAP_FLOW_ID=""

# API Backend
EXPO_API_URL=""

# Mapbox
EXPO_PUBLIC_API_URL_MAP=""
EXPO_PUBLIC_MAPBOX_API_URL=""
EXPO_PUBLIC_MAPBOX_DIRECTIONS_API_URL=""

# País API
EXPO_PUBLIC_COUNTRY_API=""

# SumUp (Pagos)
EXPO_PUBLIC_SUMUP_KEY=""
EXPO_SECRET_SUMUP_KEY=""
EXPO_CLIENT_ID_SUMUP=""
EXPO_CLIENT_SECRET_SUMUP=""
EXPO_MERCHANT_CODE=""

# Google Maps
EXPO_GOOGLE_MAPS_API_KEY=""

# Sentry (Monitoreo)
EXPO_SENTRY_URL_DEV=""
EXPO_SENTRY_URL_PROD=""
```

### **⚠️ Advertencias de Seguridad**

- **NUNCA** commitees archivos `.env`, `config.ts`, o `firebaseConfig.js` con credenciales reales
- **NUNCA** compartas tus claves API públicamente
- Rota las claves inmediatamente si fueron expuestas accidentalmente
- Usa diferentes claves para desarrollo y producción
- Revisa el `.gitignore` antes de hacer push al repositorio

---

## 🧪 Testing y Calidad de Código

### **Herramientas**

- **Jest**: Testing framework
- **React Native Testing Library**: Testing de componentes
- **ESLint**: Linting con reglas de Airbnb
- **Prettier**: Formateo automático
- **TypeScript**: Tipado estático
- **Husky**: Git hooks pre-commit
- **Lint-staged**: Linting solo de archivos modificados

---

## 📱 Configuración de Build

### **Plataformas**

- **iOS**: Bundle identifier: `com.novexisconsulting.hop`
- **Android**: Package: `com.novexisconsulting.hop`

### **EAS Build**

Configurado para builds nativos con Expo Application Services

---

## 🔒 Monitoreo y Errores

### **Sentry**

Integración completa con Sentry para:
- Tracking de errores en producción
- Performance monitoring
- Release tracking
- User feedback

---

## 🌍 Configuración Regional

- **País objetivo**: Chile
- **Moneda**: Peso Chileno (CLP)
- **Validación de documentos**: RUT chileno
- **Idiomas**: Español (principal), Inglés

---

## 📝 Notas Adicionales

Esta es una aplicación móvil empresarial completa y robusta, con arquitectura moderna, buenas prácticas de código, y un stack tecnológico de última generación para desarrollo móvil multiplataforma.

### **Características Destacadas**

- ✅ Arquitectura escalable y modular
- ✅ Tipado estricto con TypeScript
- ✅ Sistema de navegación file-based con Expo Router
- ✅ Gestión eficiente de estado con SWR y Context API
- ✅ Comunicación en tiempo real con WebSockets
- ✅ Integración completa de mapas y geolocalización
- ✅ Sistema robusto de autenticación con refresh tokens
- ✅ Manejo de errores con Sentry
- ✅ Testing automatizado
- ✅ CI/CD con Husky y lint-staged
- ✅ Internacionalización completa
- ✅ UI/UX moderna con animaciones fluidas
