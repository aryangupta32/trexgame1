var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var obstacles1,obstacle2,obstacle3,obstacle4,obstacle5,
obstacle6;
var obstacleGroup,cloudGroup,cloudImage;
var PLAY=1
var END=0
var gameState
var gameOverIMAGE,restartImage
var gameOver,restart
 
var score;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  groundImage = loadImage("ground2.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  cloudImage = loadImage("cloud.png")
  gameOverIMAGE=loadImage("gameOver.png")
  restartImage=loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  score=0;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX=-(6+3*score/100);
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  obstacleGroup = new Group();
  cloudGroup =new Group();
  
  gameOver=createSprite(300,100,20,20);
  gameOver.addImage(gameOverIMAGE);
  gameOver.visible=false;
  
  restart=createSprite(300,140,20,20);
  restart.addImage(restartImage);
  restart.visible=false;
  

  gameState=PLAY;
  
}

function draw() {
  background(180);
  
  
  
  if (gameState===PLAY){
    if(keyDown("space")) {
    trex.velocityY = -10;
  }
    
   
    
    if (ground.x < 0){
    ground.x = ground.width/2;
  }
    
    trex.velocityY = trex.velocityY + 0.8
    
     score=score+1;
    
  spawnobstacles();
  spawnclouds();
    
  if(obstacleGroup.isTouching(trex)){
    gameState=END;
     }
    
  }
  
  else if (gameState===END){
      gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    
    //change the trex animation
    trex.changeAnimation("collided",trex_collided);
    
    //set lifetime of the game objects so that they are       never destroyed
    obstacleGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    if (mousePressedOver(restart)){
      reset();
    }
    
  }
  
  text("score"+score,500,50);
 
  trex.collide(invisibleGround);
  
  drawSprites();
 
}

function reset(){
gameState=PLAY;
  
gameOver.visible = false;
restart.visible = false;
  
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
  score = 0;
  
}

function spawnobstacles(){
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1)
      break;
      case 2:obstacle.addImage(obstacle2)
      break;
      case 3:obstacle.addImage(obstacle3)
      break;
      case 4:obstacle.addImage(obstacle4)
      break;
      case 5:obstacle.addImage(obstacle5)
      break;
      case 6:obstacle.addImage(obstacle6)
      break;
      default:
      break;
  }
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    
    obstacleGroup.add(obstacle);
  }
}

function spawnclouds(){
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    cloudGroup.add(cloud);
  }
  
  
  
}
