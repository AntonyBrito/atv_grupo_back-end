import { Link } from 'react-router-dom';
import { useAlunos } from '../service/aluno_service';
import AlunoForm from '../components/aluno/aluno_form';
import AlunoList from '../components/aluno/aluno_list';
import BuscarAluno from '../components/aluno/buscar_aluno';

const AlunosPage = () => {
  const {
    alunos, form, buscaId, loading, error,
    setForm, setBuscaId, buscarAluno, salvarAluno, deletarAluno
  } = useAlunos();

  return (
    <div className="alunos-container">
      <div className="navigation-buttons">
        <Link to="/">
          <button className="back-button">Voltar</button>
        </Link>
      </div>

      <h1 className="alunos-title">Gerenciamento de Alunos</h1>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-indicator">Carregando...</div>}

      <form onSubmit={salvarAluno} className="alunos-form">
        <BuscarAluno 
          buscaId={buscaId}
          setBuscaId={setBuscaId}
          buscarAluno={buscarAluno}
          loading={loading}
        />
        <AlunoForm 
          form={form}
          setForm={setForm}
          salvarAluno={salvarAluno}
          loading={loading}
        />
      </form>

      <AlunoList 
        alunos={alunos}
        onEdit={setForm}
        onDelete={deletarAluno}
        loading={loading}
      />
    </div>
  );
};

export default AlunosPage;