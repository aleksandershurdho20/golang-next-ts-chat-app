package main

import (
	"server/controllers"
	"server/db"

	"github.com/gin-gonic/gin"
)

func main() {
	// _, err := db.NewDataase()

	// if err != nil {
	// 	log.Fatalf("Couldnt initialize database connection : %s", err)
	// }
	db.NewDatabase()
	r := gin.Default()
	r.POST("/signup", controllers.SignUp)
	r.POST("/login",controllers.Login)
	r.POST("/course/create",controllers.CreateCourse)
	r.GET("/courses",controllers.GetAllCourses)
	r.GET("/course/:id",controllers.GetCourse)
	// r.PUT("/course/:id",controllers.UpdateCourse)
	r.DELETE("/course/:id",controllers.DeleteCourse)
	r.GET("/courses/:page",controllers.GetCoursesByPage)

	r.Run()
}
