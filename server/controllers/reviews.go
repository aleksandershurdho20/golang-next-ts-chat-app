package controllers

import (
	"errors"
	"server/db"
	"server/models"

	"gorm.io/gorm"

	"github.com/gin-gonic/gin"
)

func CreateReview(c *gin.Context) {

	var review *models.Review
	c.Bind(&review)
	result := db.DB.Create(&review).Error

	if result != nil {
		c.JSON(500, gin.H{
			"error": "Server error!",
		})
		return
	}
	c.JSON(201, gin.H{
		"message": "Created successfully!",
	})
}

// func GetReviews(c * gin.Context){
// 	var reviews [] models.Review
// 	result:=db.DB.Table("courses").Joins("JOIN reviews on reviews.course_id = courses.id").Find(&reviews).Error

// 	if result != nil {
// 		c.JSON(500,gin.H{
// 			"error":"Server Error!",
// 		})
// 		return
// 	}
// 	c.JSON(200,gin.H{
// 		"data":reviews,
// 	})

// }

func GetReviews(c *gin.Context) {
	var reviews models.Review
	id := c.Param("course")
	result := db.DB.Where("course_id = ?", id).Find(&reviews).Error

	if result != nil {
		c.JSON(500, gin.H{
			"error": "Server Error!",
		})
		return
	}
	if errors.Is(result, gorm.ErrRecordNotFound) {
		c.JSON(404, gin.H{
			"error": "No reviews found!",
		})
		return
	}

	c.JSON(200, gin.H{
		"data": reviews,
	})
}
