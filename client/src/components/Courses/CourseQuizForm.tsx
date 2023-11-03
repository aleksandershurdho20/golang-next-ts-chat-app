import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  CourseSelector,
  createNewQuiz,
  removeQuizTitle,
  createNewQuestions,
  addAnswerToQuestion,
} from "../../redux/slices/course";
import TextField from "../TextField/Index";
import { Eye, Plus, Trash } from "react-feather";
import useToogle from "../../hooks/useToogle";
import Drawer from "react-modern-drawer";
import type { Quiz } from "../../types/Quiz";
export default function CourseQuizForm() {
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | undefined>(undefined);
  const [selectedQuizQuestions, setSelectedQuizQuestions] =
    useState<any>(undefined); //TODO:Setup Type

  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [answerTitle, setAnswerTitle] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const quizData = useAppSelector(CourseSelector);
  const dispatch = useAppDispatch();
  const { isOpened, handleToogle } = useToogle();

  const quizIndex = quizData?.quizes?.findIndex(
    (quiz) => quiz.title == selectedQuiz?.title
  ) as number;
  const questionData = quizData.quizes?.[quizIndex as number]?.questions;
  useEffect(() => {
    setSelectedQuizQuestions(questionData);
    setQuestionNumber((questionData?.length as number) - 1);
  }, [questionData]);

  const handleNewQuiz = () => {
    dispatch(createNewQuiz(quizTitle));
    setQuizTitle("");
  };

  const removeQuiz = (index: number) => dispatch(removeQuizTitle(index));
  const viewQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    handleToogle();
  };

  const addNewQuestion = () => {
    dispatch(
      createNewQuestions({
        quizTitle: selectedQuiz?.title as string,
        questionTitle,
      })
    );
    setQuestionTitle("");
  };

  const addAnser = () => {
    dispatch(
      addAnswerToQuestion({
        quizIndex,
        questionIndex: questionNumber,
        answerTitle,
        is_correct: isCorrect,
      })
    );
    setAnswerTitle("");
    setIsCorrect(false);
  };

  return (
    <div className="row">
      <h3 className="mb-3 text-muted">Create Quiz</h3>
      <div className="col-md-10">
        <TextField
          type="text"
          wrapperClassname="mb-3"
          label="Quiz Title"
          id="title"
          placeholder="title"
          name="title"
          value={quizTitle}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuizTitle(e.target.value)
          }
        />
      </div>
      <div className="col-md-2">
        <button
          className="btn btn-light rounded-circle btn-sm "
          style={{ width: 50, height: 50 }}
          onClick={handleNewQuiz}
          disabled={quizTitle == ""}
        >
          <Plus color="green" />
        </button>
      </div>
      {quizData.quizes &&
        quizData.quizes.map((quiz, index) => (
          <div className="row mt-2 mb-3 align-items-center" key={index}>
            <div className="col-md-8">
              <h4>{quiz.title}</h4>
            </div>
            <div className="col-md-4">
              <button
                className="btn btn-light rounded-circle btn-sm mx-4 "
                style={{ width: 50, height: 50 }}
                onClick={() => viewQuiz(quiz)}
              >
                <Eye color="#000" />
              </button>
              <button
                className="btn btn-light rounded-circle btn-sm "
                style={{ width: 50, height: 50 }}
                onClick={() => removeQuiz(index)}
              >
                <Trash color="#ff7171" />
              </button>
            </div>
            <hr className="hr " />
          </div>
        ))}
      <Drawer
        open={isOpened}
        onClose={handleToogle}
        direction="right"
        size={600}
      >
        <div className="px-4 py-4">
          <h3 className="text-muted">{selectedQuiz?.title}</h3>
          <hr />
          <div className="row">
            <div className="col">
              <TextField
                type="text"
                wrapperClassname="mb-3"
                label="Question Title"
                id="title"
                placeholder="title"
                name="title"
                value={questionTitle}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setQuestionTitle(e.target.value)
                }
              />
            </div>
            <div className="col">
              <button
                className="btn btn-light rounded-circle btn-sm "
                style={{ width: 50, height: 50 }}
                onClick={addNewQuestion}
                disabled={questionTitle == ""}
              >
                <Plus color="green" />
              </button>
            </div>
          </div>
          {questionData && questionData.length > 0 && (
            <div className="row">
              <div className="col">
                <TextField
                  type="text"
                  wrapperClassname="mb-3"
                  label="Answer Title"
                  id="title"
                  placeholder="title"
                  name="title"
                  value={answerTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAnswerTitle(e.target.value)
                  }
                />
              </div>
              <div className="col">
                <div className="d-flex align-items-center">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={isCorrect}
                      id="flexCheckDefault"
                      onChange={(e) => setIsCorrect(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexCheckDefault"
                    >
                      Correct Answer?
                    </label>
                  </div>

                  <button
                    className="btn btn-light rounded-circle btn-sm ms-auto"
                    style={{ width: 50, height: 50 }}
                    onClick={addAnser}
                    disabled={answerTitle == ""}
                  >
                    <Plus color="green" />
                  </button>
                </div>
              </div>
            </div>
          )}
          <hr />
          {questionData?.[questionNumber] && (
            <span className="text-muted">
              Question {questionNumber + 1 || ""}
            </span>
          )}

          <h2 className="fw-bold mt-2 mb-3">
            {selectedQuizQuestions?.[questionNumber as number]?.title}
          </h2>

          <div className="row">
            {selectedQuizQuestions?.[questionNumber as number]?.answers?.map(
              (answer, index: number) => (
                <div className="col-md-6 mb-3" key={index}>
                  <div className="chip">
                    <span className="ms-2 lh-1 fs-4">{answer.title}</span>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="quiz-actions mt-5">
            {questionData?.length == questionNumber ? (
              <>
                <span className="mb-5 fs-5">No more questions!</span> <br />
                <button
                  className="btn btn-dark"
                  onClick={() => {
                    handleToogle();
                    setQuestionNumber(0);
                  }}
                >
                  Back To course Creation
                </button>
                <button
                  onClick={() => setQuestionNumber(questionNumber - 1)}
                  disabled={questionNumber == 0}
                  className="ms-2 btn btn-light"
                >
                  Previous Question
                </button>{" "}
              </>
            ) : (
              <>
                {" "}
                <button
                  onClick={() => setQuestionNumber(questionNumber + 1)}
                  className="me-3 btn btn-dark"
                >
                  Next
                </button>
                <button
                  onClick={() => setQuestionNumber(questionNumber - 1)}
                  disabled={questionNumber == 0}
                  className="ms-2"
                >
                  Previous
                </button>{" "}
              </>
            )}
            {/* {quizData?.questions?.length == questionNumber ? (
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
            )} */}
          </div>
        </div>
      </Drawer>
    </div>
  );
}
