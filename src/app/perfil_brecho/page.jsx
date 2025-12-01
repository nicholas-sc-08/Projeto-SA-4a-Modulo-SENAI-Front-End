"use client";


import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import styles from '@/app/perfil_brecho/page.module.css';


import { useGlobalContext } from '@/context/GlobalContext';
import { useState } from 'react';


function page() {


  const { tipo_de_header, set_tipo_de_header } = useGlobalContext();


  const [tres_pontos_botao, set_tres_pontos_botao] = useState("./img/icons/tres_pontos_menu.svg"); //colocar aqui o icone


  const [divAtiva, setDivAtiva] = useState("informacoes")
  const [mostrarPopUpConfiguracoes, setMostrarPopUpConfiguracoes] = useState(false)


  const abrirPopUpConfig = () => {
    setMostrarPopUpConfiguracoes(true)
  }


  const fecharPopUpConfig = () => {
    setMostrarPopUpConfiguracoes(false)
  }


  const { array_produtos, set_array_produtos } = useGlobalContext();
  const { produto, set_produto } = useGlobalContext();


  return (


    <div className={styles["toda-a-tela-content"]}>
      <Header tipo={tipo_de_header} />


      <div className={styles["entre-navbar-e-footer-content"]}>
        <div className={styles["perfil-brecho-content"]}>


          <div className={styles["parte-azul-superior-content"]}>


            <button onClick={() => setMostrarPopUpConfiguracoes(true)} className={styles["tres-pontos-icon"]}>
              <img src={tres_pontos_botao} alt='configuracoes' />
            </button>
          </div>


          <div className={styles["parte-do-meio-logo-nome-content"]}>


            <div className={styles["logo-brecho-content"]}>
              <img src="./img/logo_brecho/logo-indigo-brecho.svg" alt="logo-brecho" />
            </div>


            <div className={styles["nome-brecho-content"]}>
              <h1>Project Indigo Brechó</h1>
            </div>


          </div>


          <div className={styles["parte-inferior-do-perfil-brecho-content"]}>
            <div className={styles["topicos-de-informacao-sobre-perfil-content"]}>

              <button onClick={() => setDivAtiva("informacoes")}
              className={divAtiva === "informacoes" ? styles["ativo"] : ""}
                >Informações</button>

              <button onClick={() => setDivAtiva("endereco")}
              className={divAtiva === "endereco" ? styles["ativo"] : ""}
                >Endereço</button>

              <button onClick={() => setDivAtiva("sobre-brecho")}
              className={divAtiva === "sobre-brecho" ? styles["ativo"] : ""}
                >Sobre o brechó</button>

              <button onClick={() => setDivAtiva("redes-sociais")}
              className={divAtiva === "redes-sociais" ? styles["ativo"] : ""}
                >Redes Sociais</button>
              
            </div>


            <div className={styles["informacoes-exibidas-content"]}>


              {divAtiva === "informacoes" && (
                <>


                  <div className={styles["titulo-topico-exibido-content"]}>
                    <p>Informações de Contato</p>
                  </div>


                  <div className={styles["infos-cadastradas-sub-div"]}>


                    <div className={styles["labels-e-dados-cadastrados-content"]}>
                      <label className={styles["labels-info"]}>Nome: </label>
                      <span className={styles["dados-cadastradas-exibidos"]}></span>
                    </div>


                    <div className={styles["labels-e-dados-cadastrados-content"]}>
                      <label className={styles["labels-info"]}>Email: </label>
                      <span className={styles["dados-cadastradas-exibidos"]}></span>
                    </div>


                    <div className={styles["labels-e-dados-cadastrados-content"]}>
                      <label className={styles["labels-info"]}>Telefone: </label>
                      <span className={styles["dados-cadastradas-exibidos"]}>aaaa</span>
                    </div>


                    <div className={styles["labels-e-dados-cadastrados-content"]}>
                      <label className={styles["labels-info"]}>CNPJ: </label>
                      <span className={styles["dados-cadastradas-exibidos"]}></span>
                    </div>


                  </div>




                </>
              )}


              {divAtiva === "endereco" && (
                <>


                  <div className={styles["titulo-topico-exibido-content"]}>
                    <p>Informações de Endereço</p>
                  </div>


                  <div className={styles["infos-cadastradas-sub-div"]}>


                    <label className={styles["labels-info"]}>Estado: </label> {/* pensei em inicialmente exibir só essas informações, ai no edicao de perfil ter uma pergunta "deseja exibir todo o endereço?" serviria para os brechós q tem de loja física */}
                    <span className={styles["dados-cadastradas-exibidos"]}></span>


                    <label className={styles["labels-info"]}>Cidade: </label>
                    <span className={styles["dados-cadastradas-exibidos"]}></span>


                    <label className={styles["labels-info"]}>Bairro: </label>
                    <span className={styles["dados-cadastradas-exibidos"]}></span>


                  </div>


                </>
              )}




              {divAtiva === "sobre-brecho" && (
                <>


                  <div className={styles["titulo-topico-exibido-content"]}>
                    <p>Informações de Sobre o Brechó</p>
                  </div>


                  <div className={styles["infos-cadastradas-sobre-sub-div"]}>
                    <span className={styles["dados-cadastradas-sobre-exibidos"]}> Primeiramente, você pode encontrar peças exclusivas e vintage que não estão disponíveis nas lojas convencionais. Além disso, ao comprar de segunda mão, você está contribuindo para a sustentabilidade, reduzindo o desperdício e a demanda por novos produtos. Outro benefício é o custo, muitas vezes mais baixo do que o de itens novos, permitindo que você economize enquanto adquire peças de qualidade.</span>
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


                    <label className={styles["labels-info"]}>Whatsapp: </label>
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


            <div className={styles["card-produto-brecho-content"]}>


              <div className={styles["img-produto-card-content"]}>
                <img src="./img/produtos_personalizados/caixa/caixa_normal.svg" alt="" />
              </div>


              <div className="info-produto-card-content">
                <p>Camiseta off the wall vans</p>

                <span>R$45,00</span>
              </div>



            </div>

            {/* <div className={styles["card-produto-brecho-content"]}>
              <img src="" alt="" />
              <p>Camiseta off the wall vans</p>
              <p>R$45,00</p>
            </div>

             <div className={styles["card-produto-brecho-content"]}>
              <img src="" alt="" />
              <p>Camiseta off the wall vans</p>
              <p>R$45,00</p>
            </div>

             <div className={styles["card-produto-brecho-content"]}>
              <img src="" alt="" />
              <p>Camiseta off the wall vans</p>
              <p>R$45,00</p>
            </div>

             <div className={styles["card-produto-brecho-content"]}>
              <img src="" alt="" />
              <p>Camiseta off the wall vans</p>
              <p>R$45,00</p>
            </div> */}

          </div>
        </div>






      </div>


      {/* {mostrarPopUpConfiguracoes && (
        <Pop_up_de_excluir_perfil fecharPopUpConfig={() => setMmostrarPopUpConfiguracoes(false)} />
      )} */}


      <Footer />
    </div>


  )
}


export default page
