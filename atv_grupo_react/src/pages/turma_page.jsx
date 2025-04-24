import React from 'react';
import { Link } from 'react-router-dom';

function Turma() {
  return (
    <div>
      <h1>Página da Turma</h1>
      <p>Conteúdo da página de turmas aqui...</p>
      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}

export default Turma;