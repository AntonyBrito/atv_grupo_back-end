import React from 'react';
import { Link } from 'react-router-dom';

function Professor() {
  return (
    <div>
      <h1>Página do Professor</h1>
      <p>Conteúdo da página de professores aqui...</p>
      <Link to="/">
        <button>Voltar</button>
      </Link>
    </div>
  );
}

export default Professor;