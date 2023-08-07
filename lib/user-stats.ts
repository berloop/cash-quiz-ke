

export const getUserStats = async () => {
    try {
      const response = await fetch('/api/userstats'); // Fetch data from the API route
      if (response.ok) {
        const questions = await response.json();
        console.log(questions);
        return questions;
      
      } else {
        console.error('Error fetching User Stats:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching User Stats:', error);
      return [];
    }
  };
  
