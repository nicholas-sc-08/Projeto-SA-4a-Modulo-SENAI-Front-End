"use client";

import React from 'react';
import styles from "@/components/pop_up_categoria/Pop_up_de_excluir_categoria.module.css";
import api from '../../services/api';
import { useGlobalContext } from '@/context/GlobalContext';
import { buscar_categorias } from '@/services/categoria/categoria';

export default function Pop_up_de_excluir_categoria() {

    const { array_categorias, set_array_categorias } = useGlobalContext();
    const { pop_up_de_excluir_categoria, set_pop_up_de_excluir_categoria } = useGlobalContext();
    const { id_categoria, set_id_categoria } = useGlobalContext();
    const { pop_up_notificacao_excluir_categoria, set_pop_up_notificacao_excluir_categoria } = useGlobalContext();

    async function excluir_categoria() {

        try {

            await api.delete(`/categorias/${id_categoria}`);
            buscar_categorias();
            set_pop_up_notificacao_excluir_categoria(true);
            set_pop_up_de_excluir_categoria(false);

        } catch (erro) {

            console.error(erro);
        };
    };

    return (
        <div className={styles['container_pop_up_de_excluir']}>
            <div className={styles["pop_up_de_excluir"]}>
                <img src="./img/Ponto_de_interrogacao.svg" alt="" />
                <p>Tem certeza que deseja excluir essa categoria?</p>
                <div className={styles["pop_up_de_excluir_botoes"]}>
                    <button className={styles['pop_up_de_excluir_botao_sair']} onClick={() => set_pop_up_de_excluir_categoria(false)}>Sair</button>
                    <button className={styles['pop_up_de_excluir_botao_excluir']} onClick={excluir_categoria}>Excluir</button>
                </div>
            </div>
        </div>
    );
};