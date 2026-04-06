import { Search, Filter, ChevronDown, UserPlus, MoreHorizontal, HelpCircle, Settings } from 'lucide-react';

export default function RoleTable({ roles, onAddRoleClick }) {
  const getStatusColor = (estado) => {
    switch(estado?.toUpperCase()) {
      case 'ACTIVO': return 'bg-emerald-500 text-[#1a4d3a]';
      case 'INACTIVO': return 'bg-slate-300 text-slate-500';
      default: return 'bg-slate-300 text-slate-500';
    }
  };

  return (
    <div className="w-full">
      
      {/* Top Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-2 tracking-widest uppercase">
            <span>Portal</span>
            <span>{'>'}</span>
            <span className="text-[#1a4d3a]">Gestión de Roles</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Gestión de Roles</h1>
          <p className="text-slate-500 mt-2 font-medium">Control centralizado de roles operativos para la cadena logística.</p>
        </div>
        
        <div className="flex flex-col items-end gap-6">
          {/* Top nav icons fake bar */}
          <div className="flex items-center gap-4 text-slate-400 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input type="text" placeholder="Buscar roles..." className="pl-9 pr-4 py-1.5 bg-transparent border-none text-sm focus:outline-none focus:ring-0 w-48" />
            </div>
            <button className="p-1.5 hover:text-slate-600 transition-colors"><HelpCircle className="w-5 h-5" /></button>
            <button className="p-1.5 hover:text-slate-600 transition-colors"><Settings className="w-5 h-5" /></button>
            <img src="https://ui-avatars.com/api/?name=Admin+QF&background=1a4d3a&color=fff" alt="Perfil" className="w-8 h-8 rounded-full ml-2 border-2 border-white shadow-sm" />
          </div>

          <button 
            onClick={onAddRoleClick}
            className="bg-[#1a4d3a] hover:bg-[#143c2d] text-white font-bold py-3.5 px-6 rounded-full shadow-[0_4px_14px_0_rgba(26,77,58,0.3)] transition-all flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Añadir Rol
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/80 backdrop-blur rounded-[24px] p-2.5 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-3 justify-between items-center mb-6">
        <div className="relative w-full lg:w-[500px]">
          <Filter className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Filtrar descripción..." className="pl-11 pr-4 py-3 bg-white border border-slate-100 shadow-sm rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]/20 transition-all font-medium placeholder-slate-400" />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
            <thead className="bg-transparent border-b border-slate-100 text-slate-400">
              <tr>
                <th className="py-6 px-8 font-bold tracking-wider text-[11px] uppercase z-0">DESCRIPCIÓN</th>
                <th className="py-6 px-8 font-bold tracking-wider text-[11px] uppercase">ESTADO</th>
                <th className="py-6 px-8 font-bold tracking-wider text-[11px] uppercase text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {roles.map(role => (
                <tr key={role.idrol} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-8 text-slate-500 font-medium">{role.nombre || role.descripcion}</td>
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(role.estado).split(' ')[0]}`}></div>
                      <span className={`text-[11px] tracking-wider font-bold uppercase ${getStatusColor(role.estado).split(' ')[1]}`}>
                        {role.estado || 'INACTIVO'}
                      </span>
                    </div>
                  </td>
                  <td className="py-5 px-8 text-right">
                    <div className="flex justify-end gap-2 text-slate-400">
                      <button className="p-2 hover:text-[#1a4d3a] hover:bg-[#e6f5ef] rounded-[10px] transition-all"><UserPlus className="w-5 h-5" /></button>
                      <button className="p-2 hover:text-slate-700 hover:bg-slate-100 rounded-[10px] transition-all"><MoreHorizontal className="w-5 h-5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {roles.length === 0 && (
                <tr>
                  <td colSpan="3" className="py-8 text-center text-slate-500 font-medium">No se encontraron roles.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-slate-50/50 border-t border-slate-100 py-4 px-8 flex justify-between items-center text-sm font-medium text-slate-500">
          <p>Mostrando {roles.length} roles operativos</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 hover:bg-slate-200/50 rounded-xl transition-colors disabled:opacity-50">Anterior</button>
            <button className="px-4 py-2 hover:bg-slate-200/50 rounded-xl transition-colors disabled:opacity-50">Siguiente</button>
          </div>
        </div>
      </div>

    </div>
  );
}
