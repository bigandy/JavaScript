/* global canvas, AH */
'use strict';
window.AH = {};

AH.init = function() {
	this.canvas = document.getElementById('canvas');
	this.ctx = canvas.getContext('2d');
	this.width = canvas.width;
	this.height = canvas.height;

    this.drawGrid(this.ctx);
    // Call other functions
    var list = [
        0, 100, 200, 300, 400, 500, 600
    ];


    var self = this;
    this.boxList = [];

    for (var i = list.length; i--;) {
        var box = new AH.Box(self.ctx, list[i]+10, list[i]+10, 90, self.height - list[i] - 20);
        box.render(); // output the box
        self.boxList.push(box); // put the dimensions of the boxes in an array for later use
    }


};

AH.drawGrid = function(ctx) {

    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.strokeStyle = 'black';
    ctx.lineWidth = '1';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(10,10);
    ctx.lineTo(10,this.height-10);
    ctx.lineTo(this.width-5,this.height-10);
    ctx.stroke();


    var topBottomMarker = this.height - 15,
        bottomBottomMarker = this.height - 5,
        markers = [
            100, 200, 300, 400, 500, 600
        ];


    for (var i = markers.length; i--;) {
        ctx.moveTo(markers[i],topBottomMarker);
        ctx.lineTo(markers[i],bottomBottomMarker);
        ctx.stroke();

        ctx.moveTo(5,markers[i]);
        ctx.lineTo(15,markers[i]);
        ctx.stroke();
    }

    ctx.save();
};




AH.Box = function(ctx, x, y, height, width) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
};


AH.Box.prototype.render = function () {
    this.ctx.fillStyle = 'orange';

    // this.ctx.fillStyle = '#'+Math.floor(
    //     Math.random()*16777215
    // ).toString();

    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.height, this.width);
    this.ctx.closePath();
    this.ctx.fill();
};

AH.drawCircle = function(ctx) {

    ctx.beginPath();
    // ctx.moveTo(100,10);

    ctx.arc(this.width - 200, 200, 100, 0, 2*Math.PI, true); // x,y,radius,angleStart, angleEnd, anticlockwise
    ctx.shadowColor = '#999';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = -15;
    ctx.shadowOffsetY = 0;

    // ctx.stroke();
    ctx.fill();
};

AH.init();





