import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { format, formatDistanceToNow } from "date-fns";
import enGB from "date-fns/locale/en-GB";


export const formatRelativeTime = (dateString: string) => {
  const date = new Date(dateString);
  const formattedRelativeTime = formatDistanceToNow(date, { locale: enGB });
  return formattedRelativeTime;
};

//formatting date..
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = format(date, "do MMM yyyy 'at' HH:mm'hrs'", {
    locale: enGB, // Import the required locale from date-fns
  });
  return formattedDate;
};

export const randomizePercentage = (randomNumber: number): string => {
  if (randomNumber < 1 || randomNumber > 2900) {
    throw new Error('Random number should be between 1 and 2900');
  }

  const percentage = (randomNumber / 100).toFixed(2);
  return `${percentage}%`;
};


export const showSuccessToast = () => {

  toast({
    className: "bg-[#121212] text-white border border-green-800 shadow-xl shadow-green-500/10",
    title: "Successfully saved your Trivia Score!",
    description: `Happy Trails above n' beyond!🎉😎`,


  });


};

export const showErrorToast = () => {
  toast({
    className: "bg-[#121212] text-white border border-red-800 shadow-xl shadow-red-500/10",
    title: "Uh! We got an issue while saving your score!",
    description: `Please try playing again yeah?!😟`,

  });
};


export const playNotification = () => {

  const audio = new Audio('/sound/score.mp3');
  audio.preload = 'auto';// Adjust the path
  audio.play();


};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};