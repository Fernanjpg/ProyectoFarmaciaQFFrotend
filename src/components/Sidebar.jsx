import { Box, Package, Activity, Bell, Users, Plus, User } from 'lucide-react';

export default function Sidebar({ activeItem = 'Usuarios' }) {
  const navLinks = [
    { name: 'Inventario', icon: Box },
    { name: 'Almacenes', icon: Package },
    { name: 'Movimientos', icon: Activity },
    { name: 'Alertas', icon: Bell },
    { name: 'Usuarios', icon: Users },
  ];

  return (
    <aside className="w-72 bg-linear-to-b from-[#f4fbf8] to-[#e6f5ef] text-slate-700 flex flex-col h-full shrink-0 border-r border-[#d1ebe0] z-20">
      
      {/* Brand Section */}
      <div className="p-8">
        <h2 className="font-bold text-2xl tracking-tight text-[#1a4d3a] leading-tight">
          Clinical Architect
        </h2>
        <p className="text-[10px] tracking-widest font-semibold text-slate-500 uppercase mt-1">
          Logística Farmacéutica
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navLinks.map((link) => {
          const isSelected = activeItem === link.name;
          const Icon = link.icon;
          return (
            <button
              key={link.name}
              className={`w-full flex items-center gap-4 px-6 py-4 rounded-full transition-all font-semibold text-sm ${
                isSelected 
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
        <button className="w-full bg-[#1a4d3a] hover:bg-[#143c2d] text-white font-semibold py-4 rounded-full flex items-center justify-center gap-2 transition-colors shadow-lg shadow-[#1a4d3a]/20">
          <Plus className="w-5 h-5" />
          Nueva Operación
        </button>
        
        <div className="bg-white/60 p-4 rounded-full flex items-center gap-3 border border-slate-200/50">
          <div className="w-10 h-10 bg-[#1a4d3a] text-white rounded-full flex items-center justify-center shadow-inner">
            <User className="w-5 h-5" />
          </div>
          <div className="text-left flex-1">
            <p className="text-sm font-bold text-slate-800">Admin QF</p>
            <p className="text-xs font-medium text-slate-500">Corporación QF</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
