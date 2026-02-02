import { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Star,
  MapPin,
  Phone,
  Mail,
  Truck,
  DollarSign,
  TrendingUp,
  Clock,
  User,
} from 'lucide-react';
import { choferesMock, serviciosMock } from '../data/mockData';
import { Title, Button, Badge, SearchBar, ResponsiveDialog, PhoneInput } from '@/shared/components';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Choferes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterVerificado, setFilterVerificado] = useState('todos');
  const [filterDisponible, setFilterDisponible] = useState('todos');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isHistorialModalOpen, setIsHistorialModalOpen] = useState(false);
  const [selectedChofer, setSelectedChofer] = useState(null);
  const [historialSearchTerm, setHistorialSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    vehiculo: {
      marca: '',
      modelo: '',
      año: '',
      placas: '',
      capacidad: '',
    },
  });
  const [editFormData, setEditFormData] = useState({
    nombre: '',
    apellidos: '',
    telefono: '',
    email: '',
    vehiculo: {
      marca: '',
      modelo: '',
      año: '',
      placas: '',
      capacidad: '',
    },
  });

  const choferesFiltrados = choferesMock.filter((chofer) => {
    const matchSearch =
      chofer.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chofer.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chofer.telefono.includes(searchTerm);

    const matchVerificado =
      filterVerificado === 'todos' ||
      (filterVerificado === 'verificado' && chofer.verificado) ||
      (filterVerificado === 'pendiente' && !chofer.verificado);

    const matchDisponible =
      filterDisponible === 'todos' ||
      (filterDisponible === 'disponible' && chofer.disponible) ||
      (filterDisponible === 'ocupado' && !chofer.disponible);

    return matchSearch && matchVerificado && matchDisponible;
  });

  // Filtrar servicios del chofer seleccionado
  const serviciosChofer = selectedChofer
    ? serviciosMock.filter((servicio) => {
        const matchChofer = servicio.chofer?.id === selectedChofer.id;
        const matchSearch =
          servicio.folio.toLowerCase().includes(historialSearchTerm.toLowerCase()) ||
          servicio.cliente.nombre.toLowerCase().includes(historialSearchTerm.toLowerCase());
        return matchChofer && matchSearch;
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
          <Title variant="page-title">Choferes</Title>
          <Title variant="subtitle">
            Gestión de choferes registrados en la plataforma
          </Title>
        </div>
        <Button variant="primary" onClick={() => setIsAddModalOpen(true)}>
          + Agregar Chofer
        </Button>
      </div>

      {/* Filtros */}
      <div className="flex flex-col lg:flex-row gap-4 py-8">
        {/* Búsqueda */}
        <SearchBar
          placeholder="Buscar por nombre, teléfono..."
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {/* Filter Verificado */}
        <Select value={filterVerificado} onValueChange={setFilterVerificado}>
          <SelectTrigger className="w-[200px] bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-full px-6 py-4 font-medium text-gray-700">
            <SelectValue placeholder="Estado de verificación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="verificado">Verificados</SelectItem>
            <SelectItem value="pendiente">Pendientes</SelectItem>
          </SelectContent>
        </Select>

        {/* Filter Disponible */}
        <Select value={filterDisponible} onValueChange={setFilterDisponible}>
          <SelectTrigger className="w-[220px] bg-white/80 backdrop-blur-sm border-gray-200/50 rounded-full px-6 py-4 font-medium text-gray-700">
            <SelectValue placeholder="Disponibilidad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todas las disponibilidades</SelectItem>
            <SelectItem value="disponible">Disponibles</SelectItem>
            <SelectItem value="ocupado">Ocupados</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Choferes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {choferesFiltrados.map((chofer) => (
          <div
            key={chofer.id}
            className="group p-8 lg:p-10 hover:bg-white/80 rounded-3xl transition-all duration-300 border border-gray-100 hover:shadow-xl cursor-pointer"
          >
            <div className="flex flex-col gap-6">
              {/* Info Básica */}
              <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-2xl font-black text-gray-900">
                        {chofer.nombre} {chofer.apellidos}
                      </h3>
                      {chofer.verificado && (
                        <Badge variant="secondary" size="sm" className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Verificado
                        </Badge>
                      )}
                      <Badge
                        variant={chofer.disponible ? 'primary' : 'neutral'}
                        size="sm"
                      >
                        {chofer.disponible ? 'Disponible' : 'Ocupado'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span className="font-medium">{chofer.telefono}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span className="font-medium">{chofer.ubicacion.zona}</span>
                    </div>
                  </div>

                  {/* Vehículo */}
                  <div className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl">
                    <Truck className="w-5 h-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-bold text-gray-900">
                        {chofer.vehiculo.marca} {chofer.vehiculo.modelo}
                      </p>
                      <p className="text-xs text-gray-600">
                        {chofer.vehiculo.año} • {chofer.vehiculo.placas} • {chofer.vehiculo.capacidad}kg
                      </p>
                    </div>
                  </div>
                </div>

              {/* Estadísticas */}
              <div className="flex items-center gap-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <div>
                    <p className="text-xs text-gray-500">Calificación</p>
                    <p className="text-lg font-black text-gray-900">
                      {chofer.calificacion}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Servicios</p>
                    <p className="text-lg font-black text-gray-900">
                      {chofer.totalServicios}
                    </p>
                  </div>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-3">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => {
                    setSelectedChofer(chofer);
                    setEditFormData({
                      nombre: chofer.nombre,
                      apellidos: chofer.apellidos,
                      telefono: chofer.telefono,
                      email: chofer.email,
                      vehiculo: {
                        marca: chofer.vehiculo.marca,
                        modelo: chofer.vehiculo.modelo,
                        año: chofer.vehiculo.año,
                        placas: chofer.vehiculo.placas,
                        capacidad: chofer.vehiculo.capacidad,
                      },
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
                    setSelectedChofer(chofer);
                    setIsHistorialModalOpen(true);
                    setHistorialSearchTerm('');
                  }}
                >
                  Historial
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {choferesFiltrados.length === 0 && (
        <div className="text-center py-20">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <Search className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            No se encontraron choferes
          </h3>
          <p className="text-gray-600 font-light">
            Intenta cambiar los filtros de búsqueda
          </p>
        </div>
      )}

      {/* Modal/Drawer para agregar chofer */}
      <ResponsiveDialog
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Agregar Nuevo Chofer"
        description="Completa los datos del chofer para registrarlo en la plataforma"
        size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setIsAddModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                console.log('Datos del chofer:', formData);
                alert('Chofer agregado exitosamente');
                setIsAddModalOpen(false);
                setFormData({
                  nombre: '',
                  apellidos: '',
                  telefono: '',
                  email: '',
                  vehiculo: {
                    marca: '',
                    modelo: '',
                    año: '',
                    placas: '',
                    capacidad: '',
                  },
                });
              }}
            >
              Guardar Chofer
            </Button>
          </div>
        }
      >
        <form className="space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <Title variant="h5" className="text-gray-900">
              Información Personal
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
                  placeholder="Juan"
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
                  placeholder="Pérez García"
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
                placeholder="chofer@ejemplo.com"
              />
            </div>
          </div>

          {/* Información del Vehículo */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <Title variant="h5" className="text-gray-900">
              Información del Vehículo
            </Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Marca *
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehiculo.marca}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehiculo: { ...formData.vehiculo, marca: e.target.value },
                    })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="Nissan"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Modelo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehiculo.modelo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehiculo: { ...formData.vehiculo, modelo: e.target.value },
                    })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="NP300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Año *
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehiculo.año}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehiculo: { ...formData.vehiculo, año: e.target.value },
                    })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="2023"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Placas *
                </label>
                <input
                  type="text"
                  required
                  value={formData.vehiculo.placas}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehiculo: { ...formData.vehiculo, placas: e.target.value },
                    })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="ABC-123-D"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Capacidad de Carga (kg) *
                </label>
                <input
                  type="number"
                  required
                  value={formData.vehiculo.capacidad}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      vehiculo: { ...formData.vehiculo, capacidad: e.target.value },
                    })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>
        </form>
      </ResponsiveDialog>

      {/* Modal/Drawer para editar chofer */}
      <ResponsiveDialog
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Editar Chofer"
        description="Modifica los datos del chofer"
        size="lg"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                console.log('Datos actualizados del chofer:', editFormData);
                alert('Chofer actualizado exitosamente (Prototipo)');
                setIsEditModalOpen(false);
              }}
            >
              Guardar Cambios
            </Button>
          </div>
        }
      >
        <form className="space-y-6">
          {/* Información Personal */}
          <div className="space-y-4">
            <Title variant="h5" className="text-gray-900">
              Información Personal
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
                  placeholder="Juan"
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
                  placeholder="Pérez García"
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
                placeholder="chofer@ejemplo.com"
              />
            </div>
          </div>

          {/* Información del Vehículo */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <Title variant="h5" className="text-gray-900">
              Información del Vehículo
            </Title>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Marca *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.vehiculo.marca}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      vehiculo: { ...editFormData.vehiculo, marca: e.target.value },
                    })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="Nissan"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Modelo *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.vehiculo.modelo}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      vehiculo: { ...editFormData.vehiculo, modelo: e.target.value },
                    })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="NP300"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Año *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.vehiculo.año}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      vehiculo: { ...editFormData.vehiculo, año: e.target.value },
                    })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="2023"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Placas *
                </label>
                <input
                  type="text"
                  required
                  value={editFormData.vehiculo.placas}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      vehiculo: { ...editFormData.vehiculo, placas: e.target.value },
                    })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="ABC-123-D"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Capacidad de Carga (kg) *
                </label>
                <input
                  type="number"
                  required
                  value={editFormData.vehiculo.capacidad}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      vehiculo: { ...editFormData.vehiculo, capacidad: e.target.value },
                    })
                  }
                  className="w-full px-6 py-4 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-semibold text-gray-900"
                  placeholder="1000"
                />
              </div>
            </div>
          </div>
        </form>
      </ResponsiveDialog>

      {/* Modal/Drawer de Historial */}
      <ResponsiveDialog
        open={isHistorialModalOpen}
        onClose={() => {
          setIsHistorialModalOpen(false);
          setSelectedChofer(null);
          setHistorialSearchTerm('');
        }}
        title={selectedChofer ? `Historial de ${selectedChofer.nombre} ${selectedChofer.apellidos}` : 'Historial'}
        description="Servicios realizados por el chofer"
        size="lg"
      >
        <div className="space-y-6">
          {/* Buscador */}
          <SearchBar
            placeholder="Buscar por folio o cliente..."
            value={historialSearchTerm}
            onChange={setHistorialSearchTerm}
          />

          {/* Lista de Servicios */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {serviciosChofer.length > 0 ? (
              serviciosChofer.map((servicio) => (
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

                  {/* Cliente */}
                  <div className="flex items-center gap-2 text-sm pt-2 border-t border-gray-200">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">Cliente:</span>
                    <span className="font-bold text-gray-900">
                      {servicio.cliente.nombre}
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

export default Choferes;
