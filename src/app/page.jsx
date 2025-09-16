"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGlobalContext } from '@/context/GlobalContext';
import api from '@/services/api';
import Footer from '@/components/footer/Footer';
// import Chat from '@/components/chat/Chat';
// import Chat_conversa from '@/components/chat/Chat_conversa';
import styles from '@/app/page.module.css'
import { Link } from 'next/link';
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Header from '@/components/header/Header';
import Compra_realizada from '@/components/pop_up_compra_realizada/Compra_realizada';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useSearch } from '@/contexts/SearchContext';


export default function Tela_incial() {

  const { array_clientes, set_array_clientes } = useGlobalContext();
  const { array_brechos, set_array_brechos } = useGlobalContext();
  const { array_produtos, set_array_produtos } = useGlobalContext();
  const { array_categorias, set_array_categorias } = useGlobalContext();
  const { brecho_selecionado, set_brecho_selecionado } = useGlobalContext();

  const { chat_aberto, set_chato_aberto } = useGlobalContext();
  const { conversa_aberta, set_conversa_aberta } = useGlobalContext();
  const { usuario_logado, set_usuario_logado } = useGlobalContext();
  const { tipo_de_header, set_tipo_de_header } = useGlobalContext();
  const { produto, set_produto } = useGlobalContext();
  const { id_categoria_selecionada, set_id_categoria_selecionada } = useGlobalContext();
  const { sacola, set_sacola } = useGlobalContext();
  const { sacola_ou_produto, set_sacola_ou_produto } = useGlobalContext();
  const router = useRouter();
  const { sacola_aberta, set_sacola_aberta } = useGlobalContext();
  const [compra_realizada, set_compra_realizada] = useState(false);

  const { formCadastroBrecho, setFormCadastroBrecho } = useGlobalContext()

  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  const [startIndexLancamentos, setStartIndexLancamentos] = useState(0);
  const lancamentosToShow = 4;

  const [startIndexFeedBack, setStartIndexFeedBack] = useState(0);
  const FeedBackToShow = 4;

  const controlsEstrelaVerde = useAnimation();
  const controlsEstrelaAmarela = useAnimation();

  const { termoBuscado, setTermoBuscado } = useGlobalContext()

  const { filtro_de_pesquisa, set_filtro_de_pesquisa } = useGlobalContext();

  // const { setValorBuscado } = useSearch();

  useEffect(() => {

    informacoes_clientes();
    informacoes_brechos();
    informacoes_produtos();
    buscar_categorias()
    set_id_categoria_selecionada(null);

  }, []);

  useEffect(() => {

    quantidade_de_produtos_sacola();

  }, [sacola]);

  async function informacoes_clientes() {

    try {

      const resultado = await api.get(`/clientes`);
      set_array_clientes(resultado.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function informacoes_brechos() {

    try {

      const resultado = await api.get(`/brechos`);
      set_array_brechos(resultado.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function informacoes_produtos() {

    try {

      const resultado = await api.get(`/produtos`);
      set_array_produtos(resultado.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function buscar_categorias() {
    try {
      const categorias = await api.get(`/categorias`);
      set_array_categorias(categorias.data);
    } catch (erro) {
      console.error(erro);
    };
  };


  function quantidade_de_produtos_sacola() {

    if (Array.isArray(sacola)) {

      return sacola.length;
    } else {

      return 0;
    };
  };

  const next = () => {
    if (startIndex + itemsToShow < array_brechos.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const nextLancamentos = () => {
    if (startIndexLancamentos + lancamentosToShow < 8) { // ajusta pro total de lançamentos
      setStartIndexLancamentos(startIndexLancamentos + 1);
    }
  };

  const prevLancamentos = () => {
    if (startIndexLancamentos > 0) {
      setStartIndexLancamentos(startIndexLancamentos - 1);
    }
  };

  const comentarios = [
    { nome: "Sarah M.", texto: "Adorei as peças!" },
    { nome: "João K.", texto: "Entrega super rápida!" },
    { nome: "Lúcia R.", texto: "Tudo impecável. Voltarei!" },
    { nome: "Sarah M.", texto: "Adorei as peças!" },
    { nome: "João K.", texto: "Entrega super rápida!" },
    { nome: "Lúcia R.", texto: "Tudo impecável. Voltarei!" },
    { nome: "Sarah M.", texto: "Adorei as peças!" },
    { nome: "João K.", texto: "Entrega super rápida!" },
  ];


  const nextFeedBack = () => {
    if (startIndexFeedBack + FeedBackToShow < 8) {
      setStartIndexFeedBack(startIndexFeedBack + 1);
    }
  };

  const prevFeedBack = () => {
    if (startIndexFeedBack > 0) {
      setStartIndexFeedBack(startIndexFeedBack - 1);
    }
  };

  useEffect(() => {

    if (compra_realizada) {

      setTimeout(() => {

        set_compra_realizada(false);
      }, 2000);
    };

  }, [compra_realizada])

  useEffect(() => {

    const params = new URLSearchParams(window.location.search);

    if (params.get("status") == "sucesso") {

      atualizar_usuario_pos_compra();
      set_compra_realizada(true)
      set_sacola_aberta(false);
    }
  }, [sacola_aberta]);

  useEffect(() => {
    const animateEstrela = async (controls) => {
      while (true) {
        const escala = Math.random() * 0.6 + 0.7 // entre 0.9 e 1.2
        const duracao = Math.random() * 1.2 + 0.8     // entre 1s e 3s

        await controls.start({
          scale: escala,
          transition: { duration: duracao, ease: 'easeInOut' },
        });
      }
    };

    animateEstrela(controlsEstrelaVerde);
    animateEstrela(controlsEstrelaAmarela);
  }, []);

  useEffect(() => {

    const encontrar_brecho = array_brechos.find(brecho => brecho._id == usuario_logado._id);

    if (encontrar_brecho) {

      set_tipo_de_header(`brecho`);
    } else {

      set_tipo_de_header(`usuario`);
    };

  }, []);

  async function atualizar_usuario_pos_compra() {

    try {

      const usuario_atualizado = { ...usuario_logado, sacola: [] };
      const dados_usuario = await api.put(`/clientes/${usuario_atualizado._id}`, usuario_atualizado);
      set_usuario_logado(dados_usuario.data);
    } catch (erro) {

      console.error(erro);
    };
  };

  function nome_brechos(fk_id) {

    const encontrar_brecho = array_brechos.find(brecho => brecho._id == fk_id);

    if (encontrar_brecho) {

      return encontrar_brecho.nome_brecho;
    };
  };

  function imagem_brechos(fk_id_brecho) {

    const encontrar_brecho = array_brechos.find(brecho => brecho._id == fk_id_brecho);

    if (encontrar_brecho) {

      return encontrar_brecho.logo;
    };
  };

  function preco_produtos(produto_selecionado) {

    const preco_formatado = produto_selecionado.toFixed(2).replace('.', ',');

    return `R$${preco_formatado}`;
  };

  function ir_ate_produto(produto_selecionado) {

    set_produto(produto_selecionado);
    router.push(`/produto`);
    set_sacola_ou_produto(`/`);
  };

  function ir_ate_perfil_brecho(brecho) {

    set_brecho_selecionado(brecho);
    setFormCadastroBrecho(brecho)
    router.push(`/perfil_brecho`)

  }

  const handleCategoryClick = (nome_categoria) => {
    const categoria_encontrada = array_categorias.find(
      (c) => c.nome.toLowerCase() === nome_categoria.toLowerCase()
    );

    if (categoria_encontrada) {
      set_id_categoria_selecionada(categoria_encontrada._id);
      router.push(`/pesquisa_de_produtos?categoria=${encodeURIComponent(categoria_encontrada._id)}`);
    } else {
      console.log("Categoria não encontrada!");
    }
  };


  const redirecionarParaTelaEmAndamento = () => {
    router.push(`/estamosChegando`);
  };

  return (
    <AnimatePresence>

      {compra_realizada && <Compra_realizada />}

      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>

        <Header tipo={tipo_de_header} />

        {/* home page seção um */}
        <div className={styles["home-page-secao-um-container"]}>
          <div className={styles["secao-um-texto-container-home-page"]}>
            <h1>ENCONTRE ROUPAS QUE COMBINAM COM SEU ESTILO</h1>
            <p>Explore nossa seleção exclusiva de roupas em brechós cuidadosamente curados, onde cada peça reflete personalidade e estilo único. Encontre itens que combinam com você e expressam sua individualidade de forma autêntica.</p>
            <button onClick={() => router.push(`/pesquisa_de_produtos`)}>Compre Já</button>
          </div>

          <div className={styles["container-imagem-roupas-numero-um"]}>
          </div>

          <motion.img
            className={styles['estrela-verde-home-page']}
            src="./img/Estrela_dois_cadastro.svg"
            alt="estrela verde grande"
            animate={controlsEstrelaVerde}
            initial={{ scale: 1 }}
          />
          <motion.img
            className={styles['estrela-amarela-home-page']}
            src="./img/Estrela_um_cadastro.svg"
            alt="estrela amarela pequena"
            animate={controlsEstrelaAmarela}
            initial={{ scale: 1 }}
          />

        </div>

        <div className={styles["line-home-page-secao-um"]}>
        </div>
        {/* home page seção um */}

        {/* home page seção dois */}
        <div className={styles["home-page-secao-dois-container"]}>
          <div className={styles["container-sinalizacao-brechos-home-page"]}>
            <div className={styles["icon-quadrado-brechos-home-page"]}></div>
            <p>Brechós</p>
          </div>

          <div className={styles["container-titulo-brechos-home-page"]}>
            <p>BRECHÓS</p>
          </div>

          {/* Mudar dps para ficar verde só quando a pessoa passar o mouse encima */}
          <div className={styles["buttons-anterior-proximo-container-dois"]}>
            <button className={styles['button-anterior-carrossel']} onClick={prev}><img src="./img/icons/CarrosselAnteriorMarrom.svg" alt="Anterior" /></button>
            <button className={styles['button-proximo-carrossel']} onClick={next}><img src="./img/icons/CarrosselProximoMarrom.svg" alt="Anterior" /></button>
          </div>
          {/* Mudar dps para ficar verde só quando a pessoa passar o mouse encima */}

          <AnimatePresence mode="wait">
            <div className={styles["carousel-wrapper"]}>
              <motion.div
                animate={{ x: -startIndex * 390 }} // ajuste se o card for 270px, inclua margens
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={styles["container-brechos-cards-home-page"]}
              >
                {array_brechos.map((brecho, i) => (
                  <div className={styles["card-brecho-home-page"]} key={i}>
                    <div className={styles["container-imagem-brecho-cinza"]}>
                      <div className={styles["container-imagem-brecho"]} onClick={() => ir_ate_perfil_brecho(brecho)}>
                        <img src={brecho.logo} alt={brecho.nome_brecho} />
                      </div>
                    </div>
                    <h2 className={styles["nome-brecho"]}>{brecho.nome_brecho}</h2>
                  </div>
                ))}
              </motion.div>
            </div>
          </AnimatePresence>
        </div>
        {/* home page seção dois */}

        {/* home page seção tres */}
        <div className={styles["home-page-secao-tres-container"]}>
          <div className={styles["container-sinalizacao-destaques-home-page"]}>
            <div className={styles["icon-quadrado-destaques-home-page"]}></div>
            <p>Destaques</p>
          </div>

          <div className={styles["home-page-titulo-secao-tres"]}>
            <p>LANÇAMENTOS</p>
          </div>

          <div className={styles["buttons-anterior-proximo-container-tres"]}>
            <button className={styles['button-anterior-carrossel']} onClick={prevLancamentos}><img src="./img/icons/CarrosselAnteriorMarrom.svg" alt="Anterior" /></button>
            <button className={styles['button-proximo-carrossel']} onClick={nextLancamentos}><img src="./img/icons/CarrosselProximoMarrom.svg" alt="Anterior" /></button>
          </div>

          <AnimatePresence mode="wait">
            <div className={styles["carousel-wrapper"]}>
              <motion.div
                animate={{ x: -startIndexLancamentos * 390 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className={styles["container-cards-alinhamento-lancamentos-secao-tres"]}
              >
                {[...array_produtos].slice(-8).reverse().map((produto, i) => (
                  <div className={styles["card-lancamento-secao-tres"]} key={i} onClick={() => ir_ate_produto(produto)}>

                    <div className={styles["container-card-imagem-roupa-lancamentos"]}>
                      <img src={produto.imagem[0]} alt={produto.nome} />
                    </div>
                    <div className={styles["alinhamento-preco-roupa-card-lancamento"]}>
                      <div className={styles["alinhamento-img-perfil-nome-usuario-secao-tres"]}>
                        <p className={styles['nome-roupa-lancamentos-card']}>{produto.nome}</p>
                        <img src={imagem_brechos(produto.fk_id_brecho)} alt="" />
                      </div>
                      <p className={styles['preco-roupa-lancamentos-card']}>{preco_produtos(produto.preco)}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </AnimatePresence>

          <div className={styles["alinhamento-buttons-secao-tres-lancamentos"]}>
            <button onClick={() => router.push(`/pesquisa_de_produtos`)}>Ver todos</button>
          </div>
        </div>
        {/* home page seção tres */}

        {/* home page seção quatro */}
        <div className={styles["home-page-container-secao-quatro"]}>
          <div className={styles["container-titulo-secao-quatro"]}>
            <p>ENCONTRE O QUE PROCURA</p>
          </div>

          <div className={styles["alinhamento-cards-secao-quatro"]}>
            <div className={styles["container-um-cards-secao-quatro"]}>
              <div className={styles["card-um-secao-quatro"]} onClick={() => handleCategoryClick('Roupas')}>
                <p>Roupas</p>
              </div>

              <div className={styles["card-dois-secao-quatro"]} onClick={() => handleCategoryClick('Acessórios')}>
                <p>Acessórios</p>
              </div>
            </div>

            <div className={styles["container-dois-cards-secao-quatro"]}>
              <div className={styles["card-tres-secao-quatro"]} onClick={() => redirecionarParaTelaEmAndamento()}>
                <p>Doações</p>
              </div>

              <div className={styles["card-quatro-secao-quatro"]} onClick={() => handleCategoryClick('Calçados')}>
                <p>Calçados</p>
              </div>
            </div>
          </div>
        </div>

        {/* home page seção de teste - Personalização de produtos */}
        <div className={styles["container-personalizacao-de-produto"]}>
          <div className={styles["alinhamento-container-personalizacao-de-produto"]}>
            <div className={styles["container-titulo-personalizacao-de-produto"]}>
              <p className={styles["titulo-personalizacao-de-produto"]}>PERSONALIZE SEUS PRODUTOS</p>

              {/* <div className={styles["line-personalizacao-de-produto"]}></div> */}

              <p className={styles["subtitulo-personalizacao-de-produto"]}>
                Novidade no Fly! Agora você pode interagir diretamente com a gente e personalizar suas compras
                na nossa loja oficial. Dê seu toque único a cada produto!
              </p>
            </div>

            <div className={styles["container-card-personalizacao"]}>
              <div className={styles["container-conteudo-personalizacao"]}>
                <div className={styles["container-imagem-personalizacao"]}>
                  <img
                    src="/img/imagens_telaInicial/CardImagemTresTelaInicial.svg"
                    alt="Personalização de produtos"
                    className={styles["imagem-personalizacao"]}
                  />
                </div>

                {/* <div className={styles["icone-estrela-amarela-personalizacao"]}>
                  <img src="./img/Estrela_um_cadastro.svg" alt="estrela amarela" />
                </div> */}

                <div className={styles["texto-personalizacao"]}>
                  <h3 className={styles["titulo-card-personalizacao"]}>
                    Transforme seus produtos com personalização exclusiva
                  </h3>
                </div>

                {/* <div className={styles["icone-estrela-verde-personalizacao"]}>
                  <img src="./img/Estrela_dois_cadastro.svg" alt="estrela verde" />
                </div> */}
              </div>

              <div className={styles["container-botao-personalizacao"]}>
                <button onClick={() => router.push(`/escolha_de_personalizacao_produtos`)}className={styles["botao-avancar-personalizacao"]}>
                  Avançar
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* {usuario_logado != `` && !conversa_aberta && <Chat />}
        {conversa_aberta && <Chat_conversa />} */}

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};