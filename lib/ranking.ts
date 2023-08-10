

export const getRankings = async () => {
    try {
        const response = await fetch('/api/leaderboard'); // Fetch data from the API route
        if (response.ok) {
            const questions = await response.json();
            console.log(questions);
            return questions;

        } else {
            console.error('Error fetching Rankings:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching Rankings:', error);
        return [];
    }
};

