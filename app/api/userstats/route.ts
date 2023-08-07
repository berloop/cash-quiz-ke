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


        // Fetch user stats for the authenticated user
        const userstats = await prismadb.triviaScore.findMany({
            where: {
                userId: userId as string,
            },
        });

      
        return NextResponse.json(userstats);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

