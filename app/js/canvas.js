/* global canvas, AH, requestAnimationFrame, cancelAnimationFrame */
'use strict';
window.AH = {};

AH.init = function () {
	this.canvas = document.getElementById('canvas');
	this.ctx = canvas.getContext('2d');
	this.width = canvas.width;
	this.height = canvas.height;
    this.animId = null;

    this.drawGrid(this.ctx);


    // Call other functions
    var list = [
        0,
        100,
        200,
        300,
        400,
        500,
        600
    ];

    var self = this;
    this.boxList = [];

    for (var i = list.length; i--;) {
        var box = new AH.Box(self.ctx, list[i] + 10, list[i] + 10, 90, self.height - list[i] - 20);
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
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.drawGrid(this.ctx);

    for (var index in this.boxList) {

        if (this.boxList[index].width > 0) {
            this.boxList[index].animate();
            // console.log(this.boxList[0].width);
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
        markers = [
            100, 200, 300, 400, 500, 600
        ];

    for (var i = markers.length; i--;) {
        ctx.moveTo(markers[i], topBottomMarker);
        ctx.lineTo(markers[i], bottomBottomMarker);
        ctx.stroke();

        ctx.moveTo(5, markers[i]);
        ctx.lineTo(15, markers[i]);
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
    this.multiplier = 10;

    this.move(this.y + this.multiplier, this.width - this.multiplier);

    this.draw();
};


AH.init();





