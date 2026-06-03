import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Layout from '../Layout/Layout';
import QualityControlTable from './QualityControlTable';
import QualityControlRegistrationForm from './QualityControlRegistrationForm';

export default function QualityControlManagementPage() {
  const [qualityControls, setQualityControls] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    idProductos: '',
    idUsuario: '',
    resultado: '',
    Observaciones: ''
  });

  const fetchQualityControls = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/control-calidad/Listar');
      if (res.ok) {
        setQualityControls(await res.json());
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };

  useEffect(() => {
    fetchQualityControls();
  }, []);

  const handleRegistrationSuccess = async () => {
    await fetchQualityControls();
    setIsModalOpen(false);
    setFormData({ idProductos: '', idUsuario: '', resultado: '', Observaciones: '' });
  };

  const handleDeleteQualityControl = async (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este control de calidad?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/control-calidad/Eliminar/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchQualityControls();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="p-8 lg:p-12 space-y-10">
        <QualityControlTable
          qualityControls={qualityControls}
          onAddQualityControlClick={() => setIsModalOpen(true)}
          onDeleteQualityControl={handleDeleteQualityControl}
          refreshData={fetchQualityControls}
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

              <QualityControlRegistrationForm
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
