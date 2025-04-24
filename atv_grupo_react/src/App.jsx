import { Routes, Route } from 'react-router-dom';
import Inicial from './pages/aluno_page.jsx';
import Aluno from './pages/aluno_page.jsx';
import Professor from './pages/professor_page.jsx';
import Turma from './pages/turma_page.jsx';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Inicial />} />
        <Route path="/aluno" element={<Aluno />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/turma" element={<Turma />} />
      </Routes>
    </div>
  );
}

export default App;