package models

import "gorm.io/gorm"

type Review struct {
	gorm.Model
	UserID  uint   `json:"user_id"`
	CourseID uint `json:"course_id"`
	Rate int `json:"ratings"`
	Description string `json:"description"`
}