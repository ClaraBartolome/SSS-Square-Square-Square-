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

var player;
var player2;
var circulos;
var triangulos;
var platforms;
var cursors;
var gameOver = false;
var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platformN.png');
    this.load.image('cuadrencio', 'assets/cuadrencio.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('dio', 'assets/dio.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('circulo', 'assets/cuadrado_verde.png', { frameWidth: 32, frameHeight: 32 });
    this.load.image('triangulo', 'assets/cuadrado_verde.png', { frameWidth: 32, frameHeight: 32 });
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

    circulos.create(500, 420, 'circulo');

    triangulos.create(700, 300, 'triangulo');

    //triangulos.create(700, 300, 'triangulo');

    // The player and its settings
    player = this.physics.add.sprite(100, 450, 'cuadrencio');
    player2 = this.physics.add.sprite(200, 450, 'dio');


    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.3);
    player.setCollideWorldBounds(true);
    player2.setBounce(0.3);
    player2.setCollideWorldBounds(true);

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    cursors2 = this.input.keyboard.addKeys(
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
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player2, platforms);
    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.collider(player, player2, comprobacionPisacion);
    this.physics.add.collider(player, circulos, colisionCirculo);
    this.physics.add.collider(player2, circulos, colisionCirculo);

    this.physics.add.collider(player, triangulos, colisionTriangulo);
    this.physics.add.collider(player2, triangulos, colisionTriangulo);
}


function update() {
    if (gameOver) {
        return;
    }

    if (cursors.left.isDown) {
        player.body.velocity.x = -320;

    }
    else if (cursors.right.isDown) {
        player.body.velocity.x = 320;

    }
    else if (player.body.touching.down) {
        if (player.body.velocity.x > 20) {
            player.setAccelerationX(-800);
        } else if (player.body.velocity.x < -20) {
            player.setAccelerationX(800);
        } else {
            player.setAccelerationX(0);
            player.body.velocity.x = 0;
        }

    } else {
        if (player.body.velocity.x > 20) {
            player.setAccelerationX(-1400);
        } else if (player.body.velocity.x < -20) {
            player.setAccelerationX(1400);
        } else {
            player.setAccelerationX(0);
            player.body.velocity.x = 0;
        }
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -600;
    }

    if (cursors2.left.isDown) {
        player2.body.velocity.x = -320;
    }
    else if (cursors2.right.isDown) {
        player2.body.velocity.x = 320;

    }
    else if(player2.body.touching.down){
        if (player2.body.velocity.x > 20) {
            player2.setAccelerationX(-800);
        } else if (player2.body.velocity.x < -20) {
            player2.setAccelerationX(800);
        } else {
            player2.setAccelerationX(0);
            player2.body.velocity.x = 0;
        }

    } else {
        if (player2.body.velocity.x > 20) {
            player2.setAccelerationX(-1400);
        } else if (player2.body.velocity.x < -20) {
            player2.setAccelerationX(1400);
        } else {
            player2.setAccelerationX(0);
            player2.body.velocity.x = 0;
        }
    }

    if (cursors2.up.isDown && player2.body.touching.down) {
        player2.body.velocity.y = -600;
    }

}

function colisionCirculo(player, circulos) {
    player.body.velocity.y = -1000;
}

function colisionTriangulo(player, triangulos) {
    console.log("Oh no he rip");
}

function comprobacionPisacion(player, player2) {
    if (player2.body.touching.up) {
        console.log("Oh no soy el jugador 2 y he muerto");
    } else if (player.body.touching.up) {
        console.log("Oh no soy el jugador 1 y he muerto");
    }
}