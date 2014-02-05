/* global canvas */
(function ($, window, undefined) {
    'use strict';
	var AH = {};

	AH.drawCanvas = function() {
		// var self = this;

		this.canvas = document.getElementById('canvas');
		this.ctx = canvas.getContext('2d');
		this.width = canvas.width;
		this.height = canvas.height;
		this.drawlines(this.ctx);

	};

	AH.drawLines = function(ctx) {
		ctx.strokeStyle = '#ff0000';
		ctx.beginPath();
		ctx.moveTo(0,0);
		ctx.lineTo(this.width/2, this.height/2);
		ctx.stroke();
	};



})(jQuery, this);

