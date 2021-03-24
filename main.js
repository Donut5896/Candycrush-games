//make all html files to be loaded before the javascript file
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []

    const candyColors = [ 'red', 'yellow', 'orange','purple', 'green', 'blue']

    //create Board
    function createBoard(){
        //generate 64 grids
        for(let i=0; i< width * width; i++){
            const square = document.createElement('div')
            //make grid draggable
            square.setAttribute('draggable', true)
            //give id each square
            square.setAttribute('id', i)
            //generate random square color
            let randomColor = Math.floor(Math.random() * candyColors.length)
            //assign square color based on random index
            square.style.backgroundColor = candyColors[randomColor]
           
            grid.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()

    //drag and drop function
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart(){
        console.log(this.id, 'dragstart')
    }
    function dragOver(){
        console.log(this.id, 'dragover')
    }
    function dragEnd(){
        console.log(this.id, 'dragend')
    }
    function dragEnter(){
        console.log(this.id, 'dragenter')
    }
    function dragLeave(){
        console.log(this.id, 'dragleave')
    }
    function dragDrop(){
        console.log(this.id, 'draggrop')
    }
})