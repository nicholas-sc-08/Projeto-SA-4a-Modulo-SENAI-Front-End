"use client";

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { buscar_brechos } from "@/services/brecho/brecho";
import { buscar_conversas, cadastrar_conversa } from "@/services/chat/chat";
import { useGlobalContext } from "@/context/GlobalContext";
import { buscar_clientes } from "@/services/cliente/cliente";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { buscar_ultima_mensagem } from "@/services/chat/chat";
import { nova_mensagem } from "@/services/chat/chat";
import styles from "@/app/chat/page.module.css";
import socket from "@/services/socket";

export default function chat() {

    const [perfil_botao, set_perfil_botao] = useState("./img/chat/chat_perfil.svg");
    const [conversas_botao, set_conversas_botao] = useState("./img/chat/chat_conversas.svg");
    const [grupos_botao, set_grupos_botao] = useState("./img/chat/chat_grupos.svg");
    const [conversa_atual, set_conversa_atual] = useState(null);
    const [pesquisa_inpt, set_pesquisa_inpt] = useState("");
    const [mensagem_enviar, set_mensagem_enviar] = useState("");
    const [array_de_pesquisa, set_array_de_pesquisa] = useState([]);
    const [contato, set_contato] = useState();
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { array_chat, set_array_chat } = useGlobalContext();
    const { array_clientes, set_array_clientes } = useGlobalContext();
    const { secao_chat, set_secao_chat } = useGlobalContext();
    const { usuario_logado, set_usuario_logado } = useGlobalContext();  
    const dia_de_hoje = Date.now();

    useEffect(() => {

        buscar_brechos().then(data => set_array_brechos(data));
        buscar_conversas().then(mensagem => set_array_chat(mensagem));
        buscar_clientes().then(data => set_array_clientes(data));

        socket.connect();
        socket.on("receber_mensagem", mensagem => set_conversa_atual(mensagens_anteriores => [...mensagens_anteriores, mensagem]));
        
        return () => {

            socket.off("receber_mensagem");
        };
    }, []);

    useEffect(() => {

        if (pesquisa_inpt == "") {

            set_array_de_pesquisa(usuario_logado.conversas);
        } else {

            const filtrar_conversas = usuario_logado.conversas.filter(conversa => conversa.nome_brecho.trim(` `).toUpperCase().includes(pesquisa_inpt.trim(` `).toUpperCase()));
            set_array_de_pesquisa(filtrar_conversas);
        };

    }, [pesquisa_inpt]);

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
                        <button onClick={() => router.push("/")}><img src={"./img/chat/chat_sair.svg"} alt="sair" /></button>
                    </div>
                </div>
            </aside>
            <section className={styles["container_section_chat"]}>
                <header className={styles["container_header_section_chat"]}>
                    <h2>Conversas</h2>
                    <div className={styles["container_section_chat_input"]}>
                        <img src="./img/LupaIcon.svg" alt="" />
                        <input type="text" placeholder="Procurar por Conversa" value={pesquisa_inpt} onChange={e => set_pesquisa_inpt(e.target.value)} />
                    </div>
                    <span>Recentes({array_de_pesquisa ? (array_de_pesquisa.length) : 0})</span>
                </header>
                <section className={styles["container_conversas"]}>
                    {array_de_pesquisa && array_de_pesquisa.length > 0 ? array_de_pesquisa.map((conversa, i) => (

                        <div key={i} className={styles["container_conversa"]} onClick={() => selecionar_conversa(conversa._id)}>
                            <aside>
                                <img src={conversa.imagem_de_perfil || conversa.logo} alt="" />
                            </aside>
                            <section className={styles["container_contato_info"]}>
                                <h5>{conversa.nome || conversa.nome_brecho}</h5>
                                <span>{buscar_ultima_mensagem(conversa._id, array_chat, usuario_logado)}</span>
                            </section>
                        </div>
                    )) :
                        <div className={styles["container_nenhuma_convesa"]}>
                            <img src="./img/chat/chat_nenhuma_conversa.svg" alt="balão" />
                            <p>Tentamos procurar por conversas mas parece que não conseguimos encontrar nenhuma conversa!</p>
                        </div>}
                </section>
            </section>
            {contato ?
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className={styles["container_principal"]}>
                        <header className={styles["container_header_da_conversa"]}>
                            <div className={styles["container_header_imagem"]}>
                                <img src={contato.imagem_de_perfil || contato.logo} alt="" />
                            </div>
                            <div className={styles["container_header_nome"]}>
                                <h3>{contato.nome || contato.nome_brecho}</h3>
                            </div>
                            <div className={styles["container_header_botao"]}>
                                <button><img src={"./img/chat/chat_opcoes.svg"} alt="botão" /></button>
                            </div>
                        </header>

                        <main className={styles["container_mensagens"]}>
                            <div className={styles["container_mensagens_exibidas"]}>
                                {conversa_atual && conversa_atual.length > 0 ? conversa_atual.map((_, i) => (

                                    <div key={i} className={styles["container_historico_de_mensagens"]}>
                                        
                                    </div>
                                )) : ``}
                            </div>
                            <footer className={styles["container_menu_interacao_conversa"]}>
                                <div className={styles["container_menu_inpt_conversa"]}>
                                    <input type="text" placeholder="Digite sua Mensagem..." value={mensagem_enviar} onChange={e => set_mensagem_enviar(e.target.value)} />
                                </div>
                                <div className={styles["container_menu_alinhamento_botoes"]}>
                                    <button className={styles["botao_menu_clipes"]}><img src="./img/chat/chat_clipe_de_papel.svg" alt="clipes" /></button>
                                    <button className={styles["botao_menu_sorriso"]}><img src="./img/chat/chat_sorriso.svg" alt="sorriso" /></button>
                                    <button className={styles["botao_menu_enviar"]} onClick={() => mensagem_enviar.trim() ? cadastrar_conversa({ mensagem: mensagem_enviar, id_dono_mensagem: usuario_logado._id, id_quem_recebeu_mensagem: contato._id, data_mensagem: dia_de_hoje, mensagem_lida_quem_recebeu: false, hora: `${dia_de_hoje.getHours() < 10 ? `0${dia_de_hoje.getHours()}` : dia_de_hoje.getHours()}:${dia_de_hoje.getMinutes() < 10 ? `0${dia_de_hoje.getMinutes()}` : dia_de_hoje.getMinutes()}` }).then((mensagem) => set_conversa_atual([...conversa_atual, mensagem]

                                    )) : alert("insira uma informação")}><img src="./img/chat/chat_enviar.svg" alt="enviar" /></button>
                                </div>
                            </footer>
                        </main>
                    </motion.div>
                </AnimatePresence>
                : <div className={styles["container_nenhum_contato_selecionado"]}>
                    <img src="./img/chat/chat_perfil.svg" alt="" />
                    <span>Procure adicionar algum contato para poder iniciar uma conversa!</span>
                </div>
            }
        </div>

    )
};