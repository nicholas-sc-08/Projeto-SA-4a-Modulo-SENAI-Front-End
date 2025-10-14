import { useGlobalContext } from '@/context/GlobalContext';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/components/header_pop_up_configuracoes/Header_pop_up_configuracoes.module.css';
import React from 'react';
import { useRouter } from 'next/navigation';

function Header_pop_up_configuracoes() {
    const { usuario_logado, set_usuario_logado } = useGlobalContext();
    const { brecho_selecionado, set_brecho_selecionado } = useGlobalContext();
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const router = useRouter();

    function ir_ate_perfil() {
        const encontrar_brecho = array_brechos.find(brecho => brecho._id === usuario_logado._id);
        set_brecho_selecionado(usuario_logado);

        if (encontrar_brecho) {
            router.push(`/perfil_brecho`);

        } else {
            router.push(`/estamos_chegando`);
        }
    }

    function ir_para_configuracoes() {
        router.push('/configuracoes_brecho');
    }

    function deslogar_usuario() {

        set_usuario_logado([]);
        set_sacola([]);
        router.push('/');
    };

    return (
        <AnimatePresence>
            <div className={styles["menu-pop-up-configuracoes-container"]}>
                <motion.div
                    className={styles["menu-pop-up-configuracoes"]}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    <div className={styles["informacoes-conta-pop-up-configuracoes-container"]}>
                        <img
                            referrerPolicy="no-referrer"
                            crossOrigin="anonymous"
                            className='img-menu-pop-up-configuracoes'
                            src={
                                usuario_logado._id
                                    ? usuario_logado.imagem_de_perfil || usuario_logado.logo
                                    : "/img/icons/IconePerfil.svg"
                            }
                        />

                        <p>Olá! {usuario_logado.nome_brecho}</p>

                        <button
                            onClick={() => ir_ate_perfil()}
                            className={styles['button-ir-para-perfil']}
                        >
                            Minha conta
                        </button>

                        <div className={styles["line-configuracoes-container"]}></div>
                    </div>

                    <div className={styles["topicos-redirecionamento"]}>
                        <ul>
                            <li><button onClick={ir_para_configuracoes}>Configurações</button></li>
                            <li><button>Meus pedidos</button></li>
                            <li><button>Lista de desejos</button></li>
                            <li><button>Eventos</button></li>
                            <li><button>Ajuda</button></li>
                            <li><button>Informar um problema</button></li>
                            <li><button onClick={deslogar_usuario}>Sair</button></li>
                        </ul>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}

export default Header_pop_up_configuracoes;
