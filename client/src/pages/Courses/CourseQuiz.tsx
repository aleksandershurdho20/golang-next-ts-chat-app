import React, { useState } from "react";

import { Quiz } from "../../types/Quiz";
import useToogle from "../../hooks/useToogle";
import Drawer from "react-modern-drawer";

type Props = {
  quizes: Quiz[];
};
export default function CourseQuiz({ quizes }: Props) {
  const { isOpened, handleToogle } = useToogle();
  const [quizData, setQuizData] = useState<Quiz | undefined>(undefined);
  const [questionNumber, setQuestionNumber] = useState<number>(0);

  const handleNextQuestion = () => setQuestionNumber(questionNumber + 1);
  const handlePreviousQuestion = () => setQuestionNumber(questionNumber - 1);

  const handleQuizSelect = (data: Quiz) => {
    handleToogle();
    setQuizData(data);
  };

  const handleDrawerClose = () => {
    handleToogle();
    setQuestionNumber(0);
    setQuizData(undefined);
  };

  return (
    <>
      <div className="mt-5">
        {quizes.map((quiz) => (
          <div className="d-flex justify-content-between mb-3">
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
            {quizData?.questions?.[questionNumber]?.answers?.map(
              (answer, index) => (
                <div className="col" key={index}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      defaultValue=""
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
              <button>Finish</button>
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
