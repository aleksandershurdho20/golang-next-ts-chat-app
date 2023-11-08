package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Email    string `json:"email"`
	Password string `json:"-" gorm:"column:password;"`
	Firstname string `json:"firstname"`
	Lastname string `json:"lastname"`

}
