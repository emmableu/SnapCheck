const inputScript =
    [
        // controls
        {
            name: 'waitToPressSpace',
            precondition: (t) => true,
            callback: (t, oldState) => {
                // t.removeTestCaseByName('testBallNotMoveBeforeSpace');
                t.addTestCaseByName('pressSpaceKey');
            },
            stateSaver: (t) => null,
            delay: 50,
            once: true,
            addOnStart: true
        },
        {
            name: 'pressSpaceKey',
            precondition: (t) => true,
            callback: (t, oldState) => {
                t.inputKey('space', 2);
                // t.addTestCase(t.getTestCaseByName('followBall'));
                // t.addTestCase(t.getTestCaseByName('randomUpDownKey'));
            },
            stateSaver: (t) => null,
            delay: 0,
            once: true,
            addOnStart: false
        },
        {
            name: 'followBall',
            precondition: (t) => true,
            callback: (t, oldState) => {
                const paddleY = t.getSpriteByName('Right Paddle').posY;
                if (paddleY < oldState.ballY - 5) {
                    t.inputKey('up arrow', 2);
                } else if (paddleY > oldState.ballY + 5) {
                    t.inputKey('down arrow', 2);
                }
            },
            stateSaver: (t) => {
                return {
                    ballY: t.getSpriteByName('Ball').posY,
                    time: Date.now()
                }
            },
            delay: 5,
            once: false,
            addOnStart: false
        },
        {
            name: 'ballTouchPaddleStopFollow',
            precondition: (t) => t.spriteIsTouching('Right Paddle', 'Ball'),
            callback: (t, oldState) => {
                t.removeTestCaseByName('followBall');
                t.addTestCaseByName('evadeBall');
            },
            stateSaver: (t) => null,
            delay: 0,
            once: false,
            addOnStart: false,
            debounce: true
        },
        {
            name: 'ballTouchRightEdgeStartFollow',
            precondition: (t) => t.spriteIsOnEdge('Ball', ['right']),
            callback: (t, oldState) => {
                t.removeTestCaseByName('evadeBall');
                t.addTestCaseByName('followBall');
            },
            stateSaver: (t) => null,
            delay: 25,
            once: false,
            addOnStart: false,
            debounce: true
        },
        {
            name: 'randomUpDownKey',
            precondition: (t) => true,
            callback: (t, oldState) => {
                const toss = t.random(-1, 1);
                if (toss < 0) {
                    t.inputKey('up arrow', 1);
                } else if (toss > 0) {
                    t.inputKey('down arrow', 1);
                }
            },
            stateSaver: (t) => null,
            delay: 5,
            once: false,
            addOnStart: false
        },
        {
            name: 'evadeBall',
            precondition: (t) => true,
            callback: (t, oldState) => {
                const paddleY = t.getSpriteByName('Right Paddle').posY;
                if (paddleY < 170) {
                    t.inputKey('up arrow', 2);
                }
            },
            stateSaver: (t) => ({
                ballY: t.getSpriteByName('Ball').posY,
                time: Date.now()
            }),
            delay: 5,
            once: false,
            addOnStart: false
        },
        {
            name: 'randomDirection',
            precondition: (t) => true,
            callback: (t, oldState) => {
                const toss = t.random(0, 1);
                if (t.getSpriteByName('Right Paddle').posY > 200) {
                    t.removeTestCaseByName('upKey');
                    t.removeTestCaseByName('downKey');
                    t.addTestCaseByName('downKey');
                } else if (t.getSpriteByName('Right Paddle').posY < -200) {
                    t.removeTestCaseByName('upKey');
                    t.removeTestCaseByName('downKey');
                    t.addTestCaseByName('upKey');
                } else {
                    if (toss === 0) {
                        t.removeTestCaseByName('upKey');
                        t.removeTestCaseByName('downKey');
                        t.addTestCaseByName('upKey');
                    } else if (toss === 1) {
                        t.removeTestCaseByName('upKey');
                        t.removeTestCaseByName('downKey');
                        t.addTestCaseByName('downKey');
                    }
                }
            },
            stateSaver: (t) => null,
            delay: 100,
            once: false,
            addOnStart: true
        },
        {
            name: 'upKey',
            precondition: (t) => true,
            callback: (t, oldState) => {
                t.inputKey('up arrow', 1);
            },
            stateSaver: (t) => null,
            delay: 5,
            once: false,
            addOnStart: false
        },
        {
            name: 'downKey',
            precondition: (t) => true,
            callback: (t, oldState) => {
                t.inputKey('down arrow', 1);
            },
            stateSaver: (t) => null,
            delay: 5,
            once: false,
            addOnStart: false
        },
        {
            name: 'threeSecStateUnchanged',
            precondition: (t) => true,
            callback: (t, oldState) => {
                const paddle = t.getSpriteByName('Right Paddle'),
                    ball = t.getSpriteByName('Ball');
                console.log('checking threeSecStateUnchanged');
                let unChanged = true;
                for (const attr of ['posX', 'posY']){
                    if (paddle[attr] !== oldState.paddle[attr] ||
                        ball[attr] !== oldState.ball[attr]){
                        unChanged = false;
                        break;
                    }
                }
                t.reportCase('threeSecStateUnchanged', unChanged);
            },
            stateSaver: (t) => {
                return {
                    paddle: t.getSpriteByName('Right Paddle'),
                    ball: t.getSpriteByName('Ball')
                }
            },
            delay: 100,
            once: false,
            addOnStart: true
        },
    ];

export {inputScript}
