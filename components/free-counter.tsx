"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Crown, Zap, ZapIcon } from "lucide-react";
import { useProModal } from "@/hooks/use-pro-modal";
import { SubscriptionButton } from "@/components/subscription-button";

interface FreeCounterProps {
    apiLimitCount: number;
    isPro: boolean;
}



//preventing any hydration errors with useState()
export const FreeCounter = ({
    apiLimitCount = 0,
    isPro = false,
}: FreeCounterProps) => {
    const proModal = useProModal();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    if(isPro){
        //if User is a Pro....
        return (
            <div className="px-3">
            <Card className="bg-[#211E1E] border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white font-medium  space-y-2">
                        
                    <div className="flex items-center space-x-2">
                    <Crown className="text-[#ff4d4d]" />
                    <p className="font-bold text-left text-transparent  bg-clip-text bg-gradient-to-r to-[#ff4d4d] from-[#f9cb28]">Fumar Pro </p> 
                    
                    </div>

                        <Progress
                           className="h-3 bg-[#121212] shadow-lg"
                           value={100}
                        />
                        <div className="flex items-center space-x-2">
                        <p className="font-bold text-sm text-left text-transparent bg-clip-text bg-gradient-to-r to-[#ff4d4d] from-[#f9cb28]">Unlimited FumarTokens.</p>
                        </div>
                        

                    </div>
                   
                
                 
                </CardContent>
            </Card>
        </div>
        );
    }

    return (
        <div className="px-3">
            <Card className="bg-[#211E1E] border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white font-medium mb-4 space-y-2">
                    <p className="font-bold text-left text-transparent  bg-clip-text bg-gradient-to-r to-[#ff4d4d] from-[#f9cb28]">FumarTokens</p>

                        <Progress
                           className="h-3 bg-[#121212] shadow-lg"
                           value={(apiLimitCount/ 3) * 100}
                        />
                         <p className="font-bold text-left text-transparent  bg-clip-text bg-gradient-to-r to-[#ff4d4d] from-[#f9cb28]">{apiLimitCount} of {MAX_FREE_COUNTS} FumarTokens used.</p>

                    </div>
                    <Button onClick={proModal.onOpen} className="w-full font-bold rounded-lg" variant={"fumarite"}>
                        <Zap className="w-4 h-4 ml-2 mr-2 fill-black" />
                        Upgrade to Pro
                    </Button>
                   
                </CardContent>
            </Card>
        </div>
    )
}