//Game constants and variable
let inputDir={x:0,y:0};//at start of game , snake is static at origin
const foodsound=new Audio('assets/Eat.mp3');
const gameoversound=new Audio('assets/Game over.mp3');
const turnsound=new Audio('assets/Turn.mp3');
const  bgsound=new Audio('assets/bg.mp3');
let speed = 5;
let score = 0;
let lastpainttime=0;
let snakeArr = [
    {x:13,y:15}
]
food = {x: 6, y: 7};//food is not array bcz its only one particle
//Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);//Game loop, for rendering screen (paint)
    //console.log(ctime);
    if((ctime - lastpainttime)/1000 < 1/speed){
        return;//will no paint the screen
    }
    lastpainttime=ctime;//for next time

    //Function to run the game
    gameengine();
    
}

function isCollide(snake){
    //if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snakeArr[0].x && snake[i].y === snakeArr[0].y){
            return true;
        }
    }

    //if you bump the wall
    if(snake[0].x >= 18 || snake[0].x<=0 || snake[0].y >= 18 || snake[0].y<=0){
        return true;
    }
    return false;    
    
}

function gameengine(){
    bgsound.play();
    //part 1 : Updating the snake array
     if(isCollide(snakeArr)){
        gameoversound.play();
        bgsound.pause(); 
        inputDir={x:0,y:0};
        alert("Game Over. Press any key to play again!");
        snakeArr = [
            {x:13,y:15}
        ]
        bgsound.play();
        score = 0;//for new game
     }

     //if we have eaten the food and increment the score and
     //regenerate the food
     if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodsound.play();
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x,y: snakeArr[0].y + inputDir.y});
        let a=2;
        let b=16;
        food = {x:Math.round(a + (b -a) * Math.random()), y:Math.round(a + (b -a) * Math.random())};
     }


    //Moving the snake
    for (let i = snakeArr.length -2; i >=0 ; i--) {
        snakeArr[i+1]={...snakeArr[i]};   
    }

    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    //part 2: Render/Display the snake and food

    //we want everything in board is cleaned
    //Display the snake
    board.innerHTML="";//dont want multiple snakes
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);

    });

    //Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



//Main logic starts here, main is the MAIN function
window.requestAnimationFrame(main);
window.addEventListener('keydown' , e=>{
    inputDir = {x:0,y:1} //Start the game
    turnsound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
            break;
             
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});



