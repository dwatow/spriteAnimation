function sprite0(options) {
    const that = {}

    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    that.render = function () {
        // Clear the canvas
        that.context.clearRect(0, 0, that.width, that.height);


        // Draw the animation
        that.context.drawImage(
            that.image,
            indexFrame * that.width / totalFrames,
            0,
            that.width / totalFrames,
            that.height,
            0,
            0,
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

    return that;
}
