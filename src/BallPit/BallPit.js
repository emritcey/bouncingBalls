import React, { useEffect, useRef } from 'react';
import './BallPit.scss';
import Ball from "../Ball/Ball";

export default () => {
    let canvas, ctx, requestRef;
    canvas = useRef(null);
    requestRef = useRef(null);

    let balls = [];

    useEffect(() => {
        init();
        requestRef.current = requestAnimationFrame(update);
        return () => cancelAnimationFrame(requestRef.current);
    });

    const init = () => {
        if (canvas.current) {
            canvas = canvas.current;
            ctx = canvas.getContext('2d');
        }
    }

    const update = () => {
        clearScreen();
        // only update if there are active balls
        if (balls.length > 0) {
            requestRef = requestAnimationFrame(() => update());
        }

        // update each ball if it is bouncing
        balls.forEach(ball => {
            if (ball.bouncing) {
                ball.update();
            } else {
                clearScreen();
                return () => cancelAnimationFrame(requestRef.current);
            }
        });

        // draw each ball
        balls.forEach(ball => ball.draw(ctx));

        // remove balls from array if they are done bouncing
        balls = balls.filter(ball => ball.bouncing && ball.y > 0);
    }

    const clearScreen = () => {
        ctx.clearRect(
          0,
          0,
          canvas.width,
          canvas.height)
    }

    const addBall = (e) => {
        let ball = new Ball({
            x: e.clientX,
            y: e.clientY,
            bouncing: true,
            canvas: canvas,
        });

        if (balls.length === 0) {
            balls.push(ball);
            update();
        } else {
            balls.push(ball);
        }

        ball.update();
        ball.draw(ctx);
    }

    return (
        <canvas ref={canvas}
                width={window.innerWidth}
                height={window.innerHeight}
                onClick={addBall} />
    );
}