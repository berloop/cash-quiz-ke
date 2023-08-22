import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { SparkleIcon, ArrowRightCircle, CheckCircle2Icon, Sparkles, FileQuestionIcon, AwardIcon, MedalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';


const cardFeatures = [
    {
        id:1,
        headerText: "Modern UI/UX Design",
        description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.",
        icon: Sparkles,
        color: "text-white",
        href:"/dashboard"


    },
    {
        id:2,
        headerText: "Leaderboard",
        description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.",
        icon: MedalIcon,
        color: "text-white",
        href:"/dashboard"


    },

    {
        id:3,
        headerText: "Daily Prizes",
        description: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ut quo possimus adipisci distinctio alias voluptatum blanditiis laudantium.",
        icon: AwardIcon,
        color: "text-white",
        href:"/dashboard"


    },


]

const IconCardGroup = () => {
    return (
        <div className="bg-transparent text-white">
            <div
                className="mx-auto max-w-screen-xl px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8"
            >
                <div className="mx-auto max-w-lg text-center">
                    <h2 className="text-3xl font-bold sm:text-4xl">Lorem Ipsum Dolor</h2>

                    <p className="mt-4 text-gray-300">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur
                        aliquam doloribus nesciunt eos fugiat.
                    </p>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {cardFeatures.map((tool) => (
                        <a  key={tool.id}
                            className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-red-500/10 hover:shadow-red-500/10"
                            href={tool.href}
                        >

                            <tool.icon className={cn("h-8 w-8]", tool.color)} />

                            <h2 className="mt-4 text-xl font-bold text-white">{tool.headerText}</h2>

                            <p className="mt-1 text-sm text-gray-300">
                                {tool.description}
                            </p>
                        </a>
                    ))}


                </div>


            </div>
        </div>

    );
};

export default IconCardGroup;


