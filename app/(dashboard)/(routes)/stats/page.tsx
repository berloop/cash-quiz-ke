"use client";
import React, { useState, useEffect } from 'react';
import { getTriviaQuestions } from '@/lib/trivia-questions';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { auth, useUser } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { ok } from 'assert';
import { useRouter } from 'next/navigation';
import { getUserStats } from '@/lib/user-stats';
import { EmptyImage } from '@/components/empty-image';
import { Spinner } from '@/components/spinner';
import RotateLoader from 'react-spinners/RotateLoader';
import { EmptyCode } from '@/components/empty-code';
import { BarChart2, CalendarCheck, CalendarDays, User2Icon } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';






interface Result {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const StatsPage: React.FC = () => {
  
const {user} = useUser();
user?.fullName


  const [stats, setStats] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean>('');

  const [activeStat, setActiveStat] = useState(0);
  // const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Result>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    fetchStats();
    
  }, []);

  // const fetchStats = async () => {
  //   const statsData = await getUserStats();
  //   setStats(statsData);
  //   console.log(statsData);
  //    setLoading(false); 
  // };

  const fetchStats = async () => {
    try {
      const statsData = await getUserStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching user stats', error);
    } finally {
      setLoading(false);
    }
  };
  // if (!stats || stats.length === 0) {
  //   return <div className='flex items-center justify-center'>
  //       <Spinner />
  //     </div>;
  // }

    
  const router = useRouter();




  interface TriviaScoreData {
    score: number;
    showName: string;
    timestamp: string;
    userName:string;
    userFirstName:string;
    userEmail:string;
    userLastName:string;
  }
  
    //formatting date...
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = format(date, "do MMM yyyy 'at' HH:mm'hrs'", {
      locale: enGB, // Import the required locale from date-fns
    });
    return formattedDate;
  };
  
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const formattedRelativeTime = formatDistanceToNow(date, { locale: enGB });
    return formattedRelativeTime;
  };


  
  const statsCount = stats.length;


  return (
    <div className="px-5 py-10 text-white">
      <h1 className="text-2xl font-bold mb-2 text-center">Hi, {user?.fullName || "Friend:)"}!</h1>
      <div className="mb-4 space-y-2">
        <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NdotoTrivia&trade;</span>
        </h2>
        <p className="text-white font-normal text-sm md:text-lg text-center">
          Find your Scores Statistics here.
        </p>
      </div>
     
      {loading ? (
        // Show the spinner while loading
        <div className="flex items-center justify-center">
        <Spinner />
      </div>
      ) : (
        // Show the stats content when not loading
        <>
          {stats.length > 0 ? (
            // Show the stats count when stats are available
            <h2 className='text-transparent text-xs'>
              Stats {stats.length}
            </h2>
            
          ) : (
            // Show the empty image and label when there are no stats
            
                  <EmptyCode label="Mmmh! Seems you haven't played yet, Once you play your score stats will show up here!" />
           
          
          )}

          {!showResult && stats.length > 0 && (
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                      Total Accumulated Score
                    </CardTitle>
                   
                    <BarChart2
                    className='h-8 w-8 text-red-800'
                    
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">{stats[activeStat].score} Points</div>
                    <p className="text-xs  text-green-400">
                      +20.1% from Yesterday
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                      First-Time Play-Date
                    </CardTitle>
                   
                    <CalendarDays
                    className='h-8 w-8 text-red-800'
                    
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-white">  {formatDate(stats[activeStat].firstPlayedDate)}</div>
                    <p className="text-xs text-italic  text-zinc-400">
                    { formatRelativeTime(stats[activeStat].firstPlayedDate)} ago.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                      User Info
                    </CardTitle>
                   
                    <User2Icon
                    className='h-8 w-8 text-red-800'
                    
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="text-xl font-bold text-white">{stats[activeStat].userEmail}</div>
                    <p className="text-xs  text-green-400">
                    @{stats[activeStat].userName}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                      Last Played
                    </CardTitle>
                   
                    <CalendarCheck 
                    className='h-8 w-8 text-red-800'
                    
                    />
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold text-white">  {formatDate(stats[activeStat].lastPlayedDate)}</div>
                    <p className="text-sm text-italic  text-zinc-400">
                    { formatRelativeTime(stats[activeStat].lastPlayedDate)} ago.
                    </p>
                  </CardContent>
                </Card>
             </div>
            
          )}

          {showResult && (
            <Card className='mt-5'>
              <CardHeader>
                <CardTitle className='text-normal text-sm text-zinc-400'>
                  You have Finished Today's Trivia!!
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => window.location.reload()} variant={'ndotored'} className='text-zinc-400 font-bold'>Restart</Button>
              </CardFooter>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default StatsPage;
