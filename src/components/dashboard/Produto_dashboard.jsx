"use client";

import { useEffect } from 'react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Header from '../Header/Header'
import Pop_up_excluir_produto_dashboard from '../pop_up_dashboard/Pop_up_excluir_produto_dashboard';
import Pop_up_notificacao_excluir_produto from '@/components/pop_up_excluir_produto_sacola/Pop_up_excluir_produto_sacola';
import styles from "@/components/dashboard/Produto_dashboard.module.css";
import { buscar_estoques, buscar_produtos } from '@/services/produto/produto';
import { useGlobalContext } from '@/context/GlobalContext';
import { imagem_produto_sacola_brecho, nome_produto } from '@/services/sacolas_brechos/sacolas_brecho';

export default function Produtos_dashboard() {

    const { array_produtos, set_array_produtos } = useGlobalContext();
    const { array_categorias, set_array_categorias } = useGlobalContext();
    const { produtos_dashboard, set_produtos_dashboard } = useGlobalContext()
    const { inicio_dashboard, set_inicio_dashboard } = useGlobalContext()
    const { pop_up_notificacao_excluir_dashboard, set_pop_up_notificacao_excluir_dashboard } = useGlobalContext();
    const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useGlobalContext();
    const { id_do_produto_a_excluir, set_id_do_produto_a_excluir } = useGlobalContext();
    const { array_estoque, set_array_estoque } = useGlobalContext();
    const [barra_de_pesquisa, set_barra_de_pesquisa] = useState(``);
    const [barra_pesquisa_estoque, set_barra_pesquisa_estoque] = useState(``);
    const [resultado_de_pesquisa, set_resultado_de_pesquisa] = useState([]);
    const [ids_filtrado, set_ids_filtrado] = useState(``);
    const [escolher_qual_excluir, set_escolher_qual_excluir] = useState(false);

    function voltar_para_o_inicio() {
        set_inicio_dashboard(true);
        set_produtos_dashboard(false);
    };

    useEffect(() => {

        const produtos_filtrados = array_produtos.filter(produto => produto.nome.toLowerCase().includes(barra_de_pesquisa.toLowerCase()));
        const ids = produtos_filtrados.map(produto => produto._id);

        set_resultado_de_pesquisa(produtos_filtrados);
        set_ids_filtrado(ids);

    }, [barra_de_pesquisa, array_produtos]);

    function armazenar_id_do_produto(id_do_produto) {

        set_abrir_pop_up_dashboard(true);
        set_id_do_produto_a_excluir(id_do_produto);

    };

    useEffect(() => {

        buscar_produtos().then(produtos => set_array_produtos(produtos));
        buscar_estoques().then(estoques => set_array_estoque(estoques));
    }, []);

    useEffect(() => {

        setTimeout(() => {

            set_pop_up_notificacao_excluir_dashboard(false);

        }, 2000);

    }, [pop_up_notificacao_excluir_dashboard]);

    return (
        <AnimatePresence>
            <motion.div className={styles['alinhamento-estoque-produto-dashboard']} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                <Header tipo='admin' />

                {abrir_pop_up_dashboard && <div className={styles["container_sombra_para_visualizar_pop_up"]}></div>}
                {abrir_pop_up_dashboard && <Pop_up_excluir_produto_dashboard />}
                {pop_up_notificacao_excluir_dashboard && <div className={styles["container_sombra_para_visualizar_pop_up"]}></div>}
                {pop_up_notificacao_excluir_dashboard && <Pop_up_notificacao_excluir_produto />}

                <div className={styles["container-alinhamento-imagem-titulo-produtos-dashboard"]}>
                    <div className={styles["container-alinhamento-imagem-produtos-dashboard"]}>
                        <div className={styles["container-alinhamento-imagem-titulo-quantidade-produtos-dashboard"]}>
                            <div className={styles["fundo-cinza-imagem-produtos-dashboard"]}>
                                <div className={styles["fundo-verde-imagem-produtos-dashboard"]}>
                                    <img src="/img/icons/icone_dashboard_produtos_v_um.svg" alt="Icone produtos dashboard" />
                                </div>
                            </div>
                            <div className={styles["container-alinhamento-titulo-produtos-dashboard"]}>
                                <p className={styles['titulo-um-produtos-dashboard']}>Produtos</p>
                                <p className={styles['numero-de-produtos-dashboard']}>{array_produtos.length}</p>
                            </div>
                        </div>
                        <div className={styles["container-sair-de-brechos-dashboard"]} onClick={voltar_para_o_inicio}>
                            <img src="/img/icone_dashboard_sair.svg" alt="" />
                        </div>
                    </div>
                </div>

                <div className={styles["alinhamento-container-um-estoque-produto-dashboard"]}>

                    <div className={styles["alinhamento-container-dois-estoque-produto-dashboard"]}>
                        <div className={styles["container-um-estoque-produto-dashboard"]}>
                            <div className={styles["alinhamento-input-button-estoque-produto-dashboard"]}>
                                <input type="text"
                                    placeholder='Buscar produto'
                                    value={barra_de_pesquisa}
                                    onChange={e => set_barra_de_pesquisa(e.target.value)}
                                />

                                <div className={styles["container_excluir_produto"]}>
                                    <button onClick={() => set_escolher_qual_excluir(!escolher_qual_excluir)}>{!escolher_qual_excluir ? <img src='./img/Lixeira_icon_v_dois.svg' alt='lixeira' /> : <img src='./img/icons/close-icon.png' alt='cancelar' />}</button>
                                </div>
                            </div>
                            <div className={styles["alinhamento-titulos-estoque-produto-dashboard"]}>
                                <div className={styles["alinhamento-titulo-produtos-dashboard"]}>
                                    <p>Nome do produto</p>
                                </div>
                                <div className={styles["alinhamento-titulos-gerais-dashboard"]}>
                                    <p className={styles['p-titulos-produtos-dashboard']}>Preço</p>
                                    <p className={styles['p-titulos-produtos-dashboard']}>Estoque</p>
                                    <p className={styles['p-titulos-produtos-dashboard']}>Conservação</p>
                                    <p className={styles['p-titulos-produtos-dashboard']}>Tamanho</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['fundo-container-dados-do-produto']}>
                        <div className={styles["container-dados-do-produto"]}>
                            {!barra_de_pesquisa && array_produtos.map((produto, i) => (
                                <div key={i} className={styles["alinhamento-containers-informacoes-produtos-dashboard"]}>
                                    <div className={styles["grupo-um-informacoes-produto-dashboard"]}>
                                        <div className={styles["imagem-produto-dashboard"]}>
                                            <img src={produto.imagem[0]} alt="" />
                                        </div>
                                        <div className={styles["nome-categoria-produto-dashboard"]}>
                                            <p className={styles['nome-do-produto-dashboard']}>{}</p>
                                            <p className={styles["categoria-cor-dashboard"]}>
                                                {array_categorias.find(
                                                    (categoria) => categoria._id === produto.fk_id_categoria
                                                )?.nome || "Sem categoria"}{" "}
                                                - {(produto.cor)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles["grupo-dois-informacoes-produto-dashboard"]}>
                                        <p className={styles["preco-produto-dashboard"]}>R${produto.preco}</p>
                                        <div className={styles["alinhamento-informacoes-gerais-unidade-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.quantidade}</p>
                                        </div>
                                        <div className={styles["alinhamento-informacoes-gerais-conservacao-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.condicao}</p>
                                        </div>
                                        <div className={styles["alinhamento-informacoes-gerais-tamanho-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.tamanho}</p>
                                        </div>
                                    </div>
                                    {escolher_qual_excluir && (
                                        <button
                                            className={styles["button-deletar-produto-dashboard-individual"]}
                                            onClick={() => armazenar_id_do_produto(produto._id)}
                                        >
                                            <img src="./img/icons/lixeira-vermelha-icon.svg" alt="Excluir" />
                                        </button>
                                    )}
                                    <div className={styles["linha-pretinha"]}></div>
                                </div>
                            ))}
                            {barra_de_pesquisa && resultado_de_pesquisa.map((produto, i) => (
                                <div key={i} className={styles["alinhamento-containers-informacoes-produtos-dashboard"]}>
                                    <div className={styles["grupo-um-informacoes-produto-dashboard"]}>
                                        <div className={styles["imagem-produto-dashboard"]}></div>
                                        <div className={styles["nome-categoria-produto-dashboard"]}>
                                            <p className={styles['nome-do-produto-dashboard']}>{produto.nome}</p>
                                            <p className={styles["categoria-cor-dashboard"]}>
                                                {array_categorias.find(
                                                    (categoria) => categoria._id === produto.fk_id_categoria
                                                )?.nome || "Sem categoria"}{" "}
                                                - {(produto.cor)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles["grupo-dois-informacoes-produto-dashboard"]}>
                                        <p className={styles["preco-produto-dashboard"]}>{produto.preco}</p>
                                        <div className={styles["alinhamento-informacoes-gerais-unidade-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.quantidade}</p>
                                        </div>
                                        <div className={styles["alinhamento-informacoes-gerais-conservacao-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.condicao}</p>
                                        </div>
                                        <div className={styles["alinhamento-informacoes-gerais-tamanho-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.tamanho}</p>
                                        </div>
                                    </div>
                                    {escolher_qual_excluir && (
                                        <button
                                            className={styles["button-deletar-produto-dashboard-individual"]}
                                            onClick={() => armazenar_id_do_produto(produto._id)}
                                        >
                                            <img src="./img/icons/lixeira-vermelha-icon.svg" alt="Excluir" />
                                        </button>
                                    )}
                                    <div className={styles["linha-pretinha"]}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className={styles["alinhamento-container-um-estoque-produto-dashboard"]}>

                    <div className={styles["alinhamento-container-dois-estoque-produto-dashboard"]}>
                        <div className={styles["container-um-estoque-produto-dashboard"]}>
                            <div className={styles["alinhamento-input-button-estoque-produto-dashboard"]}>
                                <input type="text"
                                    placeholder='Buscar produto'
                                    value={barra_pesquisa_estoque}
                                    onChange={e => set_barra_pesquisa_estoque(e.target.value)}
                                />

                                <div className={styles["container_excluir_produto"]}>
                                    <button onClick={() => set_escolher_qual_excluir(!escolher_qual_excluir)}>{!escolher_qual_excluir ? <img src='./img/Lixeira_icon_v_dois.svg' alt='lixeira' /> : <img src='./img/icons/close-icon.png' alt='cancelar' />}</button>
                                </div>
                            </div>
                            <div className={styles["alinhamento-titulos-estoque-produto-dashboard"]}>
                                <div className={styles["alinhamento-titulo-produtos-dashboard"]}>
                                    <p>Nome do produto</p>
                                </div>
                                <div className={styles["alinhamento-titulos-gerais-dashboard"]}>
                                    <p className={styles['p-titulos-produtos-dashboard']}>Quantidade</p>
                                    <p className={styles['p-titulos-produtos-dashboard']}>Material</p>
                                    <p className={styles['p-titulos-produtos-dashboard']}>Tamanho</p>
                                    <p className={styles['p-titulos-produtos-dashboard']}>Padrão</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['fundo-container-dados-do-produto']}>
                        <div className={styles["container-dados-do-produto"]}>
                            {!barra_pesquisa_estoque && array_estoque.map((produto, i) => (
                                <div key={i} className={styles["alinhamento-containers-informacoes-produtos-dashboard"]}>
                                    <div className={styles["grupo-um-informacoes-produto-dashboard"]}>
                                        <div className={styles["imagem-produto-dashboard"]}>
                                            <img src={imagem_produto_sacola_brecho(produto.tipo, produto.padrao, produto.cor_corpo)} alt="" />
                                        </div>
                                        <div className={styles["nome-categoria-produto-dashboard"]}>
                                            <p className={styles["categoria-cor-dashboard"]}>
                                                {nome_produto(produto.tipo)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles["grupo-dois-informacoes-produto-dashboard"]}>
                                        <p className={styles["preco-produto-dashboard"]}>{produto.quantidade} Uni</p>
                                        <div className={styles["alinhamento-informacoes-gerais-unidade-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.material}</p>
                                        </div>
                                        <div className={styles["alinhamento-informacoes-gerais-conservacao-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.tamanho}</p>
                                        </div>
                                        <div className={styles["alinhamento-informacoes-gerais-tamanho-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.padrao}</p>
                                        </div>
                                    </div>
                                    {escolher_qual_excluir && (
                                        <button
                                            className={styles["button-deletar-produto-dashboard-individual"]}
                                            onClick={() => armazenar_id_do_produto(produto._id)}
                                        >
                                            <img src="./img/icons/lixeira-vermelha-icon.svg" alt="Excluir" />
                                        </button>
                                    )}
                                    <div className={styles["linha-pretinha"]}></div>
                                </div>
                            ))}
                            {barra_pesquisa_estoque && resultado_de_pesquisa.map((produto, i) => (
                                <div key={i} className={styles["alinhamento-containers-informacoes-produtos-dashboard"]}>
                                    <div className={styles["grupo-um-informacoes-produto-dashboard"]}>
                                        <div className={styles["imagem-produto-dashboard"]}></div>
                                        <div className={styles["nome-categoria-produto-dashboard"]}>
                                            <p className={styles['nome-do-produto-dashboard']}>{produto.nome}</p>
                                            <p className={styles["categoria-cor-dashboard"]}>
                                                {array_categorias.find(
                                                    (categoria) => categoria._id === produto.fk_id_categoria
                                                )?.nome || "Sem categoria"}{" "}
                                                - {(produto.cor)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles["grupo-dois-informacoes-produto-dashboard"]}>
                                        <p className={styles["preco-produto-dashboard"]}>{produto.preco}</p>
                                        <div className={styles["alinhamento-informacoes-gerais-unidade-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.quantidade}</p>
                                        </div>
                                        <div className={styles["alinhamento-informacoes-gerais-conservacao-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.condicao}</p>
                                        </div>
                                        <div className={styles["alinhamento-informacoes-gerais-tamanho-dashboard"]}>
                                            <p className={styles['p-grupo-dois-informacoes-produto-dashboard']}>{produto.tamanho}</p>
                                        </div>
                                    </div>
                                    {escolher_qual_excluir && (
                                        <button
                                            className={styles["button-deletar-produto-dashboard-individual"]}
                                            onClick={() => armazenar_id_do_produto(produto._id)}
                                        >
                                            <img src="./img/icons/lixeira-vermelha-icon.svg" alt="Excluir" />
                                        </button>
                                    )}
                                    <div className={styles["linha-pretinha"]}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div >
        </AnimatePresence>
    );
};