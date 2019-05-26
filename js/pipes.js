class PipeManager {
    constructor(imageManager, canvas) {
        this.imageManager = imageManager;
        this.canvas = canvas;
        this.pipeX = [];
        this.pipeUpper = [];
        this.nextPipe = 0;
    }

    init() {
        this.nextPipe = 0;

        for (var i = 0; i < Config.game.PIPE_NUM; i++) {
            this.pipeX[i] = (Config.animation.SCREEN_WIDTH + Config.game.PIPE_WIDTH) * (0.8 + i * 0.5);
            this.pipeUpper[i] = this._getNewPipeY();
        }
        this.pipeX[Config.game.PIPE_NUM] = Number.MAX_VALUE;
    }

    draw() {
        for (var i = 0; i < Config.game.PIPE_NUM; i++) {
            if (/*game.nextPipe*/true) {
                var imageUpName = i == this.nextPipe ? 'pipe-up-red': 'pipe-up';
                var imageDownName = i == this.nextPipe ? 'pipe-down-red': 'pipe-down';
                var pipeUpImage = this.imageManager.get(imageUpName);
                var pipeDownImage = this.imageManager.get(imageDownName);
                this.canvas.drawImage(pipeUpImage, this.pipeX[i], this.pipeUpper[i] + Config.game.SPACE_HEIGHT);
                this.canvas.drawImage(pipeDownImage, this.pipeX[i], this.pipeUpper[i] - Config.game.PIPE_HEIGHT);
            }
        }
    }

    move() {
        for (var i = 0; i < Config.game.PIPE_NUM; i++) {
            this.pipeX[i] -= Config.game.MOVE_SPEED;
            if (this.pipeX[i] <= -Config.game.PIPE_WIDTH) {
                this.pipeX[i] = (Config.animation.SCREEN_WIDTH + Config.game.PIPE_WIDTH) * 0.5 * Config.game.PIPE_NUM - Config.game.PIPE_WIDTH;
                this.pipeUpper[i] = this._getNewPipeY();
            }
        }
    }

    _getNewPipeY() {
        return Math.floor(Math.random() * (Config.game.PIPE_MAX_Y - Config.game.PIPE_MIN_Y)) + Config.game.PIPE_MIN_Y;
    }

    getNextPipe() {
        for (var i = 0; i < Config.game.PIPE_NUM; i++) {
            var isOnTheBirdLeft = this.pipeX[i] < Config.game.BIRD_INIT_X - Config.game.PIPE_WIDTH - Config.game.BIRD_RADIUS;
            if (isOnTheBirdLeft && this.nextPipe == i) {
                this.nextPipe = (this.nextPipe + 1) % Config.game.PIPE_NUM;
            }
        }

        return {
            pipeX: this.pipeX[this.nextPipe],
            pipeUpper: this.pipeUpper[this.nextPipe],
            index: this.nextPipe,
        };
    }
}

class PipeScore {
    constructor(pipeManager) {
        this.pipeManager = pipeManager;
    }

    init() {
        this.score = 0;
        this.currentPipe = 0;
    }

    get() {
        var nextPipe = this.pipeManager.getNextPipe().index;
        if (this.currentPipe != nextPipe) {
            this.currentPipe = nextPipe;
            this.score++;
        }
        return this.score;
    }
}
