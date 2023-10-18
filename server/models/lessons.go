package models

import "gorm.io/gorm"

type Lesson struct {
	gorm.Model
	Title    string
	Content  string
	CourseId uint   `json:"course_id" gorm:"column:course_id;index;not null"`
	Course   Course `json:"-" gorm:"foreignKey:CourseId;references:ID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}

func (o Lesson) TableName() string {
	return "lessons"
}
