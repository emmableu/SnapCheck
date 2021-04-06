import {SpriteMorph} from "isnap/src/runtime-objects";

class Sprite {

    constructor(sprites, spriteMorph) {
        /**
         * @type{SpriteMorph}
         */
        this.ide = sprites.ide;
        this.update(spriteMorph);
    }

    update(spriteMorph) {
        this.data = {
            posX: spriteMorph.xPosition().toFixed(3),
            posY: spriteMorph.yPosition().toFixed(3),
            size: spriteMorph.size,
            dir: spriteMorph.direction(),
            touchSprites: this.calcTouching(spriteMorph),
            variables: Object.keys(spriteMorph.variables.vars)
                .map(v => ({
                    name: v,
                    value: spriteMorph.variables.vars[v].value
                })),
            touchEdges: this.calcEdgesTouched(spriteMorph)
        };
    }

    calcTouching(spriteMorph) {
        return this.ide.stage.children
            .filter(c => (c !== spriteMorph))
            .filter(c => (c instanceof SpriteMorph))
            .filter(c => spriteMorph.isTouching(c))
            .map(c => c.name);
    }

     calcEdgesTouched(spriteMorph) {
        const padding = 20;
        const fb = spriteMorph.nestingBounds();
        const stage = this.ide.stage;
        const edgesTouched = [];

        if (fb.left() < stage.left() + padding) {
            edgesTouched.push('left');
        }
        if (fb.right() > stage.right() - padding) {
            edgesTouched.push('right');
        }
        if (fb.top() < stage.top() + padding) {
            edgesTouched.push('top');
        }
        if (fb.bottom() > stage.bottom() - padding) {
            edgesTouched.push('bottom');
        }
        return edgesTouched;
    }

}
export {Sprite};
