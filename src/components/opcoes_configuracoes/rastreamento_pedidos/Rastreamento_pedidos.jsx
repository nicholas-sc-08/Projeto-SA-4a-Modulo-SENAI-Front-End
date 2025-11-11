import React from 'react'
import styles from '@/components/opcoes_configuracoes/rastreamento_pedidos/Rastreamento_pedidos.module.css'

function Rastreamento_pedidos({ pedidoId, onVoltar }) {
  const pedidoInfo = {
    numero: pedidoId || '12 3456',
    dataRealizacao: '23 de outubro de 2025',
    enderecoEntrega: 'Rua Capitão Romualdo de Barros, 16',
    bairro: 'Carvoeira',
    cidade: 'Florianópolis - SC'
  };

  const statusTimeline = [
    {
      titulo: 'Pedido Feito',
      concluido: true,
      ativo: false
    },
    {
      titulo: 'Processando',
      concluido: true,
      ativo: false
    },
    {
      titulo: 'Enviado',
      concluido: true,
      ativo: true
    },
    {
      titulo: 'Entregue',
      concluido: false,
      ativo: false
    }
  ];

  const historicoEntregas = [
    {
      data: 'Hoje',
      hora: '16:34',
      mensagem: 'Saiu da conta',
      detalhes: 'Seu produto já saiu da conta, veja nos eventos abaixo'
    },
    {
      data: 'Hoje',
      hora: '16:34',
      mensagem: 'Saiu da conta',
      detalhes: 'Seu produto já saiu da conta, veja nos eventos abaixo'
    },
    {
      data: 'Hoje',
      hora: '16:34',
      mensagem: 'Saiu da conta',
      detalhes: 'Seu produto já saiu da conta, veja nos eventos abaixo'
    },
    {
      data: 'Hoje',
      hora: '16:34',
      mensagem: 'Saiu da conta',
      detalhes: 'Seu produto já saiu da conta, veja nos eventos abaixo'
    }
  ];

  return (
    <div className={styles.container}>
      <button onClick={onVoltar} className={styles["btn-voltar"]}>
        ← Voltar
      </button>

      {/* Timeline de Status */}
      <div className={styles["timeline-container"]}>
        {statusTimeline.map((status, index) => (
          <div key={index} className={styles["timeline-item"]}>
            <div className={styles["timeline-icon-wrapper"]}>
              <div 
                className={`${styles["timeline-icon"]} ${
                  status.ativo ? styles["icon-ativo"] : 
                  status.concluido ? styles["icon-concluido"] : 
                  styles["icon-pendente"]
                }`}
              >
                {status.ativo && <span className={styles["letra-m"]}>M</span>}
              </div>
              {index < statusTimeline.length - 1 && (
                <div className={`${styles["timeline-line"]} ${
                  status.concluido ? styles["line-concluida"] : styles["line-pendente"]
                }`} />
              )}
            </div>
            <span 
              className={`${styles["timeline-label"]} ${
                status.concluido || status.ativo ? styles["label-ativo"] : styles["label-inativo"]
              }`}
            >
              {status.titulo}
            </span>
          </div>
        ))}
      </div>

      {/* Informações do Endereço */}
      <div className={styles["endereco-card"]}>
        <h3 className={styles["endereco-titulo"]}>
          Receber em {pedidoInfo.enderecoEntrega}
        </h3>
        <p className={styles["endereco-detalhes"]}>
          {pedidoInfo.bairro}<br />
          {pedidoInfo.cidade}
        </p>
      </div>

      {/* Informações do Pedido */}
      <div className={styles["pedido-info"]}>
        <h4 className={styles["pedido-numero"]}>Pedido Nº {pedidoInfo.numero}</h4>
        <p className={styles["pedido-data"]}>
          Pedido realizado em {pedidoInfo.dataRealizacao}
        </p>
      </div>

      {/* Histórico de Entregas */}
      <div className={styles["historico-container"]}>
        {historicoEntregas.map((item, index) => (
          <div key={index} className={styles["historico-item"]}>
            <div className={styles["historico-left"]}>
              <span className={styles["historico-data"]}>{item.data}</span>
              <span className={styles["historico-hora"]}>{item.hora}</span>
            </div>
            <div className={styles["historico-bola"]}></div>
            <div className={styles["historico-right"]}>
              <h5 className={styles["historico-mensagem"]}>📦 {item.mensagem}</h5>
              <p className={styles["historico-detalhes"]}>{item.detalhes}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Recebi meu pedido */}
      <button className={styles["btn-recebi"]}>
        Recebi meu pedido
      </button>
    </div>
  );
}

export default Rastreamento_pedidos;

