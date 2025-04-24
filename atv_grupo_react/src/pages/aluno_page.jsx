import { useState, useEffect } from 'react';
import { alunoApi } from '../api/alunoApi';
import '../assets/styles/aluno_page.css';

const AlunosPage = () => {
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({ id: '', nome: '', cpf: '' });
  const [buscaId, setBuscaId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregarAlunos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await alunoApi.getAll();
      setAlunos(response);
    } catch (err) {
      setError('Erro ao carregar alunos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const buscarAluno = async () => {
    if (!buscaId) {
      setError('Digite um ID para buscar');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      const response = await alunoApi.getById(buscaId);
      setForm(response);
    } catch (err) {
      setError('Aluno não encontrado');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const salvarAluno = async (e) => {
    e.preventDefault();
    
    if (!form.nome || !form.cpf) {
      setError('Preencha todos os campos');
      return;
    }

    setLoading(true);
    setError('');
    try {
      if (form.id) {
        await alunoApi.update(form.id, form);
      } else {
        await alunoApi.create(form);
      }
      setForm({ id: '', nome: '', cpf: '' });
      setBuscaId('');
      await carregarAlunos();
    } catch (err) {
      setError('Erro ao salvar aluno');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletarAluno = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este aluno?')) {
      return;
    }

    setLoading(true);
    setError('');
    try {
      await alunoApi.delete(id);
      await carregarAlunos();
    } catch (err) {
      setError('Erro ao excluir aluno');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => { 
    carregarAlunos(); 
  }, []);

  return (
    <div className="alunos-container">
      <h1 className="alunos-title">Gerenciamento de Alunos</h1>

      {error && <div className="error-message">{error}</div>}
      {loading && <div className="loading-indicator">Carregando...</div>}

      <div className="alunos-form-container">
        <form onSubmit={salvarAluno} className="alunos-form">
          <div className="form-section">
            <h2>Buscar Aluno</h2>
            <div className="form-group">
              <label htmlFor="buscaId">ID do Aluno:</label>
              <input
                id="buscaId"
                type="text"
                placeholder="Digite o ID"
                value={buscaId}
                onChange={(e) => setBuscaId(e.target.value)}
              />
              <button 
                type="button" 
                onClick={buscarAluno}
                className="secondary-button"
                disabled={loading}
              >
                Buscar
              </button>
            </div>
          </div>

          <div className="form-section">
            <h2>{form.id ? 'Editar Aluno' : 'Cadastrar Aluno'}</h2>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                id="nome"
                type="text"
                name="nome"
                placeholder="Nome completo"
                value={form.nome}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="cpf">CPF:</label>
              <input
                id="cpf"
                type="text"
                name="cpf"
                placeholder="000.000.000-00"
                value={form.cpf}
                onChange={handleInputChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className="primary-button"
              disabled={loading}
            >
              {form.id ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>
      </div>

      <div className="alunos-list-container">
        <h2>Lista de Alunos</h2>
        {alunos.length === 0 ? (
          <p className="empty-list">Nenhum aluno cadastrado</p>
        ) : (
          <ul className="alunos-list">
            {alunos.map((aluno) => (
              <li key={aluno.id} className="aluno-item">
                <div className="aluno-info">
                  <span className="aluno-nome">{aluno.nome}</span>
                  <span className="aluno-cpf">{aluno.cpf}</span>
                </div>
                <div className="aluno-actions">
                  <button 
                    onClick={() => setForm(aluno)}
                    className="edit-button"
                    disabled={loading}
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => deletarAluno(aluno.id)}
                    className="delete-button"
                    disabled={loading}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AlunosPage;