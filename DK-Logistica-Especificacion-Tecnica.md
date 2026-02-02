# DK Logística y Transportes - Especificación Técnica MVP

## 📋 Índice
1. [Descripción General](#1-descripción-general)
2. [Stack Tecnológico](#2-stack-tecnológico-sugerido)
3. [Arquitectura de Datos](#3-arquitectura-de-datos)
4. [Flujo de Servicio](#4-flujo-de-servicio)
5. [APIs Principales](#5-apis-principales)
6. [Integración Radar.io](#6-integración-radario)
7. [Sistema de Precios](#7-sistema-de-precios)
8. [Consideraciones MVP](#8-consideraciones-mvp)
9. [Infraestructura](#9-infraestructura-mínima)
10. [Modelo de Negocio](#10-modelo-de-negocio)
11. [Próximos Pasos](#11-próximos-pasos)

---

## 1. Descripción General

**Proyecto:** DK Logística y Transportes  
**Tipo:** Plataforma móvil tipo marketplace  
**Servicios:** Fletes, paquetería y mudanzas  
**Zona inicial:** Estado de Morelos, México  
**Modelo:** Conecta clientes con choferes mediante geolocalización y asignación automática

---

## 2. Stack Tecnológico Sugerido

### 📱 Apps Móviles
- **React Native** o **Flutter** (cross-platform iOS/Android)
- **Expo** (si React Native, para desarrollo rápido)
- **React Navigation** / **Flutter Navigator** (navegación)

### ⚙️ Backend
- **Node.js + Express** o **Python + FastAPI**
- **PostgreSQL** + **PostGIS** (datos geoespaciales)
- **Firebase** o **Socket.io** (comunicación en tiempo real)
- **JWT** (autenticación)
- **Bcrypt** (encriptación de contraseñas)

### 🗺️ Geolocalización
- **Radar.io** (recomendado - fácil integración, generoso free tier)
  - Tracking en tiempo real
  - Geocoding
  - Distance API
  - Geofencing
- **Alternativas:** Mapbox, Google Maps Platform

### 💻 Panel Admin
- **React** o **Next.js**
- **Tailwind CSS** (estilos)
- **shadcn/ui** o **Ant Design** (componentes)
- **Recharts** (gráficas y estadísticas)

### 📦 Storage
- **AWS S3** o **Cloudflare R2** (imágenes/documentos)

### 🔔 Notificaciones
- **Firebase Cloud Messaging (FCM)** (push notifications)

---

## 3. Arquitectura de Datos

### 👤 Usuario
```javascript
{
  id: uuid,
  email: string,
  password: hash,
  nombre: string,
  apellidos: string,
  telefono: string,
  rol: 'cliente' | 'chofer' | 'admin',
  foto_perfil: url,
  calificacion_promedio: float,
  total_servicios: int,
  activo: boolean,
  created_at: timestamp,
  updated_at: timestamp
}
```

### 🚗 Perfil Chofer (extends Usuario)
```javascript
{
  id: uuid,
  user_id: uuid,
  numero_licencia: string,
  foto_licencia: url,
  curp: string,
  rfc: string,
  vehiculo: {
    marca: string,
    modelo: string,
    año: int,
    placas: string,
    tipo: 'pickup' | 'camioneta_1ton' | 'camioneta_3.5ton',
    capacidad_kg: int,
    fotos: [url],
    tarjeta_circulacion: url
  },
  cuenta_bancaria: {
    banco: string,
    clabe: string,
    titular: string
  },
  documentos_verificados: boolean,
  verificado_por: uuid,
  fecha_verificacion: timestamp,
  disponible: boolean,
  ubicacion_actual: {
    lat: float,
    lng: float,
    timestamp: timestamp
  },
  created_at: timestamp
}
```

### 📦 Servicio
```javascript
{
  id: uuid,
  folio: string, // "DK-2026-0001"
  cliente_id: uuid,
  chofer_id: uuid | null,
  tipo: 'flete' | 'mudanza' | 'paqueteria',
  
  origen: {
    direccion: string,
    referencias: string,
    lat: float,
    lng: float,
    zona_id: uuid
  },
  
  destino: {
    direccion: string,
    referencias: string,
    lat: float,
    lng: float,
    zona_id: uuid
  },
  
  estado: 'solicitado' | 'asignado' | 'aceptado' | 'en_camino' | 
          'cargando' | 'en_transito' | 'descargando' | 'completado' | 
          'cancelado',
  
  precio_total: decimal,
  comision_plataforma: decimal,
  pago_chofer: decimal,
  metodo_pago: 'efectivo' | 'transferencia' | 'tarjeta',
  pagado: boolean,
  
  distancia_km: float,
  duracion_estimada_min: int,
  
  descripcion_carga: text,
  peso_estimado_kg: int,
  requiere_ayudantes: boolean,
  numero_ayudantes: int,
  
  notas_cliente: text,
  notas_chofer: text,
  fotos_carga: [url],
  fotos_entrega: [url],
  
  fecha_solicitud: timestamp,
  fecha_asignacion: timestamp,
  fecha_inicio: timestamp,
  fecha_completado: timestamp,
  fecha_cancelacion: timestamp,
  razon_cancelacion: text,
  
  calificacion_cliente: int, // 1-5
  comentario_cliente: text,
  calificacion_chofer: int, // 1-5
  comentario_chofer: text,
  
  created_at: timestamp,
  updated_at: timestamp
}
```

### 🗺️ Zona de Precio
```javascript
{
  id: uuid,
  nombre: string, // "Cuernavaca Centro", "Jiutepec", "Temixco"
  descripcion: string,
  poligono: geometry, // PostGIS polygon
  activa: boolean,
  color_mapa: string, // hex color para visualización
  created_at: timestamp
}
```

### 💵 Matriz de Precios Punto-a-Punto
```javascript
{
  id: uuid,
  zona_origen_id: uuid,
  zona_destino_id: uuid,
  tipo_servicio: 'flete' | 'mudanza' | 'paqueteria',
  precio_base: decimal,
  precio_km_adicional: decimal, // si excede distancia base
  distancia_base_km: float,
  activo: boolean,
  created_at: timestamp,
  updated_at: timestamp
}
```

### 💰 Transacción
```javascript
{
  id: uuid,
  servicio_id: uuid,
  chofer_id: uuid,
  tipo: 'pago_servicio' | 'retiro' | 'comision',
  monto: decimal,
  saldo_anterior: decimal,
  saldo_nuevo: decimal,
  estado: 'pendiente' | 'procesado' | 'completado',
  referencia: string,
  created_at: timestamp
}
```

### 📊 Configuración Global
```javascript
{
  id: uuid,
  clave: string, // 'comision_porcentaje', 'radio_busqueda_km'
  valor: string,
  tipo: 'numero' | 'texto' | 'booleano',
  descripcion: string,
  updated_at: timestamp
}
```

---

## 4. Flujo de Servicio

### 4.1 Cliente solicita servicio

```
1. Cliente abre app
   └─ Login/Registro

2. Selecciona origen en mapa
   └─ Autocomplete direcciones
   └─ Sistema detecta zona con PostGIS

3. Selecciona destino en mapa
   └─ Sistema detecta zona destino

4. Elige tipo de servicio
   ├─ Flete
   ├─ Mudanza
   └─ Paquetería

5. Sistema consulta matriz de precios
   └─ Muestra precio total

6. Cliente agrega detalles opcionales
   ├─ Descripción de carga
   ├─ Fotos
   ├─ Peso estimado
   └─ Requiere ayudantes

7. Cliente confirma servicio
   └─ estado: 'solicitado'
```

### 4.2 Asignación de chofer

```
Sistema busca choferes disponibles:
├─ disponible = true
├─ dentro de radio X km del origen (config: 15-20km)
├─ tipo de vehículo compatible
└─ ordenados por distancia ascendente

Para cada chofer en la lista:
  1. Enviar notificación push
  2. Esperar respuesta (30 segundos timeout)
  3. Si acepta → asignar servicio
  4. Si rechaza o timeout → siguiente chofer
  5. Si ninguno acepta → notificar cliente y reintentar

Una vez asignado:
  └─ estado: 'asignado'
  └─ Notificar cliente con datos del chofer
```

### 4.3 Ejecución del servicio

```
1. Chofer acepta
   └─ estado: 'aceptado'
   └─ Cliente ve datos del chofer y vehículo

2. Chofer inicia viaje al origen
   └─ estado: 'en_camino'
   └─ Cliente ve tracking en tiempo real

3. Chofer llega a origen
   └─ estado: 'cargando'
   └─ Puede tomar fotos de carga

4. Chofer inicia viaje a destino
   └─ estado: 'en_transito'
   └─ Tracking continúa

5. Chofer llega a destino
   └─ estado: 'descargando'
   └─ Puede tomar fotos de entrega

6. Chofer completa servicio
   └─ estado: 'completado'
   └─ Cliente califica servicio
   └─ Chofer califica cliente
   └─ Se procesa pago
```

### 4.4 Seguimiento en tiempo real

```
Chofer App (cada 10-15 segundos):
  └─ Envía ubicación a Radar.io
  └─ Actualiza ubicacion_actual en BD

Cliente App (cada 5 segundos si servicio activo):
  └─ Consulta ubicación del chofer vía API
  └─ Actualiza marcador en mapa

WebSocket eventos:
  ├─ estado_cambio → notificar ambos usuarios
  ├─ mensaje_chat → enviar mensaje
  └─ servicio_completado → finalizar tracking
```

---

## 5. APIs Principales

### 🔐 Autenticación

```http
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh-token
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
```

### 👤 Usuario

```http
GET    /api/users/me
PUT    /api/users/me
PUT    /api/users/me/foto
GET    /api/users/:id
DELETE /api/users/me
```

### 📦 Servicios (Cliente)

```http
POST   /api/servicios/cotizar
  Body: { origen, destino, tipo_servicio }
  Response: { precio, distancia, duracion_estimada }

POST   /api/servicios/solicitar
  Body: { origen, destino, tipo, precio, detalles }
  Response: { servicio_id, estado }

GET    /api/servicios/:id
GET    /api/servicios/:id/tracking
  Response: { chofer_ubicacion, estado, eta }

POST   /api/servicios/:id/cancelar
POST   /api/servicios/:id/calificar
  Body: { calificacion, comentario }

GET    /api/servicios/historial
  Query: ?page=1&limit=20&estado=completado
```

### 🚗 Chofer

```http
GET    /api/chofer/perfil
PUT    /api/chofer/perfil
PUT    /api/chofer/vehiculo
POST   /api/chofer/documentos/subir

PUT    /api/chofer/disponibilidad
  Body: { disponible: true/false }

PUT    /api/chofer/ubicacion
  Body: { lat, lng }

GET    /api/chofer/servicios/pendientes
POST   /api/chofer/servicios/:id/aceptar
POST   /api/chofer/servicios/:id/rechazar
POST   /api/chofer/servicios/:id/iniciar
POST   /api/chofer/servicios/:id/completar
  Body: { fotos_entrega }

GET    /api/chofer/servicios/historial
GET    /api/chofer/ganancias
  Query: ?fecha_inicio=2026-01-01&fecha_fin=2026-01-31
  Response: { total, por_pagar, pagado, desglose }

GET    /api/chofer/estadisticas
  Response: { servicios_completados, calificacion, ingresos_mes }
```

### 👨‍💼 Admin

```http
# Dashboard
GET    /api/admin/dashboard
  Response: { 
    servicios_hoy,
    ingresos_hoy,
    choferes_activos,
    clientes_nuevos,
    graficas 
  }

# Servicios
GET    /api/admin/servicios
  Query: ?page=1&limit=50&estado=todos&fecha_inicio&fecha_fin
POST   /api/admin/servicios/:id/cancelar
GET    /api/admin/servicios/:id/detalles

# Choferes
GET    /api/admin/choferes
  Query: ?estado=todos&verificado=true
GET    /api/admin/choferes/:id
POST   /api/admin/choferes/:id/verificar
POST   /api/admin/choferes/:id/suspender
POST   /api/admin/choferes/:id/activar
GET    /api/admin/choferes/:id/servicios
GET    /api/admin/choferes/:id/ganancias

# Clientes
GET    /api/admin/clientes
GET    /api/admin/clientes/:id
GET    /api/admin/clientes/:id/servicios

# Zonas y Precios
GET    /api/admin/zonas
POST   /api/admin/zonas
  Body: { nombre, poligono, activa }
PUT    /api/admin/zonas/:id
DELETE /api/admin/zonas/:id

GET    /api/admin/precios
POST   /api/admin/precios
  Body: { zona_origen_id, zona_destino_id, tipo, precio_base }
PUT    /api/admin/precios/:id
DELETE /api/admin/precios/:id

# Configuración
GET    /api/admin/config
PUT    /api/admin/config
  Body: { comision_porcentaje, radio_busqueda_km, etc }

# Reportes
GET    /api/admin/reportes/ingresos
  Query: ?fecha_inicio&fecha_fin&agrupar_por=dia
GET    /api/admin/reportes/servicios
GET    /api/admin/reportes/choferes
GET    /api/admin/reportes/exportar
  Response: archivo CSV/Excel
```

### 🗺️ Geolocalización

```http
POST   /api/geo/reverse-geocode
  Body: { lat, lng }
  Response: { direccion, zona_id }

POST   /api/geo/geocode
  Body: { direccion }
  Response: { lat, lng, direccion_completa }

POST   /api/geo/detectar-zona
  Body: { lat, lng }
  Response: { zona_id, zona_nombre }

GET    /api/geo/direcciones/autocompletar
  Query: ?q=Av+Morelos&lat=18.9&lng=-99.2
  Response: [{ descripcion, lat, lng }]
```

---

## 6. Integración Radar.io

### Configuración inicial

```javascript
// Instalación
npm install radar-sdk-js

// En Chofer App
import Radar from 'radar-sdk-js';

// Inicializar (al login del chofer)
Radar.initialize('pk_live_YOUR_PUBLISHABLE_KEY');

// Solicitar permisos de ubicación
await Radar.requestPermissions(true);
```

### Tracking del chofer

```javascript
// Cuando chofer activa disponibilidad
async function activarDisponibilidad() {
  try {
    // Identificar usuario en Radar
    await Radar.setUserId(chofer_id);
    
    // Enviar ubicación inicial
    const location = await Radar.trackOnce();
    
    // Iniciar tracking continuo
    await Radar.startTracking({
      // Actualizar cada 30 seg cuando está detenido
      desiredStoppedUpdateInterval: 30,
      // Actualizar cada 15 seg cuando está en movimiento
      desiredMovingUpdateInterval: 15,
      // Detección de movimiento
      desiredSyncInterval: 20,
      // Modo de precisión
      desiredAccuracy: 'high'
    });
    
    console.log('Tracking iniciado:', location);
  } catch (error) {
    console.error('Error al iniciar tracking:', error);
  }
}

// Cuando chofer desactiva disponibilidad
async function desactivarDisponibilidad() {
  await Radar.stopTracking();
  console.log('Tracking detenido');
}

// Callback para eventos de ubicación
Radar.on('location', (result) => {
  console.log('Nueva ubicación:', result.location);
  
  // Enviar a tu backend
  actualizarUbicacionBackend(result.location);
});
```

### Obtener ubicación en Cliente App

```javascript
// Opción A: Desde Radar API directamente
async function obtenerUbicacionChofer(chofer_id) {
  const response = await fetch(
    `https://api.radar.io/v1/users/${chofer_id}/location`,
    {
      headers: {
        'Authorization': 'prj_live_YOUR_PROJECT_KEY'
      }
    }
  );
  
  const data = await response.json();
  return data.location; // { lat, lng, timestamp }
}

// Opción B: Desde tu backend (recomendado)
async function obtenerUbicacionChofer(servicio_id) {
  const response = await fetch(
    `/api/servicios/${servicio_id}/tracking`
  );
  
  const data = await response.json();
  return data.ubicacion_chofer;
}
```

### Backend: Webhook de Radar

```javascript
// Endpoint para recibir actualizaciones de Radar
app.post('/webhooks/radar', async (req, res) => {
  const events = req.body;
  
  for (const event of events) {
    if (event.type === 'user.location_updated') {
      const { userId, location } = event;
      
      // Actualizar ubicación en BD
      await db.query(
        'UPDATE perfil_chofer SET ubicacion_actual = $1 WHERE user_id = $2',
        [location, userId]
      );
      
      // Si el chofer tiene servicio activo, notificar al cliente vía WebSocket
      const servicioActivo = await obtenerServicioActivo(userId);
      if (servicioActivo) {
        io.to(`servicio-${servicioActivo.id}`).emit('chofer_ubicacion', {
          lat: location.latitude,
          lng: location.longitude
        });
      }
    }
  }
  
  res.status(200).send('OK');
});
```

### Cálculo de distancia y ETA

```javascript
// Usar Radar Distance API
async function calcularDistanciaYETA(origen, destino) {
  const response = await fetch(
    'https://api.radar.io/v1/route/distance',
    {
      method: 'POST',
      headers: {
        'Authorization': 'prj_live_YOUR_PROJECT_KEY',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        origin: { latitude: origen.lat, longitude: origen.lng },
        destination: { latitude: destino.lat, longitude: destino.lng },
        modes: 'car',
        units: 'metric'
      })
    }
  );
  
  const data = await response.json();
  return {
    distancia_km: data.routes.car.distance.value / 1000,
    duracion_min: data.routes.car.duration.value / 60
  };
}
```

---

## 7. Sistema de Precios

### 7.1 Configuración de Zonas (Admin)

**Crear zona en mapa:**
```javascript
// Admin panel usa mapa interactivo (Mapbox/Google Maps)
// Admin dibuja polígono en mapa

POST /api/admin/zonas
{
  "nombre": "Cuernavaca Centro",
  "descripcion": "Zona centro de Cuernavaca",
  "poligono": {
    "type": "Polygon",
    "coordinates": [[
      [-99.234, 18.921],
      [-99.234, 18.935],
      [-99.210, 18.935],
      [-99.210, 18.921],
      [-99.234, 18.921]
    ]]
  },
  "activa": true,
  "color_mapa": "#FF5733"
}
```

### 7.2 Matriz de Precios

**Ejemplo de precios configurados:**

| Origen | Destino | Tipo | Precio Base | Distancia Base | Precio/km adicional |
|--------|---------|------|-------------|----------------|---------------------|
| Cuernavaca Centro | Jiutepec | Flete | $350 | 10 km | $15/km |
| Cuernavaca Centro | Jiutepec | Mudanza | $800 | 10 km | $30/km |
| Cuernavaca Centro | Jiutepec | Paquetería | $200 | 10 km | $10/km |
| Cuernavaca Centro | Temixco | Flete | $400 | 15 km | $15/km |
| Jiutepec | Temixco | Flete | $300 | 8 km | $15/km |

### 7.3 Lógica de Cotización

```javascript
async function cotizarServicio(origen, destino, tipoServicio) {
  // 1. Detectar zonas
  const zonaOrigen = await detectarZona(origen.lat, origen.lng);
  const zonaDestino = await detectarZona(destino.lat, destino.lng);
  
  if (!zonaOrigen || !zonaDestino) {
    throw new Error('Ubicación fuera de zona de cobertura');
  }
  
  // 2. Buscar precio en matriz
  const precioConfig = await db.query(`
    SELECT * FROM precios
    WHERE zona_origen_id = $1
      AND zona_destino_id = $2
      AND tipo_servicio = $3
      AND activo = true
  `, [zonaOrigen.id, zonaDestino.id, tipoServicio]);
  
  if (!precioConfig) {
    throw new Error('No hay precio configurado para esta ruta');
  }
  
  // 3. Calcular distancia real
  const { distancia_km } = await calcularDistanciaYETA(origen, destino);
  
  // 4. Calcular precio final
  let precioTotal = precioConfig.precio_base;
  
  if (distancia_km > precioConfig.distancia_base_km) {
    const kmAdicionales = distancia_km - precioConfig.distancia_base_km;
    precioTotal += kmAdicionales * precioConfig.precio_km_adicional;
  }
  
  // 5. Redondear a decenas
  precioTotal = Math.ceil(precioTotal / 10) * 10;
  
  return {
    precio_total: precioTotal,
    distancia_km: distancia_km,
    zona_origen: zonaOrigen.nombre,
    zona_destino: zonaDestino.nombre
  };
}
```

### 7.4 Detección de Zona con PostGIS

```sql
-- Función para detectar zona
CREATE OR REPLACE FUNCTION detectar_zona(lat FLOAT, lng FLOAT)
RETURNS TABLE(zona_id UUID, zona_nombre TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT id, nombre
  FROM zonas
  WHERE ST_Contains(
    poligono,
    ST_SetSRID(ST_MakePoint(lng, lat), 4326)
  )
  AND activa = true
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;
```

### 7.5 Cálculo de Comisión

```javascript
function calcularDistribucion(precioTotal) {
  const comisionPorcentaje = 15; // Obtener de config global
  
  const comisionPlataforma = precioTotal * (comisionPorcentaje / 100);
  const pagoChofer = precioTotal - comisionPlataforma;
  
  return {
    precio_total: precioTotal,
    comision_plataforma: comisionPlataforma,
    pago_chofer: pagoChofer,
    comision_porcentaje: comisionPorcentaje
  };
}

// Ejemplo: Servicio de $500
// comision_plataforma: $75 (15%)
// pago_chofer: $425 (85%)
```

---

## 8. Consideraciones MVP

### ✅ Funcionalidades INCLUIDAS en MVP

**Autenticación y Perfiles:**
- Registro con email/teléfono
- Login con email/contraseña
- Perfil básico de usuario
- Verificación de documentos de chofer (manual por admin)

**Servicios Core:**
- Solicitud de servicio por cliente
- Asignación automática de chofer
- Tracking en tiempo real con Radar.io
- Estados del servicio (completo flujo)
- Calificaciones mutuas (cliente ↔ chofer)

**Pagos:**
- Pago en efectivo al finalizar
- Registro de transacciones
- Dashboard de ganancias para chofer

**Geolocalización:**
- Mapa interactivo
- Autocomplete de direcciones
- Detección de zonas
- Cálculo de distancia y ETA

**Admin:**
- Panel web completo
- Gestión de choferes y clientes
- Configuración de zonas
- Matriz de precios
- Estadísticas básicas
- Verificación de documentos

**Notificaciones:**
- Push notifications (FCM)
- Notificaciones en app

**Multimedia:**
- Subida de fotos de perfil
- Fotos de vehículo
- Fotos de documentos
- Fotos de carga/entrega (opcional)

### ⏳ Funcionalidades POSPUESTAS para v2

**Pagos digitales:**
- Integración Stripe/Conekta
- Pagos con tarjeta
- Split payments automáticos

**Chat en tiempo real:**
- Mensajería dentro de la app
- Historial de conversaciones

**Funciones avanzadas:**
- Múltiples paradas en un servicio
- Servicios programados (reservas futuras)
- Suscripción premium para choferes
- Programa de referidos con recompensas
- Cupones de descuento

**Mejoras UX:**
- Guardado de direcciones favoritas
- Historial de búsquedas
- Modo offline (cache básico)

**Analytics avanzado:**
- Mapas de calor
- Predicción de demanda
- Reportes personalizados

---

## 9. Infraestructura Mínima

### Opción A: Infraestructura Cloud (Recomendado MVP)

**Hosting Backend:**
- **Railway** ($5-20/mes) - Fácil deploy, incluye PostgreSQL
- **DigitalOcean App Platform** ($12-30/mes)
- **AWS EC2 t3.small** ($15-25/mes)
- **Render** ($7-20/mes)

**Base de Datos:**
- **PostgreSQL 14+** con extensión PostGIS
- Railway/DigitalOcean incluyen BD gestionada
- Storage: 10-20 GB inicial

**Storage de Archivos:**
- **Cloudflare R2** (primer 10GB gratis, $0.015/GB después)
- **AWS S3** ($0.023/GB)
- **Backblaze B2** (más económico, $0.005/GB)

**Servicios Externos:**
- **Radar.io:** Plan gratuito 100k requests/mes → Suficiente para MVP
- **Firebase (FCM):** Gratis para notificaciones push
- **SendGrid/Mailgun:** 100 emails/día gratis

### Opción B: VPS Autogestión (Más económico, requiere DevOps)

**VPS:**
- **Contabo** 4GB RAM: €4.99/mes (~$110 MXN)
- **Hetzner** 4GB RAM: €5.83/mes (~$130 MXN)
- **Vultr** 4GB RAM: $12/mes

**Software (todo gratuito):**
- Ubuntu 22.04 LTS
- Nginx (reverse proxy)
- PostgreSQL + PostGIS
- PM2 (gestor de procesos Node.js)
- Certbot (SSL gratis Let's Encrypt)

### Estimación de Costos Mensuales MVP

| Servicio | Costo |
|----------|-------|
| Hosting Backend (Railway) | $15 |
| Base de Datos PostgreSQL | Incluido |
| Storage R2 (20GB) | $1 |
| Radar.io | Gratis |
| Firebase | Gratis |
| Dominio .com.mx | $15 |
| **Total mensual** | **~$30 USD** |

### Escalamiento (100-500 servicios/día)

| Servicio | Costo |
|----------|-------|
| Backend (escalado) | $50 |
| Base de Datos | $20 |
| Storage (100GB) | $5 |
| Radar.io (500k requests) | $29 |
| CDN Cloudflare | Gratis |
| **Total mensual** | **~$100 USD** |

---

## 10. Modelo de Negocio

### 💰 Distribución de Ingresos por Servicio

**Ejemplo: Flete de $500**

```
Cliente paga:           $500  (100%)
├─ Chofer recibe:       $425  (85%)
├─ Plataforma (Admin):   $75  (15%)
└─ Cliente ahorra vs. competencia tradicional
```

### Ganancias del ADMINISTRADOR (DK Logística)

**Fuente Principal: Comisión**
- 15-20% de cada servicio completado
- Modelo escalable (sin inventario físico)

**Ingresos Adicionales (futuro):**
- Suscripción Premium Choferes: $299/mes
  - Prioridad en asignaciones
  - 0% comisión primeros 50 servicios/mes
- Publicidad en app (banners)
- Contratos corporativos B2B

**Proyección Ejemplo:**
```
Fase 1 (Mes 3-6): 50 servicios/día
50 × $400 promedio × 15% = $3,000/día
= $90,000/mes
- Costos operación: -$15,000
= $75,000 utilidad/mes

Fase 2 (Mes 6-12): 200 servicios/día
200 × $400 × 15% = $12,000/día
= $360,000/mes
- Costos operación: -$50,000
= $310,000 utilidad/mes
```

### Ganancias de los CHOFERES

**Por servicio:**
- 85% del precio total
- Pagos semanales vía transferencia
- Sin costos ocultos

**Comparativa vs. Empleo Tradicional:**

```
Chofer DK (flexible):
15 servicios/semana × $400 × 85% = $5,100/semana
× 4.3 semanas = $21,930/mes
- Gasolina y mantenimiento: -$5,000
= $16,930 neto/mes + flexibilidad horaria

Empleado empresa tradicional:
Salario fijo: $6,000-8,000/mes
Horario: Lunes-Sábado 8am-6pm
Sin bonos ni crecimiento
```

**Ventajas adicionales:**
- Horario 100% flexible
- Elige qué servicios aceptar
- Propinas (100% para chofer)
- Bonos por calificación alta (futuro)

### Beneficios para CLIENTES

**Ahorro económico:**
```
Mudanza DK Logística:     $800
Empresa tradicional:   $1,500-2,000
Ahorro:                40-60%
```

**Valor agregado:**
- Transparencia total de precios
- Sin negociación incómoda
- Tracking en tiempo real
- Calificaciones verificadas
- Servicio en minutos (no días)
- Pago contra entrega

**Programa lealtad (v2):**
- 10 servicios → descuento 20%
- Referir amigo → $100 crédito

### Modelo de Pago para PROGRAMADORES

**Opción A: Pago por Desarrollo**
```
Desarrollo MVP completo: $150,000 - $250,000 MXN

Desglose:
├─ App Cliente (React Native): $50,000
├─ App Chofer (React Native): $50,000
├─ Backend + APIs: $60,000
├─ Panel Admin Web: $40,000
├─ Integración Radar/Mapas: $20,000
└─ Testing y deploy: $30,000

Tiempo estimado: 3-4 meses
Equipo: 2-3 desarrolladores
```

**Opción B: Sociedad (Equity)**
```
Programador recibe:
- 10-20% equity (acciones empresa)
- Pago reducido inicial: $50,000
- Participación en utilidades futuras

Proyección 3 años:
Si empresa vale $10M → 15% equity = $1.5M
```

**Opción C: Modelo Híbrido (Recomendado)**
```
- $100,000 pago inicial
- 5-10% equity
- Bonos por hitos:
  ├─ $15,000 al lanzar MVP
  ├─ $10,000 al llegar a 100 servicios/mes
  └─ $20,000 al lograr rentabilidad
```

**Mantenimiento:**
- $15,000-25,000/mes (tiempo completo)
- $500-1,500/hora (freelance por feature)

### Comparativa con Competencia

| Concepto | DK Logística | Uber | DiDi | Empresa Tradicional |
|----------|--------------|------|------|---------------------|
| Comisión | 15% | 25-30% | 20-25% | N/A |
| Chofer gana | 85% | 70-75% | 75-80% | Salario fijo |
| Precio cliente | 100% | 130% | 120% | 200%+ |
| Flexibilidad | Alta | Media | Media | Nula |
| Transparencia | Total | Baja | Baja | Nula |

### Costos Operativos Mensuales (Admin)

**Fase MVP (50 servicios/día):**
```
Ingresos: $90,000
- Infraestructura: $2,000
- Marketing digital: $15,000
- Soporte/CS (medio tiempo): $8,000
- Legal/Contable: $5,000
- Imprevistos: $5,000
= Utilidad neta: $55,000/mes
```

**Fase Crecimiento (200 servicios/día):**
```
Ingresos: $360,000
- Infraestructura: $5,000
- Marketing: $60,000
- Soporte/CS (2 personas): $25,000
- Legal/Contable: $10,000
- Oficina compartida: $8,000
- Imprevistos: $12,000
= Utilidad neta: $240,000/mes
```

---

## 11. Próximos Pasos

### Fase 1: Preparación (Semana 1-2)

**Definición de negocio:**
- [ ] Mapear zonas iniciales de Morelos
- [ ] Establecer matriz de precios base
- [ ] Definir % de comisión final
- [ ] Crear documentos legales básicos
- [ ] Registrar marca y dominio

**Diseño:**
- [ ] Crear wireframes de ambas apps
- [ ] Diseñar identidad visual (logo, colores)
- [ ] Definir flujos de usuario
- [ ] Crear mockups de pantallas principales

### Fase 2: Setup Técnico (Semana 3)

**Infraestructura:**
- [ ] Contratar hosting (Railway recomendado)
- [ ] Configurar PostgreSQL + PostGIS
- [ ] Configurar Radar.io
- [ ] Crear cuentas Firebase (FCM)
- [ ] Setup almacenamiento (R2/S3)
- [ ] Registrar dominio y SSL

**Repositorios:**
- [ ] Crear repos en GitHub/GitLab
- [ ] Estructura de carpetas
- [ ] Configurar CI/CD básico
- [ ] Documentación README

### Fase 3: Desarrollo Backend (Semana 4-6)

- [ ] API de autenticación
- [ ] CRUD usuarios
- [ ] Sistema de zonas y precios
- [ ] Lógica de asignación de choferes
- [ ] APIs de servicios
- [ ] Integración Radar.io
- [ ] Sistema de notificaciones
- [ ] WebSockets para tiempo real

### Fase 4: Desarrollo Apps Móviles (Semana 7-10)

**App Cliente:**
- [ ] Pantallas auth (login/registro)
- [ ] Mapa con origen/destino
- [ ] Selección de servicio
- [ ] Confirmación y pago
- [ ] Tracking en vivo
- [ ] Historial y perfil

**App Chofer:**
- [ ] Pantallas auth
- [ ] Dashboard y toggle disponibilidad
- [ ] Notificaciones de servicios
- [ ] Aceptar/rechazar servicios
- [ ] Navegación y tracking
- [ ] Completar servicio
- [ ] Historial y ganancias

### Fase 5: Panel Admin (Semana 11-12)

- [ ] Dashboard con KPIs
- [ ] Gestión de choferes
- [ ] Gestión de servicios
- [ ] Configuración de zonas (mapa)
- [ ] Matriz de precios
- [ ] Reportes básicos
- [ ] Sistema de verificación

### Fase 6: Testing (Semana 13-14)

- [ ] Testing funcional completo
- [ ] Testing de integración
- [ ] Testing de carga (servicios concurrentes)
- [ ] Testing en dispositivos reales
- [ ] Ajustes de UX
- [ ] Optimización de performance

### Fase 7: Lanzamiento (Semana 15-16)

**Pre-lanzamiento:**
- [ ] Reclutamiento inicial 10-15 choferes
- [ ] Verificación de documentos
- [ ] Capacitación a choferes
- [ ] Beta privado con amigos/familia
- [ ] Ajustes finales

**Lanzamiento:**
- [ ] Publicar apps en stores
- [ ] Campaña marketing local
- [ ] Monitoreo 24/7 primera semana
- [ ] Soporte activo
- [ ] Recolección de feedback

### Fase 8: Crecimiento (Mes 5-12)

- [ ] Análisis de métricas
- [ ] Optimización de precios
- [ ] Expansión a nuevas zonas
- [ ] Implementar features v2
- [ ] Escalar infraestructura
- [ ] Contratar equipo soporte

---

## 📊 Métricas Clave a Monitorear

**Operativas:**
- Servicios completados/día
- Tasa de asignación (servicios asignados vs solicitados)
- Tiempo promedio de asignación
- Tasa de cancelación
- Choferes activos/día

**Financieras:**
- Ingresos diarios/mensuales
- Ticket promedio por servicio
- Comisión total generada
- CAC (costo de adquisición de cliente)
- LTV (valor de vida del cliente)

**Calidad:**
- Calificación promedio choferes
- Calificación promedio clientes
- NPS (Net Promoter Score)
- Tiempo de respuesta soporte

**Crecimiento:**
- Nuevos usuarios/semana
- Nuevos choferes/semana
- Tasa de retención clientes
- Tasa de retención choferes

---

## 🚀 Visión a Largo Plazo

**Año 1:** Dominar Morelos
- 200+ choferes activos
- 500+ servicios/día
- $6M+ facturación anual

**Año 2:** Expansión regional
- CDMX, Puebla, Querétaro
- 1,000+ choferes
- $30M+ facturación anual

**Año 3:** Líder nacional
- 15+ estados
- Servicios corporativos B2B
- $100M+ facturación anual
- Posible Serie A funding

---

## 📞 Contacto del Proyecto

**Empresa:** DK Logística y Transportes  
**Ubicación:** Morelos, México  
**Versión Documento:** 1.0  
**Fecha:** Febrero 2026

---

*Este documento es un living document y debe actualizarse conforme el proyecto avance.*
