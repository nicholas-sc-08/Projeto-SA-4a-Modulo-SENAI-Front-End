"use client"

import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { useGlobalContext } from '@/context/GlobalContext';
import React, { useEffect, useState } from 'react';
import styles from '@/app/visualizacao_produtos_personalizados/page.module.css'
import api from '@/services/api';

function page() {

    const { tipo_de_header, set_tipo_de_header } = useGlobalContext();
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { usuario_logado, set_usuario_logado } = useGlobalContext();

    // Estado para controlar qual produto está sendo personalizado
    const [produto_selecionado, set_produto_selecionado] = useState('ecobag');
    const [quantidade, set_quantidade] = useState(1);

    // Configuração dos produtos
    const produtos_config = {
        ecobag: {
            nome: "EcoBag",
            preco: 5.47,
            imagem: "./img/produtos_personalizados/ecobag/sacola_ecobag_normal.svg",
            descricao: "Uma peça simples, versátil e cheia de propósito. Nossa ecobag foi pensada para quem quer unir estilo e consciência. Personalize e transforme um acessório do dia a dia em algo único, feito pra você.",
            opcoes: {
                material: ["Algodão", "Poliéster reciclável"],
                tamanho: ["Médio", "Grande"],
                padrao: ["Logo da Fly", "Logo da Fly e Nome", "Logo da Fly embaixo"],
                cor_corpo: ["Amarelo", "Marrom", "Verde", "Areia"],
                cor_alca: ["Amarelo", "Verde", "Areia"]
            }
        },
        sacola: {
            nome: "Sacola",
            preco: 0.16,
            imagem: "./img/produtos_personalizados/sacola/sacola_normal.svg",
            descricao: "Esta sacola é pra você que valoriza moda feita com sentido: reutilizável, personalizável e amiga do meio ambiente. Transforme-a em algo só seu e mostre ao mundo que agir bem com o planeta também é tendência.",
            opcoes: {
                material: ["Sacola plástica biodegradável", "Sacola de papel kraft (cor original)"],
                tamanho: ["Pequeno", "Médio", "Grande"],
                padrao: ["Logo da Fly", "Logo da Fly e Nome", "Logo da Fly embaixo"],
                cor_corpo: ["Verde", "Branca"]
            }
        },
        caixa: {
            nome: "Caixa",
            preco: 0.85,
            imagem: "./img/produtos_personalizados/caixa/caixa_normal.svg",
            descricao: "Caixa resistente e elegante, ideal para embalar seus produtos com cuidado e estilo. Personalize e transforme a experiência de entrega em algo memorável e sustentável.",
            opcoes: {
                material: ["Papelão"],
                tamanho: ["Pequeno", "Médio", "Grande"],
                padrao: ["Logo da Fly", "Logo da Fly e Nome", "Logo da Fly embaixo"],
                cor_corpo: [],
                cor_detalhes: []
            }
        }
    };

    // Estados para as seleções do usuário
    const [selecoes, set_selecoes] = useState({
        material: '',
        tamanho: '',
        padrao: '',
        cor_corpo: '',
        cor_alca: '',
        cor_detalhes: ''
    });

    useEffect(() => {
        const encontrar_brecho = array_brechos.find(brecho => brecho._id == usuario_logado._id);

        if (encontrar_brecho) {
            set_tipo_de_header(`brecho`);
        } else {
            set_tipo_de_header(`usuario`);
        };
    }, []);

    // Função para alterar a quantidade
    const alterar_quantidade = (operacao) => {
        if (operacao === 'diminuir' && quantidade > 1) {
            set_quantidade(quantidade - 1);
        } else if (operacao === 'aumentar') {
            set_quantidade(quantidade + 1);
        }
    };

    // Função para atualizar as seleções
    const atualizar_selecao = (tipo, valor) => {
        set_selecoes(prev => ({
            ...prev,
            [tipo]: valor
        }));
    };

    // Função para criar o objeto para enviar ao backend
    const criar_objeto_pedido = () => {
        const produto_atual = produtos_config[produto_selecionado];

        const objeto_pedido = {
            tipo: produto_selecionado, // 'ecobag', 'sacola', 'caixa'
            material: selecoes.material,
            padrao: selecoes.padrao,
            tamanho: selecoes.tamanho,
            valor: Number(produto_atual.preco * quantidade)
        };

        // Adiciona campos opcionais apenas se existirem e foram selecionados
        if (selecoes.cor_corpo && selecoes.cor_corpo !== '') {
            objeto_pedido.cor_corpo = selecoes.cor_corpo;
        }

        if (selecoes.cor_alca && selecoes.cor_alca !== '') {
            objeto_pedido.cor_alca = selecoes.cor_alca;
        }

        if (selecoes.cor_detalhes && selecoes.cor_detalhes !== '') {
            objeto_pedido.cor = selecoes.cor_detalhes;
        }

        return objeto_pedido;
    }

    // Função para enviar ao backend
    const enviar_pedido = async () => {
        const pedido = criar_objeto_pedido();

        // Validação básica
        if (!pedido.material || !pedido.padrao || !pedido.tamanho) {
            alert('Por favor, selecione todas as opções obrigatórias');
            return;
        }

        try {
            console.log("=== DEBUG PEDIDO ===");
            console.log("Pedido completo:", JSON.stringify(pedido, null, 2));
            console.log("Tipo do pedido:", typeof pedido);
            console.log("==================");

            await api.post("/sacolas_brechos", pedido);

            alert('Pedido enviado com sucesso!');

        } catch (error) {
            console.error("=== ERRO COMPLETO ===");
            console.error("Status:", error.response?.status);
            console.error("Data:", error.response?.data);
            console.error("Headers:", error.response?.headers);
            console.error("Message:", error.message);
            console.error("==================");
        }
    };

    // Obter configuração do produto atual
    const produto_atual = produtos_config[produto_selecionado];

    return (
        <div className={styles["container-alinhamento-conteudo-personalizacao"]}>
            <Header tipo={tipo_de_header} />

            <div className={styles["container-titulo-personalizacao"]}>
                <div className={styles["container-numero-de-fase-personalizacao"]}>
                    <p>2</p>
                </div>

                <h4>Personalize do seu jeito: transforme ideias em realidade</h4>
            </div>

            {/* Seletor de produto */}
            <div className={styles["container-seletor-produto"]}>
                <h3>Escolha o produto para personalizar:</h3>
                <div className={styles["botoes-produtos"]}>
                    <button
                        className={produto_selecionado === 'ecobag' ? styles['produto-ativo'] : ''}
                        onClick={() => set_produto_selecionado('ecobag')}
                    >
                        EcoBag
                    </button>
                    <button
                        className={produto_selecionado === 'sacola' ? styles['produto-ativo'] : ''}
                        onClick={() => set_produto_selecionado('sacola')}
                    >
                        Sacola
                    </button>
                    <button
                        className={produto_selecionado === 'caixa' ? styles['produto-ativo'] : ''}
                        onClick={() => set_produto_selecionado('caixa')}
                    >
                        Caixa
                    </button>
                </div>
            </div>

            <div className={styles["container-escolhas-personalizacao"]}>
                <div className={styles["container-imagem-produto-personalizado"]}>
                    <img src={produto_atual.imagem} alt={produto_atual.nome} />
                </div>

                <div className={styles["container-conteudo-escolha-personalizacao"]}>
                    <div className={styles["container-titulo-descricao"]}>
                        <h2>{produto_atual.nome}</h2>

                        <div className={styles["container-preço-quantidade"]}>
                            <h4>R$ {produto_atual.preco.toFixed(2).replace('.', ',')} un</h4>

                            <div className={styles["container-contador-quantidade-produtos"]}>
                                <button
                                    disabled={quantidade === 1}
                                    className={styles['diminuir-quantidade-produtos']}
                                    onClick={() => alterar_quantidade('diminuir')}
                                >
                                    -
                                </button>

                                <span>{quantidade}</span>

                                <button
                                    className={styles['aumentar-quantidade-produtos']}
                                    onClick={() => alterar_quantidade('aumentar')}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <p>{produto_atual.descricao}</p>

                        <div className={styles["line-personalizar-produtos"]}></div>
                    </div>

                    <div className={styles["container-opcoes-personalizacao"]}>
                        {/* Material */}
                        <div className={styles["escolha-material"]}>
                            <label>Escolha o material</label>

                            <div className={styles["container-alinhamento-button-personalizacao"]}>
                                {produto_atual.opcoes.material.map((material, index) => (
                                    <button
                                        key={index}
                                        className={selecoes.material === material ? styles['opcao-selecionada'] : ''}
                                        onClick={() => atualizar_selecao('material', material)}
                                    >
                                        {material}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tamanho */}
                        <div className={styles["escolha-tamanho"]}>
                            <label>Escolha o tamanho</label>

                            <div className={styles["container-alinhamento-button-personalizacao"]}>
                                {produto_atual.opcoes.tamanho.map((tamanho, index) => (
                                    <button
                                        key={index}
                                        className={selecoes.tamanho === tamanho ? styles['opcao-selecionada'] : ''}
                                        onClick={() => atualizar_selecao('tamanho', tamanho)}
                                    >
                                        {tamanho}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className={styles["container-alinhamento-multiplas-escolhas-cores"]}>
                            {/* Padrão */}
                            <div className={styles["escolha-padrao"]}>
                                <label>Escolha o padrão</label>

                                <select
                                    id="padrao"
                                    name="padrao"
                                    value={selecoes.padrao}
                                    onChange={(e) => atualizar_selecao('padrao', e.target.value)}
                                >
                                    <option value="" disabled>Padrão</option>
                                    {produto_atual.opcoes.padrao.map((padrao, index) => (
                                        <option key={index} value={padrao}>{padrao}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Cor do corpo - só mostra se o produto tiver opções de cor */}
                            {produto_atual.opcoes.cor_corpo && produto_atual.opcoes.cor_corpo.length > 0 && (
                                <div className={styles["escolha-padrao"]}>
                                    <label>Escolha a cor do corpo</label>

                                    <select
                                        id="cor-corpo"
                                        name="cor-corpo"
                                        value={selecoes.cor_corpo}
                                        onChange={(e) => atualizar_selecao('cor_corpo', e.target.value)}
                                    >
                                        <option value="" disabled>Cor do corpo</option>
                                        {produto_atual.opcoes.cor_corpo.map((cor, index) => (
                                            <option key={index} value={cor}>{cor}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Cor da alça - só mostra se o produto tiver essa opção */}
                            {produto_atual.opcoes.cor_alca && produto_atual.opcoes.cor_alca.length > 0 && (
                                <div className={styles["escolha-padrao"]}>
                                    <label>Escolha a cor da alça</label>

                                    <select
                                        id="cor-alca"
                                        name="cor-alca"
                                        value={selecoes.cor_alca}
                                        onChange={(e) => atualizar_selecao('cor_alca', e.target.value)}
                                    >
                                        <option value="" disabled>Cor da alça</option>
                                        {produto_atual.opcoes.cor_alca.map((cor, index) => (
                                            <option key={index} value={cor}>{cor}</option>
                                        ))}
                                    </select>
                                </div>
                            )}

                            {/* Cor dos detalhes - só mostra se o produto tiver essa opção */}
                            {produto_atual.opcoes.cor_detalhes && produto_atual.opcoes.cor_detalhes.length > 0 && (
                                <div className={styles["escolha-padrao"]}>
                                    <label>Escolha a cor dos detalhes</label>

                                    <select
                                        id="cor-detalhes"
                                        name="cor-detalhes"
                                        value={selecoes.cor_detalhes}
                                        onChange={(e) => atualizar_selecao('cor_detalhes', e.target.value)}
                                    >
                                        <option value="" disabled>Cor dos detalhes</option>
                                        {produto_atual.opcoes.cor_detalhes.map((cor, index) => (
                                            <option key={index} value={cor}>{cor}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles["buttons-acoes-personalizacao-produtos"]}>
                        <button
                            className={styles["button-comprar-produtos-personalizados"]}
                            onClick={enviar_pedido}
                        >
                            Comprar
                        </button>
                        <button className={styles["button-chat-produtos-personalizados"]}>Chat</button>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page