import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export const UserAvatar = () =>{
    const { user } = useUser();

    return (
     <Avatar className="h-8 w-8 border-2 border-red-800 rounded-full">
        <AvatarImage src={user?.profileImageUrl} />
        <AvatarFallback>
            {/* if the image of avatar haven't load yet....show names */}
            {user?.firstName?.charAt(0)}
            {user?.lastName?.charAt(0)}
        </AvatarFallback>
     </Avatar>
    );
    
};