import React from 'react'
import styles from '@/components/opcoes_configuracoes/redes_sociais/Redes_sociais.module.css'

function Redes_sociais() {
    return (
        <div>
            <div className={styles["container-alinhamento-componente"]}>

                {/* Informações adicionais */}
                <div className={styles['container-secoes-dados']}>
                    <div className={styles["container-alinhamento-titulo"]}>
                        <h4>Informações adicionais</h4>
                        <button><img src="./img/icons/edit.svg" alt="" /></button>
                    </div>

                    <div className={styles["line-meu-perfil"]}></div>

                    <div className={styles["container-informacoes-edicao"]}>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                    </div>

                    <div className={styles["alinhamento-button-salvar-alteracoes-meu-perfil"]}>
                        <button>Salvar alterações</button>
                    </div>
                </div>

                {/* Redes sociais */}
                <div className={styles['container-secoes-dados']}>
                    <div className={styles["container-alinhamento-titulo"]}>
                        <h4>Redes sociais</h4>
                        <button><img src="./img/icons/edit.svg" alt="" /></button>
                    </div>

                    <div className={styles["line-meu-perfil"]}></div>

                    <div className={styles["container-informacoes-edicao"]}>
                        <p>Instagram</p>
                        <p>Facebook</p>
                        <p>WhatsApp</p>
                    </div>

                    <div className={styles["alinhamento-button-salvar-alteracoes-meu-perfil"]}>
                        <button>Salvar alterações</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Redes_sociais
