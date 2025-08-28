import { useState, useContext, useEffect } from "react";
import { GlobalContext } from '../../../contexts/GlobalContext.jsx';
import { motion, AnimatePresence } from "framer-motion";


function Conversa() {

  const { conversa_selecionada, set_conversa_selecionada } = useContext(GlobalContext);
  const { grupo_conversa, set_grupo_conversa } = useContext(GlobalContext);
  const { chat_pagina_atual, set_chat_pagina_atual } = useContext(GlobalContext);

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }}>
        {conversa_selecionada ? ``
          : <div className="container_nenhuma_conversa_selecionada">

            <p>{chat_pagina_atual == `conversas` ? `Procure adicionar algum contato para poder iniciar uma conversa!` : ``}</p>

          </div>

        }
      </motion.div>
    </AnimatePresence>
  )
}

export default Conversa
