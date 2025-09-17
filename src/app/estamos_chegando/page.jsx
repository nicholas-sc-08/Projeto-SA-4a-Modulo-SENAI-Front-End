"use client";

import React from 'react'
import styles from "@/app/estamos_chegando/page.module.css"
import Header from '@/components/header/Header';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import { useGlobalContext } from '@/context/GlobalContext';

export default function TelaEmAndamento() {

    const { tipo_de_header, set_tipo_de_header } = useGlobalContext();

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }} className={styles['alinhamento-tela-em-andamento']}>

                <Header tipo={tipo_de_header} />

                <div className={styles["container-alinhamento-um-tela-em-andamento"]}>
                    <img src="./img/logo/logo-verdeCamadinha.svg" alt="Logo Fly" className={styles['logo-fly-tela-em-andamento']} />

                    <div className={styles["alinhamento-letras-tela-em-andamento"]}>
                        <h1>Calma aí! Estamos chegando...</h1>
                        <p>Em breve: A maior rede de brechós online!</p>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};