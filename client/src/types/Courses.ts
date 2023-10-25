import {Lesson} from './Lessons'
import { Quiz } from './Quiz'
export type Form =  {
    title:string,
    description:string,
    price:number
}


export type CourseFormProps ={
    handleSubmit :() => void,
    handleFormChange:(e:React.ChangeEvent<HTMLInputElement>) => void

}

export type ListCourses = {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null,
    title: string,
    desc: string,
    author_id: number,
    price: number
    lessons:Lesson[]
    quizes:Quiz[]
}