import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, ArrowLeftRight, Plus } from 'lucide-react';
import Sidebar from '../Layout/Sidebar';
import MovimientoTable from '../operador/MovimientoTable';
import MovimientoRegistrationForm from '../operador/MovimientoRegistrationForm';

const PanelOperadorMovimientos = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [activeMovimientoTab, setActiveMovimientoTab] = useState('TODOS');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newMovement, setNewMovement] = useState({
    producto: '',
    tipoProducto: '',
    almacen: '',
    estado: 'Completado',
    tipo: 'ENTRADA'
  });

  const mockData = {
    Movimientos: [
      { id: 'MOV-001', fecha: '2024-04-24', producto: 'Paracetamol 500mg', origen: 'Proveedor Externo', destino: 'Almacén Central', tipo: 'ENTRADA', stockStatus: 'Abastecido' },
      { id: 'MOV-002', fecha: '2024-04-24', producto: 'Amoxicilina 250mg', origen: 'Almacén Central', destino: 'Farmacia 01', tipo: 'SALIDA', stockStatus: 'Estable' },
      { id: 'MOV-003', fecha: '2024-04-24', producto: 'Alcohol 70%', origen: 'Almacén B', destino: 'Almacén C', tipo: 'TRANSFERENCIA', stockStatus: 'Crítico' },
    ]
  };

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

  const handleLogout = () => {
    localStorage.removeItem('qf_user_session');
    navigate('/');
  };

  if (!isAuthenticated) return null;

  const filteredData = mockData.Movimientos.filter(m => activeMovimientoTab === 'TODOS' || m.tipo === activeMovimientoTab);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      <Sidebar
        activeSidebar="Movimientos"
        onNavigate={onNavigate}
        onLogout={handleLogout}
        user={user}
      />
      <main className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-7xl mx-auto p-8">
          <header className="glass-header p-8 rounded-[40px] mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden group">
            <div className="relative z-10">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight leading-none">
                Panel de <span className="text-[#1a4d3a]">Logística</span>
              </h1>
              <p className="text-slate-500 font-medium mt-3">Control de movimientos para Corporación QF</p>
            </div>
          </header>

          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
                  <ArrowLeftRight className="text-[#499D81] w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Registro de Movimientos</h2>
                  <p className="text-slate-400 text-sm">Seguimiento de entradas, salidas y transferencias</p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-[22px]">
                <button
                  onClick={() => { setIsModalOpen(true); setNewMovement({ ...newMovement, tipo: 'ENTRADA' }); }}
                  className="bg-white hover:bg-green-50 text-[#1a4d3a] px-5 py-3 rounded-[18px] flex items-center justify-center gap-2 transition-all font-black text-[10px] uppercase shadow-sm"
                >
                  <ArrowDown className="w-3.5 h-3.5 text-green-600" /> Entrada
                </button>
                <button
                  onClick={() => { setIsModalOpen(true); setNewMovement({ ...newMovement, tipo: 'SALIDA' }); }}
                  className="bg-white hover:bg-red-50 text-[#1a4d3a] px-5 py-3 rounded-[18px] flex items-center justify-center gap-2 transition-all font-black text-[10px] uppercase shadow-sm"
                >
                  <ArrowUp className="w-3.5 h-3.5 text-red-600" /> Salida
                </button>
                <button
                  onClick={() => { setIsModalOpen(true); setNewMovement({ ...newMovement, tipo: 'TRANSFERENCIA' }); }}
                  className="bg-[#1a4d3a] hover:bg-[#143c2d] text-white px-5 py-3 rounded-[18px] flex items-center justify-center gap-2 transition-all font-black text-[10px] uppercase shadow-xl"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" /> Transferencia
                </button>
              </div>
            </div>

            <div className="bg-slate-100/50 p-1.5 rounded-[26px] inline-flex gap-1 border border-slate-200/50">
              {['TODOS', 'ENTRADA', 'SALIDA', 'TRANSFERENCIA'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveMovimientoTab(tab)}
                  className={`px-8 py-3 rounded-[20px] text-[10px] font-black tracking-widest uppercase transition-all duration-300 ${activeMovimientoTab === tab
                    ? 'bg-[#1a4d3a] text-white shadow-lg shadow-green-900/20'
                    : 'text-slate-400 hover:text-slate-600 hover:bg-white/50'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <MovimientoTable data={filteredData} />
          </section>
        </div>
      </main>

      <MovimientoRegistrationForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newMovement={newMovement}
        setNewMovement={setNewMovement}
        onSave={() => { console.log('Saving...', newMovement); setIsModalOpen(false); }}
      />
    </div>
  );
};

export default PanelOperadorMovimientos;
