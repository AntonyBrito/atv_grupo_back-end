import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/initial_page';
import AlunoPage from './pages/aluno_page';
import './App.css';

function App() {
  return (
    <div className="app-container">
      {/* Rotas */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aluno" element={<AlunoPage />} />
      </Routes>
    </div>
  );
}

export default App;