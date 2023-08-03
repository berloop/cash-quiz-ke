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

const GertPage = () => {
  const [questions, setQuestions] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  useEffect(() => {
    fetchQuestions();

  }, []);

  const fetchQuestions = async () => {
    const questionsData = await getTriviaQuestions();
    setQuestions(questionsData);


  };


  // Check if the questions array is empty or undefined
  if (!questions || questions.length === 0) {
    return <div className='text-white m-3'>Loading...</div>;
  }

  // const correctAnswer = questions[activeQuestion];
  const correctAnswer = questions[activeQuestion]?.answer;

  //select and check answer..
  const onAnswerSelected = (option, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);

    if (option.trim() === correctAnswer.trim()) {
      setSelectedAnswer(true);
      console.log(correctAnswer);
      console.log(option);
      console.log('true');
    } else {
      setSelectedAnswer(false)

      console.log(correctAnswer);
      console.log(option);
      console.log('false');
    }

  };


  //calculate score and increment to the next question....

  const nextQuestion = () => {

    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer ?
        {
          ...prev,
          score: prev.score + 5,
          correctAnswers: prev.correctAnswers + 1
        } : {

          ...prev,
          wrongAnswers: prev.wrongAnswers + 1,
        }
    );

    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  }





  return (
    <div className="px-5 py-10 text-white">
      <h1 className="text-3xl font-bold mb-5 text-center">This is Gert Trivia! Welcome</h1>


      <div className="mb-4 space-y-2">
        <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
          Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">NdotoTrivia&trade;</span>
        </h2>
        <p className="text-white font-medium text-sm md:text-lg text-center">
          Play, Win, Repeat!
        </p>
      </div>

      <h2 className='text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800 font-bold'>Question {activeQuestion + 1} of {questions.length} </h2>

      {questions.length > 0 && !showResult && (
        // If there are questions and the quiz is not finished...
        <Card className="rounded-lg mt-5 border-red shadow-lg ">
          <CardHeader>
            <CardTitle className="text-zinc-400">
              {questions[activeQuestion].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="w-48 text-sm font-medium space-y-2 border border-black p-3 rounded-lg bg-[#ed2324]">
              {questions[activeQuestion].options.map((option, idx) => (
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
              <div className='text-normal text-sm text-zinc-400 mr-5 space-y-4'>Overall {(result.score / 25) * 100}%</div>
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
    </div>
  );
};

export default GertPage;
