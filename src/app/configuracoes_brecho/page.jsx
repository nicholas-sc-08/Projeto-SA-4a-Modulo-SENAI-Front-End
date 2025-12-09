"use client";

import React, { useState, useEffect } from "react";
import styles from "@/app/configuracoes_brecho/page.module.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Meu_perfil from "@/components/opcoes_configuracoes/meu_perfil/Meu_perfil";
import Redes_sociais from "@/components/opcoes_configuracoes/redes_sociais/Redes_sociais";
import Meus_pedidos from "@/components/opcoes_configuracoes/meus_pedidos/Meus_pedidos";
import Pop_up_confirmacao_excluir_conta from "@/components/pop_up_confirmacao_excluir_conta/Pop_up_confirmacao_excluir_conta";
import Pop_up_confirmacao_sair_da_conta from "@/components/pop_up_confirmacao_sair_da_conta/Pop_up_confirmacao_sair_da_conta";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";
import api from "@/services/api";

function Page() {
    const { secaoAtiva, setSecaoAtiva } = useGlobalContext();
    const { usuario_logado, set_usuario_logado } = useGlobalContext();
    const { brecho_selecionado, set_brecho_selecionado } = useGlobalContext();
    const { array_brechos } = useGlobalContext();
    const { tipo_de_header, set_tipo_de_header } = useGlobalContext();

    const { popupExcluirAberto, setPopupExcluirAberto } = useGlobalContext();
    const { popupSairAberto, setPopupSairAberto } = useGlobalContext();

    const router = useRouter();

    // Estados para armazenar os dados do brechó
    const [dadosBrecho, setDadosBrecho] = useState(null);
    const [endereco, setEndereco] = useState(null);
    const [loading, setLoading] = useState(true);

    // ============================
    // 🔵 BUSCAR DADOS DO BRECHÓ
    // ============================
    async function buscarDadosBrecho() {
        try {
            if (!usuario_logado?._id) return;

            const response = await api.get(`/brechos/${usuario_logado._id}`);
            const data = response.data;

            console.log('✅ Dados do brechó:', data);
            setDadosBrecho(data);

        } catch (erro) {
            console.error('❌ Erro ao buscar dados do brechó:', erro);
        }
    }

    // ============================
    // 🔵 BUSCAR ENDEREÇO DO BRECHÓ
    // ============================
    async function buscarEndereco() {
        try {
            if (!usuario_logado?._id) return;

            const response = await api.get(`/enderecos`, {
                params: { fk_id_brecho: usuario_logado._id }
            });

            console.log('📍 Resposta do endereço:', response?.data);

            if (response && response.data) {
                let enderecoEncontrado = null;

                if (Array.isArray(response.data)) {
                    enderecoEncontrado = response.data.find(e => e.fk_id_brecho === usuario_logado._id);
                } else if (response.data._id) {
                    enderecoEncontrado = response.data;
                }

                if (enderecoEncontrado) {
                    console.log('✅ Endereço encontrado:', enderecoEncontrado);
                    setEndereco(enderecoEncontrado);
                }
            }
        } catch (erro) {
            console.error('❌ Erro ao buscar endereço:', erro);
        }
    }

    // ============================
    // CARREGAR DADOS AO MONTAR
    // ============================
    useEffect(() => {
        const carregarDados = async () => {
            if (usuario_logado && usuario_logado._id) {
                const isBrecho = array_brechos.some(b => b._id === usuario_logado._id);

                if (isBrecho) {
                    setLoading(true);
                    await buscarDadosBrecho();
                    await buscarEndereco();
                    setLoading(false);
                } else {
                    setLoading(false);
                }
            }
        };

        carregarDados();
    }, [usuario_logado, array_brechos]);

    // ============================
    // DEFINIR O TIPO DE HEADER
    // ============================
    useEffect(() => {
        const encontrar_brecho = array_brechos.find(
            (brecho) => brecho._id === usuario_logado._id
        );
        set_tipo_de_header(encontrar_brecho ? "brecho" : "usuario");
    }, [usuario_logado, array_brechos]);

    // ============================
    // NAVEGAR ATÉ PERFIL DO BRECHÓ
    // ============================
    function ir_ate_perfil() {
        const encontrar_brecho = array_brechos.find(
            (brecho) => brecho._id === usuario_logado._id
        );

        set_brecho_selecionado(usuario_logado);

        if (encontrar_brecho) {
            router.push(`/perfil_brecho`);
        } else {
            router.push(`/estamos_chegando`);
        }
    }

    // ============================
    // FORMATAR DATA
    // ============================
    const formatarData = (data) => {
        if (!data) return '';
        const date = new Date(data);
        return date.toLocaleDateString('pt-BR');
    };

    // ============================
    // RENDERIZAÇÃO DAS SEÇÕES
    // ============================
    const renderizarConteudo = () => {
        switch (secaoAtiva) {
            case "meu-perfil":
                return <Meu_perfil />;
            case "redes-sociais":
                return <Redes_sociais />;
            case "meus-pedidos":
                return <Meus_pedidos />;
            case "saiba-mais":
                return <div>Componente Saiba Mais</div>;
            case "ajuda-faq":
                return <div>Componente Ajuda (FAQ)</div>;
            default:
                return <Meu_perfil />;
        }
    };

    if (loading) {
        return (
            <div>
                <Header tipo={tipo_de_header} />
                <div className={styles["config-container"]}>
                    <p>Carregando...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header tipo={tipo_de_header} />

            <div className={styles["config-container"]}>
                {/* ============================
                    MENU LATERAL
                ============================ */}
                <div className={styles["menu-lateral"]}>
                    <div className={styles["escolha-config"]}>
                        <div className={styles["ir-para-perfil"]}>
                            <div className={styles["perfil-top"]}>
                                <img
                                    src={dadosBrecho?.logo || "./img/fotoPerfil.png"}
                                    alt="Logo do brechó"
                                />

                                <div className={styles["container-informacoes-ir-para-perfil"]}>
                                    <h4>{dadosBrecho?.nome_brecho || "Nome do Brechó"}</h4>
                                    <p>No Fly desde: {formatarData(dadosBrecho?.createdAt)}</p>
                                </div>
                            </div>

                            <button onClick={() => ir_ate_perfil()}>
                                Ir para perfil
                            </button>
                        </div>

                        <div className={styles["line-config"]}></div>
                    </div>

                    <div className={styles["conteudo-config"]}>
                        <button
                            className={
                                secaoAtiva === "meu-perfil" ? styles["ativo"] : ""
                            }
                            onClick={() => setSecaoAtiva("meu-perfil")}
                        >
                            Meu perfil
                        </button>

                        <button
                            className={
                                secaoAtiva === "redes-sociais" ? styles["ativo"] : ""
                            }
                            onClick={() => setSecaoAtiva("redes-sociais")}
                        >
                            Sobre o brechó
                        </button>

                        <button
                            className={
                                secaoAtiva === "meus-pedidos" ? styles["ativo"] : ""
                            }
                            onClick={() => setSecaoAtiva("meus-pedidos")}
                        >
                            Meus pedidos
                        </button>

                        <button
                            className={
                                secaoAtiva === "saiba-mais" ? styles["ativo"] : ""
                            }
                            onClick={() => setSecaoAtiva("saiba-mais")}
                        >
                            Saiba mais
                        </button>

                        <button
                            className={
                                secaoAtiva === "ajuda-faq" ? styles["ativo"] : ""
                            }
                            onClick={() => setSecaoAtiva("ajuda-faq")}
                        >
                            Ajuda (FAQ)
                        </button>
                    </div>

                    {/* ============================
                        BOTÕES PERIGOSOS
                    ============================ */}
                    <div className={styles["container-escolhas-perigosas"]}>
                        <div className={styles["container-sair-da-conta"]}>
                            <button onClick={() => setPopupSairAberto(true)}>
                                <img
                                    src="./img/icons/logout-marrom.svg"
                                    alt=""
                                />
                                Sair da conta
                            </button>
                            <p>encerrando atividades online, nos vemos em breve</p>
                        </div>

                        <div className={styles["container-excluir-conta"]}>
                            <button onClick={() => setPopupExcluirAberto(true)}>
                                <img src="./img/icons/lixeira.svg" alt="" />
                                Excluir minha conta
                            </button>
                            <p>esta ação não pode ser desfeita</p>
                        </div>
                    </div>
                </div>

                <div className={styles["conteudo-dinamico"]}>
                    {renderizarConteudo()}
                </div>

                {popupExcluirAberto && <Pop_up_confirmacao_excluir_conta />}
                {popupSairAberto && <Pop_up_confirmacao_sair_da_conta />}
            </div>

            <Footer />
        </div>
    );
}

export default Page;