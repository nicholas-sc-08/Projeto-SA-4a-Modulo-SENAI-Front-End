"use client";

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import styles from '@/app/perfil_brecho/page.module.css';

import { useGlobalContext } from '@/context/GlobalContext';
import { useState } from 'react';


function page() {

  const { tipo_de_header, set_tipo_de_header } = useGlobalContext();

  const [divAtiva, setDivAtiva] = useState("informacoes")

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
            <div className={styles["nome-brecho-content"]}>
              <p>Project Indigo Brechó</p>
              {/* <div className={styles["avaliacao-simplificado-brecho-content"]}>
                <p>4.5/5</p>
                <p>⭐⭐⭐⭐</p>
              </div> */}
            </div>
          </div>

          <div className={styles["parte-inferior-do-perfil-brecho-content"]}>
            <div className={styles["topicos-de-informacao-sobre-perfil-content"]}>
              <button onClick={() => setDivAtiva("informacoes")}>Informações</button>
              <button onClick={() => setDivAtiva("endereco")}>Endereço</button>
              <button onClick={() => setDivAtiva("sobre-brecho")}>Sobre o brechó</button>
              <button onClick={() => setDivAtiva("redes-sociais")}>Redes Sociais</button>
            </div>

            <div className={styles["informacoes-exibidas-content"]}>

              {divAtiva === "informacoes" && (
                <>

                  <div className={styles["titulo-topico-exibido-content"]}>
                    <p>Informações de Contato</p>
                  </div>

                  <div className={styles["infos-cadastradas-sub-div"]}>

                    <label className={styles["labels-info"]}>Nome: </label>
                    <span className={styles["dados-cadastradas-exibidos"]}></span>

                    <label className={styles["labels-info"]}>Email: </label>
                    <span className={styles["dados-cadastradas-exibidos"]}></span>

                    <label className={styles["labels-info"]}>Telefone: </label>
                    <span className={styles["dados-cadastradas-exibidos"]}></span>

                    <label className={styles["labels-info"]}>CNPJ: </label>
                    <span className={styles["dados-cadastradas-exibidos"]}></span>

                  </div>


                </>
              )}

              {divAtiva === "endereco" && (
                <>

                  <div className={styles["titulo-topico-exibido-content"]}>
                    <p>Informações de Endereco</p>
                  </div>

                  <div className={styles["infos-cadastradas-sub-div"]}>

                    <label className={styles["labels-info"]}>Estado: </label> {/* pensei em inicialmente exibir só essas informações, ai no edicao de perfil ter uma pergunta "deseja exibir todo o endereço?" serviria para os brechós q tem de loja física */}
                    <span className={styles["dados-cadastradas-exibidos"]}></span>

                    <label className={styles["labels-info"]}>Cidade: </label>
                    <span className={styles["dados-cadastradas-exibidos"]}></span>

                  </div>

                </>
              )}


              {divAtiva === "sobre-brecho" && (
                <>

                  <div className={styles["titulo-topico-exibido-content"]}>
                    <p>Informações de Sobre o Brechó</p>
                  </div>

                  <div className={styles["infos-cadastradas-sub-div"]}>
                    <span className={styles["dados-cadastradas-exibidos"]}></span>
                  </div>

                </>
              )}


              {divAtiva === "redes-sociais" && (
                <>

                  <div className={styles["titulo-topico-exibido-content"]}>
                    <p>Informações de Redes Sociais</p>
                  </div>

                  <div className={styles["infos-cadastradas-sub-div"]}>

                    <label className={styles["labels-info"]}>Instagram: </label>
                    <span className={styles["dados-cadastradas-exibidos"]}></span>

                    <label className={styles["labels-info"]}>Facebook: </label>
                    <span className={styles["dados-cadastradas-exibidos"]}></span>

                  </div>


                </>
              )}

            </div>

          </div>
        </div>

        <div className={styles["produtos-do-brecho-content"]}>
          <div className={styles["titulo-produtos-mais-ver-todos"]}>
            <h2>Produtos </h2>
            <button>Ver todos</button>
          </div>
          <div className={styles["produtos-exibidos-do-brecho-content"]}>
            <div className="card-produto-brecho-content">
              <img src="" alt="" />
              <p>Camiseta off the wall vans</p>
              <p>R$45,00</p>
            </div>

          </div>
        </div>

        {/* <div className={styles["avaliacoes-do-brecho-content"]}>
        </div> */}

      </div>

      <Footer />
    </div>

  )
}

export default page