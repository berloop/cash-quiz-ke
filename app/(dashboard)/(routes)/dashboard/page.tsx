"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";

import { Activity, ArrowRight, ArrowRightCircle, ArrowRightSquare, ChevronRightSquare, Code, Code2, FileImage, FileVideo2, ListMusic, MessageSquare, MessagesSquare, Music2, Settings2Icon, Sparkles } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";


const tools = [
    {

        label: "Gert Show Trivia",
        icon: MessagesSquare,
        image: "/Gert.jpg",
        href: "/gert",
        color: "text-white",
        bgColor: "bg-[#202020]",
        description: "Test out your knowledge about our lovely show Gert:Fashion on Lock and stand a chance to win!",

    },
    {
        label: "Faith First: With Pushie",
        icon: ListMusic,
        image: "/pushiee.jpg",
        href: "/faith",
        color: "text-white",
        bgColor: "bg-[#202020]",
        description: "Keeping up with the Faith First with Pushie! Take our Trivia and stand a chance to win!",

    },

    {
        label: "Zari: All White Party",
        icon: FileVideo2,
        image: "/zari.jpg",
        href: "/zari",
        color: "text-white",
        bgColor: "bg-[#202020]",
        description: "Had Fun Partying with Zari? Take our Trivia from the show and stand a chance to win!",
    },
    {
        label: "Mom's Day Off",
        icon: FileImage,
        image: "/Mom.jpg",
        href: "/mom",
        color: "text-white",
        bgColor: "bg-[#202020]",
        description: "Already Binge-watched Mom's Day Off? Take our trivia from the show and stand a chance to win!",
    },

    {
        label: "LeaderBoard",
        icon: Settings2Icon,
        href: "/leaderboard",
        image: "/leader.png",
        color: "text-white",
        bgColor: "bg-[#202020]",
        description: "View your position among others to see whether you are going to walk a Prize Winner!",
    },
    {
        label: "Preferences",
        icon: Settings2Icon,
        href: "/profile",
        image: "/settings.png",
        color: "text-white",
        bgColor: "bg-[#202020]",
        description: "Manage Your Account Setting and preferences.",
    },
]





const DashboardPage = () => {
    const { user } = useUser();

    const router = useRouter();



    return (

        <div>
            <div className="mb-4 space-y-2">
            <h1 className="text-sm font-bold text-white text-center">Hi, {user?.fullName || "Friend:)"}!</h1>
                <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NdotoTrivia&trade;</span>
                </h2>
                <p className="text-white font-medium text-sm md:text-lg text-center">
                    Play, Win, Repeat!
                </p>
            </div>




            <div className="px-4 md:px-20 lg:px-32 flex flex-wrap gap-4 pb-5">
                {tools.map((tool) => (
                    <Card
                        onClick={() => router.push(tool.href)}
                        key={tool.href}
                        className="p-4 flex-col items-center justify-center hover:shadow-lg  cursor-pointer rounded-xl border border-gray-800  shadow-xl transition hover:border-red-500/10 hover:shadow-red-500/10"
                        style={{ minWidth: "200px", flex: "1 1 300px" }}
                    >
                        <div className="max-w-sm rounded overflow-hidden">
                            <div className="flex justify-center">
                            <Image
                                    src={tool.image} // Replace 'tool.imageUrl' with the URL of your image
                                    alt={tool.label}
                                    width={130}
                                    height={130} // You can set the alt attribute to a descriptive text about the image
                                    className=" object-cover" // Adjust width and height as per your requirements
                                />
                            </div>
                            <div className="px-6 py-4">
                                <div className="font-medium text-lg text-white text-center mb-2">{tool.label}</div>
                                <p className="text-zinc-400 text-xs text-center">{tool.description}</p>
                            </div>

                        </div>
                    </Card>

                ))}
            </div>






        </div>



    )
}
export default DashboardPage;