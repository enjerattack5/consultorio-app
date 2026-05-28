import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Stethoscope } from 'lucide-react';
import { Buscador, Modal } from '../components';
import Swal from 'sweetalert2';
import DentistasAPI from '../services/DentistasAPI';

export function Odontologos() {
  const [odontologos, setOdontologos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [odontologoEnEdicion, setOdontologoEnEdicion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ nombre: '', especialidad: '', horarios: '' });

  useEffect(() => {
    obtenerDentistas();
  }, []);

  const obtenerDentistas = async () => {
    try {
      const response = await DentistasAPI.obtenerDentistas();
      setOdontologos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (odontologoEnEdicion) {
        await DentistasAPI.editarDentista(odontologoEnEdicion._id, formData);
        Swal.fire({ icon: 'success', title: '¡Actualizado!', timer: 1500, showConfirmButton: false });
      } else {
        await DentistasAPI.crearDentista(formData);
        Swal.fire({ icon: 'success', title: '¡Registrado!', timer: 1500, showConfirmButton: false });
      }
      obtenerDentistas();
      resetForm();
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar el odontólogo' });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar odontólogo?',
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
          await DentistasAPI.eliminarDentista(id);
          obtenerDentistas();
          Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const handleEdit = (odontologo) => {
    setOdontologoEnEdicion(odontologo);
    setFormData({ nombre: odontologo.nombre, especialidad: odontologo.especialidad, horarios: odontologo.horarios });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ nombre: '', especialidad: '', horarios: '' });
    setOdontologoEnEdicion(null);
    setShowModal(false);
  };

  const odontologosFiltrados = odontologos.filter(o =>
    o.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.especialidad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 w-full font-sans">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Gestión de Odontólogos</h1>
          <p className="text-slate-500 font-medium">Administra tu equipo de profesionales</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 flex items-center gap-2 cursor-pointer">
          <Plus size={20} /> Nuevo Odontólogo
        </button>
      </div>

      <Buscador placeholder="Buscar por nombre o especialidad..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {odontologosFiltrados.length === 0 ? (
          <p className="text-slate-500 col-span-3">No hay odontólogos registrados.</p>
        ) : (
          odontologosFiltrados.map((o) => (
            <div key={o._id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between mb-4">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <Stethoscope className="text-blue-600" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(o)} className="text-slate-400 hover:text-blue-600 cursor-pointer">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(o._id)} className="text-slate-400 hover:text-red-600 cursor-pointer">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-lg">{o.nombre}</h3>
              <p className="text-blue-600 text-sm mb-4">{o.especialidad}</p>
              <div className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                🕒 {o.horarios}
              </div>
            </div>
          ))
        )}
      </div>

      <Modal isOpen={showModal} onClose={resetForm} title={odontologoEnEdicion ? 'Editar Odontólogo' : 'Nuevo Odontólogo'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">Nombre</label>
            <input type="text" required value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">Especialidad</label>
            <input type="text" required value={formData.especialidad} onChange={e => setFormData({ ...formData, especialidad: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">Horarios</label>
            <input type="text" required value={formData.horarios} onChange={e => setFormData({ ...formData, horarios: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" placeholder="Ej: Lun-Vie 9:00-17:00" />
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