"use client";

import api from "../api";

export async function buscar_brechos() {

    try {

        const brechos = await api.get(`/brechos`);
        return brechos.data;

    } catch (erro) {

        console.error(erro);
        throw new Error(`Erro buscar brechós!`);
    };
};

export async function buscar_brecho(id) {

    try {

        const brecho = await api.get(`/brechos/${id}`);
        return brecho.data;

    } catch (erro) {

        console.error(erro);
        throw new Error(`Erro buscar brechó!`);
    };
};

export async function cadastrar_brecho(brecho) {
  
    try {

        const resposta = await api.post(`/brechos`, brecho);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro cadastrar brechó!`);
    };
};

export async function atualizar_brecho(id, brecho) {
  
    try {

        const resposta = await api.put(`/brechos/${id}`, brecho);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro ao atualizar brechó!`);
    };
};

export async function deletar_brecho(id) {
  
    try {

        const resposta = await api.delete(`/brechos/${id}`);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro ao deletar brechó!`);
    };
};