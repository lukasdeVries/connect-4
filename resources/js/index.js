import Board from "./board.js"

document.addEventListener('DOMContentLoaded', () => {
    const field = document.querySelector('.board__field')
    let board = new Board(field)
})