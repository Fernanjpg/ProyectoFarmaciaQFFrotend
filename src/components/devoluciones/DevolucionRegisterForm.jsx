import { useState, useEffect } from 'react';
import { RotateCcw, Package, Hash, FileText, Loader2 } from 'lucide-react';

export default function DevolucionRegisterForm({ formData, setFormData, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Cargar productos al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productosRes = await fetch('http://localhost:8081/api/productos/Listar');

        if (productosRes.ok) {
          const productosData = await productosRes.json();
          const finalProductos = Array.isArray(productosData) ? productosData : [];
          setProductos(finalProductos);

          // 🛠️ AUTO-SELECCIÓN: Selecciona el primer producto por defecto usando su ID real ('idproducto')
          setFormData(prev => ({
            ...prev,
            idProducto: prev.idProducto || (finalProductos[0]?.idproducto || "")
          }));
        }
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // 🛠️ PAYLOAD CONTROLADO: Forzamos enteros nativos para evitar fallos de deserialización
    const payload = {
      idProducto: parseInt(formData.idProducto, 10),
      cantidad: parseInt(formData.cantidad, 10),
      motivo: formData.motivo
    };

    // Validación preventiva en el cliente
    if (isNaN(payload.idProducto) || isNaN(payload.cantidad)) {
      console.error("Error: Producto o cantidad no válidos.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/devoluciones/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 🛠️ CORREGIDO: Todo el JSON debe empaquetarse correctamente dentro del body
        body: JSON.stringify(payload) 
      });

      if (response.ok) {
        if (onSuccess) onSuccess();
      } else {
        const errorData = await response.json();
        console.error("Error al registrar devolución:", errorData);
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
            <RotateCcw className="w-8 h-8 text-[#499D81]" />
          </div>
          <h3 className="text-3xl font-black tracking-tight">Registrar Devolución</h3>
          <h3 className="text-sm font-bold text-[#499D81] uppercase tracking-[0.2em] mt-1">Nuevo Registro</h3>
          <p className="text-white/60 text-sm font-medium mt-2">Registre productos devueltos al almacén</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Producto */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Producto *</label>
            <div className="relative">
              <Package className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <select
                name="idProducto"
                required
                disabled={isSubmitting || loadingData}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50 appearance-none"
                value={formData.idProducto || ""}
                onChange={handleChange}
              >
                <option value="">Seleccionar producto</option>
                {productos.map((prod) => (
                  <option key={prod.idproducto} value={prod.idproducto}> {/* 🛠️ CORREGIDO: prod.idproducto (Minúscula) */}
                    {prod.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Cantidad */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Cantidad *</label>
            <div className="relative">
              <Hash className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="number"
                name="cantidad"
                required
                min="1"
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50"
                placeholder="Ej: 10"
                value={formData.cantidad || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Motivo */}
          <div className="space-y-3 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Motivo de la Devolución *</label>
            <div className="relative">
              <FileText className="absolute left-5 top-4 w-5 h-5 text-slate-300" />
              <textarea
                name="motivo"
                required
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50 resize-none"
                placeholder="Describa el motivo de la devolución..."
                rows="4"
                value={formData.motivo || ""}
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
              'REGISTRAR DEVOLUCIÓN'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}