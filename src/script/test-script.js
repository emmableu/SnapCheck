// Do not reuse used triggers.
// Get fresh copies with getTestCaseByName or newTestCase
// const testNames = [
//     "key_up",
//     "upper_bound",
//     "key_down",
//     "lower_bound",
//     "not_move_before_space",
//     "space_move",
//     "paddle_bounce",
//     "paddle_score",
//     "edge_bounce",
//     "reset_score",
//     "reset_ball"
// ];
const testScript =
    [
        {
            name: 'testMoveUp',
            precondition: (t) => {
                return t.isKeyDown('up arrow') && t.getSpriteByName('Right Paddle').posY < 145
            },
            callback: function (t, oldState) {
                const paddleY = t.getSpriteByName('Right Paddle').posY;
                if (paddleY > oldState.paddleY)
                {
                    t.reportCase('key_up', true);
                } else {
                    t.reportCase('key_up', false);
                }
            },
            stateSaver: (t) => {
                return {
                    paddleY: t.getSpriteByName('Right Paddle', false).posY,
                    time: Date.now()
                }},
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testUpMiddle',
            precondition: (t) => {
                return t.isKeyDown('up arrow') && t.getSpriteByName('Right Paddle').posY >= 145
                    &&  t.getSpriteByName('Right Paddle').posY < 180
            },
            callback: function (t, oldState) {
                const paddleY = t.getSpriteByName('Right Paddle').posY;
                if (paddleY > oldState.paddleY)
                {
                    t.reportCase('key_up', true);
                } else if (paddleY === oldState.paddleY) {
                    t.reportCase('upper_bound', true);
                } else {
                    t.reportCase('key_up', false);
                }
            },
            stateSaver: (t) => {
                return {
                    paddleY: t.getSpriteByName('Right Paddle', false).posY,
                    time: Date.now()
                }},
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testMoveUpBoundary',
            precondition: (t) => {
                return t.isKeyDown('up arrow') && t.getSpriteByName('Right Paddle').posY >= 180
            },
            callback: function (t, oldState) {
                const paddleY = t.getSpriteByName('Right Paddle').posY;
                if (paddleY > oldState.paddleY)
                {
                    t.reportCase('upper_bound', false);
                } else {
                    t.reportCase('upper_bound', true);
                }
            },
            stateSaver: (t) => {
                return {
                    paddleY: t.getSpriteByName('Right Paddle', false).posY,
                    time: Date.now()
                }},
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testMoveDown',
            precondition: (t) =>
                t.isKeyDown('down arrow') && t.getSpriteByName('Right Paddle').posY > -145,
            callback: function (t, oldState) {
                const paddleY = t.getSpriteByName('Right Paddle').posY;
                if (paddleY < oldState.paddleY)
                {
                    t.reportCase('key_down', true);
                } else {
                    t.reportCase('key_down', false);
                }
            },
            stateSaver: (t) => {
                return {
                    paddleY:  t.getSpriteByName('Right Paddle', false).posY,
                    time: Date.now()
                }},
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testDownMiddle',
            precondition: (t) => {
                return t.isKeyDown('down arrow') && t.getSpriteByName('Right Paddle').posY <= -145
                    &&  t.getSpriteByName('Right Paddle').posY > -180
            },
            callback: function (t, oldState) {
                const paddleY = t.getSpriteByName('Right Paddle').posY;
                if (paddleY < oldState.paddleY)
                {
                    t.reportCase('key_down', true);
                } else if (paddleY === oldState.paddleY) {
                    t.reportCase('lower_bound', true);
                } else {
                    t.reportCase('key_down', false);
                }
            },
            stateSaver: (t) => {
                return {
                    paddleY: t.getSpriteByName('Right Paddle', false).posY,
                    time: Date.now()
                }},
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testMoveDownBoundary',
            precondition: (t) =>
                t.isKeyDown('down arrow') && t.getSpriteByName('Right Paddle').posY <= -180,
            callback: function (t, oldState) {
                const paddleY = t.getSpriteByName('Right Paddle').posY;
                if (paddleY < oldState.paddleY)
                {
                    t.reportCase('lower_bound', false);
                } else {
                    t.reportCase('lower_bound', true);
                }
            },
            stateSaver: (t) => {
                return {
                    paddleY:  t.getSpriteByName('Right Paddle', false).posY,
                    time: Date.now()
                }},
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testBallNotMoveBeforeSpace',
            precondition: (t) => true,
            callback: function (t, oldState) {
                const ballX = t.getSpriteByName('Ball').posX;
                const ballY = t.getSpriteByName('Ball').posY;
                if (ballX === oldState.ballX && ballY === oldState.ballY)
                {
                    t.reportCase('not_move_before_space', true)
                } else {
                    t.reportCase('not_move_before_space', false)
                }
            },
            stateSaver: (t) => ({
                ballX: t.getSpriteByName('Ball').posX,
                ballY: t.getSpriteByName('Ball').posY
            }),
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testSpaceBallMove',
            precondition: (t) => {
                return t.isKeyDown('space');
            },
            callback: function (t, oldState) {
                const ballX = t.getSpriteByName('Ball').posX;
                const ballY = t.getSpriteByName('Ball').posY;
                if (ballX != oldState.ballX || ballY != oldState.ballY)
                {
                    t.reportCase('space_move', true);
                } else {
                    t.reportCase('space_move', false);
                }
                t.removeTestCaseByName('testSpaceBallMove');
            },
            stateSaver: (t) => ({
                ballX: t.getSpriteByName('Ball').posX,
                ballY: t.getSpriteByName('Ball').posY
            }),
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'paddle_bounce',
            precondition: (t) => t.spriteIsTouching('Right Paddle', 'Ball'),
            callback: (t, oldState) => {
                const dirB = t.getSpriteByName('Ball').dir;
                const xB = t.getSpriteByName('Ball').posX;
                const yB = t.getSpriteByName('Ball').posY;
                const dirA = oldState.ballDir;
                const xA = oldState.ballX;
                const yA = oldState.ballY;
                // console.log("dirA: ", dirA, 'dirB: ', dirB);

                //const ballY = t.getSpriteByName('Ball').posY;
                const kA = 1/(Math.tan(dirA / 180 * Math.PI));
                const kB = 1/(Math.tan(dirB / 180 * Math.PI));

                const x = (yB - yA - xB*kB + xA*kA )/(kA - kB);
                // console.log(`A line:  y = ${kA} (x - ${xA}) + ${yA}`);
                // console.log(`B line:  y = ${kB} (x - ${xB}) + ${yB}`);

                const paddleX = t.getSpriteByName('Right Paddle').posX;
                // console.log('paddleX: ', paddleX);
                if (dirB !== dirA) {
                    if (dirB + dirA === 360 && x > 229 && x < 235){
                        // console.log('Ball does not turn on touching paddle, it turned on right edge');
                        t.reportCase('paddle_bounce', false);}
                    else {
                        // console.log('Ball turn on touching paddle');
                        t.reportCase('paddle_bounce', true);
                    }
                } else {
                    // console.log('Ball does not turn on touching paddle!');
                    t.reportCase('paddle_bounce', false);
                }
            },
            stateSaver: (t) =>
                ({ballDir: t.getSpriteByName('Ball', false).dir,
                    ballX: t.getSpriteByName('Ball', false).posX,
                    ballY: t.getSpriteByName('Ball', false).posY,
                    time: Date.now()}),
            delay: 10,
            once: false,
            addOnStart: true
        },
        {
            name: 'paddle_score',
            precondition: (t) => t.spriteIsTouching('Right Paddle', 'Ball'),
            callback: (t, oldState) => {
                const score = t.getFirstVariableValue();
                if (score && (score.value !== oldState.score.value)) {
                    t.reportCase('paddle_score', true);
                } else {
                    t.reportCase('paddle_score', false);
                }
            },
            stateSaver: (t) =>
                ({score: t.getFirstVariableValue(false), time: Date.now()}),
            delay: 10,
            once: false,
            addOnStart: true
        },

        {
            name: 'edge_bounce',
            precondition: (t) => {
                return t.spriteIsOnEdge('Ball', ['left', 'top', 'bottom'])},
            callback: (t, oldState) => {
                const ballDir = t.getSpriteByName('Ball').dir;
                if (ballDir !== oldState.ballDir) {
                    t.reportCase('edge_bounce', true);
                } else {
                    t.reportCase('edge_bounce', false);
                }
            },
            stateSaver: (t) =>  {
                return {ballDir: t.getSpriteByName('Ball', false).dir, time: Date.now()}
            },
            delay: 0,
            once: false,
            debounce: true,
            addOnStart: true
        },

        {
            name: 'reset_score',
            precondition: (t) => t.spriteIsOnEdge('Ball', ['right']) &&
                t.getFirstVariableValue() && t.getFirstVariableValue().value != 0,
            callback: (t, oldState) => {
                const score = t.getFirstVariableValue();
                if (score && (score.value == 0)) {
                    t.reportCase('reset_score', true);
                } else {
                    t.reportCase('reset_score', false);
                }
            },
            stateSaver: (t) => {
                return null;},
            delay: 10,
            once: false,
            debounce: true,
            addOnStart: true
        },
        {
            name: 'reset_ball',
            precondition: (t) => t.spriteIsOnEdge('Ball', ['right']),
            callback: (t, oldState) => {
                const ballX = t.getSpriteByName('Ball').posX;
                const ballY = t.getSpriteByName('Ball').posY;
                if (ballX < 10 && ballX > -10 && ballY < 10 && ballY > -10) {
                    t.reportCase('reset_ball', true);
                } else {
                    t.reportCase('reset_ball', false);
                }
                t.addTestCaseByName('waitToPressSpace');
            },
            stateSaver: (t) => null,
            delay: 0,
            once: false,
            debounce: true,
            addOnStart: true
        },
        // controls
        {
            name: 'waitToPressSpace',
            precondition: (t) => true,
            callback: (t, oldState) => {
                t.removeTestCaseByName('testBallNotMoveBeforeSpace');
                t.addTestCaseByName('pressSpaceKey');
            },
            stateSaver: (t) => null,
            delay: 50,
            once: true,
            addOnStart: true
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
        }
    ];
export {testScript};
