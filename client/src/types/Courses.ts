import {Lesson} from './Lessons'
import { Quiz } from './Quiz'
export type lessonsFormData = {
    title:string,
    content:string
}
export type Form =  {
    author_id:number,

    title:string,
    description:string,
    price:number,
    lessons:Lesson[]
}


export type CourseFormProps ={
    handleSubmit :() => void,
    handleFormChange:(e:React.ChangeEvent<HTMLInputElement>) => void
    addLesson:() => void
    handleRemoveLessonFields:(index:number) => void
    handleLessonsChange:(e:React.ChangeEvent<HTMLInputElement>,index:number) => void
}

export type ListCourses = {
    ID?: number,
    CreatedAt?: string,
    UpdatedAt?: string,
    DeletedAt?: string | null,
    title: string,
    // desc: string,
    description: string,

    author_id: number,
    price: number
    lessons?:Lesson[]
    quizes?:Quiz[]
}