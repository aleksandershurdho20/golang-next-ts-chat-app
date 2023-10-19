package controllers

import (
	"errors"
	"fmt"
	"server/db"
	"server/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateLesson(c *gin.Context){
	var lesson * models.Lesson
	c.Bind(&lesson)
	createdLessons := db.DB.Create(lesson).Error

	if createdLessons != nil{
		c.JSON(400, gin.H{"error": "Failed to create new Lesson", "details": createdLessons})
		return
	}

	c.JSON(201,gin.H{
		"success":"Lesson created succesfully!",
		"data": lesson,
	})
	
}


func GetLessons(c* gin.Context){
	lessons := make([]*models.Lesson,0)



	result:= db.DB.Preload("Course").Find(&lessons).Error

	if result != nil {
		fmt.Println(result)

		c.JSON(500,gin.H{
			"error":"Server Error!",
		})
		return
	}

	if 	errors.Is(result,gorm.ErrRecordNotFound){
		c.JSON(404,gin.H{
			"error":"No lessons found!",
		})
		return
	}
	fmt.Print(result)
	fmt.Println(db.DB.Find(&lessons))
	c.JSON(200,gin.H{
		"data":lessons,
	})

}


func SearchLessons( c * gin.Context){
	query:=c.Query("title")

	if query != "" {
		var lessons [] models.Lesson

		sql := "SELECT * FROM lessons WHERE title LIKE '%" + query + "%' OR content LIKE '%" + query + "%'"
		err := db.DB.Raw(sql).Scan(&lessons).Error

		if err !=nil{
			c.JSON(500,gin.H{"error":err.Error()})
			return
		}

		c.JSON(200,gin.H{
			"result":lessons,
		})
		// db.db.Where(q).Find(&lessons)
		
		// SELECT * FROM users WHERE name LIKE '%jin%';
	}


}



func OrderLessons(c *gin.Context) {
    params := c.Query("sort")
    var lessons []models.Lesson

    if params != "" {
        var err error
        if params == "desc" {
            err = db.DB.Order("created_at DESC").Find(&lessons).Error
        } else if params == "asc" {
            err = db.DB.Order("created_at ASC").Find(&lessons).Error
        } else {
            c.JSON(400, gin.H{"error": "Invalid 'sort' parameter"})
            return
        }

        if err != nil {
            c.JSON(500, gin.H{"error": "Internal server error"})
            return
        }
    } else {
        c.JSON(400, gin.H{"error": "Missing 'sort' parameter"})
        return
    }

    c.JSON(200, gin.H{
        "result": lessons,
    })
}