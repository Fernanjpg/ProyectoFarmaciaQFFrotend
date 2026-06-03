import React from 'react';
import { X, Package } from 'lucide-react';

const ReporteRegistrationForm = ({ isOpen, onClose, newReport, setNewReport, onSave, products }) => {
  if (!isOpen) return null;

  const handleSave = async () => {
    // Validaciones previas
    if (!newReport.tipo || !newReport.producto || !newReport.descripcion) {
      return;
    }

    const dataToSave = {
      tipo: newReport.tipo,
      producto: newReport.producto,
      descripcion: newReport.descripcion,
      fecha: new Date().toISOString(),
      usuario: "RootF" // Usuario quemado según requerimiento
    };

    try {
      const response = await fetch('http://localhost:8081/api/reportes/guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSave)
      });

      if (response.ok) {
        const result = await response.json();
        // Éxito: simplemente actualizamos y cerramos sin alertas intrusivas
        onSave(result);
        onClose();
      } else {
        const errorData = await response.json();
        console.error('Error del servidor:', errorData);
      }
    } catch (error) {
      console.error('Error de red:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
        <div className="bg-[#1a4d3a] p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-2xl font-black">Registrar Incidencia Logística</h3>
          <p className="text-white/60 text-sm font-medium mt-1">Siga los pasos para reportar una novedad en el inventario</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Tipo de Reporte</label>
            <select
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#499D81]/20 transition-all appearance-none"
              value={newReport.tipo}
              onChange={(e) => setNewReport({ ...newReport, tipo: e.target.value })}
            >
              <option value="">Seleccione una categoría...</option>
              <option value="Faltante de Stock">Faltante de Stock</option>
              <option value="Vencimiento Próximo">Vencimiento Próximo</option>
              <option value="Error en Despacho">Error en Despacho</option>
              <option value="Incidencia de Almacén">Incidencia de Almacén</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Producto Afectado</label>
            <div className="relative">
              <select
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm font-bold text-slate-950 focus:outline-none focus:ring-2 focus:ring-[#499D81]/20 transition-all appearance-none"
                value={newReport.producto}
                onChange={(e) => setNewReport({ ...newReport, producto: e.target.value })}
              >
                <option value="">Seleccione el producto...</option>
                {Array.from(new Set(products.map(p => p.producto))).map(prod => (
                  <option key={prod} value={prod}>{prod}</option>
                ))}
              </select>
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end px-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Descripción Detallada</label>
              <span className={`text-[9px] font-bold ${newReport.descripcion.length > 180 ? 'text-red-500' : 'text-slate-300'}`}>
                {newReport.descripcion.length}/200
              </span>
            </div>
            <textarea
              placeholder="Indique el número de estantería y estado del empaque..."
              maxLength="200"
              rows="3"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#499D81]/20 transition-all resize-none"
              value={newReport.descripcion}
              onChange={(e) => setNewReport({ ...newReport, descripcion: e.target.value })}
            ></textarea>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-8 py-4 rounded-2xl text-sm font-black text-slate-400 hover:bg-slate-50 transition-all uppercase tracking-widest"
            >
              CANCELAR
            </button>
            <button
              onClick={handleSave}
              className="flex-1 bg-[#1a4d3a] hover:bg-[#143c2d] text-white px-8 py-4 rounded-2xl text-sm font-black shadow-xl shadow-green-900/10 active:scale-95 transition-all uppercase tracking-widest"
            >
              GUARDAR REPORTE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReporteRegistrationForm;
