import { useState } from 'react';
import { MapPin, Users, Truck, Edit, Trash2, Plus, DollarSign } from 'lucide-react';
import { zonasMock, preciosMock } from '../data/mockData';
import { Title, Button, Badge, Card, ResponsiveDialog } from '@/shared/components';

const Zonas = () => {
  const [activeTab, setActiveTab] = useState('zonas');
  const [isAddZonaModalOpen, setIsAddZonaModalOpen] = useState(false);
  const [isAddPrecioModalOpen, setIsAddPrecioModalOpen] = useState(false);

  return (
    <div className="space-y-16 py-12 px-6 lg:px-12 max-w-[1600px] mx-auto">
      <div className="space-y-3">
        <Title variant="page-title">Zonas y Precios</Title>
        <Title variant="subtitle">
          Configuración de zonas de cobertura y matriz de precios
        </Title>
      </div>

      <div className="flex gap-4 border-b border-gray-200 pb-1">
        {[
          { id: 'zonas', label: 'Zonas de Cobertura', mobileLabel: 'Zonas', icon: MapPin },
          { id: 'precios', label: 'Matriz de Precios', mobileLabel: 'Precios', icon: DollarSign },
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
              <span className="md:hidden">{tab.mobileLabel}</span>
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'zonas' && (
        <div className="space-y-12">
          <div className="p-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-xl font-bold text-gray-700">Mapa interactivo de zonas</p>
              <p className="text-gray-500 mt-2">
                Integración con Mapbox/Google Maps
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Title variant="section-title">Zonas Activas</Title>
            <Button variant="primary" onClick={() => setIsAddZonaModalOpen(true)}>
              <Plus className="w-4 h-4 inline-block mr-2" />
              <span className="md:hidden">Nueva</span>
              <span className="hidden md:inline">Nueva Zona</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {zonasMock.map((zona) => (
              <div
                key={zona.id}
                className="p-8 bg-white hover:bg-gray-50 rounded-3xl transition-all border border-gray-200 hover:shadow-lg cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-xl font-black text-gray-900 flex-1">
                    {zona.nombre}
                  </h3>
                  <Badge
                    variant={zona.activa ? 'secondary' : 'neutral'}
                    size="sm"
                  >
                    {zona.activa ? 'Activa' : 'Inactiva'}
                  </Badge>
                </div>

                <p className="text-gray-600 mb-6">{zona.descripcion}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Servicios activos</span>
                    <span className="font-bold text-gray-900">{zona.serviciosActivos}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Choferes disponibles</span>
                    <span className="font-bold text-gray-900">{zona.choferesDisponibles}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="secondary" className="flex-1">
                    <Edit className="w-4 h-4 inline-block mr-1" />
                    Editar
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'precios' && (
        <div className="space-y-12">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Title variant="section-title">Matriz de Precios</Title>
              <Title variant="subtitle" className="hidden md:block">Precios base por ruta y tipo de servicio</Title>
            </div>
            <Button variant="primary" onClick={() => setIsAddPrecioModalOpen(true)}>
              <Plus className="w-4 h-4 inline-block mr-2" />
              <span className="md:hidden">Nuevo</span>
              <span className="hidden md:inline">Nuevo Precio</span>
            </Button>
          </div>

          {/* Tabla Desktop */}
          <div className="hidden md:block overflow-x-auto rounded-3xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-700">Origen</th>
                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-700">Destino</th>
                  <th className="text-left py-5 px-6 text-sm font-bold text-gray-700">Tipo</th>
                  <th className="text-right py-5 px-6 text-sm font-bold text-gray-700">Precio Base</th>
                  <th className="text-center py-5 px-6 text-sm font-bold text-gray-700">Distancia</th>
                  <th className="text-right py-5 px-6 text-sm font-bold text-gray-700">$/km Adicional</th>
                  <th className="text-center py-5 px-6 text-sm font-bold text-gray-700">Estado</th>
                  <th className="text-center py-5 px-6 text-sm font-bold text-gray-700">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {preciosMock.map((precio) => (
                  <tr key={precio.id} className="border-t border-gray-100 hover:bg-gray-50">
                    <td className="py-5 px-6 font-semibold text-gray-900">{precio.zonaOrigen}</td>
                    <td className="py-5 px-6 font-semibold text-gray-900">{precio.zonaDestino}</td>
                    <td className="py-5 px-6">
                      <Badge variant="secondary" size="sm" className="capitalize">
                        {precio.tipoServicio}
                      </Badge>
                    </td>
                    <td className="py-5 px-6 text-right font-black text-gray-900">
                      ${precio.precioBase}
                    </td>
                    <td className="py-5 px-6 text-center text-gray-600">
                      {precio.distanciaBase} km
                    </td>
                    <td className="py-5 px-6 text-right font-bold text-gray-900">
                      ${precio.precioKmAdicional}/km
                    </td>
                    <td className="py-5 px-6 text-center">
                      <Badge
                        variant={precio.activo ? 'secondary' : 'neutral'}
                        size="sm"
                      >
                        {precio.activo ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-600 hover:bg-gray-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Cards Mobile */}
          <div className="md:hidden space-y-4">
            {preciosMock.map((precio) => (
              <Card key={precio.id} padding="lg" className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" size="sm" className="capitalize">
                        {precio.tipoServicio}
                      </Badge>
                      <Badge
                        variant={precio.activo ? 'secondary' : 'neutral'}
                        size="sm"
                      >
                        {precio.activo ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ruta</p>
                      <p className="font-bold text-gray-900">
                        {precio.zonaOrigen} → {precio.zonaDestino}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-black text-gray-900">
                      ${precio.precioBase}
                    </p>
                    <p className="text-xs text-gray-500">Precio base</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Distancia base</p>
                    <p className="font-bold text-gray-900">{precio.distanciaBase} km</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Km adicional</p>
                    <p className="font-bold text-gray-900">${precio.precioKmAdicional}/km</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="secondary" className="flex-1">
                    <Edit className="w-4 h-4 mr-1" />
                    Editar
                  </Button>
                  <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <div className="p-8 bg-gray-50 rounded-3xl border border-gray-200">
            <h4 className="text-xl font-black text-gray-900 mb-4">💡 Ejemplo de Cálculo</h4>
            <div className="space-y-2 text-gray-700">
              <p><strong>Ruta:</strong> Cuernavaca Centro → Jiutepec (12 km)</p>
              <p><strong>Tipo:</strong> Flete</p>
              <div className="mt-4 pt-4 border-t border-gray-300 space-y-2">
                <p className="font-bold">Cálculo:</p>
                <ul className="space-y-1 ml-6">
                  <li>• Precio base: $350 (hasta 10 km)</li>
                  <li>• Km adicionales: 12 - 10 = 2 km</li>
                  <li>• Costo adicional: 2 km × $15 = $30</li>
                  <li className="font-black text-yellow-600 text-lg pt-2">→ Precio total: $380</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal para nueva zona */}
      <ResponsiveDialog
        open={isAddZonaModalOpen}
        onClose={() => setIsAddZonaModalOpen(false)}
        title="Nueva Zona"
        description="Funcionalidad en desarrollo"
        size="md"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="primary" onClick={() => setIsAddZonaModalOpen(false)}>
              Entendido
            </Button>
          </div>
        }
      >
        <div className="text-center py-8">
          <p className="text-gray-600">
            La gestión de zonas estará disponible próximamente.
          </p>
        </div>
      </ResponsiveDialog>

      {/* Modal para nuevo precio */}
      <ResponsiveDialog
        open={isAddPrecioModalOpen}
        onClose={() => setIsAddPrecioModalOpen(false)}
        title="Nuevo Precio"
        description="Funcionalidad en desarrollo"
        size="md"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="primary" onClick={() => setIsAddPrecioModalOpen(false)}>
              Entendido
            </Button>
          </div>
        }
      >
        <div className="text-center py-8">
          <p className="text-gray-600">
            La gestión de precios estará disponible próximamente.
          </p>
        </div>
      </ResponsiveDialog>
    </div>
  );
};

export default Zonas;
