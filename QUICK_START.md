# ⚡ Quick Start - Verificación Rápida

**Esta guía te ayuda a verificar que la integración fue exitosa en 5 minutos.**

---

## 1️⃣ Verificar que los archivos fueron creados

Abre VS Code y verifica que existan estas carpetas:

```
✅ src/components/transporte/
✅ src/components/salidas/
✅ src/components/control-calidad/
✅ src/components/geolocalizacion/
```

Cada carpeta debe contener los archivos mencionados en la tabla de la sección anterior.

---

## 2️⃣ Verificar que los cambios en App.jsx se aplicaron

Abre `src/App.jsx` y verifica:

```javascript
// ✅ Estos imports deben estar presentes:
import TransportMaintenanceManagementPage from './components/transporte/TransportMaintenanceManagementPage';
import ExitRegistrationManagementPage from './components/salidas/ExitRegistrationManagementPage';
import GeolocationMapPage from './components/geolocalizacion/GeolocationMapPage';
import QualityControlManagementPage from './components/control-calidad/QualityControlManagementPage';

// ✅ Y estas rutas en <Routes>:
<Route path="/mantenimiento-transporte" element={<TransportMaintenanceManagementPage />} />
<Route path="/registro-salidas" element={<ExitRegistrationManagementPage />} />
<Route path="/mapa-geolocalizacion" element={<GeolocationMapPage />} />
<Route path="/control-calidad" element={<QualityControlManagementPage />} />
```

---

## 3️⃣ Ejecutar la aplicación

En terminal (PowerShell):

```powershell
# Navega a la carpeta del proyecto
cd "C:\Users\ferma\OneDrive\Desktop\Frotend-almacen\Frotend_almacen"

# Inicia el servidor de desarrollo
npm run dev
```

Deberías ver algo como:

```
  VITE v8.0.1  ready in 234 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

---

## 4️⃣ Prueba en el navegador

### 4.1 - Inicia sesión

1. Abre `http://localhost:5173/`
2. Inicia sesión con tu usuario
3. Serás redirigido a tu panel

### 4.2 - Verifica Sidebar (ADMINISTRADOR)

Si tu rol es **ADMINISTRADOR**, la Sidebar debe mostrar:

- ✅ Gestión Usuarios
- ✅ Gestión Roles
- ✅ Gestión Proveedores
- ✅ **Mantenimiento Transporte** ← NUEVO
- ✅ Gestión Productos
- ✅ Tipos de Productos

### 4.3 - Verifica Sidebar (OPERADOR)

Si tu rol es **OPERADOR**, la Sidebar debe mostrar:

- ✅ Movimientos
- ✅ Almacenes
- ✅ **Registro de Salidas** ← NUEVO
- ✅ **Mapa de Geolocalización** ← NUEVO
- ✅ **Control de Calidad** ← NUEVO
- ✅ Reportes

---

## 5️⃣ Prueba cada módulo

### Para ADMINISTRADOR:

#### Módulo: Mantenimiento de Transporte
1. Click en "Mantenimiento Transporte" en Sidebar
2. Debe cargar página con tabla (probablemente vacía)
3. Click en botón verde "REGISTRAR"
4. Se abre modal con formulario
5. Completa los campos:
   - Vehículo: `Toyota Hiace`
   - Fecha: `30/05/2026` (hoy)
   - Descripción: `Cambio de aceite`
   - Costo: `150000`
6. Click en "REGISTRAR MANTENIMIENTO"

**Resultado esperado:**
- ✅ Si backend responde: Registro aparece en tabla
- ❌ Si error: Verifica que `/api/mantenimiento-transporte/Guardar` exista en tu backend

---

### Para OPERADOR:

#### Módulo: Registro de Salidas
1. Click en "Registro de Salidas"
2. Click en "REGISTRAR"
3. Completa:
   - Destino: `Farmacia Central`
   - Fecha: `30/05/2026`
   - Responsable: `Juan`
   - Cantidad: `50`
