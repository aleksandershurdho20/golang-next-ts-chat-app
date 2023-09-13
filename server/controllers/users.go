package controllers

import (
	"net/http"
	"server/db"
	"server/models"
	"golang.org/x/crypto/bcrypt"

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
	hash, err := bcrypt.GenerateFromPassword([]byte(body.password), 10)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Problem hashing the password",
		})
		return
	}

	// save to database

	userData := models.User{Email: body.Email, password: string(hash)}
	result := db.DB.Create(&userData)

	if result != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Server error!",
		})
		return
	}
	c.JSON(http.StatusCreated, gin.H{
		"message": "User Created",
	})
}
