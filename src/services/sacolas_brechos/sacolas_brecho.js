"use client";

import api from "../api";

export async function buscar_sacolas_brechos() {

    try {

        const resposta = await api.get(`/sacolas_brechos`);
        return resposta.data;

    } catch (erro) {

        console.error(erro);
        throw new Error(`Erro ao buscar as sacolas brechós`);
    };
};

export async function buscar_sacola_brecho(id) {

    try {

        const resposta = await api.get(`/sacolas_brechos/${id}`);
        return resposta.data;

    } catch (erro) {

        console.error(erro);
        throw new Error("Erro axios ao buscar a sacola brechó pelo ID");
    };
};

export async function cadastrar_sacola_brecho(mensagem) {

    try {

        const resposta = await api.post(`/sacolas_brechos`, mensagem);
        return resposta.data;

    } catch (erro) {

        console.error(erro);
        throw new Error("Erro axios ao cadastrar a sacola brechó!");
    };
};

export async function atualizar_sacolas_brecho(id, mensagem) {

    try {

        const resposta = await api.put(`/sacolas_brechos/${id}`, mensagem);
        return resposta.data;

    } catch (erro) {

        console.error(erro);
        throw new Error("Erro axios ao atualizar a sacolas brechós");
    };
};

export async function deletar_sacolas_brecho(id) {

    try {

        const reposta = await api.delete(`/sacolas_brechos/${id}`);

    } catch (erro) {

        console.error(erro);
        throw new Error("Erro axios ao deletar a sacolas brechó pelo ID");
    };
};

export function imagem_produto_sacola_brecho(tipo, padrao) {

    switch(true){

        case tipo == "caixa" && padrao == "logo_fly":
        return "";

        case tipo == "caixa" && padrao == "logo_fly_embaixo":
        return "";

        case tipo == "caixa" && padrao == "logo_fly_nome":
        return "";

        case tipo == "caixa" && padrao == "sem_logo":
        return "";
    }
};