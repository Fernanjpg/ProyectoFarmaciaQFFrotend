import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Layout from './Layout';
import ProductTable from './ProductTable';
import ProductRegistrationForm from './ProductRegistrationForm';

export default function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    stock: '',
    proveedor_id: '',
    Tproductos_id: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/productos/Listar');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("API error:", err);
    }
  };

  const handleSearch = async (name) => {
    if (!name.trim()) {
      fetchProducts();
      return;
    }
    try {
      const res = await fetch(`http://localhost:8081/api/productos/Buscar/${encodeURIComponent(name)}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error("API Search error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleRegisterProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8081/api/productos/Guardar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          stock: parseInt(formData.stock, 10),
          proveedores: { id: parseInt(formData.proveedor_id, 10) },
          tipoProductos: { idtproductos: parseInt(formData.Tproductos_id, 10) }
        })
      });
      if (res.ok) {
        await fetchProducts(); // Refresh list
        setIsModalOpen(false); // Close after submit
        setFormData({ nombre: '', stock: '', proveedor_id: '', Tproductos_id: '' });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este producto?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/productos/Eliminar/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Layout>
      <div className="p-8 lg:p-12 space-y-10">

        {/* Table Component */}
        <ProductTable
          products={products}
          onSearch={handleSearch}
          onAddProductClick={() => setIsModalOpen(true)}
          onDeleteProduct={handleDeleteProduct}
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
