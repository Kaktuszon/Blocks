function setup() {
	createCanvas(240, 320); //Create a canvas for playing on
	frameRate(60); //Fix the framerate
	
	p = new Player(); //Create new player object
	gg = new Goal(); //Create new goal to take
	m = new Map(); //Create the map object
}

var gameStatus = 0; //To hold what status the game is on

function draw() {
	background(51); //Set a dark background
	m.show(); //Draw from the map object

	//Menu
	if(gameStatus === 0) {
		textSize(16);
		text("Press space to play", 50, 50);

	}
	
	//Game is played
	if(gameStatus === 1) {
		p.show(); //Draw player
		gg.show(); //Draw goal object

		p.update(); //Update the player, moving and so
		gg.update(); //Update the goal, move it down and so on

		keyPressed(); //Check for player input
	}

	//Game is lost
	if(gameStatus === 2) {
		textSize(32);
		text("Game lost!", 45, 60)

		textSize(16);
		text("Press space to play again", 30, 90);
		p.lives = 3;
	}
}


//Check input from players keyboard
function keyPressed() {
	if(keyCode === LEFT_ARROW) {
		p.dir = -1; //Left arrow pressed, face left
	} else if(keyCode === RIGHT_ARROW) {
		p.dir = 1; //Right arrow pressed, face right
	} else if(keyCode === 32) {
		gameStatus = 1; //Space is presesd, set the game to status 1 which is game is running
	}
}

function Player() {
	this.x = (240/2-8); //Set coordinate for player in middle of screen
	this.y = (320-32); //Set the player right above the floor
	this.xspeed = 0; //Set the speed so the player don't move directly when game start
	this.dir = 0; //Which way the player should move
	this.lives = 3; //How many lives the player has

	//Draw player and lives
	this.show = function() {
		fill(255); //Set the color white
		rect(this.x, this.y, 16, 16); //Draw the player

		fill(255, 0, 0); //Draw red
		for(var i = 0; i<this.lives; i++) {
			ellipse((18*i)+30, 40, 16, 16); //Draw circles for every life
		}
	}

	this.update = function() {
		this.x = this.x + this.xspeed; //Move the player with the xspeed chosen

		//Which way to move and check collision
		if(this.dir === -1 && this.x >= 16) {
			this.xspeed = -2; //Facing left, move left
		} else if(this.dir === 1 && this.x <= (240-32)) {
			this.xspeed = 2; //Facing right, move right
		} else {
			this.xspeed = 0; //Not facing somewhere, don't move
		}

		if(this.lives < 0) {
			gameStatus = 2; //If out of life, change gameStatus to lost game
		}
	}
}

function Map() {
	//Map array
	var gameMap = [
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];

	this.score = 0; //Set score to zero

	this.show = function() {
		//Draw the map
		for(var y = 0; y<gameMap.length; y++) {
			for(var x = 0; x<gameMap.length; x++) {
				if(gameMap[y][x] === 1) {
					fill(120);
					rect(x*16, y*16, 16, 16);
				}
			}
		}

		//Draw score
		textSize(24);
		text("Score: " + this.score, 20, 24);
	}
}

function Goal() {
	this.x = Math.floor((Math.random() * 176) + 1); //Randomize the goal x coordinate
	this.y = -16; //Start the goal outside the screen
	this.yspeed = 2; //A fixed speed to move

	//Draw the goal
	this.show = function() {
		fill(0, 255, 0);
		rect(this.x, this.y, 16, 16);
	}

	this.update = function() {
		this.y += this.yspeed; //Move the goal

		//Check for collision
		//Collision is true with player
		if(this.x+16 >= p.x && this.x <= p.x+16) {
			if(this.y+16 >= p.y) {
				m.score++; //Add one score
				this.y = 0; //Set the goal outside the screen height
				this.x = Math.floor((Math.random() * 176) + 1); //Randomize the x coordinate
			}
		} else if(this.y >= 320-16) { //If player miss the goal
			this.y = 0; //Set the goal outside the screen
			p.lives--; //Remove a life from the player
		}
	}
}