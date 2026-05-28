import { Sparkles, Heart, Scissors, Plus, Zap, Shield } from 'lucide-react';

export function Servicios() {
  const servicios = [
    {
      icon: Sparkles,
      titulo: 'Limpieza Dental',
      descripcion: 'Profilaxis profesional para mantener tus dientes limpios y saludables.',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Heart,
      titulo: 'Ortodoncia',
      descripcion: 'Corrige la alineación de tus dientes con brackets y alineadores invisibles.',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-50'
    },
    {
      icon: Sparkles,
      titulo: 'Blanqueamiento Dental',
      descripcion: 'Recupera el brillo natural de tu sonrisa con nuestros tratamientos de blanqueamiento.',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: Scissors,
      titulo: 'Extracción Dental',
      descripcion: 'Procedimientos de extracción seguros y sin dolor realizados por expertos.',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50'
    },
    {
      icon: Plus,
      titulo: 'Implantes Dentales',
      descripcion: 'Soluciones permanentes para reemplazar dientes perdidos con tecnología avanzada.',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Shield,
      titulo: 'Endodoncia',
      descripcion: 'Tratamiento de conductos para salvar dientes dañados o infectados.',
      textColor: 'text-cyan-600',
      bgColor: 'bg-cyan-50'
    }
  ];

  return (
    <div className="py-8 w-full font-sans">
      
      {/* Encabezado */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">Nuestros Servicios</h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
          Ofrecemos una amplia gama de servicios dentales con la mejor tecnología y profesionales altamente capacitados.
        </p>
      </div>

      {/* Grid de Tarjetas de Servicios */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {servicios.map((servicio, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-8 border border-slate-200 hover:shadow-xl transition-all hover:-translate-y-1 group"
          >
            {/* Ícono animado al hover */}
            <div className={`${servicio.bgColor} rounded-xl p-4 w-fit mb-6 transition-transform duration-300 group-hover:scale-110`}>
              <servicio.icon className={`w-8 h-8 ${servicio.textColor}`} strokeWidth={2} />
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-slate-900">{servicio.titulo}</h3>
            <p className="text-slate-600 leading-relaxed font-medium">{servicio.descripcion}</p>
          </div>
        ))}
      </div>

      {/* Sección CTA (Call to Action) */}
      <div className="bg-linear-to-br from-blue-50 to-slate-100 border border-slate-200 rounded-3xl p-8 md:p-12 text-center shadow-sm">
        <Zap className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4 text-slate-900">¿Necesitas más información?</h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto font-medium">
          Nuestro equipo está listo para ayudarte. Agenda una consulta y descubre el mejor tratamiento para ti.
        </p>
        <a
          href="/contacto"
          className="inline-block bg-blue-600 text-white font-medium px-8 py-3.5 rounded-xl hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
        >
          Contáctanos
        </a>
      </div>
      
    </div>
  );
}