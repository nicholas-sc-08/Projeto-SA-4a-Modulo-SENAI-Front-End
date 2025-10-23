import React from 'react'

function Pop_up_confirmacao_sair_da_conta() {
  return (
    <div>
        <h4>Tem certeza que quer sair dessa conta?</h4>

        <div className={styles["container-alinhamento-buttons"]}>
            <button>Voltar</button>
            <button>Sim, sair</button>
        </div>
    </div>
  )
}

export default Pop_up_confirmacao_sair_da_conta
