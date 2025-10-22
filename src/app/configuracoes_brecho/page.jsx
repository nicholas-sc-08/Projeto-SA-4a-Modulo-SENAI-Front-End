"use client";

import React, { useState } from 'react'
import styles from '@/app/configuracoes_brecho/page.module.css'
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Meu_perfil from '@/components/opcoes_configuracoes/meu_perfil/Meu_perfil';
import { useGlobalContext } from '@/context/GlobalContext';
import { useRouter } from 'next/navigation';
import Pop_up_confirmacao_excluir_conta from '@/components/pop_up_confirmacao_excluir_conta/Pop_up_confirmacao_excluir_conta';

function Page() {
    const [secaoAtiva, setSecaoAtiva] = useState('meu-perfil');
    const { usuario_logado, set_usuario_logado } = useGlobalContext();
    const { brecho_selecionado, set_brecho_selecionado } = useGlobalContext();
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { sacola, set_sacola } = useGlobalContext();
    const router = useRouter();

    const [popupExcluirAberto, setPopupExcluirAberto] = useState(false)

    const renderizarConteudo = () => {
        switch (secaoAtiva) {
            case 'meu-perfil':
                return <Meu_perfil />;
            case 'redes-sociais':
                return <div>Componente Redes Sociais</div>;
            case 'eventos':
                return <div>Componente Eventos</div>;
            case 'saiba-mais':
                return <div>Componente Saiba Mais</div>;
            case 'ajuda-faq':
                return <div>Componente Ajuda (FAQ)</div>;
            default:
                return <Meu_perfil />;
        }
    }

    function ir_ate_perfil() {
        const encontrar_brecho = array_brechos.find(brecho => brecho._id === usuario_logado._id);
        set_brecho_selecionado(usuario_logado);

        if (encontrar_brecho) {
            router.push(`/perfil_brecho`);

        } else {
            router.push(`/estamos_chegando`);
        }
    }

    function deslogar_usuario() {

        set_usuario_logado([]);
        set_sacola([]);
        router.push('/');
    };

    return (
        <div>
            <Header />

            <div className={styles["config-container"]}>
                {/* MENU LATERAL ESQUERDO */}
                <div className={styles["menu-lateral"]}>
                    <div className={styles["escolha-config"]}>
                        <div className={styles["info-perfil"]}>
                            <img src="./img/fotoPerfil.png" alt="" />
                        </div>

                        <div className={styles["ir-para-perfil"]}>
                            <div className={styles["container-informacoes-ir-para-perfil"]}>
                                <h4>Project Indigo Brechó</h4>
                                <p>No Fly desde: 10/09/2024</p>
                            </div>

                            <button onClick={() => ir_ate_perfil()}>Ir para perfil</button>
                        </div>

                        <div className={styles['line-config']}></div>
                    </div>

                    <div className={styles["conteudo-config"]}>
                        <button
                            className={secaoAtiva === 'meu-perfil' ? styles['ativo'] : ''}
                            onClick={() => setSecaoAtiva('meu-perfil')}
                        >
                            Meu perfil
                        </button>
                        <button
                            className={secaoAtiva === 'redes-sociais' ? styles['ativo'] : ''}
                            onClick={() => setSecaoAtiva('redes-sociais')}
                        >
                            Redes sociais
                        </button>
                        <button
                            className={secaoAtiva === 'eventos' ? styles['ativo'] : ''}
                            onClick={() => setSecaoAtiva('eventos')}
                        >
                            Eventos
                        </button>
                        <button
                            className={secaoAtiva === 'saiba-mais' ? styles['ativo'] : ''}
                            onClick={() => setSecaoAtiva('saiba-mais')}
                        >
                            Saiba mais
                        </button>
                        <button
                            className={secaoAtiva === 'ajuda-faq' ? styles['ativo'] : ''}
                            onClick={() => setSecaoAtiva('ajuda-faq')}
                        >
                            Ajuda (FAQ)
                        </button>
                    </div>

                    <div className={styles["container-escolhas-perigosas"]}>
                        <div className={styles["container-sair-da-conta"]}>
                            <button onClick={deslogar_usuario}>
                                <img src="./img/icons/logout-marrom.svg" alt="" />
                                Sair da conta
                            </button>

                            <p>encerrando atividades online, nos vemos em breve</p>
                        </div>

                        <div className={styles["container-excluir-conta"]}>
                            <button onClick={() => setPopupExcluirAberto(true)}>
                                <img src="./img/icons/lixeira.svg" alt="" />
                                Excluir minha conta
                            </button>

                            <p>esta ação não pode ser desfeita</p>
                        </div>
                    </div>
                </div>

                {/* CONTEÚDO DINÂMICO DIREITO */}
                <div className={styles["conteudo-dinamico"]}>
                    {renderizarConteudo()}
                </div>
            </div>

            <Footer />

            {popupExcluirAberto && (
                <Pop_up_confirmacao_excluir_conta />
            )}

        </div>
    )
}

export default Page