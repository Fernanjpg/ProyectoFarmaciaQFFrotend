import { useState } from 'react';
import { Truck, Calendar, FileText, DollarSign, Loader2 } from 'lucide-react';

export default function TransportMaintenanceRegistrationForm({ formData, setFormData, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8081/api/transporte/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        if (onSuccess) onSuccess();
      } else {
        const errorData = await response.json();
        console.error("Error al registrar mantenimiento:", errorData);
      }
    } catch (error) {
      console.error("Error en la petición:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden border border-white/20">
      <div className="bg-[#1a4d3a] p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
            <Truck className="w-8 h-8 text-[#499D81]" />
          </div>
          <h3 className="text-3xl font-black tracking-tight">Registrar Vehículo</h3>
          <p className="text-white/60 text-sm font-medium mt-2">Ingrese los detalles del vehículo de transporte</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Placa */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Placa del Vehículo</label>
            <div className="relative">
              <Truck className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="text"
                name="placa"
                required
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
                placeholder="Ej: ABC-123"
                value={formData.placa}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Capacidad */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Capacidad (Toneladas)</label>
            <div className="relative">
              <Truck className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="number"
                name="capacidad"
                required
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
                placeholder="Ej: 5.5"
                value={formData.capacidad}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Descripción Método */}
          <div className="space-y-3 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Descripción / Modelo del Vehículo</label>
            <div className="relative">
              <FileText className="absolute left-5 top-4 w-5 h-5 text-slate-300" />
              <textarea
                name="descripcionMetodo"
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50 resize-none"
                placeholder="Ej: Toyota Hiace 2022, Motor 2.5L, Refrigerado..."
                rows="4"
                value={formData.descripcionMetodo}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Estado */}
          <div className="space-y-3 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Estado (Opcional)</label>
            <div className="relative">
              <select
                name="estado"
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-6 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
                value={formData.estado}
                onChange={handleChange}
              >
                <option value="">-- Dejar que el sistema asigne (DISPONIBLE) --</option>
                <option value="DISPONIBLE">DISPONIBLE</option>
                <option value="EN_MANTENIMIENTO">EN MANTENIMIENTO</option>
                <option value="FUERA_SERVICIO">FUERA DE SERVICIO</option>
              </select>
            </div>
          </div>
        </div>

        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-[#1a4d3a] hover:bg-[#143c2d] text-white px-10 py-5 rounded-[24px] text-sm font-black shadow-xl shadow-green-900/20 active:scale-95 transition-all uppercase tracking-[0.2em] flex items-center justify-center gap-3 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                REGISTRANDO...
              </>
            ) : (
              'REGISTRAR VEHÍCULO'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
