const AlunoForm = ({ form, setForm, salvarAluno, loading }) => {
    const handleChange = (e) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <div className="form-section">
        <h2>{form.id ? 'Editar Aluno' : 'Cadastrar Aluno'}</h2>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            name="nome"
            type="text"
            value={form.nome}
            onChange={handleChange}
            placeholder="Nome"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cpf">CPF:</label>
          <input
            id="cpf"
            name="cpf"
            type="text"
            value={form.cpf}
            onChange={handleChange}
            placeholder="000.000.000-00"
            required
          />
        </div>
        <button type="submit" className="primary-button" disabled={loading}>
          {form.id ? 'Atualizar' : 'Cadastrar'}
        </button>
      </div>
    );
  };
  
  export default AlunoForm;