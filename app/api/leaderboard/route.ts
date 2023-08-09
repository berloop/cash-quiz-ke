// pages/api/questions.js
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';





export async function GET() {
    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthorized User", { status: 401 });
        }

        // Fetch all data from triviascore table....
        const userstats = await prismadb.triviaScore.findMany();
        return NextResponse.json(userstats);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

