package controllers

import (
	"fmt"
	"net/http"
	"server/db"
	"server/models"

	"github.com/gin-gonic/gin"
)


var Course struct{
	TITLE string
	DESCRIPTION string
	AUTHOR_ID int
	PRICE int
}
func CreateCourse(c *gin.Context){
	c.Bind(&Course)
	createdCourse := models.Courses{
        TITLE:       Course.TITLE,
        DESCRIPTION: Course.DESCRIPTION,
        AUTHOR_ID:   Course.AUTHOR_ID,
        PRICE:       Course.PRICE,
    }
    result := db.DB.Create(&createdCourse)

	if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "message": "Server error!",
        })
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "message": "Course Created",
    })
}


func GetAllCourses(c * gin.Context){
	var courses []models.Courses
	result:=db.DB.Find(&courses)

	if result.Error !=nil {
		c.JSON(http.StatusInternalServerError,gin.H{
			"message":"Server Error!",
		})
		return
	}
	c.JSON(200,courses)
}


func GetCourse(c * gin.Context){
	var course models.Courses
	id:=c.Param("id")
	result:= db.DB.First(&course,id)

	if result.RowsAffected == 0 {
		c.JSON(404,gin.H{
			"message":"Course not found!",
		})
		fmt.Println(result.RowsAffected)

		return
	}

	if result.Error != nil {
		c.JSON(500,gin.H{"message":"Server Error"})
		return
	}
	c.JSON(200,gin.H{
		"data":course,
	})
}