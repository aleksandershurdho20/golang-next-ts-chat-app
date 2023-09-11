package cmd

import "server/db"

func main() {
	// _, err := db.NewDatabase()

	// if err != nil {
	// 	log.Fatalf("Couldnt initialize database connection : %s", err)
	// }
	db.NewDatabase()
}
