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
import { AdminRankingSpinner } from '@/components/admin/admin-rankings-spinner';
import { getCallbackResponse } from '@/lib/getCallbackResponse';



interface Result {
   score: number;
   correctAnswers: number;
   wrongAnswers: number;
}

const CallBackPage: React.FC = () => {

   const { user } = useUser();
   user?.fullName


   const [rankings, setRankings] = useState<any[]>([]);
   const [selectedAnswer, setSelectedAnswer] = useState<string | boolean>('');
   const [activeRank, setActiveRanking] = useState(0);
   const [checked, setChecked] = useState(false);
   const [loading, setLoading] = useState<boolean>(true);
   const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
   const [showResult, setShowResult] = useState(false);
   const [table, setTable] = useState<any>(null);
   const [filterValue, setFilterValue] = useState<string>('');
   const [filteredRankings, setFilteredRankings] = useState<any[]>(rankings);
   const [sortedRankings, setSortedRankings] = useState<any[]>([]);
   const [result, setResult] = useState<Result>({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
   });

   // useEffect(() => {
   //    fetchRankings();
      
      

   // }, []);

   useEffect(() => {
      fetchRankings().then((rankingsData) => {
        setRankings(rankingsData);
        setFilteredRankings(rankingsData);
        setSortedRankings(rankingsData.slice().sort((a: { score: number; }, b: { score: number; }) => b.score - a.score));
      });
   }, []);

   useEffect(() => {
      if (filterValue === '') {
         setFilteredRankings(sortedRankings);
      } else {
         const filtered = sortedRankings.filter((ranking) =>
            ranking.userEmail.toLowerCase().includes(filterValue.toLowerCase())
         );
         setFilteredRankings(filtered);
      }
   }, [filterValue, sortedRankings]);


   // const fetchRankings = async () => {
   //    try {
   //       const rankingsData = await getRankings();
   //       setRankings(rankingsData);
   //    } catch (error) {
   //       console.error('Error fetching user stats', error);
   //    } finally {
   //       setLoading(false);
   //    }
   // };

   const filterRankings = () => {
      const filtered = rankings.filter((ranking) =>
        ranking.userEmail.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredRankings(filtered);
    };
    
    useEffect(() => {
      filterRankings();
    }, [filterValue]);
    
    

   const fetchRankings = async () => {
      try {
        const rankingsData = await getCallbackResponse();
        return rankingsData; // Return the fetched data
      } catch (error) {
        console.error('Error fetching user stats', error);
      } finally {
        setLoading(false);
      }
    };

    const obscureEmail = (email: string): string => {
      const parts = email.split('@');
      if (parts.length === 2) {
        const [username, domain] = parts;
        const obscuredUsername = `${username.charAt(0)}${'▪'.repeat(username.length - 1)}`;
        return `${obscuredUsername}@${domain}`;
      }
      return email; // Return the original email if it doesn't match the expected format
    };

    const obscurePhoneNumber = (phoneNumber: string): string => {
      // Check if the phone number is valid
      if (/^\+\d{10,15}$/.test(phoneNumber)) {
        const countryCode = phoneNumber.slice(0, 4);
        const obscuredDigits = phoneNumber.slice(4, -4).replace(/\d/g, '▪'); // Use • (bullet) as the replacement
        const lastFourDigits = phoneNumber.slice(-4);
        return `${countryCode}${obscuredDigits}${lastFourDigits}`;
      }
      return phoneNumber; // Return the original phone number if it doesn't match the expected format
    };
    
    // Example usage:
    const phoneNumber = "+255788165984";
    const obscuredNumber = obscurePhoneNumber(phoneNumber);
    console.log(obscuredNumber); // Output: +255•••••••••5984
    

   const router = useRouter();

   const randomNum = Math.floor(Math.random() * 2900) + 1;
   const randomizedPercentage = randomizePercentage(randomNum);

   // const statsCount = stats.length;

   //getting the highest scorer..
   // const sortedRankings = rankings.slice().sort((a, b) => b.score - a.score);

   return (
      <div className="px-5 py-10 text-white">
      <h1 className="text-2xl font-bold mb-2 text-center">Hi! {user?.username || "Friend"},</h1>
         <div className="mb-4 space-y-2">
            <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
               Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">BibleQuiz & More!</span>
            </h2>
            <p className="text-white font-normal text-sm md:text-lg text-center">
               This is a sample callback response.
            </p>
         </div>

         {loading ? (
            // Show the spinner while loading
            <div className="flex items-center justify-center">
                <AdminRankingSpinner />
            </div>
         ) : (
            // Show the stats content when not loading
            <>
               {rankings.length > 0 ? (
                  // Show the stats count when stats are available
                  <h2 className='text-transparent text-xs'>
                     Stats {rankings.length}
                  </h2>

               ) : (
                  // Show the empty image and label when there are no stats

                  <EmptyCode label="Mmmh! Seems no one has played yet, Once other players starts playing, their ranks will show up here!" />


               )}

               {!showResult && rankings.length > 0 && (
                  //       
                  <div className="w-full">
                   
                     <div className="flex items-center justify-center py-4">
                      
                     <Input
              placeholder="Search Player via Email.."
              className="max-w-sm bg-[#121212] text-zinc-400 border-[#3E3D3D]"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            />
                    
                     </div>
                     <div className="border-zinc-400 rounded-sm p-7 shadow-lg bg-[#121212]">
                        
                        <Table className='shadow-lg'>
                           <TableHeader>
                              <TableRow className='bg-[#1F1D1D] rounded-lg shadow-lg border-2 border-[#353434]'>
                                 <TableHead className='font-bold border-r border-white/10 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Position
                                 </TableHead>
                                 <TableHead className='text-left border-r border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Username
                                 </TableHead>
                                 <TableHead className='text-center border-r border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Email Address
                                 </TableHead>
                                 <TableHead className='text-center border-r border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Phone Number
                                 </TableHead>
                                 <TableHead className='text-center border-r border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Sub Method
                                 </TableHead>
                                 <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Payment Date
                                 </TableHead>
                                 <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Expiration Date
                                 </TableHead>
                                 <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Status
                                 </TableHead>
                                 <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Amount Paid
                                 </TableHead>

                              </TableRow>

                           </TableHeader>
                        
                           <TableBody>
                        
                           {filteredRankings.map((ranking, index) => (
                  <TableRow key={index} className='border-white/10'>
                    <TableCell colSpan={1} className="h-2 border-r border-white/10 text-zinc-400">
                      #{index + 1}. {/* Display rank number */}
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-zinc-400 border-r border-white/10">
                     {/* Obscure email so people wont spam others.. */}
                      {obscureEmail(ranking.userName)}
                    </TableCell>
                   
                    <TableCell colSpan={1} className="h-2 text-zinc-400 border-r border-white/10">
                     {/* Obscure email so people wont spam others.. */}
                      {obscureEmail(ranking.userEmail)}
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-zinc-400 border-r border-white/10">
                     {/* Obscure email so people wont spam others.. */}
                      {ranking.userPhoneNumber}
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-center text-zinc-400 border-r border-white/10">
                     {/* Obscure email so people wont spam others.. */}
                      {ranking.subscriptionMethod}
                    </TableCell>

                
                    <TableCell colSpan={1} className="h-2 text-center text-zinc-400 border-r border-white/10">
                      {ranking.paymentDate} {/* Format and display last played date */}
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-center text-zinc-400 border-r border-white/10">
                      {ranking.expirationDate} {/* Format and display last played date */}
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-center text-zinc-400 border-r border-white/10">
                    <span className='text-green-500 bg-green-950 border border-green-800 shadow-xl shadow-green-500/10 p-1 rounded-sm text-xs font-normal'>{ranking.paymentStatus}</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-center text-zinc-400 font-bold">
                      {ranking.amountPaid} ₦
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
                        </Table>
                        
                     </div>
                     <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="flex-1 ml-3 text-xs text-zinc-400">
                      ({rankings.length}) Data Rows Available
                        </div>
                   
                     </div>
                  </div>

               )}

               {showResult && (
                  <div>This is an Easter Egg...</div>
               )}
            </>
         )}
      </div>
   );
};

export default CallBackPage;
