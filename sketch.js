var PLAY = 1;
var END = 0;
var gameState = PLAY;

var car;
var car1;
var roadbg;
var roadbg1;
var roadbga
var roadbg2;
var obs;
var obsa;
var obs1group;
var obs2
var obsb;
var obs2group;

var invisiblesideL;
var invisiblesideR;

var score = 0;


function preload(){
    car1 = loadImage("car_w_bg-removebg-preview (1).png");
    roadbg1 = loadImage("road.jpg")
    roadbg2 = loadImage("road copy.jpg");
    obsa = loadImage("traffic_light_w_bg-removebg-preview.png")
    obsb = loadImage("traffic_w_bg-removebg-preview.png")
}

function setup() {
    createCanvas(500, windowHeight);
    
    roadbg = createSprite(250,windowHeight/2,500,height);
    roadbg.addImage("road",roadbg1);
    roadbg.Y = windowHeight/2;
    roadbg.velocityY = 2;
    roadbga = createSprite(250,windowHeight,500,height);
    roadbga.addImage("road",roadbg1);
    roadbga.Y = windowHeight/2;
    roadbga.velocityY = 2;


    car = createSprite(250,windowHeight/2,30,50);
    car.addImage("car",car1);
    car.scale = 0.2

    invisiblesideL = createSprite(85,height/2,length,20);
    invisiblesideL.visible = false;

    invisiblesideR = createSprite(415,height/2,length,20);
    invisiblesideR.visible = false;
  
    
  
    obs1group = new Group();

}

function draw() {
    background(0);
    text("Score: "+ score, 400,windowHeight-(windowHeight-50));

    if (gameState===PLAY){
        score = score + Math.round(getFrameRate()/60);
        roadbg.velocityY = 2;
        roadbga.velocityY = 2;
        if(keyDown("RIGHT_ARROW")) {
          car.velocityX = 2;
        }
        else{
            if(keyDown("LEFT_ARROW")) {
                car.velocityX = -2;
            
              }
            else{
                car.velocityX = 0
            }
        }

        if(keyDown("LEFT_ARROW")) {
            car.velocityX = car.velocityX-3;
        
          }
     
      
          if (roadbg.y < 0){
            roadbg.y = roadbg.length/2;
          }
          if (roadbga.y < 0){
            roadbga.y = roadbga.length/2;
          }
      
        car.collide(invisiblesideL);
        car.collide(invisiblesideR);
        spawnobs1();
      
        if(obs1group.isTouching(car)){
            gameState = END;
        }
      }
      else if (gameState === END) {
        roadbg.velocityY = 0;
        roadbga.velocityY = 0
        car.velocityX = 0;
        obs1group.setVelocityYEach(0);
        obs1group.setLifetimeEach(-1);
        text("GAMEOVER, YOUR SCORE WAS: "+ score , 175,windowHeight/2);

      }
      
      drawSprites();
}
function spawnobs1() {
    if (frameCount % 100 === 0) {
      var obs = createSprite(width-30,height-150,10,10);
      obs.y = 0
      obs.x = Math.round(random(90,410));
      obs.addImage("obstacle",obsa);
      obs.scale = 0.2;
      obs.velocityY = 3;
      
      obs.lifetime = 200;
 
      obs.depth = car.depth;
      car.depth = car.depth + 1;
   
      obs1group.add(obs);
    }
    
  }