"use client";

import React from 'react';
import styles from "@/components/pop_up_categoria/Pop_up_de_notificacao_cadastro_categoria.module.css";

export default function Pop_up_de_notificacao_cadastro_categoria() {
  return (
    <div className={styles['container_pop_up_de_notificacao_categoria']}>

        <div className={styles["container_pop_up_dashboard_categoria"]}>

            <img src="./img/Certificacao.svg" alt="check" />
            <p>Categoria cadastrada com sucesso!</p>
        
        </div>
        
    </div>
  );
};