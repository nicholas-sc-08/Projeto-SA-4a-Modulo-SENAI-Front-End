"use client";

import { useEffect } from 'react';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import Header from '../Header/Header'
import Pop_up_de_notificacao_dashboard from '../pop_up_dashboard/Pop_up_de_notificacao_dashboard';
import { buscar_brechos } from '@/services/brecho/brecho';
import Pop_up_excluir_brecho from '../pop_up_brechos/Pop_up_excluir_brecho';
import styles from "@/components/dashboard/Brechos_dashboard.module.css";
import { useGlobalContext } from '@/context/GlobalContext';

export default function Brechos_dashboard() {

    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { brechos_dashboard, set_brechos_dashboard } = useGlobalContext();
    const { inicio_dashboard, set_inicio_dashboard } = useGlobalContext();
    const { erro_Pagina, set_erro_pagina } = useGlobalContext();
    const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useGlobalContext();
    const { id_do_brecho_a_excluir, set_id_do_brecho_a_excluir } = useGlobalContext();
    const { pop_up_notificacao_excluir_brechos_dashboard, set_pop_up_notificacao_excluir_brechos_dashboard } = useGlobalContext();
    const [barra_de_pesquisa, set_barra_de_pesquisa] = useState(``);
    const [resultado_de_pesquisa, set_resultado_de_pesquisa] = useState([]);
    const [ids_filtrado, set_ids_filtrado] = useState(``);
    const [escolher_qual_excluir, set_escolher_qual_excluir] = useState(false);

    function voltar_para_o_inicio() {

        set_inicio_dashboard(true);
        set_brechos_dashboard(false);
    };

    useEffect(() => {

        const brechos_filtrados = array_brechos.filter(
            brecho => brecho.nome_brecho && brecho.nome_brecho.toLowerCase().includes(barra_de_pesquisa.toLowerCase())
        );
        const ids = brechos_filtrados.map(brecho => brecho.id);

        set_resultado_de_pesquisa(brechos_filtrados);
        set_ids_filtrado(ids);

    }, [barra_de_pesquisa, array_brechos]);

    function armazenar_id_do_brecho(id_do_brecho) {

        set_abrir_pop_up_dashboard(true);
        set_id_do_brecho_a_excluir(id_do_brecho);

        console.log(id_do_brecho)
    };

    // useEffect(() =>{console.log(id_do_brecho_a_excluir)}, [id_do_brecho_a_excluir])

    useEffect(() => {

        buscar_brechos();

    }, []);

    useEffect(() => {

        setTimeout(() => {

            set_pop_up_notificacao_excluir_brechos_dashboard(false);

        }, 2000);

    }, [pop_up_notificacao_excluir_brechos_dashboard]);

    return (
        <AnimatePresence>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                <Header tipo="admin" />

                {abrir_pop_up_dashboard && <div className={styles["container_sombra_para_visualizar_pop_up"]}></div>}
                {abrir_pop_up_dashboard && <Pop_up_excluir_brecho />}
                {pop_up_notificacao_excluir_brechos_dashboard && <div className={styles["container_sombra_para_visualizar_pop_up"]}></div>}
                {pop_up_notificacao_excluir_brechos_dashboard && <Pop_up_de_notificacao_dashboard />}

                <div className={styles["container-alinhamento-brechos-dashboard-allPage"]}>
                    <div className={styles["container-alinhamento-imagem-titulo-brecho-dashboard"]}>
                        <div className={styles["container-alinhamento-imagem-brecho-dashboard"]}>
                            <div className={styles["container-alinhamento-imagem-titulo-quantidade-brechos-dashboard"]}>
                                <div className={styles["fundo-cinza-imagem-brecho-dashboard"]}>
                                    <div className={styles["fundo-verde-imagem-brecho-dashboard"]}>
                                        <img src="./img/icone-brecho-dashboard.svg" alt="Icone brecho dashboard" />
                                    </div>
                                </div>

                                <div className={styles["container-alinhamento-titulo-brecho-dashboard"]}>
                                    <p className={styles['titulo-um-brecho-dashboard']}>Brechós</p>
                                    <p className={styles['numero-de-brechos-dashboard']}>{array_brechos.length}</p>
                                </div>
                            </div>

                            <div className={styles["container-sair-de-brechos-dashboard"]} onClick={voltar_para_o_inicio}>
                                <p>Voltar</p>

                                <img src="./img/icone_dashboard_sair.svg" alt="" />
                            </div>
                        </div>
                    </div>

                    <div className={styles["alinhamento-container-informacoes-brechos"]}>
                        <div className={styles["container-informacoes-brechos-dashboard"]}>
                            <div className={styles["container-barra-verde-pesquisa"]}>
                                <div className={styles["alinhamento-elementos-barra-verde-pesquisa"]}>
                                    <input type="text"
                                        placeholder='Buscar brechó'
                                        value={barra_de_pesquisa}
                                        onChange={e => set_barra_de_pesquisa(e.target.value)} />

                                    <button onClick={() => set_escolher_qual_excluir(!escolher_qual_excluir)}>{!escolher_qual_excluir ? <img src='./img/Lixeira_icon_v_dois.svg' alt='lixeira' /> : <img src='./img/icons/close-icon.png' alt='fechar' className={styles['icon-cancelar']} />}</button>
                                </div>
                            </div>

                            <div className={styles["container-barra-titulos-guias-informacoes-brecho"]}>
                                <p className={styles['nome-do-brecho-dashboard']}>Nome do Brechó</p>
                                <p className={styles['email-do-brecho-dashboard']}>Email</p>
                                <p className={styles['telefone-do-brecho-dashboard']}>Telefone</p>
                                <p className={styles['CNPJ-do-brecho-dashboard']}>CNPJ</p>
                                <p className={styles['senha-do-brecho-dashboard']}>Senha</p>
                            </div>

                            <div className={styles['fundo-container-dados-do-brecho']}>

                                <div className={styles["container-dados-do-brecho"]}>

                                    {!barra_de_pesquisa && array_brechos.map((brecho, i) => (

                                        <div key={i} className={styles["alinhamento-container-dados-do-brecho"]}>
                                            <div className={styles["alinhamento-imagem-nome-brecho"]}>
                                                <img src={brecho.logo} alt="logo" referrerPolicy="no-referrer" crossOrigin="anonymous" className={styles['logo-brecho-dashboard']} />
                                                <p>{brecho.nome_brecho}</p>
                                            </div>

                                            <p className={styles['p-email-brechos-dashboard']}>{brecho.email}</p>
                                            <p className={styles['p-telefone-brechos-dashboard']}>{brecho.telefone || "-"}</p>
                                            <p className={styles['p-cnpj-brechos-dashboard']}>{brecho.cnpj || "-"}</p>
                                            <p className={styles['p-senha-brechos-dashboard']}>{brecho.senha || "-"}</p>

                                            {escolher_qual_excluir && (
                                                <button
                                                    className={styles["botao-excluir-individual"]}
                                                    onClick={() => armazenar_id_do_brecho(brecho._id)}
                                                >
                                                    <img src="./img/icons/lixeira-vermelha-icon.svg" alt="Excluir" />
                                                </button>
                                            )}
                                        </div>
                                    ))}

                                    {barra_de_pesquisa && resultado_de_pesquisa.map((brecho, i) => (

                                        <div key={i} className={styles["alinhamento-container-dados-do-brecho"]}>
                                            <div className={styles["alinhamento-imagem-nome-brecho"]}>
                                                <img src={brecho.logo} alt="logo" className={styles['logo-brecho-dashboard']} />
                                                <p>{brecho.nome_brecho}</p>
                                            </div>

                                            <p className={styles['p-email-brechos-dashboard']}>{brecho.email}</p>
                                            <p className={styles['p-telefone-brechos-dashboard']}>{brecho.telefone || "-"}</p>
                                            <p className={styles['p-cnpj-brechos-dashboard']}>{brecho.cnpj || "-"}</p>
                                            <p className={styles['p-senha-brechos-dashboard']}>{brecho.senha || "-"}</p>

                                            {escolher_qual_excluir && (
                                                <button
                                                    className={styles["botao-excluir-individual"]}
                                                    onClick={() => armazenar_id_do_brecho(brecho._id)}
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
            </motion.div>
        </AnimatePresence>
    );
};