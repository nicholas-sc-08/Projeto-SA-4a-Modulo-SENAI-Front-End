import api from "../api";

export async function buscar_produtos(){

    try {

        const resposta = await api.get("/produtos");
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function buscar_produto(id){

    try {

        const resposta = await api.get(`/produtos/${id}`);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function cadastrar_produto(produto){

    try {

        const resposta = await api.post("/produtos", produto);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function atualizar_produto(produto, id){

    try {

        const resposta = await api.put(`/produtos/${id}`, produto);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function deletar_produto(id){

    try {

        const resposta = await api.delete(`/produtos/${id}`);
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function buscar_estoques(){

    try {

        const resposta = await api.get("/estoques");
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function buscar_estoque(id){

    try {

        const resposta = await api.get(`/estoques/${id}`);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function cadastrar_estoque(estoque){

    try {

        const resposta = await api.post("/estoques", estoque);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function atualizar_estoque(estoque, id){

    try {

        const resposta = await api.put(`/estoques/${id}`, estoque);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function deletar_estoque(id){

    try {

        const resposta = await api.delete(`/estoques/${id}`);
        
    } catch (erro) {
      
        console.error(erro);
    };
};