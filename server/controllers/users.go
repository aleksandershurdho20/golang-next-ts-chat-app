package controllers

import (
	"net/http"
	"server/db"
	"server/models"

	"github.com/gin-gonic/gin"
)

func SignUp(c *gin.Context) {
	db.NewDatabase()
	var body struct {
		Email    string
		password string
	}
	var user models.User
	db.DB.First(&user, "email = ?", body.Email)
	c.Bind(&body)
	if user.ID != 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Email already exists!",
		})
		return
	}
}
