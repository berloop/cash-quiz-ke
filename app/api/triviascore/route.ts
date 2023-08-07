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
        const { payload } = body;
        
        // // //getting clerk user object...
        // const { user } = useUser();

        // const email = user?.primaryEmailAddress || "Unknown Email";



        if (!userId) {
            return new NextResponse("Unauthorized User", { status: 401 });
        }


        if (!payload) {
            return new NextResponse("User Score is required", { status: 400 });
        }

        const userScoreRecord = await prismadb.triviaScore.findUnique({
            where: {
                userId,
            
            }
        });

     
    
        if (userScoreRecord) {

            const existingScore = userScoreRecord.score; 
            await prismadb.triviaScore.update({
                where: { userId: userId },
                data: { 
                    score: existingScore + payload.score,
                    lastPlayedDate: new Date().toISOString()
                 },
            });
    
        } else {
            await prismadb.triviaScore.create({
                data: {
                  userId: userId as string,
                  score: payload.score,
                  showName: payload.showName,
                  firstPlayedDate: payload.timestamp,
                  userEmail: payload.userEmail,
                  userName: payload.userName,
                  userFirstName: payload.userFirstName,
                  userLastName: payload.userLastName,

                },
              });
        
    }

         const response = payload;



        return NextResponse.json("Data was successfully saved to the Database", response);
      
    }
    catch (error) {
        console.log("[CONVERSATION_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 })

    }
}