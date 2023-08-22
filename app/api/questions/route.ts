// pages/api/questions.js
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';



export const revalidate = 1;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {


    // const questions = await prismadb.triviaQuestion.findMany();

    const questions = await prismadb.triviaQuestion.findMany({
      where: {
        showName: "Gert" // Specify the condition for filtering rows
      }
    });
    return NextResponse.json(questions);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

