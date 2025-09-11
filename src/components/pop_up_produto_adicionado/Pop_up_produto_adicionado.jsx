"use client";

import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import styles from "@/components/pop_up_produto_adicionado/Pop_up_produto_adicionado.module.css";

export default function Pop_up_notificacao_comprado() {

  return (
    <div className={styles['container_fundo_pop_up_excluir_poduto_sacola']}>

      <AnimatePresence>

        <motion.div initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }} className={styles["container_pop_up_excluir_produto_sacola"]}>

          <img src="./img/gif/checkAnimation.gif" alt="" className={styles['gif-animation']} />
          <p>Produto Adicionado a Sacola!</p>

        </motion.div>

      </AnimatePresence>

    </div>
  );
};