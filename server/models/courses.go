package models

import (
	"gorm.io/gorm"
)

// type Lesson struct{
// 	gorm.Model
// 	Title string
// 	Content string
// 	CourseID  uint32   // Foreign key, references Course model
// }

// type Courses struct {
// 	gorm.Model
// 	TITLE string
// 	DESCRIPTION string
// 	AUTHOR_ID int
// 	PRICE int
//     Lessons     []Lesson `gorm:"foreignKey:CourseID"` // One course has many lessons

// }

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
