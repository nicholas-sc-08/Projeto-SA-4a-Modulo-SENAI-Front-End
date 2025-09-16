"use client";

import React, { useEffect } from "react";
import styles from "@/components/pop_up_cadastro_produto/Pop_up_erro_cadastro_produto.module.css";
import { useGlobalContext } from "@/context/GlobalContext";
import { useRouter } from "next/navigation";

export default function Pop_up_erro_cadastro() {
  const { set_pop_up_erro_cadastro } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      set_pop_up_erro_cadastro(false);
      router.push('/gestao_de_estoque');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router, set_pop_up_erro_cadastro]);

  return (
    <div className={styles["pop-up-notificacao erro"]}>
      <div className={styles["conteudo"]}>
        <img
          src="/img/icons/icone_de_erro.svg"
          alt="Erro"
          className={styles["icone-notificacao"]}
        />
        <p>Erro ao cadastrar produto.</p>
      </div>
    </div>
  );
};