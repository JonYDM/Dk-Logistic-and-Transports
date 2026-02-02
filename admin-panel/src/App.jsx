import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import Choferes from './pages/Choferes';
import Servicios from './pages/Servicios';
import Zonas from './pages/Zonas';
import Reportes from './pages/Reportes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="choferes" element={<Choferes />} />
          <Route path="servicios" element={<Servicios />} />
          <Route path="zonas" element={<Zonas />} />
          <Route path="reportes" element={<Reportes />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
