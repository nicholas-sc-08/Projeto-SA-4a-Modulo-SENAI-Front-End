"use client";

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import api from '@/services/api';
import styles from "@/app/login/page.module.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function Login() {

    const { array_clientes, set_array_clientes } = useGlobalContext();
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { erro_pagina, set_erro_pagina } = useGlobalContext();
    const { usuario_logado, set_usuario_logado } = useGlobalContext();
    const { sacola, set_sacola } = useGlobalContext();

    const [icone_senha, set_icone_senha] = useState(`./img/icons/icone_olho_aberto.svg`);
    const [visualizar_senha, set_visualizar_senha] = useState(false);
    const [tipo_do_inpt, set_tipo_do_inpt] = useState(`password`);
    const [formulario, set_formulario] = useState({ email: '', senha: '' });
    const [erro, set_erro] = useState('');

    /* Para a verificação do input de email -- se possui caracteres antes do @ e se há os dominios "gmail.com" e "hotmail.com" */
    const termina_Com_Gmail_Ou_Hotmail = formulario.email.endsWith('@gmail.com') || formulario.email.endsWith('@hotmail.com')
    const o_Texto_Antes_Do_Arroba = formulario.email.indexOf('@') > 0   /* se tiver algo antes do @, vai retornar como errado, porque o index do @ tem q ser igual a 0 */

    const rotuer = useRouter();
    const [animandoCadastro, setAnimandoCadastro] = useState(false);

    useEffect(() => {

        informacoes_clientes();
        informacoes_brechos();

    }, []);

    async function informacoes_clientes() {

        try {

            const resultado = await api.get(`/clientes`);
            set_array_clientes(resultado.data);

        } catch (erro) {

            console.log(erro);

        };
    };

    async function informacoes_brechos() {

        try {

            const brechos = await api.get(`/brechos`);
            set_array_brechos(brechos.data);

        } catch (erro) {

            console.error(erro);
        };
    };

    function lidar_com_formulario(e) {

        e.preventDefault();

        if (formulario.email.trim() == `` || formulario.senha.trim() == ``) {

            set_erro(`Favor preencher todos os campos!`);
            return;

        }


        if (!formulario.email.includes('@')) {
            set_erro('O email deve conter "@"');
            return;
        }

        const [antesDoArroba, dominioDoEmail] = formulario.email.split('@');

        if (!antesDoArroba) {
            set_erro('O email deve conter caracteres antes do @');
            return;
        }

        // if (dominioDoEmail !== 'gmail.com' && dominioDoEmail !== 'hotmail.com') {
        //   set_erro('O email deve conter "gmail.com" ou "hotmail.com"');
        //   return;
        // }

        const cliente_a_encontrar = array_clientes.find(cliente => formulario.email == cliente.email && formulario.senha == cliente.senha);
        const brecho_a_encontrar = array_brechos.find(brecho => formulario.email == brecho.email && formulario.senha == brecho.senha);

        if (cliente_a_encontrar) {

            set_usuario_logado(cliente_a_encontrar);
            set_erro(``);
            rotuer.push(`/`);

        } else if (brecho_a_encontrar) {

            set_usuario_logado(brecho_a_encontrar);
            set_erro(``);
            rotuer.push(`/`);

        } else {
            set_erro('Usuário ou senha incorretos!');
        };

    };

    async function lidar_sucesso(token) {

        informacoes_clientes();
        informacoes_brechos();

        const { access_token } = token;
        const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${access_token}` } });

        const cliente_existente = array_clientes.find(cliente => cliente.email == data.email);
        const brecho_existente = array_brechos.find(brecho => brecho.email == data.email);

        try {

            if (cliente_existente) {

                set_usuario_logado(cliente_existente);
                set_sacola([cliente_existente.sacola]);
                rotuer.push('/');

            } else {

                const novo_cliente = {
                    nome: data.name,
                    email: data.email,
                    senha: Date.now(),
                    telefone: ``,
                    cpf: ``,
                    data_de_nascimento: `2000-01-01`,
                    imagem_de_perfil: data.picture,
                    conversas: []
                };

                const cliente = await api.post(`/clientes`, novo_cliente);

                informacoes_clientes();
                set_usuario_logado(cliente.data);
                set_erro(``);
                rotuer.push(`/`);
            };

            if (brecho_existente) {

                set_usuario_logado(brecho_existente);
                set_sacola(brecho_existente.sacola);
                rotuer.push(`/`);
            };

        } catch (erro) {

            console.error("Erro ao logar com Google:", erro);
            set_erro(erro.message || erro.toString());
            set_erro_pagina(erro.message || erro.toString());
            rotuer.push(`/erro`);
        }
    };

    function exibir_senha() {

        if (visualizar_senha) {

            set_tipo_do_inpt(`text`);
            set_icone_senha(`./img/icons/icone_olho_fechado.svg`);
            set_visualizar_senha(false);

        } else {

            set_tipo_do_inpt(`password`);
            set_icone_senha(`./img/icons/icone_olho_aberto.svg`);
            set_visualizar_senha(true);
        };
    };

    function lidar_falha(erro) {

        console.error('Erro no login:', erro);
    };

    const loginGoogle = GoogleOAuthProvider({

        onSuccess: lidar_sucesso,
        onError: lidar_falha
    });

    const LoginCadastro = () => {
        setAnimandoCadastro(true); // dispara animação de saída

        // espera 800ms pra redirecionar após a animação
        setTimeout(() => {
            rotuer.push('/escolha_de_cadastro');
        }, 600);
    };

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                className={styles["container-corpo-login"]}>

                <form onSubmit={lidar_com_formulario}>
                    <img className={styles['logo-camadinha']} src="./img/logo-verdeCamadinha2.svg" alt="" onClick={() => rotuer.push('/')} />

                    <div className={styles["alinhamento-container-login"]}>
                        <div className={styles['ladoEsquerdo-container']}>
                            <h1>Sua conta te espera!</h1>
                            <div className={styles['info-login']}>

                                <label>Email<span>*</span></label>
                                <input
                                    type="text"
                                    className={styles['input-erro']}
                                    value={formulario.email}
                                    onChange={e => set_formulario({ ...formulario, email: e.target.value })}
                                    placeholder='Ex: exemplo@gmail.com'
                                />

                                <label>Senha<span>*</span></label>

                                <div className={styles["container_input_senha"]}>

                                    <input
                                        type={tipo_do_inpt}
                                        value={formulario.senha}
                                        onChange={e => set_formulario({ ...formulario, senha: e.target.value })}
                                        placeholder='Senha pessoal'
                                    />

                                    <img src={icone_senha} alt="olho" onClick={() => exibir_senha()} />

                                </div>
                            </div>

                            <button type="button" onClick={() => loginGoogle} className={styles["botao-google-custom"]}>
                                <img src="/img/google-icon.png" alt="Google" />
                                Continuar com o Google
                            </button>

                            <button type='submit' className={styles['fazer_login_butao']}>Fazer login</button>

                            {erro && <p className={styles['erro-campo erro-geral']}>{erro.toString()}</p>}
                        </div>

                        <div className={styles["container-ir-para-tela-cadastro-alinhamento"]}>
                            <AnimatePresence>
                                {!animandoCadastro && (
                                    <motion.div
                                        className={styles["container-informacoes-login-cadastro"]}
                                        initial={{ opacity: 2, x: 0 }}
                                        exit={{ opacity: 10, x: -760 }} // ~300px pra esquerda: ainda visível
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    >
                                        <img className={styles['estrela-um-cadastro']} src="./img/estrelaMenor.png" alt="" />

                                        <h1>Novo por aqui? Crie sua conta!</h1>
                                        <p>A moda circular nunca para! Que tal fazer parte desse movimento? <br /> Cadastre-se no Fly!</p>
                                        <button onClick={LoginCadastro} type='button'>Cadastrar-se</button>

                                        <img className={styles['estrela-dois-cadastro']} src="./img/estrelaGrande.png" alt="" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </form>
            </motion.div>
        </AnimatePresence>

    );
};