import React from 'react'
import styles from '@/components/pop_up_confirmacao_sair_da_conta/Pop_up_confirmacao_sair_da_conta.module.css'
import { useGlobalContext } from '@/context/GlobalContext'

function Pop_up_confirmacao_sair_da_conta() {

  const { popupSairAberto, setPopupSairAberto } = useGlobalContext()


  return (
    <div className={styles["overlay-sair-conta"]}>
      <div className={styles["alinhamento-container-sair-conta"]}>
        <h4>Tem certeza que deseja sair desta conta?</h4>

        <p className={styles["descricao-sair-conta"]}>
          Você poderá entrar novamente a qualquer momento com suas credenciais.
        </p>

        <div className={styles["container-alinhamento-buttons"]}>
          <button
            className={styles["botao-voltar"]}
            onClick={() => setPopupSairAberto(false)}
          >
            Voltar
          </button>

          <button
            className={styles["botao-sair"]}
          >
            Sim, sair
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pop_up_confirmacao_sair_da_conta
