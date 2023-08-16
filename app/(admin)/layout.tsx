import { AdminModalProvider } from "@/components/admin/admin-modal-provider";
import AdminNavbar from "@/components/admin/admin-navbar-new";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";



const AdminDashboardLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {

  //  const apiLimitCount = await getApiLimitCount();
  //  const isPro = await checkSubscription();


    return (
        <div className="h-full relative bg-[#1A1818]">
       <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-[#121212]">
          <AdminSidebar />
        </div>  
    
        <main className="md:pl-72">
      <AdminNavbar />
      <AdminModalProvider />
      <Toaster />
        {children}
        </main>
      </div>
    ); 
}


export default AdminDashboardLayout;

// bg-[#1F1E1E]