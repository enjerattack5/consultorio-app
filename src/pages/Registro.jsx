import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Lock, Mail, User } from 'lucide-react';
import Swal from 'sweetalert2';

export function Registro() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseñas no coinciden',
        text: 'Por favor, verifica que ambas contraseñas sean iguales.',
        confirmButtonColor: '#2563eb'
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: '¡Cuenta creada!',
      text: 'Tu usuario ha sido registrado visualmente. Ahora puedes iniciar sesión.',
      confirmButtonColor: '#2563eb'
    }).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-600/5 via-white to-indigo-600/20 p-4 font-sans">
      <div className="w-full max-w-md">
        
        {/* Encabezado */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="bg-blue-600 rounded-lg p-3 shadow-md shadow-blue-200">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-slate-900 tracking-tight">DentalCare</span>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-slate-900">Crear Cuenta</h1>
          <p className="text-slate-500 text-sm">Regístrate en la plataforma de consultoría dental</p>
        </div>

        {/* Tarjeta del Formulario */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input Nombre */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Nombre Completo</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800 text-sm"
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>

            {/* Input Correo */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Correo Electrónico</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800 text-sm"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            {/* Input Contraseña */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Contraseña</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800 text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Input Confirmar Contraseña */}
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Confirmar Contraseña</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-800 text-sm"
                  placeholder="Repite tu contraseña"
                />
              </div>
            </div>

            {/* Botón Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 cursor-pointer text-sm mt-2"
            >
              Registrarse
            </button>
          </form>
        </div>

        {/* Footer del Registro */}
        <div className="mt-6 text-center text-sm text-slate-500 font-medium">
          ¿Ya tienes una cuenta? <Link to="/" className="text-blue-600 hover:underline">Inicia Sesión</Link>
        </div>

      </div>
    </div>
  );
}