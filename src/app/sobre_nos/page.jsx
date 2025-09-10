"use client";

import Footer from '@/components/footer/Footer';
import Header from '@/components/header/Header';
import styles from "@/app/sobre_nos/page.module.css";
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { useGlobalContext } from '@/context/GlobalContext';
import Link from 'next/link';

export default function Sobre_nos() {

  const { tipo_de_header, set_tipo_de_header } = useGlobalContext();

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4 }}>
        <Header tipo={tipo_de_header} />

        <div className={styles["alinhamento-all-page-sobrenos"]}>
          <div className={styles["alinhamento-sobre-a-fly-sobrenos"]}>
            <div className={styles["alinhamento-container-um-sobre-a-fly"]}>
              <h2>Sobre a Fly</h2>

              <p>A Fly é uma plataforma criada para conectar brechós a um público maior, tornando a experiência de compra mais prática, acessível e consciente. A ideia surgiu da vivência de um dos nossos membros, cuja mãe, dona de brechó, enfrentava dificuldades para alcançar novos clientes.</p>

              <p>Inspirados por essa realidade, desenvolvemos uma solução que apoia pequenos empreendedores e promove a moda sustentável. Nossa missão é transformar a forma como as pessoas descobrem e consomem moda, valorizando peças únicas, cheias de história e com impacto positivo.</p>
            </div>

            <img src="./img/imagem_grupal.jpeg" alt="Imagem com os integrantes de grupo" />
          </div>

          <div className={styles["alinhamento-nossa-misao-sobrenos"]}>

            <h2>Nossa Missão</h2>

            <div className={styles["alinhamento-container-dois-nossa-misao"]}>

              <div className={styles["container-um-nossa-misao"]}>
                <img src="./img/icons/consumo_consciente.svg" alt="" />

                <h3>Consumo com consciência</h3>

                <p>Valorizar o que já existe e incentivar a moda circular.</p>
              </div>

              <div className={styles["container-dois-nossa-misao"]}>
                <img src="./img/icons/estrela_nossa_missao.svg" alt="" />

                <h3>Estilo acessível</h3>

                <p>Facilitar o acesso à moda sustentável para todos.</p>
              </div>

              <div className={styles["container-tres-nossa-misao"]}>
                <img src="./img/icons/apoio_aos_pequenos.svg" alt="" />

                <h3>Apoio Local</h3>

                <p>Dar visibilidade a brechós locais e empreendedores independentes.</p>
              </div>

              <div className={styles["container-quatro-nossa-misao"]}>
                <img src="./img/icons/moda_com_proposito.svg" alt="" />

                <h3>Moda com propósito</h3>

                <p>Conectar estilo e significado em cada escolha.</p>
              </div>
            </div>
          </div>

          <div className={styles["container-quem-esta-por-tras"]}>

            <h2>Quem está por trás?</h2>

            <div className={styles["container-equipe-quem-esta-por-tras-sobrenos"]}>

              <div className={styles["membro-da-equipe"]}>
                <img src="./img/maria_eduarda.svg" alt="Maria Eduarda" />
                <div className={styles["hover-redes-nome-dos-membros"]}>
                  <div className={styles['redes-sociais']}>
                    <p className={styles['nome-do-membro']}>Maria Eduarda</p>
                    <Link target='_blank' href="https://www.linkedin.com/in/maria-eduarda-wolf-luiz-051825344/"><i className="fab fa-linkedin-in"></i></Link>
                    <Link target='_blank' href="https://www.instagram.com/wolf_eduarda12?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><i className="fab fa-instagram"></i></Link>
                    <Link target='_blank' href="https://github.com/dudawl18"><i className="fab fa-github"></i></Link>
                  </div>
                </div>
              </div>

              <div className={styles["membro-da-equipe"]}>
                <img src="./img/gabriel.svg" alt="Gabriel Lacerda" />
                <div className={styles["hover-redes-nome-dos-membros"]}>
                  <div className={styles['redes-sociais']}>
                    <p className={styles['nome-do-membro']}>Gabriel Lacerda</p>
                    <Link target='_blank' href="https://www.linkedin.com/in/gabriel-fernandes-a90649329/"><i className="fab fa-linkedin-in"></i></Link>
                    <Link target='_blank' href="https://www.instagram.com/_.lac.z?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><i className="fab fa-instagram"></i></Link>
                    <Link target='_blank' href="https://github.com/GabrielFerLacerda"><i className="fab fa-github"></i></Link>
                  </div>
                </div>
              </div>

              <div className={styles["membro-da-equipe"]}>
                <img src="./img/mayara.svg" alt="Mayara" />
                <div className={styles["hover-redes-nome-dos-membros"]}>
                  <div className={styles['redes-sociais']}>
                    <p className={styles['nome-do-membro']}>Mayara Storl</p>
                    <Link target='_blank' href="https://www.linkedin.com/in/mayara-storl-315ab9346/"><i className="fab fa-linkedin-in"></i></Link>
                    <Link target='_blank' href="https://www.instagram.com/storl_may?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="><i className="fab fa-instagram"></i></Link>
                    <Link target='_blank' href="https://github.com/MayaraStorl"><i className="fab fa-github"></i></Link>
                  </div>
                </div>
              </div>

              <div className={styles["membro-da-equipe"]}>
                <img src="./img/nicholas.svg" alt="Nicholas" />
                <div className={styles["hover-redes-nome-dos-membros"]}>
                  <div className={styles['redes-sociais']}>
                    <p className={styles['nome-do-membro']}>Nicholas Serencovich</p>
                    <Link target='_blank' href="https://www.linkedin.com/in/nicholas-carvalho-2b73a5297/"><i className="fab fa-linkedin-in"></i></Link>
                    <Link target='_blank' href="https://www.instagram.com/nchls.08/"><i className="fab fa-instagram"></i></Link>
                    <Link target='_blank' href="https://github.com/nicholas-sc-08"><i className="fab fa-github"></i></Link>
                  </div>
                </div>
              </div>

              <div className={styles["membro-da-equipe"]}>
                <img src="./img/alejandra.svg" alt="Alejandra" />
                <div className={styles["hover-redes-nome-dos-membros"]}>
                  <div className={styles['redes-sociais']}>
                    <p className={styles['nome-do-membro']}>Rinmarys Alejandra</p>
                    <Link target='_blank' href="https://www.linkedin.com/in/rinmarys-monagas-a30083316/"><i className="fab fa-linkedin-in"></i></Link>
                    <Link target='_blank' href="https://www.instagram.com/rinmarys/"><i className="fab fa-instagram"></i></Link>
                    <Link target='_blank' href="https://github.com/rinmarys"><i className="fab fa-github"></i></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};