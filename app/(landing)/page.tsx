import Footer from "@/components/footer";
import IconCardGroup from "@/components/icon-cards";
import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import { FeaturedSection } from "@/components/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";


const LandingPage = () => {
    return (
        <div className="h-full">
            <LandingNavbar />
            <LandingHero />
            <IconCardGroup />

            <Footer />
        </div>
    )
}

export default LandingPage;