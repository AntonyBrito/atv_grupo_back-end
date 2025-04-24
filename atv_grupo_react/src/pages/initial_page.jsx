import React from 'react';
import { Link } from 'react-router-dom';

function Inicial() {
  return (
    <div>
      <h1>Bem-vindo ao Site da Escola Senai São Carlos</h1>
      <p>Aperte algum botão abaixo para consultar, adicionar, modificar ou remover algo:</p>

      <Link to="/professor">
        <button>Professor</button>
      </Link>
      
      <Link to="/turma">
        <button>Turma</button>
      </Link>
      
      <Link to="/aluno">
        <button>Aluno</button>
      </Link>
    </div>
  );
}

export default Inicial;