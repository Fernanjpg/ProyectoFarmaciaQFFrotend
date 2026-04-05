import { ShieldCheck, ChevronDown } from 'lucide-react';

export default function ProductRegistrationForm({ formData, setFormData, onSubmit }) {
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
        <h2 className="text-2xl font-bold text-slate-800 mb-1 tracking-tight">Registro de Producto</h2>
        <p className="text-slate-500 text-sm font-medium mb-8">Gestione el alta confidencial de un producto.</p>
        
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Descripción */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-widest">DESCRIPCIÓN</label>
              <input 
                type="text" 
                name="descripcion" 
                value={formData.descripcion || ''} 
                onChange={handleChange}
                placeholder="Ej. Formula Infantil Etapa 1"
                className="w-full bg-slate-50 border border-transparent focus:bg-white focus:border-[#1a4d3a]/20 rounded-2xl px-5 py-3.5 text-sm font-medium text-slate-800 outline-none transition-all placeholder-slate-400"
                required
              />
            </div>

            {/* Asignar Tipo de Producto */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-widest">ASIGNAR TIPO DE PRODUCTO</label>
              <div className="relative">
                <select 
                  name="productType" 
                  value={formData.productType || ''} 
                  onChange={handleChange}
                  className="w-full appearance-none bg-slate-50 border border-transparent focus:bg-white focus:border-[#1a4d3a]/20 rounded-2xl pl-5 pr-12 py-3.5 text-sm font-bold text-slate-700 outline-none transition-all cursor-pointer"
                  required
                >
                  <option value="" disabled>Seleccione el tipo de producto...</option>
                  <option value="Tipo Producto 01">Tipo de Producto 01</option>
                  <option value="Tipo Producto 02">Tipo de Producto 02</option>
                </select>
                <ChevronDown className="w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Asignar Estado */}
            <div className="relative">
              <label className="block text-[11px] font-bold text-slate-500 mb-2.5 uppercase tracking-widest">ESTADO</label>
              <div className="relative">
                <select 
                  name="estado" 
                  value={formData.estado || ''} 
                  onChange={handleChange}
                  className="w-full appearance-none bg-slate-50 border border-transparent focus:bg-white focus:border-[#1a4d3a]/20 rounded-2xl pl-5 pr-12 py-3.5 text-sm font-bold text-slate-700 outline-none transition-all cursor-pointer"
                  required
                >
                  <option value="" disabled>Seleccione el estado...</option>
                  <option value="ACTIVO">Activo</option>
                  <option value="INACTIVO">Inactivo</option>
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
              Registrar Producto en Sistema
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
