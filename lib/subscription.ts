// import { auth } from "@clerk/nextjs";

// import prismadb from "@/lib/prismadb";

// const DAY_IN_MS = 86_400_000;
// //one day in  milliseconds...

// //this util checks if the current user is a pro-sub..

// export const checkSubscription = async () => {
//   const { userId } = auth();

//   if (!userId) {
//     return false;
//   }

//   const userSubscription = await prismadb.userSubscription.findUnique({
//     where: {
//       userId: userId,
//     },
//     select: {
//       stripeSubscriptionId: true,
//       stripeCurrentPeriodEnd: true,
//       stripeCustomerId: true,
//       stripePriceId: true,
//     },
//   })

//   if (!userSubscription) {
//     return false;
//     //if not sub.....
//   }

//   const isValid =
//     userSubscription.stripePriceId &&
//     userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
//            //if sub, check if subscription is valid and not expired....
//   return !!isValid;
// };