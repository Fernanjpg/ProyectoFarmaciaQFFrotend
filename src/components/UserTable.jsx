import { Search, Filter, ChevronDown, UserPlus, MoreHorizontal, HelpCircle, Settings } from 'lucide-react';

export default function UserTable({ users, onAddUserClick }) {
  // Helpers to pick colors based on role/status
  const getRoleColors = (rol) => {
    switch(rol) {
      case 'Administrador': return 'bg-indigo-50 text-indigo-700';
      case 'Jefe Logística': return 'bg-blue-50 text-blue-700';
      case 'Operador': return 'bg-slate-100 text-slate-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (estado) => {
    switch(estado?.toUpperCase()) {
      case 'ACTIVO': return 'bg-emerald-500 text-[#1a4d3a]';
      case 'INACTIVO': return 'bg-slate-300 text-slate-500';
      case 'PENDIENTE': return 'bg-amber-500 text-amber-700';
      default: return 'bg-slate-300 text-slate-500';
    }
  };

  const getInitials = (nombre, apellido) => {
    return `${nombre?.charAt(0) || ''}${apellido?.charAt(0) || ''}`.toUpperCase() || 'U';
  };

  return (
    <div className="w-full">
      
      {/* Top Header Section */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 mb-2 tracking-widest uppercase">
            <span>Portal</span>
            <span>{'>'}</span>
            <span className="text-[#1a4d3a]">Gestión de Usuarios</span>
          </div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Gestión de Usuarios</h1>
          <p className="text-slate-500 mt-2 font-medium">Control centralizado de accesos y perfiles operativos para la cadena logística.</p>
        </div>
        
        <div className="flex flex-col items-end gap-6">
          {/* Top nav icons fake bar */}
          <div className="flex items-center gap-4 text-slate-400 bg-white px-4 py-2 rounded-full shadow-sm">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input type="text" placeholder="Buscar usuarios..." className="pl-9 pr-4 py-1.5 bg-transparent border-none text-sm focus:outline-none focus:ring-0 w-48" />
            </div>
            <button className="p-1.5 hover:text-slate-600 transition-colors"><HelpCircle className="w-5 h-5" /></button>
            <button className="p-1.5 hover:text-slate-600 transition-colors"><Settings className="w-5 h-5" /></button>
            <img src="https://ui-avatars.com/api/?name=Admin+QF&background=1a4d3a&color=fff" alt="Perfil" className="w-8 h-8 rounded-full ml-2 border-2 border-white shadow-sm" />
          </div>

          <button 
            onClick={onAddUserClick}
            className="bg-[#1a4d3a] hover:bg-[#143c2d] text-white font-bold py-3.5 px-6 rounded-full shadow-[0_4px_14px_0_rgba(26,77,58,0.3)] transition-all flex items-center gap-2"
          >
            <UserPlus className="w-5 h-5" />
            Añadir Usuario
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white/80 backdrop-blur rounded-[24px] p-2.5 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-3 justify-between items-center mb-6">
        <div className="relative w-full lg:w-[500px]">
          <Filter className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Filtrar por nombre o cargo..." className="pl-11 pr-4 py-3 bg-white border border-slate-100 shadow-sm rounded-xl w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#1a4d3a]/20 transition-all font-medium placeholder-slate-400" />
        </div>
        <div className="flex gap-3 w-full lg:w-auto">
          <div className="relative">
            <select className="appearance-none bg-white border border-slate-100 shadow-sm rounded-xl pl-5 pr-12 py-3 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#1a4d3a]/20 cursor-pointer min-w-[200px]">
              <option>Todos los Roles</option>
              <option>Administrador</option>
              <option>Jefe Logística</option>
              <option>Operador</option>
            </select>
            <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <button className="flex items-center justify-center bg-white hover:bg-slate-50 border border-slate-100 shadow-sm text-slate-600 p-3 rounded-xl transition-colors">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
            <thead className="bg-transparent border-b border-slate-100 text-slate-400">
              <tr>
                <th className="py-6 px-8 font-bold tracking-wider text-[11px] uppercase z-0">NOMBRE Y CREDENCIALES</th>
                <th className="py-6 px-8 font-bold tracking-wider text-[11px] uppercase">ROL ASIGNADO</th>
                <th className="py-6 px-8 font-bold tracking-wider text-[11px] uppercase">CORREO CORPORATIVO</th>
                <th className="py-6 px-8 font-bold tracking-wider text-[11px] uppercase">ESTADO</th>
                <th className="py-6 px-8 font-bold tracking-wider text-[11px] uppercase text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-[13px] bg-slate-100 text-slate-600 shadow-inner border border-white">
                        {getInitials(user.nombre, user.apellido)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-[15px]">{user.nombre} {user.apellido}</p>
                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">ID-{user.sucursal ? user.sucursal.substring(0, 2).toUpperCase() : 'QF'}-{user.id.toString().padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5 px-8">
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block border border-black/5 ${getRoleColors(user.rol)} uppercase tracking-wider`}>
                      {user.rol}
                    </span>
                  </td>
                  <td className="py-5 px-8 text-slate-500 font-medium">{user.correo}</td>
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(user.estado).split(' ')[0]}`}></div>
                      <span className={`text-[11px] tracking-wider font-bold uppercase ${getStatusColor(user.estado).split(' ')[1]}`}>
                        {user.estado || 'INACTIVO'}
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
              
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-500 font-medium">No se encontraron usuarios.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="bg-slate-50/50 border-t border-slate-100 py-4 px-8 flex justify-between items-center text-sm font-medium text-slate-500">
          <p>Mostrando {users.length} usuarios operativos</p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 hover:bg-slate-200/50 rounded-xl transition-colors disabled:opacity-50">Anterior</button>
            <button className="px-4 py-2 hover:bg-slate-200/50 rounded-xl transition-colors disabled:opacity-50">Siguiente</button>
          </div>
        </div>
      </div>

    </div>
  );
}
