"use client";

import React from "react";
import { useEffect } from "react";
import { buscar_brechos } from "@/services/brecho/brecho";
import styles from "@/app/chat/page.module.css";
import { useGlobalContext } from "@/context/GlobalContext";

export default function chat(){

    const { array_brechos, set_array_brechos } = useGlobalContext();
    
    useEffect(() => {

        buscar_brechos().then(data => set_array_brechos(data));
    }, []);

    return (
    
    <div className={styles["container_inicio_chat"]}>

        <p>asdasd</p>

    </div>

)};