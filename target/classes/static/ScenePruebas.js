// JavaScript source code
// JavaScript source code

class Jugador {
    constructor(sprite, muerte, puntuacion) {
        this.sprite = sprite;
        this.muerte = muerte;
        this.puntuacion = puntuacion;
    }
}

var numJugadores = 2;
var jugadores = new Array(numJugadores);
for (var i = 0; i < numJugadores; i++) {
    jugadores[i] = new Jugador;
    jugadores[i].muerte = false;
    jugadores[i].puntuacion = 0;
}
var circulosArriba;
var circulosIzq;
var circulosDcha;
var circulosAbajo;
var triangulos;
var platforms;
var muertesTotales = 0;
var cursors = new Array(numJugadores);
var gameOver = false;
var idEscenario = 0;

class SceneA extends Phaser.Scene {

    constructor() {
        super("SceneA");
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platformN.png');
        this.load.image('cuadrencio', 'assets/cuadrado_verde.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('dio', 'assets/dio.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloArriba', 'assets/circulo_arriba.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloIzq', 'assets/circulo_izq.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloDcha', 'assets/circulo_dcha.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloAbajo', 'assets/circulo_abajo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('triangulo', 'assets/triangulo.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
        circulosArriba = this.physics.add.staticGroup();
        circulosIzq = this.physics.add.staticGroup();
        circulosDcha = this.physics.add.staticGroup();
        circulosAbajo = this.physics.add.staticGroup();
        triangulos = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(600, 450, 'ground');
        platforms.create(50, 400, 'ground');
        platforms.create(750, 350, 'ground');

        circulosArriba.create(300, 500, 'circuloArriba');
        circulosIzq.create(600, 500, 'circuloIzq');
        circulosDcha.create(50, 500, 'circuloDcha');
        circulosAbajo.create(300, 400, 'circuloAbajo');

        triangulos.create(700, 318, 'triangulo');

        // The player and its settings
        jugadores[0].sprite = this.physics.add.sprite(300, 450, 'cuadrencio');

        jugadores[1].sprite = this.physics.add.sprite(200, 450, 'dio');

        //  Input Events
        cursors[0] = this.input.keyboard.createCursorKeys();

        cursors[1] = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite.name = i;

            jugadores[i].sprite.setBounce(0.3);
            jugadores[i].sprite.setCollideWorldBounds(true);

            this.physics.add.collider(jugadores[i].sprite, platforms);

            this.physics.add.collider(jugadores[i].sprite, circulosArriba, colisionCirculoArriba);
            this.physics.add.collider(jugadores[i].sprite, circulosIzq, colisionCirculoIzq);
            this.physics.add.collider(jugadores[i].sprite, circulosDcha, colisionCirculoDcha);
            this.physics.add.collider(jugadores[i].sprite, circulosAbajo, colisionCirculoAbajo);

            this.physics.add.collider(jugadores[i].sprite, triangulos, colisionTriangulo);
        }

        this.physics.add.collider(jugadores[0].sprite, jugadores[1].sprite, comprobacionPisacion);

       
    }
    update() {

        for (var i = 0; i < numJugadores; i++) {
            if (jugadores[i].sprite.body.velocity.x > -320 && jugadores[i].sprite.body.velocity.x < 320) {
                if (cursors[i].left.isDown) {
                    jugadores[i].sprite.body.velocity.x = -320;

                }
                else if (cursors[i].right.isDown) {
                    jugadores[i].sprite.body.velocity.x = 320;

                }
            }
            if (jugadores[i].sprite.body.touching.down) {
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

        
        if (muertesTotales == (numJugadores - 1)) {
            var i = 0;
            while (jugadores[i].muerte) {
                i++;
            }
            this.scene.start("SceneB");
        }
    }

     cargarNuevoEscenario() {
    switch (idEscenario) {
        case (0):
            this.scene.start("SceneB");
            break;
        case (1):

            break;
    }
}
}

class SceneB extends Phaser.Scene {

    constructor() {
        super("SceneB");
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platformN.png');
        this.load.image('cuadrencio', 'assets/cuadrado_verde.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('dio', 'assets/dio.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloArriba', 'assets/circulo_arriba.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloIzq', 'assets/circulo_izq.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloDcha', 'assets/circulo_dcha.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloAbajo', 'assets/circulo_abajo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('triangulo', 'assets/triangulo.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        muertesTotales = 0;
        //  A simple background for our game
        this.add.image(400, 300, 'sky');

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
        circulosArriba = this.physics.add.staticGroup();
        circulosIzq = this.physics.add.staticGroup();
        circulosDcha = this.physics.add.staticGroup();
        circulosAbajo = this.physics.add.staticGroup();
        triangulos = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        //  Now let's create some ledges
        platforms.create(600, 450, 'ground');
        platforms.create(50, 400, 'ground');
        platforms.create(750, 350, 'ground');

        circulosArriba.create(300, 500, 'circuloArriba');
        circulosIzq.create(600, 500, 'circuloIzq');
        circulosDcha.create(50, 500, 'circuloDcha');
        circulosAbajo.create(300, 400, 'circuloAbajo');

        triangulos.create(700, 318, 'triangulo');

        // The player and its settings
        jugadores[0].sprite = this.physics.add.sprite(100, 450, 'cuadrencio');
        jugadores[0].muerte = false;
        jugadores[1].sprite = this.physics.add.sprite(200, 450, 'dio');
        jugadores[1].muerte = false;
        //  Input Events
        cursors[0] = this.input.keyboard.createCursorKeys();

        cursors[1] = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite.name = i;

            jugadores[i].sprite.setBounce(0.3);
            jugadores[i].sprite.setCollideWorldBounds(true);

            this.physics.add.collider(jugadores[i].sprite, platforms);

            this.physics.add.collider(jugadores[i].sprite, circulosArriba, colisionCirculoArriba);
            this.physics.add.collider(jugadores[i].sprite, circulosIzq, colisionCirculoIzq);
            this.physics.add.collider(jugadores[i].sprite, circulosDcha, colisionCirculoDcha);
            this.physics.add.collider(jugadores[i].sprite, circulosAbajo, colisionCirculoAbajo);

            this.physics.add.collider(jugadores[i].sprite, triangulos, colisionTriangulo);
        }

        this.physics.add.collider(jugadores[0].sprite, jugadores[1].sprite, comprobacionPisacion);

      

    }
    update() {

        for (var i = 0; i < numJugadores; i++) {
            if (jugadores[i].sprite.body.velocity.x > -320 && jugadores[i].sprite.body.velocity.x < 320) {
                if (cursors[i].left.isDown) {
                    jugadores[i].sprite.body.velocity.x = -320;

                }
                else if (cursors[i].right.isDown) {
                    jugadores[i].sprite.body.velocity.x = 320;

                }
            }
            if (jugadores[i].sprite.body.touching.down) {
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

        if (muertesTotales == (numJugadores - 1)) {
            var i = 0;
            while (jugadores[i].muerte) {
                i++;
            }
            this.scene.start("SceneB");
        }    
    }   
   
        
}
    

    

function colisionCirculoArriba(player, circulos) {
    console.log("Arriba");
    player.body.velocity.y = -1000;
}

function colisionCirculoIzq(player, circulos) {
    console.log("Izq");
    player.body.velocity.x = -1000;
}

function colisionCirculoDcha(player, circulos) {
    console.log("Dcha");
    player.body.velocity.x = 1000;
}

function colisionCirculoAbajo(player, circulos) {
    console.log("Abajo");
    player.body.velocity.y = 1000;
}

function colisionTriangulo(sprite, triangulos) {
    if (triangulos.body.touching.up) { 
        console.log("Oh no he rip");
        morir(jugadores[sprite.name]);
    }
}

function comprobacionPisacion(sprite, sprite2) {
    if (sprite2.body.touching.up) {
        console.log("Oh no soy el jugador " + (sprite2.name + 1) + " y he muerto");
        morir(jugadores[sprite2.name]);
    } if (sprite.body.touching.up) {
        console.log("Oh no soy el jugador " + (sprite.name + 1) + " y he muerto");
        morir(jugadores[sprite.name]);
    }
}

function morir(player) {
    console.log(player.muerte);
    player.muerte = true;
    player.sprite.x = 1000;
    player.sprite.y = 1000;
    muertesTotales++;

}

function comprobarJugadores() {
    if (muertesTotales == (numJugadores - 1)) {
        var i = 0;
        while (jugadores[i].muerte) {
            i++;
        }
        terminarRonda(jugadores[i]);
    }
}

function terminarRonda(ganador) {
    console.log("Soy el jugador " + (ganador.sprite.name + 1) + " y he ganado, toma ya");

    ganador.puntuacion++;
    cargarNuevoEscenario();
}

function cargarNuevoEscenario() {
    switch (idEscenario) {
        case (0):
            this.scene.restart();
            break;
        case (1):

            break;
    }

}

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
    scene: [SceneA, SceneB]
};


var game = new Phaser.Game(config);