
var monkey , monkey_running,ground
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var score = 0;
var gameState = 1;
var PLAY = 1;
var END=0; 
var num; 
var survivalTime = 0; 
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600); 
  num = prompt("Enter your name"); 
  monkey = createSprite(80,470,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1; 
  
  ground = createSprite(400,500,900,10); 
  ground.x = ground.width/2;
     
  foodGroup = createGroup(); 
  obstacleGroup = createGroup();
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height); 
   
}


function draw() {
  background(255); 
  
  
  
  if(gameState===PLAY){
    
    if(ground.x<0){
    ground.x = ground.width/2;
     
     }
    if(keyDown("space")&&monkey.y>=140){
    monkey.velocityY = -12; 
  }
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach(); 
    score = score+1; 
    
     
  }
  monkey.velocityY = monkey.velocityY + 0.8; 
    
    if(obstacleGroup.isTouching(monkey)){
       gameState = END; 
       }
    Obstacle(); 
  Food();
  } else if(gameState===END){
    obstacleGroup.setVelocityXEach(0);
    foodGroup.setVelocityXEach(0); 
     monkey.velocityY = 0;
    
    obstacleGroup.setLifetimeEach(-1); 
    foodGroup.setLifetimeEach(-1);
    background("red")
    textSize(50); 
    fill("black"); 
    text("GAME OVER",150,300);
    textSize(20)
    text("HARDLUCK "+num,200,260)
    
    textSize(20); 
    text("PRESS SPACE TO RESTART THE GAME",110,320)
    monkey.visible = false; 
    obstacleGroup.destroyEach();
    foodGroup.destroyEach(); 
    ground.visible = false; 
    if(keyDown("space")&gameState===END){
     gameState= PLAY;
     monkey.visible = true; 
     ground.visible = true; 
     background("white"); 
     score = 0;
     
     monkey.x = 80;
     monkey.y = 470;
      
    }
    
  }
  monkey.collide(ground);
  
 drawSprites();
  textSize(20); 
  fill("black")
  text(num+"'s Score:"+score,350,25); 
   
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival time:"+survivalTime,50,550); 
  
}

function Obstacle(){
  if(frameCount%150===0){
    obstacle = createSprite(550,470,20,20); 
    
    obstacle.velocityX= -(8+score/1);
    obstacle.addAnimation("obstacle",obstacleImage);
    obstacle.scale = 0.2; 
     obstacle.lifetime = 100; 
    obstacleGroup.add(obstacle); 
     }
  
}
function Food(){
  if(frameCount%80===0){
    food = createSprite(550,180,30,30);
    food.y = Math.round(random(120,250));
    food.velocityX = -(10+score/1); 
    food.addAnimation("banana",bananaImage);
    food.lifetime = 80; 
    food.scale = 0.1;
    foodGroup.add(food); 
  }
}




