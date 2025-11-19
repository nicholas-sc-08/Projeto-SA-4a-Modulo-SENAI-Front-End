"use client";

import React, { useEffect } from 'react'
import { buscar_produtos } from '@/services/produto/produto';
import api from '../../services/api';
import { useGlobalContext } from '@/context/GlobalContext';
import styles from "@/components/pop_up_dashboard/Pop_up_de_excluir.module.css";

export default function Pop_up_excluir_produto_dashboard() {

    const { id_do_produto_a_excluir, set_id_do_produto_a_excluir } = useGlobalContext();
    const { array_produtos, set_array_produtos } = useGlobalContext();
    const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useGlobalContext();
    const { pop_up_notificacao_excluir_dashboard, set_pop_up_notificacao_excluir_dashboard } = useGlobalContext();

    async function excluir_produtos(id) {

        try {

            const produto_a_excluir = await api.delete(`/produtos/${id}`);
            buscar_produtos();
            set_abrir_pop_up_dashboard(false);
            set_pop_up_notificacao_excluir_dashboard(true);

        } catch (erro) {

            console.error(erro);
        };
    };

    useEffect(() => {

        buscar_produtos();
    }, [])

    return (
        <div className={styles['container_pop_up_de_excluir']}>
            <div className={styles["pop_up_de_excluir"]}>
                <img src="./img/Ponto_de_interrogacao.svg" alt="" />
                <p>Tem certeza que deseja excluir este produto?</p>
                <div className={styles["pop_up_de_excluir_botoes"]}>
                    <button className={styles['pop_up_de_excluir_botao_sair']} onClick={() => set_abrir_pop_up_dashboard(false)}>Sair</button>
                    <button className={styles['pop_up_de_excluir_botao_excluir']} onClick={() => excluir_produtos(id_do_produto_a_excluir)}>Excluir</button>
                </div>
            </div>
        </div>
    );
};