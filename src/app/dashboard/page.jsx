"use client";

import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { buscar_marcas } from '@/services/marca/marca';
import { buscar_brechos } from '@/services/brecho/brecho';
import { buscar_clientes } from '@/services/cliente/cliente';
import Inicio_dashboard from '../../components/dashboard/Inicio_dashboard';
import Clientes_dashboard from '@/components/dashboard/Clientes_dashboard';
// import Categorias_dashboard from '../../components/dashboard/Categorias_dashboard.jsx';
import Produtos_dashboard from '@/components/dashboard/Produto_dashboard';
import Brechos_dashboard from '@/components/dashboard/Brechos_dashboard';
// import Marcas_dashboard from '../../components/dashboard/Marcas_dashboard.jsx';
import { buscar_categorias } from '@/services/categoria/categoria';
import { buscar_produtos } from '@/services/produto/produto';
import { useGlobalContext } from '@/context/GlobalContext';

export default function DashBoard() {

    const { array_clientes, set_array_clientes } = useGlobalContext();
    const { array_brechos, set_array_brechos } = useGlobalContext();
    const { array_categorias, set_array_categorias } = useGlobalContext();
    const { array_produtos, set_array_produtos } = useGlobalContext();
    const {array_marcas, set_array_marcas} = useGlobalContext();

    const { inicio_dashboard, set_incio_dashboard } = useGlobalContext();
    const { clientes_dashboard, set_clientes_dashboard } = useGlobalContext();
    const { categorias_dashboard, set_categorias_dashboard } = useGlobalContext();
    const { produtos_dashboard, set_produtos_dashboard } = useGlobalContext();
    const { brechos_dashboard, set_brechos_dashboard } = useGlobalContext()
    const {marcas_dashboard, set_marcas_dashboard} = useGlobalContext()

    const { erro_pagina, set_erro_pagina } = useGlobalContext();

    useEffect(() => {

        buscar_brechos();
        buscar_clientes();
        buscar_produtos();
        buscar_marcas();
        buscar_categorias();
    }, []);

    return (
        <AnimatePresence>

            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>

                {inicio_dashboard && <Inicio_dashboard />}
                 {clientes_dashboard && <Clientes_dashboard />}
                {/* {categorias_dashboard && <Categorias_dashboard />} */}
                {produtos_dashboard && <Produtos_dashboard />}
                 {brechos_dashboard && <Brechos_dashboard />}
                {/* {marcas_dashboard && <Marcas_dashboard />}  */}
            </motion.div>

        </AnimatePresence>
    );
};