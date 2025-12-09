"use client";

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import styles from '@/app/perfil_brecho/page.module.css';
import { useGlobalContext } from '@/context/GlobalContext';
import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import api from '@/services/api';
import { useRouter } from 'next/navigation';
import ModalPersonalizacaoProdutos from '@/components/modalPersonalizacaoProduto/ModalPersonalizacaoProduto';

function page() {
  const { tipo_de_header, usuario_logado, array_brechos } = useGlobalContext();
  const [divAtiva, setDivAtiva] = useState("sobre-brecho");

  // Estados para armazenar os dados do brechó
  const [dadosBrecho, setDadosBrecho] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [descricao, setDescricao] = useState(null);
  const [redesSociais, setRedesSociais] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { produto, set_produto } = useGlobalContext();
  const router = useRouter();
  const [modalAberto, setModalAberto] = useState(false);

  // ============================
  // 🔵 BUSCAR DADOS DO BRECHÓ
  // ============================
  async function buscarDadosBrecho() {
    try {
      if (!usuario_logado?._id) return;

      const response = await api.get(`/brechos/${usuario_logado._id}`);
      const data = response.data;

      console.log('✅ Dados do brechó:', data);
      setDadosBrecho(data);

    } catch (erro) {
      console.error('❌ Erro ao buscar dados do brechó:', erro);
    }
  }

  // ============================
  // 🔵 BUSCAR ENDEREÇO DO BRECHÓ
  // ============================
  async function buscarEndereco() {
    try {
      if (!usuario_logado?._id) return;

      const response = await api.get(`/enderecos`, {
        params: { fk_id_brecho: usuario_logado._id }
      });

      console.log('📍 Resposta do endereço:', response?.data);

      if (response && response.data) {
        let enderecoEncontrado = null;

        if (Array.isArray(response.data)) {
          enderecoEncontrado = response.data.find(e => e.fk_id_brecho === usuario_logado._id);
        } else if (response.data._id) {
          enderecoEncontrado = response.data;
        }

        if (enderecoEncontrado) {
          console.log('✅ Endereço encontrado:', enderecoEncontrado);
          setEndereco(enderecoEncontrado);
        }
      }
    } catch (erro) {
      console.error('❌ Erro ao buscar endereço:', erro);
    }
  }

  // ============================
  // 🔵 BUSCAR DESCRIÇÃO DO BRECHÓ
  // ============================
  async function buscarDescricao() {
    try {
      if (!usuario_logado?._id) return;

      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/descricao?fk_id_brecho=${usuario_logado._id}`
      );

      const res = await req.json();

      if (Array.isArray(res) && res.length > 0) {
        setDescricao(res[0]);
      }
    } catch (err) {
      console.log("Erro ao buscar descrição:", err);
    }
  }

  // ============================
  // 🔵 BUSCAR REDES SOCIAIS
  // ============================
  async function buscarRedesSociais() {
    try {
      if (!usuario_logado?._id) return;

      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/redes-sociais?fk_id_brecho=${usuario_logado._id}`
      );

      const res = await req.json();

      if (Array.isArray(res) && res.length > 0) {
        setRedesSociais(res[0]);
      }
    } catch (err) {
      console.log("Erro ao buscar redes sociais:", err);
    }
  }

  // ============================
  // 🔵 BUSCAR PRODUTOS DO BRECHÓ
  // ============================
  async function buscarProdutos() {
    try {
      if (!usuario_logado?._id) return;

      // Busca TODOS os produtos
      const response = await api.get('/produtos');
      const todosProdutos = response.data;

      // Filtra apenas os produtos que pertencem ao brechó logado
      const produtosDoBrecho = todosProdutos.filter(
        produto => produto.fk_id_brecho === usuario_logado._id
      );

      console.log('✅ Produtos do brechó:', produtosDoBrecho);

      // Define os produtos (você pode limitar a 10 se quiser)
      setProdutos(produtosDoBrecho);

    } catch (err) {
      console.error("❌ Erro ao buscar produtos:", err);
    }
  }

  function ir_para_produto(produto) {
    set_produto(produto);
    router.push('/produto');
  }

  // ============================
  // 🔵 IR PARA PERSONALIZAÇÃO
  // ============================
  function abrirModalPersonalizacao() {
    setModalAberto(true);
  }

  // ============================
  // CARREGAR DADOS AO MONTAR
  // ============================
  useEffect(() => {
    const carregarDados = async () => {
      if (usuario_logado && usuario_logado._id) {
        // Verifica se é um brechó
        const isBrecho = array_brechos.some(b => b._id === usuario_logado._id);

        if (isBrecho) {
          setLoading(true);
          await buscarDadosBrecho();
          await buscarEndereco();
          await buscarDescricao();
          await buscarRedesSociais();
          await buscarProdutos();
          setLoading(false);
        }
      }
    };

    carregarDados();
  }, [usuario_logado, array_brechos]);

  // Formatar data de criação
  const formatarData = (data) => {
    if (!data) return '';
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className={styles["toda-a-tela-content"]}>
        <Header tipo={tipo_de_header} />
        <div className={styles["entre-navbar-e-footer-content"]}>
          <p className={styles['texto-vazio']}>Carregando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles["toda-a-tela-content"]}>
      <Header tipo={tipo_de_header} />

      <div className={styles["entre-navbar-e-footer-content"]}>
        <div className={styles["perfil-brecho-content"]}>

          <div className={styles["logo-e-info-content"]}>
            <div className={styles["logo-brecho-content"]}>
              <img
                src={dadosBrecho?.logo || "./img/logo_brecho/logo-indigo-brecho.svg"}
                alt="logo-brecho"
              />
            </div>

            <div className={styles["nome-data-content"]}>
              <h1>{dadosBrecho?.nome_brecho || "Nome do Brechó"}</h1>
              <p>No Fly desde: {formatarData(dadosBrecho?.createdAt)}</p>
            </div>
          </div>

          <div className={styles["topicos-de-informacao-content"]}>
            <button
              onClick={() => setDivAtiva("sobre-brecho")}
              className={divAtiva === "sobre-brecho" ? styles["ativo"] : ""}
            >
              Sobre o brechó
            </button>

            <button
              onClick={() => setDivAtiva("informacoes")}
              className={divAtiva === "informacoes" ? styles["ativo"] : ""}
            >
              Informações
            </button>

            <button
              onClick={() => setDivAtiva("endereco")}
              className={divAtiva === "endereco" ? styles["ativo"] : ""}
            >
              Endereço
            </button>

            <button
              onClick={() => setDivAtiva("redes-sociais")}
              className={divAtiva === "redes-sociais" ? styles["ativo"] : ""}
            >
              Redes sociais
            </button>

            <button
              className={styles["btn-salvar-alteracoes"]}
              onClick={abrirModalPersonalizacao} // <- Aqui está a mudança
            >
              <Sparkles color="#3e2a21bd" strokeWidth={1} />
              Personalize seus produtos
            </button>
          </div>

          <div className={styles["informacoes-exibidas-content"]}>
            {divAtiva === "sobre-brecho" && (
              <>
                <div className={styles["titulo-topico-content"]}>
                  <p>Sobre o Brechó</p>
                </div>

                <div className={styles["infos-cadastradas-content"]}>
                  {descricao?.texto ? (
                    <p className={styles["texto-sobre"]}>
                      {descricao.texto}
                    </p>
                  ) : (
                    <p className={styles["texto-vazio"]}>
                      Ops, nada por aqui ainda.
                    </p>
                  )}
                </div>
              </>
            )}

            {divAtiva === "informacoes" && (
              <>
                <div className={styles["titulo-topico-content"]}>
                  <p>Informações de Contato</p>
                </div>

                <div className={styles["infos-cadastradas-content"]}>
                  <div className={styles["info-item"]}>
                    <label>Nome:</label>
                    <span>{dadosBrecho?.nome_brecho || "Não informado"}</span>
                  </div>

                  <div className={styles["info-item"]}>
                    <label>Email:</label>
                    <span>{dadosBrecho?.email || "Não informado"}</span>
                  </div>

                  <div className={styles["info-item"]}>
                    <label>Telefone:</label>
                    <span>{dadosBrecho?.telefone || "Não informado"}</span>
                  </div>
                </div>
              </>
            )}

            {divAtiva === "endereco" && (
              <>
                <div className={styles["titulo-topico-content"]}>
                  <p>Informações de Endereço</p>
                </div>

                <div className={styles["infos-cadastradas-content"]}>
                  {endereco ? (
                    <>
                      <div className={styles["info-item"]}>
                        <label>Estado:</label>
                        <span>{endereco.estado}</span>
                      </div>

                      <div className={styles["info-item"]}>
                        <label>Cidade:</label>
                        <span>{endereco.cidade}</span>
                      </div>

                      <div className={styles["info-item"]}>
                        <label>Bairro:</label>
                        <span>{endereco.bairro}</span>
                      </div>

                    </>
                  ) : (
                    <p className={styles["texto-vazio"]}>
                      Ops, nada por aqui ainda.
                    </p>
                  )}
                </div>
              </>
            )}

            {divAtiva === "redes-sociais" && (
              <>
                <div className={styles["titulo-topico-content"]}>
                  <p>Redes Sociais</p>
                </div>

                <div className={styles["infos-cadastradas-content"]}>
                  {redesSociais ? (
                    <>
                      {redesSociais.instagram && (
                        <div className={styles["info-item"]}>
                          <label>Instagram:</label>
                          <span>{redesSociais.instagram}</span>
                        </div>
                      )}

                      {redesSociais.facebook && (
                        <div className={styles["info-item"]}>
                          <label>Facebook:</label>
                          <span>{redesSociais.facebook}</span>
                        </div>
                      )}

                      {redesSociais.whatsapp && (
                        <div className={styles["info-item"]}>
                          <label>Whatsapp:</label>
                          <span>{redesSociais.whatsapp}</span>
                        </div>
                      )}

                      {!redesSociais.instagram && !redesSociais.facebook && !redesSociais.whatsapp && (
                        <p className={styles["texto-vazio"]}>
                          Ops, nada por aqui ainda.
                        </p>
                      )}
                    </>
                  ) : (
                    <p className={styles["texto-vazio"]}>
                      Ops, nada por aqui ainda.
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className={styles["produtos-do-brecho-content"]}>
          <div className={styles["header-produtos"]}>
            <h2>Produtos <span>({produtos.length})</span></h2>
            <button className={styles["btn-ver-todos"]}>Ver todos</button>
          </div>

          <div className={styles["grid-produtos"]}>
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <div key={produto._id} className={styles["card-produto"]} onClick={() => ir_para_produto(produto)}>
                  <div className={styles["img-produto"]}>
                    <img src={
                      Array.isArray(produto.imagem) && produto.imagem.length > 0
                        ? produto.imagem[0]
                        : "./img/produtos_personalizados/caixa/caixa_normal.svg"
                    } />
                  </div>
                  <p className={styles["nome-produto"]}>{produto.nome}</p>
                  <p className={styles["preco-produto"]}>
                    R$ {produto.preco ? produto.preco.toFixed(2).replace('.', ',') : '0,00'}
                  </p>
                </div>
              ))
            ) : (
              <div className={styles["texto-vazio"]}>
                <p>Ops, nada por aqui ainda.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ModalPersonalizacaoProdutos
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
      />

      <Footer />
    </div>
  );
}

export default page;