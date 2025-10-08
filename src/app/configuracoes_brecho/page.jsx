"use client";

import React from 'react'
import styles from '@/app/configuracoes_brecho/page.module.css'
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

function page() {
    return (
        <div>
            <Header />

            <div className={styles["config-container"]}>
                <div className={styles["escolha-config"]}>
                    <div className={styles["info-perfil"]}>
                        <img src="./img/fotoPerfil.png" alt="" />
                    </div>

                    <div className={styles["ir-para-perfil"]}>
                        <div className={styles["container-informacoes-ir-para-perfil"]}>
                            <h4>Project Indigo Brechó</h4>
                            <p>No Fly desde: 10/09/2024</p>
                        </div>

                        <button>Ir para perfil</button>
                    </div>
                </div>

                <div className={styles["conteudo-config"]}>
                    <button>Meu perfil</button>
                    <button>Redes sociais</button>
                    <button>Eventos</button>
                    <button>Saiba mais</button>
                    <button>Ajuda (FAQ)</button>
                </div>

                <div className={styles["container-escolhas-perigosas"]}>
                    <div className={styles["container-sair-da-conta"]}>
                        <button>
                            <img src="./img/icons/logout-marrom.svg" alt="" />
                            Sair da conta
                        </button>

                        <p>encerrando atividades online, nos vemos em breve</p>
                    </div>

                    <div className={styles["container-excluir-conta"]}>
                        <button>
                            <img src="./img/icons/lixeira.svg" alt="" />
                            Excluir minha conta
                        </button>

                        <p>esta ação não pode ser desfeita</p>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page
