class Ball {
	
	constructor(props) {
		this.canvas = props.canvas;
		this.x = props.x;
		this.y = props.y;
		this.velX = props.velX;
		this.velY = props.velY;
		this.bouncing = props.bouncing;
		this.color = this.getRandomColor();
		this.radius = this.getRandomRadius();
		this.bounce = this.defaultProps.bounce;
		this.velX = this.defaultProps.startVelX;
		this.velY = this.defaultProps.startVelY;
	}
	
	defaultProps = {
		bounce: 0.75,
		startVelX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
		startVelY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
	}

	gravity = 0.25;
	friction = 0.98;

	draw (ctx) {
		ctx.save();
		ctx.beginPath();
		ctx.arc(
			this.x,
			this.y,
			this.radius,
			0,
			Math.PI * 2
		);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.restore();
	}

	update () {
		// handle collisions
		this.handleCeiling();
		this.handleFloor();
		this.handleLeft();
		this.handleRight();

		// handle if the ball stops bouncing
		if (this.velX < 0.01 && this.velX > -0.01) {
			this.velX = 0;
			this.bouncing = false;
		}
		if (this.velY < 0.01 && this.velY > -0.01) {
			this.velY = 0;
			this.y = this.canvas.height - this.radius;
		}

		// account for gravity
		if (this.velY !== 0) {
			this.velY += this.gravity;
			this.y += this.velY;
		}

		// update this position
		this.x += this.velX;
	}

	 handleCeiling () {
		if (this.y - this.radius <= 0) {
			this.velY *= -this.bounce
			this.y = this.radius
			this.velX *= this.friction
		}
	}

	handleFloor () {
		if (this.y + this.radius >= this.canvas.height) {
			this.velY *= -this.bounce;
			this.y = this.canvas.height - this.radius;
			this.velX *= this.friction;
		}
	}

	handleRight () {
		if (this.x + this.radius >= this.canvas.width) {
			this.velX *= -this.bounce;
			this.x = this.canvas.width - this.radius;
		}
	}

	handleLeft () {
		if (this.x - this.radius <= 0) {
			this.velX *= -this.bounce;
			this.x = this.radius;
		}
	}

	getRandomColor () {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	getRandomRadius () {
		const min = 20;
		const max = 70;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

export default Ball;