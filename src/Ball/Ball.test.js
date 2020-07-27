import React from "react";
import Ball from "./Ball";

describe('Ball Class', () => {
	let ball;
	beforeEach(() => {
		ball = new Ball({
			x: 0,
			y: 0,
			bouncing: true,
			canvas: { height: 0, width: 0 },
		});
	});

	describe('update function', () => {
		test('it handles ball in middle of canvas', () => {
			ball = new Ball({
				x: 250,
				y: 250,
				bouncing: true,
				canvas: { height: 500, width: 500 },
			});
			let originalVelY = ball.velY;
			let originalY = ball.y;
			let originalX = ball.x;

			ball.update();

			expect(ball.velY).toEqual(originalVelY + ball.gravity);
			expect(ball.y).toEqual(originalY + ball.velY);
			expect(ball.x).toEqual(originalX + ball.velX);

			expect(ball.bouncing).toBeTruthy();
		});

		test('sets velY to 0 if stopped bouncing', () => {
			// must be between -.01 & .01 to be considered insignificant movement
			ball.velY = .001;

			ball.update();
			expect(ball.velY).toEqual(0);
			expect(ball.y).toEqual(ball.canvas.height - ball.radius);
			expect(ball.bouncing).toBeTruthy();
		});

		test('sets velX to 0 if stopped rolling', () => {
			// must be between -.01 & .01 to be considered insignificant movement
			ball.velX = .001;
			ball.update();

			expect(ball.velX).toEqual(0);
			expect(ball.bouncing).toBeFalsy();
		});
	});

	describe('collision functions -- successfully hitting walls', () => {
		test('handleCeiling', () => {
			const originalVelY = ball.velY;
			const originalVelX = ball.velX;

			// validate it is hitting the floor constraints
			expect(ball.y).toBe(0);
			expect(ball.radius).toBeGreaterThan(0);
			expect(ball.y - ball.radius).toBeLessThanOrEqual(0);

			// call function
			ball.handleCeiling();

			// check all changes occur as expected
			// velocity direction changes
			if (originalVelY > 0) {
				expect(ball.velY).toBeLessThan(0);
			} else {
				expect(ball.velY).toBeGreaterThan(0);
			}

			// velocity changes
			expect(ball.velY).not.toBe(originalVelY);

			// position changes
			expect(ball.y).toEqual(ball.radius);

			// ball slows down
			expect(ball.velX).toEqual(originalVelX * ball.friction);
		});

		test('handleFloor', () => {
			const originalVelY = ball.velY;
			const originalVelX = ball.velX;

			// validate it is hitting the floor constraints
			expect(ball.y).toBe(0);
			expect(ball.radius).toBeGreaterThan(0);
			expect(ball.y + ball.radius).toBeGreaterThan(ball.canvas.height);

			// call function
			ball.handleFloor();

			// check all changes occur as expected
			// velocity direction changes
			if (originalVelY > 0) {
				expect(ball.velY).toBeLessThan(0);
			} else {
				expect(ball.velY).toBeGreaterThan(0);
			}

			// velocity changes
			expect(ball.velY).not.toBe(originalVelY);

			// position changes
			expect(ball.y).toEqual(ball.canvas.height - ball.radius);


			// ball slows down
			expect(ball.velX).toEqual(originalVelX * ball.friction);
		});

		test('handleRight', () => {
			const originalVelX = ball.velX;

			// validate it is hitting the floor constraints
			expect(ball.x).toBe(0);
			expect(ball.radius).toBeGreaterThan(0);
			expect(ball.x + ball.radius).toBeGreaterThan(ball.canvas.width);

			// call function
			ball.handleRight();

			// check all changes occur as expected
			// velocity direction changes
			if (originalVelX > 0) {
				expect(ball.velX).toBeLessThan(0);
			} else {
				expect(ball.velX).toBeGreaterThan(0);
			}

			// velocity changes
			expect(ball.velX).not.toBe(originalVelX);

			// position changes
			expect(ball.x).toEqual(ball.canvas.width - ball.radius);
		});

		test('handleLeft', () => {
			const originalVelX = ball.velX;

			// validate it is hitting the floor constraints
			expect(ball.x).toBe(0);
			expect(ball.radius).toBeGreaterThan(0);
			expect(ball.x - ball.radius).toBeLessThanOrEqual(0);

			// call function
			ball.handleLeft();

			// check all changes occur as expected
			// velocity direction changes
			if (originalVelX > 0) {
				expect(ball.velX).toBeLessThan(0);
			} else {
				expect(ball.velX).toBeGreaterThan(0);
			}

			// velocity changes
			expect(ball.velX).not.toBe(originalVelX);

			// position changes
			expect(ball.x).toEqual(ball.radius);
		});
	});

	describe('setup functions', () => {
		test('getRandomColor returns a random color HEX Code like: #111111', () => {
			const hexPattern = /#([A-Fa-f0-9]{6})/;
			let ball = new Ball({
				x: 0,
				y: 0,
				bouncing: true,
				canvas: null,
			});
			expect(ball.getRandomColor()).toMatch(hexPattern);
		});

		test('getRandomRadius returns a random number between 20 & 70 by default', () => {
			const radius = ball.getRandomRadius();

			expect(radius).toBeGreaterThanOrEqual(20);
			expect(radius).toBeLessThanOrEqual(70);
		});
	})
});
