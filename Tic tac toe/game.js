
const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart-btn');
const xScoreStatus = document.getElementById('x-score');
const oScoreStatus = document.getElementById('o-score');
const drawScoreStatus = document.getElementById('draw-score');



const ICONS = {
    X: `<svg viewBox="0 0 100 100">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <line x1="15" y1="15" x2="85" y2="85"
        stroke="#185FA5" stroke-width="12"
        stroke-linecap="round"
        filter="url(#glow)"/>

  <line x1="85" y1="15" x2="15" y2="85"
        stroke="#185FA5" stroke-width="12"
        stroke-linecap="round"
        filter="url(#glow)"/>
</svg>`,

    O: `<svg viewBox="0 0 100 100">
  <defs>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <circle cx="50" cy="50" r="35"
          stroke="#0F6E56"
          stroke-width="12"
          fill="none"
          filter="url(#glow)"/>
</svg>`
}


const winPatterns = [
[0,1,2],[3,4,5],[6,7,8],
[0,3,6],[1,4,7],[2,5,8],
[0,4,8],[2,4,6]
];

let board = ['','','','','','','','',''];

let match = JSON.parse(localStorage.getItem('game'))  ||{
    currentPlayer: 'X',
    gameOver: false ,
    xScore: 0 ,
    oScore: 0,
    drawScore:0,
}

match.currentPlayer = "X";
saveData();

function saveData(){
    localStorage.setItem("game",JSON.stringify(match));
}
    

cells.forEach(cell => cell.addEventListener('click', handleClick));


function handleClick(e) {
    const index = (e.target.dataset.index);

    if(match.gameOver || board[index] !== '') return;

    board[index] = match.currentPlayer;
    e.target.innerHTML = ICONS[match.currentPlayer];

    let win = checkWinner();

    if(win){
        renderStatus("win",win);
        match.gameOver = true;
        win === 'X'? match.xScore++: match.oScore++;
        renderScore();
        resetBoard();
        saveData();
        return;
    }

    if(checkDraw()){
        renderStatus("draw");
        cells.forEach((cell)=>{
            cell.classList.add('draw');
        })
        setTimeout(()=>{
            cells.forEach((cell)=>{
                cell.classList.remove('draw');
            })
        },2200)
        match.gameOver = true;
        match.drawScore++;
        renderScore();
        resetBoard();
        saveData();
        return;
    }
  
    switchPlayer();
}




function checkWinner() {
    for(const win of winPatterns){
        if(
            board[win[0]] !== "" && 
            board[win[0]] === board[win[1]] &&
            board[win[1]] === board[win[2]]
        ){
            cells[win[0]].classList.add(`win${board[win[0]]}`);
            cells[win[1]].classList.add(`win${board[win[0]]}`);
            cells[win[2]].classList.add(`win${board[win[0]]}`);

            setTimeout(()=>{
                cells[win[0]].classList.remove(`win${board[win[0]]}`);
                cells[win[1]].classList.remove(`win${board[win[0]]}`);
                cells[win[2]].classList.remove(`win${board[win[0]]}`);
            },2000)
            return board[win[0]];
        }
    }
    return null;
}

function checkDraw() {
    return board.every(cell => cell !=="") ;
}

function switchPlayer() {
    match.currentPlayer = match.currentPlayer === "X"?"O":"X";
    renderStatus("player");
    saveData();
}


function resetBoard(){
    setTimeout(() => {
    board = ['','','','','','','','',''];
    cells.forEach(cell => cell.innerHTML = '');
    match.gameOver = false;
    match.currentPlayer = 'X';
    renderStatus("player");
    saveData();
  }, 2000);
}



restartBtn.addEventListener('click',()=>{
    match.xScore = 0;
    match.oScore = 0;
    match.drawScore = 0;
    match.currentPlayer = 'X';
    match.gameOver = false;
    board = ['','','','','','','','',''];
    cells.forEach(cell => cell.innerHTML = '');
    renderScore();
    renderStatus("player");
    saveData();
})

function renderScore(){
    oScoreStatus.innerText = match.oScore;
    drawScoreStatus.innerText = match.drawScore;
    xScoreStatus.innerText = match.xScore;
    saveData();
}

function renderStatus(message,winner=null){
    if(message==="player"){
    status.innerText = `Player ${match.currentPlayer}'s turn`;
    }
    else if(message === "win"){
        status.innerText = `Player ${winner} wins! 🎉`;
    }
    else if(message === "draw"){
        status.innerText = `It's a draw! 🤝`;
    }
}


renderScore();
renderStatus("player");
console.log(match);
