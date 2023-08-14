"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { Inter, Outfit } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRightCircle, Sparkles } from "lucide-react";


// const font = Inter({
//     weight: "600",
//     subsets: ["latin"]
// });
const font = Outfit({ 
  subsets: ['latin'],
  weight:"700"
 })

export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                <Image className="animate-pulse"
            alt="icon"
             fill
              src="/icon.png"
               />

                </div>
                <h1 className={cn("text-2xl font-bolder text-white", font.className)}>
                     Ndoto<span className="text-transparent font-bolder bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Trivia.</span>
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
       <UserButton />
       
      </div>
      
        </nav>
    )
}