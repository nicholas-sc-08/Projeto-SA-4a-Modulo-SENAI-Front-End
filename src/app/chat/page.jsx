"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { buscar_brechos } from "@/services/brecho/brecho";
import { buscar_conversas } from "@/services/chat/chat";
import styles from "@/app/chat/page.module.css";
import { useGlobalContext } from "@/context/GlobalContext";

export default function chat() {

    const [perfil_botao, set_perfil_botao] = useState("./img/icons/chat_perfil.svg");
    const [conversas_botao, set_conversas_botao] = useState("./img/icons/chat_conversas.svg");
    const [grupos_botao, set_grupos_botao] = useState("./img/icons/chat_grupos.svg");
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { array_chat, set_array_chat } = useGlobalContext();
    const { secao_chat, set_secao_chat } = useGlobalContext();
    const { usuario_logado, set_usuario_logado } = useGlobalContext();

    useEffect(() => {

        buscar_brechos().then(data => set_array_brechos(data));
        buscar_conversas().then(mensagem => set_array_chat(mensagem));
    }, []);

    function buscar_ultima_mensagem(conversa){

        for(let i = array_chat.length; i > 0; i--){

            if(array_chat[i].id_quem_recebeu_mensagem == usuario_logado._id && array_chat[i].id_dono_mensagem == conversa._id) {

                return array_chat[i].mensagem;
            };

            if(array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == conversa._id) {

                return array_chat[i].mensagem;
            };
        };
    };

    return (

        <div className={styles["container_inicio_chat"]}>
            <aside className={styles["container_fundo_barra_lateral"]}>
                <div className={styles["container_barra_lateral"]}>
                    <div className={styles["container_logo_barra_lateral"]}>
                        <img src="./img/logo/logo-verdeCamadinha.svg" alt="" />
                    </div>
                    <nav className={styles["container_botoes_barra_lateral"]}>
                        <button><img src={perfil_botao} alt='perfil' /></button>
                        <button><img src={conversas_botao} alt='conversas' /></button>
                        <button><img src={grupos_botao} alt='grupos' /></button>
                    </nav>
                    <div className={styles["container_sair_barra_lateral"]}>
                        <button><img src={"./img/icons/chat_sair.svg"} alt="sair" /></button>
                    </div>
                </div>
            </aside>
            <section className={styles["container_section_chat"]}>
                <header className={styles["container_header_section_chat"]}>
                    <h2>Conversas</h2>
                    <div className={styles["container_section_chat_input"]}>
                        <img src="./img/LupaIcon.svg" alt="" />
                        <input type="text" placeholder="Procurar por Conversa" />
                    </div>
                </header>
                <section className={styles["container_conversas"]}>
                    {usuario_logado.conversas ? usuario_logado.conversas.map((conversa, i) => (

                        <div key={i} className={styles["container_conversa"]}>
                            <aside>
                                <img src={conversa.imagem_de_perfil || conversa.logo} alt="" />
                            </aside>
                            <section className={styles["container_conversa_info"]}>
                                <h5>{conversa.nome || conversa.nome_brecho}</h5>
                                <span>{buscar_ultima_mensagem(conversa)}</span>
                            </section>
                        </div>
                    )) :
                        <div className={styles["container_nenhuma_convesa"]}>
                            <img src="./img/icons/chat_nenhuma_conversa.svg" alt="balão" />
                            <p>Tentamos procurar por conversas mas parece que não conseguimos encontrar nenhuma conversa!</p>
                        </div>}
                </section>
            </section>
        </div>

    )
};