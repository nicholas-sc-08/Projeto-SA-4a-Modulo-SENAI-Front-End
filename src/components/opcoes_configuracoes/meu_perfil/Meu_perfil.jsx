"use client"

import React, { useState, useEffect } from 'react'
import styles from '@/components/opcoes_configuracoes/meu_perfil/Meu_perfil.module.css'
import { useGlobalContext } from '@/context/GlobalContext'
import api from '@/services/api'
import Toast, { useToast } from '@/components/Toast/Toast'

function Meu_perfil() {
    const { usuario_logado, array_clientes, array_brechos } = useGlobalContext()
    const { toasts, showToast, removeToast } = useToast()

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
    const [enderecoId, setEnderecoId] = useState(null)

    const buscarEndereco = async (fk_id_cliente, fk_id_brecho) => {
        try {
            let response
            const token = JSON.parse(localStorage.getItem("user"));
            if (fk_id_cliente) {
                response = await api.get(`/enderecos`, { headers: { Authorization: `Bearer ${token}` } }, {
                    params: { fk_id_cliente }
                })
            } else if (fk_id_brecho) {
                response = await api.get(`/enderecos`, { headers: { Authorization: `Bearer ${token}` } }, {
                    params: { fk_id_brecho }
                })
            }

            if (response && response.data) {
                let endereco = null

                // Se for array, filtra e pega o primeiro que corresponde
                if (Array.isArray(response.data)) {
                    if (fk_id_cliente) {
                        endereco = response.data.find(e => e.fk_id_cliente === fk_id_cliente)
                    } else if (fk_id_brecho) {
                        endereco = response.data.find(e => e.fk_id_brecho === fk_id_brecho)
                    }
                }
                // Se for um objeto direto
                else if (response.data._id) {
                    endereco = response.data
                }

                if (endereco) {
                    console.log('✅ Endereço encontrado:', endereco)
                    setEnderecoId(endereco._id)
                    setDadosEndereco({
                        cep: endereco.cep || '',
                        bairro: endereco.bairro || '',
                        logradouro: endereco.logradouro || '',
                        estado: endereco.estado || '',
                        cidade: endereco.cidade || '',
                        numero: endereco.numero || '',
                        complemento: endereco.complemento || ''
                    })
                } else {
                    console.log('❌ Nenhum endereço encontrado para este usuário')
                }
            }
        } catch (erro) {
            console.error('❌ Erro ao buscar endereço:', erro)
        }
    }

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
            showToast('Erro ao carregar dados do usuário', 'error')
        } finally {
            setLoading(false)
        }
    }

    const buscarDadosCliente = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("user"));
            const response = await api.get(`/clientes/${usuario_logado._id}`, { headers: { Authorization: `Bearer ${token}` } })
            const data = response.data

            setDadosUsuario(data)

            // Formatar data para o input type="date" (YYYY-MM-DD)
            let dataFormatada = ''
            if (data.data_de_nascimento) {
                const dataObj = new Date(data.data_de_nascimento)
                dataFormatada = dataObj.toISOString().split('T')[0]
            }

            setDadosPessoais({
                nome: data.nome || '',
                data_de_nascimento: dataFormatada,
                telefone: data.telefone || '',
                senha: ''
            })

            // Buscar endereço do cliente
            await buscarEndereco(usuario_logado._id, null)

        } catch (erro) {
            console.error('Erro ao buscar dados do cliente:', erro)
            showToast('Erro ao buscar dados do cliente', 'error')
        }
    }

    const buscarDadosBrecho = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("user"));
            const response = await api.get(`/brechos/${usuario_logado._id}`, { headers: { Authorization: `Bearer ${token}` } })
            const data = response.data

            setDadosUsuario(data)

            // Formatar data para o input type="date" (YYYY-MM-DD)
            let dataFormatada = ''
            if (data.data_de_nascimento_vendedor) {
                const dataObj = new Date(data.data_de_nascimento_vendedor)
                dataFormatada = dataObj.toISOString().split('T')[0]
            }

            setDadosPessoais({
                nome_vendedor: data.nome_vendedor || '',
                data_de_nascimento_vendedor: dataFormatada,
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

            // Buscar endereço do brechó
            await buscarEndereco(null, usuario_logado._id)

        } catch (erro) {
            console.error('Erro ao buscar dados do brechó:', erro)
            showToast('Erro ao buscar dados do brechó', 'error')
        }
    }

    const handleSalvarDadosPessoais = async () => {
        try {
            const dadosParaAtualizar = {}

            if (tipoUsuario === 'cliente') {
                // Validação: só envia se tiver valor
                if (dadosPessoais.nome && dadosPessoais.nome.trim() !== '') {
                    dadosParaAtualizar.nome = dadosPessoais.nome.trim()
                }
                if (dadosPessoais.data_de_nascimento) {
                    dadosParaAtualizar.data_de_nascimento = dadosPessoais.data_de_nascimento
                }
                if (dadosPessoais.telefone && dadosPessoais.telefone.trim() !== '') {
                    dadosParaAtualizar.telefone = dadosPessoais.telefone.trim()
                }
                if (dadosPessoais.senha && dadosPessoais.senha.trim() !== '') {
                    dadosParaAtualizar.senha = dadosPessoais.senha
                }
            } else {
                // Para brechó - só envia campos que têm valor
                if (dadosPessoais.nome_vendedor && dadosPessoais.nome_vendedor.trim() !== '') {
                    dadosParaAtualizar.nome_vendedor = dadosPessoais.nome_vendedor.trim()
                }
                if (dadosPessoais.data_de_nascimento_vendedor) {
                    dadosParaAtualizar.data_de_nascimento_vendedor =
                        new Date(dadosPessoais.data_de_nascimento_vendedor)
                }

                if (dadosPessoais.telefone && dadosPessoais.telefone.trim() !== '') {
                    dadosParaAtualizar.telefone = dadosPessoais.telefone.trim()
                }
                if (dadosPessoais.senha && dadosPessoais.senha.trim() !== '') {
                    dadosParaAtualizar.senha = dadosPessoais.senha
                }
            }

            console.log('📤 Tipo de usuário:', tipoUsuario)
            console.log('📤 Enviando dados:', dadosParaAtualizar)

            const endpoint = tipoUsuario === 'cliente'
                ? `/clientes/${usuario_logado._id}`
                : `/brechos/${usuario_logado._id}`

            console.log('📤 Endpoint:', endpoint)

            const token = JSON.parse(localStorage.getItem("user"));
            const response = await api.put(endpoint, dadosParaAtualizar, { headers: { Authorization: `Bearer ${token}` } })

            console.log('✅ Resposta do servidor:', response.data)

            setDadosUsuario(response.data)
            setEditandoDadosPessoais(false)
            showToast('Dados pessoais atualizados com sucesso!', 'success')

            if (tipoUsuario === 'cliente') {
                await buscarDadosCliente()
            } else {
                await buscarDadosBrecho()
            }

        } catch (erro) {
            console.error('❌ Erro completo:', erro)
            console.error('❌ Resposta do erro:', erro.response?.data)
            console.error('❌ Status:', erro.response?.status)
            showToast(`Erro ao salvar dados pessoais: ${erro.response?.data?.message || 'Tente novamente'}`, 'error')
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

            const token = JSON.parse(localStorage.getItem("user"));
            const response = await api.put(`/brechos/${usuario_logado._id}`, dadosParaAtualizar, { headers: { Authorization: `Bearer ${token}` } });

            setDadosUsuario(response.data)
            setEditandoDadosBrecho(false)
            showToast('Dados do brechó atualizados com sucesso!', 'success')

            await buscarDadosBrecho()

        } catch (erro) {
            console.error('Erro ao salvar dados do brechó:', erro)
            showToast('Erro ao salvar dados do brechó', 'error')
        }
    }

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

            if (tipoUsuario === 'cliente') {
                dadosParaAtualizar.fk_id_cliente = usuario_logado._id
            } else {
                dadosParaAtualizar.fk_id_brecho = usuario_logado._id
            }

            let response
            const token = JSON.parse(localStorage.getItem("user"));

            // Se já existe endereço, faz PUT. Se não, faz POST
            if (enderecoId) {
                response = await api.put(`/enderecos/${enderecoId}`, dadosParaAtualizar, { headers: { Authorization: `Bearer ${token}` } })
            } else {
                response = await api.post(`/enderecos`, dadosParaAtualizar, { headers: { Authorization: `Bearer ${token}` } })
                if (response.data._id) {
                    setEnderecoId(response.data._id)
                }
            }

            setEditandoDadosEndereco(false)
            showToast('Dados de endereço atualizados com sucesso!', 'success')

        } catch (erro) {
            console.error('Erro ao salvar endereço:', erro)
            showToast(`Erro ao salvar endereço: ${erro.response?.data?.message || 'Tente novamente'}`, 'error')
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
            {/* Toast Container */}
            <Toast toasts={toasts} removeToast={removeToast} />

            {/* Meu perfil */}
            <div className={styles['container-meu-perfil']}>
                <div className={styles["container-alinhamento-titulo"]}>
                    <h4>Dados pessoais</h4>

                    <button onClick={() => setEditandoDadosPessoais(!editandoDadosPessoais)}>
                        <img src="./img/icons/edit.svg" alt="Editar" />
                    </button>
                </div>

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

                            <div className={styles['container-alinhamento-texto-meu-perfil']}>
                                <h4>{tipoUsuario === 'cliente' ? 'Foto de perfil' : 'Logo do brechó'}</h4>

                                <div className={styles["alinhamento-button-excluir-meu-perfil"]}>
                                    <button><img src="./img/icons/lixeira.svg" alt="" /> Excluir</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Dados pessoais */}
            <div className={styles['container-secoes-dados']}>
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
                            <p><strong>CEP:</strong> {dadosEndereco.cep || 'Não informado'}</p>
                            <p><strong>Bairro:</strong> {dadosEndereco.bairro || 'Não informado'}</p>
                            <p><strong>Logradouro:</strong> {dadosEndereco.logradouro || 'Não informado'}</p>
                            <p><strong>Estado:</strong> {dadosEndereco.estado || 'Não informado'}</p>
                            <p><strong>Cidade:</strong> {dadosEndereco.cidade || 'Não informado'}</p>
                            <p><strong>Número:</strong> {dadosEndereco.numero || 'Não informado'}</p>
                            <p><strong>Complemento:</strong> {dadosEndereco.complemento || 'Não informado'}</p>
                        </>
                    )}
                </div>

                {editandoDadosEndereco && (
                    <div className={styles["alinhamento-button-salvar-alteracoes-meu-perfil"]}>
                        <button onClick={handleSalvarDadosEndereco}>Salvar alterações</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Meu_perfil