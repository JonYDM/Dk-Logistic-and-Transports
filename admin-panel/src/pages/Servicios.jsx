import { useState } from 'react';
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  User,
  Navigation,
  Download,
  Phone,
} from 'lucide-react';
import { serviciosMock } from '../data/mockData';
import { Title, Button, Badge, SearchBar, ResponsiveDialog } from '@/shared/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Servicios = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterEstado, setFilterEstado] = useState('todos');
  const [filterTipo, setFilterTipo] = useState('todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const estadosLabels = {
    solicitado: 'Solicitado',
    asignado: 'Asignado',
    en_transito: 'En Tránsito',
    completado: 'Completado',
    cancelado: 'Cancelado',
  };

  const serviciosFiltrados = serviciosMock.filter((servicio) => {
    const matchSearch =
      servicio.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      servicio.cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (servicio.chofer && servicio.chofer.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchEstado =
      filterEstado === 'todos' || servicio.estado === filterEstado;

    const matchTipo = filterTipo === 'todos' || servicio.tipo === filterTipo;

    return matchSearch && matchEstado && matchTipo;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-MX', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-16 py-12 px-6 lg:px-12 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3">
          <Title variant="page-title">Servicios</Title>
          <Title variant="subtitle">
            Gestión de servicios y viajes de la plataforma
          </Title>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">
            <Download className="w-4 h-4 inline-block mr-2" />
            Exportar
          </Button>
          <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
            Nuevo Servicio
          </Button>
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-col lg:flex-row gap-4 py-8">
        {/* Búsqueda */}
        <SearchBar
          placeholder="Buscar por folio, cliente, chofer..."
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {/* Filter Estado */}
        <Select value={filterEstado} onValueChange={setFilterEstado}>
          <SelectTrigger className="w-[200px] bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-full px-6 py-4 font-medium text-gray-700">
            <SelectValue placeholder="Todos los estados" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="solicitado">Solicitado</SelectItem>
            <SelectItem value="asignado">Asignado</SelectItem>
            <SelectItem value="en_transito">En Tránsito</SelectItem>
            <SelectItem value="completado">Completado</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter Tipo */}
        <Select value={filterTipo} onValueChange={setFilterTipo}>
          <SelectTrigger className="w-[180px] bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-full px-6 py-4 font-medium text-gray-700">
            <SelectValue placeholder="Todos los tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los tipos</SelectItem>
            <SelectItem value="flete">Flete</SelectItem>
            <SelectItem value="mudanza">Mudanza</SelectItem>
            <SelectItem value="paqueteria">Paquetería</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Servicios */}
      <div className="space-y-6">
        {serviciosFiltrados.map((servicio) => (
          <div
            key={servicio.id}
            className="group p-8 lg:p-10 hover:bg-white/80 rounded-3xl transition-all duration-300 border-b border-gray-100 last:border-0 hover:shadow-xl cursor-pointer"
          >
            <div className="space-y-6">
              {/* Header del Servicio */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-2xl font-black text-gray-900">
                      {servicio.folio}
                    </h3>
                    <Badge variant="secondary" size="sm">
                      {servicio.tipo}
                    </Badge>
                    <Badge variant={servicio.estado} size="sm">
                      {estadosLabels[servicio.estado]}
                    </Badge>
                    {servicio.requiereAyudantes && (
                      <Badge variant="neutral" size="sm">
                        {servicio.numeroAyudantes} ayudantes
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{formatDate(servicio.fechaSolicitud)}</span>
                  </div>
                </div>

                <div className="text-left lg:text-right">
                  <p className="text-4xl font-black text-gray-900">
                    ${servicio.precioTotal}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Comisión: ${servicio.comisionPlataforma}
                  </p>
                </div>
              </div>

              {/* Ruta */}
              <div className="bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-2xl p-6">
                <div className="flex items-start gap-6">
                  <div className="flex flex-col items-center pt-1">
                    <div className="w-4 h-4 bg-yellow-600 rounded-full"></div>
                    <div className="w-0.5 h-16 bg-gray-300 my-2"></div>
                    <div className="w-4 h-4 bg-gray-900 rounded-full"></div>
                  </div>

                  <div className="flex-1 space-y-6">
                    <div>
                      <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider mb-1">
                        Origen
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        {servicio.origen.direccion}
                      </p>
                      <p className="text-sm text-gray-600">
                        {servicio.origen.zona}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">
                        Destino
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        {servicio.destino.direccion}
                      </p>
                      <p className="text-sm text-gray-600">
                        {servicio.destino.zona}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Participantes y Acciones */}
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                  {/* Cliente */}
                  <div className="bg-white/50 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider">
                          Cliente
                        </p>
                      </div>
                    </div>
                    <p className="text-lg font-black text-gray-900">
                      {servicio.cliente.nombre}
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span className="font-medium">{servicio.cliente.telefono}</span>
                      </div>
                    </div>
                  </div>

                  {/* Chofer */}
                  <div className="bg-white/50 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                          Chofer
                        </p>
                      </div>
                    </div>
                    {servicio.chofer ? (
                      <>
                        <p className="text-lg font-black text-gray-900">
                          {servicio.chofer.nombre} {servicio.chofer.apellidos}
                        </p>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span className="font-medium">{servicio.chofer.telefono}</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-base font-medium text-gray-500">
                        Sin asignar
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="primary">
                    Ver Detalles
                  </Button>
                  {servicio.estado === 'en_transito' && (
                    <Button variant="secondary" className="flex items-center gap-2">
                      <Navigation className="w-4 h-4" />
                      Tracking
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {serviciosFiltrados.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No se encontraron servicios
          </h3>
          <p className="text-gray-600 font-light">
            Intenta cambiar los filtros de búsqueda
          </p>
        </div>
      )}

      {/* Modal para nuevo servicio */}
      <ResponsiveDialog
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Nuevo Servicio"
        description="Esta funcionalidad estará disponible próximamente"
        size="md"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="primary" onClick={() => setIsAddModalOpen(false)}>
              Entendido
            </Button>
          </div>
        }
      >
        <div className="text-center py-8">
          <p className="text-gray-600">
            La creación de servicios se realizará desde la aplicación móvil del cliente.
          </p>
        </div>
      </ResponsiveDialog>
    </div>
  );
};

export default Servicios;
