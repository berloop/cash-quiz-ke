"use client";

import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Activity, ArrowRight, ArrowRightCircle, ArrowRightSquare, CheckCheckIcon, CheckCircle2Icon, CheckSquare, ChevronRightSquare, Code, Code2, FileImage, FileVideo2, ListMusic, MessageSquare, MessagesSquare, Music2, Power, SparkleIcon, Sparkles, SparklesIcon, ZapIcon } from "lucide-react";
import { Card, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";




export const AdminSignOutModal = () => {

    const proModal = useProModal();
    const [loading, setLoading] = useState(false);



    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    {/* <DialogTitle
                        className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 text-white font-bold py-1">


                            Leaving so soon?
                            
                        </div>

                    </DialogTitle> */}
                    <DialogDescription className="text-center pt-2 space-y-2 font-medium">

                    <Card className="p-3  border-black/5 flex items-center justify-center"> {/* Use justify-center to center the content */}
    <div className="relative h-72 w-72 flex items-center">
      <Image className="animate-bounce"
        alt="Empty"
        fill
        src="/juicy.svg"
      />
    </div>
    
  </Card>
  <h2 className="text-white text-2xl font-bold">Confirm logging out?🪵</h2>
 
  
<figure className="max-w-screen-md mx-auto text-center">
   
    <blockquote>
    <p className="font-medium text-normal text-zinc-600 text-center">"I went to sleep dreaming of Malawi, and all the things made possible when your dreams are powered by your heart."</p>
    </blockquote>
    <figcaption className="flex items-center justify-center mt-2 space-x-3">
        
        <div className="flex items-center divide-x-2 divide-zinc-600 dark:divide-gray-700">
            <p className="pr-3 font-medium text-zinc-600 normal"> - William Kamkwamba</p>
            {/* <cite className="pl-3 text-sm text-zinc-600"> Malawian Inventor</cite> */}
        </div>
    </figcaption>
</figure>

                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <SignOutButton>
                    <Button variant={"ndoto"} size="lg" className="w-full font-extrabold text-xl text-black" onClick={proModal.onClose}>
                        <Power className="w-4 h-4 mr-2 text-black" />
                        Confirm Logging Out
                    </Button>
                    </SignOutButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}