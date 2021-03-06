(function () {
	"use strict";

	var Seizure = function(element) {
		this.$element = $(element);
		this.ctx = this.$element[0].getContext('2d');
		this.interval = 100;

		// defaults
		this.across = 70;
		this.tall = 50;

		this.shapeHeight = $(window).height() / this.tall;
		this.shapeWidth = $(window).width() / this.across;

		this.init();
	}

	Seizure.prototype = {
		init : function() {
			var self = this;

			this.updateCanvasSize();

			$(window).on('resize', function(){
				self.updateCanvasSize();
			});

			this.inputControls();
			this.addPresets();

			return setInterval(function() {
				self.drawSeizure();
			},this.interval);
		},

		drawSeizure : function() {
			var a;
			var t;
			var color;
			var self = this;
			this.shapeHeight = $(window).height() / this.tall;
			this.shapeWidth = $(window).width() / this.across;

			for (a = 0; a <= self.across; a++ ) {
				for (t = 0; t <= self.tall; t++ ) {
					self.drawShape(self.shapeWidth * a, self.shapeHeight * t, self.shapeWidth, self.shapeHeight, self.randomColor());
				}
			}
		},

		drawShape : function(x, y, width, height, color) {
			this.ctx.fillStyle = color;
			this.ctx.fillRect(x,y,width, height);
		},

		randomColor : function() {
			return '#'+Math.floor(Math.random()*16777215).toString(16);
		},

		updateCanvasSize : function() {
			this.$element.attr('height', $(window).height());
			this.$element.attr('width', $(window).width());
		},

		inputControls : function() {
			var self = this;

			$('input').change(function() {
				switch(this.id) {
					case 'across':
						self.across = this.value;
						$('#across-val').html(this.value);
						break;
					case 'tall':
						self.tall = this.value;
						$('#tall-val').html(this.value);
						break;
				}
			});
		},

		addPresets : function() {
			var self = this;

			$('#presets button').on('click', function() {
				switch(this.id) {
					case 'static-btn':
						self.across = 180;
						self.tall = 160;
						break;
					case 'big-shapes-btn':
						self.across = 10;
						self.tall = 6;
						break;
					case 'small-shapes-btn':
						self.across = 70;
						self.tall = 50;
						break;
					case 'stripes-btn':
						self.across = 1;
						self.tall = 60;
						break;
				}
				$('#across')[0].value = self.across;
				$('#tall')[0].value = self.tall;
				$('#across-val').html(self.across);
				$('#tall-val').html(self.tall);
			});
		}
	}

	window.Seizure = Seizure;
})();


$(document).ready( function(){
	var mySeizure = new Seizure('#static');
});
