"use client";

import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useProModal } from "@/hooks/use-pro-modal";
import { Activity, ArrowRight, ArrowRightCircle, ArrowRightSquare, CheckCheckIcon, CheckCircle2Icon, CheckSquare, ChevronRightSquare, Code, Code2, FileImage, FileVideo2, ListMusic, MessageSquare, MessagesSquare, Music2, Power, SparkleIcon, Sparkles, SparklesIcon, ZapIcon } from "lucide-react";
import { Card, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { SignOutButton } from "@clerk/nextjs";




export const SignOutModal = () => {

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
  <h2 className="text-white text-2xl font-bold">Are you seriously like, logging out?</h2>
  <p className="font-medium text-normal text-zinc-400 text-center">Oh, we&apos;d hate to see you leaving but you can jump back with us any time and enjoy the fun.</p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <SignOutButton>
                    <Button variant={"ndotored"} size="lg" className="w-full font-bold text-white" onClick={proModal.onClose}>
                        <Power className="w-4 h-4 mr-2 text-white" />
                        Continue to Logging Out
                    </Button>
                    </SignOutButton>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}