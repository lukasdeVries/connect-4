let playerRed = 'R'
let redPlayerScore = 0

let playerYellow = 'Y'
let yellowPlayerScore = 0

let currentPlayer = playerRed

let board 

let rows = 6 
let columns = 7

let currColumns = []

let remainingSecondsStart = 30
let remainingSeconds = remainingSecondsStart

let interval = null

let animationInterval = null

document.addEventListener('DOMContentLoaded', () => {
    setGame()
    startTimer(remainingSecondsStart)

    document.querySelector('.top__button--restart').addEventListener('click', () => {
        restart()
    })
})

/**
 * creates all elements needed for the game function and fills fields with usable data
 */
function setGame() {
    board = []
    currColumns = [5, 5, 5, 5, 5, 5, 5]

    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            row.push(' ')

            let tile = document.createElement('div')
            tile.id = `${r.toString()}-${c.toString()}`
            tile.classList.add('tile')
            tile.addEventListener('click', setPiece)
            document.querySelector('.board__field').appendChild(tile)

        }
        board.push(row)
    }
}

/**
 * collects data from clicked tile and stets it to red or yellow depending on cuurent player 
 * @returns 
 */
function setPiece() {
    if (animationInterval !== null ) return

    let coords = this.id.split('-')

    let r = parseInt(coords[0])
    let c = parseInt(coords[1])

    r = currColumns[c]
    if (r < 0 ) return

    board[r][c] = currentPlayer
    let tile = document.getElementById(r.toString() + '-' + c.toString())
    if (currentPlayer === playerRed) {
        tile.classList.add('red-piece')
        currentPlayer = playerYellow
    }else {
        tile.classList.add('yellow-piece')
        currentPlayer = playerRed
    }

    r -= 1
    currColumns[c] = r
    updateTimerColor()
    remainingSeconds =remainingSecondsStart
    checkWinner()
}

/**
 * checks if four in a rows has been achieved 
 * @returns 
 */
function checkWinner() {
    // horizontaal 
    // loops for every row, six in total 
    for (let r = 0; r < rows; r++){
        // loops for every column, minus three otherwise the check would go out of bounds 
        for (let c = 0; c < columns - 3; c++){
            // check if the tile is empty
            if (board[r][c] != ' ') {
                // ckecks wether there is a line of four tiles on the same row but four diffrent columns
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    // sets the winner to the last player 
                    setWinner(r, c)
                    // stops the function 
                    return
                }
            }
        }
    }

    // verticaal 
    // loops through every column, seven in total
    for (let c = 0; c < columns; c++){
        // loops through three rows, otherwise the check would go out of bounds 
        for (let r = 0; r < rows - 3; r++){
            // check if the tile is empty
            if (board[r][c] != ' '){
                // ckecks wether there is a line of four tiles on the same column but four diffrent rows
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                    setWinner(r, c)
                    return
                }
            }
        }
    }

    // tegen diagonaal 
    // loops through three rows to stay in bounds 
    for (let r = 0; r < rows -3; r++) {
    // loops through four columns to stay in bounds 
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                // ckecks if there is a line of four similar tiles moving both down and sideways 
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c)
                    return
                }
            }
        }
    }


    // diagonaal 
    // loops through three rows to stay in bounds. 
    // because it moves bottom to top sideways, r starts at three instead of the number of rows minus three in order to stay in bounds
    for (let r = 3; r < rows; r++) {
        // loops through the columns 
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                //ckecks if there is a line of four similar tiles moving both up and sideways 
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c)
                    return
                }
            }
        }
    }
}

/**
 * sets the winner based on the last placed tile before winning 
 * @param {String} r 
 * @param {String} c 
 */
function setWinner(r, c) {

    winnerAnimation(board[r][c])

    if (board[r][c] == playerRed) {
        redPlayerScore++
        let scoreElement1 = document.querySelector('.player__score--1')
        scoreElement1.innerHTML = redPlayerScore
        currentPlayer = playerYellow
    }else {
        yellowPlayerScore++
        let scoreElement2 = document.querySelector('.player__score--2')
        scoreElement2.innerHTML = yellowPlayerScore
        currentPlayer = playerRed
    }
    setTimeout(function () {clearBoard() }, 1000)    
}
/**
 * clears the board and resets the fields 
 */
