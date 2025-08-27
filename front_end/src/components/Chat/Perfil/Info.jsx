import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { GlobalContext } from "../../../contexts/GlobalContext";
import './Info.css';

function Info() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const [cliente_brecho, set_cliente_brecho] = useState(null);

    useEffect(() => {

        const cliente = array_clientes.find(c => c._id == usuario_logado._id);
        cliente ? set_cliente_brecho(`cliente`) : set_cliente_brecho(`brecho`);
    }, []);

    return (
        <aside className="container_info_meu_perfil_chat">
            <section className="section_nome_info_meu_perfil_chat">
                <h5>Nome:</h5>
                <span>{cliente_brecho == `cliente` ? usuario_logado.nome : usuario_logado.nome_brecho}</span>
            </section>
            <section className="section_nome_info_meu_perfil_chat">
                <h5>Email:</h5>
                <span>{usuario_logado.email}</span>
            </section>
        </aside>
    )
}

export default Info
