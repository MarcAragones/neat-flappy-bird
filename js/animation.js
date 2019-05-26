class Animation {

    constructor(generation, pipeManager, pipeScore, imageManager, canvas) {
        this.generation = generation;
        this.pipeManager = pipeManager;
        this.pipeScore = pipeScore;
        this.imageManager = imageManager;
        this.canvas = canvas;
        this.land_x = [];
    }
    
    init() {
        for (var i = 0; i < Config.animation.LAND_NUM; i++) {
            this.land_x[i] = Config.animation.SCREEN_WIDTH * i;
        }

        this.generation.init();
        this.pipeManager.init();
        this.pipeScore.init();
    }

    update() {
        this._moveLand();        
        this._drawBackground();
        this._drawPipes();
        this._drawLand();
        this._drawBird();
        this._drawScore();
    }

    _moveLand() {
        for (var i = 0; i < Config.animation.LAND_NUM; i++) {
            if (/*!game.gameover*/ true) {
                this.land_x[i] -= Config.game.MOVE_SPEED;
                if (this.land_x[i] <= -Config.animation.SCREEN_WIDTH) {
                    this.land_x[i] += Config.animation.SCREEN_WIDTH * 2;
                }
            }
        }
    }

    _drawBackground() {
        var backImage = this.imageManager.get('back');
        this.canvas.drawImage(backImage, 0, 0);
    }

    _drawPipes() {
        this.pipeManager.move();
        this.pipeManager.draw();
    }

    _drawLand() {
        for (var i = 0; i < Config.animation.LAND_NUM; i++) {
            var landImage = this.imageManager.get('land');
            this.canvas.drawImage(landImage, this.land_x[i], Config.game.LAND_Y);
        }
    }

    _drawBird() {
        var nextPipe = this.pipeManager.getNextPipe();
        this.generation.move(nextPipe);
        this.generation.draw();
    }

    _drawScore() {
        var score = this.pipeScore.get();
        var digits = [];
        while (true) {
            var digit = score % 10;
            digits.push(digit);

            score = (score - digit) / 10;
            if (score <= 0) break;
        }

        var scoreY = Config.animation.SCORE_Y;
        var scoreX = (Config.animation.SCREEN_WIDTH - Config.animation.SCORE_WIDTH) / 2;
        scoreX += (digits.length - 1) * Config.animation.SCORE_WIDTH / 2;

        for (var i = 0; i < digits.length; i++) {
            this.canvas.drawImage(this.imageManager.get(digits[i].toString()), scoreX, scoreY);
            scoreX -= Config.animation.SCORE_WIDTH;
        }
    }
}
