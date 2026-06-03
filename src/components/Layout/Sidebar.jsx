import React from 'react';
import {
  ArrowLeftRight, Warehouse, ClipboardList, LogOut,
  Users, ShieldCheck, Package, Box, LayoutDashboard, Truck, RotateCcw
} from 'lucide-react';
import UserProfile from '../usuarios/user';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full transition-all duration-300 font-semibold text-sm mb-2 ${active
      ? 'bg-white text-[#1a4d3a] shadow-sm ring-1 ring-slate-200/50'
      : 'text-slate-600 hover:bg-white/50 hover:text-[#1a4d3a]'
      }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-[#1a4d3a]' : 'text-slate-500'}`} />
    {label}
  </button>
);

const Sidebar = ({ activeSidebar, onNavigate, onLogout, user }) => {
  // Definición de menús por rol
  const menus = {
    ADMINISTRADOR: [
      { id: 'Usuarios', label: 'Gestión Usuarios', icon: Users, path: '/gestion-usuarios' },
      { id: 'Roles', label: 'Gestión Roles', icon: ShieldCheck, path: '/gestion-roles' },
      { id: 'Proveedores', label: 'Gestión Proveedores', icon: Truck, path: '/gestion-proveedores' },
      { id: 'Transporte', label: 'Mantenimiento Transporte', icon: Truck, path: '/mantenimiento-transporte' },
      { id: 'Productos', label: 'Gestión Productos', icon: Package, path: '/gestion-productos' },
      { id: 'TipoProductos', label: 'Tipos de Productos', icon: Box, path: '/gestion-tipo-productos' },
    ],
    OPERADOR: [
      { id: 'Movimientos', label: 'Movimientos', icon: ArrowLeftRight },
      { id: 'Almacenes', label: 'Almacenes', icon: Warehouse },
      { id: 'Salidas', label: 'Registro de Salidas', icon: Package, path: '/registro-salidas' },
      { id: 'Devoluciones', label: 'Devoluciones', icon: RotateCcw, path: '/devoluciones' },
      { id: 'Geolocalizacion', label: 'Mapa de Geolocalización', icon: Warehouse, path: '/mapa-geolocalizacion' },
      { id: 'Calidad', label: 'Control de Calidad', icon: ShieldCheck, path: '/control-calidad' },
      { id: 'Reportes', label: 'Reportes', icon: ClipboardList },
    ],
    JEFE_LOGISTICA: [
      { id: 'Stock', label: 'Control de Stock', icon: Box },
      { id: 'Reportes', label: 'Reportes de Gestión', icon: ClipboardList },
    ]
  };

  // Alias para roles comunes
  menus.ADMIN = menus.ADMINISTRADOR;

  // Detectar el rol del usuario de forma robusta
  const getRole = () => {
    if (!user) return 'OPERADOR';
    
    // Fallback específico para usuarios maestros
    if (user.username === 'RootF' || user.username === 'admin') return 'ADMINISTRADOR';
    if (user.username === 'jefeS') return 'JEFE_LOGISTICA';
    
    let rawRole = '';
    
    if (user.rol) {
      rawRole = typeof user.rol === 'object' ? (user.rol.nombre || '') : user.rol;
    } else if (user.role) {
      rawRole = typeof user.role === 'object' ? (user.role.nombre || '') : user.role;
    }

    // Normalizar: quitar tildes, convertir a mayúsculas y quitar espacios extra
    const normalize = (str) => 
      String(str)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase()
        .trim();

    const roleStr = normalize(rawRole);
    
    if (roleStr.includes('ADMIN')) return 'ADMINISTRADOR';
    if (roleStr.includes('OPERADOR')) return 'OPERADOR';
    if (roleStr.includes('JEFE') || roleStr.includes('LOGISTICA')) return 'JEFE_LOGISTICA';

    return 'OPERADOR';
  };

  const userRole = getRole();
  const currentMenu = menus[userRole] || menus.OPERADOR;

  return (
    <aside className="w-72 bg-[#f4fbf8] text-slate-700 flex flex-col h-full border-r border-[#d1ebe0] z-20 shrink-0">
      <div className="p-8 pb-4">
        <h1 className="font-bold text-2xl tracking-tight text-[#1a4d3a] leading-tight">
          Corporación QF
        </h1>
        <p className="text-[10px] tracking-widest font-bold text-slate-400 uppercase mt-1">
          LOGÍSTICA FARMACÉUTICA
        </p>
      </div>

      <nav className="flex-1 px-4 mt-8">
        {currentMenu.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            active={activeSidebar === item.id}
            onClick={() => onNavigate(item.id, item.path)}
          />
        ))}
      </nav>

      <div className="p-6 mt-auto space-y-6">
        <UserProfile user={user} />

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-6 py-2 transition-all font-bold text-sm text-red-600 hover:text-red-700 group"
        >
          <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
