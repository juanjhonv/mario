'use strict'
import Player from "./player.js"
import { Blocks } from "./player.js"
import InputHandler from "./input.js"
/** @type {HTMLCanvasElement} */
window.addEventListener("load",function(e){
    const canvas = document.getElementById("canvas1")
    const ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const block1 = new Blocks(ctx,400,450,150,120)
    const block2 = new Blocks(ctx,900,400,150,150)
    const blocks = [block1,block2]
    const player = new Player(canvas.width,canvas.height)
    const input = new InputHandler(player)
    let lastTime = 0
    
    function animate(timestamp){
        const deltaTime = timestamp - lastTime
        lastTime = timestamp
        ctx.clearRect(0,0,canvas.width,canvas.height)
        blocks.forEach(block=>{
            block.draw()
            block.move()
        })
        player.update(input,blocks)
        player.draw(ctx, deltaTime)
        requestAnimationFrame(animate)
    }
    animate(0)
})
