import Image from "next/image";

export const Loader = () => {
    return(
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-10 h-10 relative animate-spin opacity-70">
                <Image
                   alt="logo"
                   fill
                   src="/spiralBlack.png"
                   />
            </div>
            <p className="text-sm font-medium text-muted-foreground">
                Fumar.ai&trade; is working...
            </p>
        </div>
    );
};