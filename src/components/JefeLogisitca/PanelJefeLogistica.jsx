import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Download, ClipboardList, Box, ShieldCheck
} from 'lucide-react';
import Sidebar from '../Layout/Sidebar';

const PanelJefeLogistica = () => {
  const navigate = useNavigate();
  const [activeSidebar, setActiveSidebar] = useState('Stock');
  const [activeTab, setActiveTab] = useState('Semanal');
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const session = localStorage.getItem('qf_user_session');
    if (session) {
      const userData = JSON.parse(session);
      setUser(userData);
      setIsAuthenticated(true);
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!isAuthenticated) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-12 h-12 bg-green-200 rounded-full mb-4"></div>
        <p className="text-slate-400 font-medium">Cargando panel...</p>
      </div>
    </div>
  );

  const mockData = {
    Stock: [
      { id: 'STK-001', fecha: '2024-04-24', actividad: 'Nivel crítico de Paracetamol', estado: 'Pendiente' },
      { id: 'STK-002', fecha: '2024-04-24', actividad: 'Excedente de mascarillas', estado: 'Revisado' },
    ],
    Semanal: [
      { id: 'W-042', fecha: 'Semana 17', actividad: 'Análisis de despachos semanales', estado: 'Completado' },
      { id: 'W-043', fecha: 'Semana 17', actividad: 'Revisión de mermas', estado: 'Completado' },
    ],
    Mensual: [
      { id: 'M-004', fecha: 'Abril 2024', actividad: 'Cierre de mes logístico', estado: 'En proceso' },
      { id: 'M-003', fecha: 'Marzo 2024', actividad: 'Evaluación de proveedores', estado: 'Completado' },
    ],
    Anual: [
      { id: 'Y-2024', fecha: '2024', actividad: 'Auditoría interna de logística', estado: 'En proceso' },
      { id: 'Y-2023', fecha: '2023', actividad: 'Reporte anual de gestión', estado: 'Finalizado' },
    ],
    Calidad: [
      { id: 'QA-001', fecha: '2024-04-24', actividad: 'Inspección de cadena de frío', estado: 'Aprobado' },
      { id: 'QA-002', fecha: '2024-04-23', actividad: 'Control de lotes vencidos', estado: 'En proceso' },
    ]
  };

  const handleLogout = () => {
    localStorage.removeItem('qf_user_session');
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      <Sidebar 
        activeSidebar={activeSidebar} 
        onNavigate={(id) => setActiveSidebar(id)} 
        onLogout={handleLogout}
        user={user}
      />

      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-7xl mx-auto p-8">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-slate-50/50 p-8 rounded-[40px] border border-slate-100 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/30 rounded-full -mr-32 -mt-32 blur-3xl group-hover:bg-green-200/40 transition-colors duration-700"></div>

            <div className="relative z-10">
              <h1 className="text-3xl font-black text-slate-800 leading-none">
                Bienvenido, <span className="text-[#499D81]">{user?.username || 'Jefe Logística'}</span>
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-slate-500 font-medium text-sm">Sesión activa como:</span>
                <span className="bg-green-100 text-[#1a4d3a] px-4 py-1 rounded-full text-xs font-black tracking-wide">
                  JEFE LOGÍSTICA
                </span>
              </div>
            </div>

            <div className="relative z-10 flex items-center gap-6 md:border-l md:border-slate-200 md:pl-8">
              <div className="text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Última Actividad</p>
                <p className="text-sm font-bold text-slate-700">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
              </div>
            </div>
          </header>

          <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
                  {activeSidebar === 'Stock' && <Box className="text-[#499D81] w-6 h-6" />}
                  {activeSidebar === 'Reportes' && <ClipboardList className="text-[#499D81] w-6 h-6" />}
                  {activeSidebar === 'Calidad' && <ShieldCheck className="text-[#499D81] w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {activeSidebar === 'Stock' ? 'Control de Stock' :
                      activeSidebar === 'Calidad' ? 'Control de Calidad' :
                        'Análisis de Reportes'}
                  </h2>
                  <p className="text-slate-400 text-sm font-medium">
                    {activeSidebar === 'Stock' ? 'Revisión de inventario y niveles críticos' :
                      activeSidebar === 'Calidad' ? 'Inspecciones y validación de estándares' :
                        'Métricas periódicas semanales, mensuales y anuales'}
                  </p>
                </div>
              </div>
              <button className="bg-[#1a4d3a] hover:bg-[#143c2d] text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-sm shadow-xl shadow-green-900/10 active:scale-95 group">
                <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
                EXPORTAR REPORTE
              </button>
            </div>

            {activeSidebar === 'Reportes' && (
              <div className="bg-slate-50/80 p-2 rounded-[24px] inline-flex flex-wrap gap-1.5 border border-slate-100 backdrop-blur-sm">
                {['Semanal', 'Mensual', 'Anual'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-10 py-3 rounded-[18px] text-xs font-black tracking-widest uppercase transition-all duration-300 ${activeTab === tab
                      ? 'bg-white text-[#1a4d3a] shadow-lg shadow-slate-200/50 border border-slate-100'
                      : 'text-slate-400 hover:text-slate-600 hover:bg-white/40'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            )}

            <div className="bg-white rounded-[40px] border border-slate-100 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.02)]">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/30">
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Identificador</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Periodo / Fecha</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50">Actividad Realizada</th>
                      <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 text-center">Estado de Operación</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {(activeSidebar === 'Stock' ? mockData['Stock'] :
                      activeSidebar === 'Calidad' ? mockData['Calidad'] :
                        mockData[activeTab]).map((row, idx) => (
                          <tr key={idx} className="group hover:bg-slate-50/50 transition-colors duration-200 even:bg-slate-50/20">
                            <td className="px-8 py-6">
                              <span className="text-sm font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">#{row.id}</span>
                            </td>
                            <td className="px-8 py-6 text-sm text-slate-500 font-bold">{row.fecha}</td>
                            <td className="px-8 py-6">
                              <p className="text-sm text-slate-800 font-bold group-hover:text-[#499D81] transition-colors">{row.actividad}</p>
                            </td>
                            <td className="px-8 py-6 text-center">
                              <span className={`inline-flex px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-[0.1em] ${row.estado === 'Completado' || row.estado === 'Finalizado'
                                ? 'bg-green-50 text-green-600 ring-1 ring-green-100'
                                : row.estado === 'En proceso'
                                  ? 'bg-amber-50 text-amber-600 ring-1 ring-amber-100'
                                  : 'bg-slate-50 text-slate-500 ring-1 ring-slate-100'
                                }`}>
                                {row.estado}
                              </span>
                            </td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PanelJefeLogistica;
