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
                        
                    </div>
                </div>

                <div className={styles["conteudo-config"]}>

                </div>
            </div>

            <Footer />
        </div>
    )
}

export default page
