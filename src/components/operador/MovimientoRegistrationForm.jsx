import React from 'react';
import { X } from 'lucide-react';

const MovimientoRegistrationForm = ({ isOpen, onClose, newMovement, setNewMovement, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-[#1a4d3a] p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <h3 className="text-2xl font-black">Registrar Movimiento</h3>
          <p className="text-white/60 text-sm font-medium mt-1">Complete los detalles del nuevo registro</p>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Producto</label>
            <input
              type="text"
              placeholder="Nombre del producto..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#499D81]/20 transition-all"
              value={newMovement.producto}
              onChange={(e) => setNewMovement({ ...newMovement, producto: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Tipo de Producto</label>
              <select
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#499D81]/20 transition-all appearance-none"
                value={newMovement.tipoProducto}
                onChange={(e) => setNewMovement({ ...newMovement, tipoProducto: e.target.value })}
              >
                <option value="">Seleccionar...</option>
                <option value="Medicamento">Medicamento</option>
                <option value="Insumo">Insumo</option>
                <option value="Antiséptico">Antiséptico</option>
                <option value="Protección">Protección</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Almacén Destino</label>
              <select
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#499D81]/20 transition-all appearance-none"
                value={newMovement.almacen}
                onChange={(e) => setNewMovement({ ...newMovement, almacen: e.target.value })}
              >
                <option value="">Seleccionar...</option>
                <option value="Almacén Central">Almacén Central</option>
                <option value="Almacén B">Almacén B</option>
                <option value="Almacén C">Almacén C</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Estado Inicial</label>
            <div className="flex gap-2">
              {['Completado', 'En proceso', 'Pendiente'].map((status) => (
                <button
                  key={status}
                  onClick={() => setNewMovement({ ...newMovement, estado: status })}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${newMovement.estado === status
                    ? 'bg-[#499D81] text-white shadow-lg shadow-green-200'
                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                    }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex gap-4">
            <button
              onClick={onClose}
              className="flex-1 px-8 py-4 rounded-2xl text-sm font-black text-slate-400 hover:bg-slate-50 transition-all"
            >
              CANCELAR
            </button>
            <button
              onClick={onSave}
              className="flex-1 bg-[#1a4d3a] hover:bg-[#143c2d] text-white px-8 py-4 rounded-2xl text-sm font-black shadow-xl shadow-green-900/10 active:scale-95 transition-all"
            >
              GUARDAR REGISTRO
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovimientoRegistrationForm;
