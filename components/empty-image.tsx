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
              src="/image.svg"
               />

        </div>
        <p className="text-muted-foreground text-sm text-center ">
            {label}
        </p>
        </div>
    );
}

