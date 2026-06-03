import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem('qf_user_session');
    if (session) {
      setUser(JSON.parse(session));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('qf_user_session');
    navigate('/');
  };

  const handleNavigation = (id, path) => {
    if (path) navigate(path);
  };

  // Determinar activeSidebar basado en la URL
  const getActiveSidebar = () => {
    if (location.pathname.includes('usuarios')) return 'Usuarios';
    if (location.pathname.includes('roles')) return 'Roles';
    if (location.pathname.includes('proveedores')) return 'Proveedores';
    if (location.pathname.includes('transporte')) return 'Transporte';
    if (location.pathname.includes('productos')) return 'Productos';
    if (location.pathname.includes('tipo-productos')) return 'TipoProductos';
    if (location.pathname.includes('salidas')) return 'Salidas';
    if (location.pathname.includes('geolocalizacion')) return 'Geolocalizacion';
    if (location.pathname.includes('calidad')) return 'Calidad';
    return 'Usuarios';
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      <Sidebar
        activeSidebar={getActiveSidebar()}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
        user={user}
      />
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        <div className="flex-1 overflow-y-auto w-full no-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
