class Generation {
    constructor(pipeScore, imageManager, canvas) {
        var input = Config.network.INPUT_SIZE;
        var output = 1;
        var fitnessFunction = null;
        var options = {
            popsize: Config.generation.BIRD_NUM,
            elitism: Config.generation.SURVIVOR_NUM,
            mutationRate: Config.generation.MUTATION_CHANCE,
            mutationAmount: Config.generation.MUTATION_AMOUNT,
        };
        
        this.neat = new neataptic.Neat(input, output, fitnessFunction, options);
        this.maxScore = Config.generation.INIT_MAX_SCORE;
        this.pipeScore = pipeScore;

        for (var i = 0; i < 100; i++) {
            this.neat.mutate();
        }

        this.birds = [];
        for (var i = 0; i < Config.generation.BIRD_NUM; i++) {
            var brain = this.neat.population[i];
            brain.id = i;
            var bird = new Bird(imageManager, canvas, brain);
            this.birds.push(bird);
        }
    }

    init() {
        for (var i = 0; i < this.birds.length; i++) {
            this.birds[i].init();
        }
    }

    move(nextPipe) {
        for (var i = 0; i < this.birds.length; i++) {
            this.birds[i].move(nextPipe);
        }
    }

    draw() {
        for (var i = 0; i < this.birds.length; i++) {
            this.birds[i].draw();
        }
    }

    isAlive() {
        return this._allBirdsAlive() && this._lessScoreThanAllowed();
    }

    _allBirdsAlive() {
        for (var i = 0; i < this.birds.length; i++) {
            if (this.birds[i].isAlive())
                return true;
        }

        return false;
    }

    _lessScoreThanAllowed() {
        if (this.pipeScore.get() <= this.maxScore) {
            return true;
        } else {
            this.maxScore *= 2;
            return false;
        }
    }

    evolve() {
        this.neat.sort();
        var newGeneration = [];
        for (var i = 0; i < this.neat.elitism; i++) {
            newGeneration.push(this.neat.population[i]);
        }
        this.neat.population = newGeneration;
        while (newGeneration.length < Config.generation.BIRD_NUM) {
            newGeneration.push(this.neat.getOffspring());
        }
        this.neat.population = newGeneration;
        this.neat.mutate();

        for (var i = 0; i < this.birds.length; i++) {
            var brain = this.neat.population[i];
            this.birds[i].update(brain);
        }

        this.neat.generation++;
    }
}
