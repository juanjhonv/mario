export default class InputHandler {
    constructor(player){
        this.lastKey = ''
        this.player = player
        this.x = 0
        this.last = 0
        // window.addEventListener('keydown',function(e){ -->>NO RECOMIENDA ESTA LINEA ENCASO DE QUE LAS INSTANCIAS DE LA CLASE INVOQUEN A UNA PROPIEDAD INTERNA YA QUE EL CONTEXTO PARA ESTE EJEMPLO NO ES LA CLASE SINO WINDOW. ESTO SE CORRIGE CON LA FUNCON BIND O UTILIZANDO ARROW FUNCTIONS
        window.addEventListener('keydown',e=>{
            switch(e.key){
                case 'ArrowLeft':
                    this.lastKey = "PRESS left"
                    break
                case 'ArrowRight':
                    this.lastKey = "PRESS right"
                    break
                case 'ArrowDown':
                    this.lastKey = "PRESS down"
                    break
                case 'ArrowUp':
                    this.lastKey = "PRESS up"
                    break
                default:
            }
        })
        window.addEventListener('keyup',e=>{
            switch(e.key){
                case 'ArrowLeft':
                    this.lastKey = "RELEASE left"
                    break
                case 'ArrowRight':
                    this.lastKey = "RELEASE right"
                    break
                case 'ArrowDown':
                    this.lastKey = "RELEASE down"
                    break
                case 'ArrowUp':
                    this.lastKey = "RELEASE up"
                    break
                default:
            }
        })
        // window.addEventListener('mousemove',e=>{
        //     if(e.pageX > player.x + player.width/2){
        //         this.lastKey = "PRESS right"
        //     }
        //     else if(e.pageX < player.x + player.width/2){
        //         this.lastKey = "PRESS left"
        //     }
        //     this.x = e.pageX
        //     this.last = e.pageX
        // })
        // window.addEventListener("click",e=>{
        //     this.lastKey = "PRESS up"
        // })
    }
}