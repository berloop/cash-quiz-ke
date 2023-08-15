"use client";

import Link from "next/link";
// import { Montserrat } from "next/font/google";
// import { Poppins } from "next/font/google";
import { Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Activity, BarChart2, Camera, ChevronRightSquare, Church, Code, Dices, FileImage, FileVideo2, ImageIcon, LayoutDashboard, Medal, MessageSquare, MessagesSquare, Music4, PartyPopper, PlayCircleIcon, Settings, ShieldAlertIcon, ShieldCheck, Shirt, Sparkles, SparklesIcon, TrophyIcon, Tv2, User2Icon, Users2Icon, VenetianMask, VideoIcon, View, ViewIcon, ZapIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { SignOutter } from "@/components/sign-outter";
import { Badge } from "@/components/ui/badge";
import { AdminSignOutter } from "@/components/admin/admin-signoutter";


const poppins = Nunito({
    weight: "700",
    subsets: ["latin"]
});




//create an array to hold fumar routes..

const routes = [
    {
        label: "Overview",
        icon: LayoutDashboard,
        href: "/admin",
        color: "text-zinc-400",
    },
    {
        label: "Leaderboard",
        icon: Users2Icon,
        href: "/rankings",
        color: "text-zinc-400",
    },
    
    
];



const userdataRoutes = [
   
    
    {
        label: "Create Trivia",
        icon: SparklesIcon,
        href: "/create",
        color: "text-zinc-400",
    },
    
    
   

];

// const triviaRoutes = [
   
    
//     {
//         label: "Gert:Fashion on Lock",
//         icon: Shirt,
//         href: "/gert",
//         color: "text-zinc-400",
//     },
//     {
//         label: "Mom's Day Off",
//         icon: VenetianMask,
//         href: "/moms",
//         color: "text-zinc-400",
//     }, {
//         label: "Faith First: With Pushie",
//         icon: Church,
//         href: "/faith",
//         color: "text-zinc-400",
//     }, {
//         label: "Zari: All White Party",
//         icon: PartyPopper,
//         href: "/zari",
//         color: "text-zinc-400",
//     },

    
   

// ];

const linksRoutes = [
    {
        label: "Users Playground",
        icon: Dices,
        href: "/dashboard",
        color: "text-zinc-400",
    },
   
   
    {
        label: "Manage Profile",
        icon: ShieldCheck,
        href: "/admin-profile",
        color: "text-zinc-400",
    },

    
    
   

];


export const AdminSidebar = () => {
    const pathname = usePathname();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full  text-zinc-400 overflow-y-auto">
            <div className="px-3 py-2 flex-1">
                
                <Link href="/admin" className="
             flex items-center pl-3 mb-8">
                    
                    <div className={cn("text-2xl mt-3 text-white font-bold")}>Ndoto<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Trivia</span>
                    <span className="text-xs bg-gradient-to-l p-1 mb-5 from-red-500 to-red-800 rounded-sm text-black font-bold">Admin</span>
                 </div> 
                  {/* <Badge className="text-xs  font-bold" variant={"ndoto"}>
                                Admin
                            </Badge> */}
                  
                </Link>
                <div className="px-2 py-3 flex-1">
                    <p className="font-bold text-sm  text-zinc-400">Admin Control Panel</p>
                </div>
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
                    <p className="font-bold text-xs uppercase text-[#424040]">TRIVIA</p>
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
                    <p className="font-bold text-xs uppercase text-[#424040]">Profile</p>
                </div>

                <div className="space-y-1">
                    {linksRoutes.map((route) => (
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
               
               
               

            </div>

            

        <AdminSignOutter />


        </div>
    );
}