/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * INTEGRACIÓN DE NUEVOS MÓDULOS - FRONTEND ALMACÉN FARMACÉUTICO
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * RESUMEN DE CAMBIOS REALIZADOS:
 * 
 * 1. ARCHIVO: src/App.jsx
 *    └─ Importados 4 componentes de gestión nuevos
 *    └─ Agregadas 4 nuevas rutas protegidas:
 *       • /mantenimiento-transporte → ADMINISTRADOR
 *       • /registro-salidas → OPERADOR
 *       • /mapa-geolocalizacion → OPERADOR
 *       • /control-calidad → OPERADOR
 * 
 * 2. ARCHIVO: src/components/Layout/Sidebar.jsx
 *    └─ Actualizado menú ADMINISTRADOR:
 *       + "Mantenimiento Transporte" (icon: Truck)
 *    └─ Actualizado menú OPERADOR:
 *       + "Registro de Salidas" (icon: Package)
 *       + "Mapa de Geolocalización" (icon: Warehouse)
 *       + "Control de Calidad" (icon: ShieldCheck)
 *
 * 3. ARCHIVO: src/components/Layout/Layout.jsx
 *    └─ Actualizada función getActiveSidebar() con nuevos paths
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * NUEVAS CARPETAS Y COMPONENTES CREADOS:
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * A) CARPETA: src/components/transporte/
 *    ├─ TransportMaintenanceManagementPage.jsx (Página principal)
 *    ├─ TransportMaintenanceRegistrationForm.jsx (Formulario modal)
 *    └─ TransportMaintenanceTable.jsx (Tabla de registros)
 *    
 *    DESCRIPCIÓN: Gestión de mantenimiento y reparación de vehículos
 *    API ENDPOINTS:
 *    • GET http://localhost:8081/api/mantenimiento-transporte/Listar
 *    • POST http://localhost:8081/api/mantenimiento-transporte/Guardar
 *    • DELETE http://localhost:8081/api/mantenimiento-transporte/Eliminar/{id}
 *    
 *    CAMPOS DEL FORMULARIO:
 *    {
 *      vehiculo: "Toyota Hiace Blanca",
 *      fechaMantenimiento: "2026-05-30",
 *      descripcion: "Cambio de aceite, revisión de frenos",
 *      costo: 150000
 *    }
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * B) CARPETA: src/components/salidas/
 *    ├─ ExitRegistrationManagementPage.jsx (Página principal)
 *    ├─ ExitRegistrationForm.jsx (Formulario modal)
 *    └─ ExitRegistrationTable.jsx (Tabla de registros)
 *    
 *    DESCRIPCIÓN: Registro y control de salidas de productos
 *    API ENDPOINTS:
 *    • GET http://localhost:8081/api/salidas/Listar
 *    • POST http://localhost:8081/api/salidas/Guardar
 *    • DELETE http://localhost:8081/api/salidas/Eliminar/{id}
 *    
 *    CAMPOS DEL FORMULARIO:
 *    {
 *      destino: "Farmacia Central Bogotá",
 *      fecha: "2026-05-30",
 *      responsable: "Juan Pérez",
 *      cantidad: 50
 *    }
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * C) CARPETA: src/components/control-calidad/
 *    ├─ QualityControlManagementPage.jsx (Página principal)
 *    ├─ QualityControlRegistrationForm.jsx (Formulario modal)
 *    └─ QualityControlTable.jsx (Tabla de registros)
 *    
 *    DESCRIPCIÓN: Control y evaluación de calidad de productos
 *    API ENDPOINTS:
 *    • GET http://localhost:8081/api/control-calidad/Listar
 *    • POST http://localhost:8081/api/control-calidad/Guardar
 *    • DELETE http://localhost:8081/api/control-calidad/Eliminar/{id}
 *    
 *    CAMPOS DEL FORMULARIO:
 *    {
 *      producto: "Amoxicilina 500mg",
 *      fecha: "2026-05-30",
 *      resultado: "Aprobado" | "Rechazado" | "Pendiente",
 *      observaciones: "Producto en buen estado"
 *    }
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * D) CARPETA: src/components/geolocalizacion/
 *    └─ GeolocationMapPage.jsx (Página de mapa interactivo)
 *    
 *    DESCRIPCIÓN: Visualización de puntos de venta en mapa interactivo con Leaflet
 *    API ENDPOINT:
 *    • GET http://localhost:8081/api/geolocalizacion/puntos
 *    
 *    RESPUESTA ESPERADA (JSON Array):
 *    [
 *      {
 *        id: 1,
 *        nombre: "Farmacia de Pepita",
 *        direccion: "Calle 80 # 15-42, Bogotá",
 *        latitud: 4.7511,
 *        longitud: -74.0352
 *      },
 *      ...
 *    ]
 *    
 *    CARACTERÍSTICAS:
 *    ✓ Mapa interactivo basado en OpenStreetMap (via Leaflet)
 *    ✓ Marcadores dinámicos con popups informativos
 *    ✓ Lista tabular complementaria con coordenadas
 *    ✓ Zoom automático al área de todos los puntos
 *    ✓ Leaflet cargado desde CDN (sin dependencias npm adicionales)
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * PATRONES Y CONVENCIONES DE DISEÑO:
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 1. ESTRUCTURA DE COMPONENTES:
 *    • *ManagementPage.jsx: Contenedor con Modal (+ Layout wrapper)
 *    • *RegistrationForm.jsx: Formulario estilizado para modal
 *    • *Table.jsx: Tabla con búsqueda, agregar y eliminar
 * 
 * 2. PALETA DE COLORES (CONSISTENTE):
 *    • Primario: #1a4d3a (Verde oscuro)
 *    • Secundario: #499D81 (Verde claro)
 *    • Fondo: #f4fbf8 (Verde muy claro)
 *    • Neutral: Escala de grises (slate)
 * 
 * 3. COMPONENTES REUTILIZABLES:
 *    • Layout: Proporciona Sidebar y autenticación
 *    • Iconos: Lucide React (ya instalado)
 *    • Estilos: Tailwind CSS (ya configurado)
 * 
 * 4. FLUJO DE DATOS:
 *    ├─ useEffect(() => fetchData()) → Carga inicial
 *    ├─ Modal abierto para formulario POST
 *    ├─ Fetch POST a crear recurso
 *    └─ Re-fetch GET para actualizar tabla
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * INSTRUCCIONES DE USO Y PERSONALIZACIÓN:
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 1. CAMBIAR COLORES DE LA APLICACIÓN:
 *    • Busca en cualquier archivo: #1a4d3a, #499D81, #f4fbf8
 *    • Reemplázalos con tus colores preferidos (usa find & replace)
 *    • Los colores se usan en: headers, botones, fondos, hover states
 * 
 * 2. ADAPTAR ENDPOINTS DE API:
 *    • Busca: http://localhost:8081/api/
 *    • Cada componente tiene 3 endpoints: Listar, Guardar, Eliminar
 *    • Si tu API tiene nombres diferentes, actualiza en los Fetch
 * 
 * 3. MODIFICAR CAMPOS DEL FORMULARIO:
 *    • En *RegistrationForm.jsx: Agrega/quita <input> en el formulario
 *    • Actualiza handleChange() automáticamente
 *    • Agrega validaciones según necesites en handleSave()
 * 
 * 4. PERSONALIZAR COLUMNAS DE TABLA:
 *    • En *Table.jsx: Agrega/quita <th> en thead
 *    • Agrega/quita <td> correspondientes en tbody
 *    • Usa formatDate() y formatCurrency() como helpers
 * 
 * 5. TRADUCIR INTERFAZ:
 *    • Busca textos en español entre comillas
 *    • Traducción es sencilla: todos los strings están hardcodeados
 *    • Considera crear un archivo i18n.js si necesitas multiidioma
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * PRUEBAS Y VALIDACIÓN:
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Para verificar que todo funciona:
 * 
 * 1. Ejecuta: npm run dev
 * 2. Inicia sesión con tus credenciales
 * 3. Navega al panel correspondiente a tu rol
 * 4. Verifica que aparezcan los nuevos items en la Sidebar
 * 5. Haz clic en cada opción y confirma que cargue el componente
 * 6. Prueba el formulario modal (crear registro)
 * 7. Verifica que la tabla se actualice automáticamente
 * 
 * NOTA IMPORTANTE: Asegúrate de que tu backend esté ejecutándose en
 * http://localhost:8081 con los endpoints listados arriba.
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 */
