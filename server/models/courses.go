package models

import (
	"gorm.io/gorm"
)

type Courses struct {
	gorm.Model
	Title    string    `json:"title"`
	Desc     string    `json:"description"`
	AuthorId int64     `json:"author_id"`
	Price    int64     `json:"price"`
	Lessons  []*Lesson `json:"lessons" gorm:"foreignKey:CourseId"`
}
