import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import UserManagementPage from './components/UserManagementPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/gestion-usuarios" element={<UserManagementPage />} />
    </Routes>
  );
}

export default App;