# 📌 Referencia Rápida (Cheat Sheet)

**Guía de bolsillo para consultar mientras trabajas**

---

## 🎯 Rutas del Navegador

| Rol | Ruta | Descripción |
|-----|------|-------------|
| **Admin** | `/mantenimiento-transporte` | Gestión de vehículos |
| **Operador** | `/registro-salidas` | Control de salidas |
| **Operador** | `/mapa-geolocalizacion` | Mapa de puntos |
| **Operador** | `/control-calidad` | Evaluación de calidad |

---

## 🔌 URLs de Endpoints

### Mantenimiento de Transporte
```
GET    http://localhost:8081/api/mantenimiento-transporte/Listar
POST   http://localhost:8081/api/mantenimiento-transporte/Guardar
DELETE http://localhost:8081/api/mantenimiento-transporte/Eliminar/{id}
```

### Registro de Salidas
```
GET    http://localhost:8081/api/salidas/Listar
POST   http://localhost:8081/api/salidas/Guardar
DELETE http://localhost:8081/api/salidas/Eliminar/{id}
```

### Control de Calidad
```
GET    http://localhost:8081/api/control-calidad/Listar
POST   http://localhost:8081/api/control-calidad/Guardar
DELETE http://localhost:8081/api/control-calidad/Eliminar/{id}
```

### Geolocalización
```
GET    http://localhost:8081/api/geolocalizacion/puntos
```

---

## 📦 Estructura de Datos

### Mantenimiento
```json
{
  "id": 1,
  "vehiculo": "Toyota Hiace",
  "fechaMantenimiento": "2026-05-30",
  "descripcion": "Cambio de aceite",
  "costo": 150000
}
```

### Salidas
```json
{
  "id": 1,
  "destino": "Farmacia Central",
  "fecha": "2026-05-30",
  "responsable": "Juan",
  "cantidad": 50
}
```

### Calidad
```json
{
  "id": 1,
  "producto": "Amoxicilina 500mg",
  "fecha": "2026-05-30",
  "resultado": "Aprobado",
  "observaciones": "En buen estado"
}
```

### Geolocalización
```json
[
  {
    "id": 1,
    "nombre": "Farmacia Central",
    "direccion": "Calle 80 # 15-42",
    "latitud": 4.7511,
    "longitud": -74.0352
  }
]
```

---

## 🎨 Colores

```
#1a4d3a    Verde principal (headers, botones)
#143c2d    Verde más oscuro (hover buttons)
#499D81    Verde claro (acentos, hover)
#f4fbf8    Verde muy claro (fondos)
#ffffff    Blanco (contenedores)
#d1ebe0    Verde borde (líneas)
```

---

## 📂 Ubicación de Archivos

```
src/components/
├── transporte/
│   ├── TransportMaintenanceManagementPage.jsx
│   ├── TransportMaintenanceRegistrationForm.jsx
│   └── TransportMaintenanceTable.jsx
├── salidas/
│   ├── ExitRegistrationManagementPage.jsx
│   ├── ExitRegistrationForm.jsx
│   └── ExitRegistrationTable.jsx
├── control-calidad/
│   ├── QualityControlManagementPage.jsx
│   ├── QualityControlRegistrationForm.jsx
│   └── QualityControlTable.jsx
└── geolocalizacion/
    └── GeolocationMapPage.jsx
```

---

## ⚙️ Cambios Rápidos

### Cambiar color primario globalmente
```bash
# Buscar y Reemplazar en VS Code (Ctrl+Shift+H)
Buscar:  #1a4d3a
Reemplazar por: #TU_COLOR
```

### Cambiar puerto de API
```javascript
// En cualquier componente, busca:
http://localhost:8081/api/

// Y reemplaza por:
http://TU_SERVIDOR:TU_PUERTO/api/
```

### Agregar nuevo campo a formulario
```javascript
// 1. En FormData state:
const [formData, setFormData] = useState({
  // ... otros campos
  nuevoField: ''
});

// 2. Agregar input en JSX:
<input
  type="text"
  name="nuevoField"
  value={formData.nuevoField}
  onChange={handleChange}
/>

// 3. En tabla (si aplica):
<td>{item.nuevoField}</td>
```

---

## 🔍 Debugging

### Ver datos en consola
```javascript
console.log('FormData:', formData);
console.log('Items:', items);
console.log('User:', user);
```

