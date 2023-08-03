import { FileCog, FileCog2Icon, Settings, Settings2Icon } from "lucide-react";

import { Heading } from "@/components/heading";
// import { SubscriptionButton } from "@/components/subscription-button";
import { checkSubscription } from "@/lib/subscription";
import { SubscriptionButton } from "@/components/subscription-button";

const SettingsPage = async () => {
    const isPro = await checkSubscription();

    return (
        <div>
            <Heading
                title="Settings"
                description="Manage your account settings."
                icon={Settings2Icon}
                iconColor="text-[#121212]"
                bgColor="bg-zinc-800/10"
            />
            <div className="px-4 lg:px-8 space-y-4">
                <div className="text-muted-foreground text-sm ">
                    {isPro ? "You are currently on a Fumar.ai™ Pro Plan." : "You are currently on a Fumar.ai™ Free Trial Plan."}
                </div>
                <SubscriptionButton isPro={isPro} />
            </div>
        </div>
    );
}

export default SettingsPage;
