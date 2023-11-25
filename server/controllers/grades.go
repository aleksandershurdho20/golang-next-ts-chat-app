package controllers

import (
	"fmt"
	"server/db"
	"server/models"

	"github.com/gin-gonic/gin"
)

func CreateGrade(c *gin.Context){
	var grades models.Grades
	var quiz models.Quiz
	if err := c.Bind(&grades); err!= nil{
		c.JSON(400,gin.H{
			"message":"Invalid request data!",
		})
		return
	}

	err:= db.DB.Create(&grades).Error
    fmt.Printf("Received request body: %+v\n", grades.SelectedAnswers)
	if err !=nil {
		c.JSON(500, gin.H{
			"message": "Failed to create grade.",
		})
		return
	}
	fmt.Println("err",err)
	updateCourseErr:= db.DB.Model(&quiz).Where("CourseId",grades.CourseID).Update("IsTaken",true).Error

	if  updateCourseErr != nil {
		c.JSON(500, gin.H{
			"message": "Failed to update  course.",
		})
		return
	}

	c.JSON(201,gin.H{
		"message":"Created Succesfully!",
	})

}

func GetStudentGrade(c*gin.Context){
	studentID:=c.Param("student")
	courseID:=c.Param("course")	
	quizID:=c.Param("quiz")	

	
	var grade models.Grades
	// This works also
	// err := db.DB.Joins("JOIN courses ON courses.id = grades.course_id").
    // Joins("JOIN quizzes ON quizzes.id = grades.quiz_id").
    // Where("grades.student_id = ? AND courses.id = ? AND quizzes.id = ?", studentID, courseID, quizID).
    // Preload("Course").
    // Preload("Quiz").
    // First(&grade).Error


	err := db.DB.Preload("Course").
    Preload("Student").
    Preload("Professor").
    Preload("Quiz.Questions.Answers").
    Where("course_id = ? AND student_id = ? AND quiz_id = ?", courseID, studentID, quizID).
    First(&grade).Error
 


   if err != nil{
	fmt.Println(err,"err")
	c.JSON(500,gin.H{
		"message":"Server error!",
	})
	return
   }
   c.JSON(200,gin.H{
	"result":grade,
   })
}