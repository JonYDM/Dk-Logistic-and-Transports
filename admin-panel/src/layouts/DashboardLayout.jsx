import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Truck,
  Map,
  DollarSign,
  Settings,
  BarChart3,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { Button } from '@/shared/components';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: LayoutDashboard, label: 'Panel' },
    { path: '/clientes', icon: Users, label: 'Clientes' },
    { path: '/choferes', icon: Truck, label: 'Choferes' },
    { path: '/servicios', icon: Map, label: 'Servicios' },
    { path: '/zonas', icon: DollarSign, label: 'Zonas y Precios' },
    { path: '/reportes', icon: BarChart3, label: 'Reportes' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Sidebar Desktop - Minimalista */}
      <aside className="hidden md:block fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200 z-40">
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="h-20 px-8 flex items-center border-b border-gray-200">
            <div className="flex items-center gap-3">
              <img
                src="/DK.png"
                alt="DK Logística"
                className="h-12 w-auto object-contain"
              />
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Rol
                </p>
                <p className="text-sm font-bold text-gray-900">
                  Administrador
                </p>
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                    active
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info */}
          <div className="p-6 border-t border-gray-200 space-y-3">
            <div className="px-4 py-2">
              <p className="text-sm font-semibold text-gray-900">
                Eduardo
              </p>
              <p className="text-xs text-gray-500">
                eduardo@dklogistica.com
              </p>
            </div>
            <Button
              variant="logout"
              className="w-full flex items-center justify-center gap-2"
              onClick={() => console.log('Cerrar sesión')}
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </aside>

      {/* Sidebar Mobile - Full Screen Overlay */}
      {sidebarOpen && (
        <aside className="md:hidden fixed inset-0 z-50 bg-white">
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="h-20 px-6 flex items-center justify-between border-b border-gray-200">
              <div className="flex items-center gap-3">
                <img
                  src="/DK.png"
                  alt="DK Logística"
                  className="h-12 w-auto object-contain"
                />
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Rol
                  </p>
                  <p className="text-sm font-bold text-gray-900">
                    Administrador
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-2xl hover:bg-gray-100 text-gray-600 transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl transition-all ${
                      active
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="font-medium text-lg">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Info */}
            <div className="p-6 border-t border-gray-200 space-y-4">
              <div className="px-6 py-2">
                <p className="text-sm font-semibold text-gray-900">
                  Eduardo
                </p>
                <p className="text-xs text-gray-500">
                  eduardo@dklogistica.com
                </p>
              </div>
              <Button
                variant="logout"
                className="w-full flex items-center justify-center gap-2"
                size="lg"
                onClick={() => console.log('Cerrar sesión')}
              >
                <LogOut className="w-5 h-5" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </aside>
      )}

      {/* Main Content */}
      <div className="md:ml-72 transition-all duration-300">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-20 px-6 lg:px-12">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-3 rounded-2xl hover:bg-gray-100 text-gray-600 transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Spacer en desktop */}
            <div className="hidden md:block"></div>

            <div className="flex items-center">
              <h2 className="text-lg font-black text-gray-900">
                DK Logística y Transportes
              </h2>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>

      {/* Mobile overlay backdrop */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
