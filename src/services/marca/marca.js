import api from "../api";

export async function buscar_marcas() {

    try {

        const resposta = await api.get("/marcas");
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error("Erro axios ao buscar as marcas");
    };
};

export async function buscar_marca(id) {

    try {

        const resposta = await api.get(`/marcas/${id}`);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error("Erro axios ao buscar a marca pelo ID");
    };
};

export async function cadastrar_marca(m) {

    try {

        const resposta = await api.post("/marcas", m);
        return resposta.data;

    } catch (erro) {
      
        console.error(erro.message);
        throw new Error("Erro axios ao cadastrar marca");
    };
};

export async function atualizar_marca(id, m) {

    try {

        const resposta = await api.put(`/marcas/${id}`, m);
        return resposta.data;
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error("Erro axios ao atualizar marca");
    };
};

export async function deletar_marca(id) {

    try {

        const resposta = await api.delete(`/marcas/${id}`);
        
    } catch (erro) {
      
        console.error(erro.message);
        throw new Error("Erro axios ao deletar a marca pelo ID");
    };
};