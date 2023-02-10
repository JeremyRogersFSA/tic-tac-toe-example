let gameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

let boardElement = document.getElementById('board')
let player1Btn = document.getElementById('player1-btn')
let player2Btn = document.getElementById('player2-btn')
let player1Name = document.getElementById('player1-name')
let player2Name = document.getElementById('player2-name')
let startBtn = document.getElementById('start-btn')
let message = document.getElementById('message')

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

boardElement.addEventListener('click', (event) => {
  // click a cell, change the game board
  if ('cell' in event.currentTarget.classList) {
    let id = event.currentTarget.id.split('-')
    let row = id[0]
    let col = id[1]
    event.currentTarget.textContent = gameboard[row][col]
    console.log(event.currentTarget.id)
  }
})
