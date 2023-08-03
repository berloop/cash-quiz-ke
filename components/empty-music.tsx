import Image from "next/image";

interface EmptyProps {
    label:string;
}




export const EmptyMusic= ({
    label
}: EmptyProps) => {
    return (
        <div className="h-full p-20 flex flex-col items-center justify-center">
          <div className="relative h-72 w-72 mb-2">
            <Image className="animate-pulse"
            alt="Empty"
             fill
              src="/music.svg"
               />

        </div>
        <p className="text-muted-foreground text-sm text-center ">
            {label}
        </p>
        </div>
    );
}