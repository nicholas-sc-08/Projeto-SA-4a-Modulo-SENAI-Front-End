"use client"

import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { useGlobalContext } from '@/context/GlobalContext';
import React, { useEffect } from 'react';
import styles from '@/app/visualizacao_produtos_personalizados/page.module.css'

function page() {

    const { tipo_de_header, set_tipo_de_header } = useGlobalContext();
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { usuario_logado, set_usuario_logado } = useGlobalContext();

    useEffect(() => {

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == usuario_logado._id);

        if (encontrar_brecho) {

            set_tipo_de_header(`brecho`);
        } else {

            set_tipo_de_header(`usuario`);
        };

    }, []);

    return (
        <div className={styles["container-alinhamento-conteudo-personalizacao"]}>
            <Header tipo={tipo_de_header} />

            <div className={styles["container-titulo-personalizacao"]}>
                <div className={styles["container-numero-de-fase-personalizacao"]}>
                    <p>2</p>
                </div>

                <h4>Personalize do seu jeito: transforme ideias em realidade</h4>
            </div>

            <div className={styles["container-escolhas-personalizacao"]}>
                <div className={styles["container-imagem-produto-personalizado"]}>
                    <img src="./img/produtos_personalizados/ecobag/sacola_ecobag_normal.svg" alt="" />
                </div>

                <div className={styles["container-conteudo-escolha-personalizacao"]}>
                    <div className={styles["container-titulo-descricao"]}>
                        <h2>EcoBag</h2>

                        <div className={styles["container-preço-quantidade"]}>
                            <h4>R$ 5,47 un</h4>

                            <div className={styles["container-contador-quantidade-produtos"]}>
                                <button
                                    // disabled={produto_sacola.quantidade_selecionada === 1}
                                    className={styles['diminuir-quantidade-produtos']}
                                // onClick={e => {
                                //     e.stopPropagation();
                                //     diminuir_quantia_selecionada(produto_sacola);
                                // }}
                                >
                                    -
                                </button>

                                <span>1</span>

                                <button
                                    // disabled={produto_sacola.quantidade_selecionada === produto_sacola.quantidade}
                                    className={styles['aumentar-quantidade-produtos']}
                                // onClick={e => {
                                //     e.stopPropagation();
                                //     aumentar_quantidade_selecionada(produto_sacola);
                                // }}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <p>Uma peça simples, versátil e cheia de propósito. Nossa ecobag foi pensada para quem quer unir estilo
                            e consciência. Personalize e transforme um acessório do dia a dia em algo único, feito pra você.
                        </p>

                        <div className={styles["line-personalizar-produtos"]}></div>
                    </div>

                    <div className={styles["container-opcoes-personalizacao"]}>
                        <div className={styles["escolha-material"]}>
                            <label>Escolha o material</label>

                            <div className={styles["container-alinhamento-button-personalizacao"]}>
                                <button>Algodão</button>
                                <button>Poliéster reciclável</button>
                            </div>
                        </div>

                        <div className={styles["escolha-tamanho"]}>
                            <label>Escolha o tamanho</label>

                            <div className={styles["container-alinhamento-button-personalizacao"]}>
                                <button>Médio</button>
                                <button>Grande</button>
                            </div>
                        </div>

                        <div className={styles["container-alinhamento-multiplas-escolhas-cores"]}>
                            <div className={styles["escolha-padrao"]}>
                                <label>Escolha o padrão</label>

                                <select id="opcoes" name="opcoes">
                                    <option disabled>Padrão</option>
                                    <option value="op1">Logo da Fly</option>
                                    <option value="op2">Logo da Fly e Nome</option>
                                    <option value="op3">Logo da Fly embaixo</option>
                                </select>
                            </div>

                            <div className={styles["escolha-padrao"]}>
                                <label>Escolha a cor do corpo</label>

                                <select id="opcoes" name="opcoes">
                                    <option value="op1">Amarelo</option>
                                    <option value="op2">Marrom</option>
                                    <option value="op3">Verde</option>
                                    <option value="op3">Areia</option>
                                </select>
                            </div>

                            <div className={styles["escolha-padrao"]}>
                                <label>Escolha a cor da alça</label>

                                <select id="opcoes" name="opcoes">
                                    <option value="op1">Amarelo</option>
                                    <option value="op3">Verde</option>
                                    <option value="op3">Areia</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={styles["buttons-acoes-personalizacao-produtos"]}>
                        <button className={styles["button-comprar-produtos-personalizados"]}>Comprar</button>
                        <button className={styles["button-chat-produtos-personalizados"]}>Chat</button>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page
