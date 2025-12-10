"use client";

import api from "../api";

export async function buscar_conversas() {

    try {

        const token = JSON.parse(localStorage.getItem("user"));
        const resposta = await api.get(`/chats`, { headers: { Authorization: `Bearer ${token}` } });
        return resposta.data;

    } catch (erro) {

        console.error(erro);
        throw new Error(`Erro ao buscar as conversas`);
    };
};

export async function buscar_conversa(id) {

    try {

        const token = JSON.parse(localStorage.getItem("user"));
        const resposta = await api.get(`/chats/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        return resposta.data;

    } catch (erro) {

        console.error(erro);
        throw new Error("Erro axios ao buscar a conversa pelo ID");
    };
};

export async function cadastrar_conversa(mensagem) {

    try {

        const token = JSON.parse(localStorage.getItem("user"));
        const resposta = await api.post(`/chats`, mensagem, { headers: { Authorization: `Bearer ${token}` } });
        return resposta.data;

    } catch (erro) {

        console.error(erro);
        throw new Error("Erro axios ao cadastrar a mensagem!");
    };
};

export async function atualizar_conversa(id, mensagem) {

    try {

        const token = JSON.parse(localStorage.getItem("user"));
        const resposta = await api.put(`/chats/${id}`, mensagem, { headers: { Authorization: `Bearer ${token}` } });
        return resposta.data;

    } catch (erro) {

        console.error(erro);
        throw new Error("Erro axios ao atualizar a mensagem");
    };
};

export async function deletar_conversa(id) {

    try {

        const token = JSON.parse(localStorage.getItem("user"));
        const reposta = await api.delete(`/chats/${id}`, { headers: { Authorization: `Bearer ${token}` } });

    } catch (erro) {

        console.error(erro);
        throw new Error("Erro axios ao deletar a mensagem pelo ID");
    };
};

export function buscar_ultima_mensagem(id, array_chat, usuario_logado) {

    for (let i = array_chat.length - 1; i >= 0; i--) {

        if (array_chat[i].id_dono_mensagem == id && usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem) {

            return array_chat[i].mensagem;
        };

        if (array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == id) {

            return array_chat[i].mensagem;
        };
    };

    return `Nenhuma mensagem`;
};