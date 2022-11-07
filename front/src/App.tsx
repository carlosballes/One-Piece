import React from 'react';
import PantallaPrincipal from './componentes/PantallaPrincipal/PantallaPrincipal';
import PantallaLogin from './componentes/PantallaLogin/PantallaLogin';

import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<PantallaPrincipal/>} />
        <Route path="/login" element={<PantallaLogin/>} />
      </Routes>
    </div>
  );
};

export default App;