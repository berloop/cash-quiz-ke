"use client";

import { useEffect, useState } from "react";

import { AdminSignOutModal } from "@/components/admin/admin-sign-out-modal";

export const AdminModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
  
     useEffect(() => {
        setIsMounted(true);
     }, []);


     if(!isMounted){
        return null;
     }

     return(
        <>
        <AdminSignOutModal />
        
        </>
     )





}