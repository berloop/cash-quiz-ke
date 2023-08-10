"use client";

import { useEffect, useState } from "react";
import { SignOutModal } from "@/components/sign-out-modal";

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
        <SignOutModal />
        
        </>
     )





}