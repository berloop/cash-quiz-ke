// // pages/api/questions.js
// import axios from 'axios';
// import { NextResponse } from 'next/server';
// import he from 'he';

// // MUST ADD TO MARK THE PAGE DYNAMIC...
// export const revalidate = 1;
// export const dynamic = 'force-dynamic';

// export async function GET() {
//   try {
//     // Fetch trivia questions from the OpenTrivia API
//     const response = await axios.get(
//       'https://opentdb.com/api.php?amount=5&type=multiple'
//       // Adjust the URL and query parameters as needed
//     );

//     if (response.data.results) {
//       const transformedQuestions = response.data.results.map((questionData: { question: any; correct_answer: any; incorrect_answers: any[]; }, index: any) => {
//         // Decode HTML entities in the question using he.decode
//         const decodedQuestion = he.decode(questionData.question);
//         const decodedAnswer: string = he.decode(questionData.correct_answer);


//         // Transform each question data into the desired format
//         const transformedQuestion = {
//           id: `question-${index}`,
//           question: decodedQuestion, // Use the decoded question
//           options: [
//             { text: decodedAnswer, image: 'https://res.cloudinary.com/dkrzgcqla/image/upload/v1692866237/cld-sample-5.jpg' },
//             ...questionData.incorrect_answers.map((incorrectAnswer) => ({
//               text: incorrectAnswer,
//               image: 'https://res.cloudinary.com/dkrzgcqla/image/upload/v1692866237/cld-sample-5.jpg',
//             })),
//           ],
//           answer: decodedAnswer,
//           showName: 'General', // Set your showName here
//         };
//         return transformedQuestion;
//       });

//       return NextResponse.json(transformedQuestions);


//     } else {
//       console.error('Invalid response from OpenTrivia API:', response.data);
//       return new NextResponse("Error fetching questions", { status: 500 });
//     }
//   } catch (error) {
//     console.error('Error fetching questions', error);
//     return new NextResponse("Internal Error", { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const questionsFilePath = path.join(process.cwd(), 'public/data/bible.json');

export async function GET() {
  try {
    // Read the questions from the JSON file
    const questionsData = fs.readFileSync(questionsFilePath, 'utf8');
    const questions = JSON.parse(questionsData);

    if (questions && Array.isArray(questions)) {
      return NextResponse.json(questions);
    } else {
      console.error('Invalid data in questions.json');
      return new NextResponse("Error fetching questions", { status: 500 });
    }
  } catch (error) {
    console.error('Error reading questions.json', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
