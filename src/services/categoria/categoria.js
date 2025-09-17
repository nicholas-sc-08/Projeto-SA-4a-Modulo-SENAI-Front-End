"use client";

import api from "../api";
import { useGlobalContext } from "@/context/GlobalContext";

const { array_categorias, set_array_categorias } = useGlobalContext();

export async function buscar_categorias() {

    try {

        const categorias = await api.get(`/categorias`);
        set_array_categorias(brechos.data);

    } catch (erro) {

        console.error(erro);
        throw new Error(`Erro cadastrar categorias!`);
    };
};

export async function buscar_categoria(id) {

    try {

        const categoria = await api.get(`/categorias/${id}`);
        return categoria.data;

    } catch (erro) {

        console.error(erro);
        throw new Error(`Erro buscar categoria!`);
    };
};

export async function cadastrar_categoria(categoria) {
  
    try {

        const resposta = await api.post(`/categorias`, categoria);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro cadastrar categoria!`);
    };
};

export async function atualizar_categoria(id, categoria) {
  
    try {

        const resposta = await api.put(`/categorias/${id}`, categoria);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro ao atualizar categoria!`);
    };
};

export async function deletar_categoria(id) {
  
    try {

        const resposta = await api.delete(`/categorias/${id}`);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error(`Erro ao deletar categoria!`);
    };
};