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

export function nome_produto(tipo) {

    if (tipo == "caixa") {

        return "Caixa";
    } else if (tipo == "ecobag") {

        return "EcoBag"
    } else {

        return "Sacola"
    };
};

export function imagem_produto_sacola_brecho(tipo, padrao) {

    switch (tipo == "caixa") {

        case padrao == "logo_fly":
            return "./img/produtos_personalizados/caixa/caixa-meio-virada-logo-embaixo.svg";

        case padrao == "logo_fly_embaixo":
            return "./img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-emcima.svg";

        case padrao == "logo_fly_nome":
            return "./img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-embaixo.svg";

        case padrao == "sem_logo":
            return "./img/produtos_personalizados/caixa/caixa_normal.svg";
    };
};

export function padrao_produto_sacola_brecho(padrao){

    switch(true){

        case padrao == "logo_fly":
            return "Logo da Fly";
        
        case padrao == "logo_fly_nome":
            return "Logo da Fly com Nome";

        case padrao == "logo_fly_embaixo":
            return "Logo da Fly em Cima";

        case padrao == "sem_logo":
            return "Sem Logo";
    };
};