import { Box, Package, Users, User, UserKey, LogOut } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('qf_user_session');
    navigate('/');
  };

  const navLinks = [
    { name: 'Usuarios', icon: Users, link: '/gestion-usuarios' },
    { name: 'Roles', icon: UserKey, link: '/gestion-roles' },
    { name: 'Productos', icon: Box, link: '/gestion-productos' },
    { name: 'Tipo Productos', icon: Package, link: '/gestion-tipo-productos' }
  ];

  return (
    <aside className="w-72 bg-linear-to-b from-[#f4fbf8] to-[#e6f5ef] text-slate-700 flex flex-col h-full shrink-0 border-r border-[#d1ebe0] z-20">

      {/* Brand Section */}
      <div className="p-8">
        <h2 className="font-bold text-2xl tracking-tight text-[#1a4d3a] leading-tight">
          Corporación QF
        </h2>
        <p className="text-[10px] tracking-widest font-semibold text-slate-500 uppercase mt-1">
          Logística Farmacéutica
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navLinks.map((link) => {
          const location = useLocation();
          const isSelected = location.pathname === link.link;
          const Icon = link.icon;
          return (
            <button
              key={link.name}
              onClick={() => navigate(link.link)}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-full transition-all font-semibold text-sm ${isSelected
                ? 'bg-white text-[#1a4d3a] shadow-sm ring-1 ring-slate-200/50'
                : 'text-slate-600 hover:bg-white/50 hover:text-[#1a4d3a]'
                }`}
            >
              <Icon className={`w-5 h-5 ${isSelected ? 'text-[#1a4d3a]' : 'text-slate-500'}`} />
              {link.name}
            </button>
          )
        })}
      </nav>

      {/* Bottom Section */}




      <div className="p-6 space-y-4">
        <div className="bg-white/60 p-4 rounded-full flex items-center gap-3 border border-slate-200/50">
          <div className="w-10 h-10 bg-[#1a4d3a] text-white rounded-full flex items-center justify-center shadow-inner">
            <User className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-bold text-slate-800">Admin QF</p>
            <p className="text-xs font-medium text-slate-500">Corporación QF</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-6 py-4 rounded-full transition-all font-bold text-sm text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          Cerrar Sesión
        </button>


      </div>
    </aside>
  );
}
