// JavaScript source code

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
/*
var player = {
    sprite: "",
    muerte: false
};
*/
class Jugador {
    constructor(sprite, muerte) {
        this.sprite = sprite;
        this.muerte = muerte;
    }
}

var numJugadores = 2;
var jugadores = new Array (numJugadores);
jugadores[0] = new Jugador;
jugadores[1] = new Jugador;
var circulos;
var triangulos;
var platforms;
var cursors = new Array(numJugadores);
var gameOver = false;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platformN.png');
    this.load.image('cuadrencio', 'assets/cuadrencio.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('dio', 'assets/dio.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('circulo', 'assets/circulo.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('triangulo', 'assets/triangulo.png', { frameWidth: 32, frameHeight: 32 });
}

function create() {
    //  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    circulos = this.physics.add.staticGroup();
    triangulos = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    //  Now let's create some ledges
    platforms.create(600, 450, 'ground');
    platforms.create(50, 400, 'ground');
    platforms.create(750, 350, 'ground');

    circulos.create(500, 418, 'circulo');

    triangulos.create(700, 318, 'triangulo');

    //triangulos.create(700, 300, 'triangulo');

    // The player and its settings
    jugadores[0].sprite = this.physics.add.sprite(100, 450, 'cuadrencio');
    jugadores[0].sprite.name = 1;
    jugadores[1].sprite = this.physics.add.sprite(200, 450, 'dio');
    jugadores[1].sprite.name = 2;


    //  Player physics properties. Give the little guy a slight bounce.
    jugadores[0].sprite.setBounce(0.3);
    jugadores[0].sprite.setCollideWorldBounds(true);
    jugadores[1].sprite.setBounce(0.3);
    jugadores[1].sprite.setCollideWorldBounds(true);

    //  Input Events
    cursors[0] = this.input.keyboard.createCursorKeys();

    cursors[1] = this.input.keyboard.addKeys(
        {
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis


    //  The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(jugadores[0].sprite, platforms);
    this.physics.add.collider(jugadores[1].sprite, platforms);
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.collider(jugadores[0].sprite, jugadores[1].sprite, comprobacionPisacion);
    this.physics.add.collider(jugadores[0].sprite, circulos, colisionCirculo);
    this.physics.add.collider(jugadores[1].sprite, circulos, colisionCirculo);

    this.physics.add.collider(jugadores[0].sprite, triangulos, colisionTriangulo);
    this.physics.add.collider(jugadores[1].sprite, triangulos, colisionTriangulo);
}


function update() {
    for (var i = 0; i < numJugadores; i++) {
        if (cursors[i].left.isDown) {
            jugadores[i].sprite.body.velocity.x = -320;

        }
        else if (cursors[i].right.isDown) {
            jugadores[i].sprite.body.velocity.x = 320;

        }
        else if (jugadores[i].sprite.body.touching.down) {
            if (jugadores[i].sprite.body.velocity.x > 20) {
                jugadores[i].sprite.setAccelerationX(-800);
            } else if (jugadores[i].sprite.body.velocity.x < -20) {
                jugadores[i].sprite.setAccelerationX(800);
            } else {
                jugadores[i].sprite.setAccelerationX(0);
                jugadores[i].sprite.body.velocity.x = 0;
            }

        } else {
            if (jugadores[i].sprite.body.velocity.x > 20) {
                jugadores[i].sprite.setAccelerationX(-1400);
            } else if (jugadores[i].sprite.body.velocity.x < -20) {
                jugadores[i].sprite.setAccelerationX(1400);
            } else {
                jugadores[i].sprite.setAccelerationX(0);
                jugadores[i].sprite.body.velocity.x = 0;
            }
        }

        if (cursors[i].up.isDown && jugadores[i].sprite.body.touching.down) {
            jugadores[i].sprite.body.velocity.y = -600;
        }
    }
   
    /*
    if (cursors2.left.isDown) {
        jugadores[1].sprite.body.velocity.x = -320;
    }
    else if (cursors2.right.isDown) {
        jugadores[1].sprite.body.velocity.x = 320;

    }
    else if (jugadores[1].sprite.body.touching.down){
        if (jugadores[1].sprite.body.velocity.x > 20) {
            jugadores[1].sprite.setAccelerationX(-800);
        } else if (jugadores[1].sprite.body.velocity.x < -20) {
            jugadores[1].sprite.setAccelerationX(800);
        } else {
            jugadores[1].sprite.setAccelerationX(0);
            jugadores[1].sprite.body.velocity.x = 0;
        }

    } else {
        if (jugadores[1].sprite.body.velocity.x > 20) {
            jugadores[1].sprite.setAccelerationX(-1400);
        } else if (jugadores[1].sprite.body.velocity.x < -20) {
            jugadores[1].sprite.setAccelerationX(1400);
        } else {
            jugadores[1].sprite.setAccelerationX(0);
            jugadores[1].sprite.body.velocity.x = 0;
        }
    }

    if (cursors2.up.isDown && jugadores[1].sprite.body.touching.down) {
        jugadores[1].sprite.body.velocity.y = -600;
    }
    */
}

function colisionCirculo(player, circulos) {
    player.body.velocity.y = -1000;
}

function colisionTriangulo(sprite, triangulos) {
    console.log("Oh no he rip");
    if (sprite.name == 1) {
        morir(jugadores[0]);
    } else {
        morir(jugadores[1]);
    }
    
}

function comprobacionPisacion(sprite, sprite2) {
    if (sprite2.body.touching.up) {
        console.log("Oh no soy el jugador 2 y he muerto");
        morir(jugadores[1]);
    } if (sprite.body.touching.up) {
        console.log("Oh no soy el jugador 1 y he muerto");
        morir(jugadores[0]);
    }
}

function morir(player) {
    console.log(player.muerte);
    player.muerte = true;
}

function terminarRonda(ganador) {

}