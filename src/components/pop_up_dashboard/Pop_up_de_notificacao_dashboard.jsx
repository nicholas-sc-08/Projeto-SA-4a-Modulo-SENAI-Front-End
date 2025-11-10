"use client";

import styles from "@/components/pop_up_dashboard/Pop_up_de_notificacao_dashboard.module.css"

export default function Pop_up_de_notificacao_dashboard() {
  return (
    <div className={styles['container_pop_up_de_notificacao']}>

        <div className={styles["container_pop_up_dashboard"]}>

            <img src="./img/Certificacao.svg" alt="check" />
            <p>Usuário Excluído 
            com sucesso!</p>
        
        </div>

    </div>
  );
};