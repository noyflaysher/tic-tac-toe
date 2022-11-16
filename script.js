const container=document.querySelector(".container");
const result=document.querySelector(".result");
const restart=document.querySelector(".newGame");
let boxes;
let turn="X";
let theWinCombination;
const winCombinations=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
restart.addEventListener("click",()=>restartGame());

init();


function init(){
    for(let i=0;i<9;i++){
        box=document.createElement("div");
        box.classList.add("box");
        container.appendChild(box);
        box.addEventListener("click", clickBox,{once:true});
    }
}

function restartGame(){
    let box;
    for(let i=0;i<9;i++){
        boxes[i].innerText="";
        result.innerText="";
        container.style.pointerEvents="unset";
        boxes[i].removeEventListener("click",clickBox);
        turn="X";
        restart.classList.remove("showNewGame");
        theWinCombination.every((item)=> boxes[item].style.background="none");
        boxes[i].addEventListener("click", clickBox,{once:true});
    }
}

boxes=document.querySelectorAll(".box");

function clickBox(e){
    const currentBox=e.target;
    if(turn==="X"){
        turn="Y";
        currentBox.innerText="X";
    }
    else{
        turn="X";
        currentBox.innerText="O";
    }

    const currentSelection=currentBox.innerText;

    const win=checkWin(currentSelection);

    if(win){
        theWinCombination.every((item)=> boxes[item].style.background="blue");
        gameOver("win",currentSelection);
    }
    else if(turnsOver()){
        gameOver("turns over", currentSelection);
    }
}

function checkWin(currentSelection){
    return winCombinations.some((combination)=>{
        theWinCombination=combination;
        return combination.every((item)=> boxes[item].innerText === currentSelection)
    })

}

function turnsOver(){
    return [...boxes].every((box)=>box.innerText==="X" || box.innerText==="O");
}

function gameOver(type,currentSelection){
    if(type==="win"){
        result.innerText="The winner is: " + currentSelection;
    }else{
        result.innerText="The game is finish - no winner";
    }

    container.style.pointerEvents="none";
    restart.classList.add("showNewGame");
}



