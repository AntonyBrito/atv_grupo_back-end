import api from './httpCliente.js';

export const alunoApi = {
    getAll: async () => {
        const response = await api.get('/alunos');
        return response.data;
    },
    getById: async (id) => {
        const response = await api.get(`/alunos/${id}`);
        return response.data;
    },
    create: async (aluno) => {
        const response = await api.post('/alunos', aluno);
        return response.data;
    },
    update: async (id, aluno) => {
        const response = await api.put(`/alunos/${id}`, aluno);
        return response.data;
    },
    delete: async (id) => {
        const response = await api.delete(`/alunos/${id}`);
        return response.data;
    }
}