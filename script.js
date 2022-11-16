const container=document.getElementById("container");
const result=document.getElementById("result");
const restart=document.getElementById("newGame");
const winCombinations=[
[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];
let boxes;
let turnX=true;
let correctCombination;

newGame("");
restart.addEventListener("click",()=>newGame("restart"));

function newGame(type){
    let box;
    for(let i=0;i<9;i++){
        if(type==="restart"){
            container.style.pointerEvents="unset";
            boxes[i].removeEventListener("click",clickBox);
            boxes[i].innerText="";
            result.innerText="";
            turnX=true;
            restart.classList.remove("showNewGame");
            correctCombination.every((item)=> boxes[item].style.background="none");
        }else{
            box=document.createElement("div");
            box.classList.add("box");
            container.appendChild(box);
        }
        
        (box||boxes[i]).addEventListener("click", clickBox,{once:true});
    }
    
}

boxes=document.querySelectorAll(".box");

function clickBox(e){
    const currentBox=e.target;
    if(turnX){
        turnX=false;
        currentBox.innerText="X";
    }
    else{
        turnX=true;
        currentBox.innerText="O";
    }

    const currentSelection=currentBox.innerText;

    const win=checkWin(currentSelection);

    if(win){
        correctCombination.every((item)=> boxes[item].style.background="blue");
        gameOver("win",currentSelection);
    }
    else if(isGameDraw()){
        gameOver("draw", currentSelection);
    }
}

function checkWin(currentSelection){
    return winCombinations.some((combination)=>{
        correctCombination=combination;
        return combination.every((item)=> boxes[item].innerText === currentSelection)
    })

}

function isGameDraw(){
    return [...boxes].every((box)=>box.innerText==="X" || box.innerText==="O");
}

function gameOver(type,currentSelection){
    if(type==="win"){
        result.innerText="The winner is: " + currentSelection;
    }else{
        result.innerText="Match Draw ";
    }

    container.style.pointerEvents="none";
    restart.classList.add("showNewGame");
}



