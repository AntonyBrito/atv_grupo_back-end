import { Link } from 'react-router-dom';

function Inicial() {
  return (
    <div>
      <h1>Bem-vindo ao Site</h1>
      <p>Aperte algum botão abaixo para consultar, adicionar, modificar ou remover algo:</p>
      <div className="menu">
        <Link to="/aluno"><button>Alunos</button></Link>
        <Link to="/professor"><button>Professores</button></Link>
        <Link to="/turma"><button>Turmas</button></Link>
      </div>
    </div>
  );
}

export default Inicial;