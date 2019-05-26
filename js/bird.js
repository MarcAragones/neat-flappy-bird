class Bird {
    constructor(imageManager, canvas, brain) {
        this.imageManager = imageManager;
        this.canvas = canvas;
        this.brain = brain;
        this.x = null;
        this.y = null;
        this.alive = null;
        this.fitness = null;
        this.speed = null;
        this.increaseFitness = null;
    }

    init() {
        this.x = Config.game.BIRD_INIT_X;
        this.y = Config.game.BIRD_INIT_Y;
        this.alive = true;
        this.fitness = 0;
        this.speed = 0;
        this.increaseFitness = true;
    }

    update(brain) {
        this.brain = brain;
    }

    move(nextPipe) {
        this._checkAlive(nextPipe);
        if (this.alive) {
            this._fly(nextPipe);
            if (this.increaseFitness) this.fitness++;
        } else {
            this.x -= Config.game.MOVE_SPEED;
        }
    }

    draw() {
        var birdImage = this.imageManager.get('bird');
        this.canvas.save();
        this.canvas.translate(this.x, this.y);
        this.canvas.rotate(Math.min(this.speed * 7, 90) * Math.PI / 180);
        this.canvas.drawImage(birdImage, -24, -24);
        this.canvas.restore();
    }

    isAlive() {
        return this.alive;
    }

    _checkAlive(nextPipe) {
        if (!this.isAlive()) {
            return;
        }
        if (this._hitLand()) {
            this.alive = false;
            this.brain.score = this.fitness;
        }
        if (this._tooHigh()) {
            this.alive = false;
            this.brain.score = this.fitness;
        }
        if (this._hitPipe(nextPipe)) {
            this.alive = false;
            var verticalDistance = Math.abs(nextPipe.pipeUpper + Config.game.SPACE_HEIGHT/2 - this.y);
            verticalDistance /= Config.animation.SCREEN_HEIGHT;
            this.brain.score = this.fitness + 100 - 100 * verticalDistance;
        }
    }

    _hitLand() {
        return this.y + Config.game.BIRD_RADIUS >= Config.game.LAND_Y;
    }

    _tooHigh() {
        return this.y <= -Config.game.BIRD_RADIUS;
    }

    _hitPipe(nextPipe) {
        var horizontalCollision = nextPipe.pipeX - Config.game.BIRD_INIT_X <= Config.game.BIRD_RADIUS;
        var upperCollision = this.y - Config.game.BIRD_RADIUS <= nextPipe.pipeUpper;
        var lowerCollision = this.y + Config.game.BIRD_RADIUS >= nextPipe.pipeUpper + Config.game.SPACE_HEIGHT;
        var verticalCollision = upperCollision || lowerCollision;

        return horizontalCollision && verticalCollision;
    }

    _fly(nextPipe) {
        var input = this._getNetworkInput(nextPipe);
        var decision = this.brain.activate(input);
        var shouldFly = decision > 0.5;
        if (shouldFly) {
            this.speed = -Config.game.FLY_SPEED;
        }

        this.speed += Config.game.GRAVITY;
        this.y += this.speed;
    }

    _getNetworkInput(nextPipe) {
        var pipeHorizontalDistance = (nextPipe.pipeX - this.x) / Config.animation.SCREEN_WIDTH;
        var pipeVerticalDistance = (nextPipe.pipeUpper + Config.game.SPACE_HEIGHT/2 - this.y) / Config.animation.SCREEN_HEIGHT;
        var speed = (this.speed + Config.game.FLY_SPEED) / (2 * Config.game.FLY_SPEED);

        return [pipeHorizontalDistance, pipeVerticalDistance, speed];
    }
}
