import PuffLoader from "react-spinners/PuffLoader";

interface EmptyProps {
    label:string;
}




export const EmptyImage= ({
    label
}: EmptyProps) => {
    return (
        <div className="h-screen flex flex-col items-center justify-center">
             <div className="flex items-center justify-center"><PuffLoader color="#8A1111"
              size={150} /></div> 
        <p className="text-zinc-500 text-sm font-bold text-center mt-3 animate-pulse">
            {label}
        </p>
        </div>
        
    );
}

