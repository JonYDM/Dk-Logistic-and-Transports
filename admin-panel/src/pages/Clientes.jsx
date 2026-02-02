import { useState } from 'react';
import {
  Search,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  User,
  Clock,
} from 'lucide-react';
import { serviciosMock } from '../data/mockData';
import { Title, Button, Badge, SearchBar, ResponsiveDialog, PhoneInput } from '@/shared/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock data de clientes
const clientesMock = [
  {
    id: 1,
    nombre: 'Ana',
    apellidos: 'Martínez López',
    telefono: '+52777 123 4567',
    email: 'ana.martinez@email.com',
    direccion: 'Calle Principal 123, Cuernavaca',
    totalServicios: 12,
    fechaRegistro: '2024-01-15',
    activo: true,
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellidos: 'Rodríguez García',
    telefono: '+52777 234 5678',
    email: 'carlos.rodriguez@email.com',
    direccion: 'Av. Morelos 456, Jiutepec',
    totalServicios: 8,
    fechaRegistro: '2024-02-10',
    activo: true,
  },
  {
    id: 3,
    nombre: 'María',
    apellidos: 'Hernández Pérez',
    telefono: '+52777 345 6789',
    email: 'maria.hernandez@email.com',
    direccion: 'Col. Centro 789, Temixco',
    totalServicios: 15,
    fechaRegistro: '2023-12-05',
    activo: true,
  },
  {
    id: 4,
    nombre: 'José',
    apellidos: 'Sánchez Ramírez',
    telefono: '+52777 456 7890',
    email: 'jose.sanchez@email.com',
    direccion: 'Lomas de Tzompantle 234, Cuernavaca',
    totalServicios: 5,
    fechaRegistro: '2024-03-20',
    activo: false,
  },
  {
    id: 5,
    nombre: 'Laura',
    apellidos: 'González Torres',
    telefono: '+52777 567 8901',
    email: 'laura.gonzalez@email.com',
    direccion: 'Fraccionamiento del Bosque 567, Xochitepec',
    totalServicios: 20,
    fechaRegistro: '2023-11-01',
    activo: true,
  },
];

