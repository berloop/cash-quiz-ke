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
import { auth, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Spinner } from '@/components/spinner';
import { EmptyCode } from '@/components/empty-code';
import { UserAvatar } from '@/components/user-avatar';
import { formatDate, formatRelativeTime, randomizePercentage } from '@/lib/functions';
import { getRankings } from '@/lib/ranking';



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
import { GitBranchPlus, Sparkles, UserIcon } from 'lucide-react';
import AdminNavbar from '@/components/admin/admin-navbar';
import { Heading } from '@/components/admin/admin-heading';



interface Result {
   score: number;
   correctAnswers: number;
   wrongAnswers: number;
}

const LeaderboardPage: React.FC = () => {


   return (
      <div>
         <AdminNavbar />
         <div className='flex-1 space-y-4 p-8 pt-6'>
            <div className='flex items-center justify-between'>
         <Heading
           icon={Sparkles}
           iconColor='text-white'
           bgColor='transparent'
            title="Overview"
            description='Analyze Users and More'
         />
          <Button variant={'ndoto'} className='font-extrabold text-lg'>
         <GitBranchPlus className='mr-2' />
            Create Trivia
         </Button>
        
         </div>
         </div>


      </div>


   );
};

export default LeaderboardPage;
