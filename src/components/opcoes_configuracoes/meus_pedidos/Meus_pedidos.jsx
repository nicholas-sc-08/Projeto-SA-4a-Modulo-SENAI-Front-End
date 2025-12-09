import React, { useState, useEffect } from 'react'
import styles from '@/components/opcoes_configuracoes/meus_pedidos/Meus_pedidos.module.css'
import Rastreamento_pedidos from '../rastreamento_pedidos/Rastreamento_pedidos';
import { useGlobalContext } from '@/context/GlobalContext';
import { buscar_sacolas_brechos, imagem_produto_sacola_brecho, material_produto_sacola_brecho, nome_produto } from '@/services/sacolas_brechos/sacolas_brecho';

function Meus_pedidos() {
    const [pedidoExpandido, setPedidoExpandido] = useState(null);
    const [mostrarRastreamento, setMostrarRastreamento] = useState(false);
    const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);

    const { usuario_logado } = useGlobalContext();

    useEffect(() => {
        async function carregarPedidos() {
            try {
                const sacolas = await buscar_sacolas_brechos();

                // Filtrar sacolas do brechó logado
                const pedidos_brecho = sacolas.filter(sacola => sacola.id_brecho === usuario_logado._id);

                setPedidos(pedidos_brecho);
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
                setPedidos([]);
                setLoading(false);
            }
        }

        if (usuario_logado?._id) {
            carregarPedidos();
        }
    }, [usuario_logado]);

    const togglePedido = (pedidoId) => {
        setPedidoExpandido(prev => prev === pedidoId ? null : pedidoId);
    };

    const handleVerDetalhes = (e, pedidoId) => {
        e.stopPropagation();
        setPedidoSelecionado(pedidoId);
        setMostrarRastreamento(true);
    };

    if (loading) {
        return <div>Carregando pedidos...</div>;
    }

    if (mostrarRastreamento) {
        return (
            <Rastreamento_pedidos
                pedidoId={pedidoSelecionado}
                onVoltar={() => setMostrarRastreamento(false)}
            />
        );
    }

    return (
        <div className={styles["container-alinhamento-componente"]}>

            <div className={styles['container-meus-pedidos']}>
                <h4>Meus Pedidos</h4>
                <div className={styles["line-meus-pedidos"]}></div>
            </div>

            <div className={styles["container-alinhamento-pedidos"]}>

                {pedidos.length === 0 && (
                    <p>Nenhum pedido encontrado.</p>
                )}

                {pedidos.map((pedido) => (
                    <div
                        key={pedido._id}
                        className={`${styles["container-pedidos"]} ${pedidoExpandido === pedido._id ? styles["expandido"] : ''}`}
                    >
                        {/* HEADER DO PEDIDO */}
                        <div
                            className={styles["pedido-header"]}
                            onClick={() => togglePedido(pedido._id)}
                        >
                            {/* IMAGEM DO PRODUTO */}
                            <div className={styles["pedido-imagem"]}>
                                <img
                                    src={imagem_produto_sacola_brecho(
                                        pedido.tipo,
                                        pedido.padrao,
                                        pedido.cor,
                                        pedido.cor_corpo,
                                        pedido.cor_alca
                                    )}
                                    alt={nome_produto(pedido.tipo)}
                                />
                            </div>

                            <div className={styles["pedido-info"]}>
                                <span className={styles["pedido-numero"]}>
                                    ID do pedido {pedido._id}
                                </span>

                                <span className={styles["pedido-nome"]}>
                                    {nome_produto(pedido.tipo)}
                                </span>

                                <span className={styles["pedido-total"]}>
                                    Quantidade: {pedido.quantidade}
                                </span>

                                <span className={styles["pedido-valor"]}>
                                    R$ {pedido.valor.toFixed(2)}
                                </span>
                            </div>

                            <button
                                className={styles["btn-detalhes"]}
                                onClick={(e) => handleVerDetalhes(e, pedido._id)}
                            >
                                Ver detalhes
                            </button>
                        </div>

                        {/* EXPANSÃO COM O PEDIDO */}
                        {pedidoExpandido === pedido._id && (
                            <div className={styles["pedido-produtos"]}>

                                <p><strong>Tipo:</strong> {nome_produto(pedido.tipo)}</p>
                                <p><strong>Material:</strong> {material_produto_sacola_brecho(pedido.material)}</p>
                                <p><strong>Tamanho:</strong> {pedido.tamanho}</p>
                                <p><strong>Quantidade:</strong> {pedido.quantidade}</p>
                                <p><strong>Cor do Corpo:</strong> {pedido.cor_corpo}</p>
                                <p><strong>Cor da Alça:</strong> {pedido.cor_alca}</p>
                                <p><strong>Valor:</strong> R$ {pedido.valor.toFixed(2)}</p>

                            </div>
                        )}

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Meus_pedidos;