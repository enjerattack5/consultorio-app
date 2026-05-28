import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import ContactoAPI from '../services/ContactoAPI' 
export function Contacto() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    asunto: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);

const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitted(true)
    try {
        await ContactoAPI.enviarMensaje(formData)
        Swal.fire({
            icon: 'success',
            title: '¡Mensaje Enviado!',
            text: 'Nos pondremos en contacto contigo pronto.',
            timer: 2000,
            showConfirmButton: false
        })
        setTimeout(() => {
            setFormData({ nombre: '', correo: '', telefono: '', asunto: '', mensaje: '' })
            setSubmitted(false)
        }, 2000)
    } catch (error) {
        console.log(error)
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo enviar el mensaje' })
        setSubmitted(false)
    }
}

  return (
    <div className="py-8 w-full font-sans">
      
      {/* Encabezado */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Contáctanos</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
          ¿Tienes alguna pregunta o necesitas agendar una cita? Estamos aquí para ayudarte.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        
        {/* LADO IZQUIERDO: Formulario de Contacto */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Envíanos un mensaje</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Nombre Completo</label>
              <input
                type="text"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900"
                placeholder="Ej: Juan Pérez"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Correo Electrónico</label>
              <input
                type="email"
                required
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Teléfono</label>
              <input
                type="tel"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900"
                placeholder="+52 555 123 4567"
              />
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Asunto</label>
              <select
                required
                value={formData.asunto}
                onChange={(e) => setFormData({ ...formData, asunto: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 cursor-pointer"
              >
                <option value="">Seleccionar asunto</option>
                <option value="consulta">Consulta General</option>
                <option value="cita">Agendar Cita</option>
                <option value="servicio">Información de Servicios</option>
                <option value="emergencia">Emergencia Dental</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Mensaje</label>
              <textarea
                required
                rows={5}
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all text-slate-900 resize-none"
                placeholder="Escribe tu mensaje aquí..."
              />
            </div>

            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-blue-600 text-white font-medium py-3.5 rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-sm shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {submitted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Mensaje Enviado
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Enviar Mensaje
                </>
              )}
            </button>
          </form>
        </div>

        {/* LADO DERECHO: Tarjetas de Información */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-slate-900">Información de Contacto</h2>
          <div className="space-y-6">
            
            {/* Tarjeta Teléfono */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 rounded-xl p-3">
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Teléfono</h3>
                  <p className="text-slate-600 font-medium">+52 555 123 4567</p>
                  <p className="text-slate-600 font-medium">+52 555 765 4321</p>
                </div>
              </div>
            </div>

            {/* Tarjeta Correo */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 rounded-xl p-3">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Correo Electrónico</h3>
                  <p className="text-slate-600 font-medium">contacto@dentalcare.com</p>
                  <p className="text-slate-600 font-medium">info@dentalcare.com</p>
                </div>
              </div>
            </div>

            {/* Tarjeta Ubicación */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 rounded-xl p-3">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Ubicación</h3>
                  <p className="text-slate-600 font-medium">Av. Reforma 123</p>
                  <p className="text-slate-600 font-medium">Ciudad de México, CDMX</p>
                  <p className="text-slate-600 font-medium">CP 06600, México</p>
                </div>
              </div>
            </div>

            {/* Tarjeta Horarios */}
            <div className="bg-linear-to-br from-blue-50 to-slate-100 border border-slate-200 rounded-2xl p-6 shadow-sm">
              <h3 className="font-bold text-slate-900 mb-3">Horarios de Atención</h3>
              <div className="space-y-1.5 text-sm text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span>Lunes a Viernes:</span>
                  <span className="font-bold text-slate-900">9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábado:</span>
                  <span className="font-bold text-slate-900">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Domingo:</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}