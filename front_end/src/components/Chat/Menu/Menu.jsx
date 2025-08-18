import "./Menu.css";

function Menu() {
    return (
        <nav className='container_menu_chat'>
            <div className="container_imagem_menu">
                <img src="./img/logo/logo-verdeCamadinha.svg" alt="logo" className="logo_menu_chat" />
            </div>
            <div className="container_icones_chat">
                <button><img src="./img/icons/icone_chat_perfil.svg" alt=""/></button>
                <button><img src="./img/icons/icone_chat_grupos.svg" alt=""/></button>
                <button><img src="./img/icons/icone_chat_grupos.svg" alt=""/></button>
            </div>
            <div className="container_fechar_chat">
                <button><img src="./img/icons/icone_chat_fechar.svg" alt=""/></button>
            </div>
        </nav>
    )
}

export default Menu
