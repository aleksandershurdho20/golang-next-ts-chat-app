package main

import (
	"server/db"
	"server/models"
)

func main() {
	db.NewDatabase()

	db.DB.AutoMigrate(
		&models.User{},
		&models.Courses{},
		&models.Lesson{},
		&models.Review{},
		models.Quiz{},
		&models.Question{},
		&models.Grades{},
		&models.SelectedAnswers{},
		&models.Answer{},
		&models.Conversation{},
		&models.Messages{},
	)
	// db.DB.AutoMigrate(&models.Grades{}) // This will add any missing columns, including student_id

	// // Add the foreign key constraint
	// db.DB.Exec("ALTER TABLE grades ADD CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE")
}
