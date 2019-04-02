/*DOM*/

let hero = document.getElementById('hero')
let bullet = document.getElementById('bullet')
let zombie1 = document.getElementById('zombie1') //may i should use array, but there are just 3 zombies :) 
let zombie2 = document.getElementById('zombie2')
let zombie3 = document.getElementById('zombie3')
let princess = document.getElementById('princess')
let fence = document.getElementById('fence')
let result = document.getElementById('counter')
let counter = 0
let pause = false
let gameOverHide = document.getElementById('gameOver')
let gameOverResult = document.getElementById('yourScore')
let shootSound

/*SOUNDS*/

function preload() {
	shootSound = loadSound('')
}

/*RESULT*/
function countResult() {
	let countertoString = counter.toString()
	result.innerHTML = countertoString
	gameOverResult.innerHTML = countertoString
}
		
/*DEFAULT POSITIONS*/
//HERO
let heroDefaultPos = 275
let heroMove = 0
function drawHero() {
	hero.style.left = heroDefaultPos + "px"
}

//BULLET
let bulletDefaultPosX = heroDefaultPos + 23
let bulletDefaultPosY = 60
let bulletMove = 8
function drawBullet() {
	bullet.style.left = bulletDefaultPosX + "px"
	bullet.style.bottom = bulletDefaultPosY + "px"
}
let shoot = false

//ZOMBIE 1
let zombie1DefaultPosX = Math.floor(Math.random() * 540)
let zombie1DefaultPosY = 730
let zombie1Move = .4
function drawZombie1() {
	zombie1.style.left = zombie1DefaultPosX + "px"
	zombie1.style.bottom = zombie1DefaultPosY + "px"
}

//ZOMBIE 2
let zombie2DefaultPosX = Math.floor(Math.random() * 540)
let zombie2DefaultPosY = 730
let zombie2Move = .5
function drawZombie2() {
	zombie2.style.left = zombie2DefaultPosX + "px"
	zombie2.style.bottom = zombie2DefaultPosY + "px"
}

//ZOMBIE 3
let zombie3DefaultPosX = Math.floor(Math.random() * 540)
let zombie3DefaultPosY = 730
let zombie3Move = .6
function drawZombie3() {
	zombie3.style.left = zombie3DefaultPosX + "px"
	zombie3.style.bottom = zombie3DefaultPosY + "px"
}

//PRINCESS
let princessDefaultPosX = 0
let princessDefaultPosY = 120
let princessMove = .5
princess.style.bottom = princessDefaultPosY + "px"
function drawPrincess() {
	princess.style.left = princessDefaultPosX + "px"
}

/*RESET*/
let gameOn = true;

function reset() {
	heroDefaultPos = 275
	drawHero()
	bulletDefaultPosX = heroDefaultPos + 23
	bulletDefaultPosY = 60
	drawBullet()
	zombie1DefaultPosY = 730
	drawZombie1()
	zombie2DefaultPosY = 730
	drawZombie2()
	zombie3DefaultPosY = 730
	drawZombie3()
	princessDefaultPosX = 0
	drawPrincess()
	gameOn = false
	counter.innerHTML = 0
	gameOverHide.style.visibility = "hidden"
}

//RESET BULLET
function resetBullet() {
	bulletDefaultPosX = heroDefaultPos + 23
	bulletDefaultPosY = 60
	drawBullet()
	shoot = false
}

/*KEY EVENTS*/

document.addEventListener("keydown", function(e) {
	if(e.keyCode == 37) {
		heroMove = -2
	}
	if(e.keyCode == 39) {
		heroMove = 2
	}
	if(e.keyCode == 17) {
		shoot = true
	}
	if(e.keyCode == 80 && pause == false) {
		pause = true
	}
	else if(e.keyCode == 80 && pause == true) {
		pause = false
	}
	
});

document.addEventListener("keyup", function(e) {
	if(e.keyCode == 37) {
		heroMove = 0
	}
	if(e.keyCode == 39) {
		heroMove = 0
	}
})

/*MAKE IT MOVE*/

window.setInterval(function move() {
	if(gameOn == false && pause == false) {
		
		//HERO
		heroDefaultPos += heroMove
		drawHero()

		//BULLET FOLLOWS HERO
		if(shoot == false) {
			bulletDefaultPosX += heroMove
			drawBullet()
		}

		//REACH SIDE
		if(heroDefaultPos <= 0) {
			heroDefaultPos = 0
			bulletDefaultPosX = heroDefaultPos + 23
		}
		if(heroDefaultPos >= 540) {
			heroDefaultPos = 540
			bulletDefaultPosX = heroDefaultPos + 23
		}

		//BULLET
		if(shoot == true) {
			bulletDefaultPosY += bulletMove
			bullet.style.bottom = bulletDefaultPosY + "px"
		}

		if(bulletDefaultPosY >= 780) {
			shoot = false
			bulletDefaultPosY = 60
			bulletDefaultPosX = heroDefaultPos + 23
			drawZombie1()
		}

		//ZOMBIE 1
		zombie1DefaultPosY -= zombie1Move
		drawZombie1()
		if(zombie1DefaultPosY <= 240) {
			gameOn = true
			gameOverHide.style.visibility = "visible"
		}

		//ZOMBIE 2
		zombie2DefaultPosY -= zombie2Move
		drawZombie2()
		if(zombie2DefaultPosY <= 240) {
			gameOn = true
			gameOverHide.style.visibility = "visible"
		}

		//ZOMBIE 3
		zombie3DefaultPosY -= zombie3Move
		drawZombie3()
		if(zombie3DefaultPosY <= 240) {
			gameOn = true
			gameOverHide.style.visibility = "visible"
		}
		
		//HIT ZOMBIES
		if(bulletDefaultPosX >= zombie1DefaultPosX && bulletDefaultPosX <= zombie1DefaultPosX + 50 && bulletDefaultPosY >= zombie1DefaultPosY && bulletDefaultPosY <= zombie1DefaultPosY + 50) {
			zombie1DefaultPosY = 730
			zombie1DefaultPosX = Math.floor(Math.random() * 540)
			counter += 5
			countResult()
			resetBullet()
		}
		if(bulletDefaultPosX >= zombie2DefaultPosX && bulletDefaultPosX <= zombie2DefaultPosX + 50 && bulletDefaultPosY >= zombie2DefaultPosY && bulletDefaultPosY <= zombie2DefaultPosY + 50) {
			zombie2DefaultPosY = 730
			zombie2DefaultPosX = Math.floor(Math.random() * 540)
			counter += 10
			countResult()
			resetBullet()
		}
		if(bulletDefaultPosX >= zombie3DefaultPosX && bulletDefaultPosX <= zombie3DefaultPosX + 50 && bulletDefaultPosY >= zombie3DefaultPosY && bulletDefaultPosY <= zombie3DefaultPosY + 50) {
			zombie3DefaultPosY = 730
			zombie3DefaultPosX = Math.floor(Math.random() * 540)
			counter += 15
			countResult()
			resetBullet()
		}

		//PRINCESS
		princessDefaultPosX += princessMove
		drawPrincess()
		if(princessDefaultPosX >= 540 || princessDefaultPosX < 0) {
			princessMove = -princessMove
		}
		
		//HIT PRINCESS
		if(bulletDefaultPosX >= princessDefaultPosX && bulletDefaultPosX <= princessDefaultPosX + 50 && bulletDefaultPosY == 108) {
			gameOn = true
			gameOverHide.style.visibility = "visible"
		}
	}
}, 5)







