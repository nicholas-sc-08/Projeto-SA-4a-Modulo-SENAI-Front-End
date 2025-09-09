import { useState, useContext, useEffect } from "react";
import { GlobalContext } from '../../../contexts/GlobalContext.jsx';
import { motion, AnimatePresence } from "framer-motion";
import './Conversa.css';
import api from "../../../services/api.js";

function Conversa() {

  const { conversa_selecionada, set_conversa_selecionada } = useContext(GlobalContext);
  const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
  const { grupo_conversa, set_grupo_conversa } = useContext(GlobalContext);
  const { chat_pagina_atual, set_chat_pagina_atual } = useContext(GlobalContext);
  const { array_chat, set_array_chat } = useContext(GlobalContext);
  const [inpt_mensagem, set_inpt_mensagem] = useState(``);
  const [conversa_atual, set_conversa_atual] = useState([]);

  useEffect(() => {

    buscar_chat();

    const mensagens_filtradas = array_chat.filter(mensagem => {

      return mensagem.id_dono_mensagem == usuario_logado._id && mensagem.id_quem_recebeu_mensagem == conversa_selecionada._id || mensagem.id_dono_mensagem == conversa_selecionada._id && mensagem.id_quem_recebeu_mensagem == usuario_logado._id
    });

    set_conversa_atual(mensagens_filtradas);

  }, []);

  useEffect(() => {

    console.log(conversa_atual);

  }, [conversa_atual]);

  async function buscar_chat() {

    try {

      const mensagens = await api.get(`/chats`);
      set_array_chat(mensagens.data);

    } catch (erro) {

      console.error(erro);
    };
  };

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="container_chat_conversa">
        {conversa_selecionada ? <header className="container_header_chat_conversa">
          <div className="container_info_contato_conversando">
            <img src={conversa_selecionada.imagem_de_perfil ? conversa_selecionada.imagem_de_perfil : conversa_selecionada.logo} alt="" />
            <h2>{conversa_selecionada.nome ? conversa_selecionada.nome : conversa_selecionada.nome_brecho}</h2>
          </div>
          <div className="container_opcoes_conversa">
            <button><img src="./img/icons/icone_chat_opcoes.svg" /></button>
          </div>
        </header> : ``}
        {conversa_selecionada ? <section className="container_chat_fundo_da_conversa">
          {conversa_atual.map((_, i) => {

            <p>{_.mensagem}</p>
          })}
        </section> : ``}
        {conversa_selecionada ? <div className="container_interagir_conversa">
          <div className="container_input_chat_conversa">
            <input type="text" placeholder="Digite sua Mensagem..." value={inpt_mensagem} onChange={e => set_inpt_mensagem(e.target.value)} />
          </div>
          <div className="container_botoes_chat_conversa">
            <button className="botao_chat_conversa_clipe"><img src="./img/icons/icone_chat_clipe_conversa.svg" /></button>
            <button className="botao_chat_conversa_sorriso"><img src="./img/icons/icone_chat_sorriso.svg" /></button>
            <button className="botao_chat_conversa_enviar"><img src="./img/icons/icone_chat_enviar.svg" /></button>
          </div>
        </div> : ``}
        {conversa_selecionada ? ``
          : <div className="container_nenhuma_conversa_selecionada">
            <img src="./img/icons/icone_chat_perfil.svg" alt="" />
            <p>{chat_pagina_atual == `conversas` ? `Procure adicionar algum contato para poder iniciar uma conversa!` : ``}</p>
          </div>

        }
      </motion.div>
    </AnimatePresence>
  )
}

export default Conversa
