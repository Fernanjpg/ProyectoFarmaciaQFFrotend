import React from 'react';
import { ArrowDown, ArrowUp, ArrowLeftRight } from 'lucide-react';

const MovimientoTable = ({ data }) => {
  return (
    <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/30">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Producto</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Logística (Origen → Destino)</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Status Stock</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 text-right">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, idx) => (
              <tr key={idx} className="group hover:bg-slate-50/50 transition-colors duration-200">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${row.tipo === 'ENTRADA' ? 'bg-green-100 text-green-600' : row.tipo === 'SALIDA' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                      {row.tipo === 'ENTRADA' ? <ArrowDown className="w-4 h-4" /> : row.tipo === 'SALIDA' ? <ArrowUp className="w-4 h-4" /> : <ArrowLeftRight className="w-4 h-4" />}
                    </div>
                    <p className="text-sm font-black text-slate-800">{row.producto}</p>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="text-slate-500">{row.origen}</span>
                    <ArrowLeftRight className="w-3 h-3 text-slate-300" />
                    <span className="text-[#1a4d3a]">{row.destino}</span>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className={`inline-flex px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider ${row.stockStatus === 'Abastecido' ? 'bg-green-50 text-green-600 border border-green-100' :
                    row.stockStatus === 'Crítico' ? 'bg-red-50 text-red-600 border border-red-100 animate-pulse' :
                      'bg-blue-50 text-blue-600 border border-blue-100'
                    }`}>
                    {row.stockStatus}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <p className="text-[10px] font-black text-slate-400">{row.fecha}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MovimientoTable;
