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
       <div className="text-3xl">
         Play, Win and Repeat!
        </div>
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1 className="">Introducing Ndoto<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Trivia.</span></h1>
      
      </div>
     
      <div className="text-2xl md:text-xl font-lighter text-[#959494] font-medium">
        Stand a chance to win amazing prizes daily!
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="ndoto" className="md:text-lg p-4 md:p-6 rounded-full font-bold text-white">
          <Sparkles className="mr-2 h-4 w-4" /> 
          {isSignedIn ? "Go to Dashboard" : "Get Started"} 
           
          </Button>
        </Link>
      </div>
      <div className="text-white opacity-50 text-xs md:text-sm font-normal">
        Brought to you by <Link
        target="blank"
        className="font-bold"
        
        href={"https://www.ndotomedia.com/"}>Ndoto Media, LLC.</Link>
      </div>
    </div>
  );
};

