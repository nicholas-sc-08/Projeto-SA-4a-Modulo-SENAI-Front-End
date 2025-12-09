"use client";

import styles from "@/components/pop_up_dashboard/Cadastrar_personalizado.module.css";
import { useGlobalContext } from "@/context/GlobalContext";
import { imagem_produto_sacola_brecho } from "@/services/sacolas_brechos/sacolas_brecho";
import { buscarPersonalizados, cadastrarPersonalizado } from "@/services/personalizado/personalizado";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

export default function Cadstrar_personalizado() {

    const { modal_cadastrado, set_modal_cadastrado } = useGlobalContext();
    const { modal_criar_perso, set_modal_criar_perso } = useGlobalContext();
    const [personalizado, set_personalizado] = useState({ tipo: "caixa", material: "papelao_reciclavel", tamanho: "pequeno", padrao: "logo_fly", cor_corpo: "verde", cor_alca: "amarelo", cor: "verde", quantidade: 1 });

    useEffect(() => {

        if(personalizado.tipo === "caixa"){

           set_personalizado({...personalizado, material: "papelao_reciclavel"}); 
        } else if(personalizado.tipo === "sacola"){

            set_personalizado({...personalizado, material: "plastico_biodegradavel"});
        } else {

            set_personalizado({...personalizado, material: "algodao"});
        };

    }, [personalizado.tipo]);

    return (

        <div className={styles["container_pop_up"]}>
            <AnimatePresence>
                <motion.div className={styles["pop_up"]} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                    <aside className={styles["container_imagem"]}>
                        <div className={styles["fundo_imagem"]}>
                            <img src={imagem_produto_sacola_brecho(personalizado.tipo, personalizado.padrao, personalizado.cor, personalizado.cor_corpo, personalizado.cor_alca)} alt="" />
                        </div>
                    </aside>
                    <main className={styles["container_info"]}>
                        <header className={styles["container_titulo"]}>
                            <h2>Cadastro de Produto</h2>
                        </header>
                        <div className={styles["container_tipo_material"]}>
                            <div className={styles["container_opcoes"]}>
                                <label>Tipo</label>
                                <select value={personalizado.tipo} onChange={e => set_personalizado({ ...personalizado, tipo: e.target.value })}>
                                    <option value="caixa">Caixa</option>
                                    <option value="sacola">Sacola</option>
                                    <option value="ecobag">Ecobag</option>
                                </select>
                            </div>
                            <div className={styles["container_opcoes"]}>
                                <label>Material</label>
                                <select value={personalizado.material} onChange={e => set_personalizado({ ...personalizado, material: e.target.value })}>
                                    <option value="papelao_reciclavel" disabled={personalizado.tipo === "sacola" || personalizado.tipo === "ecobag"}>Papelão Reciclável</option>
                                    <option value="plastico_biodegradavel" disabled={personalizado.tipo === "caixa" || personalizado.tipo === "ecobag"}>Plástico Biodegradável</option>
                                    <option value="papel_kraft" disabled={personalizado.tipo === "caixa" || personalizado.tipo === "ecobag"}>Papel Kraft</option>
                                    <option value="algodao" disabled={personalizado.tipo === "caixa" || personalizado.tipo === "sacola"}>Algodão</option>
                                    <option value="poliester_reciclavel" disabled={personalizado.tipo === "caixa" || personalizado.tipo === "sacola"}>Poliéster Reciclável</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles["container_tipo_material"]}>
                            <div className={styles["container_opcoes"]}>
                                <label>Padrão</label>
                                <select value={personalizado.padrao} onChange={e => set_personalizado({ ...personalizado, padrao: e.target.value })}>
                                    <option value="logo_fly">Logo Fly</option>
                                    <option value="logo_fly_nome">Logo Fly Nome</option>
                                    <option value="logo_fly_embaixo">Logo Fly em Baixo</option>
                                    <option value="sem_logo">Sem Logo</option>
                                </select>
                            </div>
                            <div className={styles["container_opcoes"]}>
                                <label>Tamanho</label>
                                <select value={personalizado.tamanho} onChange={e => set_personalizado({ ...personalizado, tamanho: e.target.value })}>
                                    <option value="pequeno">Pequeno</option>
                                    <option value="medio">Médio</option>
                                    <option value="grande">Grande</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles["container_tipo_material"]}>
                            <div className={styles["container_opcoes"]}>
                                <label>Cor Corpo</label>
                                <select disabled={personalizado.tipo === "caixa" || personalizado.tipo === "sacola"} value={personalizado.cor_corpo} onChange={e => set_personalizado({ ...personalizado, cor_corpo: e.target.value })}>
                                    <option value="amarelo">Amarelo</option>
                                    <option value="verde">Verde</option>
                                    <option value="areia">Areia</option>
                                </select>
                            </div>
                            <div className={styles["container_opcoes"]}>
                                <label>Cor Alça</label>
                                <select disabled={personalizado.tipo === "caixa" || personalizado.tipo === "sacola"} value={personalizado.cor_alca} onChange={e => set_personalizado({ ...personalizado, cor_alca: e.target.value })}>
                                    <option value="amarelo">Amarelo</option>
                                    <option value="verde">Verde</option>
                                    <option value="areia">Areia</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles["container_tipo_material"]}>
                            <div className={styles["container_opcoes"]}>
                                <label>Cor</label>
                                <select disabled={personalizado.tipo === "caixa"} value={personalizado.cor} onChange={e => set_personalizado({ ...personalizado, cor: e.target.value })}>
                                    <option value="verde">Verde</option>
                                    <option value="branco">Branco</option>
                                </select>
                            </div>
                            <div className={styles["container_opcoes"]}>
                                <label>Quantidade</label>
                                <input type="number" min={1} placeholder="0" value={personalizado.quantidade} onChange={e => set_personalizado({ ...personalizado, quantidade: Number(e.target.value) })} />
                            </div>
                        </div>
                        <footer className={styles["footer"]}>
                            <button className={styles["botao_cadastrar_personalizado"]} onClick={() => cadastrarPersonalizado(personalizado).then(set_modal_cadastrado(true), set_modal_criar_perso(false))}>Cadastrar</button>
                            <button className={styles["botao_limpar_personalizado"]} onClick={() => set_modal_criar_perso(false)}>Sair</button>
                        </footer>
                    </main>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};