const Clientes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActivo, setFilterActivo] = useState('todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isServiciosModalOpen, setIsServiciosModalOpen] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [serviciosSearchTerm, setServiciosSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: '',
  });
  const [editFormData, setEditFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    direccion: '',
  });

  const clientesFiltrados = clientesMock.filter((cliente) => {
    const matchSearch =
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.includes(searchTerm) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchActivo =
      filterActivo === 'todos' ||
      (filterActivo === 'activo' && cliente.activo) ||
      (filterActivo === 'inactivo' && !cliente.activo);

    return matchSearch && matchActivo;
  });

  // Filtrar servicios del cliente seleccionado
  const serviciosCliente = selectedCliente
    ? serviciosMock.filter((servicio) => {
        const matchCliente = servicio.cliente.id === selectedCliente.id;
        const matchSearch =
          servicio.folio.toLowerCase().includes(serviciosSearchTerm.toLowerCase()) ||
          (servicio.chofer && servicio.chofer.nombre.toLowerCase().includes(serviciosSearchTerm.toLowerCase()));
        return matchCliente && matchSearch;
      })
    : [];

  const estadosLabels = {
    solicitado: 'Solicitado',
    asignado: 'Asignado',
    en_transito: 'En Tránsito',
    completado: 'Completado',
    cancelado: 'Cancelado',
  };

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
          <Title variant="page-title">Clientes</Title>
          <Title variant="subtitle">
            Gestión de clientes registrados en la plataforma
          </Title>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          + Agregar Cliente
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col lg:flex-row gap-4 py-8">
        {/* Búsqueda */}
        <SearchBar
          placeholder="Buscar por nombre, teléfono, email..."
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {/* Filter Activo */}
        <Select value={filterActivo} onValueChange={setFilterActivo}>
          <SelectTrigger className="w-[200px] bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-full px-6 py-4 font-medium text-gray-700">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="activo">Activos</SelectItem>
            <SelectItem value="inactivo">Inactivos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Clientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clientesFiltrados.map((cliente) => (
          <div
            key={cliente.id}
            className="group p-8 lg:p-10 hover:bg-white/80 rounded-3xl transition-all duration-300 border border-gray-100 hover:shadow-xl cursor-pointer"
          >
            <div className="flex flex-col gap-6">
              {/* Info Básica */}
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-2xl font-black text-gray-900">
                      {cliente.nombre} {cliente.apellidos}
                    </h3>
                    <Badge
                      variant={cliente.activo ? 'secondary' : 'neutral'}
                      size="sm"
                    >
                      {cliente.activo ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    <span className="font-medium">{cliente.telefono}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    <span className="font-medium">{cliente.email}</span>
                  </div>
                </div>

                {cliente.direccion && (
                  <div className="flex items-start gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="font-medium">{cliente.direccion}</span>
                  </div>
                )}
              </div>

              {/* Acciones */}
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => {
                    setSelectedCliente(cliente);
                    setEditFormData({
                      nombre: cliente.nombre,
                      apellidos: cliente.apellidos,
                      telefono: cliente.telefono,
                      email: cliente.email,
                      direccion: cliente.direccion,
                    });
                    setIsEditModalOpen(true);
                  }}
                >
                  Editar
                </Button>
                <Button
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setSelectedCliente(cliente);
                    setIsServiciosModalOpen(true);
                    setServiciosSearchTerm('');
                  }}
                >
                  Servicios
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {clientesFiltrados.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No se encontraron clientes
          </h3>
          <p className="text-gray-600 font-light">
            Intenta cambiar los filtros de búsqueda
          </p>
        </div>
      )}

      {/* Modal/Drawer para agregar cliente */}
      <ResponsiveDialog
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Agregar Nuevo Cliente"
        description="Completa los datos del cliente para registrarlo en la plataforma"
        size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                console.log('Datos del cliente:', formData);
                alert('Cliente agregado exitosamente');
                setIsAddModalOpen(false);
                setFormData({
                  nombre: '',
                  apellidos: '',
                  telefono: '',
                  email: '',
                  direccion: '',
                });
              }}
            >
              Guardar Cliente
            </Button>
          </div>
        }
      >
        <form className="space-y-6">
          <div className="space-y-4">
            <Title variant="h5" className="text-gray-900">
              Información del Cliente
            </Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="Ana"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Apellidos *
                </label>
                <input
                  type="text"
                  required
                  value={formData.apellidos}
                  onChange={(e) => setFormData({ ...formData, apellidos: e.target.value })}
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="Martínez López"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Teléfono *
              </label>
              <PhoneInput
                value={formData.telefono}
                onChange={(value) => setFormData({ ...formData, telefono: value })}
                placeholder="777 123 4567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                placeholder="cliente@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={formData.direccion}
                onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                placeholder="Calle Principal 123, Colonia Centro"
              />
            </div>
          </div>
        </form>
      </ResponsiveDialog>

      {/* Modal/Drawer para editar cliente */}
      <ResponsiveDialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Cliente"
        description="Modifica los datos del cliente"
        size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                console.log('Datos actualizados del cliente:', editFormData);
                alert('Cliente actualizado exitosamente (Prototipo)');
                setIsEditModalOpen(false);
              }}
            >
              Guardar Cambios
            </Button>
          </div>
        }
      >
        <form className="space-y-6">
          <div className="space-y-4">
            <Title variant="h5" className="text-gray-900">
              Información del Cliente
            </Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.nombre}
                  onChange={(e) => setEditFormData({ ...editFormData, nombre: e.target.value })}
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="Ana"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Apellidos *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.apellidos}
                  onChange={(e) => setEditFormData({ ...editFormData, apellidos: e.target.value })}
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="Martínez López"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Teléfono *
              </label>
              <PhoneInput
                value={editFormData.telefono}
                onChange={(value) => setEditFormData({ ...editFormData, telefono: value })}
                placeholder="777 123 4567"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Correo Electrónico *
              </label>
              <input
                type="email"
                required
                value={editFormData.email}
                onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                placeholder="cliente@ejemplo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Dirección
              </label>
              <input
                type="text"
                value={editFormData.direccion}
                onChange={(e) => setEditFormData({ ...editFormData, direccion: e.target.value })}
                className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                placeholder="Calle Principal 123, Colonia Centro"
              />
            </div>
          </div>
        </form>
      </ResponsiveDialog>

      {/* Modal/Drawer de Servicios */}
      <ResponsiveDialog
        open={isServiciosModalOpen}
        onClose={() => {
          setIsServiciosModalOpen(false);
          setSelectedCliente(null);
          setServiciosSearchTerm('');
        }}
        title={selectedCliente ? `Servicios de ${selectedCliente.nombre} ${selectedCliente.apellidos}` : 'Servicios'}
        description="Servicios solicitados por el cliente"
        size="lg"
      >
        <div className="space-y-6">
          {/* Buscador */}
          <SearchBar
            placeholder="Buscar por folio o chofer..."
            value={serviciosSearchTerm}
            onChange={setServiciosSearchTerm}
          />

          {/* Lista de Servicios */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {serviciosCliente.length > 0 ? (
              serviciosCliente.map((servicio) => (
                <div
                  key={servicio.id}
                  className="p-6 bg-gray-50 rounded-2xl space-y-4 hover:bg-gray-100 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h4 className="text-lg font-black text-gray-900">
                          {servicio.folio}
                        </h4>
                        <Badge variant="secondary" size="sm">
                          {servicio.tipo}
                        </Badge>
                        <Badge variant={servicio.estado} size="sm">
                          {estadosLabels[servicio.estado]}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{formatDate(servicio.fechaSolicitud)}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-black text-gray-900">
                        ${servicio.precioTotal}
                      </p>
                    </div>
                  </div>

                  {/* Ruta */}
                  <div className="flex items-start gap-4 pl-4">
                    <div className="flex flex-col items-center pt-1">
                      <div className="w-3 h-3 bg-yellow-600 rounded-full"></div>
                      <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
                      <div className="w-3 h-3 bg-gray-900 rounded-full"></div>
                    </div>

                    <div className="flex-1 space-y-3">
                      <div>
                        <p className="text-xs font-bold text-yellow-600 uppercase tracking-wider">
                          Origen
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {servicio.origen.direccion}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-bold text-gray-900 uppercase tracking-wider">
                          Destino
                        </p>
                        <p className="text-sm font-bold text-gray-900">
                          {servicio.destino.direccion}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Chofer */}
                  <div className="flex items-center gap-2 text-sm pt-2 border-t border-gray-200">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Chofer:</span>
                    <span className="font-bold text-gray-900">
                      {servicio.chofer
                        ? `${servicio.chofer.nombre} ${servicio.chofer.apellidos}`
                        : 'Sin asignar'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-600 font-medium">
                  No se encontraron servicios
                </p>
              </div>
            )}
          </div>
        </div>
      </ResponsiveDialog>
    </div>
  );
};

export default Clientes;
