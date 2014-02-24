'use strict';

function getCanvas(width, height) {
	var c = document.createElement('canvas');
	document.body.appendChild(c);

	c.style.position = 'absolute';
	c.width = width;
	c.height = height;
	return c;
}

var main = getCanvas(window.innerWidth, window.innerHeight),
	ctx = main.getContext('2d'),

	Point = function (x, y) {
		this.x = x || 0;
		this.y = y || 0;
		this.visited = false;
	},
	p = new Point(550, 300),
	p0 = new Point(500, 200),
	p1 = new Point(750, 350);

Point.distance = function (p0, p1) {
	return Math.sqrt((p0.x - p1.x) * (p0.x - p1.x) + (p0.y - p1.y) * (p0.y - p1.y));
};



function lineStyle(context, thickness, color) {
	context.lineWidth = thickness;
	context.strokeStyle = color;
}

function circle(context, x, y, radius) {
	context.beginPath();
	context.arc(x, y, radius, 0, Math.PI * 2);
	context.stroke();
}

function line(context, p0, p1) {
	context.beginPath();
	context.moveTo(p0.x, p0.y);
	context.lineTo(p1.x, p1.y);
	context.stroke();
}

function cross(context, x, y, size, arrow) {
	size = size || 50;
	arrow = arrow || 5;

	context.beginPath();
	context.moveTo(x, y - size);
	context.lineTo(x, y + size);
	context.moveTo(x - size, y);
	context.lineTo(x + size, y);

	context.moveTo(x + size - arrow, y - arrow);
	context.lineTo(x + size, y);

	context.moveTo(x + size - arrow, y + arrow);
	context.lineTo(x + size, y);

	context.stroke();
}

function drawRotationsBlue(ctx) {
	lineStyle(ctx, 1, '#00f');
	circle(ctx, p.x, p.y, 5);
	cross(ctx, p.x, p.y, 100, 10);
}

function drawRotationsRed(ctx) {
	lineStyle(ctx, 1, '#f00');
	circle(ctx, p.x, p.y, 5);
	cross(ctx, p.x, p.y, 25, 5);
}

function drawReflection(ctx) {
	lineStyle(ctx, 3, '#fc0');
	circle(ctx, p.x, p.y, 20);
}

function drawGlide(ctx) {
	lineStyle(ctx, 1, '#0c0');
	circle(ctx, p.x, p.y, 5);
}

/**
 * rotates a point P around a lattice by a given amount in radians
 * @param ctx the context to draw to
 * @param p the point to rotate
 * @param lattice the point arounbd which we want to rotate P
 * @param angle the amount of rotation in radians
 * @param drawMethod custom draw method
 */
function rotatePoint(ctx, p, lattice, angle, drawMethod) {
	ctx.save();

	// centers ctx matrix on lattice
	var dx = lattice.x;
	var dy = lattice.y;
	ctx.translate(dx, dy);

	// rotates matrix by given angle
	ctx.rotate(angle);

	// moves matrix back to original position
	ctx.translate(-dx, -dy);

	drawMethod(ctx);

	ctx.restore();
}


/**
 *
 * @param ctx context to draw to
 * @param p point to reflect
 * @param p0 start of the pirror axis
 * @param p1 end of the pirror axis
 * @param distance "glide" distance
 * @param drawMethod custom method to call
 */
function reflection(ctx, p, p0, p1, distance, drawMethod) {
	ctx.save();

	distance = distance || 0;
	//computes line's angle
	var angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);

	// centers ctx matrix on P0
	var dx = p0.x;
	var dy = p0.y;
	ctx.translate(dx, dy);

	// rotates matrix by p0-p1 angle
	ctx.rotate(angle);

	//mirror
	ctx.scale(1, -1);

	//glide if distance is specified
	ctx.translate(distance, 0);

	// moves matrix back to original position & rotation
	ctx.rotate(-angle);

	ctx.translate(-dx, -dy);

	drawMethod(ctx);

	ctx.restore();

}

function update() {
	ctx.clearRect(0, 0, main.width, main.height);
	ctx.fillStyle = '#fcfcfc';
	ctx.fillRect(0, 0, main.width, main.height);

	var t = Date.now() * 0.001,
		cx = window.innerWidth / 2,
		cy = window.innerHeight / 2,
		r0 = 150,
		r1 = 250,
		tot1 = 16,
		tot2 = 36,
		tot3 = 20,
		angle = 0;

	p.x = cx;
	p.y = cy;

	p0.x = cx + Math.cos(t) * r0;
	p0.y = cy + Math.sin(t) * r0;
	p1.x = cx + Math.cos(t * 0.5 + Math.PI) * r1;
	p1.y = cy + Math.sin(t * 0.5 + Math.PI) * r1;



	for (var i = tot1; i--;) {
		rotatePoint(ctx, p, p0, angle + i * ((Math.PI * 2) / tot1), drawRotationsBlue);
	}


	for (i = tot2; i--;) {
		angle = Math.atan2(p1.y - p0.y, p1.x - p0.x);
		rotatePoint(ctx, p, p1, angle + i * ((Math.PI * 2) / tot2), drawRotationsRed);
	}
	reflection(ctx, p, p0, p1, 0,   drawReflection);

	for (i = tot3 - 1; i--;) {
		reflection(ctx, p, p0, p1, -300 + ((i + 1) * (600 / tot3)), drawGlide);
	}

	lineStyle(ctx, 1, '#999');
	circle(ctx, cx, cy, r0);
	circle(ctx, cx, cy, r1);
	cross(ctx, p.x, p.y, r1 * 0.5, r1 * 0.25);

	lineStyle(ctx, 1, '#666');
	circle(ctx, p.x, p.y, 10);
	circle(ctx, p0.x, p0.y, 5);
	circle(ctx, p1.x, p1.y, 5);
	lineStyle(ctx, 3, '#666');
	line(ctx, p0, p1);


}


setInterval(update, 1000 / 60);