export type Form =  {
title:string,
description:string,
price:number
}


export type CourseFormProps ={
    handleSubmit :() => void,
    handleFormChange:(e:React.ChangeEvent<HTMLInputElement>) => void

}