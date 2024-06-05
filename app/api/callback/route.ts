// pages/api/callback/route.ts
import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';





export async function GET() {
    try {
               

        // REMOVING THE AUTHENTICATION
        // const { userId } = auth();

        // if (!userId) {
        //     return new NextResponse("You are an unauthorized user!", { status: 401 });
        // }

        const sampleData = [{
            "id": "clv3ohi3y0002ete8i6gi1jdm",
            "paymentStatus": "Paid",
            "amountPaid": 100,
            "paymentDate": "2024-04-19T11:12:15.612Z",
            "userId": "user_2VIHz6eyiVnB3L8pKoNuoxmoYdH",
            "userPhoneNumber": "+255754319689",
            "userEmail": "abdul@ndotomedia.com",
            "userName": "Jane Doe",
            "subscriptionMethod": "SMS",
            "expirationDate": "2024-04-19T11:12:15.612Z"
          },
        ]
    
        //TODO a logic to get data from Nigeria, Put that in the database.
         
        //TODO Logic...

        // Fetch all data from triviascore table....
        const userstats = await prismadb.triviaScore.findMany();
        // return NextResponse.json(userstats);
        return NextResponse.json(sampleData);

    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

