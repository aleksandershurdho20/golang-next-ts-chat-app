import type { QuizAnswers ,SubmittedQuizData} from "@/types/Quiz";

export const addAnswerToSelectedAnswers = (submittedQuiz:SubmittedQuizData,data:QuizAnswers,quizID:number) =>{
    const points = 0;
    const result = data.is_correct
      ? points + 1
      : points != 0
      ? points - 1
      : 0;

    const quiz = {
      ...submittedQuiz,
      selected_answers: [
        ...(submittedQuiz.selected_answers || []), // Check for undefined and use an empty array if necessary
        {
          quiz_id: quizID,
          answer_id: data.ID as number,
          question_id: data.question_id as number,
          points: result,
        },
      ],
    };

    return quiz
}


export const hasSelectedMoreThanOneAnswer =(submittedQuiz:SubmittedQuizData,questionID:number) =>{
const filteredAnswers =
  submittedQuiz?.selected_answers &&
  submittedQuiz.selected_answers.filter(
    (answer) => answer.question_id == questionID
  ).length > 0;

  return filteredAnswers
}