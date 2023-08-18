import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LogOut, Power, Zap } from "lucide-react"
import { SignOutButton, UserButton } from "@clerk/nextjs"
import { useProModal } from "@/hooks/use-pro-modal";

export const AdminSignOutter = () => {
    const proModal = useProModal();
    return (
        <div className="px-3">
            <Button onClick={proModal.onOpen} className="w-full p-3 justify-start font-bold rounded-lg" variant={"ghost"}>
                <Power className="h-5 w-5 mr-3" />  End Session </Button>
        </div>
    )
}
