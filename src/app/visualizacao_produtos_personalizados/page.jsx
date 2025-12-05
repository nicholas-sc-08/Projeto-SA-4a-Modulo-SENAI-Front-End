"use client";

import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { useGlobalContext } from "@/context/GlobalContext";
import React, { useEffect, useState } from "react";
import styles from "@/app/visualizacao_produtos_personalizados/page.module.css";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { buscar_sacolas_brechos } from "@/services/sacolas_brechos/sacolas_brecho";

// 🔹 Mapeamento de imagens por produto
const mapeamento_imagens = {
  ecobag: {
    // Combinações completas: cor_corpo + cor_alca + padrao
    combinacoes_completas: {
      'amarelo-amarelo-logo_fly': '/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarela-logo-meio.png',
      'amarelo-amarelo-logo_fly_nome': '/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-nome-em-baixo.png',
      'amarelo-amarelo-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-em-baixo.png',
      
      'amarelo-verde-logo_fly': '/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-meio.png',
      'amarelo-verde-logo_fly_nome': '/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-nome-em-baixo.png',
      'amarelo-verde-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-em-baixo.png',
      
      'amarelo-areia-logo_fly': '/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-meio.png',
      'amarelo-areia-logo_fly_nome': '/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-nome-em-baixo.png',
      'amarelo-areia-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-em-baixo.png',
      
      'verde-amarelo-logo_fly': '/img/produtos_personalizados/ecobaag/comb/verde-amarelo-logo_fly.png',
      'verde-amarelo-logo_fly_nome': '/img/produtos_personalizados/ecobaag/comb/verde-amarelo-logo_fly_nome.png',
      'verde-amarelo-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/comb/verde-amarelo-logo_fly_embaixo.png',
      
      'verde-verde-logo_fly': '/img/produtos_personalizados/ecobaag/comb/verde-verde-logo_fly.png',
      'verde-verde-logo_fly_nome': '/img/produtos_personalizados/ecobaag/comb/verde-verde-logo_fly_nome.png',
      'verde-verde-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/comb/verde-verde-logo_fly_embaixo.png',
      
      'verde-areia-logo_fly': '/img/produtos_personalizados/ecobaag/comb/verde-areia-logo_fly.png',
      'verde-areia-logo_fly_nome': '/img/produtos_personalizados/ecobaag/comb/verde-areia-logo_fly_nome.png',
      'verde-areia-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/comb/verde-areia-logo_fly_embaixo.png',
      
      'areia-amarelo-logo_fly': '/img/produtos_personalizados/ecobaag/comb/areia-amarelo-logo_fly.png',
      'areia-amarelo-logo_fly_nome': '/img/produtos_personalizados/ecobaag/comb/areia-amarelo-logo_fly_nome.png',
      'areia-amarelo-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/comb/areia-amarelo-logo_fly_embaixo.png',
      
      'areia-verde-logo_fly': '/img/produtos_personalizados/ecobaag/comb/areia-verde-logo_fly.png',
      'areia-verde-logo_fly_nome': '/img/produtos_personalizados/ecobaag/comb/areia-verde-logo_fly_nome.png',
      'areia-verde-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/comb/areia-verde-logo_fly_embaixo.png',
      
      'areia-areia-logo_fly': '/img/produtos_personalizados/ecobaag/comb/areia-areia-logo_fly.png',
      'areia-areia-logo_fly_nome': '/img/produtos_personalizados/ecobaag/comb/areia-areia-logo_fly_nome.png',
      'areia-areia-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/comb/areia-areia-logo_fly_embaixo.png',
    },
    
    // Combinações cor + padrao (sem alça específica)
    cor_padrao: {
      'amarelo-logo_fly': '/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarela-logo-meio.png',
      'amarelo-logo_fly_nome': '/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-nome-em-baixo.png',
      'amarelo-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-em-baixo.png',
      
      'verde-logo_fly': '/img/produtos_personalizados/ecobaag/comb/verde-logo_fly.png',
      'verde-logo_fly_nome': '/img/produtos_personalizados/ecobaag/comb/verde-logo_fly_nome.png',
      'verde-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/comb/verde-logo_fly_embaixo.png',
      
      'areia-logo_fly': '/img/produtos_personalizados/ecobaag/comb/areia-logo_fly.png',
      'areia-logo_fly_nome': '/img/produtos_personalizados/ecobaag/comb/areia-logo_fly_nome.png',
      'areia-logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/comb/areia-logo_fly_embaixo.png',
    },
    
    // Só cor
    cores: {
      'amarelo': '/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-cor-base-amarelo.png',
      'verde': '/img/produtos_personalizados/ecobaag/cores/ecobag-cor-base-verde.png',
      'areia': '/img/produtos_personalizados/ecobaag/cores/ecobag-cor-base-areia.png',
    },
    
    // Só padrão
    padroes: {
      'logo_fly': '/img/produtos_personalizados/ecobaag/padrao/ecobag-nome-logo-meio.png',
      'logo_fly_nome': '/img/produtos_personalizados/ecobaag/padrao/ecobag-nome-logo-embaixo.png',
      'logo_fly_embaixo': '/img/produtos_personalizados/ecobaag/padrao/ecobag-logo.png',
    }
  },
  
  sacola: {
    cor_padrao: {
      'verde-logo_fly': '/img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-nome-meio.png',
      'verde-logo_fly_nome': '/img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-nome-embaixo.png',
      'verde-logo_fly_embaixo': '/img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-embaixo.png',
      
      'branco-logo_fly': '/img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-nome-meio.png.png',
      'branco-logo_fly_nome': '/img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-nome-embaixo.png',
      'branco-logo_fly_embaixo': '/img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-embaixo.png',
    },
    
    cores: {
      'verde': '/img/produtos_personalizados/sacola/sacola-verde-meio-virada.png',
      'branco': '/img/produtos_personalizados/sacola/sacola-branca-meio-virada.png',
    },
    
    padroes: {
      'logo_fly': '/img/produtos_personalizados/sacola/sacola-padrao-meio-virada-logo-nome-meio.png',
      'logo_fly_nome': '/img/produtos_personalizados/sacola/sacola-padrao-meio-virada-logo-nome-embaixo.png',
      'logo_fly_embaixo': '/img/produtos_personalizados/sacola/sacola-padrao-meio-virada-logo-embaixo.png',
    }
  },
  
  caixa: {
    padroes: {
      'logo_fly': '/img/produtos_personalizados/caixa/caixa-meio-virada-logo-embaixo.svg',
      'logo_fly_nome': '/img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-emcima.svg',
      'logo_fly_embaixo': '/img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-embaixo.svg',
    }
  }
};

