import React, { useEffect } from 'react';
import { useGlobalContext } from '@/context/GlobalContext';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import styles from "@/components/pop_up_notificacao_comprado/Pop_up_notificacao_comprado.module.css"

export default function Pop_up_notificacao_comprado() {

  const { pop_up_notificacao_comprado, set_pop_up_notificacao_comprado } = useGlobalContext();

  useEffect(() => {

    if (pop_up_notificacao_comprado) {

      setTimeout(() => {

        set_pop_up_notificacao_comprado(false);

      }, 2000);

    };

  }, [pop_up_notificacao_comprado]);

  return (
    <div className={styles['pop_up_notificacao_comprado']}>

      <AnimatePresence>

        <motion.div initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }} className={styles["container_pop_up_notificacao_comprado"]}>

          <img src="./img/gif/checkAnimation.gif" alt="" className='gif-animation' />
          <p>Pagamento Efetuado com sucesso!</p>

        </motion.div>

      </AnimatePresence>

    </div>
  );
};