export type Lesson = {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null,
    title: string,
    content: string,
    course_id: number,
}