export type Review = {
    ID: number,
    CreatedAt: string,
    UpdatedAt: string,
    DeletedAt: string | null,
    description: string,
    ratings: number,
    user_id: number,
    course_id: number,

}