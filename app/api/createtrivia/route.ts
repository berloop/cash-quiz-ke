import prismadb from "@/lib/prismadb";
import { auth, useUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { date } from "zod";






export async function POST(
    req: Request
) {
    try {
        //check if user is authenticated...
        const { userId } = auth();
        const body = await req.json();
        const { triviaPayload } = body;
        

        if (!userId) {
            return new NextResponse("Unauthorized User", { status: 401 });
        }


        if (!triviaPayload) {
            return new NextResponse("Trivia Question Payload is required", { status: 400 });
        }
        else{
            await prismadb.triviaQuestion.create({
                data: {
                  question:triviaPayload.question,
                  options:triviaPayload.options,
                  answer:triviaPayload.answer,
                  showName:triviaPayload.showName
    
                },
              });
        }

         const response = triviaPayload;

        return NextResponse.json("Data was successfully saved to the Database", response);
      
    }
    catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 })

    }
}