// 🔹 Função para buscar imagem dinamicamente
const buscar_imagem_produto = (produto, selecoes, imagemPadrao) => {
  const config = mapeamento_imagens[produto];
  if (!config) return imagemPadrao;

  const { cor_corpo, cor_alca, padrao } = selecoes;

  // Prioridade 1: Combinação completa (cor_corpo + cor_alca + padrao)
  if (cor_corpo && cor_alca && padrao) {
    const chave = `${cor_corpo}-${cor_alca}-${padrao}`;
    if (config.combinacoes_completas?.[chave]) {
      return config.combinacoes_completas[chave];
    }
  }

  // Prioridade 2: Cor + Padrão (sem alça)
  if (cor_corpo && padrao) {
    const chave = `${cor_corpo}-${padrao}`;
    if (config.cor_padrao?.[chave]) {
      return config.cor_padrao[chave];
    }
  }

  // Prioridade 3: Só cor
  if (cor_corpo && config.cores?.[cor_corpo]) {
    return config.cores[cor_corpo];
  }

  // Prioridade 4: Só padrão
  if (padrao && config.padroes?.[padrao]) {
    return config.padroes[padrao];
  }

  // Fallback: imagem padrão
  return imagemPadrao;
};

function page() {
  const router = useRouter();
  const { tipo_de_header, set_tipo_de_header } = useGlobalContext();
  const { array_brechos } = useGlobalContext();
  const { array_sacola_brecho, set_array_sacola_brecho } = useGlobalContext();
  const { usuario_logado } = useGlobalContext();
  const { produto_selecionado } = useGlobalContext();
  const [quantidade, set_quantidade] = useState(1);

  // 🔹 Traduções
  const traducaoPadroes = {
    logo_fly: "Logo da Fly",
    logo_fly_nome: "Logo da Fly e Nome",
    logo_fly_embaixo: "Logo da Fly embaixo",
    sem_logo: "Sem Logo",
  };

  const traducaoCores = {
    amarelo: "Amarelo",
    verde: "Verde",
    areia: "Areia",
    branco: "Branco",
  };

  const traducaoMaterial = {
    algodao: "Algodão",
    poliester_reciclavel: "Poliéster Reciclável",
    plastico_biodegradavel: "Plástico Biodegradável",
    papel_kraft: "Papel Kraft",
    papelao_reciclavel: "Papelão Reciclável",
  };

  const traducaoTamanho = {
    pequeno: "Pequeno",
    medio: "Médio",
    grande: "Grande",
  };

  const traducaoNomeProduto = {
    ecobag: "Ecobag",
    sacola: "Sacola",
    caixa: "Caixa",
  };

  // 🔹 Configuração dos produtos
  const produtos_config = {
    ecobag: {
      nome: "ecobag",
      preco: 5.47,
      imagem: "/img/produtos_personalizados/ecobaag/padrao/sacola-ecobag-sem-fundo.png",
      descricao:
        "Uma peça simples, versátil e cheia de propósito. Nossa ecobag foi pensada para quem quer unir estilo e consciência. Personalize e transforme um acessório do dia a dia em algo único, feito pra você.",
      opcoes: {
        material: ["algodao", "poliester_reciclavel"],
        tamanho: ["medio", "grande"],
        padrao: ["logo_fly", "logo_fly_nome", "logo_fly_embaixo"],
        cor_corpo: ["amarelo", "verde", "areia"],
        cor_alca: ["amarelo", "verde", "areia"],
      },
    },
    sacola: {
      nome: "sacola",
      preco: 0.16,
      imagem: "/img/produtos_personalizados/sacola/sacola-padrao-meio-virada.png",
      descricao:
        "Esta sacola é pra você que valoriza moda feita com sentido: reutilizável, personalizável e amiga do meio ambiente. Transforme-a em algo só seu e mostre ao mundo que agir bem com o planeta também é tendência.",
      opcoes: {
        material: ["plastico_biodegradavel", "papel_kraft"],
        tamanho: ["pequeno", "medio", "grande"],
        padrao: ["logo_fly", "logo_fly_nome", "logo_fly_embaixo"],
        cor_corpo: ["verde", "branco"],
        cor_alca: [],
      },
    },
    caixa: {
      nome: "caixa",
      preco: 0.85,
      imagem: "/img/produtos_personalizados/caixa/caixa_normal.svg",
      descricao:
        "Caixa resistente e elegante, ideal para embalar seus produtos com cuidado e estilo. Personalize e transforme a experiência de entrega em algo memorável e sustentável.",
      opcoes: {
        material: ["papelao_reciclavel"],
        tamanho: ["pequeno", "medio", "grande"],
        padrao: ["logo_fly", "logo_fly_nome", "logo_fly_embaixo"],
        cor_corpo: [],
        cor_detalhes: [],
      },
    },
  };

  const [selecoes, set_selecoes] = useState({
    material: "",
    tamanho: "",
    padrao: "",
    cor_corpo: "",
    cor_alca: "",
    cor_detalhes: "",
  });

  const produto_atual = produtos_config[produto_selecionado];
  const [imagemAtual, setImagemAtual] = useState(produto_atual?.imagem || "");

  // 🔹 Define header conforme brecho ou usuario
  useEffect(() => {
    const encontrar_brecho = array_brechos.find(
      (brecho) => brecho._id === usuario_logado._id
    );
    set_tipo_de_header(encontrar_brecho ? "brecho" : "usuario");
  }, []);

  // 🔹 Resetar seleções ao mudar produto
  useEffect(() => {
    if (!produto_selecionado) {
      router.push("/escolha_de_personalizacao_produtos");
      return;
    }
    set_selecoes({
      material: "",
      tamanho: "",
      padrao: "",
      cor_corpo: "",
      cor_alca: "",
      cor_detalhes: "",
    });
    set_quantidade(1);
    setImagemAtual(produto_atual.imagem);
  }, [produto_selecionado]);

  // 🔹 Atualiza a imagem conforme seleções
  const atualizar_imagem_dinamica = (selecaoAtual) => {
    const cor = selecaoAtual.cor_corpo?.toLowerCase();
    const padrao = selecaoAtual.padrao;
    const alca = selecaoAtual.cor_alca?.toLowerCase();

    switch (produto_selecionado) {
      // === 🟢ECOSBAG (48 casos: 36 triplos + 12 cor+padrao) ===
      case "ecobag":
        switch (true) {
          // --- 36 CASOS: COR + ALÇA + PADRÃO ---
          case cor === "amarelo" && alca === "amarelo" && padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarela-logo-meio.png");
            break;
          case cor === "amarelo" && alca === "amarelo" && padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-nome-em-baixo.png");
            break;
          case cor === "amarelo" && alca === "amarelo" && padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-em-baixo.png");
            break;

          case cor === "amarelo" && alca === "verde" && padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-meio.png");
            break;
          case cor === "amarelo" && alca === "verde" && padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-nome-em-baixo.png");
            break;
          case cor === "amarelo" && alca === "verde" && padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-verde/ecobag-amarelo-alca-verde-logo-em-baixo.png");
            break;

          case cor === "amarelo" && alca === "areia" && padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-meio.png");
            break;
          case cor === "amarelo" && alca === "areia" && padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-nome-em-baixo.png");
            break;
          case cor === "amarelo" && alca === "areia" && padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/amarelo-areia/ecobag-amarelo-alca-areia-logo-em-baixo.png");
            break;


          case cor === "verde" && alca === "amarelo" && padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/comb/verde-amarelo-logo_fly.png");
            break;
          case cor === "verde" && alca === "amarelo" && padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/comb/verde-amarelo-logo_fly_nome.png");
            break;
          case cor === "verde" && alca === "amarelo" && padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/comb/verde-amarelo-logo_fly_embaixo.png");
            break;

        

          case cor === "verde" && alca === "areia" && padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/comb/verde-areia-logo_fly.png");
            break;
          case cor === "verde" && alca === "areia" && padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/comb/verde-areia-logo_fly_nome.png");
            break;
          case cor === "verde" && alca === "areia" && padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/comb/verde-areia-logo_fly_embaixo.png");
            break;

          case cor === "areia" && alca === "amarelo" && padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-areia-clara-alca-amarela-logo-meio.png");
            break;
          case cor === "areia" && alca === "amarelo" && padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-areia-alca-amarelo-logo-nome-em-baixo.png");
            break;
          case cor === "areia" && alca === "amarelo" && padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-amarelo/ecobag-areia-alca-amarelo-logo-em-baixo.png");
            break;

          case cor === "areia" && alca === "verde" && padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-areia-clara-alca-verde-logo-meio.png");
            break;
          case cor === "areia" && alca === "verde" && padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-areia-alca-verde-logo-nome-em-baixo.png");
            break;
          case cor === "areia" && alca === "verde" && padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/areia-verde/ecobag-areia-alca-verde-logo-em-baixo.png");
            break;

          

          // --- 12 CASOS: COR + PADRÃO (sem alça) ---
          case cor === "amarelo" && padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarela-logo-meio.png");
            break;
          case cor === "amarelo" && padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-nome-em-baixo.png");
            break;
          case cor === "amarelo" && padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-amarelo-alca-amarelo-logo-em-baixo.png");
            break;

              case cor === "verde"  && padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/ecobag-verde-alca-verde-logo-meio.png");
            break;
          case cor === "verde" && padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/ecobag-verde-alca-verde-logo-nome-em-baixo.png");
            break;
          case cor === "verde" &&  padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/ecobag-verde-alca-verde-logo-em-baixo.png");
            break;

        case cor === "areia" && padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/ecobag-areia-alca-areia-logo-nome-meio.png");
            break;
          case cor === "areia" && padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/ecobag-areia-alca-areia-logo-nome-em-baixo.png");
            break;
          case cor === "areia" && padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/ecobag-areia-alca-areia-logo-em-baixo.png");
            break;


          // --- CASOS RESTANTES: SÓ COR / SÓ PADRÃO / FALLBACK ---
          case cor === "amarelo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/amarelo/ecobag-cor-base-amarelo.png");
            break;
          case cor === "verde":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/verde/ecobag-cor-base-verde.png");
            break;
          case cor === "areia":
            setImagemAtual("/img/produtos_personalizados/ecobaag/cores/areia/ecobag-cor-base-areia.png");
            break;
          

          case padrao === "logo_fly":
            setImagemAtual("/img/produtos_personalizados/ecobaag/padrao/ecobag-nome-logo-meio.png");
            break;
          case padrao === "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/ecobaag/padrao/ecobag-nome-logo-embaixo.png");
            break;
          case padrao === "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/ecobaag/padrao/ecobag-logo.png");
            break;

          default:
            setImagemAtual(produto_atual.imagem);
            break;
        }
        break;


      // === 🟠 LÓGICA SACOLA ===
      case "sacola":
        if (cor === "verde") {
          switch (padrao) {
            case "logo_fly":
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-nome-meio.png");
              break;
            case "logo_fly_nome":
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-nome-embaixo.png");
              break;
            case "logo_fly_embaixo":
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-verde-meio-virada-logo-embaixo.png");
              break;
            default:
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-verde-meio-virada.png");
          }
        } else if (cor === "branco") {
          switch (padrao) {
            case "logo_fly":
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-nome-meio.png.png");
              break;
            case "logo_fly_nome":
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-nome-embaixo.png");
              break;
            case "logo_fly_embaixo":
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-branca-meio-virada-logo-embaixo.png");
              break;
            default:
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-branca-meio-virada.png");
          }
        } else if (padrao) {
          switch (padrao) {
            case "logo_fly":
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-padrao-meio-virada-logo-nome-meio.png");
              break;
            case "logo_fly_nome":
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-padrao-meio-virada-logo-nome-embaixo.png");
              break;
            case "logo_fly_embaixo":
              setImagemAtual("/img/produtos_personalizados/sacola/sacola-padrao-meio-virada-logo-embaixo.png");
              break;
            default:
              setImagemAtual(produto_atual.imagem);
          }
        } else {
          setImagemAtual(produto_atual.imagem);
        }
        break;

      // === 🟣 LÓGICA CAIXA ===
      case "caixa":
        switch (padrao) {
          case "logo_fly":
            setImagemAtual("/img/produtos_personalizados/caixa/caixa-meio-virada-logo-embaixo.svg");
            break;
          case "logo_fly_nome":
            setImagemAtual("/img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-emcima.svg");
            break;
          case "logo_fly_embaixo":
            setImagemAtual("/img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-embaixo.svg");
            break;
          default:
            setImagemAtual(produto_atual.imagem);
        }
        break;

      default:
        setImagemAtual(produto_atual.imagem);
    }
  };

  // 🔹 Atualiza seleções
  const atualizar_selecao = (tipo, valor) => {
    set_selecoes((prev) => {
      const novasSelecoes = { ...prev, [tipo]: valor };

      // Se mudou a cor do corpo e a cor da alça for igual, limpar a alça
      if (tipo === "cor_corpo" && prev.cor_alca && prev.cor_alca === valor) {
        novasSelecoes.cor_alca = "";
      }

      // Se mudou a alça e ficou igual à cor do corpo (defensivo), limpar a cor do corpo
      if (tipo === "cor_alca" && prev.cor_corpo && prev.cor_corpo === valor) {
        novasSelecoes.cor_corpo = "";
      }

      atualizar_imagem_dinamica(novasSelecoes);
      return novasSelecoes;
    });
  };

  const alterar_quantidade = (op) => {
    if (op === "diminuir" && quantidade > 1) set_quantidade(quantidade - 1);
    else if (op === "aumentar") set_quantidade(quantidade + 1);
  };

  const criar_objeto_pedido = () => {
    const objeto = {
      tipo: produto_selecionado,
      material: selecoes.material,
      padrao: selecoes.padrao,
      tamanho: selecoes.tamanho,
      valor: Number(produto_atual.preco * quantidade),
      id_brecho: usuario_logado._id,
    };
    if (selecoes.cor_corpo) objeto.cor_corpo = selecoes.cor_corpo;
    if (selecoes.cor_alca) objeto.cor_alca = selecoes.cor_alca;
    if (selecoes.cor_detalhes) objeto.cor_detalhes = selecoes.cor_detalhes;

    return objeto;
  };

  const enviar_pedido = async () => {
    const pedido = criar_objeto_pedido();

    // Validação
    if (!pedido.material || !pedido.padrao || !pedido.tamanho) {
      alert("Por favor, selecione todas as opções obrigatórias");
      return;
    }

    try {
      const sacola_salva = await api.post("/sacolas_brechos", pedido);

      // await pedido_sacola_para_maquina(sacola_salva.data);

      buscar_sacolas_brechos().then((sacolas) => set_array_sacola_brecho(sacolas));

      alert("Pedido enviado com sucesso!");
      router.push(`/sacola_brecho`);

    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      alert(error.response?.data?.message || "Erro ao enviar pedido. Tente novamente.");
    }
  };

  if (!produto_selecionado || !produto_atual) return null;

  const navegar_pagina = () => router.push("/escolha_de_personalizacao_produtos");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles["container-alinhamento-conteudo-personalizacao"]}>
          <Header tipo={tipo_de_header} />

          <div className={styles["container-voltar-titulo-personalizacao"]}>
            <div className={styles["container-titulo-personalizacao"]}>
              <div className={styles["container-numero-de-fase-personalizacao"]}>
                <p>2</p>
              </div>
              <h4>Personalize do seu jeito: transforme ideias em realidade</h4>
            </div>

            <div className={styles["container-voltar-pagina"]}>
              <button onClick={navegar_pagina}>
                Voltar <img src="/img/icons/Sair-icone.svg" alt="" />
              </button>
            </div>
          </div>

          <div className={styles["container-escolhas-personalizacao"]}>
            <div className={styles["container-imagem-produto-personalizado"]}>
              <img src={imagemAtual} alt={produto_atual.nome} />
            </div>

            <div className={styles["container-conteudo-escolha-personalizacao"]}>
              <div className={styles["container-titulo-descricao"]}>
                <h2>{traducaoNomeProduto[produto_atual.nome] || produto_atual.nome}</h2>

                <div className={styles["container-preço-quantidade"]}>
                  <h4>R$ {produto_atual.preco.toFixed(2).replace(".", ",")} un</h4>
                </div>

                <p>{produto_atual.descricao}</p>
                <div className={styles["line-personalizar-produtos"]}></div>
              </div>

              <div className={styles["container-opcoes-personalizacao"]}>
                {/* Material */}
                <div className={styles["escolha-material"]}>
                  <label>Escolha o material</label>
                  <div className={styles["container-alinhamento-button-personalizacao"]}>
                    {produto_atual.opcoes.material.map((m, i) => (
                      <button
                        key={i}
                        className={selecoes.material === m ? styles["opcao-selecionada"] : ""}
                        onClick={() => atualizar_selecao("material", m)}
                      >
                        {traducaoMaterial[m] || m}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tamanho */}
                <div className={styles["escolha-tamanho"]}>
                  <label>Escolha o tamanho</label>
                  <div className={styles["container-alinhamento-button-personalizacao"]}>
                    {produto_atual.opcoes.tamanho.map((t, i) => (
                      <button
                        key={i}
                        className={selecoes.tamanho === t ? styles["opcao-selecionada"] : ""}
                        onClick={() => atualizar_selecao("tamanho", t)}
                      >
                        {traducaoTamanho[t] || t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Padrão e cores */}
                <div className={styles["container-alinhamento-multiplas-escolhas-cores"]}>
                  {/* Padrão */}
                  <div className={styles["escolha-padrao"]}>
                    <label>Escolha o padrão</label>
                    <select
                      value={selecoes.padrao}
                      onChange={(e) => atualizar_selecao("padrao", e.target.value)}
                    >
                      <option value="" disabled>
                        Padrão
                      </option>
                      {produto_atual.opcoes.padrao.map((p, i) => (
                        <option key={i} value={p}>
                          {traducaoPadroes[p] || p}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Cor corpo */}
                  {produto_atual.opcoes.cor_corpo?.length > 0 && (
                    <div className={styles["escolha-padrao"]}>
                      <label>Escolha a cor do corpo</label>
                      <select
                        value={selecoes.cor_corpo}
                        onChange={(e) => atualizar_selecao("cor_corpo", e.target.value)}
                      >
                        <option value="" disabled>
                          Cor do corpo
                        </option>
                        {produto_atual.opcoes.cor_corpo.map((c, i) => (
                          <option key={i} value={c}>
                            {traducaoCores[c] || c}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Cor alça */}
                  {produto_atual.opcoes.cor_alca?.length > 0 && (
                    <div className={styles["escolha-padrao"]}>
                      <label>Escolha a cor da alça</label>
                      <select
                        value={selecoes.cor_alca}
                        onChange={(e) => atualizar_selecao("cor_alca", e.target.value)}
                      >
                        <option value="" disabled>
                          Cor da alça
                        </option>
                        {produto_atual.opcoes.cor_alca
                          .filter((c) => c !== selecoes.cor_corpo)
                          .map((c, i) => (
                            <option key={i} value={c}>
                              {traducaoCores[c] || c}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles["buttons-acoes-personalizacao-produtos"]}>
                <button
                  className={styles["button-comprar-produtos-personalizados"]}
                  onClick={enviar_pedido}
                >
                  Adicionar a sacola
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default page;