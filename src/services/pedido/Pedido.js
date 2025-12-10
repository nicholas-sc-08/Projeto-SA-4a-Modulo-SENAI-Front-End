"use client";

import api from "../api";

/**
 * Busca todos os pedidos da fila
 * @returns {Promise<Array>} Lista de pedidos
 */
export async function buscar_pedidos() {
    try {

        const token = JSON.parse(localStorage.getItem("user"));
        const resposta = await api.get('/pedidos', { headers: { Authorization: `Bearer ${token}` } });
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
        const token = JSON.parse(localStorage.getItem("user"));
        const resposta = await api.get(`/pedidos/${id_pedido}`, { headers: { Authorization: `Bearer ${token}` } });
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
        const token = JSON.parse(localStorage.getItem("user"));
        const resposta = await api.post('/pedidos', payload, { headers: { Authorization: `Bearer ${token}` } });
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
        const token = JSON.parse(localStorage.getItem("user"));
        const resposta = await api.put(`/pedidos/${id_pedido}`, { headers: { Authorization: `Bearer ${token}` } }, dados);
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
        const token = JSON.parse(localStorage.getItem("user"));
        await api.delete(`/pedidos/${id_pedido}`, { headers: { Authorization: `Bearer ${token}` } });
    } catch (erro) {
        console.error('Erro ao deletar pedido:', erro);
        throw new Error('Erro ao deletar o pedido');
    }
}