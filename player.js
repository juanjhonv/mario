import { StandingLeft, StandingRight, SittingLeft, SittingRight, RunningRight, RunningLeft, JumpingLeft, JumpingRight, FallingLeft, FallingRight } from "./state.js";
export class Blocks{
    constructor(ctx,x,y,width,height){
        this.x = x
        this.y = y
        this.inix = x
        this.width = width
        this.height = height
        this.ctx = ctx
        this.elasticity = .5
        this.energy = 0
        this.gap = 0
    }
    move(){
        if(this.energy !== 0){
            if(this.gap%2===0){
                this.x = this.inix + this.energy
                this.energy += this.elasticity * -1
                this.energy *= -1
                this.elasticity *= -1
                console.log(this.energy,this.x)
            }
            this.gap += 1
        }
    }
    action(){
        let $a = document.createElement("a")
        $a.href = "https://ko-fi.com/lowlines#checkoutModal"
        $a.setAttribute("target","_new")
        document.getElementById("canvas1").style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`
        $a.click()
    }
    draw(){
        this.ctx.fillRect(this.x,this.y,this.width,this.height)
    }
}

export default class Player{
    constructor(gameWidth,gameHeight){
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.states = [new StandingLeft(this), new StandingRight(this), new SittingLeft(this), new SittingRight(this), new RunningLeft(this), new RunningRight(this), new JumpingLeft(this), new JumpingRight(this), new FallingLeft(this), new FallingRight(this)]
        this.currentState = this.states[1]
        this.image = document.getElementById("dogImage")
        // this.width = 18
        // this.height = 32
        this.width = 36
        this.height = 64
        this.x = gameWidth/2 - this.width/2
        this.y = gameHeight - this.height*2
        this.frameX = 1
        this.frameY = 0
        this.maxFrame = 2
        this.speed = 0
        this.maxSpeed = 10
        this.vy = 0
        this.weight = 0.5
        this.onblock = false
        this.block_position = -1

        this.fps = 100
        this.frameTimer = 0
        this.frameInterval = 1000/this.fps
    }
    draw(context, deltaTime){
        if(this.frameTimer > this.frameInterval){
            if(this.frameX < this.maxFrame) this.frameX++
            else this.frameX = 0
            this.frameTimer = 0
        }else{
            this.frameTimer += deltaTime
        }
        context.drawImage(this.image,this.width*this.frameX,this.height*this.frameY,this.width,this.height,this.x,this.y,this.width*2,this.height*2)
    }
    update(input,blocks){

        if(input.lastKey === 'PRESS up' && (this.currentState.state === 'FALLING LEFT' || this.currentState.state === 'FALLING RIGHT')){
            input.lastKey = 'RELEASE up'
        }
        // if(input.x === this.x + this.width/2){
        //     if(input.lastKey === 'PRESS right'){
        //         input.lastKey = 'RELEASE right'
        //     }
        //     if(input.lastKey === 'PRESS left'){
        //         input.lastKey = 'RELEASE left'
        //     }
        // }

        this.intersect(blocks)
        this.onBlock(blocks)
        //horizontal movement
        this.currentState.handleInput(input.lastKey)
        this.x += this.speed
        // if(this.x < input.x || this.x > input.x) this.x = input.x - this.width/2
        
        if(this.x + this.width <= 0) this.x = this.gameWidth
        else if(this.x >= this.gameWidth) this.x = -this.width
        // if(this.x <= 0) this.x = 0
        // else if(this.x >= this.gameWidth - this.width) this.x = this.gameWidth - this.width

        //vertical movement
        this.y += this.vy
        // if(!this.onGround() && !this.onblock){
        if(!this.onGround()){
            this.vy += this.weight
            console.log("pepe--->",this.y,this.onblock,this.vy)
        }else{
            this.vy = 0
            if(this.onGround()){
                this.y = this.gameHeight - this.height*2
            }
        }
        let div = document.querySelector("#vy")
        div.innerHTML = `${this.currentState.state}-${this.onblock}-${this.vy}`
    }
    onGround(){
        return this.y >= this.gameHeight - this.height*2
    }
    setState(state){
        this.currentState = this.states[state]
        this.currentState.enter()
    }
    onBlock(blocks){
        let contador = 0, ind = -1
        blocks.forEach((block,indice) => {
            if(this.y < block.y && this.y + this.height*2 >= block.y && ((this.x >= block.x && this.x < block.x + block.width) || (this.x + this.width <= block.x + block.width && this.x + this.width > block.x))){
                contador+=1
                ind = indice
            }
        })
        if(contador>0){
            this.y = blocks[ind].y - this.height*2
            this.vy = 0
            this.onblock = true
        }else{
            this.onblock = false
        }
    }
    intersect(blocks){
        blocks.forEach(block => {
            if(this.y <= (block.y + block.height) && this.x + this.width - 20 > block.x && this.x + 20 < (block.x + block.width) && block.y + block.height < this.y + this.height){
                this.y = block.y + block.height + 1
                this.vy = 0
                block.elasticity = .5
                block.energy = 10
            }
            if(this.y + this.height > block.y && this.y <= (block.y + block.height) && this.x < block.x && this.x + this.width >= block.x){
                this.x = block.x - this.width
            }
            if(this.y + this.height > block.y && this.y <= (block.y + block.height) && this.x < (block.x + block.width) && this.x + this.width > (block.x + block.width)){
                this.x = (block.x + block.width)
            }            
        });
    }
}