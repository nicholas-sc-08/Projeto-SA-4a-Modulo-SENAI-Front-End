import React from 'react'
import styles from '@/components/pop_up_confirmacao_excluir_conta/Pop_up_confirmacao_excluir_conta.module.css'
import { useGlobalContext } from '@/context/GlobalContext'

function Pop_up_confirmacao_excluir_conta() {

  const { popupExcluirAberto, setPopupExcluirAberto } = useGlobalContext()

  return (
    <div className={styles["overlay-excluir-conta"]}>
      <div className={styles["alinhamento-container-excluir-conta"]}>
        <h4>Certeza que deseja excluir esta conta?</h4>

        <p className={styles["descricao-excluir-conta"]}>
          Essa ação é <strong>irreversível</strong>. Todos os seus dados serão apagados permanentemente.
        </p>

        <div className={styles["container-alinhamento-buttons"]}>
          <button
            className={styles["botao-voltar"]}
            onClick={() => setPopupExcluirAberto(false)}
          >
            Voltar
          </button>
          <button
            className={styles["botao-excluir"]}
          >
            Sim, excluir
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pop_up_confirmacao_excluir_conta
