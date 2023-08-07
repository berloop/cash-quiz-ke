import PuffLoader from "react-spinners/PuffLoader";
import RotateLoader from "react-spinners/RotateLoader";

export const Spinner = () => {
  return (
    <div className='h-screen flex item-center p-5 justify-center mt-5'>
    <RotateLoader 
    color="#8A1111"
   
     />
</div>
  );
};

