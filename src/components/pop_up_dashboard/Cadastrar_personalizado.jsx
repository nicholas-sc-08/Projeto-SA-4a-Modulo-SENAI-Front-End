"use client";

import styles from "@/components/pop_up_dashboard/Cadastrar_personalizado.module.css";
import { AnimatePresence, motion } from "framer-motion";

export default function Cadstrar_personalizado() {

    return (

        <div className={styles["container_pop_up"]}>
            <AnimatePresence>
                <motion.div className={styles["pop_up"]} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
                    <aside className={styles["container_imagem"]}>
                        <div className={styles["fundo_imagem"]}>
                            <img src="./img/produtos_personalizados/caixa/caixa-meio-virada-logo-nome-emcima.svg" alt="" />
                        </div>
                    </aside>
                    <main className={styles["container_info"]}>
                        <header className={styles["container_titulo"]}>
                            <h2>Cadastro de Produto</h2>
                            <button>Sair</button>
                        </header>
                        <div className={styles["container_tipo_material"]}>
                            <div className={styles["container_opcoes"]}>
                                <label>Tipo</label>
                                <select>
                                    <option value="caixa">Caixa</option>
                                    <option value="sacola">Sacola</option>
                                    <option value="ecobag">Ecobag</option>
                                </select>
                            </div>
                            <div className={styles["container_opcoes"]}>
                                <label>Material</label>
                                <select>
                                    <option value="papelao_reciclavel">Papelão Reciclável</option>
                                    <option value="plastico_biodegradavel">Plástico Biodegradável</option>
                                    <option value="papel_kraft">Papel Kraft</option>
                                    <option value="algodao">Algodão</option>
                                    <option value="poliester_reciclavel">Poliéster Reciclável</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles["container_tipo_material"]}>
                            <div className={styles["container_opcoes"]}>
                                <label>Padrão</label>
                                <select>
                                    <option value="logo_fly">Logo Fly</option>
                                    <option value="logo_fly_nome">Logo Fly Nome</option>
                                    <option value="logo_fly_embaixo">Logo Fly em Baixo</option>
                                    <option value="sem_logo">Sem Logo</option>
                                </select>
                            </div>
                            <div className={styles["container_opcoes"]}>
                                <label>Tamanho</label>
                                <select>
                                    <option value="pequeno">Pequeno</option>
                                    <option value="medio">Médio Biodegradável</option>
                                    <option value="grande">Grande</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles["container_tipo_material"]}>
                            <div className={styles["container_opcoes"]}>
                                <label>Cor Corpo</label>
                                <select>
                                    <option value="amarelo">Amarelo</option>
                                    <option value="verde">Verde</option>
                                    <option value="areia">Areia</option>
                                </select>
                            </div>
                            <div className={styles["container_opcoes"]}>
                                <label>Cor Alça</label>
                                <select>
                                    <option value="amarelo">Amarelo</option>
                                    <option value="verde">Verde</option>
                                    <option value="areia">Areia</option>
                                </select>
                            </div>
                        </div>

                        <div className={styles["container_tipo_material"]}>
                            <div className={styles["container_opcoes"]}>
                                <label>Cor</label>
                                <select>
                                    <option value="verde">Verde</option>
                                    <option value="branco">Branco</option>
                                </select>
                            </div>
                            <div className={styles["container_opcoes"]}>
                                <label>Quantidade</label>
                                <input type="number" placeholder="0"/>
                            </div>
                        </div>
                        <footer className={styles["footer"]}>
                        <button>Cadastrar</button>
                        <button>Limpar</button>
                        </footer> 
                    </main>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};