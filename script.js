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

  // Create a getBoardState function that allows you to pass the yIndex and xIndex
  // This will return the state at a particular index of the board attribute
  function getBoardState(yIndex, xIndex){
    return board[yIndex][xIndex];
  }

  return {
    updateBoard: updateBoard,
    getBoardState: getBoardState
  };
})();

// Create module for displayController
// This module should handle all interactions with the gameBoard DOM
// Needs to select the DOM elements and store them in variables 
// Needs a render function
  // Make sure that elements (both row and cell divs) are rendered with a data attribute for both x and y index
  // Not sure if creating an id attribute would be useful for CSS selectors
  // Need to call render function every time board state is updated
  // Use nested loops
    // Outer loop creates row div
    // Row div will need class row
    // Inner loop will append cell divs to the row div
    // Cell div will need class cell
// Needs event listeners for when user interacts with the board DOM elements
// Cell event listeners needs to interact with the player object
  // Perhaps use a callback function that somehow refferences the current player object
  // How to call updateBoard with proper letter argument
// Make sure functions can accept both event listener input and strings so the computer can interact with the board
const displayController = (function(){

})();

// Maybe make another module to control the flow of the game itself
  // Use a currentPlayer variable to determine whoes turn it is?
    // Can assign this variable to a player object
    // This variable needs to switch between the two players
    // while loop with some if logic
    // set player one to go first (i.e. if current player === '')
    // Then each futher iteration: if currentPlayer === player1: player2 ? 
// Also need a factory for players