import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { HomeIcon, Triangle } from "lucide-react"
import Image from "next/image"


export function LandingMobileNav() {

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid bg-[#12121260] h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-[#121212] p-4 text-white shadow-md">
        <Link href="/" className="flex items-center space-x-2">
        
          <span className="font-bold">Ndoto<span className="text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Trivia.</span></span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
            <Link
              href="#features"
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline cursor-not-allowed opacity-60"
              )}
            >
              Features
            </Link>

            <Link
              href="/"
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline cursor-not-allowed opacity-60"
              )}
            >
              Home
            </Link>

            
        
       
        </nav>
 
      </div>
    </div>
  )
}