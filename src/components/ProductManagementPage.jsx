import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Layout from './Layout';
import ProductTable from './ProductTable';
import ProductRegistrationForm from './ProductRegistrationForm';

export default function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    descripcion: '',
    productType: '',
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
      { idproduct: 1, descripcion: 'PRODUCTO 01', productType: 'Tipo Producto 01', estado: 'ACTIVO'},
      { idproduct: 2, descripcion: 'PRODUCTO 02', productType: 'Tipo Producto 02', estado: 'ACTIVO'},
    ];
    setProducts(mockData);
  }, []);

  const handleRegisterProduct = (e) => {
    e.preventDefault();
    // Simulate POST request
    const newUser = {
      ...formData,
      idproduct: products.length > 0 ? Math.max(...products.map(u => u.idproduct)) + 1 : 1,
      // Attempt to split full name to separate field just for mock table
      descripcion: formData.descripcion,
      productType: formData.productType,
      estado: formData.estado
    };
    
    setProducts([...products, newUser]);
    setIsModalOpen(false); // Close after submit
    setFormData({ descripcion: '', productType: '', estado: '' });
  };

  return (
    <Layout>
      <div className="p-8 lg:p-12 space-y-10">
        
        {/* Table Component */}
        <ProductTable
          products={products}
          onAddProductClick={() => setIsModalOpen(true)} 
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
              
              <ProductRegistrationForm 
                formData={formData} 
                setFormData={setFormData}
                onSubmit={handleRegisterProduct}
              />
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
