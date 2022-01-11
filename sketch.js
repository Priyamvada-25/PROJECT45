const World= Matter.World;
const Engine= Matter.Engine;
const Bodies= Matter.Bodies;
const Constraint= Matter.Constraint;

var engine,world;


var backgroundImg;
var planet1,planet1Img;
var alien1Img, alien2Img;
var rocket, rocketImg;
var sky;
var starImg;
var restart, gameover, restartImg, gameOverImg;
var gameState= "PLAY";

function preload(){
    backgroundImg= loadImage("background3.png");
    rocketImg= loadImage("rocket.png");
    alien1Img= loadImage("alien1.png");
    alien2Img= loadImage("alien2.png");
    starImg= loadImage("star.png");
    planet1Img= loadImage("saturn.png");
    restartImg=loadImage("restart.png");
    gameOverImg= loadImage("gameover.png");
}

function setup(){
    createCanvas(1200,600);
    //engine= Engine.create();
    //world= engine.world;

    //alien1= new Alien(200,200,100,50);
    sky= createSprite(600,300,1200,600);
    sky.addImage("sky",backgroundImg);
    

    rocket= createSprite(600,500,40,40);
    rocket.addImage("rocket",rocketImg);
    rocket.scale= 0.4;

    planet1= createSprite(1100,500,60,60);
    planet1.addImage("planet2",planet1Img);
    planet1.scale= 0.8;

    gameover= createSprite(620,200,60,40);
    gameover.addImage("over",gameOverImg);
    gameover.scale= 0.5;

    restart= createSprite(600,350,40,40);
    restart.addImage("restart",restartImg);
    restart.scale= 0.04;

    aliensGroup= createGroup();
    starsGroup= createGroup();

}
function draw(){
    background("black");
    //Engine.update(engine);

   if(gameState==="PLAY"){
    sky.velocityY=3;
    restart.visible= false;
    gameover.visible= false;

    if(keyDown(LEFT_ARROW)){
        rocket.x= rocket.x-5;
    }
    if(keyDown(RIGHT_ARROW)){
        rocket.x= rocket.x+5;
    }
    spawnAliens();
    spawnStars();

        if(sky.y>400){
        sky.y=200;
        }
        if(rocket.isTouching(aliensGroup)){
            gameState= "END";
        }
        if(rocket.isTouching(starsGroup)){
            starsGroup.destroyEach();
        }

   }else if(gameState==="END"){
        sky.velocityY=0;
        aliensGroup.setVelocityYEach(0);
        starsGroup.setVelocityYEach(0);
        restart.visible= true;
        gameover.visible= true;

        if(mousePressedOver(restart)){
            reset();
        }
        
    }


    drawSprites();
}
function reset(){
    gameState= "PLAY";
    starsGroup.destroyEach();
    aliensGroup.destroyEach();
    rocket.x=600;
}

function spawnAliens(){
    if(frameCount%120===0){
        var alien= createSprite(500,-5);
        //alien.addImage("alien",alien1Img);
       // alien.scale=0.04;
        alien.x= Math.round(random(100,1100));
        alien.velocityY=3;
        aliensGroup.add(alien);

        var rand = Math.round(random(1,2));
        switch(rand) {
          case 1: alien.addImage(alien1Img);
          alien.scale=0.03;
                  break;
          case 2: alien.addImage(alien2Img);
          alien.scale=0.05;
                  break;
          default: break;
        }
    }
   
}
function spawnStars(){
    if(frameCount%160===0){
        var star= createSprite(400,-5);
        star.addImage("star",starImg);
        star.scale=0.07;
        star.x= Math.round(random(100,1100));
        star.velocityY=3;
        starsGroup.add(star);
    }
}
