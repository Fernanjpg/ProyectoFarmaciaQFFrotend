import { Search, Plus, Trash2, Edit3, ShieldCheck, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function QualityControlTable({ qualityControls, onAddQualityControlClick, onDeleteQualityControl }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getResultadoIcon = (resultado) => {
    switch (resultado?.toLowerCase()) {
      case 'aprobado':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rechazado':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'pendiente':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.02)] animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="p-8 lg:p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-slate-50/30">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-[#1a4d3a] rounded-2xl flex items-center justify-center shadow-lg shadow-green-900/20">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800 tracking-tight">Control de Calidad</h2>
            <p className="text-slate-400 text-sm font-medium mt-0.5">Evaluación de calidad de productos farmacéuticos</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#499D81] transition-colors" />
            <input
              type="text"
              placeholder="Buscar producto..."
              className="pl-12 pr-6 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-4 focus:ring-[#499D81]/10 focus:border-[#499D81] transition-all w-full md:w-80 shadow-sm"
              onChange={(e) => { /* Implement search if needed */ }}
            />
          </div>
          <button
            onClick={onAddQualityControlClick}
            className="bg-[#1a4d3a] hover:bg-[#143c2d] text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-sm shadow-xl shadow-green-900/10 active:scale-95 whitespace-nowrap"
          >
            <Plus className="w-4 h-4" />
            REGISTRAR
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Producto</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Fecha Control</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Resultado</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Observaciones</th>
              <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {qualityControls.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-10 py-16 text-center">
                  <p className="text-slate-400 font-bold text-sm">No hay registros de control de calidad</p>
                </td>
              </tr>
            ) : (
              qualityControls.map((qc) => (
                <tr key={qc.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-black text-[#1a4d3a] text-xs">
                        {qc.producto?.substring(0, 2).toUpperCase() || 'N/A'}
                      </div>
                      <p className="text-sm font-black text-slate-700 group-hover:text-[#499D81] transition-colors">{qc.producto || 'SIN PRODUCTO'}</p>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-sm text-slate-500 font-bold">{formatDate(qc.fecha)}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-3">
                      {getResultadoIcon(qc.resultado)}
                      <span className="text-sm font-black text-slate-700 capitalize">{qc.resultado || 'N/A'}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6 text-sm text-slate-500 font-bold truncate max-w-xs">{qc.Observaciones || 'N/A'}</td>
                  <td className="px-10 py-6">
                    <div className="flex items-center justify-center gap-3">
                      <button className="p-2.5 text-slate-400 hover:text-[#499D81] hover:bg-[#499D81]/10 rounded-xl transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteQualityControl(qc.id)}
                        className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
