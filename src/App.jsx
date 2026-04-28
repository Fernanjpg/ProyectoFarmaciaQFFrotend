import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserManagementPage from './components/UserManagementPage';
import RoleManagementPage from './components/RoleManagementPage';
import ProductManagementPage from './components/ProductManagementPage';
import ProductTypeManagementPage from './components/ProductTypeManagementPage';
import PanelOperador from './components/PanelOperador';
import PanelJefeLogistica from './components/PanelJefeLogistica';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/panel-operador" element={<PanelOperador />} />
      <Route path="/panel-jefe-logistica" element={<PanelJefeLogistica />} />
      <Route path="/gestion-usuarios" element={<UserManagementPage />} />
      <Route path="/gestion-roles" element={<RoleManagementPage />} />
      <Route path="/gestion-productos" element={<ProductManagementPage />} />
      <Route path="/gestion-tipo-productos" element={<ProductTypeManagementPage />} />
    </Routes>
  );
}

export default App;