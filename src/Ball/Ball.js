import React from 'react';

export default (props) => {
	const defaultProps = {
		bounce: 0.75,
		radius: 30,
		color: 'red',

		// starting velocity
		startVelX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
		startVelY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
	}

	const draw = (ctx) => {
		ctx.beginPath();
		ctx.arc(
			props.details.x,
			props.details.y,
			props.details.radius,
			0,
			Math.PI * 2
		);
		ctx.closePath();
		ctx.fillStyle = "skyblue";
		ctx.fill();
	}

	const update = (ctx) => {

	}



}