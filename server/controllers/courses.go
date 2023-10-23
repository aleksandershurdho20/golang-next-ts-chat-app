package controllers

import (
	"net/http"
	"strconv"

	"server/db"
	"server/models"

	"github.com/gin-gonic/gin"
)

type Lesson struct{
	Title string
	Content string
	CourseID  uint   // Foreign key, references Course model
}
// var Course struct{
// 	TITLE string
// 	DESCRIPTION string
// 	AUTHOR_ID int
// 	PRICE int
// }


func CreateCourse(c *gin.Context){
	var course *models.Courses
	c.Bind(&course)
	// createdCourse := models.Courses{
    //     TITLE:       Course.TITLE,
    //     DESCRIPTION: Course.DESCRIPTION,
    //     AUTHOR_ID:   Course.AUTHOR_ID,
    //     PRICE:       Course.PRICE,
	// 	Lessons:models.Lesson[]
    // }

	// createdCourse:=models.Course
    result := db.DB.Create(&course)

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
	result:= db.DB.Preload("Lessons").First(&course, id)



	// if result.RowsAffected == 0 {
	// 	c.JSON(404,gin.H{
	// 		"message":"Course not found!",
	// 	})
	// 	fmt.Println(result.RowsAffected)

	// 	return
	// }

	if result.Error != nil {
		c.JSON(500,gin.H{"message":"Server Error"})
		return
	}
	c.JSON(200,gin.H{
		"data":course,
	})
}

// func UpdateCourse(c*gin.Context){
// 	var course models.Courses
// 	id:= c.Param("id")
// 	c.Bind(&Course)
// 	updatedCourse := models.Courses{
//         TITLE:       Course.TITLE,
//         DESCRIPTION: Course.DESCRIPTION,
//         AUTHOR_ID:   Course.AUTHOR_ID,
//         PRICE:       Course.PRICE,
//     }
// 	result:= db.DB.Model(&course).Where("id = ?", id).Updates(&updatedCourse);

// 	if result.Error != nil {
// 		c.JSON(500,gin.H{
// 			"message":"Server errror!",
// 		})
// 		return
// 	}

// 	c.JSON(200,gin.H{
// 		"message":"Updated succesfully!",
// 		"data":result,
// 	})
// }


func DeleteCourse(c * gin.Context){
	var course models.Courses
	id:= c.Param("id")

	result:= db.DB.Delete(&course,id)
	if result.Error != nil {
		c.JSON(500,gin.H{
			"message":"Server errror!",
		})
		return
	}

	c.JSON(200,gin.H{
		"message":"Deleted succesfully!",
	})
}


func GetCoursesByPage (c * gin.Context){
	pageNumber:= c.Param("page")
	page:=1
	if pageNumber !=""{
		page,_=strconv.Atoi(pageNumber)// Convert from string to int

	}
	offset:=(page - 1) * 10 // pageNUmber is active page, -1, where 10 is total of pages
	var courses []models.Courses
	result:= db.DB.Limit(10).Offset(offset).Find(&courses)

	if result.Error != nil{
		c.JSON(500,gin.H{
			"message":"Erorr something went wrong!",
		})
		return
	}

	c.JSON(200,gin.H{
		"data":result,
	})

	
}