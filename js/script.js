let inputDir = {x: 0, y: 0};


let hscoreBox = document.getElementById("hscore");
let scoreBox = document.getElementById("score");

// sounds
// let sound = new Audio('dfsd');

let score =0;

let speed = 7;
let lastPaintTime = 0;

let snakeArr = [
    {x:15, y:15 }
]
 
obj = {x:4,y:8}

// game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
    // console.log(ctime);
}

function isCollide(snake){
    // khud se takra jaye
    for(let i = 1; i< snakeArr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }

    // wall se tafra
    if(snake[0].x >= 20 || snake[0].x <= 0 || snake[0].y >= 20 || snake[0].y <= 0){
            return true;
        }

    return false;

}

function gameEngine(){
    if(isCollide(snakeArr)){
        inputDir = {x: 0, y: 0};
        alert("press any key to play again !!");
        snakeArr = [{x:15, y:15 }]

        score = 0;
    }

    // if eaten 
    if(snakeArr[0].y === obj.y && snakeArr[0].x === obj.x){
        score +=1;
        console.log(score);
        console.log(hscore);
        if(score>hscore){
            hscore = score;
            localStorage.setItem("hscore", JSON.stringify(hscore));
            hscoreBox.innerHTML = "Heighest Score : " + hscore;
        }
        scoreBox.innerText = "Score : "+ score;

        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 1;
        let b = 18;
        obj = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // moving the snake
    for(let i = snakeArr.length -2; i >= 0; i--){
        // const element = array[i];
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


    // display snake
    board.innerHTML = "";
    snakeArr.forEach((e,index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    })

    // display food
    objElement = document.createElement('div');
    objElement.style.gridRowStart = obj.y;
    objElement.style.gridColumnStart = obj.x;
    objElement.classList.add('obj');
    board.appendChild(objElement);
} 







let hscore = localStorage.getItem("hscore");
if(hscore === null){
    hscore = 0;
    localStorage.setItem("hscore", JSON.stringify(hscore))
}else{
    // hscore = JSON.parse(hscore);
    hscoreBox.innerHTML = "Heighest Score : " + hscore;
}


// main logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDir = {x:0, y: 1} // start game

    switch (e.key) {
        case "ArrowUp":
            console.log("arrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("arrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("arrowleft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("arrowright");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;
    }

})