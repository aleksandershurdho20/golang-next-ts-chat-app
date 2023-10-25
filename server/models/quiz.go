package models

import "gorm.io/gorm"

type Quiz struct {
    gorm.Model
    Title string `json:"title"`
    Questions []Question `json:"questions"`
    CourseId string `json:"course_id"`
}

type Question struct {
    gorm.Model
    Title string `json:"title"`
    QuizID uint   `json:"quiz_id"`
    Answers []Answer `json:"answers"`
}

type Answer struct {
    gorm.Model
    Title string `json:"title"`
    IsCorrect bool `json:"is_correct"`
    QuestionID uint `json:"question_id"`
}

func (Quiz) TableName() string {
    return "quizzes" // Specify the correct table name
}