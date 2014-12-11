/* global canvas, AH, requestAnimationFrame, cancelAnimationFrame, window, document */
'use strict';
window.AH = {};

AH.init = function () {



    this.canvas = document.getElementById('canvas');
	this.ctx = canvas.getContext('2d');
	this.width = canvas.width;
	this.height = canvas.height;
    this.animId = null;
    this.loop = 4;
    this.drawGrid(this.ctx);
    this.boxList = [];

    // Set up the variables
    var loop = this.loop,
        i = loop,
        self = this;


    // this is the bars, number of which depend on this.loop
    while (i--) {
        var box = new AH.Box(
            this.ctx,
            i * this.width / this.loop, // x
            i * this.height / this.loop, // y
            this.width / this.loop,  // width
            this.height - i * this.height / this.loop // height
        );
        box.draw(); // output the box
        self.boxList.push(box); // put the dimensions of the boxes in an array for later use
    }
    this.animate();
};

AH.animate = function () {
    var self = this;

    this.render();

    this.animId = requestAnimationFrame(function () {
        self.animate();
    });
};

AH.pause = function () {
    cancelAnimationFrame(this.animId);
    this.animId = null;
};

AH.play = function () {
    var self = this;
    if (!this.animId) {
        self.animate();
    }
};

AH.render = function () {
    this.ctx.clearRect(0, 0, this.width, this.height); // need to clear the space, before re-drawing
    this.drawGrid(this.ctx);

    for (var index in this.boxList) {

        if (this.boxList[index].width > 0) {
            this.boxList[index].animate();
        }
    }

};

AH.drawGrid = function (ctx) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = '1';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(10, 10);
    ctx.lineTo(10, this.height - 10);
    ctx.lineTo(this.width - 5, this.height - 10);
    ctx.stroke();

    var topBottomMarker = this.height - 15,
        bottomBottomMarker = this.height - 5,
        markers = this.loop - 1;

    for (var i = 1; i < markers + 1; i++) {
        ctx.moveTo(i * this.width / this.loop + 10, topBottomMarker);
        ctx.lineTo(i * this.width / this.loop + 10, bottomBottomMarker);
        ctx.stroke();

        ctx.moveTo(5, i * this.height / this.loop);
        ctx.lineTo(15, i * this.height / this.loop);
        ctx.stroke();
    }
};

AH.Box = function (ctx, x, y, height, width) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
};

AH.Box.prototype.draw = function () {
    this.ctx.fillStyle = 'orange';

    // start the path
    this.ctx.beginPath();
    // draw the rectangle
    this.ctx.rect(this.x, this.y, this.height, this.width);
    // close the path
    this.ctx.closePath();
    // fill in the rectangle with the random colour
    this.ctx.fill();
};

AH.Box.prototype.move = function (newY, newWidth) {
    this.y = newY;
    this.width = newWidth;
};

AH.Box.prototype.animate = function () {
    this.multiplier = 5;

    this.move(this.y + this.multiplier, this.width - this.multiplier);

    this.draw();
};


AH.init();





