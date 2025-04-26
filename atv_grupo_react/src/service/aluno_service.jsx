import { useState, useEffect } from 'react';
import { alunoApi } from '../api/alunoApi';

export const useAlunos = () => {
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({ id: '', nome: '', cpf: '' });
  const [buscaId, setBuscaId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const carregarAlunos = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await alunoApi.getAll();
      setAlunos(response);
    } catch (err) {
      setError('Erro ao carregar alunos');
    } finally {
      setLoading(false);
    }
  };

  const buscarAluno = async () => {
    if (!buscaId) return setError('Digite um ID para buscar');
    setLoading(true);
    setError('');
    try {
      const aluno = await alunoApi.getById(buscaId);
      setForm(aluno);
    } catch {
      setError('Aluno não encontrado');
    } finally {
      setLoading(false);
    }
  };

  const salvarAluno = async (e) => {
    e.preventDefault();
    if (!form.nome || !form.cpf) return setError('Preencha todos os campos');
    setLoading(true);
    setError('');
    try {
      form.id ? await alunoApi.update(form.id, form) : await alunoApi.create(form);
      setForm({ id: '', nome: '', cpf: '' });
      setBuscaId('');
      await carregarAlunos();
    } catch {
      setError('Erro ao salvar aluno');
    } finally {
      setLoading(false);
    }
  };

  const deletarAluno = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este aluno?')) return;
    setLoading(true);
    setError('');
    try {
      await alunoApi.delete(id);
      await carregarAlunos();
    } catch {
      setError('Erro ao excluir aluno');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { carregarAlunos(); }, []);

  return {
    alunos, form, buscaId, loading, error,
    setForm, setBuscaId, buscarAluno, salvarAluno, deletarAluno
  };
};