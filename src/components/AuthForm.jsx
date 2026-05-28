import { useState } from 'react';
import { Mail, Lock, User, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AuthForm({ tipo, onSubmit }) {
  const isLogin = tipo === 'login';
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="bg-blue-600 rounded-lg p-2.5">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-900 tracking-tight">DentalCare</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h1>
        <p className="text-slate-500 text-sm mt-1">
          {isLogin ? 'Accede a tu panel de consultoría' : 'Regístrate para comenzar'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nombre Completo</label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Tu nombre" />
            </div>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Correo</label>
          <div className="relative">
            <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="tu@email.com" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Contraseña</label>
          <div className="relative">
            <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="••••••••" />
          </div>
        </div>

        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirmar Contraseña</label>
            <div className="relative">
              <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="password" required value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm" placeholder="Repite contraseña" />
            </div>
          </div>
        )}

        <button type="submit" className="w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition-colors mt-4">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
        <Link to={isLogin ? "/registro" : "/"} className="text-blue-600 font-semibold hover:underline">
          {isLogin ? 'Regístrate' : 'Inicia Sesión'}
        </Link>
      </p>
    </div>
  );
}