package main

import (
	//"net/http"
	"github.com/gin-gonic/gin"
)

func main(){
	r := gin.Default()

	r.Static("/", "./static")
	
	r.Run("localhost:8080")
}
