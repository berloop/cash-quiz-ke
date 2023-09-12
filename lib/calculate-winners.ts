/**
 * Calculate the top N winners based on their scores in an array of rankings.
 *
 * @param {number[]} rankings - An array of ranking objects, each containing a 'score' property.
 * @param {number} N - The number of top winners to calculate.
 * @returns {number[]} An array containing the top N scores.
 */
export const calculateWinners = (rankings: { score: number }[], N: number): number[] => {
    // Extract the scores from the rankings
    const scores = rankings.map((ranking) => ranking.score);
  
    // Sort the scores in descending order
    const sortedScores = scores.sort((a, b) => b - a);
  
    // Take the top N scores
    const topWinners = sortedScores.slice(0, N);

    //if you want to get top 2 winners, N should be 2.

  
    return topWinners;
  };
  


