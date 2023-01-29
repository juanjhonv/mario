export function drawStatusText(context,input,player){
    context.font = '20px Helvetica'
    context.fillText('Las input: ' + input.lastKey, 20, 40)
    context.fillText('Active state: ' + player.currentState.state, 20, 80)
}