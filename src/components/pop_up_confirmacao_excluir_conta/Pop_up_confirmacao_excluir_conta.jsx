import React from 'react'

function Pop_up_confirmacao_excluir_conta() {
  return (
    <div>
      <h4>Certeza que quer excluir essa conta?</h4>

      <div className={styles["container-alinhamento-buttons"]}>
        <button>Voltar</button>
        <button>Sim, excluir</button>
      </div>
    </div>
  )
}

export default Pop_up_confirmacao_excluir_conta
