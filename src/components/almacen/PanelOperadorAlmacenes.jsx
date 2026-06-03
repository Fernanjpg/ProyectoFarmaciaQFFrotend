import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Warehouse, ArrowLeft, Building2, ArrowLeftRight } from 'lucide-react';
import Sidebar from '../Layout/Sidebar';
import AlmacenTable from './AlmacenTable';

const PanelOperadorAlmacenes = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [selectedAlmacen, setSelectedAlmacen] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const mockData = {
    Almacenes: [
      { id: 'PRD-001', producto: 'Paracetamol 500mg', tipo: 'Medicamento', stock: 1250, almacen: 'Almacén Central' },
      { id: 'PRD-002', producto: 'Guantes de Nitrilo', tipo: 'Insumo', stock: 450, almacen: 'Almacén B' },
      { id: 'PRD-003', producto: 'Alcohol en Gel', tipo: 'Antiséptico', stock: 800, almacen: 'Almacén Central' },
      { id: 'PRD-004', producto: 'Mascarillas KN95', tipo: 'Protección', stock: 2000, almacen: 'Almacén C' },
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

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      <Sidebar
        activeSidebar="Almacenes"
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
              <p className="text-slate-500 font-medium mt-3">Gestión de Almacenes Corporación QF</p>
            </div>
          </header>

          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
                  <Warehouse className="text-[#499D81] w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">
                    {selectedAlmacen ? `Productos en ${selectedAlmacen}` : 'Nuestros Almacenes'}
                  </h2>
                  <p className="text-slate-400 text-sm">
                    {selectedAlmacen ? 'Inventario detallado de este almacén' : 'Seleccione un almacén para ver sus existencias'}
                  </p>
                </div>
              </div>

              {selectedAlmacen && (
                <button
                  onClick={() => setSelectedAlmacen(null)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-xs active:scale-95 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  REGRESAR
                </button>
              )}
            </div>

            {!selectedAlmacen ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in zoom-in-95 duration-500">
                {['Almacén Central', 'Almacén B', 'Almacén C'].map((almacen) => {
                  const itemsCount = mockData.Almacenes.filter(a => a.almacen === almacen).length;
                  return (
                    <button
                      key={almacen}
                      onClick={() => setSelectedAlmacen(almacen)}
                      className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-xl hover:border-green-100 transition-all group text-left relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16 group-hover:bg-green-100 transition-colors duration-500"></div>
                      <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 border border-green-100 group-hover:bg-[#1a4d3a] group-hover:text-white transition-all duration-300">
                        <Building2 className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-black text-slate-800 mb-2">{almacen}</h3>
                      <p className="text-slate-400 text-sm font-medium mb-4">{itemsCount} productos registrados</p>
                      <div className="flex items-center gap-2 text-[#499D81] font-black text-xs uppercase tracking-widest">
                        Ver Inventario
                        <ArrowLeftRight className="w-3 h-3 rotate-180 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <AlmacenTable data={mockData.Almacenes.filter(a => a.almacen === selectedAlmacen)} />
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default PanelOperadorAlmacenes;
