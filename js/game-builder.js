class GameBuilder {

    build() {
        var imageManager = new ImageManager();
        var names = [
            'back', 'land', 'bird',
            'pipe-up', 'pipe-down', 'pipe-up-red', 'pipe-down-red',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        ];
        
        var canvas = document.getElementById('canvas').getContext('2d');
        var pipeManager = new PipeManager(imageManager, canvas);
        var pipeScore = new PipeScore(pipeManager);
        var generation = new Generation(pipeScore, imageManager, canvas);
        var animation = new Animation(generation, pipeManager, pipeScore, imageManager, canvas);
        var game = new Game(animation, generation);

        var onLoad = function() {
            game.init();
        }

        imageManager.load(names, onLoad);
    }
}
