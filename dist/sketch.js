let m

function setup() {
	createCanvas(400, 400);
	m = Strive.createMovableCircle(width / 2, height / 2, 20)
}

function draw() {
	background(220);
	Strive.drawTickAxes()
	m.draw();
}
