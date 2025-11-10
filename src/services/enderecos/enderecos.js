import api from "../api";

export async function buscar_enderecos(){

    try {

        const resposta = await api.get("/enderecos");
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function buscar_endereco(id){

    try {

        const resposta = await api.get(`/enderecos/${id}`);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function cadastrar_endereco(endereco){

    try {

        const resposta = await api.post("/enderecos", endereco);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function atualizar_endereco(endereco, id){

    try {

        const resposta = await api.put(`/enderecos/${id}`, endereco);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro);
    };
};

export async function deletar_endereco(id){

    try {

        const resposta = await api.delete(`/enderecos/${id}`);
        
    } catch (erro) {
      
        console.error(erro);
    };
};