function clearBoard() {
    const tiles = document.querySelectorAll('.tile')
    tiles.forEach(tile => {
        if (tile.classList.contains('red-piece')) {
            tile.classList.remove('red-piece')
        } else if (tile.classList.contains('yellow-piece')) {
            tile.classList.remove('yellow-piece')
        }
    })
    currColumns = []
    currColumns = [5, 5, 5, 5, 5, 5, 5]
    board = []
    for (let r = 0; r < rows; r++) {
        let row = []
        for (let c = 0; c < columns; c++) {
            row.push(' ')
        }
        board.push(row)
    }
}

/**
 * starts a timer based on the seconds given 
 * @param {Number} currenSeconds 
 */
function startTimer(currenSeconds) {
    remainingSeconds = currenSeconds
    interval = setInterval(() => {
        remainingSeconds--
        updateTimerElement(remainingSeconds)
        if (remainingSeconds === 0) {
            if (currentPlayer == 'R') {
                if (redPlayerScore == 0) {
                    currentPlayer = playerYellow
                    updateTimerColor()
                    remainingSeconds = remainingSecondsStart
                    return
                } else {
                    redPlayerScore--
                    updatePlayerScoreDisplay(redPlayerScore)
                    currentPlayer = playerYellow
                    updateTimerColor()
                    clearBoard()
                }
            }
            else if (currentPlayer == 'Y'){
                if (yellowPlayerScore == 0) {
                    currentPlayer = playerRed
                    updateTimerColor()
                    remainingSeconds = remainingSecondsStart
                    return
                } else {
                    yellowPlayerScore--
                    updatePlayerScoreDisplay(yellowPlayerScore)
                    currentPlayer = playerRed
                    updateTimerColor()
                    clearBoard()
                }
            }
            remainingSeconds = remainingSecondsStart
            updateTimerElement(remainingSeconds)
        }
    }, 1000)
}

/**
 * updates the timer bases on the given number
 * @param {Number} value 
 */
function updateTimerElement(value) {
    document.querySelector('#time').innerHTML = value
}

/**
 * updates the color of the timer based on current player 
 */
function updateTimerColor() {
    let element = document.querySelector('.board__timer')
    if (currentPlayer === "Y") {
        element.classList.remove('board__timer--red')
        element.classList.add('board__timer--yellow')
        document.getElementById('player-number').innerHTML = '2'
    } else {
        element.classList.remove('board__timer--yellow')
        element.classList.add('board__timer--red')
        document.getElementById('player-number').innerHTML = '1'        
    }
}

/**
 * changes the score of the current player to the given value 
 * @param {Number} score 
 */
function updatePlayerScoreDisplay(score) {
    if (currentPlayer == 'R') {
        document.querySelector('.player__score--1').innerHTML = score
    } else if (currentPlayer == 'Y') {
        document.querySelector('.player__score--2').innerHTML = score
    }

}

/**
 * plays a short flickering animation to indicate who won 
 * @param {String} winner 
 */
function winnerAnimation(winner) {

    const element = document.querySelector('.board')

    let animationTime = 5

    let className 
    if (winner == 'R') {
        className = 'board__winner--1'
    } else {
        className = 'board__winner--2'
    }

    animationInterval = setInterval(() => {

        
        if (animationTime % 2 == 0) {
            element.classList.add(className)
        } else {
            element.classList.remove(className)
        }
        animationTime--
        //element.classList.remove(className)
        if (animationTime == 0){
            clearInterval(animationInterval)
            animationInterval = null
            clearBoard()
        }
    }, 500)    
}

/**
 * restarts the whole game including scores 
 */
function restart() {
    clearBoard()
    remainingSeconds = remainingSecondsStart
    updateTimerElement(remainingSeconds)
    document.querySelector('.player__score--1').innerHTML = 0
    document.querySelector('.player__score--2').innerHTML = 0
    yellowPlayerScore = 0
    redPlayerScore = 0
    currentPlayer = 'R'
    updateTimerColor()
}


 