### Ver errores de API
```javascript
// En el catch del fetch
console.error('Error:', error);
const errorData = await response.json();
console.error('Response:', errorData);
```

### Ver rol del usuario
```javascript
console.log(JSON.parse(localStorage.getItem('qf_user_session')));
```

---

## 🚀 Comandos Terminal

```bash
# Iniciar desarrollo
npm run dev

# Compilar para producción
npm run build

# Ejecutar linter
npm run lint

# Ver proyecto compilado
npm run preview
```

---

## ✨ Atajos Útiles

| Acción | Atajo |
|--------|-------|
| Buscar archivo | Ctrl+P |
| Buscar en código | Ctrl+Shift+F |
| Buscar y reemplazar | Ctrl+Shift+H |
| Abrir terminal | Ctrl+` |
| Formatear documento | Shift+Alt+F |
| Comentar línea | Ctrl+/ |
| Duplicar línea | Ctrl+D |

---

## 🐛 Problemas Comunes

| Problema | Solución |
|----------|----------|
| Tabla vacía | Verifica endpoint GET |
| Modal no se abre | Revisa isModalOpen state |
| Botón no responde | Verifica fetch en consola |
| Mapa en blanco | Verifica conexión internet (CDN) |
| Estilos rotos | Limpia cache (Ctrl+Shift+R) |

---

## 📱 Responsive Breakpoints (Tailwind)

```
sm: 640px
md: 768px    ← Usado frecuentemente
lg: 1024px   ← Usado frecuentemente
xl: 1280px
2xl: 1536px
```

Ejemplo:
```jsx
<div className="md:w-1/2 lg:w-1/3">
  Ancho diferente según pantalla
</div>
```

---

## 🎭 Clases Tailwind Frecuentes

```css
/* Spacing */
p-6 = padding 24px
m-4 = margin 16px

/* Display */
flex = display: flex
grid = display: grid
hidden = display: none

/* Colors */
bg-white = background white
text-slate-700 = text color
border-slate-100 = border color

/* Sizing */
w-full = width 100%
h-screen = height 100vh

/* Border Radius */
rounded-2xl = border-radius 16px
rounded-[40px] = border-radius 40px

/* Shadow */
shadow-lg = large shadow
shadow-2xl = extra large shadow

/* Hover/Transitions */
hover:bg-slate-50 = on hover
transition-all = smooth transition
duration-300 = 300ms duration
```

---

## 🔐 Roles del Sistema

```javascript
"ADMINISTRADOR"    // Admin panel
"OPERADOR"         // Operator panel
"JEFE_LOGISTICA"   // Logistics chief panel
"ANALISTA"         // Analyst panel (si existe)
```

---

## 📖 Documentación Incluida

| Archivo | Propósito |
|---------|-----------|
| `README_INTEGRACION.md` | Guía completa del proyecto |
| `GUIA_CUSTOMIZACION.md` | Cómo extender y modificar |
| `QUICK_START.md` | Verificación en 5 minutos |
| `RESUMEN_FINAL.md` | Resumen ejecutivo |
| `REFERENCIA_RAPIDA.md` | Este archivo (cheat sheet) |

---

## 💬 Estructura de Componente Típico

```jsx
import { useState, useEffect } from 'react';
import Layout from '../Layout/Layout';

export default function MyComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/...');
      if (res.ok) {
        setData(await res.json());
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="p-8">
        {/* Tu contenido aquí */}
      </div>
    </Layout>
  );
}
```

---

## 🎯 Flujo de una operación

```
1. Usuario hace clic en botón
   ↓
2. Modal se abre (setIsModalOpen(true))
   ↓
3. Usuario completa formulario
   ↓
4. Usuario hace clic en "REGISTRAR"
   ↓
5. handleSave() ejecuta POST request
   ↓
6. Si respuesta es ok:
   - Llama onSuccess()
   - onSuccess() hace re-fetch GET
   - setData(nuevos datos)
   - Tabla se actualiza automáticamente
   - Modal se cierra
```

---

## 🔗 Enlaces Útiles

- React Docs: https://react.dev
- Tailwind: https://tailwindcss.com
- Lucide Icons: https://lucide.dev
- Leaflet: https://leafletjs.com
- MDN Fetch API: https://developer.mozilla.org/es/docs/Web/API/Fetch_API

---

**Guardalo como bookmark en tu navegador para consultar rápidamente** 📌

