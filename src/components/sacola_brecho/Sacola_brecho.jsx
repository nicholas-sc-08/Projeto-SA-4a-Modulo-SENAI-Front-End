"use client";

import { useEffect } from 'react';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';
import api from "../../services/api";
import styles from '@/components/sacola_brecho/Sacola_brecho.module.css';
import { buscar_brechos } from '@/services/brecho/brecho';
import { buscar_clientes } from '@/services/cliente/cliente';
import { buscar_sacolas_brechos, imagem_produto_sacola_brecho } from '@/services/sacolas_brechos/sacolas_brecho';

export default function Sacola_brecho() {

    const { array_clientes, set_array_clientes } = useGlobalContext();
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { array_sacola_brecho, set_array_sacola_brecho } = useGlobalContext();
    const { usuario_logado, set_usuario_logado } = useGlobalContext();
    const { sacola, set_sacola } = useGlobalContext();
    const { sacola_aberta, set_sacola_aberta } = useGlobalContext();
    const ir_para_sacola = useRouter();

    useEffect(() => {

        buscar_brechos().then(brechos => set_array_brechos(brechos));
        buscar_clientes().then(clientes => set_array_clientes(clientes));
        buscar_sacolas_brechos().then(sacolas => set_array_sacola_brecho(sacolas));

        const sacola_brecho = array_sacola_brecho.filter(produto => produto.id_brecho === usuario_logado._id);

        if (sacola_brecho) {

            set_sacola(sacola_brecho);
        };

    }, []);

    useEffect(() => {

        const sacola_brecho = array_sacola_brecho.filter(produto => produto.id_brecho === usuario_logado._id);

        if (sacola_brecho) {

            set_sacola(sacola_brecho);
        };

    }, [array_sacola_brecho]);

    async function diminuir_produto(produto_selecionado) {

        try {

            const produto_atualizado = { ...produto_selecionado, quantidade_selecionada: produto_selecionado.quantidade_selecionada - 1 };

            if (produto_atualizado.quantidade_selecionada == 0) {

                const filtrar_produtos = sacola.filter(produto => produto._id != produto_selecionado._id);

                if (usuario_logado._id) {
                    
                    const sacola_atualizada = await api.put(`/sacolas_brechos/${produto_atualizado._id}`, produto_atualizado);
                    set_sacola([...sacola, sacola_atualizada.data]);
                } else {

                    set_sacola(filtrar_produtos);
                };

            } else {

                const produtos = sacola.map(produto => produto._id == produto_selecionado._id ? produto_atualizado : produto);

                if (usuario_logado._id) {

                    const sacola_atualizada = await api.put(`/sacolas_brechos/${produto_atualizado._id}`, produto_atualizado);
                    set_sacola([...sacola, sacola_atualizada.data]);
                } else {

                    set_sacola(produtos);
                };
            };

        } catch (erro) {

            console.error(erro);
        };
    };

    async function aumentar_produto(produto_selecionado) {

        try {

            const produto_atualizado = { ...produto_selecionado, quantidade_selecionada: produto_selecionado.quantidade_selecionada + 1 };
            const produtos = sacola.map(produto => produto._id == produto_selecionado._id ? produto_atualizado : produto);

            if (usuario_logado._id) {

                const sacola_atualizada = await api.put(`/sacolas_brechos/${produto_atualizado._id}`, produto_atualizado);
                set_usuario_logado(sacola_atualizada.data);

            } else {

                set_sacola(produtos);
            };

        } catch (erro) {

            console.error(erro);
        };
    };

    function imagem_do_brecho(id_brecho) {

        const encontrar_brecho = array_brechos.find(brecho => brecho._id == id_brecho);

        if (encontrar_brecho) {

            return encontrar_brecho.logo;
        };
    };

    function exibir_preco(produto_selecionado) {

        const preco_total = produto_selecionado.valor;
        const preco_formatado = preco_total.toFixed(2).replace('.', ',');

        return `R$${preco_formatado}`;
    };

    function ir_sacola_geral() {

        set_sacola_aberta(false);
        ir_para_sacola.push(`/sacola_brecho`);
    };

    function nome_produto(tipo){

        if(tipo == "caixa"){

            return "Caixa";
        } else if(tipo == "ecobag"){

            return "EcoBag"
        } else {

            return "Sacola"
        };
    };

    return (
        <AnimatePresence mode="wait">

            <motion.div
                className={styles['container_sacola']}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
            >
                <div className={styles["container_header_sacola"]}>

                    <h1>Sacola</h1>

                </div>

                <div className={styles["container_produtos_na_sacola"]}>

                    {sacola && sacola.length > 0 ? sacola.map((produto, i) => (

                        <div key={i} className={styles['container_produtos_a_exibir_sacola']}>

                            <div className={styles["container_imagem_do_produto_sacola"]}>

                                <img src={imagem_produto_sacola_brecho(produto.tipo, produto.padrao)} alt="" />

                            </div>

                            <div className={styles["container_info_produto_sacola"]}>

                                <div className={styles["container_info_produto_nome_sacola"]}>

                                    <div className={styles["container_info_produto_quantidade_e_nome"]}>

                                        <div className={styles["container_info_produto_titulo_sacola"]}>

                                            <h3>{nome_produto(produto.tipo)}</h3>
                                        </div>

                                        <div className={styles["container_contador_de_produtos"]}>

                                            <button className={styles['diminuir_quantidade_de_produto']} onClick={() => diminuir_produto(produto)}>-</button>
                                            <h5>{produto.quantidade_selecionada}</h5>
                                            <button className={styles['aumentar_quantidade_de_produto']} disabled={produto.quantidade_selecionada == produto.quantidade} onClick={() => aumentar_produto(produto)}>+</button>
                                        </div>

                                    </div>

                                    <div className={styles["container_info_produto_preco_e_logo"]}>

                                        <img src={imagem_do_brecho(produto.id_brecho)} alt="" />
                                        <span className={styles['preco_do_produto_sacola']}>{exibir_preco(produto)}</span>

                                    </div>


                                </div>

                            </div>

                        </div>

                    )) : <div className={styles['nenhum_item_adicionado']}> <img src="./img/icons/lupa.png" alt="" /><p>Nenhum item adicionado</p> </div>}

                </div>
                <div className={styles["container_botao_da_sacola"]}>

                    <button onClick={() => ir_sacola_geral()}>Visualizar Sacola</button>

                </div>

            </motion.div>
        </AnimatePresence>
    );
};