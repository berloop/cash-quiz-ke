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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { UserAvatar } from "./user-avatar";


export const UserQuestionSpinner = () => {
    return (

        <div className="p-2 w-full">
            <div className='flex item-center p-5 justify-center'>  
            <BarLoader  width={150}
    color="#8A1111" 
   
     /></div>
         <div className="">
             
              <Card className="rounded-lg border-red shadow-lg">
                <CardHeader>
                  <CardTitle className="text-zinc-400 flex justify-center items-center">
                  <Skeleton className="h-8 w-full bg-zinc-800" />

                  </CardTitle>
                 
                </CardHeader>
                <CardContent>
                  
                    
                  <Skeleton className="h-8 w-full mt-3 bg-zinc-800" />
                  <Skeleton className="h-16 w-full mt-3  bg-zinc-800" />
                 
                  
                     
                   
                
                </CardContent>
                <CardFooter>
                <Skeleton className="h-24 w-full bg-zinc-800" />
                </CardFooter>
              </Card>
              
             
            
            </div>
        </div>
    );
};

