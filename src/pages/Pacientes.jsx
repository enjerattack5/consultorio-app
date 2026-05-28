import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Buscador, Modal } from '../components';
import Swal from 'sweetalert2';
import PacientesAPI from '../services/PacientesAPI';

export function Pacientes() {
  const [pacientes, setPacientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pacienteEnEdicion, setPacienteEnEdicion] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({ nombre: '', telefono: '', correo: '' });

  // ── CARGAR AL MONTAR ──────────────────────────────────────
  useEffect(() => {
    obtenerPacientes();
  }, []);

  const obtenerPacientes = async () => {
    try {
      const response = await PacientesAPI.obtenerPacientes();
      setPacientes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ── CREAR / EDITAR ────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (pacienteEnEdicion) {
        await PacientesAPI.editarPaciente(pacienteEnEdicion._id, formData);
        Swal.fire({ icon: 'success', title: '¡Actualizado!', timer: 1500, showConfirmButton: false });
      } else {
        await PacientesAPI.crearPaciente(formData);
        Swal.fire({ icon: 'success', title: '¡Registrado!', timer: 1500, showConfirmButton: false });
      }
      obtenerPacientes(); // refresca la lista desde el backend
      resetForm();
    } catch (error) {
      console.log(error);
      Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo guardar el paciente' });
    }
  };

  // ── ELIMINAR ──────────────────────────────────────────────
  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Eliminar paciente?',
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
          await PacientesAPI.eliminarPaciente(id);
          obtenerPacientes();
          Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false });
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // ── EDITAR (abrir modal con datos) ────────────────────────
  const handleEdit = (paciente) => {
    setPacienteEnEdicion(paciente);
    setFormData({ nombre: paciente.nombre, telefono: paciente.telefono, correo: paciente.correo });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ nombre: '', telefono: '', correo: '' });
    setPacienteEnEdicion(null);
    setShowModal(false);
  };

  const pacientesFiltrados = pacientes.filter(
    (p) =>
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="py-8 w-full font-sans">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Gestión de Pacientes</h1>
          <p className="text-slate-500 font-medium">Administra la información de tus pacientes</p>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm font-medium cursor-pointer">
          <Plus className="w-5 h-5" /> Nuevo Paciente
        </button>
      </div>

      <Buscador placeholder="Buscar paciente por nombre o correo..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-sm">
              <tr>
                <th className="px-6 py-4 font-semibold">Nombre</th>
                <th className="px-6 py-4 font-semibold">Teléfono</th>
                <th className="px-6 py-4 font-semibold">Correo</th>
                <th className="px-6 py-4 font-semibold text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {pacientesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No hay pacientes registrados.</td>
                </tr>
              ) : (
                pacientesFiltrados.map((paciente) => (
                  <tr key={paciente._id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{paciente.nombre}</td>
                    <td className="px-6 py-4 text-slate-600">{paciente.telefono}</td>
                    <td className="px-6 py-4 text-slate-600">{paciente.correo}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleEdit(paciente)} className="p-1.5 text-slate-400 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors cursor-pointer">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(paciente._id)} className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors cursor-pointer">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={showModal} onClose={resetForm} title={pacienteEnEdicion ? 'Editar Paciente' : 'Nuevo Paciente'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">Nombre Completo</label>
            <input type="text" required value={formData.nombre} onChange={(e) => setFormData({ ...formData, nombre: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">Teléfono</label>
            <input type="tel" required value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
          </div>
          <div>
            <label className="block mb-1.5 text-sm font-medium text-slate-700">Correo Electrónico</label>
            <input type="email" required value={formData.correo} onChange={(e) => setFormData({ ...formData, correo: e.target.value })} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
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