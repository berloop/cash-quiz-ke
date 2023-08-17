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
import { Spinner } from "../spinner";

export const AdminNavbarSpinner = () => {
    return (

        <div className="p-5 w-full">
            <div className='flex item-center p-5 justify-center'>  <BarLoader 
    color="#8A1111"
   
     /></div>
        
           
        </div>
    );
};

