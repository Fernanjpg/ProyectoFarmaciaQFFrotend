import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, Plus } from 'lucide-react';
import Sidebar from '../layout/Sidebar';
import ReporteTable from '../reportes/ReporteTable';
import ReporteRegistrationForm from '../reportes/ReporteRegistrationForm';

const PanelOperadorReportes = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newReport, setNewReport] = useState({
    tipo: '',
    producto: '',
    prioridad: 'Media',
    descripcion: ''
  });

  const [reportes, setReportes] = useState([]);

  const fetchReportes = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/reportes/listar');
      if (res.ok) {
        setReportes(await res.json());
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
    }
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8081/api/productos/Listar');
        if (res.ok) {
          const data = await res.json();
          // Transformamos la data para que sea compatible con el componente (usamos el campo 'nombre')
          const formattedProducts = data.map(p => ({
            ...p,
            producto: p.nombre // El componente espera el campo 'producto'
          }));
          setProducts(formattedProducts);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    if (isAuthenticated) {
      fetchProducts();
      fetchReportes();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('qf_user_session');
    navigate('/');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden font-sans">
      <Sidebar
        activeSidebar="Reportes"
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
              <p className="text-slate-500 font-medium mt-3">Gestión de Reportes Corporación QF</p>
            </div>
          </header>

          <section className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center border border-green-100">
                  <ClipboardList className="text-[#499D81] w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-800">Gestión de Reportes</h2>
                  <p className="text-slate-400 text-sm">Monitoreo y exportación de actividades logísticas</p>
                </div>
              </div>

              <button
                onClick={() => setIsReportModalOpen(true)}
                className="bg-[#1a4d3a] hover:bg-[#143c2d] text-white px-8 py-4 rounded-2xl flex items-center justify-center gap-3 transition-all font-black text-sm shadow-xl shadow-green-900/10 active:scale-95 group"
              >
                <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                REGISTRAR REPORTE
              </button>
            </div>

            <ReporteTable data={reportes} />
          </section>
        </div>
      </main>

      <ReporteRegistrationForm
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        newReport={newReport}
        setNewReport={setNewReport}
        onSave={fetchReportes}
        products={products}
      />
    </div>
  );
};

export default PanelOperadorReportes;
