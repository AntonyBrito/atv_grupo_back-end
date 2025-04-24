import { Link } from 'react-router-dom';

function Professor() {
  return (
    <div>
      <h1>Professores</h1>
      {/* Sua lógica de professores aqui */}
      <Link to="/"><button>Voltar</button></Link>
    </div>
  );
}

export default Professor;