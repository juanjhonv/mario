// 'use strict'
/** @type {HTMLCanvasElement} */
let canvas = document.getElementById("canvas1")
let ctx = canvas.getContext("2d")
let CANVAS_WIDTH = canvas.width = 800
let CANVAS_HEIGHT = canvas.height = 600
let spriteWidth = 18, spriteHeight = 32, frame = 0, gameFrame = 0, velocity = 2
// let mario = new Image()
// mario.src = "images/mario_poses_mini.png"

class Mario{
    constructor(){
        this.image = new Image()
        this.image.width = spriteWidth
        this.image.height = spriteHeight
        this.spriteWidth = 18
        this.spriteHeight = 32  
        this.image.src = "images/mario_poses_mini.png"
        this.x = 0
        this.y = 97
        this.frame = 0
        this.stop = true
        this.direction = 'right'
    }
    update(){
        if(!this.stop){
            if(gameFrame%velocity === 0){
                this.frame > 1 ? this.frame = 0: this.frame++
            }
            if(this.direction === 'right'){
                this.y = 97
                gameFrame++
            }else{
                this.y=65
                gameFrame--
            }
        }else{
            if(this.direction === 'right'){
                this.frame = 1
                this.y = 0
            }else{
                this.frame = 0
                this.y = 33
            }
        }
    }
    draw(){
        ctx.drawImage(this.image,this.frame*this.spriteWidth,this.y,this.spriteWidth,this.spriteHeight,gameFrame*4 + 200,200,this.spriteWidth*4,this.spriteHeight*4)
    }
    move(){
        
    }
}

let mario = new Mario()

function animation(){
    ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    mario.update()
    mario.draw()    
    requestAnimationFrame(animation)
}
window.addEventListener("load",function(){
    animation()  
})
document.addEventListener("keydown",e=>{
    if(e.code === "ArrowRight" || e.code === "ArrowLeft"){
        mario.stop = false
        e.code === "ArrowRight"?mario.direction = 'right':mario.direction = 'left'
        
    }
})
document.addEventListener("keyup",e=>{
    if(e.code === "ArrowRight" || e.code === "ArrowLeft"){
        mario.stop = true
        e.code === "ArrowRight"?mario.direction = 'right':mario.direction = 'left'
    }
})