"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";



export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("7caa2470-0259-436e-8f73-0e14b77cdd16");

    }, []);
    return null;
}