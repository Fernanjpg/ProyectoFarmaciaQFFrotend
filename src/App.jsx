import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserManagementPage from './components/UserManagementPage';
import RoleManagementPage from './components/RoleManagementPage';
import ProductManagementPage from './components/ProductManagementPage';
import ProductTypeManagementPage from './components/ProductTypeManagementPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/gestion-usuarios" element={<UserManagementPage />} />
      <Route path="/gestion-roles" element={<RoleManagementPage />} />
      <Route path="/gestion-productos" element={<ProductManagementPage />} />
      <Route path="/gestion-tipo-productos" element={<ProductTypeManagementPage />} />
    </Routes>
  );
}

export default App;