import React, { useState } from 'react';
import { Eye, Info } from 'lucide-react';

const ReporteTable = ({ data }) => {
  const [selectedReport, setSelectedReport] = useState(null);

  return (
    <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/30">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Tipo de Reporte</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Producto Afectado</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, idx) => (
              <tr key={idx} className="group hover:bg-slate-50/50 transition-colors duration-200">
                <td className="px-8 py-6">
                  <span className="bg-blue-50 text-red-900 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase border border-blue-100 shadow-sm">
                    {row.tipo || 'General'}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm text-slate-800 font-bold group-hover:text-[#499D81] transition-colors">
                    {typeof row.producto === 'object' ? row.producto?.nombre : (row.producto || 'No especificado')}
                  </p>
                </td>
                <td className="px-8 py-6 text-center">
                  <button
                    onClick={() => setSelectedReport(row)}
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-[#1a4d3a] hover:text-white text-slate-600 px-5 py-2.5 rounded-2xl text-[10px] font-black transition-all shadow-sm active:scale-95 group/btn"
                  >
                    <Eye className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                    VER DETALLES
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal Overlay */}
      {selectedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-[#1a4d3a] p-8 text-white relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                  <Info className="w-6 h-6 text-[#499D81]" />
                </div>
                <h3 className="text-2xl font-black tracking-tight">Detalles del Reporte</h3>
                <p className="text-white/60 text-[10px] font-black tracking-[0.2em] uppercase mt-1">{selectedReport.tipo}</p>
              </div>
            </div>

            <div className="p-8 space-y-6">
              <div>
                <img src='https://tse3.mm.bing.net/th/id/OIP.Y1exbUuY4fAEsTP9zPN74QAAAA?pid=ImgDet&w=177&h=212&c=7&dpr=1,3&o=7&rm=3' />
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Producto Implicado</p>
                <p className="text-lg font-bold text-slate-800">
                  {typeof selectedReport.producto === 'object' ? selectedReport.producto?.nombre : selectedReport.producto}
                </p>
              </div>

              <div className="bg-slate-50 p-6 rounded-[30px] border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Descripción de la Actividad</p>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {selectedReport.descripcion || 'Sin descripción detallada disponible para este reporte.'}
                </p>
              </div>

              <button
                onClick={() => setSelectedReport(null)}
                className="w-full bg-[#1a4d3a] text-white py-4 rounded-2xl text-xs font-black tracking-widest uppercase shadow-xl shadow-green-900/10 hover:bg-[#143c2d] transition-all"
              >
                CERRAR VISTA
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReporteTable;
