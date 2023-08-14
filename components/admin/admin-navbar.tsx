import { OrganizationProfile, OrganizationSwitcher, UserButton } from "@clerk/nextjs"
import { MainNav } from "@/components/admin/admin-main-nav";



const AdminNavbar = () => {

    return (
        <div className="border-b border-red-700">
       <div className="flex flex-col md:flex-row items-center justify-between p-4">
        <div className="text-center text-2xl text-white font-extrabold w-full md:w-auto">
          {/* Centered logo or brand */}
          Ndoto<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Trivia&trade;</span>
        </div>
        
          
          <MainNav className="mx-6 text-white" />
          
  
          <div className="ml-auto flex justify-center md:justify-start items-center space-x-4 mt-3">
          {/* Centered OrganizationSwitcher */}
          <OrganizationSwitcher />
        </div>
          
        </div>
      </div>
    )
}

export default AdminNavbar;