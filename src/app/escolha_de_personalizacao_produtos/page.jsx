'use client'

import React from 'react'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import styles from "@/app/escolha_de_personalizacao_produtos/page.module.css"
import { AnimatePresence, motion } from 'framer-motion'
import { useGlobalContext } from '@/context/GlobalContext'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const { tipo_de_header } = useGlobalContext()
  const { produto_selecionado, set_produto_selecionado } = useGlobalContext();

  const handleSelecaoProduto = (tipoProduto) => {
    set_produto_selecionado(tipoProduto)
    router.push('/visualizacao_produtos_personalizados')
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <Header tipo={tipo_de_header} />

        <main className={styles["container-da-pagina"]}>
          <section className={styles["intro-section"]}>
            <h2 className={styles["intro-titulo"]}>
              Cuide do planeta com nossas embalagens personalizadas
            </h2>
            <hr className={styles["linha-divisao"]} />
            <p className={styles["intro-texto"]}>
              Novidade no Fly! Agora você pode interagir diretamente com a gente
              e personalizar suas compras na nossa loja oficial. Dê seu toque único a cada produto!
            </p>
            <p className={styles["intro-pergunta"]}>Por que esta iniciativa é tão importante?</p>
            <p className={styles["intro-texto"]}>
              Além de ser uma forma mais sustentável para o meio ambiente, essa iniciativa
              também é um passo importante na construção de uma identidade única para o seu brechó.
              Ao comprar na loja do Fly, você não só contribui para a redução de resíduos,
              como também deixa seu brechó com mais personalidade e autenticidade.
            </p>
          </section>

          <section className={styles["container-opcoes"]}>
            <div className={styles["container-titulo-passo1"]}>
              <h2 className={styles["passo1-bolinha"]}>1</h2>
              <h2 className={styles["passo1-titulo"]}>
                Personalize do seu jeito: escolha o produto ideal
              </h2>
            </div>
            <p className={styles["descricao-opcoes"]}>
              Escolha entre materiais 100% recicláveis e biodegradáveis.
              Cada embalagem conta uma história de sustentabilidade e fortalece
              a identidade do seu brechó.
            </p>
          </section>

          <section className={styles["container-produtos"]}>
            <button className={styles["card-produtos"]} onClick={() => handleSelecaoProduto('caixa')}>
              <img src="./img/caixaKraft-estrelinhas.png" alt="Caixa Kraft" className={styles["produto-imagem"]} />
              <div className={styles["descricao-container"]}>
                <h3 className={styles["descricao-produto"]}>Caixas Kraft</h3>
                <p className={styles["descricao-produto"]}>100% Reciclável</p>
              </div>
            </button>

            <button className={styles["card-produtos"]} onClick={() => handleSelecaoProduto('sacola')}>
              <img src="./img/sacolaKraft.png" alt="Sacola" className={styles["produto-imagem"]} />
              <div className={styles["descricao-container"]}>
                <h3 className={styles["descricao-produto"]}>Sacolas</h3>
                <p className={styles["descricao-produto"]}>100% Reciclável</p>
              </div>
            </button>

            <button className={styles["card-produtos"]} onClick={() => handleSelecaoProduto('ecobag')}>
              <img src="./img/ecoBags.png" alt="Ecobag" className={styles["produto-imagem"]} />
              <div className={styles["descricao-container"]}>
                <h3 className={styles["descricao-produto"]}>Ecobags</h3>
                <p className={styles["descricao-produto"]}>Tecido Orgânico</p>
              </div>
            </button>
          </section>


          <section className={styles["container-caracteristicas"]}>
            <div className={styles["card-caracteristicas"]}>
              <img src="./img/reciclagem.png" alt="Materiais recicláveis" className={styles["icon-caracteristicas"]} />
              <h4 className={styles["titulo-caracteristica"]}>Materiais 100% recicláveis</h4>
            </div>
            <div className={styles["card-caracteristicas"]}>
              <img src="./img/paint-board-and-brush.png" alt="Tintas a base de água" className={styles["icon-caracteristicas"]} />
              <h4 className={styles["titulo-caracteristica"]}>Tintas a base de água</h4>
            </div>
            <div className={styles["card-caracteristicas2"]}>
              <img src="./img/leaf.png" alt="Design personalizado" className={styles["icon-caracteristicas"]} />
              <h4 className={styles["titulo-caracteristica"]}>Design personalizado</h4>
            </div>
            <div className={styles["card-caracteristicas2"]}>
              <img src="./img/ruler.png" alt="Diversos tamanhos" className={styles["icon-caracteristicas"]} />
              <h4 className={styles["titulo-caracteristica"]}>Diversos tamanhos</h4>
            </div>
          </section>
        </main>

        <Footer />
      </motion.div>
    </AnimatePresence>
  )
}