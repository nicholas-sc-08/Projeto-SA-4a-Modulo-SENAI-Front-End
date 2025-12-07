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

export function imagem_produto_sacola_brecho(tipo, padrao, cor, cor_corpo, cor_alca) {

    console.log(cor_corpo);

    if (tipo == "sacola") {

        switch (true) {

            case padrao == "sem_logo" && cor == "verde":
                return "./img/produtos_personalizados/sacola/sacola-verde-meio-virada.png";

            case padrao == "logo_fly" && cor == "verde":
                return "./img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-nome-meio.png";

            case padrao == "logo_fly_embaixo" && cor == "verde":
                return "./img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-embaixo.png";

            case padrao == "logo_fly_nome" && cor == "verde":
                return "./img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-nome-embaixo.png";

            case padrao == "sem_logo" && cor == "branco":
                return "./img/produtos_personalizados/sacola/sacola-branca-meio-virada.png";

            case padrao == "logo_fly" && cor == "branco":
                return "./img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-nome-meio.png";

            case padrao == "logo_fly_embaixo" && cor == "branco":
                return "./img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-embaixo.png";

            case padrao == "logo_fly_nome" && cor == "branco":
                return "./img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-embaixosacola-branca-meio-virada-logo-embaixo.png";
        };
    };

    if (tipo == "caixa") {

        switch (tipo == "caixa") {

            case padrao == "logo_fly":
                return "./img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-emcima.svg";

            case padrao == "logo_fly_embaixo":
                return "./img/produtos_personalizados/caixa/caixa-meio-virada-logo-embaixo.svg";

            case padrao == "logo_fly_nome":
                return "./img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-embaixo.svg";

            case padrao == "sem_logo":
                return "./img/produtos_personalizados/caixa/caixa_normal.svg";
        };
    };

    if (tipo == "ecobag") {

        switch (tipo == "ecobag") {

            case padrao == "logo_fly" && cor_corpo == "amarelo" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-meio.png";

            case padrao == "logo_fly_embaixo" && cor_corpo == "amarelo" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-em-baixo.png";

            case padrao == "logo_fly_nome" && cor_corpo == "amarelo" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-nome-em-baixo.png";

            case padrao == "sem_logo" && cor_corpo == "amarelo" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarela-alca-verde.png";

            case padrao == "logo_fly" && cor_corpo == "amarelo" && cor_alca == "areia":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-meio.png";

            case padrao == "logo_fly_embaixo" && cor_corpo == "amarelo" && cor_alca == "areia":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-em-baixo.png";

            case padrao == "logo_fly_nome" && cor_corpo == "amarelo" && cor_alca == "areia":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-nome-em-baixo.png";

            case padrao == "sem_logo" && cor_corpo == "amarelo" && cor_alca == "areia":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarela-alca-areia.png";

            case padrao == "logo_fly" && cor_corpo == "amarelo" && cor_alca == "amarelo":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarela-logo-meio.png";

            case padrao == "logo_fly_embaixo" && cor_corpo == "amarelo" && cor_alca == "amarelo":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-em-baixo.png";

            case padrao == "logo_fly_nome" && cor_corpo == "amarelo" && cor_alca == "amarelo":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-nome-em-baixo.png";

            case padrao == "sem_logo" && cor_corpo == "amarelo" && cor_alca == "amarelo":
                return "./img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-cor-base-amarelo.png";

            case padrao == "logo_fly" && cor_corpo == "areia" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-areia-clara-alca-verde-logo-meio.png";

            case padrao == "logo_fly_embaixo" && cor_corpo == "areia" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-areia-alca-verde-logo-em-baixo.png";

            case padrao == "logo_fly_nome" && cor_corpo == "areia" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-areia-alca-verde-logo-nome-em-baixo.png";

            case padrao == "sem_logo" && cor_corpo == "areia" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-amarela-alca-verde.png";

            case padrao == "logo_fly" && cor_corpo == "areia" && cor_alca == "amarelo":
                return "./img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-areia-clara-alca-amarela-logo-meio.png";

            case padrao == "logo_fly_embaixo" && cor_corpo == "areia" && cor_alca == "amarelo":
                return "./img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-areia-alca-amarelo-logo-em-baixo.png";

            case padrao == "logo_fly_nome" && cor_corpo == "areia" && cor_alca == "amarelo":
                return "./img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-areia-alca-amarelo-logo-nome-em-baixo.png";

            case padrao == "sem_logo" && cor_corpo == "areia" && cor_alca == "amarelo":
                return "./img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-amarela-alca-verde.png";

            case padrao == "logo_fly" && cor_corpo == "areia" && cor_alca == "areia":
                return "./img/produtos_personalizados/ecobaag/cores/areia/ecobag-areia-alca-areia-logo-nome-meio.png";

            case padrao == "logo_fly_embaixo" && cor_corpo == "areia" && cor_alca == "areia":
                return "./img/produtos_personalizados/ecobaag/cores/areia/ecobag-areia-alca-areia-logo-em-baixo.png";

            case padrao == "logo_fly_nome" && cor_corpo == "areia" && cor_alca == "areia":
                return "./img/produtos_personalizados/ecobaag/cores/areia/ecobag-areia-alca-areia-logo-nome-em-baixo.png";

            case padrao == "sem_logo" && cor_corpo == "areia" && cor_alca == "areia":
                //nao tem    
                return "./img/produtos_personalizados/ecobaag/cores/areia/ecobag-cor-base-areia.png";
            
            //ainda nao tenho as imagens
            case padrao == "logo_fly" && cor_corpo == "verde" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/verde/ecobag-verde-alca-verde-logo-meio.png";

            case padrao == "logo_fly_embaixo" && cor_corpo == "verde" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/verde/ecobag-verde-alca-verde-logo-em-baixo.png";

            case padrao == "logo_fly_nome" && cor_corpo == "verde" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/verde/ecobag-verde-alca-verde-logo-nome-em-baixo.png";

            case padrao == "sem_logo" && cor_corpo == "verde" && cor_alca == "verde":
                return "./img/produtos_personalizados/ecobaag/cores/verde/ecobag-cor-base-verde.png";

        };
    };
};

export function padrao_produto_sacola_brecho(padrao) {

    switch (true) {

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

export function material_produto_sacola_brecho(material) {

    switch (material) {

        case "papelao_reclivavel":
            return "Papelão Reciclável";

        case "plastico_biodegradavel":
            return "Plástico Biodegradável";

        case "papel_kraft":
            return "Papel Kraft";

        case "algodao":
            return "Algodão";

        case "poliester_reciclavel":
            return "Poliéster Reciclável";
    };
};

export function tamanho_produto_sacola_brecho(tamanho) {

    switch (tamanho) {

        case "pequeno":
            return "Pequeno";

        case "medio":
            return "Médio";

        case "grande":
            return "Grande";
    };
};