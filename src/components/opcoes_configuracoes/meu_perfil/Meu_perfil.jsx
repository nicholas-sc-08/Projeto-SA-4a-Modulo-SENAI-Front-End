import React from 'react'
import styles from '@/components/opcoes_configuracoes/meu_perfil/Meu_perfil.module.css'

function Meu_perfil() {
    return (
        <div className={styles["container-alinhamento-componente"]}>

            {/* Meu perfil */}
            <div className={styles['container-meu-perfil']}>
                <h4>Meu perfil</h4>
                <div className={styles["line-meu-perfil"]}></div>

                <div className={styles["container-alinhamento-imagens-meu-perfil"]}>
                    <div className={styles["container-foto-meu-perfil"]}>
                        <div className={styles["container-imagem-tamanho"]}>
                            <img src="./img/fotoPerfil.png" alt="" />
                        </div>

                        <div className={styles['container-alinhamento-texto-meu-perfil']}>
                            <h4>Foto de perfil</h4>

                            <div className={styles["alinhamento-button-excluir-meu-perfil"]}>
                                <button><img src="./img/icons/lixeira.svg" alt="" /> Excluir</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles["container-foto-meu-perfil"]}>
                        <div className={styles["container-imagem-tamanho"]}>
                            <img src="./img/fotoPerfil.png" alt="" />
                        </div>

                        <div className={styles['container-alinhamento-texto-meu-perfil-layout']}>
                            <h4>Layout</h4>

                            <div className={styles["alinhamento-button-excluir-meu-perfil-layout"]}>
                                <button><img src="./img/icons/lixeira.svg" alt="" /> Excluir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dados pessoais */}
            <div className={styles['container-secoes-dados']}>
                <div className={styles["container-alinhamento-titulo"]}>
                    <h4>Dados pessoais</h4>

                    <button><img src="./img/icons/edit.svg" alt="" /></button>
                </div>

                <div className={styles["line-meu-perfil"]}></div>

                {/* Aqui quando se aperta em editar tem que mudar para inputs e dps apertar no botão de salvar alterações */}
                <div className={styles["container-informacoes-edicao"]}>
                    <p>Nome do dono do brechó</p>
                    <p>Data de nascimento</p>
                    <p>CPF</p>
                    <p>Telefone</p>
                    <p>Senha</p>
                </div>

                <div className={styles["alinhamento-button-salvar-alteracoes-meu-perfil"]}>
                    <button>Salvar alterações</button>
                </div>
            </div>

            {/* Dados do brechó */}
            <div className={styles['container-secoes-dados']}>
                <div className={styles["container-alinhamento-titulo"]}>
                    <h4>Dados do brechó</h4>

                    <button><img src="./img/icons/edit.svg" alt="" /></button>
                </div>

                <div className={styles["line-meu-perfil"]}></div>

                {/* Aqui quando se aperta em editar tem que mudar para inputs e dps apertar no botão de salvar alterações */}
                <div className={styles["container-informacoes-edicao"]}>
                    <p>Nome do brechó</p>
                    <p>Email</p>
                    <p>Telefone</p>
                    <p>CNPJ</p>
                </div>

                <div className={styles["alinhamento-button-salvar-alteracoes-meu-perfil"]}>
                    <button>Salvar alterações</button>
                </div>
            </div>

            {/* Dados de endereço */}
            <div className={styles['container-secoes-dados']}>
                <div className={styles["container-alinhamento-titulo"]}>
                    <h4>Dados de endereço</h4>

                    <button><img src="./img/icons/edit.svg" alt="" /></button>
                </div>

                <div className={styles["line-meu-perfil"]}></div>

                {/* Aqui quando se aperta em editar tem que mudar para inputs e dps apertar no botão de salvar alterações */}
                <div className={styles["container-informacoes-edicao"]}>
                    <p>CEP</p>
                    <p>Bairro</p>
                    <p>Logradouro</p>
                    <p>Estado</p>
                    <p>Cidade</p>
                    <p>Número</p>
                    <p>Complemento</p>
                </div>

                <div className={styles["alinhamento-button-salvar-alteracoes-meu-perfil"]}>
                    <button>Salvar alterações</button>
                </div>
            </div>
        </div>
    )
}

export default Meu_perfil
