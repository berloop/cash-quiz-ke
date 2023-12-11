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
        label: "World-Trivia Playground™",
        icon: FileImage,
        image: "/worlds.png",
        href: "/trivia",
        color: "text-white",
        bgColor: "bg-[#202020]",
        description: "Test your general knowledge on over massive trivia questions and stand a chance to win cash prizes!",
    },
    
    {
        label: "Daily Prizes",
        icon: Settings2Icon,
        href: "/prizes",
        image: "/prizes.png",
        color: "text-white",
        bgColor: "bg-[#202020]",
        description: "Find out what you can win when you play our trivia on daily basis, but also on the long run if you stand a champion!",
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
    
]





const DashboardPage = () => {
    const { user } = useUser();

    const router = useRouter();



    return (

        <div className="select-none" style={{
            
            // backgroundImage: `url("/hear.jpg")`,
            // backgroundSize: 'cover',
            // backgroundPosition: 'center',
            // backgroundRepeat: 'no-repeat',

        }}>
            <div className="mb-4 space-y-2">
                <h1 className="text-normal font-bold text-white text-center">Hi! {user?.username || "Friend:)"},</h1>
                <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">CashQuiz!</span>
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
                        className="p-4 flex-col rounded-lg items-center justify-center hover:shadow-lg  cursor-pointer border  border-transparent shadow-xl transition hover:border-red-500/10 hover:shadow-red-500/10"
                        style={{
                            minWidth: "200px", flex: "1 1 300px",
                            backgroundImage: `url("/particle_02.jpg")`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',

                        }}

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