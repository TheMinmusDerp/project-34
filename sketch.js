//Create variables here
var foodStock;
var foodS;
var database;
var dog, dogIMG;
var doggo, happiDoggo;

function preload()
{
  doggo = loadImage("images/dogImg.png");
  happiDoggo = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,250,250,250);
  dog.addImage(doggo);
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}

function draw() {
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);  
    if(foodStock!==0){
      dog.addImage(happiDoggo);
    }
  } else {
    dog.addImage(doggo);
  }
  //if(bonk){bonk};
  drawSprites();
  textSize(30);
  fill(255);
  stroke(0);
  //add styles here

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
    Food: x
  })
}