package router

import (
	"github.com/gin-gonic/gin"
)

var (
	Router = gin.Default()
	
	Public = Router.Group("/")
)

func RunRouter(){
	Router.Use(gin.Recovery())
	Public.GET("/", controllers.MainPage)
	fmt.Println("Server running on localhost:8080")
	
	if err := Router.Run(":8080"); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
