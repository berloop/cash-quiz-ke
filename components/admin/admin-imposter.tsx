import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface EmptyProps {
    label:string;
}




export const EmptyImposter= ({
    label
}: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
          <div className="relative h-72 w-72 mb-2">
            <Image className=""
            alt="Empty"
             fill
              src="/secure.png"
               />

        </div>
        <p className="text-zinc-600 font-bold text-sm text-center ">
            {label}
        </p>
        <Link href={"/dashboard"} className="mt-4 text-white font-bold">
            <Button variant={"admin"}>
                Go to Trivia Playground
            </Button>
        </Link>
        </div>
    );
}