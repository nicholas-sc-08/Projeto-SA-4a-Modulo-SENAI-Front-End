import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import styles from "@/components/pop_up_conversa_adicionada/Pop_up_conversa_adicionada_com_sucesso.module.css";

function Pop_up_conversa_adicionada_sucesso() {
    return (
        <div className={styles['container_conversa_adicionada']}>

            <AnimatePresence>

                <motion.div initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        duration: 0.4,
                        scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
                    }} className={styles["container_pop_up_conversa_adicionada"]}>

                    <img src="./img/gif/checkAnimation.gif" alt="" className={styles['gif-animation']} />
                    <span>Conversa Adicionada com Sucesso!</span>

                </motion.div>

            </AnimatePresence>

        </div>
    )
}

export default Pop_up_conversa_adicionada_sucesso