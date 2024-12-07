import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Materials from './pages/Materials';
import Suppliers from './pages/Suppliers';
import MaterialDetails from './pages/MaterialDetails';
import MaterialEdit from './pages/MaterialEdit';
import MaterialCreate from './pages/MaterialCreate';
import SupplierCreate from './pages/SupplierCreate';
import SupplierEdit from './pages/SupplierEdit';
import SupplierDetails from './pages/SupplierDetails';
import Header from './components/Header';
import Home from './pages/Home';  // Importando o componente Home
import './App.css';  // Adicione seu CSS para estilização

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        
        {/* Definindo as rotas */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Rota para a Home Page */}
          <Route path="/materials" element={<Materials />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/materials/:id" element={<MaterialDetails />} /> 
          <Route path="/materials/edit/:id" element={<MaterialEdit />} />
          <Route path="/materials/create" element={<MaterialCreate />} />
          <Route path="/suppliers/create" element={<SupplierCreate />} />
          <Route path="/suppliers/edit/:id" element={<SupplierEdit />} />
          <Route path="/suppliers/:id" element={<SupplierDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
