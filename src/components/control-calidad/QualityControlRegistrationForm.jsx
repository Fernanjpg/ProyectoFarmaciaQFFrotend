import { useState, useEffect } from 'react';
import { ShieldCheck, Package, Calendar, CheckCircle, FileText, Loader2 } from 'lucide-react';

export default function QualityControlRegistrationForm({ formData, setFormData, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Cargar productos y usuarios al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productosRes, usuariosRes] = await Promise.all([
          fetch('http://localhost:8081/api/productos/Listar'),
          fetch('http://localhost:8081/api/usuarios/Listar')
        ]);

        let finalProductos = [];
        let finalUsuarios = [];

        if (productosRes.ok) {
          const productosData = await productosRes.json();
          finalProductos = Array.isArray(productosData) ? productosData : [];
          setProductos(finalProductos);
        }

        if (usuariosRes.ok) {
          const usuariosData = await usuariosRes.json();
          finalUsuarios = Array.isArray(usuariosData) ? usuariosData : [];
          setUsuarios(finalUsuarios);
        }

        // 🛠️ AUTO-SELECCIÓN CORREGIDA: Usando los nombres de propiedades exactos del backend
        setFormData(prev => ({
          ...prev,
          idProducto: prev.idProducto || (finalProductos[0]?.idproducto || ""),
          idUsuario: prev.idUsuario || (finalUsuarios[0]?.idUsuarios || "")
        }));

      } catch (error) {
        console.error("Error cargando datos:", error);
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

    const payload = {
      idProducto: parseInt(formData.idProducto, 10),
      idUsuario: parseInt(formData.idUsuario, 10),
      resultado: formData.resultado,
      Observaciones: formData.Observaciones
    };

    if (isNaN(payload.idProducto) || isNaN(payload.idUsuario)) {
      console.error("Error: Producto o Usuario no seleccionados correctamente.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/api/control-calidad/Guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        if (onSuccess) onSuccess();
      } else {
        const errorData = await response.json();
        console.error("Error al registrar control de calidad:", errorData);
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
            <ShieldCheck className="w-8 h-8 text-[#499D81]" />
          </div>
          <h3 className="text-3xl font-black tracking-tight">Registrar Control de Calidad</h3>
          <p className="text-white/60 text-sm font-medium mt-2">Evalúe la calidad de los productos recibidos</p>
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
                  <option key={prod.idproducto} value={prod.idproducto}> {/* 🛠️ CORREGIDO: .idproducto */}
                    {prod.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Usuario */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Usuario *</label>
            <div className="relative">
              <Package className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <select
                name="idUsuario"
                required
                disabled={isSubmitting || loadingData}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50 appearance-none"
                value={formData.idUsuario || ""}
                onChange={handleChange}
              >
                <option value="">Seleccionar usuario</option>
                {usuarios.map((user) => (
                  <option key={user.idUsuarios} value={user.idUsuarios}> {/* 🛠️ CORREGIDO: .idUsuarios */}
                    {user.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Resultado */}
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Resultado</label>
            <div className="relative">
              <CheckCircle className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <select
                name="resultado"
                required
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50 appearance-none"
                value={formData.resultado || ""}
                onChange={handleChange}
              >
                <option value="">Seleccionar resultado</option>
                <option value="Aprobado">✓ Aprobado</option>
                <option value="Rechazado">✗ Rechazado</option>
                <option value="Pendiente">⏳ Pendiente</option>
              </select>
            </div>
          </div>

          {/* Observaciones */}
          <div className="space-y-3 md:col-span-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Observaciones</label>
            <div className="relative">
              <FileText className="absolute left-5 top-4 w-5 h-5 text-slate-300" />
              <textarea
                name="observaciones"
                disabled={isSubmitting}
                className="w-full bg-slate-50 border border-slate-100 rounded-[24px] pl-14 pr-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all disabled:opacity-50 resize-none"
                placeholder="Detalles del control realizado..."
                rows="4"
                value={formData.Observaciones || ""}
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
              'REGISTRAR CONTROL'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}