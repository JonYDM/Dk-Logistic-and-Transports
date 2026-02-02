import { useState } from 'react';
import { Save, Settings, DollarSign, Bell } from 'lucide-react';
import { configuracionMock } from '../data/mockData';
import { Title, Button, Card } from '@/shared/components';

const Configuracion = () => {
  const [config, setConfig] = useState(configuracionMock);
  const [activeTab, setActiveTab] = useState('general');

  const handleSave = () => {
    alert('Configuración guardada exitosamente');
  };

  return (
    <div className="space-y-16 py-12 px-6 lg:px-12 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <Title variant="page-title">Configuración</Title>
          <Title variant="subtitle">
            Ajustes globales del sistema
          </Title>
        </div>
        <Button onClick={handleSave} variant="primary">
          <Save className="w-4 h-4 inline-block mr-2" />
          Guardar Cambios
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 pb-1">
        {[
          { id: 'general', label: 'General', icon: Settings },
          { id: 'precios', label: 'Precios', icon: DollarSign },
          { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 rounded-t-2xl font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* General Settings */}
      {activeTab === 'general' && (
        <div className="space-y-12">
          <Card padding="lg">
            <Title variant="card-title">
              Configuración de Servicios
            </Title>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Radio de Búsqueda de Choferes (km)
                </label>
                <input
                  type="number"
                  value={config.radioBusquedaKm}
                  onChange={(e) =>
                    setConfig({ ...config, radioBusquedaKm: parseInt(e.target.value) })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-gray-900"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Distancia máxima para buscar choferes disponibles desde el punto de origen
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Tiempo de Espera por Asignación (segundos)
                </label>
                <input
                  type="number"
                  value={config.tiempoEsperaAsignacion}
                  onChange={(e) =>
                    setConfig({ ...config, tiempoEsperaAsignacion: parseInt(e.target.value) })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-gray-900"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Tiempo que espera cada chofer para aceptar antes de pasar al siguiente
                </p>
              </div>
            </div>
          </Card>

          <Card padding="lg">
            <Title variant="card-title">
              Información de la Empresa
            </Title>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Nombre de la Empresa
                </label>
                <input
                  type="text"
                  defaultValue="DK Logística y Transportes"
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Teléfono de Soporte
                  </label>
                  <input
                    type="tel"
                    defaultValue="777-000-0000"
                    className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Email de Soporte
                  </label>
                  <input
                    type="email"
                    defaultValue="soporte@dklogistica.com"
                    className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-semibold text-gray-900"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Precio Settings */}
      {activeTab === 'precios' && (
        <div className="space-y-12">
          <Card padding="lg">
            <Title variant="card-title">
              Configuración de Comisiones
            </Title>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Comisión de la Plataforma (%)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={config.comisionPorcentaje}
                    onChange={(e) =>
                      setConfig({ ...config, comisionPorcentaje: parseFloat(e.target.value) })
                    }
                    min="0"
                    max="100"
                    step="0.5"
                    className="w-32 px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-black text-gray-900 text-xl"
                  />
                  <span className="text-2xl font-bold text-gray-600">%</span>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Porcentaje que retiene la plataforma de cada servicio
                </p>

                <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <h4 className="text-sm font-black text-gray-900 mb-3">
                    Ejemplo de distribución:
                  </h4>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p className="font-bold">Servicio de $500:</p>
                    <p>• Comisión plataforma: ${(500 * config.comisionPorcentaje / 100).toFixed(2)} ({config.comisionPorcentaje}%)</p>
                    <p>• Pago al chofer: <span className="text-yellow-600 font-bold">${(500 * (100 - config.comisionPorcentaje) / 100).toFixed(2)}</span> ({100 - config.comisionPorcentaje}%)</p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  Costo por Ayudante
                </label>
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-gray-600">$</span>
                  <input
                    type="number"
                    value={config.costoAyudante}
                    onChange={(e) =>
                      setConfig({ ...config, costoAyudante: parseInt(e.target.value) })
                    }
                    className="w-32 px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-black text-gray-900 text-xl"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Cargo adicional por cada ayudante solicitado en mudanzas
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  IVA (%)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    value={config.iva}
                    onChange={(e) =>
                      setConfig({ ...config, iva: parseFloat(e.target.value) })
                    }
                    className="w-32 px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent font-black text-gray-900 text-xl"
                  />
                  <span className="text-2xl font-bold text-gray-600">%</span>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Impuesto aplicado a los servicios
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Notificaciones Settings */}
      {activeTab === 'notificaciones' && (
        <div className="space-y-12">
          <Card padding="lg">
            <Title variant="card-title" className="mb-6">
              Configuración de Notificaciones
            </Title>

            {[
              { label: 'Notificar nuevo servicio', desc: 'Enviar push a choferes cuando hay un nuevo servicio' },
              { label: 'Notificar asignación de servicio', desc: 'Enviar notificación al cliente cuando se asigna un chofer' },
              { label: 'Notificar servicio completado', desc: 'Enviar notificación cuando un servicio es completado' },
              { label: 'Recordatorio de calificación', desc: 'Recordar a usuarios calificar después de completar un servicio' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-6 border-b border-gray-200 last:border-0">
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">{item.label}</h4>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </Card>

          <Card padding="md" className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200">
            <h4 className="font-black text-yellow-900 mb-2">⚠️ Nota importante</h4>
            <p className="text-sm text-yellow-800">
              Las notificaciones push requieren que Firebase Cloud Messaging esté configurado correctamente en las aplicaciones móviles.
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Configuracion;
