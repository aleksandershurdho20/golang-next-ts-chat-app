package models

import (
	"gorm.io/gorm"
)

type Grades struct {
    gorm.Model
    CourseId   uint     `json:"course_id" gorm:"column:course_id;index;not null"`
    Course     Courses  `json:"course" gorm:"foreignkey:CourseId"`
	StudentID   uint     `json:"student_id" gorm:"column:student_id;index;not null"`
    // StudentID  uint     `json:"student_id" gorm:"index;not null"` // Foreign key referencing User (Student)
    Student    User     `json:"student" gorm:"foreignKey:StudentID"`
	ProfessorID   uint     `json:"professor_id" gorm:"column:professor_id;index;not null"`
    Professor  User     `json:"professor" gorm:"foreignKey:ProfessorID"`
    Grade      float64  `json:"grade"`
    QuizID     uint     `json:"quiz_id" gorm:"index;not null"` // Foreign key referencing Quiz
    Quiz       Quiz     `json:"quiz" gorm:"foreignKey:QuizID"`
    IsTaken    bool     `json:"is_taken"`
}


func (o Grades) TableName() string {
	return "grades"
}
