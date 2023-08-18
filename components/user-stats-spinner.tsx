import PuffLoader from "react-spinners/PuffLoader";
import RotateLoader from "react-spinners/RotateLoader";
import { Skeleton } from "@/components/ui/skeleton";
import BarLoader from "react-spinners/BarLoader"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatDate, formatRelativeTime } from "@/lib/functions";
import { BarChart2, CalendarDays, CalendarCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UserAvatar } from "./user-avatar";


export const UserStatsSpinner = () => {
    return (

        <div className="p-5 w-full">
            <div className='flex item-center p-5 justify-center'>  <BarLoader 
    color="#8A1111"
   
     /></div>
         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                  <Skeleton className="h-8 w-[150px] bg-zinc-800" />
                  </CardTitle>

              
                    <Skeleton className="h-8 w-8 bg-zinc-800" />
                </CardHeader>
                <CardContent>
                  <div className=" mb-4 justify-center flex">
                  <Skeleton className="h-[120px] w-full bg-zinc-800" />
                  </div>

                  <div className="text-2xl font-bold text-white text-center"> <Skeleton className="h-8 w-full bg-zinc-800" /></div>
                 
                  <Skeleton className="mt-3 h-8 w-full bg-zinc-800" />
                 

                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                  <Skeleton className="h-8 w-[150px] bg-zinc-800" />
                  </CardTitle>

              
                    <Skeleton className="h-8 w-8 bg-zinc-800" />
                </CardHeader>
                <CardContent>
                  <div className=" mb-4 justify-center flex">
                  <Skeleton className="h-[120px] w-full bg-zinc-800" />
                  </div>

                  <div className="text-2xl font-bold text-white text-center"> <Skeleton className="h-8 w-full bg-zinc-800" /></div>
                 
                  <Skeleton className="mt-3 h-8 w-full bg-zinc-800" />
                 

                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                  <Skeleton className="h-8 w-[150px] bg-zinc-800" />
                  </CardTitle>

              
                    <Skeleton className="h-8 w-8 bg-zinc-800" />
                </CardHeader>
                <CardContent>
                  <div className=" mb-4 justify-center flex">
                  <Skeleton className="h-[120px] w-full bg-zinc-800" />
                  </div>

                  <div className="text-2xl font-bold text-white text-center"> <Skeleton className="h-8 w-full bg-zinc-800" /></div>
                 
                  <Skeleton className="mt-3 h-8 w-full bg-zinc-800" />
                 

                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                  <Skeleton className="h-8 w-[150px] bg-zinc-800" />
                  </CardTitle>

              
                    <Skeleton className="h-8 w-8 bg-zinc-800" />
                </CardHeader>
                <CardContent>
                  <div className=" mb-4 justify-center flex">
                  <Skeleton className="h-[120px] w-full bg-zinc-800" />
                  </div>

                  <div className="text-2xl font-bold text-white text-center"> <Skeleton className="h-8 w-full bg-zinc-800" /></div>
                 
                  <Skeleton className="mt-3 h-8 w-full bg-zinc-800" />
                 

                </CardContent>
              </Card>
            
            </div>
        </div>
    );
};

