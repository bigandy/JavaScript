/* global canvas, AH */
'use strict';
window.AH = {};

AH.drawCanvas = function() {
	this.canvas = document.getElementById('canvas');
	this.ctx = canvas.getContext('2d');
	this.width = canvas.width;
	this.height = canvas.height;
	this.drawLines(this.ctx);
};

AH.drawLines = function(ctx) {

	ctx.strokeStyle = 'green';
    ctx.lineWidth = '10';
    ctx.fillStyle = 'orange';
	ctx.beginPath();
	ctx.moveTo(0,this.height / 2);
	ctx.lineTo(this.width/2, this.height/2);
    ctx.lineTo(0, this.height - ctx.lineWidth/2);
    ctx.lineTo(this.width, this.height - ctx.lineWidth/2);
    ctx.lineTo(this.width / 2 - ctx.lineWidth / 2, 0);
    ctx.lineTo(0,this.height / 2);
	ctx.stroke();
    ctx.fill();
};

AH.drawCanvas();





