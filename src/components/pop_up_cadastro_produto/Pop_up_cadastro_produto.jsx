"use client";

import React from "react";
import styles from "@/components/pop_up_cadastro_produto/Pop_up_cadastro_produto.module.css";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

export default function Pop_up_cadastro_produto() {

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
              <p>Produto Cadastrado com Sucesso!</p>
    
            </motion.div>
    
          </AnimatePresence>
    
        </div>
  );
};