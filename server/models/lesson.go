package models

import "gorm.io/gorm"

type Lesson struct {
	gorm.Model
	Title    string  `json:"title"`
	Content  string  `json:"content"`
	CourseId uint    `json:"course_id" gorm:"column:course_id;index;not null"`
	Course   Courses `json:"-" gorm:"foreignKey:CourseId;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

func (o Lesson) TableName() string {
	return "lessons"
}
