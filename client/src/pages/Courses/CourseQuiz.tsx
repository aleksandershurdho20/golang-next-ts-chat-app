import { useState } from "react";

import { Quiz, SubmittedQuizData, QuizAnswers } from "../../types/Quiz";
import useToogle from "../../hooks/useToogle";
import Drawer from "react-modern-drawer";
import { UserSelector } from "@/redux/slices/user";
import { useAppSelector } from "@/hooks/redux";
import {
  addAnswerToSelectedAnswers,
  hasSelectedMoreThanOneAnswer,
} from "@/helpers/quiz";
import { api } from "@/utils/api";
import toast from "react-hot-toast";

type Props = {
  quizes: Quiz[];
};

export default function CourseQuiz({ quizes }: Props) {
  const { isOpened, handleToogle } = useToogle();

  const { user } = useAppSelector(UserSelector);

  const [quizData, setQuizData] = useState<Quiz | undefined>(undefined);

  const [submittedQuiz, setSubmittedQuiz] = useState<SubmittedQuizData>({
    course_id: quizData?.course_id as number,
    professor_id: 0,
    student_id: user?.ID as number,
    selected_answers: [
      // {
      //   quiz_id: quizData?.ID as number,
      //   answer_id: 0,
      //   question_id: 0,
      //   points: 0,
      // },
    ],
    grade: 0,
  });
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const handleNextQuestion = () => setQuestionNumber(questionNumber + 1);
  const handlePreviousQuestion = () => setQuestionNumber(questionNumber - 1);

  const handleQuizSelect = (data: Quiz) => {
    handleToogle();
    setQuizData(data);
  };

  const handleAnswerSelect = (
    data: QuizAnswers,
    { target }: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { checked } = target;
    const questionID = quizData?.questions?.[questionNumber]?.ID as number;

    const filteredSelectedAnswers = hasSelectedMoreThanOneAnswer(
      submittedQuiz,
      questionID
    );
    if (checked && !filteredSelectedAnswers) {
      const quiz = addAnswerToSelectedAnswers(
        submittedQuiz,
        data,
        quizData?.ID as number
      );

      setSubmittedQuiz(quiz);
    } else {
      const filteredAnsers = submittedQuiz?.selected_answers?.filter(
        (answer) => answer.answer_id != data.ID
      );
      setSubmittedQuiz({ ...submittedQuiz, selected_answers: filteredAnsers });
    }
  };

  const handleDrawerClose = () => {
    handleToogle();
    setQuestionNumber(0);
    setQuizData(undefined);
  };

  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const totalPoints = submittedQuiz?.selected_answers?.reduce((acc, curr) => {
      return acc + curr.points;
    }, 0);

    const params = {
      ...submittedQuiz,
      grade: totalPoints,
      course_id: parseInt(quizData?.course_id),
      professor_id: 15,
    };
    api
      .post(`grade`, params)
      .then(() => {
        toast.success("Sucessfully submited!");
      })
      .catch((err) => err);
  };

  return (
    <>
      <div className="mt-5">
        {quizes.map((quiz, i) => (
          <div className="d-flex justify-content-between mb-3" key={i}>
            <h4> {quiz.title}</h4>
            <button
              className="btn btn-sm btn-light"
              onClick={() => handleQuizSelect(quiz)}
            >
              Take Quiz
            </button>
          </div>
        ))}
      </div>
      <Drawer
        open={isOpened}
        onClose={handleDrawerClose}
        direction="right"
        size={600}
      >
        <div className="px-4 py-4">
          <h3 className="text-muted">{quizData?.title || ""}</h3>
          <hr />
          <h2 className=" fw-bold">
            {quizData?.questions && quizData?.questions[questionNumber]?.title}
          </h2>
          <div className="row">
            {quizData?.questions?.length != questionNumber && (
              <div className="mb-3 mt-3 bg-light py-3">
                <span className="text-muted">
                  Only one answer is allowed to be selected
                </span>
              </div>
            )}

            {quizData?.questions?.[questionNumber]?.answers?.map(
              (answer, index) => (
                <div className="col" key={index}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      value={index}
                      checked={
                        submittedQuiz?.selected_answers &&
                        submittedQuiz?.selected_answers?.filter(
                          (ans) => ans?.answer_id === answer?.ID
                        )?.length > 0
                          ? true
                          : false
                      }
                      onChange={(e) => handleAnswerSelect(answer, e)}
                      type="checkbox"
                      id={`flexCheckDefault-${index}`}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`flexCheckDefault-${index}`}
                    >
                      {answer.title}
                    </label>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="quiz-actions d-flex mt-5">
            {quizData?.questions?.length == questionNumber ? (
              <button onClick={handleSubmitQuiz}>Finish</button>
            ) : (
              <>
                <button
                  onClick={handleNextQuestion}
                  className="me-3 btn btn-dark"
                >
                  Next
                </button>
                <button
                  onClick={handlePreviousQuestion}
                  disabled={questionNumber == 0}
                  className="ms-2"
                >
                  Previous
                </button>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </>
  );
}
