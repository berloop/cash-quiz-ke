// import { auth } from "@clerk/nextjs";


// import prismadb from "@/lib/prismadb";
// import { MAX_FREE_COUNTS } from "@/constants";


// export const increaseApiLimit = async () => {
//     const { userId } = auth();

//     if (!userId) {
//         return;
//     }

//     const userApiLimit = await prismadb.userApiLimit.findUnique({
//         where: {
//             userId
//         }
//     });

//     if (userApiLimit) {
//         await prismadb.userApiLimit.update({
//             where: { userId: userId },
//             data: { count: userApiLimit.count + 1 },
//         });

//     } else {
//         await prismadb.userApiLimit.create({
//             data: { userId: userId, count: 1 }
//         });
//     }
// }

// //lets check the user reached the limit of trial

// export const checkApiLimit = async () => {
//     const { userId } = auth();

//     if (!userId) {
//         return false;
//     }

//     const userApiLimit = await prismadb.userApiLimit.findUnique({
//         where: {
//             userId: userId
//         }
//     });


//     if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) {

//         //continue to use Fumar.ai tools
//         return true;
//     }
//     else {
//         //blocks them from using Fumar.ai tools..
//         return false;
//     }

// };


//  export const getApiLimitCount = async () => {
//     const { userId } = auth();

//     if(!userId){
//         return 0
//     }

//     const userApiLimit = await prismadb.userApiLimit.findUnique({
//         where:{
//             userId
//         }
//     });

//     if(!userApiLimit){
//         return 0
//     }

//     return userApiLimit.count;

//  }