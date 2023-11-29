"use client"

import * as React from "react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import { cn } from "@/lib/utils"

import { LandingMobileNav } from "./landing-mobile-nav"
import { AlignJustify, HomeIcon, SidebarCloseIcon, Sparkles, Triangle, XSquare } from "lucide-react"
import { Button } from "./ui/button"
import Image from "next/image"
import { Outfit } from "next/font/google"
import { UserButton, useAuth } from "@clerk/nextjs"


const font = Outfit({ 
    subsets: ['latin'],
    weight:"700"
   })
  

export function LandingMainNav() {
  const segment = useSelectedLayoutSegment()
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const { isSignedIn } = useAuth();

  return (
    <div className="flex gap-6 md:gap-10 text-white mt-2 p-4 items-center justify-between select-none">
    
        <nav className="hidden gap-6 md:flex">

        <Link href="/" className="flex items-center">
                
                <h1 className={cn("text-2xl font-bolder text-white", font.className)}>
                     Cash<span className="text-transparent font-bolder bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Quiz.</span>
                </h1>
            </Link>
         
            <Link
             
              href="#features"
              className= "flex items-center text-lg text-zinc-400 font-medium transition-colors hover:text-red-800 sm:text-sm">
             Features
            </Link>
            
            <Link
             
              href="#contacts"
              className= "flex items-center text-lg text-zinc-400 font-medium transition-colors hover:text-red-800 sm:text-sm">
             Contact Us
            </Link>
         
           
         
        </nav>
        <div className="flex items-center gap-x-2">
       <UserButton  />

       
      </div>
    
      <Button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <XSquare /> : <AlignJustify />}
        <span className="font-bold text-lg">Menu</span>
      </Button>
      {showMobileMenu && (
        <LandingMobileNav />
      )}
    </div>
  )
}