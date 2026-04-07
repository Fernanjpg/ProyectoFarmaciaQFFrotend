import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Layout from './Layout';
import UserTable from './UserTable';
import UserRegistrationForm from './UserRegistrationForm';

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    username: '',
    password: '',
    rol: '',
    email: ''
  });

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:8081/api/usuarios/Listar');
      if (res.ok) {
        setUsers(await res.json());
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRegisterUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:8081/api/usuarios/Guardar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          username: formData.username,
          password: formData.password,
          email: formData.email,
          rol: { id_roles: parseInt(formData.rol, 10) }
        })
      });
      if (res.ok) {
        await fetchUsers();
        setIsModalOpen(false);
        setFormData({ nombre: '', apellido: '', username: '', password: '', rol: '', email: '' });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("¿Está seguro de que desea eliminar este usuario?")) return;
    try {
      const res = await fetch(`http://localhost:8081/api/usuarios/Eliminar/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await fetchUsers();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <div className="p-8 lg:p-12 space-y-10">

        {/* Table Component */}
        <UserTable
          users={users}
          onAddUserClick={() => setIsModalOpen(true)}
          onDeleteUser={handleDeleteUser}
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

              <UserRegistrationForm
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
