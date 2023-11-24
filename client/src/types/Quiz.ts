export type QuizAnswers ={
    ID?:number
    title:string,
    is_correct:boolean
    question_id?:number
}
export type QuizQuestions = {
    ID?:number
    title:string,
    answers?:QuizAnswers[]
}

export type Quiz = {
    ID?:number
    title:string,
    course_id?:number
    questions?: QuizQuestions[]
}


type SelectedAnswers ={
    quiz_id:number,
    question_id:number,
    answer_id:number,
    points:number,


}

export type SubmittedQuizData ={
    course_id:number,
    professor_id:number,
    student_id:number,
    grade:number,
    selected_answers?:SelectedAnswers[]

}