let p1;

function setup() {
	createCanvas(800, 800)
	p1 = Strive.createMovableCircle(100, 100, 20)
	angleMode(DEGREES)
}


function draw() {
	background("black")
	Strive.translate(width / 2, height / 2)
	Strive.scale(2, -2)
	Strive.rotate(45)
	Strive.drawTickAxes()
	p1.draw()

}

function mousePressed() {
	console.log(Strive.mouse())
}
