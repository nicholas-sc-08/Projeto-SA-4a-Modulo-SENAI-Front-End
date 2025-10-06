"use client";

import { useGlobalContext } from '@/context/GlobalContext';

import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import styles from "@/app/perfil_brecho/page.module.css";


function page() {

  const { tipo_de_header, set_tipo_de_header } = useGlobalContext();

  return (

    <div className="toda-a-tela-content">
      <Header tipo={tipo_de_header} />

      <div className="entre-navbar-e-footer-content">
        <div className="perfil-brecho-content">

          <div className="parte-azul-superior-content">
            <p>a</p>
          </div>

          <div className="parte-do-meio-logo-nome-content">
            <img src="" alt="" />
            <div className="nome-brecho-e-avaliacao-content">
              <p>Project Indigo Brechó</p>
              <div className="avaliacao-simplificado-brecho-content">
                <p>4.5/5</p>
                <p>⭐⭐⭐⭐</p>
              </div>

            </div>
          </div>

          <div className="parte-inferior-do-perfil-brecho-content">
            
          </div>

        </div>

        <div className="produtos-do-brecho-content">

        </div>

        <div className="avaliacoes-do-brecho-content">

        </div>

      </div>

      <Footer />
    </div>

  )
}

export default page