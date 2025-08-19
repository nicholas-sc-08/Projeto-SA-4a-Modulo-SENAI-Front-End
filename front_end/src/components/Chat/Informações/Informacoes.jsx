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
  const [barra_de_pesquisa, set_barra_de_pesquisa] = useState(null);
  const [conversas_frequentes, set_conversas_frequentes] = useState([]);

  useEffect(() => {

    buscar_clientes();
    buscar_brechos();
    buscar_conversas();
  }, []);

  useEffect(() => {

    const cliente = array_clientes.find(c => c._id == usuario_logado._id);
    cliente ? set_cliente_brecho(`cliente`) : set_cliente_brecho(`brecho`);
  }, []);

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

  function ultima_mensagem(param) {

    for (let i = array_chat.length - 1; i > 0; i--) {

      if (array_chat[i].id_dono_mensagem == param && usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem) {

        return array_chat[i].mensagem;
      };

      if (array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == param) {

        return array_chat[i].mensagem;
      };

      return ``;
    };
  };

  function hora_ultima_mensagem(param) {

    for (let i = array_chat.length - 1; i > 0; i--) {

      if (array_chat[i].id_dono_mensagem == param && usuario_logado._id == array_chat[i].id_quem_recebeu_mensagem) {

        return array_chat[i].hora;
      };

      if (array_chat[i].id_dono_mensagem == usuario_logado._id && array_chat[i].id_quem_recebeu_mensagem == param) {

        return array_chat[i].hora;
      };

      return ``;
    };
  };

  return (
    <div className="container_chat_informacoes">
      <header>
        <h2 className="titulo_conversas_chat">Conversas</h2>
      </header>
      <search className="barra_de_pesquisa">
        <img src="./img/icons/Pesquisa.svg" alt="" />
        <input type="text" placeholder="Procurar por Conversa" />
      </search>
      <section className="container_conversas_frequentes">
        {usuario_logado.conversas ? usuario_logado.conversas.map((conversa, i) => (
          <div>

          </div>
        )) : ``}
      </section>
      {usuario_logado.conversas ?
        <h4>Recentes({usuario_logado.conversas.length})</h4>
        : ``
      }

      <section className="container_contatos_chat">
        {usuario_logado.conversas ? usuario_logado.conversas.map((contato, i) => (
          <div key={i} className="container_contato_chat">
            <img style={{ width: `100px` }} src={cliente_brecho == `cliente` ? contato.logo : contato.imagem_de_perfil} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="" />
            <aside>
              <h5>{cliente_brecho == `cliente` ? contato.nome_brecho : contato.nome}</h5>
              <span>{hora_ultima_mensagem(contato._id)}</span>
            </aside>
            <span>{ultima_mensagem(contato._id)}</span>
          </div>
        )) : ``}
      </section>
    </div>
  )
}

export default Informacoes
