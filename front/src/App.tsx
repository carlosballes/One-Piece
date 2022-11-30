import React from 'react';
import PantallaPrincipal from './componentes/PantallaPrincipal/PantallaPrincipal';
import PantallaLogin from './componentes/PantallaLogin/PantallaLogin';
import PantallaRegistro from './componentes/PantallaRegistro/PantallaRegistro';
import PantallaRecuperarPassword from './componentes/PantallaRecuperarPassword/PantallaRecuperarPassword';
import PantallaCheckCode from './componentes/PantallaCheckCode/PantallaCheckCode';

import { Route, Routes } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PantallaPrincipal/>} />
        <Route path="/login" element={<PantallaLogin/>} />
        <Route path="/register" element={<PantallaRegistro/>} />
        <Route path="/checkcode/:id" element={<PantallaCheckCode/>} />
        <Route path="/forgotPassword" element={<PantallaRecuperarPassword/>} />    
      </Routes>
    </div>
  );
};

export default App;