import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut, Power, Zap } from "lucide-react"
import { SignOutButton, UserButton } from "@clerk/nextjs"
import { useProModal } from "@/hooks/use-pro-modal";

export const SignOutter = () => {
    const proModal = useProModal();
   return(
    <div className="px-3">
            {/* <Card className="bg-[#211E1E] border-0">
                <CardContent className="py-6">
                    
                   
                   
                </CardContent>
            </Card> */}
            
            <Button onClick={proModal.onOpen} className="w-full p-3 justify-start font-bold rounded-lg" variant={"ghost"}>
                        
                        <Power className="h-5 w-5 mr-3" />
                       
                        Log Out
                    </Button>
                   
                  
       
       
        </div>
   )
}
