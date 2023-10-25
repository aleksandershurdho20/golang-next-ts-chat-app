package controllers

import (
	"server/db"
	"server/models"

	"github.com/gin-gonic/gin"
)

func CreateQuiz(c *gin.Context){
	var quiz models.Quiz
	c.Bind(&quiz)
		err:= db.DB.Create(&quiz).Error
		if err != nil{
			c.JSON(500,gin.H{"error":"Error"})
			return
		}
		c.JSON(201,gin.H{"result":"Quiz created succesfully!"})
}

func GetQuizByCourseId(c* gin.Context){
	id:= c.Param("id")
	var quiz models.Quiz

	err := db.DB.Preload("Questions.Answers").Where("course_id = ?", id).Find(&quiz).Error
	// err := db.DB.Find(&quiz).Error

	if err != nil {
		c.JSON(404,gin.H{"message": "No Quizzes found for this course id."})
		return
	}


	c.JSON(200,gin.H{
		"result":quiz,
	})

}