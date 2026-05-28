import { Users, Calendar, Stethoscope, TrendingUp } from 'lucide-react';
import { useEffect, useState } from "react"
import PacientesAPI from "../services/PacientesAPI"
import DentistasAPI from "../services/DentistasAPI"
import CitasAPI from "../services/CitasAPI"
export function Dashboard() {
  

  const [patients, setPatients] = useState([]) 
  const [dentists, setDentists] = useState([])
const [appointments, setAppointments] = useState([])
 
const mockAppointments = appointments
  const mockDentists = dentists

  // 2. CÁLCULOS
  const pendingAppointments = mockAppointments.filter((a) => a.estado === 'pendiente').length;
  const confirmedAppointments = mockAppointments.filter((a) => a.estado === 'confirmada').length;

  const stats = [
    {
      title: 'Pacientes Registrados',
      value: patients.length,
      icon: Users,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      title: 'Citas Agendadas',
      value: mockAppointments.length,
      icon: Calendar,
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      title: 'Odontólogos Disponibles',
      value: mockDentists.length,
      icon: Stethoscope,
      bgColor: 'bg-indigo-50',
      textColor: 'text-indigo-600'
    },
    {
      title: 'Citas Confirmadas',
      value: confirmedAppointments,
      icon: TrendingUp,
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];
useEffect(() => {
    obtenerPacientes()
     obtenerDentistas()
     obtenerCitas()
}, [])
const obtenerPacientes = async () => {

    try {

        const response = await PacientesAPI.obtenerPacientes()

        setPatients(response.data)

    } catch (error) {

        console.log(error)

    }

}

const obtenerDentistas = async () => {

    try {

        const response = await DentistasAPI.obtenerDentistas()

        setDentists(response.data)

    } catch (error) {

        console.log(error)

    }

}
const obtenerCitas = async () => {

    try {

        const response = await CitasAPI.obtenerCitas()

        setAppointments(response.data)

    } catch (error) {

        console.log(error)

    }

}

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
      
      {/* Encabezado */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-slate-900">Dashboard</h1>
        <p className="text-slate-500">Resumen general de DentalCare Consultoría</p>
      </div>

      {/* Tarjetas de Estadísticas (KPIs) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-500 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} rounded-lg p-3`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paneles Inferiores */}
      <div className="grid lg:grid-cols-2 gap-6">
        
        {/* Panel Citas */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-slate-900">Citas Recientes</h2>
          {mockAppointments.length === 0 ? (
            <p className="text-slate-500 text-sm">No hay citas registradas</p>
          ) : (
            <div className="space-y-3">
              {mockAppointments.slice(0, 5).map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm text-slate-900">{appointment.paciente}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Dr. {appointment.odontologo} • {appointment.fecha} {appointment.hora}
                    </p>
                  </div>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium capitalize ${
                      appointment.estado === 'confirmada'
                        ? 'bg-emerald-100 text-emerald-700'
                        : appointment.estado === 'completada'
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {appointment.estado}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Panel Odontólogos */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-slate-900">Odontólogos Activos</h2>
          {mockDentists.length === 0 ? (
            <p className="text-slate-500 text-sm">No hay odontólogos registrados</p>
          ) : (
            <div className="space-y-3">
              {mockDentists.map((dentist) => (
                <div
                  key={dentist.id}
                  className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-100 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <div className="bg-blue-100 rounded-full p-2.5">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-slate-900">{dentist.nombre}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{dentist.especialidad}</p>
                    <p className="text-xs text-slate-400 mt-1 font-medium">{dentist.horarios}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
}