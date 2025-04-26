const BuscarAluno = ({ buscaId, setBuscaId, buscarAluno, loading }) => (
    <div className="form-section">
      <h2>Buscar Aluno</h2>
      <div className="form-group">
        <label htmlFor="buscaId">ID do Aluno:</label>
        <input
          id="buscaId"
          type="text"
          value={buscaId}
          onChange={(e) => setBuscaId(e.target.value)}
          placeholder="Digite o ID"
        />
        <button type="button" onClick={buscarAluno} className="secondary-button" disabled={loading}>
          Buscar
        </button>
      </div>
    </div>
  );
  
  export default BuscarAluno;