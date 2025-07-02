package controllers

import (
	"github.com/gin-gonic/gin"
)

func MainPage(c *gin.Context){
	c.Header("Content-Type", "application/json")
	

	//http.ServeFile(c.Writer, c.Request, "./static"+c.Param("filePath"))
}
