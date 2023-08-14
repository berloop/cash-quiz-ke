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
import { UserIcon } from 'lucide-react';


interface Result {
   score: number;
   correctAnswers: number;
   wrongAnswers: number;
}

const LeaderboardPage: React.FC = () => {

  
   return (
      <div className="px-5 py-10 text-white items-center justify-center">
         <h1 className="text-2xl font-bold mb-2 text-center">Hi, Admin!</h1>
         <div className="mb-4 space-y-2">
            <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
               Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NdotoTrivia&trade;</span>
            </h2>
            <p className="text-white font-normal text-sm md:text-lg text-center">
               You are an administrator
            </p>
         </div>

                     </div>
                 
   );
};

export default LeaderboardPage;
