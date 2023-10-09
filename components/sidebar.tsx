"use client";

import Link from "next/link";
// import { Montserrat } from "next/font/google";
// import { Poppins } from "next/font/google";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Activity, BarChart2, Camera, ChevronRightSquare, Church, Code, FileImage, FileVideo2, Globe2, ImageIcon, LayoutDashboard, Medal, MessageSquare, MessagesSquare, Music4, PartyPopper, Settings, Shirt, Sparkles, Trophy, TrophyIcon, Tv2, User2Icon, VenetianMask, VideoIcon, View, ZapIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { SignOutter } from "@/components/sign-outter";


const poppins = Nunito({
    weight: "700",
    subsets: ["latin"]
});




//create an array to hold fumar routes..

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-zinc-400",
    },
    {
        label: "Leaderboard",
        icon: Medal,
        href: "/leaderboard",
        color: "text-zinc-400",
    },
    
    
    
];



const userdataRoutes = [
   
    
    {
        label: "My Scores",
        icon: BarChart2,
        href: "/stats",
        color: "text-zinc-400",
    },
    {
        label: "Profile Settings",
        icon: User2Icon,
        href: "/profile",
        color: "text-zinc-400",
    },

    
   

];

const triviaRoutes = [
    {
        label: "World-Trivia Playground",
        icon: Globe2,
        href: "/trivia",
        color: "text-zinc-400",
    }, 
    
    {
        label: "Gert:Fashion on Lock",
        icon: Shirt,
        href: "/gert",
        color: "text-zinc-400",
    },
    // {
    //     label: "Mom's Day Off",
    //     icon: VenetianMask,
    //     href: "/moms",
    //     color: "text-zinc-400",
    // },
     {
        label: "Faith First: With Pushie",
        icon: Church,
        href: "/faith",
        color: "text-zinc-400",
    }, {
        label: "Zari: All White Party",
        icon: PartyPopper,
        href: "/zari",
        color: "text-zinc-400",
    },

    
   

];

const linksRoutes = [
   
    
    {
        label: "Watch Our Shows",
        icon: View,
        href: "https://www.ndotomedia.com/watch-now",
        color: "text-zinc-400",
    },
   

    
   

];


export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full  text-zinc-400 overflow-y-auto ">
            <div className="px-3 py-2 flex-1">
                
                <Link href="/dashboard" className="
             flex items-center pl-3 mb-5">
                    
                    <div className={cn("text-2xl mt-3 text-white font-bold")}>Ndoto<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Trivia&trade;</span></div>
                  
                </Link>
                <hr className="border-white/10 px-3 mb-2 flex-1"></hr>
                <div className="px-2 py-3 flex-1">
                    <p className="font-bold text-xs uppercase text-[#424040]">OVERVIEW</p>
                </div>

                {/* //setting active link on sidebar */}
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-gradient-to-r from-red-900 via-black to-black" : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3 text-[#ed2324]", route.color)} />
                                {route.label}
                            </div>

                        </Link>
                    ))}
                </div>
                <div className="px-2 py-3 flex-1">
                    <p className="font-bold text-xs uppercase text-[#424040]">User Data</p>
                </div>
                <div className="space-y-1">
                    {userdataRoutes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-gradient-to-r from-red-900 via-black to-black" : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3 text-[#ed2324]", route.color)} />
                                {route.label}
                            </div>

                        </Link>
                    ))}
                </div>
                <div className="px-3 py-4 flex-1">
                    <p className="font-bold text-xs uppercase text-[#424040]">TRIVIA</p>
                </div>
                <div className="space-y-1">
                    {triviaRoutes.map((route) => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-gradient-to-r from-red-900 via-black to-black" : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3 text-[#ed2324]", route.color)} />
                                {route.label}
                            </div>

                        </Link>
                    ))}
                </div>
                <div className="px-3 py-4 flex-1">
                    <p className="font-bold text-xs uppercase text-[#424040]">LINKS</p>
                </div>
                <div className="space-y-1">
                    {linksRoutes.map((route) => (
                        <Link
                        target="blank"
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                                pathname === route.href ? "text-white bg-gradient-to-r from-red-900 via-black to-black" : "text-zinc-400")}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3 text-[#ed2324]", route.color)} />
                                {route.label}
                            </div>

                        </Link>
                    ))}
                </div>
               

            </div>

            

        <SignOutter />


        </div>
    );
}