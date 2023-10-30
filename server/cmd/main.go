package main

import (
	"server/controllers"
	"server/db"

	"github.com/gin-contrib/cors"

	"github.com/gin-gonic/gin"
)

func main() {
	// _, err := db.NewDataase()

	// if err != nil {
	// 	log.Fatalf("Couldnt initialize database connection : %s", err)
	// }
	db.NewDatabase()
	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:5173"}
	// config.AllowHeaders = []string{"Origin","Auth-token","Auth","token","Content-type"}
	config.AllowCredentials= true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	r.Use(cors.New(config))

	r.POST("/signup", controllers.SignUp)
	r.POST("/login",controllers.Login)
	r.GET("/user",controllers.GetAuthenticatedUser)
	r.POST("/course/create",controllers.CreateCourse)
	r.GET("/courses",controllers.GetAllCourses)
	r.GET("/course/:id",controllers.GetCourse)
	r.PUT("/course/:id",controllers.UpdateCourse)
	r.DELETE("/course/:id",controllers.DeleteCourse)
	r.GET("/courses/:page",controllers.GetCoursesByPage)

	r.POST("/lesson/create",controllers.CreateLesson)
	r.GET("/lessons",controllers.GetLessons)
	r.POST("/lessons/search",controllers.SearchLessons)
	r.POST("/lessons/sort",controllers.OrderLessons)
	r.POST("/reviews/create",controllers.CreateReview)
	r.GET("/reviews/:course",controllers.GetReviews)
	r.POST("/quiz",controllers.CreateQuiz)
	r.GET("/quiz/:id",controllers.GetQuizByCourseId)
	r.Run()
}

