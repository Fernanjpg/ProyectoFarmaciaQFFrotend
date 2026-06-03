import { useState, useEffect } from 'react';
import { ShieldCheck, ChevronDown } from 'lucide-react';

export default function UserRegistrationForm({ formData, setFormData, onSubmit }) {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/roles/Listar');
        if (res.ok) setRoles(await res.json());
      } catch (e) {
        console.error("Error fetching roles", e);
      }
    };
    fetchRoles();
  }, []);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-8">

      {/* Alert Box - Left Side */}
      <div className="md:w-1/3 bg-[#f4fbf8] rounded-3xl p-8 border border-[#d1ebe0] flex flex-col justify-center">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#1a4d3a] mb-6 shadow-sm">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-[#1a4d3a] font-bold text-xl mb-3 tracking-tight">Protocolo de Seguridad</h3>
        <p className="text-[#1a4d3a]/80 text-sm leading-relaxed font-medium">
          Todo registro nuevo estará sujeto a la aprobación del supervisor de turno. Asegúrese de asignar el rol restrictivo adecuado al área operativa.
        </p>
      </div>

      {/* Form - Right Side */}
      <div className="md:w-2/3 flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-1 tracking-tight">Registro de Usuario</h2>
        <p className="text-slate-500 text-sm font-medium mb-8">Gestione el alta confidencial de un nuevo operador logístico o funcionario administrativo.</p>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

            {/* Nombre Completo */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-widest">NOMBRE COMPLETO</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre || ''}
                onChange={handleChange}
                placeholder="Ej. Martín"
                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-[#1a4d3a]/20 rounded-2xl px-5 py-3.5 text-sm font-medium text-slate-800 outline-none transition-all placeholder-slate-400"
                required
              />
            </div>

            {/* Apellido */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-widest">APELLIDOS</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido || ''}
                onChange={handleChange}
                placeholder="Ej. Ruiz"
                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-[#1a4d3a]/20 rounded-2xl px-5 py-3.5 text-sm font-medium text-slate-800 outline-none transition-all placeholder-slate-400"
                required
              />
            </div>

            {/* Correo Corporativo */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-widest">CORREO CORPORATIVO</label>
              <input
                type="email"
                name="email"
                value={formData.email || ''}
                onChange={handleChange}
                placeholder="m.ruiz@corpqf.com.mx"
                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-[#1a4d3a]/20 rounded-2xl px-5 py-3.5 text-sm font-medium text-slate-800 outline-none transition-all placeholder-slate-400"
                required
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-widest">NOMBRE DE USUARIO</label>
              <input
                type="text"
                name="username"
                value={formData.username || ''}
                onChange={handleChange}
                placeholder="Ej. mruiz"
                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-[#1a4d3a]/20 rounded-2xl px-5 py-3.5 text-sm font-medium text-slate-800 outline-none transition-all placeholder-slate-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-widest">CONTRASEÑA TEMPORAL</label>
              <input
                type="password"
                name="password"
                value={formData.password || ''}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-[#1a4d3a]/20 rounded-2xl px-5 py-3.5 text-sm font-medium text-slate-800 outline-none transition-all placeholder-slate-400"
                required
              />
            </div>

            {/* Asignar Rol */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-widest">ASIGNAR ROL DE ACCESO</label>
              <div className="relative">
                <select
                  name="rol"
                  value={formData.rol || ''}
                  onChange={handleChange}
                  className="w-full appearance-none bg-slate-50 border border-transparent focus:bg-white focus:border-[#1a4d3a]/20 rounded-2xl pl-5 pr-12 py-3.5 text-sm font-bold text-slate-700 outline-none transition-all cursor-pointer"
                  required
                >
                  <option value="" disabled>Seleccione el nivel...</option>
                  {roles.map(r => (
                    <option key={r.id_roles || r.id} value={r.id_roles || r.id}>{r.nombre}</option>
                  ))}
                </select>
                <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>



          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="bg-[#1a4d3a] hover:bg-[#143c2d] text-white font-bold py-3.5 px-8 rounded-full shadow-[0_4px_14px_0_rgba(26,77,58,0.3)] transition-all flex items-center gap-2"
            >
              Registrar Usuario en Sistema
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
