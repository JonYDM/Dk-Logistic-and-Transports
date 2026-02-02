import {
  TrendingUp,
  Users,
  Truck,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { estadisticasDashboard, serviciosMock } from '../data/mockData';
import { Title, Button, Badge, Card } from '@/shared/components';

const Dashboard = () => {
  const stats = estadisticasDashboard;

  const statCards = [
    { title: 'Servicios Hoy', value: stats.serviciosHoy, change: '+12%', icon: Truck },
    { title: 'Ingresos Hoy', value: `$${stats.ingresosHoy.toLocaleString()}`, change: '+8%', icon: DollarSign },
    { title: 'Choferes Activos', value: stats.choferesActivos, change: '+5%', icon: Users },
    { title: 'Clientes Nuevos', value: stats.clientesNuevos, change: '+15%', icon: TrendingUp },
  ];

  const COLORS = ['#1f2937', '#6b7280', '#d1d5db'];

  const getEstadoVariant = (estado) => {
    if (estado === 'completado') return 'completado';
    if (estado === 'en_transito') return 'en_transito';
    if (estado === 'cancelado') return 'cancelado';
    return 'solicitado';
  };

  return (
    <div className="space-y-16 py-12 px-6 lg:px-12 max-w-[1600px] mx-auto">
      <div className="space-y-3">
        <Title variant="page-title">Dashboard</Title>
        <Title variant="subtitle">Vista general de DK Logística - Morelos</Title>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="group p-8 rounded-3xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all cursor-pointer bg-white">
              <div className="flex items-start justify-between mb-6">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-yellow-600 to-yellow-500">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-sm font-bold">{stat.change}</span>
                </div>
              </div>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">{stat.title}</p>
              <h3 className="text-4xl font-black text-gray-900">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <Title variant="section-title">Servicios Recientes</Title>
            <Title variant="subtitle" className="mt-2">Últimos movimientos de la plataforma</Title>
          </div>
          <Button variant="primary">Ver todos</Button>
        </div>
        <div className="space-y-3">
          {serviciosMock.slice(0, 5).map((servicio) => (
            <div key={servicio.id} className="p-8 hover:bg-gray-50 rounded-3xl transition-all border-b border-gray-100 last:border-0 cursor-pointer">
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h4 className="font-bold text-gray-900 text-lg">{servicio.folio}</h4>
                    <Badge variant="secondary" size="sm">{servicio.tipo}</Badge>
                    <Badge variant={getEstadoVariant(servicio.estado)} size="sm">
                      {servicio.estado.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span className="font-medium">{servicio.cliente.nombre}</span>
                    <span>→</span>
                    <span className="font-medium">{servicio.chofer ? servicio.chofer.nombre : 'Sin asignar'}</span>
                  </div>
                  <p className="text-gray-500 font-light">{servicio.origen.zona} → {servicio.destino.zona}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-gray-900">${servicio.precioTotal}</p>
                  <p className="text-sm text-gray-500 font-light">{servicio.distanciaKm} km</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
