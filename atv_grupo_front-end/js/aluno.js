const API_URL = 'http://localhost:8080/aluno';

function loadAlunos() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => displayAlunos(data))
        .catch(error => console.error('Error:', error));
}

function displayAlunos(alunos) {
    const table = `
        <h2>Alunos</h2>
        <button onclick="showAlunoForm()">Adicionar Aluno</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Turma</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${alunos.map(aluno => `
                    <tr>
                        <td>${aluno.idAluno}</td>
                        <td>${aluno.nome}</td>
                        <td>${aluno.cpf}</td>
                        <td>${aluno.turma ? aluno.turma.nome : 'Nenhuma'}</td>
                        <td class="actions">
                            <button onclick="editAluno(${aluno.idAluno})">Editar</button>
                            <button onclick="deleteAluno(${aluno.idAluno})">Excluir</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div id="aluno-form-container"></div>
    `;
    
    document.getElementById('content').innerHTML = table;
}

function showAlunoForm(aluno = null) {
    const form = `
        <h3>${aluno ? 'Editar Aluno' : 'Adicionar Aluno'}</h3>
        <form id="aluno-form" onsubmit="handleAlunoSubmit(event)">
            <input type="hidden" id="idAluno" value="${aluno ? aluno.idAluno : ''}">
            
            <label for="nome">Nome:</label>
            <input type="text" id="nome" value="${aluno ? aluno.nome : ''}" required>
            
            <label for="cpf">CPF:</label>
            <input type="text" id="cpf" value="${aluno ? aluno.cpf : ''}" required>
            
            <label for="idTurma">Turma:</label>
            <select id="idTurma">
                <option value="">Nenhuma</option>
                <!-- Turmas serão carregadas via AJAX -->
            </select>
            
            <button type="submit">Salvar</button>
            <button type="button" onclick="document.getElementById('aluno-form-container').innerHTML = ''">Cancelar</button>
        </form>
    `;
    
    document.getElementById('aluno-form-container').innerHTML = form;
    
    // Carrega turmas para o select
    fetch('http://localhost:8080/turma')
        .then(response => response.json())
        .then(turmas => {
            const select = document.getElementById('idTurma');
            turmas.forEach(turma => {
                const option = document.createElement('option');
                option.value = turma.idTurma;
                option.textContent = turma.nome;
                if (aluno && aluno.turma && aluno.turma.idTurma === turma.idTurma) {
                    option.selected = true;
                }
                select.appendChild(option);
            });
        });
}

function handleAlunoSubmit(event) {
    event.preventDefault();
    
    const aluno = {
        idAluno: document.getElementById('idAluno').value || null,
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        turma: {
            idTurma: document.getElementById('idTurma').value || null
        }
    };
    
    const method = aluno.idAluno ? 'PUT' : 'POST';
    const url = aluno.idAlano ? `${API_URL}/${aluno.idAluno}` : API_URL;
    
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(aluno)
    })
    .then(response => response.json())
    .then(() => {
        loadAlunos();
        document.getElementById('aluno-form-container').innerHTML = '';
    })
    .catch(error => console.error('Error:', error));
}

function editAluno(id) {
    fetch(`${API_URL}/${id}`)
        .then(response => response.json())
        .then(aluno => showAlunoForm(aluno))
        .catch(error => console.error('Error:', error));
}

function deleteAluno(id) {
    if (confirm('Tem certeza que deseja excluir este aluno?')) {
        fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(() => loadAlunos())
        .catch(error => console.error('Error:', error));
    }
}