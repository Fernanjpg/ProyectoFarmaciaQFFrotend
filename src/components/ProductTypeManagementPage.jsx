import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Layout from './Layout';
import ProductTypeTable from './ProductTypeTable';
import ProductTypeRegistrationForm from './ProductTypeRegistrationForm';

export default function ProductTypeManagementPage() {
  const [productTypes, setProductTypes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    descripcion: '',
    estado: ''
  });

  // Fetch Logic (Spring Boot Ready)
  useEffect(() => {
    // Stub to fetch data later
    /*
    fetch('http://localhost:8080/api/usuarios')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("API error:", err));
    */

    // Using mock data matching the requested schema
    const mockData = [
      { idproductType: 1, descripcion: 'TIPO PRODUCTO 01', estado: 'ACTIVO' },
      { idproductType: 2, descripcion: 'TIPO PRODUCTO 02', estado: 'INACTIVO' },
    ];
    setProductTypes(mockData);
  }, []);

  const handleRegisterUser = (e) => {
    e.preventDefault();
    // Simulate POST request
    const newProductType = {
      ...formData,
      idproductType: productTypes.length > 0 ? Math.max(...productTypes.map(u => u.idproductType)) + 1 : 1,
      // Attempt to split full name to separate field just for mock table
      descripcion: formData.descripcion,
      estado: formData.estado
    };
    
    setProductTypes([...productTypes, newProductType]);
    setIsModalOpen(false); // Close after submit
    setFormData({ descripcion: '', estado: '' });
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
                onSubmit={handleRegisterUser}
              />
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
