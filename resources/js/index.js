let playerRed = 'R'
let redPlayerScore = 0

let playerYellow = 'Y'
let yellowPlayerScore = 0

let currentPlayer = playerRed

let gameOver = false
let board 

let rows = 6 
let columns = 7

let currColumns = []

let remainingSecondsStart = 10
let remainingSeconds = remainingSecondsStart

let interval = null

document.addEventListener('DOMContentLoaded', () => {
    setGame()
    startTimer(remainingSecondsStart)
    // const cels = document.querySelectorAll('.tile')
    // cels.forEach(cel => {
    //     let celFace = document.createElement('div')
    //     celFace.classList.add('tile__face')
    //     cel.appendChild(celFace)
    // })
})

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

function setPiece() {
    if (gameOver) return

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

function checkWinner() {
    // horizontaal 
    for (let r = 0; r < rows; r++){
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]){
                    setWinner(r, c)
                    return
                }
            }
        }
    }

    // verticaal 
    for (let c = 0; c < columns; c++){
        for (let r = 0; r < rows - 3; r++){
            if (board[r][c] != ' '){
                if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[+3][c]) {
                    setWinner(r, c)
                    return
                }
            }
        }
    }

    // tegen diagonaal 
    for (let r = 0; r < rows -3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                    setWinner(r, c)
                    return
                }
            }
        }
    }


    // diagonaal 
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                    setWinner(r, c)
                    return
                }
            }
        }
    }
}

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

    // currColumns = []
    // currColumns = [5, 5, 5, 5, 5, 5, 5]
    // board = []
    // for (let r = 0; r < rows; r++) {
    //     let row = []
    //     for (let c = 0; c < columns; c++) {
    //         row.push(' ')
    //     }
    //     board.push(row)
    // }

    setTimeout(function () {clearBoard() }, 1000)
    

    
}

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

function updateTimerElement(value) {
    document.querySelector('#time').innerHTML = value
}

function updateTimerColor() {
    let element = document.querySelector('.board__timer')
    if (element.classList.contains('board__timer--red')) {
        element.classList.remove('board__timer--red')
        element.classList.add('board__timer--yellow')
    } else {
        element.classList.remove('board__timer--yellow')
        element.classList.add('board__timer--red')
    }
}

function updatePlayerScoreDisplay(score) {
    if (currentPlayer == 'R') {
        document.querySelector('.player__score--1').innerHTML = score
    } else if (currentPlayer == 'Y') {
        document.querySelector('.player__score--2').innerHTML = score

    }

}

function winnerAnimation(winner) {

    const element = document.querySelector('.board')

    let animationTime = 5

    let className 
    if (winner == 'R') {
        className = 'board__winner--1'
    } else {
        className = 'board__winner--2'
    }

    let animationInterval = setInterval(() => {

        
        if (animationTime % 2 == 0) {
            element.classList.add(className)
        } else {
            element.classList.remove(className)
        }
        animationTime--
        //element.classList.remove(className)
        if (animationTime == 0){
            clearInterval(animationInterval)
            clearBoard()
        }
    }, 500)    
}

 