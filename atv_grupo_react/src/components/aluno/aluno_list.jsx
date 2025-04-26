import AlunoItem from './aluno_item';

const AlunoList = ({ alunos, onEdit, onDelete, loading }) => (
  <div className="alunos-list-container">
    <h2>Lista de Alunos</h2>
    {alunos.length === 0 ? (
      <p className="empty-list">Nenhum aluno cadastrado</p>
    ) : (
      <ul className="alunos-list">
        {alunos.map(aluno => (
          <AlunoItem
            key={aluno.id}
            aluno={aluno}
            onEdit={onEdit}
            onDelete={onDelete}
            loading={loading}
          />
        ))}
      </ul>
    )}
  </div>
);

export default AlunoList;