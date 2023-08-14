import Navbar from "@/components/navbar";
import { Sidebar } from "@/components/sidebar";



const DashBoardLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {

  //  const apiLimitCount = await getApiLimitCount();
  //  const isPro = await checkSubscription();


    return (
        <div className="h-full relative bg-[#1A1818]">
        {/* <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-[#121212]">
          <Sidebar />
        </div> */}
        {/* className="md:pl-72" */}
        <main >
      {/* <Navbar /> */}
        {children}
        </main>
      </div>
    ); 
}


export default DashBoardLayout;

// bg-[#1F1E1E]