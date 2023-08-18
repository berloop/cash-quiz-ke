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
import { AdminSpinner } from '@/components/admin/admin-loader';
import { AdminRankingSpinner } from '@/components/admin/admin-rankings-spinner';
import { EmptyImposter } from '@/components/admin/admin-imposter';


interface Result {
   score: number;
   correctAnswers: number;
   wrongAnswers: number;
}

const RankingsPage: React.FC = () => {

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
        const rankingsData = await getRankings();
        return rankingsData; // Return the fetched data
      } catch (error) {
        console.error('Error fetching user stats', error);
      } finally {
        setLoading(false);
      }
    };

   const router = useRouter();

   const randomNum = Math.floor(Math.random() * 2900) + 1;
   const randomizedPercentage = randomizePercentage(randomNum);


   
   
   const {
      membership,
      isLoaded,
    } = useOrganization();
     
    const role = membership?.role;
  
   
    if (role !== "admin") {
      // User is a admin...
      return (
        <div className='mt-12'> 
      <EmptyImposter label="We've detected you aren't an Administrator, If you are, then switch workspace to activate!" />
      </div>
  
      );
     
    }

   // const statsCount = stats.length;

   //getting the highest scorer..
   // const sortedRankings = rankings.slice().sort((a, b) => b.score - a.score);

   return (
      <div className="px-5 py-10 text-white">
         <h1 className="text-2xl font-bold mb-2 text-center">Hi, {user?.fullName || "Admin"}!</h1>
         <div className="mb-4 space-y-2">
         <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NdotoTrivia:</span> Admin Console
                </h2>
            <p className="text-white font-normal text-sm md:text-lg text-center">
               Find ranking among trivia players.
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
                   
                     <div className="flex items-center flex justify-center items-center py-4">
                      
                     <Input
              placeholder="Filter emails..."
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
                                    Full Name
                                 </TableHead>
                                 <TableHead className='text-left border-r border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Email Address
                                 </TableHead>
                                 <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Inception Date
                                 </TableHead>
                                 <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Last Played
                                 </TableHead>
                                 <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Status
                                 </TableHead>
                                 <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                    Total Score
                                 </TableHead>

                              </TableRow>

                           </TableHeader>
                        
                           <TableBody>
                           {/* {sortedRankings.map((ranking, index) => ( */}
                           {filteredRankings.map((ranking, index) => (
                  <TableRow key={index} className='border-white/10'>
                    <TableCell colSpan={1} className="h-2 border-r border-white/10 text-zinc-400">
                      #{index + 1}. {/* Display rank number */}
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 border-r border-white/10 text-zinc-400">
                      {ranking.userFirstName} {ranking.userLastName} {/* Display full name */}
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-zinc-400 border-r border-white/10">
                      {ranking.userEmail} {/* Display email address */}
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-center text-zinc-400 border-r border-white/10">
                      {formatDate(ranking.firstPlayedDate)} {/* Format and display last played date */}
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-center text-zinc-400 border-r border-white/10">
                      {formatDate(ranking.lastPlayedDate)} {/* Format and display last played date */}
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-center text-zinc-400 border-r border-white/10">
                       <span className='bg-gradient-to-r from-red-500 to-red-800 p-1 rounded-sm text-sm font-bold text-black'>Active</span>
                    </TableCell>
                    <TableCell colSpan={1} className="h-2 text-center text-zinc-400 font-bold">
                      {ranking.score} Pts {/* Display total score */}
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
                        {/* <div className="space-x-2">
                           <Button
                              variant="ghost"
                              size="sm"
                              className='border border-red-800'

                           >
                              Previous
                           </Button>
                           <Button
                              variant="ghost"
                              size="sm"
                              className='border border-red-800'>
                              Next
                           </Button>
                        </div> */}
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

export default RankingsPage;
