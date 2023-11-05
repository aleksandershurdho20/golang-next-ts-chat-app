import { createSlice, PayloadAction,createAsyncThunk } from "@reduxjs/toolkit";
import type { ListCourses as Course } from "../../types/Courses";
import type { RootState } from "../store/index";
import { get } from "../../utils/api";

const initialState: Course = {
  title: "",
  description: "",
  author_id: 0,
  price: 0,
  lessons: [
    {
      title: "",
      content: "",
    },
  ],

  quizes: [],
};

export const getCourse = createAsyncThunk(
  "courses/getCourse",
  async(id:string) => {
     const {data} = await get<{data:Course}>(`/course/${id}`)
     return data
  }
)

const course = createSlice({
  name: "course",
  initialState,
  extraReducers:(builder) =>{
    builder.addCase(getCourse.fulfilled,(state,action:PayloadAction<Course>) =>{

      return {
        ...state,
        ...action.payload
      }
    })
  },
  reducers: {
    handleFormChange: (
      state,
      action: PayloadAction<{name:string,value:string}>
    ) => {
      const { name, value } = action.payload;
      // state[name] = value;
      return {
        ...state,
        [name]: name === "price" ? parseInt(value) : value,
      };
    },

    addNewLessonFields: (state) => {
      state.lessons && state.lessons.push({ title: "", content: "" });
    },

    removeLessonFields: (state, action: PayloadAction<number>) => {
      state.lessons && state.lessons.splice(action.payload, 1);
    },
    handleLessons: (
      state,
      action: PayloadAction<{ name: string; value: string; index: number }>
    ) => {
      const { name, value, index } = action.payload;
      const lessonsArr = [...state.lessons];
      lessonsArr[index][name] = value;

      state.lessons = lessonsArr;
    },

    createNewQuiz: (state, action: PayloadAction<string>) => {
      state.quizes && state.quizes.push({ title: action.payload });
    },
    removeQuizTitle: (state, action: PayloadAction<number>) => {
      state.quizes && state.quizes.splice(action.payload, 1);
    },


    createNewQuestions: (state, action: PayloadAction<{ quizTitle: string; questionTitle: string }>) => {
      if (state.quizes) {
        const quizIndex = state.quizes.findIndex((quiz) => quiz.title === action.payload.quizTitle);
    
        if (quizIndex !== -1) {
          // Clone the specific quiz and add the new question to its questions array
          const updatedQuiz = {
            ...state.quizes[quizIndex],
            questions: [
              ...(state.quizes[quizIndex].questions || []), // Copy existing questions if they exist
              { title: action.payload.questionTitle },
            ],
          };
    
          // Create a new array with the updated quiz
          const updatedQuizes = [
            ...state.quizes.slice(0, quizIndex),
            updatedQuiz,
            ...state.quizes.slice(quizIndex + 1),
          ];
    
          // Return the updated state
          return {
            ...state,
            quizes: updatedQuizes,
          };
        }
      }
    
      return state; // Return the original state if quizes is undefined or if quizIndex is -1
    },


    // createNewQuestions: (state, action: PayloadAction<{ quizTitle: string; questionTitle: string }>) => {
    //   const { quizTitle, questionTitle } = action.payload;

    //   const quizIndex = state?.quizes?.findIndex((quiz) => quiz.title === quizTitle);

    //   if (quizIndex !== -1) {
    //     state?.quizes?.[quizIndex as number]?.questions?.push({ title: questionTitle });
    //   }
    // },

    // createNewQuestions: (state, action: PayloadAction<{ quizTitle: string; questionTitle: string }>) => {
    //   const { quizTitle, questionTitle } = action.payload;
    //   const quizIndex = state?.quizes?.findIndex((quiz) => quiz.title === quizTitle) as number;
      
    //   if (quizIndex !== -1) {
    //     const quiz = state?.quizes?.[quizIndex];
    //     const questions = quiz?.questions;

    //     if (!questions) {
    //       if (quiz) {
    //         quiz.questions = [];
    //       }
    //     } else {
    //       questions.push({ title: questionTitle });
    //     }
    //   }
    
    // },
    

    // addAnswerToQuestion: (state, action: PayloadAction<{ quizIndex: number; questionIndex: number; answerTitle: string,is_correct:boolean }>) => {
    //   const { quizIndex, questionIndex, answerTitle,is_correct } = action.payload;
    
    //   if (state && state.quizes && state.quizes[quizIndex] && state.quizes[quizIndex].questions) {
    //     const quiz = state.quizes[quizIndex];
    
    //     if (questionIndex >= 0 && questionIndex < (quiz.questions || []).length) {
    //       // Update the state immutably
    //       state?.quizes?.[quizIndex]?.questions?.[questionIndex]?.answers?.push({ title: answerTitle, is_correct });        }
    //   }
    // },

    addAnswerToQuestion: (state, action: PayloadAction<{ quizIndex: number; questionIndex: number; answerTitle: string,is_correct:boolean }>) => {
      const { quizIndex, questionIndex, answerTitle, is_correct } = action.payload;
    
      if (state?.quizes && quizIndex >= 0 && quizIndex < state.quizes.length) {
        const quiz = state.quizes[quizIndex];
    
        if (quiz?.questions && questionIndex >= 0 && questionIndex < quiz.questions.length) {
          const question = quiz.questions[questionIndex];
    
          if (!question.answers) {
            question.answers = [];
          }
    
          question.answers.push({ title: answerTitle, is_correct });
        }
      }
    },
    
    
    


    
    
  }
  
});

export const CourseSelector = (state: RootState) => state.course;
export const {
  handleFormChange,
  addNewLessonFields,
  removeLessonFields,
  handleLessons,
  createNewQuiz,
  removeQuizTitle,
  createNewQuestions,
  addAnswerToQuestion
} = course.actions;

export default course.reducer;
