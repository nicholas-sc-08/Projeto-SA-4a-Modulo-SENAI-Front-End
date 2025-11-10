"use client";

import React, { useEffect } from 'react'
import { buscar_brechos } from '@/services/brecho/brecho';
import { buscar_enderecos } from '@/services/enderecos/enderecos';
import { useGlobalContext } from '@/context/GlobalContext';
import styles from "@/components/pop_up_brechos/Pop_up_excluir_brecho.module.css";

export default function Pop_up_excluir_brecho() {

    const { id_do_brecho_a_excluir, set_id_do_brecho_a_excluir } = useGlobalContext();
    const { array_brechos, set_array_brechos } = useGlobalContext()
    const { array_enderecos, set_array_enderecos } = useGlobalContext()
    const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useGlobalContext();

    async function excluir_brechos(id) {

        try {

            const brecho_a_excluir = await api.delete(`/brechos/${id}`);
            buscar_brechos();
            buscar_enderecos();
            set_abrir_pop_up_dashboard(false);
            set_pop_up_notificacao_excluir_dashboard(true);

        } catch (erro) {

            console.error(erro);
        };
    };

    async function excluir_endereco(id) {

        try {

            const endereco_a_excluir = await api.delete(`/enderecos/${id}`);
            excluir_brechos(id);

        } catch (erro) {

            console.error(erro);
        };
    };

    useEffect(() => {

        buscar_brechos();
        buscar_enderecos();

    }, []);

    return (
        <div className={styles['container_pop_up_de_excluir']}>

            <div className={styles["pop_up_de_excluir"]}>

                <img src="./img/Ponto_de_interrogacao.svg" alt="" />
                <p>Tem certeza que deseja excluir essa conta de usuário?</p>

                <div className={styles["pop_up_de_excluir_botoes"]}>

                    <button className={styles['pop_up_de_excluir_botao_sair']} onClick={() => set_abrir_pop_up_dashboard(false)}>Sair</button>
                    <button className={styles['pop_up_de_excluir_botao_excluir']} onClick={() => excluir_endereco(id_do_brecho_a_excluir)}>Excluir</button>
                </div>

            </div>

        </div>
    );
};