"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import TypewriterComponent from "typewriter-effect";
import { MenuIcon, Sparkles, SparklesIcon } from "lucide-react";

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  const url = "/acme.jpg";
  // style={{ backgroundImage:`url(${url})`}}

  return (
    <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 md:rounded-none lg:rounded-lg select-none"
      style={{
      backgroundImage: `url(${url})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
    >
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl text-white sm:text-6xl md:text-7xl lg:text-7xl font-extrabold">
          Introducing Cash<span className="text-transparent tracking-normal bg-clip-text bg-gradient-to-l from-red-500 to-red-800">Quiz.</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-white sm:text-xl sm:leading-8 font-medium">
            A next-gen trivia platform you&rsquo;ll ever need where you play, win, repeat and stand a chance to win amazing daily prizes!
          </p>
          <div className="space-x-4">
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="ndoto" className="md:text-lg p-4 md:p-6 rounded-full font-bold text-white">
          <Sparkles className="mr-2 h-6 w-6" /> 
          {isSignedIn ? "Go to Dashboard" : "Get Started"} 
           
          </Button>
        </Link>
          </div>
          <Link
            href={"https://www.ndotomedia.com/"}
            className="rounded-2xl bg-black text-zinc-400  px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Brought to you by <span className="font-extrabold">Ndoto Media, LLC.</span>
          </Link>
        </div>
      </section>
   
  );
};

