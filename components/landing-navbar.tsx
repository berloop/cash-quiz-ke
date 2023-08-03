"use client";

import { useAuth } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRightCircle, Sparkles } from "lucide-react";


const font = Inter({
    weight: "600",
    subsets: ["latin"]
});

export const LandingNavbar = () => {
    const { isSignedIn } = useAuth();

    return (
        <nav className="p-4 bg-transparent flex items-center justify-between">
            <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-4">
                    <Image
                        fill
                        alt="Logo"
                        src="/spiral.png"

                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    Fumar
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          {/* <Button variant="outline" className="rounded-full font-bold">
            Get Started
          </Button> */}
          
          <Button variant="outline" className="md:text-lg p-4 md:p-6 rounded-full font-bold text-[#121212]">
          <ChevronRightCircle className="mr-2 h-4 w-4 " />
            Dashboard
            
          </Button>
        </Link>
      </div>
        </nav>
    )
}