var starImg,bgImg;
var star, starBody;
var fairy, fairyStarImg, fairyMovingAnimation;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
	starImg = loadImage("images/star.png");
	bgImg = loadImage("images/starryNight.jpg");
	fairyStarImg= loadAnimation("images/fairy.png");
	fairyMovingAnimation = loadAnimation("images/fairyImage1.png","images/fairyImage2.png");
	bgSound = loadSound("sound/JoyMusic.mp3");
}

function setup() {
	createCanvas(800, 600);

	// background music
	bgSound.play();

	
	// fairy settings
	fairy = createSprite(100,460,5,5);
	fairy.addAnimation("moving",fairyMovingAnimation);
	fairy.scale=0.2;

	// star settings
	star = createSprite(650,30);
	star.addImage(starImg);
	star.scale = 0.2;


	engine = Engine.create();
	world = engine.world;

	starBody = Bodies.circle(650,30,5, {restitution:0.5, isStatic:true});
	World.add(world, starBody);
	
	Engine.run(engine);

}


function draw() {
  background(bgImg);
  
  // for the star
  star.x= starBody.position.x 
  star.y= starBody.position.y 
  console.log(star.y);


  // key bindings
  keyPressed(fairy,star);

  //write code to stop star in the hand of fairy
  if (star.y > 400 && starBody.position.y > 400) {
	  Matter.Body.setStatic(starBody, true)
	  fairy.changeAnimation("looking",fairyStarImg);
  }

  drawSprites();

}

function keyPressed() {

	if (keyDown("left")) {
		fairy.x -= 20;
	}
	if (keyDown("right")) {
		fairy.x += 20;
	}

	
	if (keyDown("down")) {
		Matter.Body.setStatic(starBody,false); 
	}

	
	
}
