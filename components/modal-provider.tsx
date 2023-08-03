"use client";

import { useEffect, useState } from "react";
import { ProFumarModal } from "@/components/pro-fumar-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
  
     useEffect(() => {
        setIsMounted(true);
     }, []);


     if(!isMounted){
        return null;
     }

     return(
        <>
        <ProFumarModal />
        
        </>
     )





}