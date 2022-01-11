// Create gameBoard Module to store game board state
const gameBoard = (function() {
  // State should be stored as an array inside of a Gameboard object
  let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  // Probably want a function to insert an X or O into a particular point in the array
  // This function should probably be exposed
  function updateBoard(letter, yIndex, xIndex){
    if(!board[yIndex][xIndex]) {
      board[yIndex][xIndex] = letter;
    } else {
      return 'Space is already occupied!'
    }
  }

  // Create a getBoardState function 
  function getBoardState(){
    // Return test board to check ui
    return board;
  }
  // Build logic to determine win or tie
  // Can manually check for each win conditon
  // Such as if board[0][0] === x && board[0][1] === x && board[0][3] === x  
  // Then win condition is met
  // Maybe use switch statement if going down this path
  // Should be eight win conditions per x or o
  // Create three functions, checkXWin, checkYWin, and checkTie
  function checkXWin(){
    switch (true) {
      case (board[0][0] === 'X' && board[0][1] === 'X' && board[0][2] === 'X'):
        return true;
      case (board[1][0] === 'X' && board[1][1] === 'X' && board[1][2] === 'X'):
        return true;
      case (board[2][0] === 'X' && board[2][1] === 'X' && board[2][2] === 'X'):
        return true;
      case (board[0][0] === 'X' && board[1][0] === 'X' && board[2][0] === 'X'):
        return true;
      case (board[0][1] === 'X' && board[1][1] === 'X' && board[2][1] === 'X'):
        return true;
      case (board[0][2] === 'X' && board[1][2] === 'X' && board[2][2] === 'X'):
        return true;
      case (board[0][0] === 'X' && board[1][1] === 'X' && board[2][2] === 'X'):
        return true;
      case (board[2][0] === 'X' && board[1][1] === 'X' && board[2][0] === 'X'):
        return true;
      default:
        return false
    }
  }
  function checkOWin(){
    switch (true) {
      case (board[0][0] === 'O' && board[0][1] === 'O' && board[0][2] === 'O'):
        return true;
      case (board[1][0] === 'O' && board[1][1] === 'O' && board[1][2] === 'O'):
        return true;
      case (board[2][0] === 'O' && board[2][1] === 'O' && board[2][2] === 'O'):
        return true;
      case (board[0][0] === 'O' && board[1][0] === 'O' && board[2][0] === 'O'):
        return true;
      case (board[0][1] === 'O' && board[1][1] === 'O' && board[2][1] === 'O'):
        return true;
      case (board[0][2] === 'O' && board[1][2] === 'O' && board[2][2] === 'O'):
        return true;
      case (board[0][0] === 'O' && board[1][1] === 'O' && board[2][2] === 'O'):
        return true;
      case (board[2][0] === 'O' && board[1][1] === 'O' && board[2][0] === 'O'):
        return true;
      default:
        return false
    }
  }

  function checkTie(){
    for (let i = 0; i < board.length; i++) {
      for(let j = 0; j < board[i].length; j++){
        if(!board[i][j]){
          return false
        }
      }
      
    }
    return true;
  }

  return {
    updateBoard: updateBoard,
    getBoardState: getBoardState,
    checkXWin: checkXWin,
    checkOWin: checkOWin,
    checkTie: checkTie

  };
})();

// Create module for displayController
// This module should handle all interactions with the gameBoard DOM


// Needs event listeners for when user interacts with the board DOM elements
// Cell event listeners needs to interact with the player object
  // Perhaps use a callback function that somehow refferences the current player object
  // How to call updateBoard with proper letter argument
// Make sure functions can accept both event listener input and strings so the computer can interact with the board
const displayController = (function(){
  
  // Select the DOM elements and store them in variables 
  let displayContainer = document.querySelector('.display-container');
  let gameBoardContainer = document.querySelector('.gameboard-container');

  document.addEventListener('click', cellHandler);
  // Render function
  // Cell divs have data attributes describing index in array
  // Not sure if creating an id attribute would be useful for CSS selectors
  // Need to call render function every time board state is updated
  // Use nested loops
    // Outer loop creates row div
    // Row div will need class row
    // Inner loop will append cell divs to the row div
    // Cell div will need class cell
  function render() {

    while (gameBoardContainer.firstChild) {
      gameBoardContainer.removeChild(gameBoardContainer.firstChild);
    }

    let board = gameBoard.getBoardState();
    board.forEach((row, yIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.toggle('row');

      row.forEach((cell, xIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.toggle('cell');
        cellDiv.setAttribute('data-yIndex', yIndex);
        cellDiv.setAttribute('data-xIndex', xIndex);
        cellDiv.innerText = cell;

        // console.log(cellDiv);
        rowDiv.appendChild(cellDiv)
      });

      gameBoardContainer.appendChild(rowDiv);
    });
  }

  function cellHandler(obj){
    if (obj.type === 'click' && obj.target.classList.contains('cell')){
      // Run game function
      console.log(obj);
      gameFlow.runTwoPlayerGame(obj);
    }
  }


  render();

  return {
    render: render
  }
  
})();

// Player factory
const Player = letter => {

  const getLetter = () => letter;

  return {getLetter}
};

// Maybe make another module to control the flow of the game itself
  // Use a currentPlayer variable to determine who's turn it is?
    // Can assign this variable to a player object
    // This variable needs to switch between the two players
    // while loop with some if logic
    // set player one to go first (i.e. if current player === '')
    // Then each further iteration: if currentPlayer === player1: player2 ? 

const gameFlow = (function(){
  let currentPlayer;

  const player1 = Player('X');
  const player2 = Player('O');

  function runTwoPlayerGame(obj){
    if(!currentPlayer) {
      currentPlayer = player1;
      gameBoard.updateBoard(player1.getLetter(), obj.target.getAttribute('data-yindex'), obj.target.getAttribute('data-xindex'));
    } else if (currentPlayer === player1) {
      currentPlayer = player2;
      gameBoard.updateBoard(player2.getLetter(), obj.target.getAttribute('data-yindex'), obj.target.getAttribute('data-xindex'));
    } else if (currentPlayer === player2){
      currentPlayer = player1;
      gameBoard.updateBoard(player1.getLetter(), obj.target.getAttribute('data-yindex'), obj.target.getAttribute('data-xindex'));
    }

    displayController.render();
    console.log(gameBoard.getBoardState());

  }

  return {
    runTwoPlayerGame: runTwoPlayerGame,
    player1: player1,
    player2: player2
  }
})();