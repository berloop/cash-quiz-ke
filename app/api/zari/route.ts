// pages/api/questions.js
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';





export async function GET() {
  try {


    // const questions = await prismadb.triviaQuestion.findMany();

    const questions = await prismadb.triviaQuestion.findMany({
      where: {
        showName: "Zari" // Specify the condition for filtering rows
      }
    });
    return NextResponse.json(questions);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};
