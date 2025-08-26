import { useContext, useEffect, useState } from "react";
import { GlobalContext } from '../../../contexts/GlobalContext.jsx';
import api from '../../../services/api.js';
import "./Informacoes.css";

function Informacoes() {

  const { array_clientes, set_array_clientes } = useContext(GlobalContext);
  const { array_brechos, set_array_brechos } = useContext(GlobalContext);
  const { array_chat, set_array_chat } = useContext(GlobalContext);
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
  const [cliente_brecho, set_cliente_brecho] = useState(null);
  const [barra_de_pesquisa, set_barra_de_pesquisa] = useState(``);
  const [conversas_frequentes, set_conversas_frequentes] = useState([]);
  const [conversas_filtradas, set_conversas_filtradas] = useState([]);

  useEffect(() => {

    buscar_clientes();
    buscar_brechos();
    buscar_conversas();
  }, []);

  useEffect(() => {

    const cliente = array_clientes.find(c => c._id == usuario_logado._id);
    cliente ? set_cliente_brecho(`cliente`) : set_cliente_brecho(`brecho`);
  }, []);

  useEffect(() => {

    if (cliente_brecho == `cliente`) {

      const filtrar_contatos = usuario_logado.conversas.filter(contato => contato.nome_brecho.toUpperCase().includes(barra_de_pesquisa.toUpperCase()));
      set_conversas_filtradas(filtrar_contatos);
    }

  }, [barra_de_pesquisa]);

  async function buscar_clientes() {

    try {

      const clientes = await api.get(`/clientes`);
      set_array_clientes(clientes.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function buscar_brechos() {

    try {

      const clientes = await api.get(`/clientes`);
      set_array_clientes(clientes.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function buscar_conversas() {

    try {

      const clientes = await api.get(`/clientes`);
      set_array_clientes(clientes.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  function calcular_conversas(){

    if(barra_de_pesquisa != ``){

      return conversas_filtradas.length;
    
    } else {

      return usuario_logado.conversas.length;
    };
  };

  return (
    <div className="container_chat_informacoes">
      <header>
        <h2 className="titulo_conversas_chat">Conversas</h2>
      </header>
      <search className="barra_de_pesquisa">
        <img src="./img/icons/Pesquisa.svg" alt="" />
        <input type="text" placeholder="Procurar por Conversa" value={barra_de_pesquisa} onChange={e => set_barra_de_pesquisa(e.target.value)} />
      </search>
      <section className="container_conversas_frequentes">
        {usuario_logado.conversas ? [usuario_logado.conversas[0], usuario_logado.conversas[1], usuario_logado.conversas[2]].map((conversa, i) => (
          <div key={i} className="container_conversa_frequente">
            <img src={cliente_brecho == `cliente` ? conversa.logo : conversa.imagem_de_perfil} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" />
            <h5>{cliente_brecho == `cliente` ? conversa.nome_brecho : conversa.nome}</h5>
          </div>
        )) : ``}
      </section>
      <div className="sub_titulo_conversas_chat">
        {usuario_logado.conversas ?
          <h4>Recentes({calcular_conversas()})</h4>
          : ``
        }
      </div>

      <section className="container_contatos_chat">
        {usuario_logado.conversas.length > 0 && barra_de_pesquisa == `` ? usuario_logado.conversas.map((contato, i) => (
          <div key={i} className="container_contato_chat">
            <img src={cliente_brecho == `cliente` ? contato.logo : contato.imagem_de_perfil} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" />
            <aside className="info_principal_contatos_chat">
              <h5>{cliente_brecho == `cliente` ? contato.nome_brecho : contato.nome}</h5>
              <p>testeee</p>
            </aside>
            <aside className="info_horario_contatos_chat">
              <h5>12:06</h5>
              <span>3</span>
            </aside>
          </div>
        )) : ``}
        {conversas_filtradas.length > 0 ? conversas_filtradas.map((contato, i) => (
          <div key={i} className="container_contato_chat">
            <img src={cliente_brecho == `cliente` ? contato.logo : contato.imagem_de_perfil} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" />
            <aside className="info_principal_contatos_chat">
              <h5>{cliente_brecho == `cliente` ? contato.nome_brecho : contato.nome}</h5>
              <p>testeee</p>
            </aside>
            <aside className="info_horario_contatos_chat">
              <h5>12:06</h5>
              <span>3</span>
            </aside>
          </div>
        )) : ``}
        {conversas_filtradas.length == 0 && barra_de_pesquisa != `` ?
          <div className="container_nenhuma_conversa_encontrada_chat">
            <img src="./img/icons/icone_chat_nenhuma_conversa.svg" alt="" />
            <p>Tentamos procurar por conversas mas parece que não conseguimos encontrar nenhuma conversa!</p>
          </div> : ``}
      </section>
    </div>
  )
}

export default Informacoes
