package models

import "gorm.io/gorm"

type Courses struct {
	gorm.Model
	TITLE string
	DESCRIPTION string
	AUTHOR_ID int
	PRICE int
}