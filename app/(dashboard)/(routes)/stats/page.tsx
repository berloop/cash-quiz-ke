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
import { UserAvatar } from '@/components/user-avatar';
import Image from "next/image";
import { formatDate, formatRelativeTime, randomizePercentage } from '@/lib/functions';
import { AdminRankingSpinner } from '@/components/admin/admin-rankings-spinner';
import { UserStatsSpinner } from '@/components/user-stats-spinner';







interface Result {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const StatsPage: React.FC = () => {

  const { user } = useUser();
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

  const router = useRouter();


  interface TriviaScoreData {
    score: number;
    showName: string;
    timestamp: string;
    userName: string;
    userFirstName: string;
    userEmail: string;
    userLastName: string;
  }


  const randomNum = Math.floor(Math.random() * 2900) + 1;
  const randomizedPercentage = randomizePercentage(randomNum);

  // const statsCount = stats.length;


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
         <UserStatsSpinner />
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
                  <div className=" mb-4 justify-center flex">
                    <Image className='animate-pulse'
                      alt="Empty"
                      src="/leader.png"
                      width={180}
                      height={180}// Make sure the path to the image is correct
                    />
                  </div>

                  <div className="text-2xl font-bold text-white text-center">{stats[activeStat].score} Points</div>
                  <p className="text-xs  text-center text-green-400">
                    +{randomizedPercentage} From Inception.
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
                  <div className=" mb-4 justify-center flex">
                    <Image className='animate-pulse'
                      alt="Empty"
                      src="/calendar.png"
                      width={180}
                      height={180}// Make sure the path to the image is correct
                    />
                  </div>
                  <div className="text-lg font-bold text-white">  {formatDate(stats[activeStat].firstPlayedDate)}</div>
                  <p className="text-xs text-italic  text-zinc-400">
                    About {formatRelativeTime(stats[activeStat].firstPlayedDate)} ago.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                    User Info
                  </CardTitle>
                  <UserAvatar />
                </CardHeader>
                <CardContent>
                  <div className=" mb-4 justify-center flex">
                    <Image className='animate-pulse'
                      alt="Empty"
                      src="/user.png"
                      width={180}
                      height={180}// Make sure the path to the image is correct
                    />
                  </div>
                  <div className="text-xl font-bold text-white">{stats[activeStat].userName}</div>
                  <p className="text-xs  text-zinc-400">
                    @{stats[activeStat].userFirstName}.
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
                  <div className=" mb-4 justify-center flex">
                    <Image className='animate-pulse'
                      alt="Empty"
                      src="/glass.png"
                      width={180}
                      height={180}// Make sure the path to the image is correct
                    />
                  </div>
                  <div className="text-lg font-bold text-white">  {formatDate(stats[activeStat].lastPlayedDate)}</div>
                  <p className="text-xs text-zinc-400">
                    {formatRelativeTime(stats[activeStat].lastPlayedDate)} ago on <span className='font-bold text-red-800'> {stats[activeStat].showName} Show Trivia. </span>
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
