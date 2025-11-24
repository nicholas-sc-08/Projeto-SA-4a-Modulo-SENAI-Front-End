"use client"

import React, { useState, useEffect } from 'react'
import styles from '@/components/opcoes_configuracoes/meu_perfil/Meu_perfil.module.css'
import { useGlobalContext } from '@/context/GlobalContext'
import api from '@/services/api'

function Meu_perfil() {
    const { usuario_logado, array_clientes, array_brechos } = useGlobalContext()

    const [dadosUsuario, setDadosUsuario] = useState(null)
    const [loading, setLoading] = useState(true)
    const [tipoUsuario, setTipoUsuario] = useState(null)

    const [editandoDadosPessoais, setEditandoDadosPessoais] = useState(false)
    const [editandoDadosBrecho, setEditandoDadosBrecho] = useState(false)
    const [editandoDadosEndereco, setEditandoDadosEndereco] = useState(false)

    const [dadosPessoais, setDadosPessoais] = useState({
        nome: '',
        nome_vendedor: '',
        data_de_nascimento: '',
        data_de_nascimento_vendedor: '',
        telefone: '',
        senha: ''
    })

    const [dadosBrecho, setDadosBrecho] = useState({
        nome_brecho: '',
        email: '',
        telefone: '',
        cnpj: '',
        horario_funcionamento: ''
    })

    const [dadosEndereco, setDadosEndereco] = useState({
        cep: '',
        bairro: '',
        logradouro: '',
        estado: '',
        cidade: '',
        numero: '',
        complemento: ''
    })

    useEffect(() => {
        if (usuario_logado && usuario_logado._id) {
            identificarEBuscarUsuario()
        }
    }, [usuario_logado, array_clientes, array_brechos])

    const identificarEBuscarUsuario = async () => {
        try {
            setLoading(true)
            const isCliente = array_clientes.some(c => c._id === usuario_logado._id)

            if (isCliente) {
                setTipoUsuario('cliente')
                await buscarDadosCliente()
            } else {
                setTipoUsuario('brecho')
                await buscarDadosBrecho()
            }
        } catch (erro) {
            console.error('Erro ao identificar usuário:', erro)
        } finally {
            setLoading(false)
        }
    }

    const buscarDadosCliente = async () => {
        try {
            const response = await api.get(`/clientes/${usuario_logado._id}`)
            const data = response.data

            setDadosUsuario(data)

            setDadosPessoais({
                nome: data.nome || '',
                data_de_nascimento: data.data_de_nascimento ? new Date(data.data_de_nascimento).toISOString().split('T')[0] : '',
                telefone: data.telefone || '',
                senha: ''
            })

            // 🔹 CARREGAR DADOS DE ENDEREÇO
            setDadosEndereco({
                cep: data.cep || '',
                bairro: data.bairro || '',
                logradouro: data.logradouro || '',
                estado: data.estado || '',
                cidade: data.cidade || '',
                numero: data.numero || '',
                complemento: data.complemento || ''
            })

        } catch (erro) {
            console.error('Erro ao buscar dados do cliente:', erro)
        }
    }

    const buscarDadosBrecho = async () => {
        try {
            const response = await api.get(`/brechos/${usuario_logado._id}`)
            const data = response.data

            setDadosUsuario(data)

            setDadosPessoais({
                nome_vendedor: data.nome_vendedor || '',
                data_de_nascimento_vendedor: data.data_de_nascimento_vendedor ? new Date(data.data_de_nascimento_vendedor).toISOString().split('T')[0] : '',
                telefone: data.telefone || '',
                senha: ''
            })

            setDadosBrecho({
                nome_brecho: data.nome_brecho || '',
                email: data.email || '',
                telefone: data.telefone || '',
                cnpj: data.cnpj || '',
                horario_funcionamento: data.horario_funcionamento || ''
            })

            // 🔹 CARREGAR DADOS DE ENDEREÇO DO BRECHÓ
            setDadosEndereco({
                cep: data.cep || '',
                bairro: data.bairro || '',
                logradouro: data.logradouro || '',
                estado: data.estado || '',
                cidade: data.cidade || '',
                numero: data.numero || '',
                complemento: data.complemento || ''
            })

        } catch (erro) {
            console.error('Erro ao buscar dados do brechó:', erro)
        }
    }

    const handleSalvarDadosPessoais = async () => {
        console.log('🔍 ANTES DE PROCESSAR:')
        console.log('dadosPessoais completo:', dadosPessoais)
        console.log('data_de_nascimento_vendedor:', dadosPessoais.data_de_nascimento_vendedor)
        console.log('Tipo:', typeof dadosPessoais.data_de_nascimento_vendedor)

        try {
            const dadosParaAtualizar = {}

            if (tipoUsuario === 'cliente') {
                dadosParaAtualizar.nome = dadosPessoais.nome
                dadosParaAtualizar.telefone = dadosPessoais.telefone

                if (dadosPessoais.data_de_nascimento && dadosPessoais.data_de_nascimento !== '') {
                    // 🔹 Converte string "YYYY-MM-DD" para Date object
                    dadosParaAtualizar.data_de_nascimento = new Date(dadosPessoais.data_de_nascimento + 'T12:00:00.000Z')
                }
            } else {
                dadosParaAtualizar.nome_vendedor = dadosPessoais.nome_vendedor
                dadosParaAtualizar.telefone = dadosPessoais.telefone

                if (dadosPessoais.data_de_nascimento_vendedor && dadosPessoais.data_de_nascimento_vendedor !== '') {
                    // 🔹 Converte string "YYYY-MM-DD" para Date object
                    dadosParaAtualizar.data_de_nascimento_vendedor = new Date(dadosPessoais.data_de_nascimento_vendedor + 'T12:00:00.000Z')
                }
            }

            // Só inclui a senha se foi preenchida
            if (dadosPessoais.senha && dadosPessoais.senha !== '') {
                dadosParaAtualizar.senha = dadosPessoais.senha
            }

            const endpoint = tipoUsuario === 'cliente'
                ? `/clientes/${usuario_logado._id}`
                : `/brechos/${usuario_logado._id}`

            console.log('📤 Endpoint:', endpoint)
            console.log('📤 Dados para atualizar (DEPOIS DA CONVERSÃO):', dadosParaAtualizar)
            console.log('📅 Tipo da data agora:', typeof dadosParaAtualizar.data_de_nascimento_vendedor)
            console.log('📅 Valor da data:', dadosParaAtualizar.data_de_nascimento_vendedor)

            const response = await api.put(endpoint, dadosParaAtualizar)

            setDadosUsuario(response.data)
            setEditandoDadosPessoais(false)
            alert('Dados pessoais atualizados com sucesso!')

            // Recarrega os dados
            if (tipoUsuario === 'cliente') {
                await buscarDadosCliente()
            } else {
                await buscarDadosBrecho()
            }

        } catch (erro) {
            console.error('❌ Erro completo:', erro)
            console.error('❌ Resposta do servidor:', erro.response?.data)
            alert(`Erro ao salvar dados pessoais: ${erro.response?.data?.message || erro.message}`)
        }
    }

    const handleSalvarDadosBrecho = async () => {
        try {
            const dadosParaAtualizar = {
                nome_brecho: dadosBrecho.nome_brecho,
                email: dadosBrecho.email,
                telefone: dadosBrecho.telefone,
                cnpj: dadosBrecho.cnpj,
                horario_funcionamento: dadosBrecho.horario_funcionamento
            }

            const response = await api.put(`/brechos/${usuario_logado._id}`, dadosParaAtualizar)

            setDadosUsuario(response.data)
            setEditandoDadosBrecho(false)
            alert('Dados do brechó atualizados com sucesso!')

        } catch (erro) {
            console.error('Erro ao salvar dados do brechó:', erro)
            alert('Erro ao salvar dados do brechó')
        }
    }

    // 🔹 NOVA FUNÇÃO PARA SALVAR ENDEREÇO
    const handleSalvarDadosEndereco = async () => {
        try {
            const dadosParaAtualizar = {
                cep: dadosEndereco.cep,
                bairro: dadosEndereco.bairro,
                logradouro: dadosEndereco.logradouro,
                estado: dadosEndereco.estado,
                cidade: dadosEndereco.cidade,
                numero: dadosEndereco.numero,
                complemento: dadosEndereco.complemento
            }

            const endpoint = tipoUsuario === 'cliente'
                ? `/clientes/${usuario_logado._id}`
                : `/brechos/${usuario_logado._id}`

            const response = await api.put(endpoint, dadosParaAtualizar)

            setDadosUsuario(response.data)
            setEditandoDadosEndereco(false)
            alert('Dados de endereço atualizados com sucesso!')

            // Recarrega os dados
            if (tipoUsuario === 'cliente') {
                await buscarDadosCliente()
            } else {
                await buscarDadosBrecho()
            }

        } catch (erro) {
            console.error('Erro ao salvar endereço:', erro)
            alert(`Erro ao salvar endereço: ${erro.response?.data?.message || erro.message}`)
        }
    }

    const formatarData = (data) => {
        if (!data) return 'Não informado'
        const dataObj = new Date(data)
        return dataObj.toLocaleDateString('pt-BR')
    }

    const formatarCPF = () => {
        return '•••.•••.•••-••'
    }

    if (loading) {
        return <div className={styles["container-alinhamento-componente"]}>Carregando...</div>
    }

    if (!dadosUsuario) {
        return <div className={styles["container-alinhamento-componente"]}>Erro ao carregar dados</div>
    }

    return (
        <div className={styles["container-alinhamento-componente"]}>

            {/* Meu perfil */}
            <div className={styles['container-meu-perfil']}>
                <h4>Meu perfil</h4>
                <div className={styles["line-meu-perfil"]}></div>

                <div className={styles["container-alinhamento-imagens-meu-perfil"]}>
                    <div className={styles["container-foto-meu-perfil"]}>
                        <div className={styles["container-imagem-tamanho"]}>
                            <img
                                src={tipoUsuario === 'cliente'
                                    ? (dadosUsuario.imagem_de_perfil || "./img/fotoPerfil.png")
                                    : (dadosUsuario.logo || "./img/fotoPerfil.png")
                                }
                                alt="Foto de perfil"
                            />
                        </div>

                        <div className={styles['container-alinhamento-texto-meu-perfil']}>
                            <h4>{tipoUsuario === 'cliente' ? 'Foto de perfil' : 'Logo do brechó'}</h4>

                            <div className={styles["alinhamento-button-excluir-meu-perfil"]}>
                                <button><img src="./img/icons/lixeira.svg" alt="" /> Excluir</button>
                            </div>
                        </div>
                    </div>

                    <div className={styles["container-foto-meu-perfil"]}>
                        <div className={styles["container-imagem-tamanho"]}>
                            <img src="./img/fotoPerfil.png" alt="Layout" />
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

                    <button onClick={() => setEditandoDadosPessoais(!editandoDadosPessoais)}>
                        <img src="./img/icons/edit.svg" alt="Editar" />
                    </button>
                </div>

                <div className={styles["line-meu-perfil"]}></div>

                <div className={styles["container-informacoes-edicao"]}>
                    {editandoDadosPessoais ? (
                        <>
                            <input
                                type="text"
                                value={tipoUsuario === 'cliente' ? dadosPessoais.nome : dadosPessoais.nome_vendedor}
                                onChange={(e) => setDadosPessoais({
                                    ...dadosPessoais,
                                    [tipoUsuario === 'cliente' ? 'nome' : 'nome_vendedor']: e.target.value
                                })}
                                placeholder={tipoUsuario === 'cliente' ? 'Nome' : 'Nome do vendedor'}
                            />
                            <input
                                type="date"
                                value={tipoUsuario === 'cliente' ? dadosPessoais.data_de_nascimento : dadosPessoais.data_de_nascimento_vendedor}
                                onChange={(e) => setDadosPessoais({
                                    ...dadosPessoais,
                                    [tipoUsuario === 'cliente' ? 'data_de_nascimento' : 'data_de_nascimento_vendedor']: e.target.value
                                })}
                            />
                            {tipoUsuario === 'cliente' && <p>{formatarCPF()}</p>}
                            <input
                                type="tel"
                                value={dadosPessoais.telefone}
                                onChange={(e) => setDadosPessoais({ ...dadosPessoais, telefone: e.target.value })}
                                placeholder="Telefone"
                            />
                            <input
                                type="password"
                                value={dadosPessoais.senha}
                                onChange={(e) => setDadosPessoais({ ...dadosPessoais, senha: e.target.value })}
                                placeholder="Nova senha (deixe em branco para manter)"
                            />
                        </>
                    ) : (
                        <>
                            <p><strong>{tipoUsuario === 'cliente' ? 'Nome' : 'Nome do vendedor'}:</strong> {tipoUsuario === 'cliente' ? dadosUsuario.nome : dadosUsuario.nome_vendedor}</p>
                            <p><strong>Data de nascimento:</strong> {formatarData(tipoUsuario === 'cliente' ? dadosUsuario.data_de_nascimento : dadosUsuario.data_de_nascimento_vendedor)}</p>
                            {tipoUsuario === 'cliente' && <p><strong>CPF:</strong> {formatarCPF()}</p>}
                            <p><strong>Telefone:</strong> {dadosUsuario.telefone || 'Não informado'}</p>
                            <p><strong>Senha:</strong> ••••••••</p>
                        </>
                    )}
                </div>

                {editandoDadosPessoais && (
                    <div className={styles["alinhamento-button-salvar-alteracoes-meu-perfil"]}>
                        <button onClick={handleSalvarDadosPessoais}>Salvar alterações</button>
                    </div>
                )}
            </div>

            {/* Dados do brechó */}
            {tipoUsuario === 'brecho' && (
                <div className={styles['container-secoes-dados']}>
                    <div className={styles["container-alinhamento-titulo"]}>
                        <h4>Dados do brechó</h4>

                        <button onClick={() => setEditandoDadosBrecho(!editandoDadosBrecho)}>
                            <img src="./img/icons/edit.svg" alt="Editar" />
                        </button>
                    </div>

                    <div className={styles["line-meu-perfil"]}></div>

                    <div className={styles["container-informacoes-edicao"]}>
                        {editandoDadosBrecho ? (
                            <>
                                <input
                                    type="text"
                                    value={dadosBrecho.nome_brecho}
                                    onChange={(e) => setDadosBrecho({ ...dadosBrecho, nome_brecho: e.target.value })}
                                    placeholder="Nome do brechó"
                                />
                                <input
                                    type="email"
                                    value={dadosBrecho.email}
                                    onChange={(e) => setDadosBrecho({ ...dadosBrecho, email: e.target.value })}
                                    placeholder="Email"
                                />
                                <input
                                    type="tel"
                                    value={dadosBrecho.telefone}
                                    onChange={(e) => setDadosBrecho({ ...dadosBrecho, telefone: e.target.value })}
                                    placeholder="Telefone"
                                />
                                <input
                                    type="text"
                                    value={dadosBrecho.cnpj}
                                    onChange={(e) => setDadosBrecho({ ...dadosBrecho, cnpj: e.target.value })}
                                    placeholder="CNPJ"
                                />
                                <input
                                    type="text"
                                    value={dadosBrecho.horario_funcionamento}
                                    onChange={(e) => setDadosBrecho({ ...dadosBrecho, horario_funcionamento: e.target.value })}
                                    placeholder="Horário de funcionamento"
                                />
                            </>
                        ) : (
                            <>
                                <p><strong>Nome do brechó:</strong> {dadosUsuario.nome_brecho || 'Não informado'}</p>
                                <p><strong>Email:</strong> {dadosUsuario.email}</p>
                                <p><strong>Telefone:</strong> {dadosUsuario.telefone || 'Não informado'}</p>
                                <p><strong>CNPJ:</strong> {dadosUsuario.cnpj || 'Não informado'}</p>
                                <p><strong>Horário de funcionamento:</strong> {dadosUsuario.horario_funcionamento || 'Não informado'}</p>
                            </>
                        )}
                    </div>

                    {editandoDadosBrecho && (
                        <div className={styles["alinhamento-button-salvar-alteracoes-meu-perfil"]}>
                            <button onClick={handleSalvarDadosBrecho}>Salvar alterações</button>
                        </div>
                    )}
                </div>
            )}

            {/* Dados de endereço */}
            <div className={styles['container-secoes-dados']}>
                <div className={styles["container-alinhamento-titulo"]}>
                    <h4>Dados de endereço</h4>

                    <button onClick={() => setEditandoDadosEndereco(!editandoDadosEndereco)}>
                        <img src="./img/icons/edit.svg" alt="Editar" />
                    </button>
                </div>

                <div className={styles["line-meu-perfil"]}></div>

                <div className={styles["container-informacoes-edicao"]}>
                    {editandoDadosEndereco ? (
                        <>
                            <input
                                type="text"
                                value={dadosEndereco.cep}
                                onChange={(e) => setDadosEndereco({ ...dadosEndereco, cep: e.target.value })}
                                placeholder="CEP"
                            />
                            <input
                                type="text"
                                value={dadosEndereco.bairro}
                                onChange={(e) => setDadosEndereco({ ...dadosEndereco, bairro: e.target.value })}
                                placeholder="Bairro"
                            />
                            <input
                                type="text"
                                value={dadosEndereco.logradouro}
                                onChange={(e) => setDadosEndereco({ ...dadosEndereco, logradouro: e.target.value })}
                                placeholder="Logradouro"
                            />
                            <input
                                type="text"
                                value={dadosEndereco.estado}
                                onChange={(e) => setDadosEndereco({ ...dadosEndereco, estado: e.target.value })}
                                placeholder="Estado"
                            />
                            <input
                                type="text"
                                value={dadosEndereco.cidade}
                                onChange={(e) => setDadosEndereco({ ...dadosEndereco, cidade: e.target.value })}
                                placeholder="Cidade"
                            />
                            <input
                                type="text"
                                value={dadosEndereco.numero}
                                onChange={(e) => setDadosEndereco({ ...dadosEndereco, numero: e.target.value })}
                                placeholder="Número"
                            />
                            <input
                                type="text"
                                value={dadosEndereco.complemento}
                                onChange={(e) => setDadosEndereco({ ...dadosEndereco, complemento: e.target.value })}
                                placeholder="Complemento"
                            />
                        </>
                    ) : (
                        <>
                            <p><strong>CEP:</strong> {dadosUsuario.cep || 'Não informado'}</p>
                            <p><strong>Bairro:</strong> {dadosUsuario.bairro || 'Não informado'}</p>
                            <p><strong>Logradouro:</strong> {dadosUsuario.logradouro || 'Não informado'}</p>
                            <p><strong>Estado:</strong> {dadosUsuario.estado || 'Não informado'}</p>
                            <p><strong>Cidade:</strong> {dadosUsuario.cidade || 'Não informado'}</p>
                            <p><strong>Número:</strong> {dadosUsuario.numero || 'Não informado'}</p>
                            <p><strong>Complemento:</strong> {dadosUsuario.complemento || 'Não informado'}</p>
                        </>
                    )}
                </div>

                {editandoDadosEndereco && (
                    <div className={styles["alinhamento-button-salvar-alteracoes-meu-perfil"]}>
                        {/* 🔹 ADICIONADO onClick */}
                        <button onClick={handleSalvarDadosEndereco}>Salvar alterações</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Meu_perfil