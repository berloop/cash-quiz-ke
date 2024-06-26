"use client";
import React, { useState, useEffect } from 'react';
import { getGeneralTriviaQuestions, getTriviaQuestions } from '@/lib/trivia-questions';
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
import { Spinner } from '@/components/spinner';
import { EmptyMusic } from '@/components/empty-music';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/user-avatar';
import { ScoreAvatar } from '@/components/score-avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { TableHeader, TableRow, TableHead, TableBody, TableCell, TableCaption } from '@/components/ui/table';
import { Airplay, CircleDashed, FileImage, Option, Table, Timer } from 'lucide-react';
import CountUp from 'react-countup';
import { AdminRankingSpinner } from '@/components/admin/admin-rankings-spinner';
import { UserQuestionSpinner } from '@/components/questions-spinner';
import { ToastAction } from '@/components/ui/toast';
import { playClickSound, playNextSound, playNotification, showErrorToast, showSuccessToast, shuffleArray } from '@/lib/functions';
import { Progress } from '@/components/ui/progress';
import { useWindowSize } from 'react-use';
import Image from 'next/image';


import Confetti from "react-confetti";
import { Console } from 'console';




interface Result {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

interface Option {
  text: string;
  image: string;
}


const GertPage: React.FC = () => {

  const { user } = useUser();
  user?.fullName




  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean>('');

  const generateRandomTime = () => {
    const minSeconds = 120;
    const maxSeconds = 300;

    // Generate a random whole number between minSeconds and maxSeconds
    const randomTime = Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;

    return randomTime;
  };

  //total time for this trivia Run....(in seconds)
  const [totalTimeRemaining, setTotalTimeRemaining] = useState(300);



  const [activeQuestion, setActiveQuestion] = useState(0);
  // const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(true);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<Result>({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const questionsData = await getGeneralTriviaQuestions();
      const shuffledQuestions = shuffleArray(questionsData);
      setQuestions(shuffledQuestions);
      setLoadingQuestions(false);
      console.log(shuffledQuestions);
    } catch (error) {
      console.error('Error Fetching Questions', error);
      setLoadingQuestions(false);
    }
  };

  // if (!questions || questions.length === 0) {
  //   return <Spinner />;
  // }

  useEffect(() => {
    if (totalTimeRemaining > 0) {
      const timerId = setInterval(() => {
        setTotalTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    } else if (totalTimeRemaining === 0) {
      // nextQuestion();
      setShowResult(true);
      // Automatically move to the next question
      setSelectedAnswer(false); // Reset selectedAnswer for the next question
      setTotalTimeRemaining(500); // Reset the total time remaining for the next question
    }
  }, [totalTimeRemaining]);



  const onAnswerSelected = (option: any, idx: number) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    playClickSound();

    const correctAnswer = questions[activeQuestion]?.answer;


    if (option.text.trim() === correctAnswer.trim()) {
      setSelectedAnswer(option.text);
      console.log('Option Selected:', option.text)
      //adding a bonus time if you get right answer..
      setTotalTimeRemaining(totalTimeRemaining + 2);
      console.log('Correct Answer:', correctAnswer)
      console.log('Status:', true)
    } else {
      setSelectedAnswer(false);
      console.log('Option Selected:', option.text)
      console.log('Correct Answer:', correctAnswer)
      console.log('Status:', false)
    }
    setTotalTimeRemaining(totalTimeRemaining);
    //adding 2 seconds to total timer....
  };

  const router = useRouter();


  const nextQuestion = async () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1,
        }
        : {
          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }
    );

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      playNextSound();
    } else {
      setActiveQuestion(0);
      setShowResult(true);

      //play confetti or sound here....TODO

      const bonus = 5;

      // Prepare the payload for sending the score, also adding bonus of 5..
      const scorePayload = {
        score: result.score + bonus,
        showName: 'Gert', // Replace 'Gert' with the actual showName you want to save
        timestamp: new Date().toISOString(),
        userName: user?.username || "TriviaPlayer",
        userFirstName: user?.firstName || "TriviaPlayer",
        userPhoneNumber:user?.primaryPhoneNumber?.phoneNumber,
        userEmail: user?.primaryEmailAddress?.emailAddress || "Anonymous User",
        userLastName: user?.lastName || "TriviaPlayer"

      };

      try {
        // Call sendScore with the payload
        const response = await axios.post("/api/triviascore", { payload: scorePayload }); // Pass the payload as the 'payload' property


        console.log(response.data);
        playNotification();
        toast.success('Score saved successfully!');
        showSuccessToast();

      } catch (error: any) {
        console.error('Error sending score:', error);
        console.log(scorePayload);
        // toast.error('Oops! Something went wrong while saving the score.');
        showErrorToast();
      } finally {
        // Optionally, you can reload the page after sending the score
        router.refresh();
      }
    }
    setChecked(false);
  };




  interface TriviaScoreData {
    score: number;
    showName: string;
    timestamp: string;
    userName: string;
    userFirstName: string;
    userPhoneNumber:string;
    userEmail: string;
    userLastName: string;
  }

  async function sendScore(triviascore: TriviaScoreData) {
    const response = await fetch('/api/triviascore', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(triviascore)
    });

    if (!response.ok) {
      throw new Error("Here Here");
    }

    return await response.json();
  }




  // const overallPercentage = (result.correctAnswers / questions.length) * 100;
  const overallPercentage = Math.round((result.correctAnswers / questions.length) * 100);
  const totalAttemptedQuestion = result.wrongAnswers + result.correctAnswers;


  //main timer TODO..
  const initialTotalTime = 300;

  // const progressPercentage = (totalTimeRemaining / generateRandomTime()) * 100;
  const progressPercentage = (totalTimeRemaining / initialTotalTime) * 100;

  //for Confetti
  const { width, height } = useWindowSize()





  return (
    <div className="px-5 py-10 text-white select-none">
       <h1 className="text-2xl font-bold mb-2 text-center">Hi! {user?.username || "Friend"},</h1>
      <div className="mb-4 space-y-2 select-none">
        <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
          World-Trivia<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800"> Playground&trade;</span>
        </h2>
        <p className="text-zinc-500 font-medium text-sm md:text-lg text-center">
          Test your Knowledge on General Trivia Questions!
        </p>
        {/* <Button onClick={playNotification} variant={"admin"}>Test Audio</Button> */}
      </div>
      {loadingQuestions ? (
        <div className="flex items-center justify-center">
          <UserQuestionSpinner />
        </div>
      ) : (
        <>


          {questions.length > 0 && !showResult && (

            <div className='select-none'>
              <h2 className='text-black text-xs font-bold my-2'><span className='bg-gradient-to-r from-red-500 to-red-800 p-1 px-2 rounded-full'>Qn {activeQuestion + 1} of {questions.length} </span></h2>
              <h3 className='text-zinc-400 text-lg font-semibold mb-3'>{questions[activeQuestion].question}</h3>
              <div className="grid grid-cols-2 gap-1.5 md:grid-cols-2 lg:grid-cols-4">

                {questions[activeQuestion].options.map((option: any, idx: number) => (
                  <Card
                    key={idx}
                    onClick={() => onAnswerSelected(option, idx)}
                    className={
                      selectedAnswerIndex === idx
                        ? "flex flex-col items-center justify-center border-dashed bg-green-600/30 border-2 text-green-600 border-green-600 cursor-pointer rounded-lg font-bold transition animate-pulse"
                        : "flex flex-col items-center justify-center   border-dashed border-[#fffdfd38] bg-[#121212] text-zinc-300 cursor-pointer rounded-lg"
                    }
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                        {/* <p className={
                          selectedAnswerIndex === idx
                          ? "flex items-center text-sm text-green-400"
                          : "flex items-center text-sm"
                        }
                          >
                          Option {idx + 1}

                        </p> */}
                      </CardTitle>
                     




                    </CardHeader>
                    <CardContent>
                      <div className=" mb-4 justify-center flex">
                        
                          <div className="text-zinc-600 text-lg break-words overflow-hidden flex items-center">
                
  <CircleDashed size={10} className={selectedAnswerIndex === idx ? "mr-2 flex-shrink-0 mt-1 text-green-400": "mr-2 flex-shrink-0 mt-1"} />
 
            <p className={selectedAnswerIndex === idx ? "font-bold text-green-400": "font-bold"}>
                     
    {option.text.length > 20 ? `${option.text.substring(0, 20)}...` : option.text}
    
  </p>
                      </div> 
            
                      </div>


                    




                    </CardContent>
                  </Card>



                ))}
              </div>










              <div className='flex  items-center justify-center md:justify-end lg:justify-end mx-0 md:mx-0 mt-3'>

                {checked ? (

                  <Button onClick={nextQuestion} variant="admin" className='text-base text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 font-bold'>
                    {activeQuestion === questions.length - 1 ? 'Finish Trivia' : 'Next Question'}
                  </Button>
                ) : (
                  <Button disabled variant="admin" className='text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                    {activeQuestion === questions.length - 1 ? 'Finish Trivia' : 'Next Question'}
                  </Button>
                )}
              </div>

              <div className='flex items-center'>
                <Timer className='w-5 h-5 text-red-800' />
                <p className='font-medium text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 m-2 text-sm'>Time left: {totalTimeRemaining} Seconds</p>
              </div>

              <Progress
                className="h-3 bg-[#121212] rounded-sm"
                value={progressPercentage}
              />
            </div>
          )}

          {questions.length === 0 && !showResult && (

            <EmptyMusic label="Unfortunately, there isn't any Trivia Questions loaded yet! come back soon:)" />
          )}

          {showResult && (


            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 px-4 md:mt-10 select-none">

              {/* Adding a confetti.. */}
              <Confetti
                width={width}
                height={height}
                numberOfPieces={200}
              // tweenDuration={10}
              />
              <Card className='shadow-lg shadow-red-800/10'>
                <CardHeader className='text-xl text-zinc-400 text-center font-bold'>
                  ⚡You have Finished Daily Trivia Marathon!

                </CardHeader>

                <CardContent>

                  <div className='flex items-center justify-center mb-2'>

                    <div className=' rounded-lg '>
                      <div className='text-9xl tracking-normal text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 font-bold  space-y-4 '><CountUp end={result.score} /><span className='text-sm'>Pts.</span></div>

                    </div>


                  </div>
                  <div className='text-normal text-zinc-400 mr-5 mb-3 text-center'>🔔You got <span className='font-bold'><CountUp end={result.score} /> </span>Points on this run!</div>

                  <Separator className='my-2 bg-zinc-800' />
                  <div className='text-zinc-700 text-xs text-center'>Tip: Bonus Daily Trivia improves chances of you getting more daily points.</div>
                </CardContent>


                <CardFooter className='justify-center'>


                  <Button onClick={() => window.location.reload()} variant={'admin'} className='text-white text-sm font-bold'>

                    <Airplay className='mr-4 w-4 h-4' />Play Daily Bonus Trivia</Button>

                </CardFooter>
              </Card>
              <Card className='shadow-lg shadow-red-800/10'>
                <CardHeader className='text-xl text-zinc-400 text-center font-bold'>
                  Trivia Run Stats

                </CardHeader>

                <CardContent>
                  <div className='flex justify-center mb-3'>
                    <ScoreAvatar />

                  </div>
                  <div className='text-center text-white'>{user?.fullName}</div>

                  <div className='px-5'>

                    <div className='flex justify-between items-center text-normal text-sm text-zinc-400 space-y-2'>
                      <span>Overall Percentage</span>
                      <span>{overallPercentage}%</span>
                    </div>
                    <Separator className='bg-zinc-800' />
                    <div className='flex justify-between items-center text-normal text-sm text-zinc-400 space-y-2'>
                      <span>Total Trivia Question(s)</span>
                      <span> <CountUp end={questions.length} />.</span>
                    </div>
                    <Separator className=' bg-zinc-800' />
                    <div className='flex justify-between items-center text-normal text-sm text-zinc-400 space-y-2'>
                      <span>Total Attempted Questions:</span>
                      <span><CountUp end={totalAttemptedQuestion} />. </span>
                    </div>
                    <Separator className='bg-zinc-800' />
                    <div className='flex justify-between items-center text-normal text-sm text-zinc-400 space-y-2'>
                      <span>Incorrect Answers:</span>
                      <span><CountUp end={result.wrongAnswers} />. </span>
                    </div>
                    <Separator className='bg-zinc-800' />
                    <div className='flex justify-between items-center text-normal text-sm text-zinc-400 space-y-2'>
                      <span>Correct Answers:</span>
                      <span><CountUp end={result.correctAnswers} />. </span>
                    </div>
                    <Separator className='bg-zinc-800' />
                    <div className='flex justify-between items-center text-normal text-sm text-zinc-400 space-y-2'>
                      <span>Remarks:</span>
                      <span>{overallPercentage > 50 ? 'Good👍🏾' : 'Bad😞'} </span>
                    </div>


                    <Separator className='my-2 bg-zinc-800' />

                  </div>
                  <div className='text-zinc-700 text-xs text-center'>Tip: Bonus Daily Trivia improves chances of you getting more daily points.</div>
                </CardContent>



              </Card>


            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GertPage;
