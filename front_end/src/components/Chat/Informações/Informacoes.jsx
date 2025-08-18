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

  async function buscar_informacoes_contato(param) {

    switch (param) {

      case param == `imagem` && cliente_brecho == `cliente`:
        return usuario_logado.conversas.logo;

      case param == `imagem` && cliente_brecho == `brecho`:
        return usuario_logado.conversas.imagem_de_perfil;
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
          <div key={i} className="container_contato_frequente">
            <img src={buscar_informacoes_contato(`imagem`)} alt="" />
          </div>
        )) : ``}
      </section>
      {usuario_logado.conversas ?
        <h4>Recentes({usuario_logado.conversas.length})</h4>
        : ``
      }
      {usuario_logado.conversas ? usuario_logado.conversas.map((contato, i) => (
        <div key={i}>

        </div>
      )) : ``}
    </div>
  )
}

export default Informacoes
