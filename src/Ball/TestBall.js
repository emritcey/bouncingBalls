import React, { useState } from 'react';

export default (props) => {

	let [x, setX] = useState(props.x);
	let [y, setY] = useState(props.y);
	let [bouncing, setBouncing] = useState(props.bouncing);
	let [velX, setVelX] = useState(randomVelocity());
	let [velY, setVelY] = useState(randomVelocity());

	const canvas = props.canvas;
	const color = getRandomColor;
	const radius = getRandomRadius();
	const bounce = 0.75;
	const gravity = 0.25;
	const friction = 0.98;

	const randomVelocity = () => {
		return (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1);
	}

	const handleCeiling = () => {
		if (y - radius <= 0) {
			setVelY(velY * -bounce);
			setY(radius);
			setVelX(velX * friction);
		}
	}

	const handleFloor = () => {
		if (y + radius >= canvas.height) {
			setVelY(velY * -bounce);
			setY(canvas.height - radius);
			setVelX(velX * friction);
		}
	}

	const handleRight = () => {
		if (x + radius >= canvas.width) {
			setVelX(velX * -bounce);
			setX(canvas.width - radius);
		}
	}

	const handleLeft = () => {
		if (x - radius <= 0) {
			setVelX(velX * -bounce);
			setX(radius);
		}
	}

	const update = () => {
		// handle collisions
		handleCeiling();
		handleFloor();
		handleLeft();
		handleRight();

		// handle if the ball stops bouncing
		if (velX < 0.01 && velX > -0.01) {
			setVelX(0);
			setBouncing(false);
		}
		if (velY < 0.01 && velY > -0.01) {
			setVelY(0);
			setY(canvas.height - radius);
		}

		// account for gravity
		if (velY !== 0) {
			setVelY(velY + gravity);
			setY(y + velY);
		}

		// update this position
		setX(x + velX);
	}

	const draw = (ctx) => {
		ctx.save();
		ctx.beginPath();
		ctx.arc(
			x,
			y,
			radius,
			0,
			Math.PI * 2
		);
		ctx.closePath();
		ctx.fillStyle = color;
		ctx.fill();
		ctx.restore();
	}

	const getRandomColor = () => {
		const letters = '0123456789ABCDEF';
		let color = '#';
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	const getRandomRadius = () => {
		const min = 20;
		const max = 70;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

