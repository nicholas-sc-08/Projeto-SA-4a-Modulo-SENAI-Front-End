import Informacoes from "../Informações/Informacoes";
import Menu from "../Menu/Menu";
import "./Painel.css";

function Painel() {
    return (
        <div className="container_painel_chat">
            <div className="container_painel_chat_conteudo">

            <Menu/>
            <Informacoes/>
            

            </div>
        </div>
    )
}

export default Painel
