"use client";

import styles from "@/components/pop_up_dashboard/Cadastrar_personalizado.module.css";
import { useGlobalContext } from "@/context/GlobalContext";
import { imagem_produto_sacola_brecho } from "@/services/sacolas_brechos/sacolas_brecho";
import { cadastrarPersonalizado } from "@/services/personalizado/personalizado";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";

export default function Cadstrar_personalizado() {

    const { set_modal_criar_perso } = useGlobalContext();
    const [personalizado, set_personalizado] = useState({ tipo: "caixa", material: "papelao_reciclavel", tamanho: "pequeno", padrao: "logo_fly", cor_corpo: "", cor_alca: "", cor: "verde", quantidade: 1 });

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
                                    <option value="papelao_reciclavel">Papelão Reciclável</option>
                                    <option value="plastico_biodegradavel" disabled={personalizado.tipo === "caixa"}>Plástico Biodegradável</option>
                                    <option value="papel_kraft" disabled={personalizado.tipo === "caixa"}>Papel Kraft</option>
                                    <option value="algodao" disabled={personalizado.tipo === "caixa"}>Algodão</option>
                                    <option value="poliester_reciclavel" disabled={personalizado.tipo === "caixa"}>Poliéster Reciclável</option>
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
                            <button className={styles["botao_cadastrar_personalizado"]} onClick={() => cadastrarPersonalizado(personalizado)}>Cadastrar</button>
                            <button className={styles["botao_limpar_personalizado"]} onClick={() => set_modal_criar_perso(false)}>Sair</button>
                        </footer>
                    </main>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};