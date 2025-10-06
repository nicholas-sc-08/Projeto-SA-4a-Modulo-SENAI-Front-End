"use client";

import { useGlobalContext } from '@/context/GlobalContext';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import styles from '@/app/perfil_brecho/page.module.css';


function page() {

  const { tipo_de_header, set_tipo_de_header } = useGlobalContext();

  return (

    <div className={styles["toda-a-tela-content"]}>
      <Header tipo={tipo_de_header} />

      <div className={styles["entre-navbar-e-footer-content"]}>
        <div className={styles["perfil-brecho-content"]}>

          <div className={styles["parte-azul-superior-content"]}>
            <p>a</p>
          </div>

          <div className={styles["parte-do-meio-logo-nome-content"]}>
            <img src="" alt="" />
            <div className={styles["nome-brecho-e-avaliacao-content"]}>
              <p>Project Indigo Brechó</p>
              <div className={styles["avaliacao-simplificado-brecho-content"]}>
                <p>4.5/5</p>
                <p>⭐⭐⭐⭐</p>
              </div>

            </div>
          </div>

          <div className={styles["parte-inferior-do-perfil-brecho-content"]}>
            
          </div>

        </div>

        <div className={styles["produtos-do-brecho-content"]}>
          <div className={styles["titulo-produtos-mais-ver-todos"]}>
              <h2>Produtos </h2>
          <button>Ver todos</button>
          </div>
          <div className={styles["produtos-exibidos-do-brecho-content"]}>
            
          </div>
        </div>

        <div className={styles["avaliacoes-do-brecho-content"]}>

        </div>

      </div>

      <Footer />
    </div>

  )
}

export default page