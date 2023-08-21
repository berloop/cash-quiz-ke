import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const ScoreAvatar = () =>{
    const { user } = useUser();

    return (
     <Avatar className="h-20 w-20 border-2 border-red-800 border-dashed rounded-lg ">
        <AvatarImage src={user?.profileImageUrl} />
        <AvatarFallback>
            {/* if the image of avatar haven't load yet....show names */}
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
        </AvatarFallback>
    
     </Avatar>
     
    );
    
};