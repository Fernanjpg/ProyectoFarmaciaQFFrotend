import { useState } from 'react';
import { 
  Package, Box, Activity, Bell, Users, Search, HelpCircle, 
  Settings, UserPlus, MoreVertical, Edit2, Trash2, 
  UserCheck, UserX, Clock, ChevronDown, Filter, X 
} from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Alejandro Morales', initials: 'AM', avatarColor: 'bg-emerald-100 text-emerald-700', role: 'Administrador', roleColor: 'bg-indigo-50 text-indigo-700', email: 'amorales@qfcorp.com', status: 'Activo' },
  { id: 2, name: 'Lucía Contreras', initials: 'LC', avatarColor: 'bg-blue-100 text-blue-700', role: 'Operador', roleColor: 'bg-slate-100 text-slate-700', email: 'lcontreras@qfcorp.com', status: 'Activo' },
  { id: 3, name: 'Javier Paredes', initials: 'JP', avatarColor: 'bg-purple-100 text-purple-700', role: 'Jefe Logística', roleColor: 'bg-purple-50 text-purple-700', email: 'jparedes@qfcorp.com', status: 'Pendiente' },
];

const StatCard = ({ title, value, icon: Icon, colorClass, bgClass }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm flex items-center justify-between border border-slate-100 group hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
    </div>
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${bgClass} ${colorClass}`}>
      <Icon className="w-7 h-7" />
    </div>
  </div>
);

export default function Dashboard() {
  const [activeLink, setActiveLink] = useState('Usuarios');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    role: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    console.log("Nuevo Usuario Creado:", formData);
    setIsModalOpen(false);
    setFormData({ name: '', lastName: '', role: '', username: '', password: '' });
  };

  const navLinks = [
    { name: 'Inventario', icon: Box },
    { name: 'Almacenes', icon: Package },
    { name: 'Movimientos', icon: Activity },
    { name: 'Alertas', icon: Bell },
    { name: 'Usuarios', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className="w-72 bg-[#2D7A5F] text-white flex flex-col h-full shrink-0 shadow-2xl z-20 hidden md:flex">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-white rounded-[14px] flex items-center justify-center shadow-lg shadow-[#1b4d3c]/50">
                <span className="text-[#2D7A5F] font-black text-2xl tracking-tighter">QF</span>
            </div>
            <div>
               <h2 className="font-bold text-xl tracking-tight leading-tight">Corporación</h2>
               <h2 className="font-bold text-xl tracking-tight leading-none text-[#E6F4F0] opacity-90">QF</h2>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navLinks.map((link) => {
            const isSelected = activeLink === link.name;
            const Icon = link.icon;
            return (
              <button
                key={link.name}
                onClick={() => setActiveLink(link.name)}
                className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl transition-all font-bold text-sm ${
                  isSelected 
                    ? 'bg-white text-[#2D7A5F] shadow-md' 
                    : 'text-[#E6F4F0] hover:bg-white/10 hover:text-white font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#499D81]' : 'text-[#E6F4F0]/80'}`} />
                {link.name}
              </button>
            )
          })}
        </nav>

        <div className="p-6 mt-auto">
          <div className="bg-[#1b4d3c]/40 rounded-2xl p-4 text-center border border-white/5">
            <p className="text-[10px] tracking-[0.2em] font-bold text-[#E6F4F0] opacity-80 uppercase">
              SISTEMA VERIDIAN V2.0
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Decorative Background Blob */}
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-[#499D81]/5 filter blur-3xl pointer-events-none"></div>

        {/* Header */}
        <header className="px-8 py-6 bg-white/70 backdrop-blur-md border-b border-slate-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 z-10 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#499D81] mb-1.5 tracking-wide">
              <span>DASHBOARD</span>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">MÓDULO DE SEGURIDAD</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight">Gestión de Usuarios</h1>
          </div>
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
            <div className="relative hidden lg:block">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Búsqueda rápida..." className="pl-10 pr-4 py-2 bg-white rounded-full border border-slate-200 text-sm focus:outline-none focus:border-[#499D81] focus:ring-2 focus:ring-[#499D81]/20 w-64 shadow-sm transition-all" />
            </div>
            <div className="flex items-center gap-2 sm:gap-3 text-slate-400 ml-auto">
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><HelpCircle className="w-5 h-5" /></button>
              <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Settings className="w-5 h-5" /></button>
              <div className="w-px h-6 bg-slate-200 mx-1"></div>
              <button className="w-10 h-10 bg-[#e6f4f0] text-[#2D7A5F] rounded-full flex items-center justify-center font-bold text-sm relative border-2 border-white shadow-sm hover:scale-105 transition-transform">
                AS
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></div>
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 z-10">
          
          {/* Actions Row */}
          <div className="flex justify-between items-center bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-sm font-medium text-slate-500 hidden sm:block">Administra los accesos, permisos y roles del personal logístico.</p>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-[#499D81] hover:bg-[#3d856d] text-white font-bold py-3 px-6 rounded-full shadow-[0_4px_14px_0_rgba(73,157,129,0.3)] hover:shadow-[0_6px_20px_rgba(73,157,129,0.4)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2 text-sm justify-center w-full sm:w-auto"
            >
              <UserPlus className="w-4 h-4" />
              Añadir Nuevo Usuario
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            <StatCard title="Total Usuarios" value="142" icon={Users} colorClass="text-[#499D81]" bgClass="bg-[#e6f4f0]" />
            <StatCard title="Activos" value="128" icon={UserCheck} colorClass="text-emerald-600" bgClass="bg-emerald-50" />
            <StatCard title="Inactivos" value="9" icon={UserX} colorClass="text-slate-500" bgClass="bg-slate-100" />
            <StatCard title="Pendientes" value="5" icon={Clock} colorClass="text-amber-500" bgClass="bg-amber-50" />
          </div>

          {/* Table Container */}
          <div className="space-y-4">
             {/* Search / Filter bar for table */}
            <div className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-3 justify-between items-center">
              <div className="relative w-full lg:w-[400px]">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Buscar usuario por nombre o correo..." className="pl-10 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl w-full text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#499D81]/20 transition-all font-medium placeholder-slate-400" />
              </div>
              <div className="flex gap-3 w-full lg:w-auto">
                <div className="relative flex-1 lg:flex-none">
                  <select className="appearance-none bg-slate-50 border-transparent rounded-xl pl-4 pr-10 py-2.5 text-sm font-bold text-slate-600 outline-none focus:ring-2 focus:ring-[#499D81]/20 hover:bg-slate-100 transition-colors w-full cursor-pointer">
                    <option>Todos los Roles</option>
                    <option>Administrador</option>
                    <option>Operador</option>
                    <option>Jefe Logística</option>
                  </select>
                  <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <button className="flex items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-2.5 px-4 rounded-xl transition-colors text-sm border border-transparent">
                  <Filter className="w-4 h-4" /> Filtros
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
                <thead className="bg-slate-50/50 border-b border-slate-100 text-slate-400">
                  <tr>
                    <th className="py-4 px-6 font-bold tracking-wider text-[11px] uppercase">NOMBRE DEL USUARIO</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-[11px] uppercase z-0">ROL DE ACCESO</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-[11px] uppercase">CORREO ELECTRÓNICO</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-[11px] uppercase">ESTADO</th>
                    <th className="py-4 px-6 font-bold tracking-wider text-[11px] uppercase text-right">ACCIONES</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockUsers.map(user => (
                    <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shadow-sm ${user.avatarColor}`}>
                              {user.initials}
                          </div>
                          <div>
                              <p className="font-bold text-slate-800">{user.name}</p>
                              <p className="text-[11px] font-medium text-slate-400">ID: QF-{user.id.toString().padStart(4, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                          <span className={`px-3 py-1.5 rounded-lg text-xs font-bold inline-block border border-black/5 ${user.roleColor}`}>{user.role}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-500 font-medium">{user.email}</td>
                      <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${user.status === 'Activo' ? 'bg-emerald-500' : user.status === 'Pendiente' ? 'bg-amber-500' : 'bg-slate-400'}`}></div>
                            <span className={`text-xs font-bold ${user.status === 'Activo' ? 'text-slate-700' : 'text-slate-500'}`}>{user.status}</span>
                          </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                          <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-[#499D81] hover:bg-[#e6f4f0] hover:shadow-sm rounded-lg transition-all"><Edit2 className="w-4 h-4" /></button>
                            <button className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 hover:shadow-sm rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                            <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 hover:shadow-sm rounded-lg transition-all"><MoreVertical className="w-4 h-4" /></button>
                          </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="h-4"></div> {/* Bottom Spacer */}
        </div>
      </main>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          <div className="bg-white rounded-[32px] shadow-2xl relative z-10 w-full max-w-lg overflow-hidden flex flex-col transform transition-all">
            
            {/* Modal Header */}
            <div className="p-8 pb-6 border-b border-slate-100/80 bg-white">
              <div className="flex justify-between items-start mb-1">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Crear Nuevo Usuario</h2>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors -my-1 -mr-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-slate-500 font-medium">Complete los campos para registrar un nuevo integrante al sistema.</p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleCreateUser} className="p-8 space-y-5 flex-1 bg-white">
               
               <div className="flex flex-col sm:flex-row gap-5">
                 <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-2 ml-1 tracking-wide">NOMBRE</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="block w-full px-4 py-3 bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-[#499D81] focus:ring-4 focus:ring-[#499D81]/10 transition-all outline-none font-medium" required />
                 </div>
                 <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-700 mb-2 ml-1 tracking-wide">APELLIDO</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="block w-full px-4 py-3 bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-[#499D81] focus:ring-4 focus:ring-[#499D81]/10 transition-all outline-none font-medium" required />
                 </div>
               </div>

               <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 ml-1 tracking-wide">ROL A ASIGNAR</label>
                  <div className="relative">
                    <select name="role" value={formData.role} onChange={handleInputChange} className="block w-full px-4 py-3 bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:border-[#499D81] focus:ring-4 focus:ring-[#499D81]/10 transition-all outline-none appearance-none cursor-pointer" required>
                       <option value="">Seleccionar Rol...</option>
                       <option value="Administrador">Administrador</option>
                       <option value="Operador">Operador</option>
                       <option value="Jefe Logística">Jefe Logística</option>
                    </select>
                    <ChevronDown className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  </div>
               </div>

               <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 ml-1 tracking-wide">NOMBRE DE USUARIO</label>
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="block w-full px-4 py-3 bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-[#499D81] focus:ring-4 focus:ring-[#499D81]/10 transition-all outline-none font-medium placeholder-slate-400/70" placeholder="ej. asilvaqf" required />
               </div>

               <div>
                  <label className="block text-xs font-bold text-slate-700 mb-2 ml-1 tracking-wide">CONTRASEÑA TEMPORAL</label>
                  <input type="password" name="password" value={formData.password} onChange={handleInputChange} className="block w-full px-4 py-3 bg-slate-50 border border-transparent hover:border-slate-200 rounded-xl text-sm text-slate-800 focus:bg-white focus:border-[#499D81] focus:ring-4 focus:ring-[#499D81]/10 transition-all outline-none font-sans tracking-widest placeholder:tracking-normal placeholder-slate-400/70" placeholder="••••••••" required />
               </div>

               <div className="pt-8 flex flex-col-reverse sm:flex-row justify-end gap-3 mt-4">
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-3.5 text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors w-full sm:w-auto text-center"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="bg-[#499D81] hover:bg-[#3d856d] text-white text-sm font-bold py-3.5 px-8 rounded-full shadow-[0_4px_14px_0_rgba(73,157,129,0.3)] hover:shadow-[0_6px_20px_rgba(73,157,129,0.4)] hover:-translate-y-0.5 transition-all outline-none focus:ring-4 focus:ring-[#499D81]/50 w-full sm:w-auto text-center"
                  >
                    Crear Usuario
                  </button>
               </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
