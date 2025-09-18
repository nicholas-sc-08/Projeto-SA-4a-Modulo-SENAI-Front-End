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