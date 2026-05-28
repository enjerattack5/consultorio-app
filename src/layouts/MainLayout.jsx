import { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Menu, X, Sparkles, LogOut } from 'lucide-react';
import { Footer } from './Footer';
import Swal from 'sweetalert2';

export function MainLayout({ onLogout }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Lista de enlaces de navegación
  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Pacientes', path: '/pacientes' },
    { name: 'Odontólogos', path: '/odontologos' },
    { name: 'Citas', path: '/citas' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Contacto', path: '/contacto' }
  ];

  // Función para cerrar sesión con SweetAlert2
  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar Sesión?",
      text: "Saldrás de la plataforma de gestión médica.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('dentalcare_authenticated');
        localStorage.removeItem('dentalcare_user_email');
        
        if (typeof onLogout === 'function') {
          onLogout();
        }
        
        navigate('/');
      }
    });
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      
      {/* NAVEGACIÓN SUPERIOR (NAVBAR) */}
      <nav className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="bg-blue-600 rounded-lg p-2 shadow-sm shadow-blue-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 tracking-tight">DentalCare</span>
            </Link>

            {/* Menú de Escritorio (Desktop) */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="w-px h-6 bg-slate-200 mx-2"></div> {/* Separador */}

              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>

            {/* Botón Menú Móvil */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Menú Desplegable Móvil */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white shadow-lg absolute w-full">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-slate-100 my-2"></div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Salir
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* CONTENIDO PRINCIPAL (Donde se inyecta el Dashboard, Pacientes, etc.) */}
      <main className="max-w-7xl mx-auto w-full flex-1 mb-10 mt-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}