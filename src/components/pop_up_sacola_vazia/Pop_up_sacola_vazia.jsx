import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion";
import styles from "@/components/pop_up_sacola_vazia/Pop_up_sacola_vazia.module.css";

function Pop_up_sacola_vazia() {

  return (
    <div className={styles['container_fundo_pop_up_sacola_vazia']}>

      <AnimatePresence>

        <motion.div initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.4,
            scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 },
          }} className={styles["container_pop_up_sacola_vazia"]}>

          <img src="./img/icons/icone_de_erro.svg" alt="" className='gif-animation' />
          <p>A sua Sacola está Vazia!</p>

        </motion.div>

      </AnimatePresence>

    </div>
  )
}

export default Pop_up_sacola_vazia