import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Columna 1: Información de la clínica */}
          <div>
            <h3 className="font-semibold text-slate-900 text-lg mb-4">DentalCare Consultoría</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              Tu salud dental es nuestra prioridad. Brindamos atención de calidad con los mejores profesionales.
            </p>
          </div>

          {/* Columna 2: Contacto */}
          <div>
            <h3 className="font-semibold text-slate-900 text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Phone className="w-4 h-4 text-blue-600" />
                <span>+52 555 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <Mail className="w-4 h-4 text-blue-600" />
                <span>contacto@dentalcare.com</span>
              </div>
              <div className="flex items-center gap-3 text-slate-500 text-sm">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Ciudad de México, México</span>
              </div>
            </div>
          </div>

          {/* Columna 3: Redes Sociales (Usando react-icons) */}
          <div>
            <h3 className="font-semibold text-slate-900 text-lg mb-4">Síguenos</h3>
            <div className="flex gap-3">
              
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
              >
                <FaFacebook className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
              >
                <FaTwitter className="w-5 h-5" />
              </a>

              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-blue-600 hover:text-white transition-colors shadow-sm"
              >
                <FaInstagram className="w-5 h-5" />
              </a>
              
            </div>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-sm text-slate-500 font-medium">
          <p>&copy; {new Date().getFullYear()} DentalCare Consultoría. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}