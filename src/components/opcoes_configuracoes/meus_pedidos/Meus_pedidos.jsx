import React, { useState } from 'react'
import styles from '@/components/opcoes_configuracoes/meus_pedidos/Meus_pedidos.module.css'
import Rastreamento_pedidos from '../rastreamento_pedidos/Rastreamento_pedidos';

function Meus_pedidos() {
    const [pedidoExpandido, setPedidoExpandido] = useState(null);
    const [mostrarRastreamento, setMostrarRastreamento] = useState(false);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

    // Dados de exemplo - depois você pode buscar de uma API
    const pedidos = [
        {
            id: 12345,
            total: 'R$ 10,00',
            produtos: [
                {
                    nome: 'Ecobag cor areia alça verde',
                    descricao: 'Logo verde no meio',
                    quantidade: 1,
                    imagem: '📦'
                },
                {
                    nome: 'Ecobag cor areia alça verde',
                    descricao: 'Logo verde no meio',
                    quantidade: 1,
                    imagem: '📦'
                }
            ]
        },
        {
            id: 98754,
            total: 'R$ 25,00',
            produtos: [
                {
                    nome: 'Produto exemplo',
                    descricao: 'Descrição do produto',
                    quantidade: 2,
                    imagem: '📦'
                }
            ]
        }
    ];

    const togglePedido = (pedidoId) => {
        setPedidoExpandido(pedidoExpandido === pedidoId ? null : pedidoId);
    };

    const handleVerDetalhes = (e, pedidoId) => {
        e.stopPropagation();
        setPedidoSelecionado(pedidoId);
        setMostrarRastreamento(true);
    };

    // Se deve mostrar rastreamento, renderiza o componente
    if (mostrarRastreamento) {
        return <Rastreamento_pedidos pedidoId={pedidoSelecionado} onVoltar={() => setMostrarRastreamento(false)} />;
    }

    return (
        <div className={styles["container-alinhamento-componente"]}>

            {/* Meus pedidos */}
            <div className={styles['container-meus-pedidos']}>
                <h4>Meus Pedidos</h4>
                <div className={styles["line-meus-pedidos"]}></div>
            </div>

            <div className={styles["container-alinhamento-pedidos"]}>
                {pedidos.map((pedido) => (
                    <div
                        key={pedido.id}
                        className={`${styles["container-pedidos"]} ${pedidoExpandido === pedido.id ? styles["expandido"] : ''}`}
                    >

                        {/* Header do pedido - clicável */}
                        <div
                            className={styles["pedido-header"]}
                            onClick={() => togglePedido(pedido.id)}
                        >
                            <div className={styles["pedido-info"]}>
                                <span className={styles["pedido-numero"]}>
                                    Pedido Nº {pedido.id}
                                </span>
                                <span className={styles["pedido-total"]}>
                                    Total: {pedido.total}
                                </span>
                            </div>
                            <button
                                className={styles["btn-detalhes"]}
                                onClick={(e) => handleVerDetalhes(e, pedido.id)}
                            >
                                Ver detalhes
                            </button>
                        </div>

                        {/* Produtos - só aparece quando expandido */}
                        {pedidoExpandido === pedido.id && (
                            <div className={styles["pedido-produtos"]}>
                                {pedido.produtos.map((produto, index) => (
                                    <div key={index} className={styles["produto-item"]}>
                                        <div className={styles["produto-imagem"]}>
                                            {produto.imagem}
                                        </div>
                                        <div className={styles["produto-info"]}>
                                            <h5>{produto.nome}</h5>
                                            <p>{produto.descricao}</p>
                                            <p>R$ 5.00</p>
                                        </div>
                                        <span className={styles["produto-quantidade"]}>
                                            {produto.quantidade}un
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Meus_pedidos