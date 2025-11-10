import { useGlobalContext } from "@/context/GlobalContext";
import React  from 'react';
import { useEffect } from "react";
import { buscar_clientes } from "@/services/cliente/cliente";
import buscar_enderecos from "@/services/enderecos/enderecos";
import  styles from "@/components/pop_up_dashboard/Pop_up_de_excluir.module.css";

export default function Pop_up_de_excluir() {

  const { id_do_cliente_a_excluir, set_id_do_cliente_a_excluir } = useGlobalContext();
  const { abrir_pop_up_dashboard, set_abrir_pop_up_dashboard } = useGlobalContext();
  const { pop_up_notificacao_excluir_dashboard, set_pop_up_notificacao_excluir_dashboard } = useGlobalContext();

  async function excluir_cliente(id) {

    try {

      const cliente_a_excluir = await api.delete(`/clientes/${id}`);
      buscar_clientes();
      buscar_enderecos();
      set_abrir_pop_up_dashboard(false);
      set_pop_up_notificacao_excluir_dashboard(true);

    } catch (erro) {

      console.error(erro);
    };
  };

  async function excluir_endereco(id) {

    try {

      const endereco_a_excluir = await api.delete(`/enderecos/${id}`);
      excluir_cliente(id);

    } catch (erro) {

      console.error(erro);
    };
  };


  useEffect(() => {

    buscar_clientes();
    buscar_enderecos();

  }, []);

  return (
    <div className={styles['container_pop_up_de_excluir']}>

      <div className={styles["pop_up_de_excluir"]}>

        <img src="./img/Ponto_de_interrogacao.svg" alt="" />
        <p>Tem certeza que deseja excluir essa conta de usuário?</p>

        <div className={styles["pop_up_de_excluir_botoes"]}>

          <button className={styles['pop_up_de_excluir_botao_sair']} onClick={() => set_abrir_pop_up_dashboard(false)}>Sair</button>
          <button className={styles['pop_up_de_excluir_botao_excluir']} onClick={() => excluir_endereco(id_do_cliente_a_excluir)}>Excluir</button>
        </div>

      </div>

    </div>
  );
};