var dog;
var foodS;
var database;
var foodstock;
var happydogImg;
var dogImg;

function preload()
{
	happydogImg=loadImage("images/dogImg1.png")
  dogImg=loadImage("images/dogImg.png")
}

function setup() 
{
	createCanvas(700, 700);

  dog = createSprite(350,350)
  dog.addImage(dogImg)
  dog.scale=0.4

  database=firebase.database()

  foodstock=database.ref('Food')
  foodstock.on("value",readStock)
  
}


function draw() 
{  
  background("lightblue")

  if(keyWentDown(UP_ARROW))
  {
   writeStock(foodS)
   dog.addImage(happydogImg)
  }
  drawSprites();
  
  fill("black")
  textSize(20)
  text("PRESS UP_ARROW KEY TO FEED THE DOG",100,100)
  text("Food:"+foodS,100,150)
}

function readStock(data)
{
  foodS = data.val();
}

function writeStock(x)
{
  if(x<=0){
   x=0
  }else{
   x=x-1}
  database.ref('/').update({
    Food:x
  })
}

