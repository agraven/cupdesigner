"use strict";
var points = [], canvas, ctx, size, origin;

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
function clear() {
	ctx.clearRect(0, 0, size.x, size.y);
}
function draw() {
	updateSize();
	clear();

	// Draw grid
	ctx.lineCap = 'butt';
	ctx.lineJoin = 'miter';
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
	if (points[0] == null) {
		return;
	}
	ctx.linecap = 'round';
	ctx.lineJoin = 'round';
	ctx.beginPath();
	ctx.moveTo(points[0].x, points[0].y)
	for (let point of points) {
		ctx.lineTo(point.x, point.y);
	}
	ctx.stroke();
}
function onClick(event) {
	event = event || window.event;
	points.push({
		x: event.layerX - canvas.offsetLeft,
		y: event.layerY - canvas.offsetTop,
	});
}
