import { Link } from 'react-router-dom';

function Turma() {
  return (
    <div>
      <h1>Turmas</h1>
      {/* Sua lógica de turmas aqui */}
      <Link to="/"><button>Voltar</button></Link>
    </div>
  );
}

export default Turma;