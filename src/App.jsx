import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import UserManagementPage from './components/usuarios/UserManagementPage';
import RoleManagementPage from './components/roles/RoleManagementPage';
import ProductManagementPage from './components/productos/ProductManagementPage';
import ProductTypeManagementPage from './components/productos/ProductTypeManagementPage';
import ProviderManagementPage from './components/proveedor/ProviderManagementPage';
import PanelOperador from './components/operador/PanelOperador';
import PanelJefeLogistica from './components/JefeLogisitca/PanelJefeLogistica';
import TransportMaintenanceManagementPage from './components/transporte/TransportMaintenanceManagementPage';
import ExitRegistrationManagementPage from './components/salidas/ExitRegistrationManagementPage';
import GeolocationMapPage from './components/geolocalizacion/GeolocationMapPage';
import QualityControlManagementPage from './components/control-calidad/QualityControlManagementPage';
import DevolucionManagement from './components/devoluciones/DevolucionManagement';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/panel-operador" element={<PanelOperador />} />
      <Route path="/panel-jefe-logistica" element={<PanelJefeLogistica />} />
      <Route path="/gestion-usuarios" element={<UserManagementPage />} />
      <Route path="/gestion-roles" element={<RoleManagementPage />} />
      <Route path="/gestion-proveedores" element={<ProviderManagementPage />} />
      <Route path="/gestion-productos" element={<ProductManagementPage />} />
      <Route path="/gestion-tipo-productos" element={<ProductTypeManagementPage />} />
      
      {/* Nuevas rutas para ADMINISTRADOR */}
      <Route path="/mantenimiento-transporte" element={<TransportMaintenanceManagementPage />} />
      
      {/* Nuevas rutas para OPERADOR */}
      <Route path="/registro-salidas" element={<ExitRegistrationManagementPage />} />
      <Route path="/mapa-geolocalizacion" element={<GeolocationMapPage />} />
      <Route path="/control-calidad" element={<QualityControlManagementPage />} />
      <Route path="/devoluciones" element={<DevolucionManagement />} />
    </Routes>
  );
}

export default App;