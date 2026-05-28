import { BrowserRouter, Routes, Route } from "react-router-dom";
import {MainLayout} from "../layouts";
import { Dashboard, Login, Citas, Contacto, Odontologos, Pacientes, Servicios, Registro} from "../pages"

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas (Sin Navbar/Footer) */}
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas Protegidas (Dentro del Layout con Navbar y Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/odontologos" element={<Odontologos />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter