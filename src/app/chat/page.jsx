"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { buscar_brechos } from "@/services/brecho/brecho";
import { buscar_conversas } from "@/services/chat/chat";
import styles from "@/app/chat/page.module.css";
import { useGlobalContext } from "@/context/GlobalContext";
import { buscar_clientes } from "@/services/cliente/cliente";

export default function chat() {

    const [perfil_botao, set_perfil_botao] = useState("./img/icons/chat_perfil.svg");
    const [conversas_botao, set_conversas_botao] = useState("./img/icons/chat_conversas.svg");
    const [grupos_botao, set_grupos_botao] = useState("./img/icons/chat_grupos.svg");
    const [conversa_atual, set_conversa_atual] = useState(null);
    const [contato, set_contato] = useState();
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { array_chat, set_array_chat } = useGlobalContext();
    const { array_clientes, set_array_clientes} = useGlobalContext();
    const { secao_chat, set_secao_chat } = useGlobalContext();
    const { usuario_logado, set_usuario_logado } = useGlobalContext();

    useEffect(() => {

        buscar_brechos().then(data => set_array_brechos(data));
        buscar_conversas().then(mensagem => set_array_chat(mensagem));
        buscar_clientes().then(data => set_array_clientes(data));
    }, []);

    function buscar_ultima_mensagem(_id) {

        for (let i = array_chat.length - 1; i >= 0; i--) {

            if (array_chat[i].id_dono_mensagem == _id && usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem) {

                return array_chat[i].mensagem;
            };

            if (array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == _id) {

                return array_chat[i].mensagem;
            };

        };

        return `Nenhuma mensagem`;
    };

    function selecionar_conversa(id) {

        const pessoa_selecionada = array_clientes.find(cliente => cliente._id == id);
        const brecho_selecionado = array_brechos.find(brecho => brecho._id == id);

        if (pessoa_selecionada != null) {

            set_contato(pessoa_selecionada);

            if (array_chat.length != 0) {

                const mensagens_filtradas_cliente_com_brecho = array_chat.filter(mensagem => {

                    return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == pessoa_selecionada._id || mensagem.id_dono_mensagem == pessoa_selecionada._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id;
                });

                set_conversa_atual(mensagens_filtradas_cliente_com_brecho);
            };
        };

        if (brecho_selecionado != null) {

            set_contato(brecho_selecionado);

            if (array_chat.length != 0) {

                const mensagens_filtradas_brecho_com_cliente = array_chat.filter(mensagem => {

                    return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == brecho_selecionado._id || mensagem.id_dono_mensagem == brecho_selecionado._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id;
                });

                set_conversa_atual(mensagens_filtradas_brecho_com_cliente);
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

                        <div key={i} className={styles["container_conversa"]} onClick={() => selecionar_conversa(conversa._id)}>
                            <aside>
                                <img src={conversa.imagem_de_perfil || conversa.logo} alt="" />
                            </aside>
                            <section className={styles["container_contato_info"]}>
                                <h5>{conversa.nome || conversa.nome_brecho}</h5>
                                <span>{buscar_ultima_mensagem(conversa._id)}</span>
                            </section>
                        </div>
                    )) :
                        <div className={styles["container_nenhuma_convesa"]}>
                            <img src="./img/icons/chat_nenhuma_conversa.svg" alt="balão" />
                            <p>Tentamos procurar por conversas mas parece que não conseguimos encontrar nenhuma conversa!</p>
                        </div>}
                </section>
            </section>
            { contato ?
                <section className={styles["container_principal"]}>
                <header className={styles["container_header_da_conversa"]}>
                    <div className={styles["container_header_imagem"]}>
                        <img src={contato.imagem_de_perfil || contato.logo} alt="" />
                    </div>
                    <div className={styles["container_header_nome"]}>
                        <h3>{contato.nome || contato.nome_brecho}</h3>
                    </div>
                    <div className={styles["container_header_botao"]}>
                        <button><img src={"./img/icons/chat_opcoes.svg"} alt="botão"/></button>
                    </div>
                </header>
            </section>
            : <div className={styles["container_nenhum_contato_selecionado"]}>
                <img src="./img/icons/chat_perfil.svg" alt="" />
                <span>Procure adicionar algum contato para poder iniciar uma conversa!</span>
            </div>
            }
        </div>

    )
};