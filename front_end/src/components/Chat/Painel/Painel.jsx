import Informacoes from "../Informações/Informacoes";
import Menu from "../Menu/Menu";
import { useContext, useEffect } from 'react';
import { GlobalContext } from '../../../contexts/GlobalContext.jsx';
import "./Painel.css";
import Perfil from "../Perfil/Perfil.jsx";

function Painel() {

    const { chat_pagina_atual, set_chat_pagina_atual } = useContext(GlobalContext);

    useEffect(() => {

        console.log(chat_pagina_atual);
        
        
        
    }, [chat_pagina_atual])
    
    function tela_selecionada(tela) {

        if (tela == `conversas`) {

            return <Informacoes />
        } else if (tela == `perfil`){

            return <Perfil/>
        }
    };

    return (
        <div className="container_painel_chat">
            <div className="container_painel_chat_conteudo">

                <Menu />
                {tela_selecionada(chat_pagina_atual)}


            </div>
        </div>
    )
}

export default Painel
