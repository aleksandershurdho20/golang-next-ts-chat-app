package models

import (
	"gorm.io/gorm"
)

// maybe we need to add

type Course struct {
	gorm.Model
	Title    string
	Desc     string
	AuthorId int64
	Price    int64
	Lessons  []Lesson `gorm:"foreignKey:CourseId"`
}

func (o Course) TableName() string {
	return "courses"
}
