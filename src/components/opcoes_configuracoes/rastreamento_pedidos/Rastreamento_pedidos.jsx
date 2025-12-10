import React, { useState, useEffect } from 'react'
import styles from '@/components/opcoes_configuracoes/rastreamento_pedidos/Rastreamento_pedidos.module.css'
import { buscar_sacola_brecho } from '@/services/sacolas_brechos/sacolas_brecho'
import { buscar_pedido_por_id } from '@/services/pedido/Pedido'
import { Check } from 'lucide-react';

function Rastreamento_pedidos({ pedidoId, onVoltar }) {
  const [pedidoInfo, setPedidoInfo] = useState(null);
  const [statusPedido, setStatusPedido] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  // Mapeamento dos stages para a timeline
  const mapearStageParaTimeline = (stage) => {
    const stages = {
      'NA_FILA': 0,
      'PRODUZINDO': 1,
      'EXPEDICAO': 2,
      'ENTREGUE': 3
    };

    const stageAtual = stages[stage] || 0;

    return [
      {
        titulo: 'Pedido Feito',
        concluido: stageAtual >= 0,
        ativo: stageAtual === 0
      },
      {
        titulo: 'Processando',
        concluido: stageAtual >= 1,
        ativo: stageAtual === 1
      },
      {
        titulo: 'Enviado',
        concluido: stageAtual >= 2,
        ativo: stageAtual === 2
      },
      {
        titulo: 'Entregue',
        concluido: stageAtual >= 3,
        ativo: stageAtual === 3
      }
    ];
  };

  // Formatar data para exibição
  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
    const hoje = new Date();

    // Verifica se é hoje
    if (data.toDateString() === hoje.toDateString()) {
      return 'Hoje';
    }

    // Verifica se foi ontem
    const ontem = new Date(hoje);
    ontem.setDate(ontem.getDate() - 1);
    if (data.toDateString() === ontem.toDateString()) {
      return 'Ontem';
    }

    // Retorna data formatada
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatarHora = (dataISO) => {
    const data = new Date(dataISO);
    return data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Mapear stage para mensagem legível
  const obterMensagemStage = (stage) => {
    const mensagens = {
      'NA_FILA': 'Pedido recebido e aguardando na fila',
      'PRODUZINDO': 'Pedido está sendo produzido',
      'EXPEDICAO': 'Pedido enviado para expedição',
      'ENTREGUE': 'Pedido entregue com sucesso'
    };
    return mensagens[stage] || stage;
  };

  // Obter detalhes adicionais do histórico
  const obterDetalhesStage = (stage, finishedAt) => {
    if (finishedAt) {
      return `Concluído em ${formatarHora(finishedAt)}`;
    }

    const detalhes = {
      'NA_FILA': 'Seu pedido foi registrado no sistema',
      'PRODUZINDO': 'A produção está em andamento',
      'EXPEDICAO': 'O pedido foi enviado e está a caminho',
      'ENTREGUE': 'O pedido chegou ao destino'
    };
    return detalhes[stage] || 'Processando...';
  };

  useEffect(() => {
    async function carregarDadosPedido() {
      try {
        setLoading(true);
        setErro(null);

        // 1. Buscar a sacola pelo ID
        const sacola = await buscar_sacola_brecho(pedidoId);

        if (!sacola) {
          setErro('Sacola não encontrada');
          setLoading(false);
          return;
        }

        // 2. Buscar o pedido usando o id_pedido da sacola
        const pedido = await buscar_pedido_por_id(sacola.id_pedido);

        if (!pedido) {
          setErro('Pedido não encontrado no sistema');
          setLoading(false);
          return;
        }

        setPedidoInfo(sacola);
        setStatusPedido(pedido);
        setLoading(false);

      } catch (error) {
        console.error('Erro ao carregar dados do pedido:', error);
        setErro('Erro ao carregar informações do pedido');
        setLoading(false);
      }
    }

    if (pedidoId) {
      carregarDadosPedido();

      // Atualizar status a cada 30 segundos
      const intervalo = setInterval(carregarDadosPedido, 30000);

      return () => clearInterval(intervalo);
    }
  }, [pedidoId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <button onClick={onVoltar} className={styles["btn-voltar"]}>
          ← Voltar
        </button>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>Carregando informações do pedido...</p>
        </div>
      </div>
    );
  }

  if (erro || !pedidoInfo || !statusPedido) {
    return (
      <div className={styles.container}>
        <button onClick={onVoltar} className={styles["btn-voltar"]}>
          ← Voltar
        </button>
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p>{erro || 'Pedido não encontrado.'}</p>
        </div>
      </div>
    );
  }

  const statusTimeline = mapearStageParaTimeline(statusPedido.stage);

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
                className={`${styles["timeline-icon"]} ${status.ativo ? styles["icon-ativo"] :
                  status.concluido ? styles["icon-concluido"] :
                    styles["icon-pendente"]
                  }`}
              >
                {status.ativo && <span className={styles["letra-m"]}><Check strokeWidth={3} /></span>}
              </div>
              {index < statusTimeline.length - 1 && (
                <div className={`${styles["timeline-line"]} ${status.concluido ? styles["line-concluida"] : styles["line-pendente"]
                  }`} />
              )}
            </div>
            <span
              className={`${styles["timeline-label"]} ${status.concluido || status.ativo ? styles["label-ativo"] : styles["label-inativo"]
                }`}
            >
              {status.titulo}
            </span>
          </div>
        ))}
      </div>

      {/* Informações do Pedido */}
      <div className={styles["pedido-info"]}>
        <h4 className={styles["pedido-numero"]}>
          ID do pedido {statusPedido.payload?.orderId || statusPedido._id}
        </h4>
        <p className={styles["pedido-data"]}>
          Pedido realizado em {formatarData(statusPedido.createdAt)}
        </p>
        {statusPedido.progress !== undefined && (
          <p className={styles["pedido-progresso"]}>
            Progresso: {statusPedido.progress}%
          </p>
        )}
        <p className={styles["pedido-status"]}>
          Status atual: <strong>{statusPedido.stage}</strong>
        </p>
      </div>

      {/* Histórico de Entregas */}
      <div className={styles["historico-container"]}>
        <h3>Histórico do Pedido</h3>

        {statusPedido.history && statusPedido.history.length > 0 ? (
          [...statusPedido.history].reverse().map((item, index) => (
            <div key={index} className={styles["historico-item"]}>
              <div className={styles["historico-left"]}>
                <span className={styles["historico-data"]}>
                  {formatarData(item.startedAt)}
                </span>
                <span className={styles["historico-hora"]}>
                  {formatarHora(item.startedAt)}
                </span>
              </div>
              <div className={styles["historico-bola"]}></div>
              <div className={styles["historico-right"]}>
                <h5 className={styles["historico-mensagem"]}>
                  📦 {obterMensagemStage(item.stage)}
                </h5>
                <p className={styles["historico-detalhes"]}>
                  {obterDetalhesStage(item.stage, item.finishedAt)}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p>Nenhum histórico disponível ainda.</p>
        )}
      </div>
    </div>
  );
}

export default Rastreamento_pedidos;