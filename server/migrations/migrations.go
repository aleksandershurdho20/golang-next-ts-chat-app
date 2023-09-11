package main

import (
	"server/db"
	"server/models"
)

func main() {
	db.NewDatabase()

	db.DB.AutoMigrate(&models.User{})
}
