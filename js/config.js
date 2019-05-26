var Config = {};

Config.network = {
    INPUT_SIZE: 2,
}

Config.generation = {
    BIRD_NUM: 15,
    SURVIVOR_NUM: 2,
    MUTATION_CHANCE: 0.3,
    MUTATION_AMOUNT: 1,

    INIT_MAX_SCORE: 32,
}

Config.animation = {
    SCREEN_WIDTH: 336,
    SCREEN_HEIGHT: 512,

    LAND_NUM: 2,

    SCORE_Y: 20,
    SCORE_WIDTH: 24,
    SCORE_SPACE: 2
}

Config.game = {
    PIPE_NUM: 3,
    PIPE_WIDTH: 52,
    PIPE_HEIGHT: 500,
    PIPE_MIN_Y: 100,
    PIPE_MAX_Y: 305,
    SPACE_HEIGHT: 100,

    LAND_Y: 495,

    BIRD_INIT_X: 100,
    BIRD_INIT_Y: 200,
    BIRD_RADIUS: 12,

    GRAVITY: 0.4,
    FLY_SPEED: 5.5,
    MOVE_SPEED: 2,
    FRAME_DELAY: 10,
}
