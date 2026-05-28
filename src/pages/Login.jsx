import { useNavigate } from 'react-router-dom';
import { AuthForm } from '../components/AuthForm';
import Swal from 'sweetalert2';

export function Login() {
  const navigate = useNavigate();

  const handleLogin = (data) => {
    Swal.fire({ icon: 'success', title: 'Bienvenido', timer: 1500, showConfirmButton: false });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <AuthForm tipo="login" onSubmit={handleLogin} />
    </div>
  );
}