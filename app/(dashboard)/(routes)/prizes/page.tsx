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
import { SparkleIcon, UserIcon } from 'lucide-react';
import { AdminRankingSpinner } from '@/components/admin/admin-rankings-spinner';


interface Result {
   score: number;
   correctAnswers: number;
   wrongAnswers: number;
}

const LeaderboardPage: React.FC = () => {

   const { user } = useUser();
   user?.fullName





   const router = useRouter();

   const randomNum = Math.floor(Math.random() * 2900) + 1;
   const randomizedPercentage = randomizePercentage(randomNum);

   return (
      <div className="px-5 py-10 text-white">
         <h1 className="text-2xl font-bold mb-2 text-center">Hi, {user?.fullName || "Friend:)"}!</h1>
         <div className="mb-4 space-y-2">
            <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
               Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NdotoTrivia&trade;</span>
            </h2>
            <p className="text-white font-normal text-sm md:text-lg text-center">
               Find out what you can win!
            </p>
         </div>
     
                  <div className="w-full">
                   
                     <div className="flex items-center justify-center py-4 bg-red-800 to-black rounded-t-lg ">
                     <SparkleIcon className='mr-2 hidden md:block text-black fill-black ' />
                      
                <h2 className='font-semibold text-black text-center'><span className='bg-black p-2 rounded-lg text-white'> <span className='font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>R1,000</span></span>  is the Grand Cash Prize! Enjoy on our Daily Airtime Rewards!</h2>
            
               
                    
                     </div>
                     <div className="border-zinc-400 rounded-sm p-7 shadow-lg bg-[#121212]">
                     <Table className='shadow-lg'>
   <TableHeader>
      <TableRow className='bg-[#1F1D1D] rounded-lg shadow-lg border-2 border-[#353434]'>
      <TableHead>
         </TableHead>
         <TableHead className='font-extrabold border-r text-lg text-center border-white/10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
            Daily Airtime
         </TableHead>
         <TableHead>
         </TableHead>
         
         <TableHead className='text-transparent text-lg bg-clip-text bg-gradient-to-r from-red-500 to-red-800 text-center font-extrabold'>
            Monthly Cash
         </TableHead>
         <TableHead>
         </TableHead>
        
         <TableHead>
         </TableHead>
      </TableRow>
   </TableHeader>
   <TableBody>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 font-bold">
            Position 
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center  font-bold">
            Prize In ZAR
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400  font-bold">
            Position 
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400  font-bold">
            Prize In ZAR
         </TableCell>
       
        
      </TableRow>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
            Pos #1
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center">
            R60
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #1
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400">
            R1000
         </TableCell>
       
        
      </TableRow>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
            Pos #2
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center">
            R55
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
            Pos #2
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400">
            R750
         </TableCell>
       
        
      </TableRow>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
            Pos #3
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center">
            R50
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #3
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400">
            R500
         </TableCell>
       
        
      </TableRow>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #4
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center">
            R45
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #4
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400">
            R450
         </TableCell>
       
        
      </TableRow>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #5
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center">
            R40
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #5
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400">
            R400
         </TableCell>
       
        
      </TableRow>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #6
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center">
            R35
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #6
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400">
            R350
         </TableCell>
       
        
      </TableRow>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #7
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center">
            R30
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #7
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400">
            R300
         </TableCell>
       
        
      </TableRow>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #8
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center">
            R25
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #8
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400">
            R250
         </TableCell>
       
        
      </TableRow>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #9
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center">
            R20
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #9
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400">
            R100
         </TableCell>
       
        
      </TableRow>
      <TableRow className='border-white/10'>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
         Pos #10
         </TableCell>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400 text-center">
            R10
         </TableCell>
         <TableCell/>
         <TableCell className="h-2 border-r border-white/10 text-zinc-400">
            Pos #10
         </TableCell>
         <TableCell className="h-2  border-white/10 text-zinc-400">
            R100
         </TableCell>
       
        
      </TableRow>
      
   </TableBody>
   
   
</Table>

                        
                     </div>
                     <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="flex-1 ml-3 text-xs text-zinc-400">
                        All Terms & Conditions apply.
                        </div>
                       
                     </div>
                  </div>

         

           
            </div>
     
   )}

export default LeaderboardPage;
