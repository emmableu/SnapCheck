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
                return t.isKeyDown('up arrow') && !t.spriteIsOnEdge('Right Paddle', ['top'])
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
                    paddleY: t.getSpriteByName('Right Paddle', 'old').posY,
                    time: Date.now()
                }},
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testUpMiddle',
            precondition: (t) => {
                return t.isKeyDown('up arrow') && t.spriteIsOnEdge('Right Paddle', ['top'])
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
                    paddleY: t.getSpriteByName('Right Paddle', 'old').posY,
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
                    paddleY: t.getSpriteByName('Right Paddle', 'old').posY,
                    time: Date.now()
                }},
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testMoveDown',
            precondition: (t) => {
                return t.isKeyDown('down arrow') && !t.spriteIsOnEdge('Right Paddle', ['bottom'])
            },
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
                    paddleY:  t.getSpriteByName('Right Paddle', 'old').posY,
                    time: Date.now()
                }},
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testDownMiddle',
            precondition: (t) => {
                return t.isKeyDown('down arrow') && t.spriteIsOnEdge('Right Paddle', ['bottom'])
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
                    paddleY: t.getSpriteByName('Right Paddle', 'old').posY,
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
                    paddleY:  t.getSpriteByName('Right Paddle', 'old').posY,
                    time: Date.now()
                }},
            delay: 5,
            once: false,
            addOnStart: true
        },
        {
            name: 'testBallNotMoveBeforeSpace',
            precondition: (t) => {
                const ballX = t.getSpriteByName('Ball').posX;
                const ballY = t.getSpriteByName('Ball').posY;
                const oldBallX = t.getSpriteByName('Ball', 'old').posX;
                const oldBallY = t.getSpriteByName('Ball', 'old').posY;
                return (ballY === 0 && ballX === 0 && ballX === oldBallX && ballY === oldBallY)
            },
            callback: function (t, oldState) {
                const ballX = t.getSpriteByName('Ball').posX;
                const ballY = t.getSpriteByName('Ball').posY;
                console.log('testBallNotMoveBeforeSpace');
                console.log('oldState.ballX: ', oldState.ballX, "oldState.ballY: ", oldState.ballY);
                console.log('ballX: ', ballX, "ballY: ", ballY);
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
            delay: 80,
            once: true,
            addOnStart: true
        },
        {
            name: 'testSpaceBallMove',
            precondition: (t) => {
                return t.isKeyDown('space');
            },
            callback: function (t, oldState) {
                console.log('------------testSpaceBallMove------------');
                console.log('oldState.ballx: ', oldState.ballX);
                const ballX = t.getSpriteByName('Ball').posX;
                console.log('ballX: ', ballX);
                const ballY = t.getSpriteByName('Ball').posY;
                if (ballX !== oldState.ballX || ballY !== oldState.ballY)
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
            delay: 25,
            once: true,
            addOnStart: true
        },
        {
            name: 'paddle_bounce',
            precondition: (t) => ((t.spriteIsTouching('Right Paddle', 'Ball') ||
                t.spriteIsTouching('Ball', 'Right Paddle'))
            ),
            callback: (t, oldState) => {
                t.reportCase('space_move', true);
                console.log('after: ', t.getSpriteByName('Ball').dir);
                const dirB = t.getSpriteByName('Ball').dir;
                const xB = t.getSpriteByName('Ball').posX;
                const yB = t.getSpriteByName('Ball').posY;
                const dirA = oldState.ballDir;
                const xA = oldState.ballX;
                const yA = oldState.ballY;
                const kA = 1/(Math.tan(dirA / 180 * Math.PI));
                const kB = 1/(Math.tan(dirB / 180 * Math.PI));

                const x = (yB - yA - xB*kB + xA*kA )/(kA - kB);
                const paddleX = t.getSpriteByName('Right Paddle').posX;
                if (dirB !== dirA) {
                    if ((Math.abs(yB - yA) > 4) && (Math.abs(yB - yA) < 40)){
                        return
                    }
                    if ((dirB + dirA === 360 && x > 229 && x < 235)){
                        // console.log('Ball does not turn on touching paddle, it turned on right edge');
                        t.reportCase('paddle_bounce', false);
                    }
                    else if  (x > 229 && x < 235){
                        // console.log('Ball does not turn on touching paddle, it turned on right edge');
                        t.reportCase('paddle_bounce', false);
                    }
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
            {   console.log('before: ', t.getSpriteByName('Ball', 'old').dir);
                return {ballDir: t.getSpriteByName('Ball', 'old').dir,
                    ballX: t.getSpriteByName('Ball', 'old').posX,
                    ballY: t.getSpriteByName('Ball', 'old').posY,
                    time: Date.now()}},
            delay: 0,
            once: true,
            addOnStart: true,
            debounce: true
        },
        {
            name: 'paddle_score',
            precondition: (t) => t.spriteIsTouching('Right Paddle', 'Ball') ||
                t.spriteIsTouching('Ball', 'Right Paddle'),
            callback: (t, oldState) => {
                const score = t.getAllVars();
                console.log("score after paddle boounc: ", score);
                if (score > oldState.score) {
                    t.reportCase('paddle_score', true);
                } else {
                    t.reportCase('paddle_score', false);
                }
            },
            stateSaver: (t) =>
                ({ score: t.getAllVars('old')}),
            delay: 2,
            once: false,
            debounce: true,
            addOnStart: true
        },

        {
            name: 'edge_bounce',
            precondition: (t) => {
                return t.spriteIsOnEdge('Ball', t.getBounceEdge())},
            callback: (t, oldState) => {
                t.reportCase('space_move', true);
                const ballDir = t.getSpriteByName('Ball').dir;
                if (ballDir !== oldState.ballDir) {
                    t.reportCase('edge_bounce', true);
                } else {
                    t.reportCase('edge_bounce', false);
                }
            },
            stateSaver: (t) =>  {
                return {ballDir: t.getSpriteByName('Ball', 'old').dir, time: Date.now()}
            },
            delay: 0,
            once: false,
            debounce: true,
            addOnStart: true
        },

        {
            name: 'reset_score',
            precondition: (t) => t.spriteIsOnEdge('Ball', t.getResetEdge()) &&
                t.getAllVars() !== 0,
            callback: (t, oldState) => {
                const score = t.getAllVars();
                if (score < oldState.score) {
                    t.reportCase('reset_score', true);
                } else {
                    t.reportCase('reset_score', false);
                }
            },
            stateSaver: (t) => {
                return {
                    score: t.getAllVars('old')
                };},
            delay: 3,
            once: false,
            debounce: true,
            addOnStart: true
        },
        {
            name: 'reset_ball',
            precondition: (t) => t.spriteIsOnEdge('Ball', t.getResetEdge()),
            callback: (t, oldState) => {
                t.reportCase('space_move', true);
                const ballX = t.getSpriteByName('Ball').posX;
                const ballY = t.getSpriteByName('Ball').posY;
                if (ballX < 10 && ballX > -10 && ballY < 10 && ballY > -10) {
                    t.reportCase('reset_ball', true);
                } else {
                    t.reportCase('reset_ball', false);
                }
            },
            stateSaver: (t) => ({
                score: t.getAllVars('old')
            }),
            delay: 5,
            once: false,
            debounce: true,
            addOnStart: true
        }
    ];
export {testScript};
