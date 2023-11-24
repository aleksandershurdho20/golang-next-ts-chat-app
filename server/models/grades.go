package models

import (
	"gorm.io/gorm"
)


type SelectedAnswers struct {
    gorm.Model
    QuestionID uint `json:"question_id"`
    AnswerID   uint `json:"answer_id"`
    Points uint `json:"points"`
    QuizResultID    uint `json:"quiz_id"` // Foreign key referencing QuizResult

}
type Grades  struct {
    gorm.Model
    CourseId   uint     `json:"course_id" gorm:"column:course_id;index;not null"`
    Course     Courses  `json:"course" gorm:"foreignkey:CourseId"`
	StudentID   uint     `json:"student_id" gorm:"column:student_id;index;not null"`
    // StudentID  uint     `json:"student_id" gorm:"index;not null"` // Foreign key referencing User (Student)
    Student    User     `json:"student" gorm:"foreignKey:StudentID"`
	ProfessorID   uint     `json:"professor_id" gorm:"column:professor_id;index;not null"`
    Professor  User     `json:"professor" gorm:"foreignKey:ProfessorID"`
    Grade      float64  `json:"grade"`

	SelectedAnswers []SelectedAnswers `json:"selected_answers" gorm:"foreignKey:QuizResultID"` // Define the foreign key for the relationship

}


func (o Grades) TableName() string {
	return "grades"
}
