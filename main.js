//make all html files to be loaded before the javascript file
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []
    let score = 0

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
    let  colorBeingDragged
    let  colorBeingReplaced
    let squareIdBeingDragged
    let squareIdBeingReplaced

    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))

    function dragStart(){
        //store draged square color
        colorBeingDragged = this.style.backgroundColor
        squareIdBeingDragged = parseInt(this.id)
        //console.log(colorBeingDragged)
        console.log(this.id, 'dragstart')
    }
    function dragOver(e){
        e.preventDefault()
        console.log(this.id, 'dragover')
    }
   
    function dragEnter(e){
        e.preventDefault()
        console.log(this.id, 'dragenter')
    }
    function dragLeave(){
        console.log(this.id, 'dragleave')
    }
    function dragDrop(){
        //store original color in that square
         console.log(this.id, 'draggrop')
        colorBeingReplaced = this.style.backgroundColor
        squareIdBeingReplaced = parseInt(this.id)
        //console.log(squareIdBeingReplaced)
        

         this.style.backgroundColor = colorBeingDragged
       //change the original color to target color when dragged
        squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced
        //console.log(squareIdBeingDragged)
         console.log(colorBeingReplaced)
    }

    function dragEnd(){

        console.log(this.id, 'dragend')
        //valid move. switch rules
        let validMoves = [squareIdBeingDragged - 1, //            59
        squareIdBeingDragged - width, // 59 - 8 = 51           66|67|68   
        squareIdBeingDragged + 1,//                               75
        squareIdBeingDragged + width ]// 75 - 8 = 83 


        let validMove = validMoves.includes(squareIdBeingReplaced)

        if(squareIdBeingReplaced && validMove){
            //if statement is true , reset the id value ready for fresh start
             squareIdBeingReplaced = null
        }else if(squareIdBeingReplaced && !validMove){
            //if the valid Move is not true, return original spot and color
            squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
            
        }else{
            //square is dragged outside the grid and had nowhere to go, return original spot and color
            squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged
            
        }
        console.log(colorBeingReplaced) //target square
        console.log(colorBeingDragged) // original square

    }



    //checking for matches
    function checkRowForThree(){
        for( i= 0 ; i < 61; i++){
            let rowOfThree = [i, i+1, i+2]
            let decideColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if(rowOfThree.every(index => squares[index].style.backgroundColor === decideColor && !isBlank)){
                //score count
                score += 3
                //assign blank color for matched switch
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkRowForThree()

    //check column for three
    function checkColumnForThree(){
        for( i= 0 ; i < 47; i++){
            let columnOfThree = [i, i+ width, i+ width * 2]
            console.log(columnOfThree)
            let decideColor = squares[i].style.backgroundColor
            const isBlank = squares[i].style.backgroundColor === ''

            if(columnOfThree.every(index => squares[index].style.backgroundColor === decideColor && !isBlank)){
                //score count
                score += 3
                //assign blank color for matched switch
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundColor = ''
                })
            }
        }
    }
    checkColumnForThree()

    //invoke the function contantly while playing the games
    window.setInterval( function(){
        checkRowForThree()
        checkColumnForThree()
    }, 100)

})