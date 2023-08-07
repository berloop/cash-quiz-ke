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
import { Spinner } from '@/components/spinner';






interface Result {
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const GertPage: React.FC = () => {
  
const {user} = useUser();
user?.fullName


  const [questions, setQuestions] = useState<any[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean>('');

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
      const questionsData = await getTriviaQuestions();
      setQuestions(questionsData);
      setLoadingQuestions(false);
    } catch (error) {
      console.error('Error Fetching Questions', error);
      setLoadingQuestions(false);
    }
  };

  // if (!questions || questions.length === 0) {
  //   return <Spinner />;
  // }

  const correctAnswer = questions[activeQuestion]?.answer;

  const onAnswerSelected = (option: string, idx: number) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
  
    if (option.trim() === correctAnswer.trim()) {
      setSelectedAnswer(option);
      console.log('Option Selected:',option)
      console.log('Correct Answer:',correctAnswer)
      console.log('Status:',true)
    } else {
      setSelectedAnswer(false);
      console.log('Option Selected:',option)
      console.log('Correct Answer:',correctAnswer)
      console.log('Status:',false)
    }
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
  } else {
    setActiveQuestion(0);
    setShowResult(true);

    // Prepare the payload for sending the score
    const scorePayload = {
      score: result.score,
      showName: 'Gert', // Replace 'Gert' with the actual showName you want to save
      timestamp: new Date().toISOString(),
      userName:user?.fullName || "Anonymous User",
      userFirstName:user?.firstName || "Anonymous User",
      userEmail:user?.primaryEmailAddress?.emailAddress || "Anonymous User",
      userLastName: user?.lastName || "Anonymous User"


    };

    try {
      // Call sendScore with the payload
      const response = await axios.post("/api/triviascore", { payload: scorePayload }); // Pass the payload as the 'payload' property

      
      console.log(response.data);
      toast.success('Score saved successfully!');
    } catch (error: any) {
      console.error('Error sending score:', error);
      console.log(scorePayload);
      toast.error('Oops! Something went wrong while saving the score.');
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
    userName:string;
    userFirstName:string;
    userEmail:string;
    userLastName:string;
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



  return (
    <div className="px-5 py-10 text-white">
      <h1 className="text-3xl font-bold mb-5 text-center">Hi, {user?.fullName || "Friend:)"}.</h1>
      <div className="mb-4 space-y-2">
        <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NdotoTrivia&trade;</span>
        </h2>
        <p className="text-white font-medium text-sm md:text-lg text-center">
          Play, Win, Repeat on Gert Trivia!
        </p>
      </div>
      {loadingQuestions ? (
        <div className="flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
      <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 font-bold'>Question {activeQuestion + 1} of {questions.length} </h2>

      {questions.length > 0 && !showResult && (
        <Card className="rounded-lg mt-5 border-red shadow-lg ">
          <CardHeader>
            <CardTitle className="text-zinc-400">
              {questions[activeQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="w-48 text-sm font-medium space-y-2 border border-black p-3 rounded-lg">
            {questions[activeQuestion].options.map((option: string, idx: number) => (

                <li key={idx}
                  onClick={() => onAnswerSelected(option, idx)}
                  className={selectedAnswerIndex === idx ? "px-4 py-2 border border-red-600 bg-[#121212] cursor-pointer rounded-sm font-bold transition animate-pulse" : "px-4 py-2 border border-black cursor-pointer"}>
                  <span className="text-base text-zinc-400">{option}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            {checked ? (
              <Button onClick={nextQuestion} variant="ndotored" className='text-base text-zinc-400 font-bold'>
                {activeQuestion === questions.length - 1 ? 'Finish Trivia' : 'Next Question'}
              </Button>
            ) : (
              <Button disabled variant="ndotored" className='text-base text-zinc-400 font-bold'>
                {activeQuestion === questions.length - 1 ? 'Finish Trivia' : 'Next Question'}
              </Button>
            )}
          </CardFooter>
        </Card>
      )}

      {showResult && (
        <Card className='mt-5'>
          <CardHeader>
            <CardTitle className='text-normal text-sm text-zinc-400'>
              You have Finished Today's Trivia!!
            </CardTitle>
            <CardContent>
              <div className='text-normal text-sm text-zinc-400 mr-5 mb-3'>Here's Your Stats!</div>
              <br></br>
              <div className='text-normal text-sm text-zinc-400 mr-5 space-y-4'>Overall {overallPercentage}%</div>
              <div className='text-normal text-sm text-zinc-400 mr-5 space-y-4'>Total Questions: {questions.length}</div>
              <div className='text-normal text-sm text-zinc-400 mr-5 space-y-4'>Total Score: {result.score}</div>
              <div className='text-normal text-sm text-zinc-400 mr-5 space-y-4'>Correct Answers: {result.correctAnswers}</div>
              <div className='text-normal text-sm text-zinc-400 mr-5 space-y-4'>Wrong Answers: {result.wrongAnswers}</div>
            </CardContent>
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

export default GertPage;
