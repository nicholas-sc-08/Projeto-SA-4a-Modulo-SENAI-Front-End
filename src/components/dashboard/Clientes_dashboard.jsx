"use client";

import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import Pop_up_de_excluir from '@/components/pop_up_dashboard/Pop_up_de_excluir.jsx';
import Pop_up_de_notificacao_dashboard from '@/components/pop_up_dashboard/Pop_up_de_notificacao_dashboard.jsx';
import Header from '../Header/Header.jsx';
import { buscar_clientes } from '@/services/cliente/cliente.js';
import { buscar_enderecos } from '@/services/enderecos/enderecos.js';
import styles from "@/components/dashboard/Clientes_dashboard.module.css";
import { useGlobalContext } from '@/context/GlobalContext.jsx';

export default function Clientes_dashboard() {

  const { array_clientes, set_array_clientes } = useGlobalContext();
  const { array_enderecos, set_array_enderecos } = useGlobalContext();
  const { clientes_dashboard, set_clientes_dashboard } = useGlobalContext();
  const { inicio_dashboard, set_inicio_dashboard } = useGlobalContext();
  const { erro_Pagina, set_erro_pagina } = useGlobalContext();
  const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useGlobalContext();
  const { id_do_cliente_a_excluir, set_id_do_cliente_a_excluir } = useGlobalContext();
  const { pop_up_notificacao_excluir_dashboard, set_pop_up_notificacao_excluir_dashboard } = useGlobalContext();
  const [barra_de_pesquisa, set_barra_de_pesquisa] = useState(``);
  const [escolher_qual_excluir, set_escolher_qual_excluir] = useState(false);
  const [confirmar_exclusao, set_confimar_exclusao] = useState(false);
  const [resultado_de_pesquisa, set_resultado_de_pesquisa] = useState([]);
  const [resultado_de_pesquisa_endereco, set_resultado_de_pesquisa_endereco] = useState([]);
  const [ids_filtrado, set_ids_filtrado] = useState(``);
  const referencia_do_inpt = useRef(null);

  function voltar_para_o_inicio() {

    set_inicio_dashboard(true);
    set_clientes_dashboard(false);
  };

  useEffect(() => {

    const clientes_filtrados = array_clientes.filter(cliente => cliente.nome.toLowerCase().includes(barra_de_pesquisa.toLowerCase()));
    const ids = clientes_filtrados.map(cliente => cliente._id);
    const enderecos_filtrados = array_enderecos.filter(endereco => ids.includes(endereco.fk_id));

    set_resultado_de_pesquisa(clientes_filtrados);
    set_ids_filtrado(ids);
    set_resultado_de_pesquisa_endereco(enderecos_filtrados);

  }, [barra_de_pesquisa, array_clientes, array_enderecos]);

  function armazenar_id_do_cliente(id_do_cliente) {

    set_abrir_pop_up_dashboard(true);
    set_id_do_cliente_a_excluir(id_do_cliente);

  };

  useEffect(() => {

    buscar_clientes().then(clientes => set_array_clientes(clientes));
    buscar_enderecos().then(clientes => set_array_clientes(clientes));

  }, []);

  useEffect(() => {

    setTimeout(() => {

      set_pop_up_notificacao_excluir_dashboard(false);

    }, 2000);

  }, [pop_up_notificacao_excluir_dashboard]);

  return (
    <AnimatePresence>
      <motion.div className={styles['container_clientes_dashbord']} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
        <Header tipo='admin' />

        {abrir_pop_up_dashboard && <div className={styles["container_sombra_para_visualizar_pop_up"]}></div>}
        {abrir_pop_up_dashboard && <Pop_up_de_excluir />}
        {pop_up_notificacao_excluir_dashboard && <div className={styles["container_sombra_para_visualizar_pop_up"]}></div>}
        {pop_up_notificacao_excluir_dashboard && <Pop_up_de_notificacao_dashboard />}

        <div className={styles["container-alinhamento-imagem-titulo-usuarios-dashboard"]}>
          <div className={styles["container-alinhamento-imagem-usuarios-dashboard"]}>
            <div className={styles["container-alinhamento-imagem-titulo-quantidade-usuarios-dashboard"]}>
              <div className={styles["fundo-cinza-imagem-usuarios-dashboard"]}>
                <div className={styles["fundo-verde-imagem-usuarios-dashboard"]}>
                  <img src="./img/icone-brecho-dashboard.svg" alt="Icone usuarios dashboard" />
                </div>
              </div>
              <div className={styles["container-alinhamento-titulo-usuarios-dashboard"]}>
                <p className={styles['titulo-um-usuarios-dashboard']}>Clientes</p>
                <p className={styles['numero-de-usuarios-dashboard']}>{array_clientes.length}</p>
              </div>
            </div>
            <div className={styles["container-sair-de-usuarios-dashboard"]} onClick={voltar_para_o_inicio}>
              <p>Voltar</p>
              <img src="./img/icone_dashboard_sair.svg" alt="" />
            </div>
          </div>
        </div>
        <div className={styles["container_tabela_cliente_alinhamento"]}>
          <div className={styles["container_tabela_clientes"]}>
            <div className={styles["container_tabela_clientes_header"]}>
              <div className={styles["container_barra_de_pesquisa"]} onClick={() => referencia_do_inpt.current.focus()}>
                <img src="./img/LupaIcon.svg" alt="lupa" />
                <input type="text" placeholder="Buscar cliente" value={barra_de_pesquisa} onChange={e => set_barra_de_pesquisa(e.target.value)} />
              </div>
              <div className={styles["container_excluir_usuario"]}>
                <button onClick={() => set_escolher_qual_excluir(!escolher_qual_excluir)}>{!escolher_qual_excluir ? <img src='./img/Lixeira_icon_v_dois.svg' alt='lixeira' /> : <img src='./img/icons/close-icon.png' alt='cancelar' />}</button>
              </div>
            </div>
            <div className={styles["container_separacao_de_informacoes_e_da_scrollbar"]}>
              <div className={styles["container_alinhamento_de_informacoes_tabela_clientes"]}>
                <div className={styles["container_titulos_da_tabela_clientes"]}>
                  <div className={styles["container_titulos_informacoes_tabela_clientes"]}>
                    <span className={styles['titulo_dashboard_nome']}>Nome de Usuário</span>
                    <span className={styles['titulo_dashboard_email']}>Email</span>
                    <span className={styles['titulo_dashboard_telefone']}>Telefone</span>
                    <span className={styles['titulo_dashboard_senha']}>Senha</span>
                    <span className={styles['titulo_dashboard_cep']}>CPF</span>
                  </div>
                </div>
                <div className={styles["container_tabela_clientes_resultados"]}>
                  <div className={styles["container_sombreamento"]}></div>
                  <div className={styles["b"]}>
                    {!barra_de_pesquisa &&
                      array_clientes.map((cliente, i) => (
                        <div key={i} className={styles['container_colunas_serie_a']}>
                          <div className={styles["container_coluna_imagem_de_perfil_cliente"]}>
                            <img src={cliente.imagem_de_perfil} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" />
                          </div>
                          <div className={styles['container_colunas_serie_b']}>
                            <div className={styles["container_coluna_nome_cliente"]}>
                              <span>{cliente.nome}</span>
                            </div>
                            <div className={styles["container_coluna_email_cliente"]}>
                              <span>{cliente.email}</span>
                            </div>
                            <div className={styles["container_coluna_telefone_cliente"]}>
                              <span>{cliente.telefone || "-"}</span>
                            </div>
                            <div className={styles["container_coluna_senha_cliente"]}>
                              <span>{cliente.senha || "-"}</span>
                            </div>
                            <div className={styles["container_coluna_cpf_cliente"]}>
                              <span>{cliente.cpf || "-"}</span>
                            </div>
                          </div>
                          {escolher_qual_excluir && (
                            <button
                              className={styles["botao-excluir-individual-cliente"]}
                              onClick={() => armazenar_id_do_cliente(cliente._id)}
                            >
                              <img src="./img/icons/lixeira-vermelha-icon.svg" alt="Excluir" />
                            </button>
                          )}
                        </div>
                      ))}
                    {barra_de_pesquisa && resultado_de_pesquisa.map((cliente, i) => (
                      <div key={i} className={styles['container_colunas_serie_a']}>
                        <div className={styles["container_coluna_imagem_de_perfil_cliente"]}>
                          <img src={cliente.imagem_de_perfil} alt="" />
                        </div>
                        <div className={styles['container_colunas_serie_b']}>
                          <div className={styles["container_coluna_nome_cliente"]}>
                            <p>{cliente.nome}</p>
                          </div>
                          <div className={styles["container_coluna_email_cliente"]}>
                            <p>{cliente.email}</p>
                          </div>
                          <div className={styles["container_coluna_telefone_cliente"]}>
                            <p>{cliente.telefone || "-"}</p>
                          </div>
                          <div className={styles["container_coluna_cpf_cliente"]}>
                            <p>{cliente.cpf || "-"}</p>
                          </div>
                        </div>
                        {escolher_qual_excluir && (
                          <button
                            className={styles["botao-excluir-individual-cliente"]}
                            onClick={() => armazenar_id_do_cliente(cliente._id)}
                          >
                            <img src="./img/icons/lixeira-vermelha-icon.svg" alt="Excluir" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};