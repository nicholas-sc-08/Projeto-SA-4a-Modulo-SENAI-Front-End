import { useContext } from "react";
import { GlobalContext } from '../../../contexts/GlobalContext.jsx';
import "./Menu.css";

function Menu() {

    const { chat_pagina_atual, set_chat_pagina_atual } = useContext(GlobalContext);

    return (
        <nav className='container_menu_chat'>
            <div className="container_imagem_menu">
                <img src="./img/logo/logo-verdeCamadinha.svg" alt="logo" className="logo_menu_chat" />
            </div>
            <div className="container_icones_chat">
                <button><img src="./img/icons/icone_chat_perfil.svg" alt="" onClick={() => set_chat_pagina_atual(`perfil`)}/></button>
                <button><img src="./img/icons/icone_chat_grupos.svg" alt="" onClick={() => set_chat_pagina_atual(`conversas`)}/></button>
                <button><img src="./img/icons/icone_chat_grupos.svg" alt="" onClick={() => set_chat_pagina_atual(`grupos`)}/></button>
            </div>
            <div className="container_fechar_chat">
                <button><img src="./img/icons/icone_chat_fechar.svg" alt="" /></button>
            </div>
        </nav>
    )
}

export default Menu
