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

  
    