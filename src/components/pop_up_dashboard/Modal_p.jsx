"use client";

import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import styles from "@/components/pop_up_dashboard/Modal_p.module.css";
import { useEffect } from "react";
import { useGlobalContext } from "@/context/GlobalContext";

export default function Modal_p() {

    const { set_modal_cadastrado } = useGlobalContext();

    useEffect(() => {

        setTimeout(() => set_modal_cadastrado(false), 2000);

    }, []);

    return (
        <div className={styles["fundo_modal"]}>
            <AnimatePresence>
                <motion.div className={styles["modal"]} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, scale: { type: "spring", visualDuration: 0.4, bounce: 0.5 }}}>
                    <img src="./img/gif/checkAnimation.gif" alt="" />
                    <p>Produto Cadastrado com sucesso!</p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};