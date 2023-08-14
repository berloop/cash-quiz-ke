import Link from "next/link"

import { cn } from "@/lib/utils"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (

    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/admin"
        className="text-md font-bold transition-colors hover:text-red-800"
      >
        Overview
      </Link>
      <Link
        href="/admin"
        className="text-md font-bold text-zinc-400 transition-colors hover:text-red-800"
      >
        Leaderboard
      </Link>
    
     
    </nav>
  )
}