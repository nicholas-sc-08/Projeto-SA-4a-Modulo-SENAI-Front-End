import { buscar_brecho } from "@/services/brecho/brecho";
import React from "react";
import { useEffect } from "react";

export default function Section() {

    useEffect(() => {

        buscar_brecho();

    }, []);

    return (
    <section>


    </section>
    );
};