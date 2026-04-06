import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Layout from './Layout';
import ProductTypeTable from './ProductTypeTable';
import ProductTypeRegistrationForm from './ProductTypeRegistrationForm';

export default function ProductTypeManagementPage() {
  const [productTypes, setProductTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    estado: 'ACTIVO'
  });

  const fetchProductTypes = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/tipoproductos/Listar');
      if (res.ok) {
        setProductTypes(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchProductTypes();
  }, []);

  const handleRegisterProductType = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8081/api/tipoproductos/Guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          estado: formData.estado
        })
      });
      if (res.ok) {
        await fetchProductTypes();
        setIsModalOpen(false);
        setFormData({ nombre: '', estado: 'ACTIVO' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <div className="p-8 lg:p-12 space-y-10">

        {/* Table Component */}
        <ProductTypeTable
          productTypes={productTypes}
          onAddProductTypeClick={() => setIsModalOpen(true)}
        />

        {/* Modal Overlay / Form Container */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div
              className="absolute inset-0 bg-[#0f2e22]/50 backdrop-blur-sm transition-opacity"
              onClick={() => setIsModalOpen(false)}
            ></div>

            <div className="relative z-10 w-full max-w-5xl animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-slate-400 hover:text-slate-800 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <ProductTypeRegistrationForm
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleRegisterProductType}
              />
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
