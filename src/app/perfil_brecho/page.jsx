"use client";

import { useGlobalContext } from '@/context/GlobalContext';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import styles from "@/app/perfil_brecho/page.module.css";


function page() {

    const { tipo_de_header, set_tipo_de_header } = useGlobalContext();

  return (

    <div>
        <Header tipo={tipo_de_header} />

    </div>

  )
}

export default page