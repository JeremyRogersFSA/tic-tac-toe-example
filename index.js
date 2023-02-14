let gameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

let boardElement = document.getElementById('board')
let message = document.getElementById('message')
let player = 'X'
let winner = ''
let player1Btn = document.getElementById('player1-btn')
let player1Name = document.getElementById('player1-name')
let player1Input = document.getElementById('player1-input')
let player1 = ''
let player2Btn = document.getElementById('player2-btn')
let player2Input = document.getElementById('player2-input')
let player2Name = document.getElementById('player2-name')
let player2 = ''
let gameStart = false
let availableMoves = 9
let startBtn = document.getElementById('start-btn')
let resetBtn = document.getElementById('reset-btn')

// createe function to make the game board
function makeBoard() {
  for (let row = 0; row < 3; row++) {
    console.log('row', gameboard[row])
    let rowEl = document.createElement('div')
    rowEl.classList.add('row')
    rowEl.id = `row${rowEl}`
    for (let col = 0; col < 3; col++) {
      console.log('col', gameboard[row][col])
      let cellEl = document.createElement('div')
      cellEl.classList.add('cell')
      cellEl.id = `${row}-${col}`
      if (gameboard[row][col] !== null) {
        cellEl.textContent = gameboard[row][col]
      }
      rowEl.appendChild(cellEl)
    }
    boardElement.appendChild(rowEl)
  }
}

//run the above function when the page finishes loading
document.addEventListener('DOMContentLoaded', makeBoard)

// start the game
startBtn.addEventListener('click', () => {
  if (gameStart === false) {
    gameStart = true
  }
})

resetBtn.addEventListener('click', () => {
  gameboard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ]
  //remove old nodes
  while (boardElement.lastElementChild) {
    boardElement.removeChild(boardElement.lastElementChild)
  }
  // make new board
  makeBoard()

  //reset game state
  player = 'X'
  winner = ''
  gameStart = false
  availableMoves = 9
  message.textContent = ''
})

player1Btn.addEventListener('click', () => {
  player1=player1Input.value
  player1Name.textContent=player1
  player1Input.value=''
  player1Input.textContent=''
})
player2Btn.addEventListener('click', () => {
  player2 = player2Input.value
  player2Name.textContent = player2
  player2Input.value = ''
  player2Input.textContent = ''
})

//make a move, check win or draw, change player
boardElement.addEventListener('click', (event) => {
  if (gameStart === true) {
    // click a cell, change the game board
    let classes = event.target.classList
    if (classes.contains('cell')) {
      let idArray = event.target.id.split('-')
      let row = Number(idArray[0])
      let col = Number(idArray[1])
      if (gameboard[row][col] === null) {
        // change gameboard, text of cell, and remove 1 from available moves
        gameboard[row][col] = player
        event.target.textContent = gameboard[row][col]
        availableMoves--

        // check if winning condition
        let vertical = 0
        let diagonalTop = 0
        let diagonalBottom = 0
        let bottom = 2

        for (let rowI = 0; rowI < 3; rowI++) {
        let horizontal = 0
        // stop if winner found
        if (winner !== '') {
          break
        }
        //reset vertical
        vertical = 0

        // check diagonals
        if (gameboard[rowI][rowI] === player) {
          diagonalTop++
        }
        if (gameboard[bottom][rowI] === player) {
          diagonalBottom++
        }
        // remove one from bottom, to move it up next time
        bottom--

        // check vertical and horizontal
        for (let colI = 0; colI < 3; colI++) {
          if (gameboard[colI][rowI] === player) {
            vertical++
          }
          if (gameboard[rowI][colI] === player) {
            horizontal++
          }

          // check if there are any 3 across
          if (vertical === 3 || horizontal === 3 || diagonalTop === 3 || diagonalBottom === 3) {
            // current player wins
            if (player === 'X') {
              winner = player1
            } else {
              winner = player2
            }
            }
          }
        }

        if (winner !== '') {
          gameStart = false
          player = 'X'
          message.textContent = `Player ${winner} wins!!!`
        } else if (availableMoves === 0) {
          // stop if no moves
          gameStart = false
          player = 'X'
          message.textContent = 'Draw!!!'
        } else {
          // change player
          player === 'O' ? (player = 'X') : (player = 'O')
        }
      }
    }
  }
})
