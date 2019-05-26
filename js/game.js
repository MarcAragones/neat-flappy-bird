class Game {
    constructor(animation, generation) {
        this.animation = animation;
        this.generation = generation;
        this.timer = null;
        this.alive = false;
    }

    init() {
        this.alive = true;
        this.animation.init();
        this.setTimer();
    }

    setTimer() {
        var self = this;
        if (this.timer) {
            clearInterval(this.timer);
        }

        var callback = function() {
            self.update();
        }

        var delay = Config.game.FRAME_DELAY;
        this.timer = setInterval(callback, delay);
    }

    update() {
        if (this._isAlive()) {
            this.animation.update();

            if (this._checkGameOver())
                this._onGameOver();
        }
    }

    _isAlive() {
        return this.alive;
    }

    _setAlive(alive) {
        this.alive = alive;
    }

    _checkGameOver() {
        var alive = this.generation.isAlive();
        this._setAlive(alive);
        return !this._isAlive();
    }

    _onGameOver() {
        this._updateGeneration();
        this._restart();
    }

    _updateGeneration() {
        this.generation.evolve();
    }

    _restart() {
        var self = this;
        var delay = Config.game.FRAME_DELAY * 10;
        setTimeout(function() {
            clearInterval(this.timer);
            self.init();
        },
        delay);
    }

}
