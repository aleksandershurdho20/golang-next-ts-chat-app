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