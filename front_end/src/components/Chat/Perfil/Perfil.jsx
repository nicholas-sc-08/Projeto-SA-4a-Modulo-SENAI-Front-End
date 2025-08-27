
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from '../../../contexts/GlobalContext.jsx';
import { motion, AnimatePresence } from "framer-motion";
import './Perfil.css';
import Info from "./Info.jsx";

function Perfil() {

    const { array_clientes, set_array_clientes } = useContext(GlobalContext);
    const { usuario_logado, set_usuario_logado } = useContext(GlobalContext);
    const [ cliente_brecho, set_cliente_brecho ] = useState(null);

    useEffect(() => {

        const cliente = array_clientes.find(c => c._id == usuario_logado._id);
        cliente ? set_cliente_brecho(`cliente`) : set_cliente_brecho(`brecho`);
    }, []);

    return (
        <AnimatePresence>
            <motion.div initial={{ opacity: 0, y: 0 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.5 }} className="container_chat_perfil">
                <header>
                    <h2 className="titulo_perfil_chat">Meu Perfil</h2>
                </header>

                <main className="informacoes_principais_perfil_chat">
                    <img src={cliente_brecho == `cliente` ? usuario_logado.imagem_de_perfil : usuario_logado.logo} referrerPolicy="no-referrer" crossOrigin="anonymous" alt="imagem de perfil" />
                    <h2>{cliente_brecho == `cliente` ? usuario_logado.nome : usuario_logado.nome_brecho}</h2>
                    <p>Um brechó é um estabelecimento comercial, físico ou online, que vende artigos usados, como roupas, calçados, acessórios, livros, objetos de decoração e outros itens. A prática de comprar e vender artigos usados tem ganhado popularidade devido a fatores como a busca por preços mais acessíveis, a preocupação com a sustentabilidade e a valorização de peças únicas e com história. </p>
                </main>
                <Info/>
                <button className="botao_meu_perfil_chat">Visualizar Perfil por Completo</button>
            </motion.div>
        </AnimatePresence>
    )
}

export default Perfil
