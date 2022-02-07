var backgroundImg;
var spaceship, spaceshipImg;
var obstaclesGroup, obstacle, obstacleImg;
var asteroidGroup, asteroid, asteroidImg;
var laserGroup, laser, laserImg;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;
var ground;
var life=3, lifeImg;
var MENU = 2;
var gameOver,gameOverImg;
var restart, quit;




function preload(){
  backgroundImg = loadImage('space.png');
  spaceshipImg = loadImage('spaceship.png');
  obstacleImg = loadImage('obstacle.png');
  laserImg = loadImage('laser.png');
  asteroidImg = loadImage('asteroid.png');
  lifeImg = loadImage('life.png');
  gameOverImg = loadImage('gameOver.jpg');
}

function setup() {
 createCanvas(500,500);
 spaceship = createSprite(250, 380, 30, 30);
 spaceship.addImage(spaceshipImg);
 spaceship.scale = 0.08;

 ground = createSprite(250,500,500,5);
 ground.visible = false;

 obstaclesGroup=new Group();
 laserGroup=new Group();
 asteroidGroup=new Group();
}

function draw() {
  background(backgroundImg); 

  if(gameState===PLAY){
    life1();
    spawnLasers();
    spawnObstacles();
    spawnAsteroids();
    points();
    move();
    collide();

    spaceship.visible = true;
  }

  else if(gameState===END){
    game();

    spaceship.x = 250;

    obstaclesGroup.destroyEach();
    obstaclesGroup.setLifetimeEach(-1);
    obstaclesGroup.setVelocityYEach(0);

    laserGroup.destroyEach();
    laserGroup.setLifetimeEach(-1);
    laserGroup.setVelocityYEach(0);

    asteroidGroup.destroyEach();
    asteroidGroup.setLifetimeEach(-1);
    asteroidGroup.setVelocityYEach(0);

  } 

  drawSprites();
}

function move(){
  
  if(keyDown('left_arrow')){
    spaceship.x = spaceship.x-15
  }
  
  if(keyDown('right_arrow')){
    spaceship.x = spaceship.x+15
  }

  if(spaceship.x>500||spaceship.x<0){
    spaceship.x=250;
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
    obstacle = createSprite(random(0,500),random(0,110),20,20);
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.09;
    obstacle.velocityY = 10;
    obstacle.lifetime = 55;
    obstaclesGroup.add(obstacle);
  }
}

function spawnLasers(){
    if(keyDown('space')){
    laser = createSprite(spaceship.x,spaceship.y-35,10,10);
    laser.addImage(laserImg);
    laser.scale = 0.05;
    laser.velocityY = -2;
    laser.lifetime = 200;
    laserGroup.add(laser);
 }
}

function spawnAsteroids(){
  if(frameCount%35===0){
    asteroid = createSprite(random(15,485),random(0,110),15,15);
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.09;
    asteroid.velocityY = 8;
    asteroid.lifetime = 165;
    asteroidGroup.add(asteroid);
  }
}

function points(){
  if(asteroidGroup.isTouching(laserGroup)){
    score=score+10;
    asteroid.destroy();
    laserGroup.destroyEach();
  }

  if(obstaclesGroup.isTouching(laserGroup)){
    score=score+50;
    obstacle.destroy();
    laserGroup.destroyEach();
  }
 
  fill(0,255,0);
  text('Score: '+score,400,20);
}

function collide(){
  if(asteroidGroup.isTouching(ground)){
    asteroidGroup.destroyEach();
    
  }

  if(obstaclesGroup.isTouching(ground)){
    obstaclesGroup.destroyEach();
  }

}

function life1(){
  if(asteroidGroup.isTouching(ground)||asteroidGroup.isTouching(spaceship)){
    life=life-1;
    asteroidGroup.destroyEach();
  }
  
  if(life<=0){
    gameState=END;
  }
  
  if(life==3){
    fill(0,255,0);
    text('Life:'+life,10,20);
  }

  if(life==2){
    fill(255,255,0);
    text('Life:'+life,10,20);
  }

  if(life==1){
    fill(255,0,0);
    text('Life:'+life,10,20);
  }
}

function game(){
  background(gameOverImg);
  
  fill(255,0,0);
  text('Score: '+score,400,20);
  
  gameOver=createSprite(250,250,1,1);
  gameOver.visible = true;

  quit=createSprite(326,414,100,40);
  quit.visible=false;
  
  restart = createSprite(188,414,100,40);
  restart.visible=false;

  if(mousePressedOver(restart)){
    score=0;
    gameState=PLAY;
    life=3;
  }

  if(mousePressedOver(quit)){
   window.close()
  }
  spaceship.visible=false;


}
