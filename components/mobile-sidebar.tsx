"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Sheet,
    SheetContent,
    SheetTrigger
} from "@/components/ui/sheet";

import { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";






const MobileSidebar = () => {
    const [isMounted, setIsMounted] = useState(false);
    //solving the hydration issue...
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


    return (
    <Sheet>
        <SheetTrigger>
            <Button variant="ghost" size="icon" className="md:hidden">
                <Menu color="#ed2324" />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-[#121212]" >
            <Sidebar />
        </SheetContent>
    </Sheet>
    );

}

export default MobileSidebar;



