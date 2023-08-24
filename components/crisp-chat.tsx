"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";



export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("988554f0-df51-42c5-b31b-3d3cdf11593f");

    }, []);
    return null;
}