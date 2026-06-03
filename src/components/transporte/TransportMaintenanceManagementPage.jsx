import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Layout from '../Layout/Layout';
import TransportMaintenanceTable from './TransportMaintenanceTable';
import TransportMaintenanceRegistrationForm from './TransportMaintenanceRegistrationForm';

export default function TransportMaintenanceManagementPage() {
  const [transports, setTransports] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    placa: '',
    descripcionMetodo: '',
    capacidad: '',
    estado: ''
  });

  const fetchTransports = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/transporte/listar');
      if (res.ok) {
        setTransports(await res.json());
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleRegistrationSuccess = async () => {
    await fetchTransports();
    setIsModalOpen(false);
    setFormData({ placa: '', descripcionMetodo: '', capacidad: '', estado: '' });
  };

  const handleDeleteTransport = async (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este vehículo?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/transporte/eliminar/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchTransports();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="p-8 lg:p-12 space-y-10">
        <TransportMaintenanceTable
          transports={transports}
          onAddTransportClick={() => setIsModalOpen(true)}
          onDeleteTransport={handleDeleteTransport}
        />

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-[#0f2e22]/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            ></div>

            <div className="relative z-10 w-full max-w-4xl animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-400 hover:text-slate-800 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <TransportMaintenanceRegistrationForm
                formData={formData}
                setFormData={setFormData}
                onSuccess={handleRegistrationSuccess}
              />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
