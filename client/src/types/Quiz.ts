type QuizAnswers ={
    title:string,
    is_correct:boolean
}
export type QuizQuestions = {
    title:string,
    answers?:QuizAnswers[]
}

export type Quiz = {
    title:string,
    course_id?:number
    questions?: QuizQuestions[]
}