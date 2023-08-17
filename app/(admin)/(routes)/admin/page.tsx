"use client";
import React, { useState, useEffect } from 'react';
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { auth, useOrganization, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/spinner';
import { EmptyCode } from '@/components/empty-code';
import { UserAvatar } from '@/components/user-avatar';
import { formatDate, formatRelativeTime, randomizePercentage } from '@/lib/functions';
import { getRankings } from '@/lib/ranking';
import Image from "next/image";



import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"


import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { AwardIcon, BarChart2, CrownIcon, EyeIcon, GitBranchPlus, Sparkles, Trophy, UserIcon, Users2Icon } from 'lucide-react';
import AdminNavbar from '@/components/admin/admin-navbar';
import { Heading } from '@/components/admin/admin-heading';
import { AdminNav } from '@/components/admin/admin-nav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AdminOverview } from '@/components/admin/admin-overview';
import { AdminRecentSales } from '@/components/admin/admin-recent';
import { Sidebar } from '@/components/sidebar';
import RankingsTable from '@/components/admin/admin-users';
import Link from 'next/link';
import router from 'next/router';
import { EmptyMusic } from '@/components/empty-music';
import { EmptyImposter } from '@/components/admin/admin-imposter';





interface Result {
   score: number;
   correctAnswers: number;
   wrongAnswers: number;
}

const AdminOverviewPage: React.FC = () => {

   const { user } = useUser();
   
   
   
   const {
    membership,
    isLoaded,
  } = useOrganization();
   
  const role = membership?.role;

  const router = useRouter();

  if (role !== "admin") {
    // User is a admin...
    return (
      <div className='mt-12'> 
    <EmptyImposter label="We've detected you aren't an Administrator, If you are, then switch workspace to activate!" />
    </div>

    );
   
  }

  

  // const { membershipList} = useOrganization({
  //   membershipList: {},
  // });

  // if (!membershipList) {
  //   // loading state
  //   return null;
  // }
   


   return (
      <div className='text-white mt-5'>
    <h1 className="text-xl text-zinc-400 font-bold mb-2 ml-8">Hi, {user?.fullName || "Admin"},</h1>
         <div className="mb-4 space-y-2 ml-8">
            <h2 className="text-2xl md:text-4xl text-white font-bold">
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NdotoTrivia:</span> Admin Console
            </h2>
           
            <p className="text-white font-normal text-sm md:text-lg text-zinc-400">
               Here you can view user analytics, create trivia and more.
            </p>
            <div>
            {/* <ul>
        {membershipList?.map((membership) => (
          <li key={membership.id}>
            {membership.publicUserData.firstName} 
            {membership.publicUserData.lastName} &lt;
            {membership.publicUserData.identifier}
            &gt; ::\\ {membership.role}
          </li>
        ))}
      </ul> */}
              
            </div>
         
      
    
            <div className="flex-1 text-xs text-zinc-400">
                   <Link href="/create">
          <Button variant="ndoto" className="md:text-lg p-4 md:p-6 rounded-lg font-bold text-black">
          <Sparkles className="mr-2 h-5 w-5 fill-black" /> 
          Create Trivia
           
          </Button>
        </Link>
                   </div>
         </div>
         
      
        
               <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 px-4">
               <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-normal font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                    Users Analytics
                   
                  </CardTitle>
                  

                  <Users2Icon
                    className='h-8 w-8 text-red-800'

                  />
                  
                </CardHeader>
                <CardContent>
                <hr className='mb-3 px-5 border-red-800'></hr>
                  <div className="mb-4 justify-center flex">
                    <AdminOverview />
                  </div>

                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-normal font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                    Elite Players 
                  
                  </CardTitle>

                  <Trophy
                    className='h-8 w-8 text-red-800'

                  />
                </CardHeader>
                <CardContent>
              
                <div className="">
                     <RankingsTable />
                  </div>

                </CardContent>
              </Card>
              

</div>
        
</div>
   );
};

export default AdminOverviewPage;