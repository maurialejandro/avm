import * as React from "react";
import { Login } from "./views/Login";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {AdminsRoutes} from "./context/routes/AdminsRoutes";
import {ClientRoutes} from "./context/routes/ClientRoutes";
import NotFound from "./views/NotFound";
import {SupervisorRoutes} from "./context/routes/SupervisorRoutes";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />}/>
          </Routes>
          <AdminsRoutes />
          <ClientRoutes />
          <SupervisorRoutes />
      </BrowserRouter>
  );
}
export default App;
