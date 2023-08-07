import { BarChart2 } from "lucide-react";
import Image from "next/image";

interface EmptyProps {
    label:string;
}




export const EmptyImage= ({
    label
}: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
          <div className="relative h-72 w-72">

         
            <Image className="animate-pulse"
            alt="Empty"
             fill
              src="/stats.svg"
               />

        </div>
        <p className="text-zinc-500 text-sm font-bold text-center mt-3">
            {label}
        </p>
        </div>
    );
}

