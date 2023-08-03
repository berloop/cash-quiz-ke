"use client";

import axios from "axios";
import { useState } from "react";
import { Zap } from "lucide-react";
// import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";

interface SubscriptionButtonProps {
    isPro: boolean;
}

export const SubscriptionButton = ({
    isPro = false
}: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false);
    const onClick = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/stripe");

            window.location.href = response.data.url;

        } catch (error) {
            console.log("BILLING_ERROR", error);
        } finally {
            setLoading(false);
        }
    }


    return (
        // <Button disabled={loading} className="font-bold"
        //     variant={isPro ? "default" : "fumarite"} onClick={onClick}>
        //     {!isPro && <Zap className="w-4 h-4 mr-2 fill-black" />}
        //     {isPro ? "Manage Subscription" : "Upgrade to Pro"}

        // </Button>
        <Button variant={isPro ? "default" : "fumarite"} disabled={loading} onClick={onClick} className="font-bold" >
      {isPro ? "Manage Subscription" : "Upgrade to Pro"}
      {!isPro && <Zap className="w-4 h-4 ml-2 fill-black" />}
    </Button>
    )
}
