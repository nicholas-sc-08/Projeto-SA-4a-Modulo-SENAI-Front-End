"use client";

import React from "react";
import ReactMarkDown from "react-markdown";
import EmojiPicker from "emoji-picker-react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { buscar_brechos } from "@/services/brecho/brecho";
import { buscar_conversas } from "@/services/chat/chat";
import { useGlobalContext } from "@/context/GlobalContext";
import { buscar_clientes } from "@/services/cliente/cliente";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import { buscar_ultima_mensagem } from "@/services/chat/chat";
import api from "@/services/api";
import styles from "@/app/chat/page.module.css";
import socket from "@/services/socket";

export default function chat() {

    const ref_final_conversa = useRef(null);
    const [estado_emoji, set_estado_emoji] = useState(false);
    const [perfil_botao, set_perfil_botao] = useState("./img/chat/chat_perfil.svg");
    const [conversas_botao, set_conversas_botao] = useState("./img/chat/chat_conversas.svg");
    const [titulo, set_titulo] = useState("");
    const [assistente_fly, set_assistente_fly] = useState({ id: "assistente", nome: "Assistente Fly", imagem_de_perfil: "./img/icons/gemini-icon.webp" });
    const [grupos_botao, set_grupos_botao] = useState("./img/chat/chat_grupos.svg");
    const [conversa_atual, set_conversa_atual] = useState(null);
    const [pesquisa_inpt, set_pesquisa_inpt] = useState("");
    const [mensagem_enviar, set_mensagem_enviar] = useState("");
    const [enviar_enter, set_enviar_mensagem] = useState(null);
    const [array_de_pesquisa, set_array_de_pesquisa] = useState([]);
    const [contato, set_contato] = useState();
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { array_chat, set_array_chat } = useGlobalContext();
    const { array_clientes, set_array_clientes } = useGlobalContext();
    const { secao_chat, set_secao_chat } = useGlobalContext();
    const { usuario_logado, set_usuario_logado } = useGlobalContext();
    const dia_de_hoje = new Date();

    useEffect(() => {

        buscar_brechos().then(data => set_array_brechos(data));
        buscar_conversas().then(mensagem => set_array_chat(mensagem));
        buscar_clientes().then(data => set_array_clientes(data));

        if (ref_final_conversa.current) {

            ref_final_conversa.current.scrollIntoView({ behavior: "smooth" });
        };

        socket.connect();

        function nova_mensagem(mensagem) {

            set_conversa_atual(mensagens_anteriores => [...mensagens_anteriores, mensagem])
        };

        socket.on("receber_mensagem", nova_mensagem);

        return () => {

            socket.off("receber_mensagem");

        };
    }, []);

    useEffect(() => {

        if (secao_chat == "conversas") {

            set_titulo("Conversas");
        } else if (secao_chat == "perfil") {

            set_titulo("Meu Perfil");
        } else {

            set_titulo("Grupos");
        };

    }, [secao_chat]);

    useEffect(() => {
        if (usuario_logado && usuario_logado.conversas) {
            set_array_de_pesquisa(usuario_logado.conversas);
        }
    }, [usuario_logado, array_chat]);

    useEffect(() => {

        if (pesquisa_inpt == "") {

            set_array_de_pesquisa(usuario_logado.conversas);
        } else {

            const cliente = array_clientes.find(cliente => cliente._id == usuario_logado._id);

            if (cliente) {

                const filtrar_conversas = usuario_logado.conversas.filter(conversa => conversa.nome_brecho.trim(``).toUpperCase().includes(pesquisa_inpt.trim(``).toUpperCase()));
                set_array_de_pesquisa(filtrar_conversas);
            } else {

                const filtrar_conversas = usuario_logado.conversas.filter(conversa => conversa.nome.trim(``).toUpperCase().includes(pesquisa_inpt.trim(``).toUpperCase()));
                set_array_de_pesquisa(filtrar_conversas);
            };
        };

    }, [pesquisa_inpt]);

    function botao_emoji(emoji_object) {

        set_mensagem_enviar(`${mensagem_enviar} ${emoji_object.emoji}`);
    };

    async function cadastrar_conversa() {

        try {

            if (contato.id === "assistente") {

                set_enviar_mensagem("");
                const resposta = await api.post("/gemini/ai/generate", { prompt: mensagem_enviar });

                const mensagem = {
                    mensagem: resposta.data,
                    id_dono_mensagem: "assistente",
                    id_quem_recebeu_mensagem: usuario_logado._id,
                    data_mensagem: dia_de_hoje,
                    mensagem_lida_quem_recebeu: false,
                    hora: `${dia_de_hoje.getHours() < 10 ? `0${dia_de_hoje.getHours()}` : dia_de_hoje.getHours()}:${dia_de_hoje.getMinutes() < 10 ? `0${dia_de_hoje.getMinutes()}` : dia_de_hoje.getMinutes()}`
                };

                const chat = await api.post(`/chats`, mensagem);
                set_conversa_atual([...conversa_atual, chat.data]);
                return;
            };

            const mensagem = {
                mensagem: mensagem_enviar,
                id_dono_mensagem: usuario_logado._id,
                id_quem_recebeu_mensagem: contato._id,
                data_mensagem: dia_de_hoje,
                mensagem_lida_quem_recebeu: false,
                hora: `${dia_de_hoje.getHours() < 10 ? `0${dia_de_hoje.getHours()}` : dia_de_hoje.getHours()}:${dia_de_hoje.getMinutes() < 10 ? `0${dia_de_hoje.getMinutes()}` : dia_de_hoje.getMinutes()}`
            };

            const resposta = await api.post(`/chats`, mensagem);
            set_conversa_atual([...conversa_atual, resposta]);
            socket.emit("enviar_mensagem", resposta);
            set_mensagem_enviar("");

        } catch (erro) {

            console.error(erro);
            throw new Error("Erro axios ao cadastrar a mensagem!");
        };
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
                return;
            };
        };

        if (brecho_selecionado != null) {

            set_contato(brecho_selecionado);

            if (array_chat.length != 0) {

                const mensagens_filtradas_brecho_com_cliente = array_chat.filter(mensagem => {

                    return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == brecho_selecionado._id || mensagem.id_dono_mensagem == brecho_selecionado._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id;
                });

                set_conversa_atual(mensagens_filtradas_brecho_com_cliente);
                return;
            };
        };

        if (id == "assistente") {

            set_contato(assistente_fly);

            if (array_chat.length != 0) {

                const mensagens_assistente = array_chat.filter(mensagem => {

                    return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == assistente_fly._id || mensagem.id_dono_mensagem == assistente_fly._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id;
                });

                set_conversa_atual(mensagens_assistente);
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
                        <button onClick={() => set_secao_chat("perfil")}><img src={perfil_botao} alt='perfil' /></button>
                        <button onClick={() => set_secao_chat("conversas")}><img src={conversas_botao} alt='conversas' /></button>
                        <button onClick={() => set_secao_chat("grupos")}><img src={grupos_botao} alt='grupos' /></button>
                    </nav>
                    <div className={styles["container_sair_barra_lateral"]}>
                        <button onClick={() => router.push("/")}><img src={"./img/chat/chat_sair.svg"} alt="sair" /></button>
                    </div>
                </div>
            </aside>
            <section className={styles["container_section_chat"]}>
                {secao_chat == "conversas" ?
                    <header className={styles["container_header_section_chat"]}>
                        <h2>{titulo}</h2>
                        {secao_chat == "conversas" ?

                            <div className={styles["container_section_chat_input"]}>
                                <img src="./img/LupaIcon.svg" alt="" />
                                <input type="text" placeholder="Procurar por Conversa" value={pesquisa_inpt} onChange={e => set_pesquisa_inpt(e.target.value)} />
                            </div>
                            : ""}
                        {secao_chat == "conversas" ?

                            <span>Recentes({array_de_pesquisa ? (array_de_pesquisa.length + 1) : 1})</span>
                            : ""}
                    </header>
                    : ""}
                {secao_chat == "perfil" ?
                    <AnimatePresence>
                        <motion.div className={styles["container_secao_perfil"]} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                            <h2>{titulo}</h2>
                            <div className={styles["container_secao_perfil_imagem"]}>
                                <img src={usuario_logado.imagem_de_perfil ? usuario_logado.imagem_de_perfil : usuario_logado.logo} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" />
                            </div>
                            <div className={styles["container_secao_perfil_conteudo"]}>
                                <h3>{usuario_logado.nome_brecho ? usuario_logado.nome_brecho : usuario_logado.nome}</h3>
                                <p>Um brechó é um estabelecimento comercial, físico ou online, que vende artigos usados, como roupas, calçados, acessórios, livros, objetos de decoração e outros itens. A prática de comprar e vender artigos usados tem ganhado popularidade devido a fatores como a busca por preços mais acessíveis, a preocupação com a sustentabilidade e a valorização de peças únicas e com história. </p>
                            </div>
                            <div className={styles["container_secao_perfil_info"]}>
                                <div className={styles["container_secao_perfil_info_nome"]}>
                                    <h5>Nome:</h5>
                                    <span>{usuario_logado.nome_brecho ? usuario_logado.nome_brecho : usuario_logado.nome}</span>
                                </div>
                                <div className={styles["container_secao_perfil_info_email"]}>
                                    <h5>Email:</h5>
                                    <span>{usuario_logado.email}</span>
                                </div>
                                <div className={styles["container_secao_perfil_info_telefone"]}>
                                    <h5>Telefone:</h5>
                                    <span>{usuario_logado.telefone || "-"}</span>
                                </div>
                            </div>
                            <div className={styles["container_secao_perfil_botao"]}>
                                <button>Visualizar Perfil Completo</button>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                    : ""}
                {secao_chat == "conversas" ?
                    <AnimatePresence>
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className={styles["container_conversas"]}>
                            <div className={styles["container_conversa"]} onClick={() => selecionar_conversa("assistente")}>
                                <aside>
                                    <img src={assistente_fly.imagem_de_perfil} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" />
                                </aside>
                                <section className={styles["container_contato_info"]}>
                                    <h5>{assistente_fly.nome}</h5>
                                    <span>Converse com o Assistente da Fly para tirar suas dúvidas!</span>
                                </section>
                            </div>

                            {array_de_pesquisa && array_de_pesquisa.length > 0 ? array_de_pesquisa.map((conversa, i) => (

                                <div key={i} className={styles["container_conversa"]} onClick={() => selecionar_conversa(conversa._id)}>
                                    <aside>
                                        <img src={conversa.imagem_de_perfil || conversa.logo} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" />
                                    </aside>
                                    <section className={styles["container_contato_info"]}>
                                        <h5>{conversa.nome || conversa.nome_brecho}</h5>
                                        <span>{buscar_ultima_mensagem(conversa._id, array_chat, usuario_logado)}</span>
                                    </section>
                                </div>
                            )) :""
                                }
                        </motion.div>
                    </AnimatePresence>
                    : ""}
            </section>
            {contato ?
                <AnimatePresence>
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className={styles["container_principal"]}>
                        <header className={styles["container_header_da_conversa"]}>
                            <div className={styles["container_header_imagem"]}>
                                <img src={contato.imagem_de_perfil || contato.logo} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" />
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
                                        {_.id_dono_mensagem == usuario_logado._id ?
                                            <AnimatePresence>
                                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className={styles["container_fundo_mensagem_dono"]}>
                                                    <div className={styles["mensagem_dono"]}>
                                                        <ReactMarkDown>{_.mensagem}</ReactMarkDown>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence> :
                                            <AnimatePresence>
                                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className={styles["container_fundo_mensagem_recebedor"]}>
                                                    <div className={styles["mensagem_recebedor"]}>
                                                        <ReactMarkDown>{_.mensagem}</ReactMarkDown>
                                                    </div>
                                                </motion.div>
                                            </AnimatePresence>
                                        }
                                    </div>
                                )) : ``}
                            </div>
                            <div ref={ref_final_conversa}></div>
                            {estado_emoji && (<motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} style={{ position: "absolute", top: 100, right: 1, zIndex: 10 }}><EmojiPicker onEmojiClick={botao_emoji} /></motion.div>)}
                            <footer className={styles["container_menu_interacao_conversa"]}>
                                <div className={styles["container_menu_inpt_conversa"]}>
                                    <input type="text" placeholder="Digite sua Mensagem..." value={mensagem_enviar} onChange={e => set_mensagem_enviar(e.target.value)} onKeyDown={e => e.key == "Enter" ? cadastrar_conversa() : ""} />
                                </div>
                                <div className={styles["container_menu_alinhamento_botoes"]}>
                                    <button className={styles["botao_menu_clipes"]}><img src="./img/chat/chat_clipe_de_papel.svg" alt="clipes" /></button>
                                    <button className={styles["botao_menu_sorriso"]} onClick={() => set_estado_emoji(!estado_emoji)} aria-expanded={estado_emoji}><img src="./img/chat/chat_sorriso.svg" alt="sorriso" /></button>
                                    <button className={styles["botao_menu_enviar"]} onClick={() => cadastrar_conversa()}><img src="./img/chat/chat_enviar.svg" alt="enviar" /></button>
                                </div>
                            </footer>
                        </main>
                    </motion.div>
                </AnimatePresence>
                : ""
            }
        </div>

    )
};