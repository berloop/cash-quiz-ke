import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { getRankings } from '@/lib/ranking';
import { Spinner } from '@/components/spinner';
import { EmptyCode } from '@/components/empty-code';
import { formatDate, randomizePercentage } from '@/lib/functions';
import { useUser } from '@clerk/nextjs';
import { AdminSpinner } from './admin-loader';
import Link from 'next/link';
import { ArrowBigLeft, ArrowUpLeftSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Result {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const RankingsTable: React.FC = () => {
  const { user } = useUser();

  const [rankings, setRankings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterValue, setFilterValue] = useState<string>('');
  const [filteredRankings, setFilteredRankings] = useState<any[]>([]);
  const [sortedRankings, setSortedRankings] = useState<any[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetchRankings().then((rankingsData) => {
      setRankings(rankingsData);
      setFilteredRankings(rankingsData);
      setSortedRankings(rankingsData.slice().sort((a: { score: number; }, b: { score: number; }) => b.score - a.score));
    });
  }, []);

  useEffect(() => {
    if (filterValue === '') {
      setFilteredRankings(sortedRankings.slice(0, 4));
    } else {
      const filtered = sortedRankings.filter((ranking) =>
      ranking.userName.toLowerCase().includes(filterValue.toLowerCase())
      );
      // setFilteredRankings(filtered);
      setFilteredRankings(filtered.slice(0, 4));
    
    }
  }, [filterValue, sortedRankings]);

  const fetchRankings = async () => {
    try {
      const rankingsData = await getRankings();
      return rankingsData;
    } catch (error) {
      console.error('Error fetching user stats', error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const filterRankings = () => {
    const filtered = rankings.filter((ranking) =>
      ranking.userName.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredRankings(filtered);
  };

  useEffect(() => {
    filterRankings();
  }, [filterValue]);

  return (
    <div>
    {loading ? (
       // Show the spinner while loading
       <div className="flex items-center justify-center">
          <AdminSpinner />
       
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

             <div className='text-center font-bold text-red-800'>No Metadata Yet!</div>


          )}

          {!showResult && rankings.length > 0 && (
             //       
             <div className="w-full">
              
                <div className="flex items-center justify-center  py-1">
{/*                  
                <Input
         placeholder="Filter emails..."
         className="max-w-sm bg-[#121212] text-zinc-400 border-[#3E3D3D]"
         value={filterValue}
         onChange={(e) => setFilterValue(e.target.value)}
       /> */}
               
                </div>
                <div className="border-zinc-400 rounded-sm p-4 shadow-lg">
                   
                   <Table className='shadow-lg'>
                      <TableHeader>
                         <TableRow className='bg-[#1F1D1D] rounded-lg shadow-lg border-2 border-[#353434]'>
                           
                            <TableHead className='text-left border-r border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                               Name
                            </TableHead>
                          
                           
                        
                            <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                        Phone Number
                            </TableHead>
                            <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                                   Last Played
                            </TableHead>
                            <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                               Points
                            </TableHead>

                         </TableRow>

                      </TableHeader>
                   
                      <TableBody>
                     
                      {filteredRankings.map((ranking, index) => (
             <TableRow key={index} className='border-white/10'>
               
               <TableCell colSpan={1} className="h-1 w-1 border-r border-white/10 text-zinc-400">
                 {ranking.userName}
               </TableCell>
               <TableCell colSpan={1} className="h-1 w-1 border-r text-center border-white/10 text-zinc-400">
               {ranking.userphoneNumber}
               </TableCell> 
               <TableCell colSpan={1} className="h-1 w-1 border-r border-white/10 text-zinc-400">
                 {formatDate(ranking.lastPlayedDate)}  
               </TableCell>
                 
               <TableCell colSpan={1} className="h-1 w-1 text-center text-zinc-400 font-bold">
                 {ranking.score} Pts {/* Display total score */}
               </TableCell>
             </TableRow>
           ))}
         </TableBody>
                   </Table>
                   
                </div>
                <div className="flex items-center justify-start space-x-2 py-4">
                   <div className="flex-1 text-xs text-zinc-400">
                   <Link href="/rankings">
          <Button variant="admin" className="md:text-lg p-4 md:p-6 rounded-lg font-bold  text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
          <ArrowUpLeftSquare className="mr-2 h-4 w-4 text-red-800" /> 
          View More Details 
           
          </Button>
        </Link>
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

export default RankingsTable;
