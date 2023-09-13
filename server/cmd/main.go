package main

import (
	"server/controllers"
	"server/db"

	"github.com/gin-gonic/gin"
)

func main() {
	// _, err := db.NewDatabase()

	// if err != nil {
	// 	log.Fatalf("Couldnt initialize database connection : %s", err)
	// }
	db.NewDatabase()
	r := gin.Default()
	r.POST("/signup", controllers.Signup)
	r.Run()
}
