import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Adicionando o Link
import Materials from './pages/Materials';
import Suppliers from './pages/Suppliers';
import MaterialDetails from './pages/MaterialDetails';
import MaterialEdit from './pages/MaterialEdit';

const App = () => {
  return (
    <Router>
      <div className="App">
        <h1>Welcome to the Application</h1>
        
        {/* Definindo as rotas */}
        <Routes>
          <Route path="/" element={<h2>Home Page</h2>} /> {/* Rota para a home page */}
          <Route path="/materials" element={<Materials />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/materials/:id" element={<MaterialDetails />} /> 
          <Route path="/materials/edit/:id" element={<MaterialEdit />} />
        </Routes>

        <nav>
          <ul>
            <li><Link to="/materials">Materials</Link></li> {/* Link para materials */}
            <li><Link to="/suppliers">Suppliers</Link></li> {/* Link para suppliers */}
          </ul>
        </nav>
      </div>
    </Router>
  );
}

export default App;
