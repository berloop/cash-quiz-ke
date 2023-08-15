import PuffLoader from "react-spinners/PuffLoader";
import RotateLoader from "react-spinners/RotateLoader";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const AdminSpinner = () => {
    return (

        <div className="p-5 ">
            <Table className='shadow-lg'>
                <TableHeader>
                    <TableRow className='bg-[#1F1D1D] rounded-lg shadow-lg border-2 border-[#353434]'>
                        <TableHead className='text-left border-r border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                        <Skeleton className="h-6 w-[150px] bg-zinc-700" />
                        </TableHead>
                        <TableHead className='text-center border-l border-white/10 font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800'>
                        <Skeleton className="h-6 w-[150px] bg-zinc-700" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow className='border-white/10'>
                        <TableCell colSpan={1} className="h-1 w-1 border-r border-white/10 text-zinc-400">    <Skeleton className="h-6 w-[150px] bg-zinc-700" /> </TableCell>
                        <TableCell colSpan={1} className="h-1 w-1 text-center text-zinc-400 font-bold"><Skeleton className="h-6 w-[150px] bg-zinc-700" />
                        </TableCell>
                    </TableRow>
                    <TableRow className='border-white/10'>
                        <TableCell colSpan={1} className="h-1 w-1 border-r border-white/10 text-zinc-400">    <Skeleton className="h-6 w-[150px] bg-zinc-700" /> </TableCell>
                        <TableCell colSpan={1} className="h-1 w-1 text-center text-zinc-400 font-bold"><Skeleton className="h-6 w-[150px] bg-zinc-700" />
                        </TableCell>
                    </TableRow>
                    <TableRow className='border-white/10'>
                        <TableCell colSpan={1} className="h-1 w-1 border-r border-white/10 text-zinc-400">    <Skeleton className="h-6 w-[150px] bg-zinc-700" /> </TableCell>
                        <TableCell colSpan={1} className="h-1 w-1 text-center text-zinc-400 font-bold"><Skeleton className="h-6 w-[150px] bg-zinc-700" />
                        </TableCell>
                    </TableRow>
                    <TableRow className='border-white/10'>
                        <TableCell colSpan={1} className="h-1 w-1 border-r border-white/10 text-zinc-400">    <Skeleton className="h-6 w-[150px] bg-zinc-700" /> </TableCell>
                        <TableCell colSpan={1} className="h-1 w-1 text-center text-zinc-400 font-bold"><Skeleton className="h-6 w-[150px] bg-zinc-700" />
                        </TableCell>
                    </TableRow>
                    <TableRow className='border-white/10'>
                        <TableCell colSpan={1} className="h-1 w-1 border-r border-white/10 text-zinc-400">    <Skeleton className="h-6 w-[150px] bg-zinc-700" /> </TableCell>
                        <TableCell colSpan={1} className="h-1 w-1 text-center text-zinc-400 font-bold"><Skeleton className="h-6 w-[150px]  bg-zinc-700 " />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

