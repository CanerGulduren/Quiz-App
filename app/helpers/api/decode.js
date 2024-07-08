import { decode } from 'html-entities';

export async function decodeQuizData(data) {
    try {
        const decodedData = data.results.map(question => {
            return {
                ...question,
                question: decode(question.question),
                correct_answer: decode(question.correct_answer),
                incorrect_answers: question.incorrect_answers.map(answer => decode(answer)),
            };
        });

        return decodedData;
    } catch (error) {
        console.error("Error decoding quiz data:", error);
        throw error;
    }
}
