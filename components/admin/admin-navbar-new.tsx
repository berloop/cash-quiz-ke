"use client";
import { OrganizationSwitcher, UserButton, clerkClient, useOrganization, useOrganizationList, useUser } from "@clerk/nextjs";
import AdminMobileSidebar from "@/components/admin/admin-mobile-sidebar";
import { AdminNavbarSpinner } from "./admin-navbar-spinner";



const AdminNavbar = () => {
    const { organizationList, isLoaded } = useOrganizationList();

    if (!isLoaded) {
        // Any loading state
        return <AdminNavbarSpinner />;
      }


    return <div>
  
    {organizationList.length === 0 ? (
      <div className="flex items-center p-4">
                      <AdminMobileSidebar />
                     <div className="flex w-full justify-end">
                           <UserButton afterSignOutUrl="/" />
                       </div>
               </div>
    ) : (
   

    <div className="flex items-center p-4">
                   <AdminMobileSidebar />
                    <div className="flex w-full justify-end">
                        <OrganizationSwitcher />
                    </div>
                </div>
    )}
  </div>
}

export default AdminNavbar;

