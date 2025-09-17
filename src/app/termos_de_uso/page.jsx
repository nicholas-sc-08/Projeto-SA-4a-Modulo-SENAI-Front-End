"use client";

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import styles from "@/app/termos_de_uso/page.module.css";
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useGlobalContext } from '@/context/GlobalContext';

export default function Termos_de_uso() {

    const { tipo_de_header, set_tipo_de_header } = useGlobalContext();

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}>
                <Header tipo={tipo_de_header} />

                <div className={styles["container-all-page-termos-de-uso"]}>
                    <div className={styles["alinhamento-titulo-subtitulo-termos-de-uso"]}>
                        <h1>Termos de uso</h1>

                        <p>Ao acessar ou usar a Fly, você concorda com os seguintes Termos de Uso. É importante que você leia com atenção antes de utilizar nossos serviços.</p>
                    </div>

                    <div className={styles["container-alinhamento-topicos-termos-de-uso"]}>
                        <div className={styles["topico-um-termos-de-uso"]}>
                            <h1>1.Sobre a Fly</h1>

                            <p>A Fly é uma plataforma digital que conecta brechós, vendedores(as) e pessoas interessadas em comprar ou doar roupas e acessórios de forma consciente.</p>
                        </div>

                        <div className={styles["topico-dois-termos-de-uso"]}>
                            <h1>2. Cadastro</h1>

                            <ul>
                                <li>Para acessar algumas funcionalidades da plataforma, é necessário realizar um cadastro.</li>
                                <li>Você deve fornecer informações verdadeiras, completas e atualizadas.</li>
                                <li>A conta é pessoal e intransferível. Cada pessoa pode ter apenas um cadastro.</li>
                                <li>Menores de 18 anos não podem utilizar a plataforma.</li>
                            </ul>
                        </div>

                        <div className={styles["topico-tres-termos-de-uso"]}>
                            <h1>3. Responsabilidades do Usuário</h1>

                            <ul>
                                <li>Usar a plataforma de maneira ética, respeitando outros usuários.</li>
                                <li>Não publicar conteúdos ofensivos, discriminatórios ou falsos.</li>
                                <li>Informar corretamente os dados dos produtos anunciados (tamanho, condição, etc.).</li>
                            </ul>
                        </div>

                        <div className={styles["topico-quatro-termos-de-uso"]}>
                            <h1>4. Uso da Plataforma</h1>

                            <ul>
                                <li>A Fly é responsável por facilitar a conexão entre usuários e brechós, mas <strong>não se responsabiliza por negociações externas, qualidade dos produtos, entregas ou devoluções.</strong></li>
                                <li>Qualquer irregularidade pode ser denunciada e analisada pela equipe da Fly.</li>
                            </ul>
                        </div>

                        <div className={styles["topico-cinco-termos-de-uso"]}>
                            <h1>5. Suspensão ou Cancelamento</h1>

                            <p>Nos reservamos o direito de suspender ou cancelar contas que violem estes Termos ou utilizem a plataforma de forma indevida.</p>
                        </div>

                        <div className={styles["topico-seis-termos-de-uso"]}>
                            <h1>6. Alterações</h1>

                            <p>Estes Termos podem ser atualizados a qualquer momento, e notificaremos os usuários sobre mudanças relevantes.</p>
                        </div>
                    </div>
                </div>

                <Footer />
            </motion.div>
        </AnimatePresence>
    );
};