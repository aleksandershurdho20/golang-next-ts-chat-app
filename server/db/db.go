package db

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func NewDatabase() {
	var err error
	dsn := "host=trumpet.db.elephantsql.com user=yypvwypv password=Aod9Q4VNtaUubcshy6NybM0ElUs3MlJY dbname=yypvwypv port=5432 sslmode=disable"
	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatal("Failed to connect to database!!")
	}
	log.Fatal("aaaaaaaaa")
}
