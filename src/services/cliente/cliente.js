"use client";

import api from "../api";

export async function buscar_clientes() {

    try {

        const clientes = await api.get(`/clientes`);
        return clientes.data;

    } catch (erro) {

        console.error(erro);
        throw new Error(`Erro buscar clientes!`);
    };
};

export async function buscar_cliente(id) {

    try {

        const cliente = await api.get(`/clientes/${id}`);
        return cliente.data;

    } catch (erro) {

        console.error(erro);
        throw new Error(`Erro buscar cliente!`);
    };
};

export async function cadastrar_cliente(cliente) {
  
    try {

        const resposta = await api.post(`/clientes`, cliente);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro cadastrar cliente!`);
    };
};

export async function atualizar_cliente(id, cliente) {
  
    try {

        const resposta = await api.put(`/clientes/${id}`, cliente);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro ao atualizar cliente!`);
    };
};

export async function deletar_cliente(id) {
  
    try {

        const resposta = await api.delete(`/clientes/${id}`);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro ao deletar cliente!`);
    };
};