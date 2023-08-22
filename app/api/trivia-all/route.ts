// pages/api/questions.js
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';



//MUST ADD TO MARK THE PAGE DYNAMIC...
export const revalidate = 1;
export const dynamic = 'force-dynamic';

export async function GET() {
  try {


    // const questions = await prismadb.triviaQuestion.findMany();

    const questions = await prismadb.triviaQuestion.findMany();
    return NextResponse.json(questions);

  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

