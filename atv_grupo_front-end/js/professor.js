const PROFESSOR_API_URL = 'http://localhost:8080/professor';

function loadProfessores() {
    fetch(PROFESSOR_API_URL)
        .then(response => response.json())
        .then(data => displayProfessores(data))
        .catch(error => console.error('Error:', error));
}

function displayProfessores(professores) {
    const table = `
        <h2>Professores</h2>
        <button onclick="showProfessorForm()">Adicionar Professor</button>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Turmas</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                ${professores.map(professor => `
                    <tr>
                        <td>${professor.idProfessor}</td>
                        <td>${professor.nome}</td>
                        <td>${professor.sobrenome}</td>
                        <td>${professor.turma ? professor.turma.length : 0}</td>
                        <td class="actions">
                            <button onclick="editProfessor(${professor.idProfessor})">Editar</button>
                            <button onclick="deleteProfessor(${professor.idProfessor})">Excluir</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        <div id="professor-form-container"></div>
    `;
    
    document.getElementById('content').innerHTML = table;
}

function showProfessorForm(professor = null) {
    const form = `
        <h3>${professor ? 'Editar Professor' : 'Adicionar Professor'}</h3>
        <form id="professor-form" onsubmit="handleProfessorSubmit(event)">
            <input type="hidden" id="idProfessor" value="${professor ? professor.idProfessor : ''}">
            
            <label for="nome">Nome:</label>
            <input type="text" id="nome" value="${professor ? professor.nome : ''}" required>
            
            <label for="sobrenome">Sobrenome:</label>
            <input type="text" id="sobrenome" value="${professor ? professor.sobrenome : ''}" required>
            
            <button type="submit">Salvar</button>
            <button type="button" onclick="document.getElementById('professor-form-container').innerHTML = ''">Cancelar</button>
        </form>
    `;
    
    document.getElementById('professor-form-container').innerHTML = form;
}

function handleProfessorSubmit(event) {
    event.preventDefault();
    
    const professor = {
        idProfessor: document.getElementById('idProfessor').value || null,
        nome: document.getElementById('nome').value,
        sobrenome: document.getElementById('sobrenome').value
    };
    
    const method = professor.idProfessor ? 'PUT' : 'POST';
    const url = professor.idProfessor ? `${PROFESSOR_API_URL}/${professor.idProfessor}` : PROFESSOR_API_URL;
    
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(professor)
    })
    .then(response => response.json())
    .then(() => {
        loadProfessores();
        document.getElementById('professor-form-container').innerHTML = '';
    })
    .catch(error => console.error('Error:', error));
}

function editProfessor(id) {
    fetch(`${PROFESSOR_API_URL}/${id}`)
        .then(response => response.json())
        .then(professor => showProfessorForm(professor))
        .catch(error => console.error('Error:', error));
}

function deleteProfessor(id) {
    if (confirm('Tem certeza que deseja excluir este professor?')) {
        fetch(`${PROFESSOR_API_URL}/${id}`, {
            method: 'DELETE'
        })
        .then(() => loadProfessores())
        .catch(error => console.error('Error:', error));
    }
}