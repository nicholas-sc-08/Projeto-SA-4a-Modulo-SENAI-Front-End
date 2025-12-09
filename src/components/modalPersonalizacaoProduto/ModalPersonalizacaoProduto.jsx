"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Minus } from "lucide-react";
import styles from "./ModalPersonalizacaoProduto.module.css";
import api from "@/services/api";
import { useGlobalContext } from "@/context/GlobalContext";
import { buscar_sacolas_brechos } from "@/services/sacolas_brechos/sacolas_brecho";
import { useRouter } from "next/navigation";

const ModalPersonalizacaoProdutos = ({ isOpen, onClose }) => {
    const { usuario_logado, set_array_sacola_brecho } = useGlobalContext();
    const [fase, setFase] = useState(1); // 1: escolha, 2: personalização
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState(1);
    const [imagemAtual, setImagemAtual] = useState("");
    const router = useRouter();

    const [selecoes, setSelecoes] = useState({
        material: "",
        tamanho: "",
        padrao: "",
        cor_corpo: "",
        cor_alca: "",
        cor_detalhes: "",
    });

    // Traduções
    const traducaoPadroes = {
        logo_fly: "Logo da Fly",
        logo_fly_nome: "Logo da Fly e Nome",
        logo_fly_embaixo: "Logo da Fly embaixo",
        sem_logo: "Sem Logo",
    };

    const traducaoCores = {
        amarelo: "Amarelo",
        verde: "Verde",
        areia: "Areia",
        branco: "Branco",
    };

    const traducaoMaterial = {
        algodao: "Algodão",
        poliester_reciclavel: "Poliéster Reciclável",
        plastico_biodegradavel: "Plástico Biodegradável",
        papel_kraft: "Papel Kraft",
        papelao_reciclavel: "Papelão Reciclável",
    };

    const traducaoTamanho = {
        pequeno: "Pequeno",
        medio: "Médio",
        grande: "Grande",
    };

    const traducaoNomeProduto = {
        ecobag: "Ecobag",
        sacola: "Sacola",
        caixa: "Caixa Kraft",
    };

    // Configuração dos produtos
    const produtos_config = {
        ecobag: {
            nome: "ecobag",
            preco: 5.47,
            imagem: "/img/produtos_personalizados/ecobaag/padrao/sacola-ecobag-sem-fundo.png",
            descricao:
                "Um kit completo, versátil e cheio de propósito. Com 10 ecobags, você une estilo, praticidade e consciência em cada uso.",
            opcoes: {
                material: ["algodao", "poliester_reciclavel"],
                tamanho: ["medio", "grande"],
                padrao: ["logo_fly", "logo_fly_nome", "logo_fly_embaixo"],
                cor_corpo: ["amarelo", "verde", "areia"],
                cor_alca: ["amarelo", "verde", "areia"],
            },
        },
        sacola: {
            nome: "sacola",
            preco: 0.85,
            imagem: "/img/produtos_personalizados/sacola/sacola-padrao-meio-virada.png",
            descricao:
                "Este kit de 10 sacolas é para você que valoriza moda feita com sentido: reutilizáveis, personalizáveis e amigas do meio ambiente.",
            opcoes: {
                material: ["plastico_biodegradavel", "papel_kraft"],
                tamanho: ["pequeno", "medio", "grande"],
                padrao: ["logo_fly", "logo_fly_nome", "logo_fly_embaixo"],
                cor_corpo: ["verde", "branco"],
                cor_alca: [],
            },
        },
        caixa: {
            nome: "caixa",
            preco: 0.85,
            imagem: "/img/produtos_personalizados/caixa/caixa_normal.svg",
            descricao:
                "Caixas resistentes e elegantes, ideal para embalar seus produtos com cuidado e estilo.",
            opcoes: {
                material: ["papelao_reciclavel"],
                tamanho: ["pequeno", "medio", "grande"],
                padrao: ["logo_fly", "logo_fly_nome", "logo_fly_embaixo"],
                cor_corpo: [],
                cor_detalhes: [],
            },
        },
    };

    const produto_atual = produtoSelecionado ? produtos_config[produtoSelecionado] : null;

    // Resetar ao abrir/fechar
    useEffect(() => {
        if (!isOpen) {
            setFase(1);
            setProdutoSelecionado(null);
            setQuantidade(1);
            setSelecoes({
                material: "",
                tamanho: "",
                padrao: "",
                cor_corpo: "",
                cor_alca: "",
                cor_detalhes: "",
            });
        }
    }, [isOpen]);

    // Atualizar imagem ao selecionar produto
    useEffect(() => {
        if (produto_atual) {
            setImagemAtual(produto_atual.imagem);
        }
    }, [produtoSelecionado]);

    // Função para atualizar imagem dinamicamente
    const atualizarImagemDinamica = (selecaoAtual) => {
        const cor = selecaoAtual.cor_corpo?.toLowerCase();
        const padrao = selecaoAtual.padrao;
        const alca = selecaoAtual.cor_alca?.toLowerCase();

        switch (produtoSelecionado) {
            case "ecobag":
                switch (true) {
                    case cor === "amarelo" && alca === "amarelo" && padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarela-logo-meio.png");
                        break;
                    case cor === "amarelo" && alca === "amarelo" && padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-nome-em-baixo.png");
                        break;
                    case cor === "amarelo" && alca === "amarelo" && padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-em-baixo.png");
                        break;
                    case cor === "amarelo" && alca === "verde" && padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-meio.png");
                        break;
                    case cor === "amarelo" && alca === "verde" && padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-nome-em-baixo.png");
                        break;
                    case cor === "amarelo" && alca === "verde" && padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-em-baixo.png");
                        break;
                    case cor === "amarelo" && alca === "areia" && padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-meio.png");
                        break;
                    case cor === "amarelo" && alca === "areia" && padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-nome-em-baixo.png");
                        break;
                    case cor === "amarelo" && alca === "areia" && padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-em-baixo.png");
                        break;
                    case cor === "verde" && alca === "amarelo" && padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/verde-amarelo/ecobag-verde-alca-amarela-logo-meio.png");
                        break;
                    case cor === "verde" && alca === "amarelo" && padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/verde-amarelo/ecobag-verde-alca-amarelo-logo-nome-em-baixo.png");
                        break;
                    case cor === "verde" && alca === "amarelo" && padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/verde-amarelo/ecobag-verde-alca-amarela-logo-em-baixo.png");
                        break;
                    case cor === "verde" && alca === "areia" && padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/verde-areia/ecobag-verde-alca-areia-logo-nome-meio.png");
                        break;
                    case cor === "verde" && alca === "areia" && padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/verde-areia/ecobag-verde-alca-areia-logo-nome-em-baixo.png");
                        break;
                    case cor === "verde" && alca === "areia" && padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/verde-areia/ecobag-verde-alca-areia-logo-em-baixo.png");
                        break;
                    case cor === "areia" && alca === "amarelo" && padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-areia-clara-alca-amarela-logo-meio.png");
                        break;
                    case cor === "areia" && alca === "amarelo" && padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-areia-alca-amarelo-logo-nome-em-baixo.png");
                        break;
                    case cor === "areia" && alca === "amarelo" && padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-areia-alca-amarelo-logo-em-baixo.png");
                        break;
                    case cor === "areia" && alca === "verde" && padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-areia-clara-alca-verde-logo-meio.png");
                        break;
                    case cor === "areia" && alca === "verde" && padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-areia-alca-verde-logo-nome-em-baixo.png");
                        break;
                    case cor === "areia" && alca === "verde" && padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-areia-alca-verde-logo-em-baixo.png");
                        break;
                    case cor === "areia" && padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/ecobag-areia-alca-areia-logo-nome-meio.png");
                        break;
                    case cor === "areia" && padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/ecobag-areia-alca-areia-logo-nome-em-baixo.png");
                        break;
                    case cor === "areia" && padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/ecobag-areia-alca-areia-logo-em-baixo.png");
                        break;
                    case cor === "amarelo" && padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarela-logo-meio.png");
                        break;
                    case cor === "amarelo" && padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-nome-em-baixo.png");
                        break;
                    case cor === "amarelo" && padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-em-baixo.png");
                        break;
                    case cor === "verde" && padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/ecobag-verde-alca-verde-logo-meio.png");
                        break;
                    case cor === "verde" && padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/ecobag-verde-alca-verde-logo-nome-em-baixo.png");
                        break;
                    case cor === "verde" && padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/ecobag-verde-alca-verde-logo-em-baixo.png");
                        break;
                    case cor === "amarelo" && alca === "areia":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarela-alca-areia.png");
                        break;
                    case cor === "amarelo" && alca === "verde":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarela-alca-verde.png");
                        break;
                    case cor === "verde" && alca === "areia":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/verde-areia/ecobag-verde-alca-areia-clara.png");
                        break;
                    case cor === "verde" && alca === "amarelo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/verde-amarelo/ecobag-verde-alca-amarela.png");
                        break;
                    case cor === "areia" && alca === "amarelo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-base-areia-clara-alca-amarela.png");
                        break;
                    case cor === "areia" && alca === "verde":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-base-areia-clara-alca-verde.png");
                        break;
                    case cor === "amarelo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-cor-base-amarelo.png");
                        break;
                    case cor === "verde":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/ecobag-cor-base-verde.png");
                        break;
                    case cor === "areia":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/ecobag-cor-base-areia.png");
                        break;
                    case padrao === "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/padrao/ecobag-nome-logo-meio.png");
                        break;
                    case padrao === "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/padrao/ecobag-nome-logo-embaixo.png");
                        break;
                    case padrao === "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/ecobaag/padrao/ecobag-logo.png");
                        break;
                    default:
                        setImagemAtual(produto_atual.imagem);
                }
                break;

            case "sacola":
                if (cor === "verde") {
                    switch (padrao) {
                        case "logo_fly":
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-nome-meio.png");
                            break;
                        case "logo_fly_nome":
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-nome-embaixo.png");
                            break;
                        case "logo_fly_embaixo":
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-embaixo.png");
                            break;
                        default:
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-verde-meio-virada.png");
                    }
                } else if (cor === "branco") {
                    switch (padrao) {
                        case "logo_fly":
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-nome-meio.png.png");
                            break;
                        case "logo_fly_nome":
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-nome-embaixo.png");
                            break;
                        case "logo_fly_embaixo":
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-embaixo.png");
                            break;
                        default:
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-branca-meio-virada.png");
                    }
                } else if (padrao) {
                    switch (padrao) {
                        case "logo_fly":
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-padrao-meio-virada-logo-nome-meio.png");
                            break;
                        case "logo_fly_nome":
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-padrao-meio-virada-logo-nome-embaixo.png");
                            break;
                        case "logo_fly_embaixo":
                            setImagemAtual("/img/produtos_personalizados/sacola/sacola-padrao-meio-virada-logo-embaixo.png");
                            break;
                        default:
                            setImagemAtual(produto_atual.imagem);
                    }
                } else {
                    setImagemAtual(produto_atual.imagem);
                }
                break;

            case "caixa":
                switch (padrao) {
                    case "logo_fly":
                        setImagemAtual("/img/produtos_personalizados/caixa/caixa-meio-virada-logo-embaixo.svg");
                        break;
                    case "logo_fly_nome":
                        setImagemAtual("/img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-emcima.svg");
                        break;
                    case "logo_fly_embaixo":
                        setImagemAtual("/img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-embaixo.svg");
                        break;
                    default:
                        setImagemAtual(produto_atual.imagem);
                }
                break;

            default:
                setImagemAtual(produto_atual.imagem);
        }
    };

    const atualizarSelecao = (tipo, valor) => {
        setSelecoes((prev) => {
            const novasSelecoes = { ...prev, [tipo]: valor };

            if (tipo === "cor_corpo" && prev.cor_alca && prev.cor_alca === valor) {
                novasSelecoes.cor_alca = "";
            }

            if (tipo === "cor_alca" && prev.cor_corpo && prev.cor_corpo === valor) {
                novasSelecoes.cor_corpo = "";
            }

            atualizarImagemDinamica(novasSelecoes);
            return novasSelecoes;
        });
    };

    const selecionarProduto = (tipo) => {
        setProdutoSelecionado(tipo);
        setFase(2);
    };

    const voltarParaEscolha = () => {
        setFase(1);
        setProdutoSelecionado(null);
        setQuantidade(1);
        setSelecoes({
            material: "",
            tamanho: "",
            padrao: "",
            cor_corpo: "",
            cor_alca: "",
            cor_detalhes: "",
        });
    };

    const criarObjetoPedido = () => {
        const objeto = {
            tipo: produtoSelecionado,
            material: selecoes.material,
            padrao: selecoes.padrao,
            tamanho: selecoes.tamanho,
            quantidade: Number(quantidade) || 1,
            valor: Number(produto_atual.preco * quantidade),
            id_brecho: usuario_logado._id,
        };

        if (selecoes.cor_corpo) objeto.cor_corpo = selecoes.cor_corpo;
        if (selecoes.cor_alca) objeto.cor_alca = selecoes.cor_alca;
        if (selecoes.cor_detalhes) objeto.cor_detalhes = selecoes.cor_detalhes;

        return objeto;
    };

    const enviarPedido = async () => {
        const pedido = criarObjetoPedido();

        if (!pedido.material || !pedido.padrao || !pedido.tamanho) {
            alert("Por favor, selecione todas as opções obrigatórias");
            return;
        }

        if (pedido.quantidade < 1) {
            alert("A quantidade deve ser pelo menos 1");
            return;
        }

        try {
            await api.post("/sacolas_brechos", pedido);
            buscar_sacolas_brechos().then((sacolas) => set_array_sacola_brecho(sacolas));

            alert("Produto adicionado à sacola com sucesso!");
            onClose();
            router.push('/sacola_brecho')
        } catch (error) {
            console.error("Erro ao enviar pedido:", error);
            alert(error.response?.data?.message || "Erro ao enviar pedido. Tente novamente.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles["modal-overlay"]} onClick={onClose}>
            <div className={styles["modal-container"]} onClick={(e) => e.stopPropagation()}>
                <button className={styles["btn-fechar"]} onClick={onClose}>
                    <X size={24} />
                </button>

                {/* FASE 1: ESCOLHA DE PRODUTO */}
                {fase === 1 && (
                    <div className={styles["fase-escolha"]}>
                        <div className={styles["header-fase"]}>
                            <div className={styles["numero-fase"]}>1</div>
                            <h2>Escolha o produto ideal</h2>
                        </div>

                        <p className={styles["descricao-fase"]}>
                            Escolha entre materiais 100% recicláveis e biodegradáveis. Cada embalagem conta uma
                            história de sustentabilidade.
                        </p>

                        <div className={styles["grid-produtos"]}>
                            <button
                                className={styles["card-produto-escolha"]}
                                onClick={() => selecionarProduto("caixa")}
                            >
                                <img
                                    src="./img/produtos_personalizados/caixa/caixa_normal.svg"
                                    alt="Caixa Kraft"
                                    className={styles["img-produto-escolha"]}
                                />
                                <div className={styles["info-produto"]}>
                                    <h3>Caixas Kraft</h3>
                                    <p>100% Reciclável</p>
                                </div>
                            </button>

                            <button
                                className={styles["card-produto-escolha"]}
                                onClick={() => selecionarProduto("sacola")}
                            >
                                <img
                                    src="./img/produtos_personalizados/sacola/sacola-padrao-meio-virada.png"
                                    alt="Sacola"
                                    className={styles["img-produto-escolha"]}
                                />
                                <div className={styles["info-produto"]}>
                                    <h3>Sacolas</h3>
                                    <p>100% Reciclável</p>
                                </div>
                            </button>

                            <button
                                className={styles["card-produto-escolha"]}
                                onClick={() => selecionarProduto("ecobag")}
                            >
                                <img
                                    src="./img/produtos_personalizados/ecobaag/padrao/sacola-ecobag-sem-fundo.png"
                                    alt="Ecobag"
                                    className={styles["img-produto-escolha"]}
                                />
                                <div className={styles["info-produto"]}>
                                    <h3>Ecobags</h3>
                                    <p>Tecido Orgânico</p>
                                </div>
                            </button>
                        </div>
                    </div>
                )}

                {/* FASE 2: PERSONALIZAÇÃO */}
                {fase === 2 && produto_atual && (
                    <div className={styles["fase-personalizacao"]}>
                        <div className={styles["header-fase-segunda"]}>
                            <button className={styles["btn-voltar"]} onClick={voltarParaEscolha}>
                                ← Voltar
                            </button>
                            <div className={styles["titulo-fase-wrapper"]}>
                                <div className={styles["numero-fase"]}>2</div>
                                <h2>Personalize do seu jeito</h2>
                            </div>
                        </div>

                        <div className={styles["conteudo-personalizacao"]}>
                            <div className={styles["preview-produto"]}>
                                <img src={imagemAtual} alt={produto_atual.nome} />
                            </div>

                            <div className={styles["opcoes-personalizacao"]}>
                                <div className={styles["info-produto-header"]}>
                                    <h3>{traducaoNomeProduto[produto_atual.nome]}</h3>
                                    <div className={styles["preco-quantidade"]}>
                                        <p className={styles["preco"]}>
                                            R$ {(produto_atual.preco * quantidade).toFixed(2).replace(".", ",")}
                                        </p>
                                        <div className={styles["contador-quantidade"]}>
                                            <button
                                                disabled={quantidade === 1}
                                                onClick={() => setQuantidade(Math.max(1, quantidade - 1))}
                                                className={styles["btn-quantidade"]}
                                            >
                                                <Minus size={18} />
                                            </button>
                                            <span>{quantidade}</span>
                                            <button
                                                onClick={() => setQuantidade(quantidade + 1)}
                                                className={styles["btn-quantidade"]}
                                            >
                                                <Plus size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <p className={styles["descricao-produto"]}>{produto_atual.descricao}</p>

                                <div className={styles["separador"]}></div>

                                {/* Material */}
                                <div className={styles["opcao-grupo"]}>
                                    <label>Material</label>
                                    <div className={styles["opcoes-buttons"]}>
                                        {produto_atual.opcoes.material.map((m) => (
                                            <button
                                                key={m}
                                                className={
                                                    selecoes.material === m
                                                        ? `${styles["btn-opcao"]} ${styles["selecionado"]}`
                                                        : styles["btn-opcao"]
                                                }
                                                onClick={() => atualizarSelecao("material", m)}
                                            >
                                                {traducaoMaterial[m]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Tamanho */}
                                <div className={styles["opcao-grupo"]}>
                                    <label>Tamanho</label>
                                    <div className={styles["opcoes-buttons"]}>
                                        {produto_atual.opcoes.tamanho.map((t) => (
                                            <button
                                                key={t}
                                                className={
                                                    selecoes.tamanho === t
                                                        ? `${styles["btn-opcao"]} ${styles["selecionado"]}`
                                                        : styles["btn-opcao"]
                                                }
                                                onClick={() => atualizarSelecao("tamanho", t)}
                                            >
                                                {traducaoTamanho[t]}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Padrão */}
                                <div className={styles["opcao-grupo"]}>
                                    <label>Padrão</label>
                                    <select
                                        value={selecoes.padrao}
                                        onChange={(e) => atualizarSelecao("padrao", e.target.value)}
                                        className={styles["select-opcao"]}
                                    >
                                        <option value="">Selecione um padrão</option>
                                        {produto_atual.opcoes.padrao.map((p) => (
                                            <option key={p} value={p}>
                                                {traducaoPadroes[p]}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Cor do corpo */}
                                {produto_atual.opcoes.cor_corpo?.length > 0 && (
                                    <div className={styles["opcao-grupo"]}>
                                        <label>Cor do corpo</label>
                                        <select
                                            value={selecoes.cor_corpo}
                                            onChange={(e) => atualizarSelecao("cor_corpo", e.target.value)}
                                            className={styles["select-opcao"]}
                                        >
                                            <option value="">Selecione uma cor</option>
                                            {produto_atual.opcoes.cor_corpo.map((c) => (
                                                <option key={c} value={c}>
                                                    {traducaoCores[c]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {/* Cor da alça */}
                                {produto_atual.opcoes.cor_alca?.length > 0 && (
                                    <div className={styles["opcao-grupo"]}>
                                        <label>Cor da alça</label>
                                        <select
                                            value={selecoes.cor_alca}
                                            onChange={(e) => atualizarSelecao("cor_alca", e.target.value)}
                                            className={styles["select-opcao"]}
                                        >
                                            <option value="">Selecione uma cor</option>
                                            {produto_atual.opcoes.cor_alca
                                                .filter((c) => c !== selecoes.cor_corpo)
                                                .map((c) => (
                                                    <option key={c} value={c}>
                                                        {traducaoCores[c]}
                                                    </option>
                                                ))}
                                        </select>
                                    </div>
                                )}

                                <button className={styles["btn-adicionar-sacola"]} onClick={enviarPedido}>
                                    Adicionar à sacola
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ModalPersonalizacaoProdutos;