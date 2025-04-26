import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/initial_page';
import AlunoPage from './pages/aluno_page';

function AppRoutes() {
  return (
    <Router>
      <Routes>a
        <Route path="/" element={<Home />} />
        <Route path='/aluno' element={<AlunoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default AppRoutes;