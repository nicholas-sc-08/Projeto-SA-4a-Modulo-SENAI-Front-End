"use client"

import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import { useGlobalContext } from '@/context/GlobalContext';
import React, { useEffect } from 'react'
import styles from '@/app/page.module.css'

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
                    2
                </div>

                <p>Personalize do seu jeito: transforme ideias em realidade</p>
            </div>

            <div className={styles["container-escolhas-personalizacao"]}>
                <div className={styles["container-imagem-produto-personalizado"]}>
                    <img src="./img/produtos_personalizados/ecobag/sacola_ecobag_normal.svg" alt="" />
                </div>

                <div className={styles["container-conteudo-escolha-personalizacao"]}>
                    <div className={styles["container-titulo-descricao"]}>
                        <p>EcoBag</p>

                        <div className={styles["container-preço-quantidade"]}>
                            <p>R$ 5,47 un</p>

                            <div className={styles["container-contador-quantidade-produtos"]}>
                                <button className={styles["diminuir-quantidade-produtos"]}>-</button>
                                <h5>1</h5>
                                <button className={styles["aumentar-quantidade-produtos"]}>+</button>
                            </div>

                            <p>Uma peça simples, versátil e cheia de propósito. Nossa ecobag foi pensada para quem quer unir estilo
                                e consciência. Personalize e transforme um acessório do dia a dia em algo único, feito pra você.
                            </p>

                            <div className={styles["line-personalizar-produtos"]}></div>
                        </div>

                        <div className={styles["container-opcoes-personalizacao"]}>
                            <div className={styles["escolha-material"]}>
                                <p>Escolha o material</p>

                                <div className={styles["container-alinhamento-button-personalizacao"]}>
                                    <button>Algodão</button>
                                    <button>Poliéster reciclável</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page
