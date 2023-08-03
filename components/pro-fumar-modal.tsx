"use client";

import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { Activity, ArrowRight, ArrowRightCircle, ArrowRightSquare, CheckCheckIcon, CheckCircle2Icon, CheckSquare, ChevronRightSquare, Code, Code2, FileImage, FileVideo2, ListMusic, MessageSquare, MessagesSquare, Music2, SparkleIcon, Sparkles, SparklesIcon, ZapIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";




const tools = [
    {

        label: "Chatbot UI",
        icon: MessagesSquare,
        color: "text-[#121212]",
        bgColor: "bg-gradient-to-r to-[#ff4d4d] from-[#f9cb28]",

    },
    {
        label: "FumarTunes™",
        icon: ListMusic,
        color: "text-[#121212]",
        bgColor: "bg-gradient-to-r to-[#ff4d4d] from-[#f9cb28]",

    },
    {
        label: "ImageGen AI",
        icon: FileImage,
        color: "text-[#121212]",
        bgColor: "bg-gradient-to-r to-[#ff4d4d] from-[#f9cb28]",
    },
    {
        label: "FumarOsiris™",
        icon: FileVideo2,
        color: "text-[#121212]",
        bgColor: "bg-gradient-to-r to-[#ff4d4d] from-[#f9cb28]",
    },
    {
        label: "Code Copilot",
        icon: ChevronRightSquare,
        color: "text-[#121212]",
        bgColor: "bg-gradient-to-r to-[#ff4d4d] from-[#f9cb28]",
    },
]


export const ProFumarModal = () => {

    const proModal = useProModal();
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () => {
        try{
            setLoading(true);
        const response = axios.get("/api/stripe");
        

            // Redirect the user to the Stripe checkout or billing portal URL.
            window.location.href = (await response).data.url;


        }
        catch (error){
            console.log(error, "STRIPE_CLIENT_ERROR");
        } finally{
            setLoading(false);
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">


                            Upgrade to Fumar.ai&trade;
                            <Badge className="uppercase text-sm py-1 font-bold" variant={"fumarite"}>
                                Pro
                            </Badge>
                        </div>

                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 font-medium">
                        {tools.map((tool) => (
                            <Card
                                key={tool.label}
                                className="p-3 border-black/5 flex items-center justify-between">
                                    
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />

                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>

                                </div>
                             
                                <SparklesIcon className="text-[#FF4D4D] w-5 h-5" />

                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button disabled={loading} onClick={onSubscribe} variant={"fumarite"} size="lg" className="w-full">
                    Upgrade to Pro
                        <ZapIcon className="w-4 h-4 ml-2 fill-black"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}