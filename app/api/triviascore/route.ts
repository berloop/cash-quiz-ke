import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";




export async function POST(
  req: Request
) {
  try {
    //check if user is authenticated...
    const { userId } = auth();
    const body = await req.json();
    const { payload } = body;

    if (!userId) {
      return new NextResponse("Unauthorized User", { status: 401 });
    }


    if (!payload) {
      return new NextResponse("User Score is required", { status: 400 });
    }

    const response = payload;

    // Save the payload along with the user ID in the database
    const userScoreData = await prismadb.triviaScore.create({
      data: {
        userId: userId as string,
        score: payload.score,
        showName: payload.showName,
        timestamp: payload.timestamp,
      },
    });



    return NextResponse.json("Here is your payload", response);

  }
  catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 })

  }
}