4. Click en "REGISTRAR SALIDA"

**Resultado esperado:** Registro en tabla

#### Módulo: Mapa de Geolocalización
1. Click en "Mapa de Geolocalización"
2. Página debe cargar con mapa interactivo
3. Si tienes datos en tu API, verás marcadores en el mapa

**Nota:** Si el mapa no carga:
- Verifica conexión a internet (necesita cargar Leaflet desde CDN)
- Revisa consola (F12 → Console) por errores

#### Módulo: Control de Calidad
1. Click en "Control de Calidad"
2. Click en "REGISTRAR"
3. Completa:
   - Producto: `Amoxicilina 500mg`
   - Fecha: `30/05/2026`
   - Resultado: `Aprobado` (dropdown)
   - Observaciones: `Producto en buen estado`
4. Click en "REGISTRAR CONTROL"

**Resultado esperado:** Registro en tabla con icono de aprobado (✓ verde)

---

## 6️⃣ Solucionar problemas comunes

### Problema: "Módulos no aparecen en Sidebar"

**Causa:** Rol no es exactamente `ADMINISTRADOR` u `OPERADOR`

**Solución:**
1. Abre DevTools (F12)
2. Copia en consola: `console.log(localStorage.getItem('qf_user_session'))`
3. Verifica el campo "rol" o "role"
4. Si es diferente, actualiza `Sidebar.jsx` línea ~40 con el rol exacto

### Problema: "Tabla está vacía y no carga datos"

**Causa:** API endpoint no existe o retorna error

**Solución:**
1. Abre DevTools → Network
2. Recarga la página
3. Busca request a `http://localhost:8081/api/...`
4. Si no aparece: Backend no responde
5. Si aparece con ❌: Verifica endpoint en tu backend

### Problema: "Modal se abre pero botón 'REGISTRAR' no funciona"

**Causa:** API `POST` endpoint no existe

**Solución:**
1. Abre DevTools → Console
2. Busca error en rojo
3. Verifica que tu backend tenga endpoint `POST /api/.../Guardar`
4. Revisa que acepte JSON y retorne respuesta exitosa

### Problema: "Mapa no muestra puntos"

**Causa:** API de geolocalización no tiene datos o endpoint es diferente

**Solución:**
1. Verifica que `GET /api/geolocalizacion/puntos` exista
2. Pruébalo en Postman o curl
3. Asegúrate de retornar array con campos: `id, nombre, direccion, latitud, longitud`

---

## ✅ Checklist de Verificación

- [ ] Proyecto inicia sin errores (`npm run dev`)
- [ ] Login funciona
- [ ] Sidebar muestra nuevos módulos (según rol)
- [ ] Puedo abrir cada módulo
- [ ] Puedo abrir modal de registro
- [ ] Formulario acepta datos
- [ ] Tabla se actualiza después de registrar
- [ ] Puedo eliminar registros
- [ ] Mapa muestra marcadores (si tienes datos)
- [ ] No hay errores en consola

---

## 🚀 Siguientes pasos

1. **Ajusta colores** (si lo deseas):
   - Sigue: `GUIA_CUSTOMIZACION.md` → Sección "Cambiar colores"

2. **Conecta tu backend** (si aún no lo haces):
   - Asegúrate de que esté corriendo en `http://localhost:8081`
   - Crea los endpoints GET, POST, DELETE

3. **Prueba completa**:
   - Crea registros
   - Verifica que persistan en base de datos
   - Prueba en móvil (responsive)

4. **Deploy** (cuando esté listo):
   - `npm run build`
   - Despliega carpeta `dist/` a tu servidor

---

## 📞 Si algo no funciona

1. Revisa consola del navegador (F12 → Console)
2. Busca mensajes de error en rojo
3. Lee el mensaje: Usually dirá qué está mal
4. Si dice "Failed to fetch": Backend no responde
5. Si dice "Cannot read property": Datos malformados

---

**¡Listo! Tu integración está lista.** 🎉

