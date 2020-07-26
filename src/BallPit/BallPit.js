import React, {useEffect, useRef} from 'react';
import './BallPit.scss';

export default () => {
    let canvas, ctx, gravity, ball, friction;

    canvas = useRef(null);
    let requestRef;

    gravity = 0.25
    friction = 0.98

    useEffect(() => {
        init();
        requestRef = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current);
    }, []);

    const init = () => {
        if (canvas.current) {
            ctx = canvas.current.getContext('2d');
            canvas.current.width = 500;
            canvas.current.height = 500;
        }

        ball = {
            bounce: 0.75, // energy lost on bounce (25%)
            radius: 30,
            x: canvas.current.width / 2,
            y: canvas.current.height / 2,
            velX: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1),
            velY: (Math.random() * 15 + 5) * (Math.floor(Math.random() * 2) || -1)
        }
        console.log('init')
    }
    const update = () => {
        // queue the next update
        requestRef = requestAnimationFrame(update);

        // logic goes here

        // bottom bound / floor
        if (ball.y + ball.radius >= canvas.height) {
            ball.velY *= -ball.bounce
            ball.y = canvas.current.height - ball.radius
            ball.velX *= friction
            console.log('hit bottom');
        }
        // top bound / ceiling
        if (ball.y - ball.radius <= 0) {
            ball.velY *= -ball.bounce
            ball.y = ball.radius
            ball.velX *= friction
            console.log('hit ceiling');
        }

        // left bound
        if (ball.x - ball.radius <= 0) {
            ball.velX *= -ball.bounce
            ball.x = ball.radius
            console.log('hit left');
        }
        // right bound
        if (ball.x + ball.radius >= canvas.current.width) {
            ball.velX *= -ball.bounce
            ball.x = canvas.current.width - ball.radius
            console.log('hit right');
        }

        // reset insignificant amounts to 0
        if (ball.velX < 0.01 && ball.velX > -0.01) {
            ball.velX = 0
        }
        if (ball.velY < 0.01 && ball.velY > -0.01) {
            ball.velY = 0
        }

        // add gravity
        ball.velY += gravity

        // update ball position
        ball.x += ball.velX
        ball.y += ball.velY

        // draw after logic/calculations
        draw()

    }

    const draw = () => {
        // console.log('draw', ball);
        // clear the canvas and redraw everything
        if (ctx) {
            ctx.clearRect(0,
                0,
                canvas.current.width,
                canvas.current.height)

            // draw the ball (only object in this scene)
            ctx.beginPath();
            ctx.fillStyle = 'red';

            ctx.arc(
                ball.x,
                ball.y,
                ball.radius,
                0, Math.PI * 2
            )
            ctx.fill()

        }
    }

    // init();
    return (
        <canvas ref={canvas} />
    );
}