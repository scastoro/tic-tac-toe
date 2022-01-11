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
  // Can manually check for each win conditions
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
      case (board[2][0] === 'X' && board[1][1] === 'X' && board[0][2] === 'X'):
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
      case (board[2][0] === 'O' && board[1][1] === 'O' && board[0][2] === 'O'):
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

  // Reset gameBoard
  function resetGameBoard() {
    for (let i = 0; i < board.length; i++) {
      for(let j = 0; j < board[i].length; j++){
        board[i][j] = '';
      }
    }
  }

  return {
    updateBoard: updateBoard,
    getBoardState: getBoardState,
    checkXWin: checkXWin,
    checkOWin: checkOWin,
    checkTie: checkTie,
    resetGameBoard: resetGameBoard

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
  let player1Name;
  let player2Name;
  let isAttached;
  
  // Select the DOM elements and store them in variables 
  const displayContainer = document.querySelector('.display-container');
  const gameBoardContainer = document.querySelector('.gameboard-container');
  const startButton = document.getElementById('start-btn');
  const form = document.querySelector('.form-container');
  const formButton = document.getElementById('form-btn');

  startButton.addEventListener('click', startBtnHandler);
  formButton.addEventListener('click', formHandler)

  // Init() to start game when start game button is pressed
  // Needs to activate the cell event listener and display first player's name in display container
  // Need to create functions to add callbacks to event listeners and remove them
  function startBtnHandler() {
    if(startButton.innerText === 'Start Game'){
      startButton.innerText = 'Reset Game';
      form.style.display = 'block';
      toggleClickEvent();
    } else{
      // startButton.innerText = 'Start Game'
      gameBoard.resetGameBoard();
      gameFlow.gameReset();
      render();
      toggleClickEvent();
    }
  }

  function formHandler(event) {
    event.preventDefault();
    player1Name = form.firstElementChild.elements[0].value;
    player2Name = form.firstElementChild.elements[1].value;
    console.log(player1Name, player2Name);
    form.style.display = 'none';
    gameBoardContainer.style.display = 'flex';
    addDisplayElement(`${player1Name}'s turn.`)
    render();
  }
  // Toggle click event listener
  function toggleClickEvent(){
    
    if(!isAttached){
      document.addEventListener('click', cellHandler);
      isAttached = true;
      console.log(isAttached);
    }else {
      document.removeEventListener('click', cellHandler);
      isAttached = false;
      console.log(isAttached);
    }
  }

  // Render gameBoard
  function render() {
    // Clear board if present
    while (gameBoardContainer.firstChild) {
      gameBoardContainer.removeChild(gameBoardContainer.firstChild);
    }

    let board = gameBoard.getBoardState();
    // Iterate through first level of board array, creating rows
    board.forEach((row, yIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.toggle('row');
      // Iterate through each cell, creating and populating divs
      row.forEach((cell, xIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.toggle('cell');
        cellDiv.setAttribute('data-yIndex', yIndex);
        cellDiv.setAttribute('data-xIndex', xIndex);
        cellDiv.innerText = cell;

        rowDiv.appendChild(cellDiv)
      });

      gameBoardContainer.appendChild(rowDiv);
    });
  }

  function cellHandler(obj){
    if (obj.type === 'click' && obj.target.classList.contains('cell')){
      // Run game function
      gameFlow.runTwoPlayerGame(obj);
    }
  }
  // Add header to display container
  function addDisplayElement(text) {
    while (displayContainer.firstChild) {
      displayContainer.removeChild(displayContainer.firstChild);
    }

    const header = document.createElement('h1');
    header.classList.add('display-header');
    header.appendChild(document.createTextNode(text));

    displayContainer.appendChild(header);
  }
  // Function to handle form input for player names
  // Can create pop up modal 
  // Need to pass name information to gameFlow module

  function getPlayer1Name(){
    return player1Name;
  }

  function getPlayer2Name(){
    return player2Name;
  }

  return {
    render: render,
    addDisplayElement: addDisplayElement,
    getPlayer1Name: getPlayer1Name,
    getPlayer2Name: getPlayer2Name,
    toggleClickEvent: toggleClickEvent
  }
  
})();

// Player factory
const Player = (letter, name) => {

  const getName = () => name();
  const getLetter = () => letter;

  return {getLetter, getName}
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

  const player1 = Player('X', displayController.getPlayer1Name);
  const player2 = Player('O', displayController.getPlayer2Name);

  function runTwoPlayerGame(obj){
    if(!currentPlayer) {
      currentPlayer = player1;
      displayController.addDisplayElement(`${player2.getName()}'s turn!`);
      gameBoard.updateBoard(player1.getLetter(), obj.target.getAttribute('data-yindex'), obj.target.getAttribute('data-xindex'));
    } else if (currentPlayer === player1) {
      currentPlayer = player2;
      displayController.addDisplayElement(`${player1.getName()}'s turn!`);
      gameBoard.updateBoard(player2.getLetter(), obj.target.getAttribute('data-yindex'), obj.target.getAttribute('data-xindex'));
      if(gameBoard.checkOWin()){
        displayController.addDisplayElement(`${player2.getName()} Wins!`);
        displayController.toggleClickEvent();
        displayController.render();
        return
      }
    } else if (currentPlayer === player2){
      currentPlayer = player1;
      displayController.addDisplayElement(`${player2.getName()}'s turn!`);
      gameBoard.updateBoard(player1.getLetter(), obj.target.getAttribute('data-yindex'), obj.target.getAttribute('data-xindex'));
      if(gameBoard.checkXWin()){
        displayController.addDisplayElement(`${player1.getName()} Wins!`);
        displayController.toggleClickEvent();
        displayController.render();
        return
      }
    }

    displayController.render();
    if (gameBoard.checkTie()) {
      displayController.addDisplayElement('Tie! No one wins!');
      displayController.toggleClickEvent();
    }
    // console.log(gameBoard.getBoardState());

  }

  function gameReset(){
    currentPlayer = player2;
    displayController.addDisplayElement(`${player1.getName()}'s turn!`);    
  }

  return {
    runTwoPlayerGame: runTwoPlayerGame,
    gameReset: gameReset,
    player1: player1,
    player2: player2
  }
})();