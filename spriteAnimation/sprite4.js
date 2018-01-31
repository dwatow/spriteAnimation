function sprite4(options) {
    const that = {}

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.moveStep = options.moveStep;

    const position = {
        x: 0, y: 0
    }
    that.render = function () {
        // Clear the canvas
        that.context.clearRect(position.x - that.moveStep, position.y - that.moveStep,
            that.width + that.moveStep,
            that.height + that.moveStep);

        // Draw the animation
        that.context.drawImage(
            that.image,
            indexFrame * that.width / totalFrames,
            directFrame,
            that.width / totalFrames,
            that.height,
            position.x,
            position.y,
            that.width / totalFrames,
            that.height
        );
    };

    let indexFrame = 0;
    let tickCount = 0;
    let ticksPerFrame = options.ticksPerFrame || 0;
    let totalFrames = options.totalFrames || 1;
    that.isInfinite = options.isInfinite;
    that.update = function () {
        tickCount += 1;
        if (tickCount > ticksPerFrame) {
        	tickCount = 0;
            // Go to the next frame
            // If the current frame index is in range
            if (indexFrame < totalFrames - 1) {
                // Go to the next frame
                indexFrame += 1;
            }
            else if (that.isInfinite) {
                indexFrame = 0;
            }
        }
    };

    const direct = {
        "left": 37,
        "top": 38,
        "right": 39,
        "bottom": 40
    }

    directFrame = 16;
    that.direct = function (direction) {
        switch (direction) {
            case direct["left"]:
                directFrame = 208;
                position.x -= that.moveStep;
                break;
            case direct["top"]:
                directFrame = 112;
                position.y -= that.moveStep;
                break;
            case direct["right"]:
                directFrame = 304;
                position.x += that.moveStep;
                break;
            case direct["bottom"]:
                directFrame = 16;
                position.y += that.moveStep;
        }
    }

    that.stop = function (direct) {
        indexFrame = 0;
        if (direct["right"] === direct) {
            indexFrame = 1;
        }
    }
    return that;
}
