import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Layout from './Layout';
import RoleTable from './RoleTable';
// import UserRegistrationForm from './UserRegistrationForm';

export default function RoleManagementPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    password: '',
    rol: '',
    correo: '',
    estado: 'ACTIVO',
    sucursal: ''
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
      { id: 1, nombre: 'Lucía', apellido: 'Contreras', username: 'lcontreras', password: '123', rol: 'Jefe Logística', correo: 'l.contreras@corpqf.com.mx', estado: 'ACTIVO', sucursal: 'Sede Central - CDMX' },
      { id: 2, nombre: 'Javier', apellido: 'Paredes', username: 'jparedes', password: '123', rol: 'Operador', correo: 'j.paredes@corpqf.com.mx', estado: 'INACTIVO', sucursal: 'Hub Logístico - GDL' },
    ];
    setUsers(mockData);
  }, []);

  const handleRegisterUser = (e) => {
    e.preventDefault();
    // Simulate POST request
    const newUser = {
      ...formData,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      // Attempt to split full name to separate field just for mock table
      nombre: formData.nombre?.split(' ')[0] || formData.nombre,
      apellido: formData.nombre?.split(' ').slice(1).join(' ') || '',
    };
    
    setUsers([...users, newUser]);
    setIsModalOpen(false); // Close after submit
    setFormData({ nombre: '', apellido: '', username: '', password: '', rol: '', correo: '', estado: 'ACTIVO', sucursal: '' });
  };

  return (
    <Layout>
      <div className="p-8 lg:p-12 space-y-10">
        
        {/* Table Component */}
        <RoleTable
          roles={users}
          onAddUserClick={() => setIsModalOpen(true)} 
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
              
              {/* <UserRegistrationForm 
                formData={formData} 
                setFormData={setFormData}
                onSubmit={handleRegisterUser}
              /> */}
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}
