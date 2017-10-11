"use strict";
var points = [], canvas, ctx, size = {}, origin = {}, mode = 'lines';

function init() {
	canvas = document.getElementById("main");
	ctx = canvas.getContext("2d");
	updateSize();
	setInterval(draw, 16);
}
function updateSize() {
	size = {
		x: document.documentElement.clientWidth,
		y: document.documentElement.clientHeight
	};
	origin = {
		x: size.x / 2,
		y: size.y / 2,
	}
	canvas.width = size.x;
	canvas.height = size.y;
}
function reset() {
	points = [];
}
function draw() {
	updateSize();
	ctx.clearRect(0, 0, size.x, size.y);

	// Draw grid
	ctx.moveTo(origin.x, 0);
	ctx.lineTo(origin.x, size.y);
	ctx.stroke();
	ctx.moveTo(0, origin.y);
	ctx.lineTo(size.x, origin.y);
	ctx.stroke();

	for (let point of points) {
		ctx.beginPath();
		ctx.arc(point.x, point.y, 3, 0, 2*Math.PI, false);
		ctx.fill();
	}
	// Draw defined lines
	ctx.beginPath();
	for (let point of points) {
		ctx.lineTo(point.x, point.y);
	}
	ctx.stroke();
}
function onClick(event) {
	event = event || window.event;
	switch (mode) {
		case 'lines':
			points.push({
				x: event.layerX - canvas.offsetLeft,
				y: event.layerY - canvas.offsetTop,
			});
			break;
		default:
	}
}
