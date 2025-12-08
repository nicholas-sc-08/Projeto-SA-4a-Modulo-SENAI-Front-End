"use client";

import React, { useEffect, useState } from "react";
import styles from "@/app/cadastro_produto/page.module.css";
import Header from "@/components/header/Header";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import Footer from "@/components/footer/Footer";
import Pop_up_cadastro_produto from "@/components/pop_up_cadastro_produto/Pop_up_cadastro_produto";
import Pop_up_erro_cadastro_produto from "@/components/pop_up_cadastro_produto/Pop_up_erro_cadastro_produto";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalContext } from "@/context/GlobalContext";

export default function Cadastro_Produto() {
  const router = useRouter();

  const { usuario_logado } = useGlobalContext();
  const { array_produtos, set_array_produtos } = useGlobalContext();
  const { informacoes_editar_produto, set_informacoes_editar_produto } = useGlobalContext();
  const { tipo_de_header } = useGlobalContext();

  const [pop_up_notificacao_cadastro_produto, set_pop_up_notificacao_cadastro_produto] = useState(false);
  const [pop_up_erro_cadastro, set_pop_up_erro_cadastro] = useState(false);

  const [imagens, setImagens] = useState([]);
  const [imagemPrincipal, setImagemPrincipal] = useState(null);

  const [coresSelecionadas, setCoresSelecionadas] = useState([]);

  const tecidos_disponiveis = ["Algodão", "Poliéster", "Linho", "Seda", "Jeans", "Sarja", "Couro", "Malha", "Viscose", "Veludo", "Moletom", "Crepe", "Tricoline", "La", "Nylon", "Oxford", "Organza", "Chiffon", "Tule", "Elastano", "Lycra", "Canvas", "Suede", "Vinil", "Sintético", "Cânhamo", "Mesh", "Denim", "Jacquard", "Renda", "PVC", "EVA", "Neoprene"];
  const [tecidosFiltrados, setTecidosFiltrados] = useState(tecidos_disponiveis);
  const [inputTecido, setInputTecido] = useState("");
  const [tecidoEmFoco, setTecidoEmFoco] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [categoriasFiltradas, setCategoriasFiltradas] = useState([]);
  const [inputCategoria, setInputCategoria] = useState("");
  const [categoriaEmFoco, setCategoriaEmFoco] = useState(false);

  const [listaMarcas, setListaMarcas] = useState([]);
  const [marcasFiltradas, setMarcasFiltradas] = useState([]);
  const [inputMarca, setInputMarca] = useState("");
  const [marcaEmFoco, setMarcaEmFoco] = useState(false);

  const [tamanhosSelecionados, setTamanhosSelecionados] = useState([]);
  const [quantidade, setQuantidade] = useState(1);

  // ---------- adição: estados para edição por clique ----------
  const [editandoNome, setEditandoNome] = useState(false);
  const [editandoPreco, setEditandoPreco] = useState(false);
  // ------------------------------------------------------------

  const [array_cadastro_produto, setArray_cadastro_produto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    condicao: "",
    cor: [],
    imagem: [],
    fk_id_marca: "",
    composicao: "",
    fk_id_categoria: "",
    tamanho: "",
    quantidade: 1,
    fk_id_brecho: usuario_logado?._id || "",
  });

  // Inicialização: buscar dados e preencher edição se necessário
  useEffect(() => {
    buscar_produtos();
    buscar_categorias();
    buscar_marcas();

    if (informacoes_editar_produto?.nome) {
      const info = informacoes_editar_produto;
      setArray_cadastro_produto({
        nome: info.nome || "",
        descricao: info.descricao || "",
        preco: info.preco || "",
        condicao: info.condicao || "",
        cor: info.cor || [],
        imagem: info.imagem || [],
        fk_id_marca: info.fk_id_marca || "",
        composicao: info.composicao || "",
        fk_id_categoria: info.fk_id_categoria || "",
        tamanho: info.tamanho || "",
        quantidade: info.quantidade || 1,
        fk_id_brecho: usuario_logado?._id || "",
      });
      setQuantidade(info.quantidade || 1);
      setTamanhosSelecionados(info.tamanho ? String(info.tamanho).split(",") : []);
      setImagens(info.imagem || []);
      setImagemPrincipal(info.imagem?.[0] || null);
      setCoresSelecionadas(info.cor || []);
      setInputMarca(info.marca || "");
      setInputTecido(info.composicao || "");
      setInputCategoria(info.categoria || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setArray_cadastro_produto(prev => ({ ...prev, cor: coresSelecionadas }));
  }, [coresSelecionadas]);

  useEffect(() => {
    setArray_cadastro_produto(prev => ({ ...prev, composicao: inputTecido }));
  }, [inputTecido]);

  useEffect(() => {
    const resultado = tecidos_disponiveis.filter((tecido) =>
      tecido.toLowerCase().includes(inputTecido.toLowerCase())
    );
    setTecidosFiltrados(resultado);
  }, [inputTecido]);

  useEffect(() => {
    const resultado = categorias.filter((categoria) =>
      categoria.nome?.toLowerCase().includes(inputCategoria.toLowerCase())
    );
    setCategoriasFiltradas(resultado);
  }, [inputCategoria, categorias]);

  useEffect(() => {
    const resultado = listaMarcas.filter((marca) =>
      marca.nome?.toLowerCase().includes(inputMarca.toLowerCase())
    );
    setMarcasFiltradas(resultado);
  }, [inputMarca, listaMarcas]);

  useEffect(() => {
    if (pop_up_notificacao_cadastro_produto) {
      const t = setTimeout(() => set_pop_up_notificacao_cadastro_produto(false), 1700);
      return () => clearTimeout(t);
    }
  }, [pop_up_notificacao_cadastro_produto]);

  useEffect(() => {
    if (pop_up_erro_cadastro) {
      const t = setTimeout(() => set_pop_up_erro_cadastro(false), 1500);
      return () => clearTimeout(t);
    }
  }, [pop_up_erro_cadastro]);

  // API helpers
  async function buscar_categorias() {
    try {
      const res = await api.get("/categorias");
      setCategorias(res.data);
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  }
  async function buscar_produtos() {
    try {
      const res = await api.get("/produtos");
      set_array_produtos?.(res.data);
    } catch (error) {
      console.error("Erro ao buscar produtos", error);
    }
  }
  async function buscar_marcas() {
    try {
      const res = await api.get("/marcas");
      setListaMarcas(res.data);
    } catch (error) {
      console.error("Erro ao buscar marcas", error);
    }
  }

  // imagens
  async function adicionar_imagem(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const urlLocal = URL.createObjectURL(file);
    setImagens(prev => [...prev, urlLocal]);
    if (!imagemPrincipal) setImagemPrincipal(urlLocal);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Fly_Brecho");
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/fly-cloud-name/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.secure_url) {
        setImagens(prev => {
          const idx = prev.findIndex(u => u === urlLocal);
          if (idx !== -1) {
            const copy = [...prev];
            copy[idx] = data.secure_url;
            return copy;
          }
          return [...prev, data.secure_url];
        });
        setArray_cadastro_produto(prev => ({
          ...prev,
          imagem: [...(prev.imagem || []), data.secure_url]
        }));
        if (imagemPrincipal === urlLocal || !imagemPrincipal) setImagemPrincipal(data.secure_url);
        URL.revokeObjectURL(urlLocal);
      } else {
        console.error("Cloudinary não retornou secure_url", data);
        alert("Erro ao subir imagem: URL não retornada.");
      }
    } catch (error) {
      console.error("Erro ao fazer upload da imagem:", error);
      alert("Erro ao enviar imagem. Verifique o console.");
    }
  }

  function removerImagem(index) {
    setImagens(prev => {
      const novas = prev.filter((_, i) => i !== index);
      setArray_cadastro_produto(prevProd => ({ ...prevProd, imagem: novas }));
      if (prev[index] === imagemPrincipal) setImagemPrincipal(novas[0] || null);
      return novas;
    });
  }

  function selecionarImagemPrincipal(url) {
    if (imagens.includes(url)) setImagemPrincipal(url);
  }

  // quantidade e tamanhos
  function aumentarQuantidade() {
    setQuantidade(q => {
      const nova = q + 1;
      setArray_cadastro_produto(prev => ({ ...prev, quantidade: nova }));
      return nova;
    });
  }
  function diminuirQuantidade() {
    setQuantidade(q => {
      if (q <= 1) return 1;
      const nova = q - 1;
      setArray_cadastro_produto(prev => ({ ...prev, quantidade: nova }));
      return nova;
    });
  }

  function selecionarTamanho(t) {
    setTamanhosSelecionados(prev => {
      if (prev.includes(t)) {
        const novo = prev.filter(x => x !== t);
        setArray_cadastro_produto(p => ({ ...p, tamanho: novo.join(",") }));
        return novo;
      } else {
        const novo = [...prev, t];
        setArray_cadastro_produto(p => ({ ...p, tamanho: novo.join(",") }));
        return novo;
      }
    });
  }

  // EyeDropper
  async function selecionarCorEyeDropper() {
    if (!window.EyeDropper) {
      alert("Seu navegador não suporta a EyeDropper API");
      return;
    }
    try {
      const eye = new window.EyeDropper();
      const result = await eye.open();
      setCoresSelecionadas(prev => {
        if (prev.includes(result.sRGBHex)) return prev;
        if (prev.length >= 3) {
          alert("Você já selecionou o máximo de 3 cores");
          return prev;
        }
        return [...prev, result.sRGBHex];
      });
    } catch (err) {
      console.error("Erro EyeDropper:", err);
    }
  }

  async function substituirCor(index) {
    if (!window.EyeDropper) {
      alert("Seu navegador não suporta a EyeDropper API");
      return;
    }
    try {
      const eye = new window.EyeDropper();
      const { sRGBHex } = await eye.open();
      setCoresSelecionadas(prev => {
        const novo = [...prev];
        novo[index] = sRGBHex;
        return novo;
      });
    } catch (err) {
      console.error("Erro substituir cor:", err);
    }
  }
  function removerCor() { setCoresSelecionadas([]); }

  // cadastrar / editar
  async function cadastrar_produto() {
    try {
      const produtoParaEnviar = {
        ...array_cadastro_produto,
        preco: Number(array_cadastro_produto.preco || 0),
        quantidade: Number(array_cadastro_produto.quantidade || quantidade),
        cor: array_cadastro_produto.cor || coresSelecionadas,
        imagem: array_cadastro_produto.imagem || imagens,
        tamanho: (tamanhosSelecionados.length ? tamanhosSelecionados.join(",") : array_cadastro_produto.tamanho) || "",
        fk_id_brecho: usuario_logado?._id || "",
      };
      await api.post("/produtos", produtoParaEnviar);
      await buscar_produtos();
      set_pop_up_notificacao_cadastro_produto(true);

      setArray_cadastro_produto({
        nome: "", descricao: "", preco: "", condicao: "", cor: [], imagem: [], fk_id_marca: "", composicao: "", fk_id_categoria: "", tamanho: "", quantidade: 1, fk_id_brecho: usuario_logado?._id || ""
      });
      setImagens([]); setImagemPrincipal(null); setCoresSelecionadas([]); setTamanhosSelecionados([]); setQuantidade(1); setInputMarca(""); setInputCategoria(""); setInputTecido("");
      setTimeout(() => router.push("/gestao_de_estoque"), 1200);
    } catch (error) {
      console.error("Erro ao cadastrar produto", error);
      set_pop_up_erro_cadastro(true);
    }
  }

  async function editar_produto() {
    if (!informacoes_editar_produto?._id) {
      alert("Nenhuma informação de edição disponível.");
      return;
    }
    try {
      const produtoParaEnviar = {
        ...array_cadastro_produto,
        preco: Number(array_cadastro_produto.preco || 0),
        quantidade: Number(array_cadastro_produto.quantidade || quantidade),
        cor: array_cadastro_produto.cor || coresSelecionadas,
        imagem: array_cadastro_produto.imagem || imagens,
        tamanho: (tamanhosSelecionados.length ? tamanhosSelecionados.join(",") : array_cadastro_produto.tamanho) || "",
      };
      await api.put(`/produtos/${informacoes_editar_produto._id}`, produtoParaEnviar);
      await buscar_produtos();
      set_informacoes_editar_produto?.(null);
      set_pop_up_notificacao_cadastro_produto(true);
      setTimeout(() => router.push("/gestao_de_estoque"), 900);
    } catch (error) {
      console.error("Erro ao editar produto", error);
      set_pop_up_erro_cadastro(true);
    }
  }

  const nomeExibido = array_cadastro_produto.nome?.trim() || "Nome do Produto";

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
        {pop_up_notificacao_cadastro_produto && <Pop_up_cadastro_produto />}
        {pop_up_erro_cadastro && <Pop_up_erro_cadastro_produto />}

        <Header tipo={tipo_de_header} />

        <div className={styles["cabecalho-titulo"]}>
          <button className={styles["botao-seta-voltar"]} onClick={() => router.push(-1)}>
            <img src="/img/seta-esquerda.png" alt="Voltar" />
          </button>
          <h2 className={styles["titulo"]}>Cadastro Produto</h2>
        </div>

        <div className={styles["container-cadastro-produto"]}>
          <div className={styles["galeria"]}>
            {[0, 1, 2].map((_, index) => {
              const imagem = imagens[index];
              return imagem ? (
                <div key={index} className={styles["miniatura"]} onClick={() => selecionarImagemPrincipal(imagem)}>
                  <img src={imagem} alt={`Imagem ${index}`} />
                  <button type="button" className={styles["botao-remover-imagem"]} onClick={(e) => { e.stopPropagation(); removerImagem(index); }} aria-label={`Remover imagem ${index + 1}`}>&times;</button>
                </div>
              ) : (
                <label key={index} className={styles["miniatura"]}>
                  <input type="file" accept="image/*" onChange={adicionar_imagem} hidden />
                  <img className={styles["AddImage"]} src="./img/ImagemAdd.svg" alt="Adicionar" />
                </label>
              );
            })}
          </div>

          <div className={styles["imagem-principal"] + (imagemPrincipal ? " has-image" : "")}>
            {imagemPrincipal ? (
              <img src={imagemPrincipal} alt="Imagem Principal" />
            ) : (
              <label className={styles["botao-adicionar-imagem"]}>
                <input type="file" accept="image/*" onChange={adicionar_imagem} hidden />
                <img src="./img/ImagemAdd.svg" alt="Adicionar Imagem" className={styles["AddImage"]} />
              </label>
            )}
          </div>

          <div className={styles["detalhes-produto"]}>
            <div>
              {/* NOME EDITÁVEL */}
              {editandoNome ? (
                <input
                  autoFocus
                  type="text"
                  value={array_cadastro_produto.nome}
                  onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, nome: e.target.value })}
                  onBlur={() => setEditandoNome(false)}
                  className={styles["inpt-edit"]}
                />
              ) : (
                <span className={styles["nome-produto"]} onClick={() => setEditandoNome(true)}>
                  {nomeExibido}
                </span>
              )}
            </div>

            <div>
              {/* PREÇO EDITÁVEL */}
              {editandoPreco ? (
                <input
                  autoFocus
                  type="number"
                  step="0.01"
                  value={array_cadastro_produto.preco}
                  onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, preco: e.target.value })}
                  onBlur={() => setEditandoPreco(false)}
                  className={styles["inpt-edit-preco"]}
                />
              ) : (
                <span className={styles["preco-produto"]} onClick={() => setEditandoPreco(true)}>
                  R$ {array_cadastro_produto.preco || "Preço"}
                </span>
              )}
            </div>

            <div className={styles["input-group-descricao"]}>
              <textarea placeholder="Descrição do produto" value={array_cadastro_produto.descricao} onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, descricao: e.target.value })} />
            </div>

            <hr />

            <div className={styles["input-group-alinhados"]}>
              <div className={styles["input-tamanho"]}>
                <label>Tamanho</label>
                <input type="text" className={styles["tamanho"]} maxLength={4} value={array_cadastro_produto.tamanho} onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, tamanho: e.target.value.toUpperCase() })} />
              </div>

              <div className={styles["quantidade-container"]}>
                <div className={styles["quantidade-titulo"]}>Quantidade</div>
                <div className={styles["quantidade"]}>
                  <button className={styles["botao-quantidade"]} onClick={diminuirQuantidade}><img src="./img/icons/seta-esquerda.png" alt="Diminuir" className={styles["icone-quantidade"]} /></button>
                  <div className={styles["quantidade-numero"]}>{quantidade}</div>
                  <button className={styles["botao-quantidade"]} onClick={aumentarQuantidade}><img src="./img/icons/seta-direita.png" alt="Aumentar" className={styles["icone-quantidade"]} /></button>
                </div>
              </div>

              <div className={styles["input-tecido"]} style={{ position: "relative" }}>
                <label className={styles["titulo-tecido"]}>Tecido</label>
                <input type="text" className={styles["tecido"]} value={inputTecido} onChange={(e) => { setInputTecido(e.target.value); setArray_cadastro_produto({ ...array_cadastro_produto, composicao: e.target.value }); }} onFocus={() => setTecidoEmFoco(true)} onBlur={() => setTimeout(() => setTecidoEmFoco(false), 200)} placeholder="Digite o tecido" autoComplete="off" />
                {tecidoEmFoco && tecidosFiltrados.length > 0 && (
                  <ul className={styles["lista-tecidos"]}>
                    {tecidosFiltrados.map((tecido, i) => (<li key={i} onClick={() => { setInputTecido(tecido); setArray_cadastro_produto({ ...array_cadastro_produto, composicao: tecido }); setTecidoEmFoco(false); }}>{tecido}</li>))}
                  </ul>
                )}
              </div>

              <div className={styles["cores"]}>
                <label>Seleção de Cores</label>
                <div className={styles["divisao-cores"]}>
                  <button className={styles["cor-seletor"]} onClick={selecionarCorEyeDropper}><img className={styles["rodaDeCores"]} src="./img/roda-de-cores.svg" alt="Selecionar Cor" /></button>
                  <div className={styles["cores-selecionadas"]}>
                    {coresSelecionadas.map((cor, idx) => (<div key={idx} className={styles["cor-selecionada"]} style={{ backgroundColor: cor }} onClick={() => substituirCor(idx)} title="Clique para substituir essa cor" />))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className={styles["titulo2"]}>Detalhes do Produto</h2>
        <hr className={styles["linha-titulo-2"]} />

        <div className={styles["container-detalhes-produtos"]}>
          <div className={styles["formulario"]}>
            <div className={styles["input-group"]} style={{ position: "relative" }}>
              <label className={styles["label-small"]}>Marca do produto</label>
              <input type="text" placeholder="Buscar marcas" className={styles["input-group-marcas"]} value={inputMarca} onChange={(e) => { setInputMarca(e.target.value); setArray_cadastro_produto(prev => ({ ...prev, fk_id_marca: "" })); }} onFocus={() => setMarcaEmFoco(true)} onBlur={() => setTimeout(() => setMarcaEmFoco(false), 200)} autoComplete="off" />
              {marcaEmFoco && marcasFiltradas.length > 0 && (<ul className={styles["lista-marcas"]}>{marcasFiltradas.map(marca => (<li key={marca._id} onClick={() => { setInputMarca(marca.nome); setArray_cadastro_produto(prev => ({ ...prev, fk_id_marca: marca._id })); setMarcaEmFoco(false); }}>{marca.nome}</li>))}</ul>)}

              <label className={styles["label-small"]} style={{ marginTop: "0.8rem" }}>Estado do produto</label>
              <select required value={array_cadastro_produto.condicao} onChange={(e) => setArray_cadastro_produto({ ...array_cadastro_produto, condicao: e.target.value })} className={styles["input-group-estado"]}>
                <option value="">Selecione o estado</option>
                {["Novo", "Semi-Novo", "Usado", "Velho"].map((estado, i) => (<option key={i} value={estado}>{estado}</option>))}
              </select>
            </div>
          </div>

          <div className={styles["formulario-direito"]} style={{ position: "relative" }}>
            <label className={styles["input-categoria-label"]}>Categoria</label>
            <input type="text" className={styles["input-categoria"]} placeholder="Digite para buscar categoria" value={inputCategoria} onChange={(e) => { setInputCategoria(e.target.value); setArray_cadastro_produto(prev => ({ ...prev, fk_id_categoria: "" })); }} onFocus={() => setCategoriaEmFoco(true)} onBlur={() => setTimeout(() => setCategoriaEmFoco(false), 200)} autoComplete="off" />
            {categoriaEmFoco && categoriasFiltradas.length > 0 && (<ul className={styles["lista-categorias"]}>{categoriasFiltradas.map(cat => (<li key={cat._id} onClick={() => { setInputCategoria(cat.nome); setArray_cadastro_produto(prev => ({ ...prev, fk_id_categoria: cat._id })); setCategoriaEmFoco(false); }}>{cat.nome}</li>))}</ul>)}

            <button onClick={informacoes_editar_produto?.nome ? editar_produto : cadastrar_produto} className={styles["botao-cadastrar"]} style={informacoes_editar_produto ? { backgroundColor: "var(--cor_um)" } : {}}>
              {informacoes_editar_produto?.nome ? "Salvar Alterações" : "Cadastrar Produto"}
            </button>
          </div>
        </div>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
