

export const getTriviaQuestions = async () => {
    try {
      const response = await fetch('/api/questions'); // Fetch data from the API route
      if (response.ok) {
        const questions = await response.json();
        console.log(questions);
        return questions;
      
      } else {
        console.error('Error fetching trivia questions:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error fetching trivia questions:', error);
      return [];
    }
  };
  
