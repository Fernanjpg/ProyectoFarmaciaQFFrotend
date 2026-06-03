import { useState } from 'react';
import { X, Truck, Building, Phone, Fingerprint, Loader2 } from 'lucide-react';

export default function ProviderRegistrationForm({ formData, setFormData, onSuccess, onCancel }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8081/api/proveedores/Guardar', {
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
        console.error("Error al registrar proveedor:", errorData);
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
          <h3 className="text-3xl font-black tracking-tight">Vincular Proveedor</h3>
          <p className="text-white/60 text-sm font-medium mt-2">Complete la información legal del nuevo aliado comercial</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Nombre */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Nombre Comercial</label>
            <div className="relative">
              <Building className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="text"
                name="nombre"
                required
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
                placeholder="Ej: Farmacéutica Global S.A."
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Telefono / Contacto */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Teléfono de Contacto</label>
            <div className="relative">
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="text"
                name="contacto"
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
                placeholder="Ej: +57 300 123 4567"
                value={formData.contacto}
                onChange={handleChange}
              />
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
              'REGISTRAR PROVEEDOR'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
