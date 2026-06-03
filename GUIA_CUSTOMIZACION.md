# 🔧 Guía de Customización y Extensión

Este documento te muestra cómo modificar los componentes creados para adaptarlos a tus necesidades específicas.

---

## 📝 Tabla de Contenidos
1. [Cambiar colores](#cambiar-colores)
2. [Agregar campos al formulario](#agregar-campos-al-formulario)
3. [Agregar columnas a tabla](#agregar-columnas-a-tabla)
4. [Cambiar URLs de API](#cambiar-urls-de-api)
5. [Agregar validaciones](#agregar-validaciones)
6. [Crear un nuevo módulo](#crear-un-nuevo-módulo)

---

## 🎨 Cambiar Colores

### Opción 1: Buscar y Reemplazar Global

1. Abre VS Code
2. Presiona `Ctrl+Shift+H` (Find and Replace)
3. Busca: `#1a4d3a`
4. Reemplaza por: `#tu-color-primario`
5. Click en "Replace All"

Repite para:
- `#499D81` → Tu color secundario
- `#f4fbf8` → Tu color de fondo

### Opción 2: Modificar archivo por archivo

En cualquier componente, busca líneas como:

```jsx
// Antes:
<div className="bg-[#1a4d3a] text-white">Encabezado</div>
<button className="bg-[#1a4d3a] hover:bg-[#143c2d]">Botón</button>

// Después (ejemplo con azul):
<div className="bg-[#0066cc] text-white">Encabezado</div>
<button className="bg-[#0066cc] hover:bg-[#004499]">Botón</button>
```

### Opción 3: Variables CSS personalizadas

Si prefieres usar variables CSS, crea un archivo `src/styles/colors.css`:

```css
:root {
  --color-primary: #1a4d3a;
  --color-primary-dark: #143c2d;
  --color-secondary: #499D81;
  --color-bg: #f4fbf8;
}
```

Luego en componentes:

```jsx
<div style={{ backgroundColor: 'var(--color-primary)' }}>
  Usando variables CSS
</div>
```

---

## 📋 Agregar Campos al Formulario

**Ejemplo: Agregar campo "teléfono" a Transporte**

### Paso 1: Actualizar estado en ManagementPage

```jsx
// En: TransportMaintenanceManagementPage.jsx

// Antes:
const [formData, setFormData] = useState({
  vehiculo: '',
  fechaMantenimiento: '',
  descripcion: '',
  costo: ''
});

// Después:
const [formData, setFormData] = useState({
  vehiculo: '',
  fechaMantenimiento: '',
  descripcion: '',
  costo: '',
  telefono: ''  // ← NUEVO
});
```

### Paso 2: Agregar input al formulario

```jsx
// En: TransportMaintenanceRegistrationForm.jsx
// Busca la sección de inputs y agrega:

<div className="space-y-3">
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
    Teléfono Técnico
  </label>
  <div className="relative">
    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
    <input
      type="tel"
      name="telefono"
      disabled={isSubmitting}
      className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
      placeholder="Ej: +57 300 123 4567"
      value={formData.telefono}
      onChange={handleChange}
    />
  </div>
</div>
```

### Paso 3: Agregar columna a tabla

```jsx
// En: TransportMaintenanceTable.jsx

// En <thead>:
<th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
  Teléfono Técnico
</th>

// En <tbody>:
<td className="px-10 py-6 text-sm text-slate-500 font-bold">
  {m.telefono || 'N/A'}
</td>
```

**¡Listo!** El campo ya estará sincronizado automáticamente.

---

## 📊 Agregar Columnas a Tabla

**Ejemplo: Agregar columna "Estado" a Control de Calidad**

### Paso 1: En QualityControlTable.jsx

```jsx
// En <thead>, agregar:
<th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
  Estado
</th>

// En <tbody>, en la fila tbody:
<td className="px-10 py-6">
  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
    qc.resultado === 'Aprobado' ? 'bg-green-100 text-green-700' :
    qc.resultado === 'Rechazado' ? 'bg-red-100 text-red-700' :
    'bg-yellow-100 text-yellow-700'
  }`}>
    {qc.resultado}
  </span>
</td>
```

### Paso 2: Ajustar ancho de columnas

Si la tabla se vuelve muy ancha, agrega breakpoints responsive:

```jsx
<div className="overflow-x-auto">
  <table className="w-full text-left border-collapse">
    {/* Se ocultarán columnas en móvil */}
    <th className="hidden md:table-cell px-10 py-6">
      Columna que se oculta en móvil
    </th>
  </table>
</div>
```

---

## 🌐 Cambiar URLs de API

### Opción 1: Variable de entorno

Crea archivo `.env` en raíz del proyecto:

```bash
VITE_API_BASE_URL=http://localhost:8081/api
```

Luego en los componentes:

```jsx
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const fetchData = async () => {
  const res = await fetch(`${API_BASE_URL}/transporte/Listar`);
  // ...
};
```

### Opción 2: Crear archivo de configuración

Crea `src/config/api.js`:

```javascript
export const API_CONFIG = {
  BASE_URL: 'http://localhost:8081/api',
  ENDPOINTS: {
    TRANSPORTE: {
      LIST: '/mantenimiento-transporte/Listar',
      CREATE: '/mantenimiento-transporte/Guardar',
      DELETE: (id) => `/mantenimiento-transporte/Eliminar/${id}`
    },
    SALIDAS: {
      LIST: '/salidas/Listar',
      CREATE: '/salidas/Guardar',
      DELETE: (id) => `/salidas/Eliminar/${id}`
    }
    // ... más endpoints
  }
};
```

Luego úsalo:

```jsx
import { API_CONFIG } from '../config/api';

const fetchData = async () => {
  const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.TRANSPORTE.LIST;
  const res = await fetch(url);
};
```

---

## ✔️ Agregar Validaciones

### Validación antes de enviar (Client-side)

```jsx
// En: TransportMaintenanceRegistrationForm.jsx

const handleSave = async (e) => {
  e.preventDefault();
  
  // Validación 1: Campos requeridos
  if (!formData.vehiculo.trim()) {
    alert('El vehículo es requerido');
    return;
  }
  
  // Validación 2: Costo debe ser número positivo
  if (isNaN(formData.costo) || parseFloat(formData.costo) <= 0) {
    alert('El costo debe ser un número mayor a 0');
    return;
  }
  
  // Validación 3: Fecha no puede ser en el futuro
  const selectedDate = new Date(formData.fechaMantenimiento);
  if (selectedDate > new Date()) {
    alert('La fecha no puede ser en el futuro');
    return;
  }
  
  setIsSubmitting(true);
  try {
    const response = await fetch('http://localhost:8081/api/mantenimiento-transporte/Guardar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const error = await response.json();
      alert(`Error: ${error.message || 'No se pudo guardar'}`);
      return;
    }
    
    if (onSuccess) onSuccess();
  } catch (error) {
    alert('Error de conexión: ' + error.message);
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## 🆕 Crear un Nuevo Módulo

**Ejemplo: Crear módulo "Proveedores Especiales" (similar a Transporte)**

### Paso 1: Crear carpeta

```bash
# Terminal
mkdir src/components/proveedores-especiales
```

### Paso 2: Crear ManagementPage.jsx

```jsx
// Copia de TransportMaintenanceManagementPage.jsx
// y reemplaza:
// - Nombres: Transport → ProveedorEspecial
// - URLs: /mantenimiento-transporte → /proveedores-especiales
// - Estados: vehiculo → nombre, etc.

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Layout from '../Layout/Layout';
import ProveedorEspecialTable from './ProveedorEspecialTable';
import ProveedorEspecialRegistrationForm from './ProveedorEspecialRegistrationForm';

export default function ProveedorEspecialManagementPage() {
  const [proveedores, setProveedores] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    contacto: '',
    rango_precio: ''
  });

  const fetchProveedores = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/proveedores-especiales/Listar');
      if (res.ok) {
        setProveedores(await res.json());
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };

  useEffect(() => {
    fetchProveedores();
  }, []);

  const handleRegistrationSuccess = async () => {
    await fetchProveedores();
    setIsModalOpen(false);
    setFormData({ nombre: '', categoria: '', contacto: '', rango_precio: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/proveedores-especiales/Eliminar/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchProveedores();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="p-8 lg:p-12 space-y-10">
        <ProveedorEspecialTable
          proveedores={proveedores}
          onAdd={() => setIsModalOpen(true)}
          onDelete={handleDelete}
        />

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-[#0f2e22]/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            ></div>
            <div className="relative z-10 w-full max-w-4xl animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-400 hover:text-slate-800 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>
              <ProveedorEspecialRegistrationForm
                formData={formData}
                setFormData={setFormData}
                onSuccess={handleRegistrationSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
```

### Paso 3: Agregar en App.jsx

```jsx
import ProveedorEspecialManagementPage from './components/proveedores-especiales/ProveedorEspecialManagementPage';

// En <Routes>:
<Route path="/proveedores-especiales" element={<ProveedorEspecialManagementPage />} />
```

### Paso 4: Agregar en Sidebar.jsx

```jsx
const menus = {
  ADMINISTRADOR: [
    // ... items existentes ...
    { 
      id: 'ProveedoresEspeciales', 
      label: 'Proveedores Especiales', 
      icon: Truck, 
      path: '/proveedores-especiales' 
    },
  ],
  // ...
};
```

### Paso 5: Actualizar Layout.jsx

```jsx
const getActiveSidebar = () => {
  // ... otros paths ...
  if (location.pathname.includes('proveedores-especiales')) return 'ProveedoresEspeciales';
  return 'Usuarios';
};
```

---

## 🎯 Patrones Comunes

### Patrón 1: Formatear datos antes de mostrar

```jsx
// En tabla
const formatCurrency = (value) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(value || 0);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CO');
};

// Uso:
<td>{formatCurrency(item.precio)}</td>
<td>{formatDate(item.fecha)}</td>
```

### Patrón 2: Búsqueda en tabla

```jsx
const [searchTerm, setSearchTerm] = useState('');

const filteredItems = items.filter(item =>
  item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
);

// En JSX:
<input
  type="text"
  placeholder="Buscar..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>

{filteredItems.map(item => (
  // Renderizar items filtrados
))}
```

### Patrón 3: Paginación simple

```jsx
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedItems = items.slice(startIndex, endIndex);
const totalPages = Math.ceil(items.length / itemsPerPage);

// En JSX:
<div className="flex gap-2 justify-center mt-6">
  <button 
    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
    disabled={currentPage === 1}
  >
    Anterior
  </button>
  <span>{currentPage} de {totalPages}</span>
  <button 
    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
    disabled={currentPage === totalPages}
  >
    Siguiente
  </button>
</div>
```

---

## 🧪 Testing (QA)

### Checklist para cada nuevo módulo:

- [ ] Carga la página sin errores
- [ ] Modal se abre al clickear "Registrar"
- [ ] Campos se limpian al cerrar modal
- [ ] Formulario valida campos requeridos
- [ ] POST se envía correctamente
- [ ] Tabla se actualiza automáticamente
- [ ] Se puede eliminar un registro
- [ ] Búsqueda filtra por texto
- [ ] Responsive en móvil
- [ ] Mensajes de error se muestran

---

## 📚 Recursos Útiles

- **Tailwind CSS:** https://tailwindcss.com/docs
- **Lucide Icons:** https://lucide.dev
- **React Docs:** https://react.dev
- **Leaflet API:** https://leafletjs.com/reference.html

---

**¡Listo para customizar!** 🚀

