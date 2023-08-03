"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import TypewriterComponent from "typewriter-effect";
import { Sparkles, SparklesIcon } from "lucide-react";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1 className="">Your Next-Gen AI companion.</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r to-[#ff4d4d] from-[#f9cb28]">
          <TypewriterComponent
            options={{
              strings: [
                "Text-to-Content",
                "Text-to-Image",
                "Text-to-Video",
                "Text-to-Music"
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400 font-medium">
        Create content using Artifical Intelligence 10x faster!
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="fumarite" className="md:text-lg p-4 md:p-6 rounded-full font-bold text-[#121212]">
          <Sparkles className="mr-2 h-4 w-4 fill-black" /> 
            Try Fumar Free
           
          </Button>
        </Link>
      </div>
      <div className="text-white opacity-50 text-xs md:text-sm font-normal">
        No credit card required.*
      </div>
    </div>
  );
};