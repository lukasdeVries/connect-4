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

document.addEventListener('DOMContentLoaded', () => {
    setGame()
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
    let winner = document.querySelector('board__timer')
    if (board[r][c] == playerRed) {
        redPlayerScore++
        console.log('red')
    }else {
        yellowPlayerScore++
        console.log('yellow')

    }
    gameOver = true 
}
