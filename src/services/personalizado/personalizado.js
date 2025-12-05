"use client";

import api from "../api";

export async function buscarPersonalizados() {

    try {

        const personalizados = await api.get(`/estoque`);
        return personalizados.data;

    } catch (erro) {

        console.error(erro);
        throw new Error(`Erro buscar personalizado!`);
    };
};

export async function buscarPersonalizado(id) {

    try {

        const personalizado = await api.get(`/estoque/${id}`);
        return personalizado.data;

    } catch (erro) {

        console.error(erro);
        throw new Error(`Erro buscar personalizado!`);
    };
};

export async function cadastrarPersonalizado(p) {
  
    try {

        console.log(p);
        
        const personalizado = await api.post(`/estoque`, p);
        return personalizado.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro cadastrar personalizado!`);
    };
};

export async function atualizarPersonalizado(id, p) {
  
    try {

        const personalizado = await api.put(`/estoque/${id}`, p);
        return personalizado.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro ao atualizar personalizado!`);
    };
};

export async function deletarPersonalizado(id) {
  
    try {

        const resposta = await api.delete(`/estoque/${id}`);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro ao deletar personalizado!`);
    };
};