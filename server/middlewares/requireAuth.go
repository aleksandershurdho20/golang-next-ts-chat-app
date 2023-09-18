package middlewares

import (
	"fmt"
	"net/http"
	"os"
	"server/db"
	"server/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func RequireAuth(c * gin.Context){
	tokenString,err:=c.Cookie("Auth")

	if err != nil{
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	// Parse takes the token string and a function for looking up the key. The latter is especially
// useful if you use multiple keys for your application.  The standard is to use 'kid' in the
// head of the token to identify which key to use, but the parsed token (head and claims) is provided
// to the callback, providing flexibility.
token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
	// Don't forget to validate the alg is what you expect:
	if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
		return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
	}

	// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
	return []byte(os.Getenv("TOKEN_SECRET")), nil
})

if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
	//Token expired
	if float64(time.Now().Unix())  > claims["exp"].(float64){
		c.AbortWithStatus(http.StatusUnauthorized)
	}
	var user models.User
	db.DB.First(&user,claims["userid"])
	c.Set("user",user)
	c.Next()
} else {
	c.AbortWithStatus(http.StatusUnauthorized)
}

}