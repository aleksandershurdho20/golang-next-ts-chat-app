package main

import (
	"log"
)

func main() {
	_, err := db.newDatabase()

	if err != nil {
		log.Fatalf("Couldnt initialize database connection : %s", err)
	}
}
