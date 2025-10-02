"use client";

import api from "../api";

export async function buscar_conversas() {

    try {

        const resposta = await api.get(`/chats`);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro ao buscar as conversas`);
    };
};

export async function buscar_conversa(id){

    try {

        const resposta = await api.get(`/chats/${id}`);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error("Erro axios ao buscar a conversa pelo ID");
    };
};

export async function cadastrar_conversa(mensagem){

    try {

        console.log(mensagem);
        const resposta = await api.post(`/chats`, mensagem);
        return resposta.data;
        
    } catch (erro) {
        
        console.error(erro.message);
        throw new Error("Erro axios ao cadastrar a mensagem!");
    };
};

export async function atualizar_conversa(id, mensagem){

    try {

        const resposta = await api.put(`/chats/${id}`, mensagem);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error("Erro axios ao atualizar a mensagem");
    };
};

export async function deletar_conversa(id){

    try {

        const reposta = await api.delete(`/chats/${id}`);
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error("Erro axios ao deletar a mensagem pelo ID");
    };
};