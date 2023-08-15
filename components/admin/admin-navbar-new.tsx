
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import AdminMobileSidebar from "@/components/admin/admin-mobile-sidebar";

const AdminNavbar = async () => {
    

    return (
        <div className ="flex items-center p-4">
       <AdminMobileSidebar />
        <div className="flex w-full justify-end">
    
            {/* <UserButton
            
             afterSignOutUrl="/" 
             
            /> */}
              <OrganizationSwitcher />
        </div>
        
    
        </div>
        

    );
}

export default AdminNavbar;