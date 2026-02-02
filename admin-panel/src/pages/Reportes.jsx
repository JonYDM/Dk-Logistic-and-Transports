import {
  Download,
  Calendar,
  TrendingUp,
  DollarSign,
  Users,
  Truck,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { estadisticasDashboard } from '../data/mockData';
import { Title, Button, Card } from '@/shared/components';

const Reportes = () => {
  const datosIngresosMensuales = [
    { mes: 'Ene', ingresos: 85000, servicios: 215 },
    { mes: 'Feb', ingresos: 92000, servicios: 230 },
    { mes: 'Mar', ingresos: 78000, servicios: 195 },
    { mes: 'Abr', ingresos: 105000, servicios: 262 },
    { mes: 'May', ingresos: 118000, servicios: 295 },
    { mes: 'Jun', ingresos: 125000, servicios: 312 },
  ];

  const topChoferes = [
    { nombre: 'Fernando Sánchez', servicios: 87, ingresos: 52100, calificacion: 5.0 },
    { nombre: 'Miguel Hernández', servicios: 76, ingresos: 45200, calificacion: 4.9 },
    { nombre: 'Roberto García', servicios: 68, ingresos: 38900, calificacion: 4.7 },
    { nombre: 'Carlos Ramírez', servicios: 64, ingresos: 32450, calificacion: 4.8 },
    { nombre: 'José Luis Morales', servicios: 51, ingresos: 28300, calificacion: 4.6 },
  ];

  return (
    <div className="space-y-16 py-12 px-6 lg:px-12 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <Title variant="page-title">Reportes</Title>
          <Title variant="subtitle">
            Análisis y estadísticas de la plataforma
          </Title>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Calendar className="w-4 h-4 inline-block mr-2" />
            Periodo
          </Button>
          <Button variant="primary">
            <Download className="w-4 h-4 inline-block mr-2" />
            Exportar Excel
          </Button>
        </div>
      </div>

      {/* Resumen General */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Ingresos Totales', value: '$603,000', change: '+18%', icon: DollarSign },
          { label: 'Servicios', value: '1,509', change: '+12%', icon: Truck },
          { label: 'Choferes', value: '23', change: '+5', icon: Users },
          { label: 'Ticket Promedio', value: '$400', change: '+5%', icon: TrendingUp },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="group p-8 rounded-3xl hover:bg-gray-50 transition-all cursor-pointer border border-gray-200">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-600 to-yellow-500 inline-block mb-4">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                {stat.label}
              </p>
              <h3 className="text-4xl font-black text-gray-900 mb-2">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-600 font-semibold">
                {stat.change} vs anterior
              </p>
            </div>
          );
        })}
      </div>

      {/* Gráficas */}
      <div className="space-y-16">
        <Card padding="xl">
          <div className="space-y-2">
            <Title variant="section-title">
              Evolución de Ingresos
            </Title>
            <Title variant="subtitle">
              Últimos 6 meses
            </Title>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={datosIngresosMensuales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" stroke="#9CA3AF" style={{ fontSize: '12px', fontWeight: '500' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px', fontWeight: '500' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="ingresos" fill="#1f2937" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card padding="xl">
          <div className="space-y-2">
            <Title variant="section-title">
              Servicios Completados
            </Title>
            <Title variant="subtitle">
              Últimos 6 meses
            </Title>
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={datosIngresosMensuales}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="mes" stroke="#9CA3AF" style={{ fontSize: '12px', fontWeight: '500' }} />
              <YAxis stroke="#9CA3AF" style={{ fontSize: '12px', fontWeight: '500' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  backdropFilter: 'blur(10px)',
                  border: 'none',
                  borderRadius: '16px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                }}
              />
              <Line
                type="monotone"
                dataKey="servicios"
                stroke="#ca8a04"
                strokeWidth={3}
                dot={{ fill: '#ca8a04', r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Top Choferes */}
      <div className="space-y-8 py-12">
        <div className="space-y-2">
          <Title variant="section-title">
            Top 5 Choferes del Mes
          </Title>
          <Title variant="subtitle">
            Mejores desempeños del periodo
          </Title>
        </div>

        <div className="space-y-4">
          {topChoferes.map((chofer, index) => (
            <div
              key={index}
              className="p-6 md:p-8 hover:bg-white/80 rounded-3xl transition-all border-b border-gray-100 last:border-0 hover:shadow-xl cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
                <div className="flex items-center gap-4 md:gap-6">
                  <div className={`flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-2xl font-black text-xl md:text-2xl text-white flex-shrink-0 ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-600 to-yellow-500' :
                    index === 1 ? 'bg-gradient-to-br from-gray-400 to-gray-500' :
                    index === 2 ? 'bg-gradient-to-br from-yellow-700 to-yellow-800' :
                    'bg-gradient-to-br from-gray-700 to-gray-800'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-lg md:text-xl font-black text-gray-900 truncate">{chofer.nombre}</h4>
                    <p className="text-sm md:text-base text-gray-600">
                      {chofer.servicios} servicios
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 md:gap-12 pl-16 md:pl-0">
                  <div className="text-left md:text-right">
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Ingresos</p>
                    <p className="text-xl md:text-2xl font-black text-yellow-600">
                      ${chofer.ingresos.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs md:text-sm text-gray-500 mb-1">Rating</p>
                    <p className="text-xl md:text-2xl font-black text-yellow-500">
                      ⭐ {chofer.calificacion}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Métricas Clave */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Tasa de Asignación', value: '94%', color: 'emerald' },
          { label: 'Tiempo Promedio', value: '2.5 min', color: 'blue' },
          { label: 'Tasa de Cancelación', value: '3.2%', color: 'red' },
        ].map((metric, i) => (
          <div key={i} className="p-8 rounded-3xl bg-white/50 backdrop-blur-sm">
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
              {metric.label}
            </p>
            <p className="text-5xl font-black text-gray-900 mb-4">
              {metric.value}
            </p>
            <div className="bg-gray-200 rounded-full h-2">
              <div
                className={`bg-${metric.color}-500 h-2 rounded-full transition-all duration-1000`}
                style={{ width: metric.value }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reportes;
