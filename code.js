"use strict";
const Player = (mark)=>{
    const puntuation = 0;
    return {mark,puntuation}
}

const player1 = Player("X");
const player2 = Player("O");
player1.turn = true;
player2.turn = false;

const buttonRestart = document.querySelector(".restart");

const GameBoard = (()=>{
const counter1 = document.querySelector(".player-1-puntuation");
const counter2 = document.querySelector(".player-2-puntuation");
const nodeBoard = document.querySelector(".tablero");

counter1.innerHTML = player1.puntuation;
counter2.innerHTML = player2.puntuation;
const getCurrentPlayer = ()=> player1.turn == true? player1:player2;
let board = 
    ["","","",
    "","","",
    "","",""];
const setMark = (mark,p)=>{
   if(GameBoard.board[p] == ""){ GameBoard.board[p] = mark;
    }
    checkBoard(mark);
}
const checkBoard = (mark)=>{
for(let functions in WINCONDITIONS){
        let currentFunction = WINCONDITIONS[functions];
        let resultado = currentFunction(GameBoard.board,mark);
        if(resultado){
            getCurrentPlayer().puntuation += 1;
            counter1.innerHTML = player1.puntuation;
            counter2.innerHTML = player2.puntuation;
        }
       }
    }
return{board,setMark,nodeBoard,getCurrentPlayer}
})();

GameBoard.nodeBoard.addEventListener("click",e=>{
    let container = e.target.firstChild;
    if(e.target.classList.contains("casilla")){
         if(container.innerHTML == ""){ 
            container.innerHTML = GameBoard.getCurrentPlayer().mark;
            GameBoard.setMark(GameBoard.getCurrentPlayer().mark, container.classList[1]);
        };
        if(GameBoard.getCurrentPlayer() == player1){ 
            player1.turn = false;
            player2.turn = true;
        }else if(GameBoard.getCurrentPlayer() == player2){
            player1.turn = true;
            player2.turn = false;
        }
    }
})

buttonRestart.addEventListener("click", e=>{
    player1.turn = true;
    player2.turn = false;
    GameBoard.board = GameBoard.board.map( e => e = "");
    for(let i = 0; i < GameBoard.nodeBoard.children.length; i++){
    GameBoard.nodeBoard.children[i].firstChild.innerHTML = "";
 }
})

const WINCONDITIONS = {
    1 : function(arr,mark){
     let p = arr.indexOf(mark);
     let p2 = arr.indexOf(mark,1);
     if(arr[p] == arr[p + 3] && arr[p] == arr[p + 6]) return true;
     else if(arr[p2] == arr[p2 + 3] && arr[p2] == arr[p2 + 6]) return true;
    },
    2 : function(arr,mark){
        let acumulador = [];
        for(let i= 0; i < 7;i+=3){
            acumulador.push(arr.slice(i,i+3).every(m => m == mark));
        }
        return acumulador.some(d => d == true)
    },
    3 : function(arr,mark){
        if(arr.slice(0,3).includes(mark)){
     let p = arr.slice(0,3).indexOf(mark);
     let p2 = arr.slice(0,3).indexOf(mark,2);
     if(arr[p] == arr[p + 4] && arr[p] == arr[p + 8]) return true;
     else if(arr[p2] == arr[p2 + 2] && arr[p2] == arr[p2 + 4]) return true;
    }
}
 }
