package controllers

import (
	"net/http"
	"os"
	"server/db"
	"server/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)




func SignUp(c *gin.Context) {
    var body struct {
        Email    string
        Password string 
    }

    var user models.User
    c.Bind(&body)

    // Check if the email already exists
    emailExist := db.DB.First(&user, "email = ?", body.Email).Error
    if emailExist == nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message": "Email already exists!",
        })
        return
    }

    // Hash the password
    hash, err := bcrypt.GenerateFromPassword([]byte(body.Password), 10)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message": "Problem hashing the password",
        })
        return
    }

    // Save to database
    userData := models.User{Email: body.Email, Password: string(hash)}
    result := db.DB.Create(&userData)
    if result.Error != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "message": "Server error!",
        })
        return
    }

    c.JSON(http.StatusCreated, gin.H{
        "message": "User Created",
    })
}


func Login(c *gin.Context) {
    var body struct {
        Email    string
        Password string 
    }

    // Bind the request data to the body struct
    if err := c.Bind(&body); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message": "Invalid request data",
        })
        return
    }

    var user models.User

    // Query the user from the database based on the provided email
    if err := db.DB.First(&user, "email = ?", body.Email).Error; err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message": "Email or password are incorrect!",
        })
        return
    }

    // Compare the hashed password
    if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(body.Password)); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message": "Email or password are incorrect!",
        })
        return
    }

    // Generate a JWT token
    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "userid": user.Email,
        "exp": time.Now().Add(time.Hour * 24 *30).Unix(),
    })

    tokenString, err := token.SignedString([]byte(os.Getenv("TOKEN_SECRET")))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message": "Token couldn't be created!",
        })
        return
    }

    c.SetSameSite(http.SameSiteLaxMode)
    c.SetCookie("Auth", tokenString, 3600*24*30, "", "", false, true)
    c.JSON(http.StatusOK, gin.H{
        "data": tokenString,
    })
}
