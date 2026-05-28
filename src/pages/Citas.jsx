import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Buscador, Modal } from '../components';
import Swal from 'sweetalert2';
import CitasAPI from '../services/CitasAPI';

export function Citas() {
  const [citas, setCitas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [citaEnEdicion, setCitaEnEdicion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ paciente: '', odontologo: '', fecha: '', hora: '', estado: 'pendiente' });

  useEffect(() => {
    obtenerCitas();
  }, []);

  const obtenerCitas = async () => {
    try {
      const response = await CitasAPI.obtenerCitas();
      setCitas(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (citaEnEdicion) {
        await CitasAPI.editarCita(citaEnEdicion._id, formData);
        Swal.fire({ icon: 'success', title: '¡Actualizada!', timer: 1500, showConfirmButton: false });
      } else {
        await CitasAPI.crearCita(formData);
        Swal.fire({ icon: 'success', title: '¡Agendada!', timer: 1500, showConfirmButton: false });
      }
      obtenerCitas();
      resetForm();
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar la cita' });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar cita?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await CitasAPI.eliminarCita(id);
          obtenerCitas();
          Swal.fire({ icon: 'success', title: 'Eliminada', timer: 1500, showConfirmButton: false });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleEdit = (cita) => {
    setCitaEnEdicion(cita);
    setFormData({ paciente: cita.paciente, odontologo: cita.odontologo, fecha: cita.fecha, hora: cita.hora, estado: cita.estado });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ paciente: '', odontologo: '', fecha: '', hora: '', estado: 'pendiente' });
    setCitaEnEdicion(null);
    setShowModal(false);
  };

  const citasFiltradas = citas.filter(c =>
    c.paciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.odontologo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 w-full font-sans">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Gestión de Citas</h1>
          <p className="text-slate-500 font-medium">Administra las citas del consultorio</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
          <Plus size={20} /> Agendar Cita
        </button>
      </div>

      <Buscador placeholder="Buscar por paciente u odontólogo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <div className="grid md:grid-cols-3 gap-6">
        {citasFiltradas.length === 0 ? (
          <p className="text-slate-500 col-span-3">No hay citas registradas.</p>
        ) : (
          citasFiltradas.map((c) => (
            <div key={c._id} className="bg-white p-6 rounded-2xl border shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <span className={`text-xs px-3 py-1 rounded-full capitalize font-medium ${
                  c.estado === 'confirmada' ? 'bg-emerald-100 text-emerald-700' :
                  c.estado === 'completada' ? 'bg-blue-100 text-blue-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {c.estado}
                </span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(c)} className="text-slate-400 hover:text-blue-600 cursor-pointer">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(c._id)} className="text-slate-400 hover:text-red-600 cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-lg mt-2">{c.paciente}</h3>
              <p className="text-blue-600 text-sm mb-4">{c.odontologo}</p>
              <div className="space-y-1 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                <div className="flex items-center gap-2"><CalendarIcon size={16} /> {c.fecha}</div>
                <div className="flex items-center gap-2"><Clock size={16} /> {c.hora} Hrs</div>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={showModal} onClose={resetForm} title={citaEnEdicion ? 'Editar Cita' : 'Agendar Cita'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">Paciente</label>
            <input type="text" required value={formData.paciente} onChange={e => setFormData({ ...formData, paciente: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">Odontólogo</label>
            <input type="text" required value={formData.odontologo} onChange={e => setFormData({ ...formData, odontologo: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
          </div>
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Fecha</label>
              <input type="date" required value={formData.fecha} onChange={e => setFormData({ ...formData, fecha: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
            </div>
            <div className="flex-1">
              <label className="block mb-1.5 text-sm font-medium text-slate-700">Hora</label>
              <input type="time" required value={formData.hora} onChange={e => setFormData({ ...formData, hora: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
            </div>
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">Estado</label>
            <select value={formData.estado} onChange={e => setFormData({ ...formData, estado: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm">
              <option value="pendiente">Pendiente</option>
              <option value="confirmada">Confirmada</option>
              <option value="completada">Completada</option>
            </select>
          </div>
          <div className="flex gap-3 pt-5">
            <button type="button" onClick={resetForm} className="flex-1 bg-white border border-slate-200 text-slate-700 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 cursor-pointer">Cancelar</button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium cursor-pointer hover:bg-blue-700">Guardar</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}