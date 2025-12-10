// "use client";

// import api from '../api';

// /**
//  * Busca todos os pedidos da fila (conecta com get_pedidos controller)
//  * @returns {Promise<Array>} Lista de pedidos
//  */
// export async function buscar_pedidos() {
//     try {
//         const resposta = await api.get('/pedidos');
//         return resposta.data;
//     } catch (erro) {
//         console.error('Erro ao buscar pedidos:', erro);
//         if (erro.response?.status === 404) {
//             return []; // Retorna array vazio se não houver pedidos
//         }
//         throw new Error('Erro ao buscar os pedidos');
//     }
// }

// /**
//  * Busca um pedido específico pelo ID (conecta com get_pedido controller)
//  * @param {string} id_pedido - ID do pedido
//  * @returns {Promise<Object>} Dados do pedido
//  */
// export async function buscar_pedido_por_id(id_pedido) {
//     try {
//         const resposta = await api.get(`/pedidos/${id_pedido}`);
//         return resposta.data;
//     } catch (erro) {
//         console.error('Erro ao buscar pedido:', erro);
//         if (erro.response?.status === 404) {
//             return null;
//         }
//         throw new Error('Erro ao buscar o pedido');
//     }
// }

// /**
//  * Envia um novo pedido para a máquina
//  * @param {Object} payload - Dados do pedido
//  * @returns {Promise<Object>} Pedido criado
//  */
// export async function enviar_pedido(payload) {
//     try {
//         const resposta = await api.post('/pedidos', payload);
//         return resposta.data;
//     } catch (erro) {
//         console.error('Erro ao enviar pedido:', erro);
//         throw new Error('Erro ao enviar pedido');
//     }
// }

// /**
//  * Atualiza um pedido existente
//  * @param {string} id_pedido - ID do pedido
//  * @param {Object} dados - Dados para atualizar
//  * @returns {Promise<Object>} Pedido atualizado
//  */
// export async function atualizar_pedido(id_pedido, dados) {
//     try {
//         const resposta = await api.put(`/pedidos/${id_pedido}`, dados);
//         return resposta.data;
//     } catch (erro) {
//         console.error('Erro ao atualizar pedido:', erro);
//         throw new Error('Erro ao atualizar pedido');
//     }
// }

// /**
//  * Deleta um pedido
//  * @param {string} id_pedido - ID do pedido
//  * @returns {Promise<void>}
//  */
// export async function deletar_pedido(id_pedido) {
//     try {
//         await api.delete(`/pedidos/${id_pedido}`);
//     } catch (erro) {
//         console.error('Erro ao deletar pedido:', erro);
//         throw new Error('Erro ao deletar pedido');
//     }
// }

// /**
//  * Converte o status da máquina para formato legível
//  * @param {string} status - Status retornado pela API
//  * @returns {Object} Status formatado
//  */
// export function converter_status_pedido(status) {
//     const mapeamento_status = {
//         'pending': { titulo: 'Pedido Feito', concluido: true, ativo: false },
//         'processing': { titulo: 'Processando', concluido: true, ativo: true },
//         'in_production': { titulo: 'Enviado', concluido: false, ativo: false },
//         'completed': { titulo: 'Entregue', concluido: true, ativo: false },
//         'failed': { titulo: 'Erro', concluido: false, ativo: false }
//     };

//     return mapeamento_status[status] || { titulo: 'Desconhecido', concluido: false, ativo: false };
// }

"use client";

import api from "../api";

/**
 * Busca todos os pedidos da fila
 * @returns {Promise<Array>} Lista de pedidos
 */
export async function buscar_pedidos() {
    try {
        const resposta = await api.get('/pedidos');
        return resposta.data;
    } catch (erro) {
        console.error('Erro ao buscar pedidos:', erro);
        if (erro.response?.status === 404) {
            return []; // Retorna array vazio se não houver pedidos
        }
        throw new Error('Erro ao buscar os pedidos');
    }
}

/**
 * Busca um pedido específico pelo ID
 * @param {string} id_pedido - ID do pedido
 * @returns {Promise<Object>} Dados do pedido
 */
export async function buscar_pedido_por_id(id_pedido) {
    try {
        const resposta = await api.get(`/pedidos/${id_pedido}`);
        return resposta.data;
    } catch (erro) {
        console.error('Erro ao buscar pedido:', erro);
        if (erro.response?.status === 404) {
            return null;
        }
        throw new Error('Erro ao buscar o pedido pelo ID');
    }
}

/**
 * Envia um novo pedido para a máquina
 * @param {Object} payload - Dados do pedido
 * @returns {Promise<Object>} Pedido criado
 */
export async function enviar_pedido(payload) {
    try {
        const resposta = await api.post('/pedidos', payload);
        return resposta.data;
    } catch (erro) {
        console.error('Erro ao enviar pedido:', erro);
        throw new Error('Erro ao enviar pedido para produção');
    }
}

/**
 * Atualiza um pedido existente
 * @param {string} id_pedido - ID do pedido
 * @param {Object} dados - Dados para atualizar
 * @returns {Promise<Object>} Pedido atualizado
 */
export async function atualizar_pedido(id_pedido, dados) {
    try {
        const resposta = await api.put(`/pedidos/${id_pedido}`, dados);
        return resposta.data;
    } catch (erro) {
        console.error('Erro ao atualizar pedido:', erro);
        throw new Error('Erro ao atualizar o pedido');
    }
}

/**
 * Deleta um pedido
 * @param {string} id_pedido - ID do pedido
 * @returns {Promise<void>}
 */
export async function deletar_pedido(id_pedido) {
    try {
        await api.delete(`/pedidos/${id_pedido}`);
    } catch (erro) {
        console.error('Erro ao deletar pedido:', erro);
        throw new Error('Erro ao deletar o pedido');
    }
}