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
    const statsData = await getUserStats();
    setStats(statsData);
    console.log(statsData);
  };

  if (!stats || stats.length === 0) {
    return <EmptyImage label="Once you start playing our Trivia, Your scores will show here."/>;
  }

    
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



  
  const statsCount = stats.length;


  return (
    <div className="px-5 py-10 text-white">
      <h1 className="text-3xl font-bold mb-5 text-center">Hi, {user?.fullName}</h1>
      <div className="mb-4 space-y-2">
        <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NdotoTrivia&trade;</span>
        </h2>
        <p className="text-white font-medium text-sm md:text-lg text-center">
          View your Scores Statistics here!
        </p>
      </div>
      <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 font-bold'>Stats {stats.length} </h2>

      {stats.length > 0 && !showResult && (
        <Card className="rounded-lg mt-5 border-red shadow-lg ">
          <CardHeader>
            <CardTitle className="text-zinc-400">
              {stats[activeStat].stat}
            </CardTitle>
          </CardHeader>
          <CardContent>
            
            {stats[activeStat].stat}
          </CardContent>
          <CardFooter>
           
         
          </CardFooter>
        </Card>
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
    </div>
  );
};

export default StatsPage;
