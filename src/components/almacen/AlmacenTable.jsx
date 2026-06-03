import React from 'react';

const AlmacenTable = ({ data }) => {
  return (
    <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/30">
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Producto</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Tipo Prod.</th>
              <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Stock</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.map((row, idx) => (
              <tr key={idx} className="group hover:bg-slate-50/50 transition-colors duration-200">
                <td className="px-8 py-6 text-sm font-bold text-slate-800">{row.producto}</td>
                <td className="px-8 py-6 text-sm text-slate-500 font-medium">{row.tipo}</td>
                <td className="px-8 py-6">
                  <span className="text-sm font-black text-[#1a4d3a]">{row.stock} und.</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlmacenTable;
