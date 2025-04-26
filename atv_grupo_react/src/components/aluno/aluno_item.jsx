const AlunoItem = ({ aluno, onEdit, onDelete, loading }) => (
    <li className="aluno-item">
      <div className="aluno-info">
        <span className="aluno-nome">{aluno.nome}</span>
        <span className="aluno-cpf">{aluno.cpf}</span>
      </div>
      <div className="aluno-actions">
        <button className="edit-button" onClick={() => onEdit(aluno)} disabled={loading}>Editar</button>
        <button className="delete-button" onClick={() => onDelete(aluno.id)} disabled={loading}>Excluir</button>
      </div>
    </li>
  );
  
  export default AlunoItem;