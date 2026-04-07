import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, EyeOff, Eye, ShieldCheck, Truck, Package, ArrowRight, Loader2, Box } from 'lucide-react';

export default function Login() {
  const [role, setRole] = useState('ADMINISTRADOR');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:8081/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: username, password: password })
      });

      if (response.ok) {
        const userData = await response.json();
        // Save user data in localStorage
        localStorage.setItem('qf_user_session', JSON.stringify(userData));

        // Redirect to gestion-productos
        navigate('/gestion-usuarios');
      } else {
        // Attempt to parse any error payload from backend, otherwise use generic message
        setErrorMsg('Acceso denegado. Verifique sus credenciales de Corporación QF');
      }
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setErrorMsg('Error de conexión. Intente nuevamente más tarde.');
    } finally {
      setIsLoading(false);
    }
  };

  const roles = [
    { id: 'ADMINISTRADOR', label: 'ADMINISTRADOR', icon: ShieldCheck },
    { id: 'OPERADOR', label: 'OPERADOR', icon: Truck },
    { id: 'JEFE_LOGISTICA', label: 'JEFE LOGÍSTICA', icon: Package },
  ];

  return (

    <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-green to-[#18d39e] flex items-center justify-center p-4 sm:p-8 font-sans">

      <div className="max-w-[1000px] w-full bg-brown rounded-[40px] shadow-2xl flex flex-col md:flex-row overflow-hidden min-h-[600px] lg:min-h-[650px]">

        {/* Left Column (Branding Panel) */}
        <div className="hidden md:flex flex-col justify-between w-[40%] bg-[rgb(24,126,63)] p-10 lg:p-14 relative overflow-hidden">

          {/* Background image overlay */}
          <div
            className="absolute inset-0 opacity-10 mix-blend-overlay bg-cover bg-center pointer-events-none"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=1000')" }}
          />

          {/* Subtle gradients */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-[#499D81] mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-[#1b4d3c] mix-blend-multiply filter blur-3xl opacity-50 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col mt-6 lg:mt-8">
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              Corporación QF
            </h1>
            <p className="text-[#E6F4F0] opacity-80 text-lg leading-relaxed max-w-sm font-light">
              Precisión logística para el sector farmacéutico de alta complejidad.
            </p>
          </div>

          <div className="relative z-10 mt-auto pt-8">
            <div className="border-t border-[#412d7a]/50 pt-6">
              <p className="text-xs tracking-[0.2em] font-bold text-[#E6F4F0] opacity-90 uppercase">
                Sistema Veridian v2.0
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (Form) */}
        <div className="w-full md:w-[60%] p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg- relative z-20">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Bienvenido de nuevo</h2>
            <p className="text-slate-500">Por favor, ingresa tus credenciales para continuar.</p>
          </div>

          <form onSubmit={handleLogin} className="w-full space-y-6">

            {/* Role Selector */}
            <div className="flex flex-col sm:flex-row gap-1 mb-8">
              {roles.map(r => {
                const isSelected = role === r.id;
                const Icon = r.icon;
                return (
                  <>
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => setRole(r.id)}
                      className={`flex-1 flex flex-col items-center justify-center py-4 px-2 rounded-2xl transition-all duration-200 ${isSelected
                        ? 'bg-white border-4 border-[#499D81] shadow-md transform scale-105 z-10'
                        : 'bg-slate-50 border-4 border-transparent text-slate-500 hover:bg-slate-100'
                        }`}
                    >
                      <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-[#499D81]' : 'text-slate-400'}`} />
                      <span className={`text-[10px] md:text-xs font-bold text-center tracking-wide ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>
                        {r.label}
                      </span>
                    </button>
                  </>
                )
              })}
            </div>
            {/* Error Message */}
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold text-center">
                {errorMsg}
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-5">
              {/* Username */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2 ml-1 tracking-wide">NOMBRE DE USUARIO</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 bg-slate-50 border-transparent rounded-2xl text-slate-800 focus:bg-white focus:border-[#499D81] focus:ring-2 focus:ring-[#499D81]/20 transition-all outline-none font-medium placeholder-slate-400"
                    placeholder="Ingrese su usuario"
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-2 ml-1 mr-1">
                  <label className="block text-xs font-bold text-slate-700 tracking-wide">CONTRASEÑA</label>
                  <a href="#" className="text-xs font-bold text-[#499D81] hover:text-[#2D7A5F] transition-colors">¿FORGOT PASSWORD?</a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-12 pr-12 py-4 bg-slate-50 border-transparent rounded-2xl text-slate-800 focus:bg-white focus:border-[#499D81] focus:ring-2 focus:ring-[#499D81]/20 transition-all outline-none font-medium placeholder-slate-400"
                    placeholder="••••••••"
                    required
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-[#499D81] focus:outline-none transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-6 text-white font-bold py-4 px-6 rounded-full shadow-[0_8px_20px_rgba(73,157,129,0.3)] transition-all duration-300 outline-none flex items-center justify-center group tracking-wide
                ${isLoading
                  ? 'bg-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-[#499D81] hover:bg-[#499D81] hover:shadow-[0_10px_25px_rgba(73,157,129,0.4)] hover:-translate-y-1 focus:ring-4 focus:ring-[#499D81]/50'
                }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  AUTENTICANDO...
                </>
              ) : (
                <>
                  INICIAR SESIÓN
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1.5 transition-transform bg" />
                </>
              )}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
