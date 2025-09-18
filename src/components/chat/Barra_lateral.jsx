"use client";

import React from 'react';
import styles from "@/components/chat/Barra_lateral.module.css";
import { useState } from 'react';

export default function Barra_lateral() {

    const [perfil_botao, set_perfil_botao] = useState("./img/icons/chat_perfil.svg");
    const [conversas_botao, set_conversas_botao] = useState("./img/icons/chat_conversas.svg");
    const [grupos_botao, set_grupos_botao] = useState("./img/icons/chat_grupos.svg");

    return (
        <aside>
            <div className={styles["container_fundo_barra_lateral"]}>
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
            </div>
        </aside>
    );
};