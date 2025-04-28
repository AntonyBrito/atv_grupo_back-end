const TURMA_API_URL = 'http://localhost:8080/turma';

function loadTurmas() {
    fetch(TURMA_API_URL)
        .then(response => response.json())
        .then(data => displayTurmas(data))
        .catch(error => console.error('Error:', error));
}

function displayTurmas(turmas) {
    const table = `
        <h2>Turmas</h2>
        <button onclick="showTurmaForm()">Adicionar Turma</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Sigla</th>
                    <th>Sala</th>
                    <th>Professor</th>
                    <th>Alunos</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${turmas.map(turma => `
                    <tr>
                        <td>${turma.idTurma}</td>
                        <td>${turma.nome}</td>
                        <td>${turma.sigla}</td>
                        <td>${turma.numeroSala}</td>
                        <td>${turma.professor ? turma.professor.nome + ' ' + turma.professor.sobrenome : 'Nenhum'}</td>
                        <td>${turma.alunos ? turma.alunos.length : 0}</td>
                        <td class="actions">
                            <button onclick="editTurma(${turma.idTurma})">Editar</button>
                            <button onclick="deleteTurma(${turma.idTurma})">Excluir</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div id="turma-form-container"></div>
    `;
    
    document.getElementById('content').innerHTML = table;
}

function showTurmaForm(turma = null) {
    const form = `
        <h3>${turma ? 'Editar Turma' : 'Adicionar Turma'}</h3>
        <form id="turma-form" onsubmit="handleTurmaSubmit(event)">
            <input type="hidden" id="idTurma" value="${turma ? turma.idTurma : ''}">
            
            <label for="nome">Nome:</label>
            <input type="text" id="nome" value="${turma ? turma.nome : ''}" required>
            
            <label for="sigla">Sigla:</label>
            <input type="text" id="sigla" value="${turma ? turma.sigla : ''}" required>
            
            <label for="numeroSala">Número da Sala:</label>
            <input type="number" id="numeroSala" value="${turma ? turma.numeroSala : ''}" required>
            
            <label for="idProfessor">Professor:</label>
            <select id="idProfessor">
                <option value="">Nenhum</option>
                <!-- Professores serão carregados via AJAX -->
            </select>
            
            <button type="submit">Salvar</button>
            <button type="button" onclick="document.getElementById('turma-form-container').innerHTML = ''">Cancelar</button>
        </form>
    `;
    
    document.getElementById('turma-form-container').innerHTML = form;
    
    // Carrega professores para o select
    fetch('http://localhost:8080/professor')
        .then(response => response.json())
        .then(professores => {
            const select = document.getElementById('idProfessor');
            professores.forEach(professor => {
                const option = document.createElement('option');
                option.value = professor.idProfessor;
                option.textContent = professor.nome + ' ' + professor.sobrenome;
                if (turma && turma.professor && turma.professor.idProfessor === professor.idProfessor) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        });
}

function handleTurmaSubmit(event) {
    event.preventDefault();
    
    const turma = {
        idTurma: document.getElementById('idTurma').value || null,
        nome: document.getElementById('nome').value,
        sigla: document.getElementById('sigla').value,
        numeroSala: parseInt(document.getElementById('numeroSala').value),
        professor: {
            idProfessor: document.getElementById('idProfessor').value || null
        }
    };
    
    const method = turma.idTurma ? 'PUT' : 'POST';
    const url = turma.idTurma ? `${TURMA_API_URL}/${turma.idTurma}` : TURMA_API_URL;
    
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(turma)
    })
    .then(response => response.json())
    .then(() => {
        loadTurmas();
        document.getElementById('turma-form-container').innerHTML = '';
    })
    .catch(error => console.error('Error:', error));
}

function editTurma(id) {
    fetch(`${TURMA_API_URL}/${id}`)
        .then(response => response.json())
        .then(turma => showTurmaForm(turma))
        .catch(error => console.error('Error:', error));
}

function deleteTurma(id) {
    if (confirm('Tem certeza que deseja excluir esta turma?')) {
        fetch(`${TURMA_API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(() => loadTurmas())
        .catch(error => console.error('Error:', error));
    }
}