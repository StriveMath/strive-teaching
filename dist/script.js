function setup() {
	createCanvas(800, 800)

}

let run = true

function draw() {
	if (run) {
		background("black")
		Strive.translate(width / 2, height / 2)
		Strive.scale(1, -1)
		Strive.drawTickAxes()
		console.log(Strive.mouse())
	}
	run = false

}

function mousePressed() {
	console.log(Strive.mouse())
}
