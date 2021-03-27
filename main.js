//make all html files to be loaded before the javascript file
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    const width = 8
    const squares = []
    const scoreDisplay = document.getElementById('score')
    let score = 0

    const candyColors = [ 
        'url(images/red-candy.png)',
        'url(images/yellow-candy.png)',
        'url(images/orange-candy.png)',
        'url(images/purple-candy.png)',
        'url(images/green-candy.png)',
        'url(images/blue-candy.png)']

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
            square.style.backgroundImage = candyColors[randomColor]
           
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
        colorBeingDragged = this.style.backgroundImage
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
        colorBeingReplaced = this.style.backgroundImage
        squareIdBeingReplaced = parseInt(this.id)
        //console.log(squareIdBeingReplaced)
        

         this.style.backgroundImage = colorBeingDragged
       //change the original color to target color when dragged
        squares[squareIdBeingDragged].style.backgroundImage = colorBeingReplaced
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
            squares[squareIdBeingReplaced].style.backgroundImage = colorBeingReplaced
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
            
        }else{
            //square is dragged outside the grid and had nowhere to go, return original spot and color
            squares[squareIdBeingDragged].style.backgroundImage = colorBeingDragged
            
        }
        //console.log(colorBeingReplaced) //target square
        //console.log(colorBeingDragged) // original square

    }

    //drop the candies once some have been cleared
    function moveDown(){
        for( i = 0; i < 55; i++){
            if( squares[i + width].style.backgroundImage === ''){
                //passing the background color to the empty square that below target square
                squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
                //remove the background from target squares
                squares[i].style.backgroundImage = ''
                
                //generate new candies
                const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
                const isFirstRow = firstRow.includes(i)

                if(isFirstRow && squares[i].style.backgroundImage === ''){
                    let randomColor = Math.floor(Math.random() * candyColors.length)
                    squares[i].style.backgroundImage = candyColors[randomColor]
                }
            }

        }
    }

    //checking for matches
    function checkRowForThree(){
        for( i= 0 ; i < 61; i++){
            let rowOfThree = [i, i+1, i+2]
            let decideColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

             //fix row spliting issues
            //not valid move in row for start checking for three match
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55]
            //if the number is included in this array, skip it
            if(notValid.includes(i)) continue

            if(rowOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)){
                //score count
                score += 3
                scoreDisplay.innerHTML = score
                //assign blank color for matched switch
                rowOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    checkRowForThree()

    //check column for three
    function checkColumnForThree(){
        for( i= 0 ; i < 47; i++){
            let columnOfThree = [i, i+ width, i+ width * 2]
           
            let decideColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

           

            if(columnOfThree.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)){
                //score count
                score += 3
                scoreDisplay.innerHTML = score
                //assign blank color for matched switch
                columnOfThree.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
                 
            }
            
        }
    }
    checkColumnForThree()



     //check row for four
    function checkRowForFour(){
        for( i= 0; i < 60; i++){
            let rowForFour = [i, i+1, i+2, i+3]
            let decideColor = squares[i].style.backgroundImage
            const isBlank = squares[i].style.backgroundImage === ''

            const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
            if(notValid.includes(i)) continue

            if(rowForFour.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)){
                score += 4
                scoreDisplay.innerHTML = score

                rowForFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    checkRowForFour()

    //check for column four
    function checkColumnForFour(){

        for(i = 0; i < 47 ; i++){

            let columnOfFour = [i, i+ width, i+ width * 2, i+ width * 3]

            let decideColor = squares[i].style.backgroundImage 
            const isBlank = squares[i].style.backgroundImage === ''

            if(columnOfFour.every(index => squares[index].style.backgroundImage === decideColor && !isBlank)){
                score += 4
                scoreDisplay.innerHTML = score

                columnOfFour.forEach(index => {
                    squares[index].style.backgroundImage = ''
                })
            }
        }
    }
    checkColumnForFour()

  
    

    //invoke the function contantly while playing the games
    window.setInterval( function(){
        moveDown()
        checkRowForFour()
        checkColumnForFour()
        checkRowForThree()
        checkColumnForThree()
        
    }, 100)

})