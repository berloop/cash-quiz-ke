"use client";
import { UserButton, auth, useUser } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile-sidebar";
import { AdminNavbarSpinner } from "./admin/admin-navbar-spinner";

const Navbar = () => {

    const { isLoaded } = useUser();

    if (!isLoaded) {
        // Any loading state
        return <AdminNavbarSpinner />;
      }

    

    return (
        <div className ="flex items-center p-4">
       <MobileSidebar />
        <div className="flex w-full justify-end">
    
            <UserButton
            
             afterSignOutUrl="/" 
             
            />
        </div>
        
    
        </div>
        

    );
}

export default Navbar;