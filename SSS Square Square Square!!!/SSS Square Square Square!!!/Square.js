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

class Escena0 extends Phaser.Scene {

    constructor() {
        super("Escena0");
    }

    

     preload() {
        this.load.image('sky', 'assets/sky.jpeg');
        this.load.image('ground', 'assets/platformN.png');
        this.load.image('cuadrencio', 'assets/cuadrado_verde.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('dio', 'assets/dio.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloArriba', 'assets/circulo_arriba.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloIzq', 'assets/circulo_izq.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloDcha', 'assets/circulo_dcha.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloAbajo', 'assets/circulo_abajo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('triangulo', 'assets/triangulo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('tripletriangulo', 'assets/tripletriangulo.png', { frameWidth: 96, frameHeight: 32 });
    }

    create() {
        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite = "";
            jugadores[i].muerte = false;
        }
        //  A simple background for our game
        this.add.image(640, 360, 'sky').setScale(1);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
        circulosArriba = this.physics.add.staticGroup();
        circulosIzq = this.physics.add.staticGroup();
        circulosDcha = this.physics.add.staticGroup();
        circulosAbajo = this.physics.add.staticGroup();
        triangulos = this.physics.add.staticGroup();

        //Plataformas
        platforms.create(640, 720, 'ground').setScale(5).refreshBody();
        platforms.create(100, 550, 'ground');
        platforms.create(700, 500, 'ground');
        platforms.create(1200, 450, 'ground');
        platforms.create(450, 200, 'ground');
        platforms.create(-50, 300, 'ground');
        platforms.create(750, 16, 'ground');

        triangulos.create(200, 518, 'tripletriangulo');
        triangulos.create(600, 624, 'triangulo');

        circulosArriba.create(1200, 632, 'circuloArriba');
        circulosArriba.create(730, 476, 'circuloArriba');
        circulosArriba.create(450, 176, 'circuloArriba');
        circulosArriba.create(600, 176, 'circuloArriba');
        circulosArriba.create(300, 176, 'circuloArriba');

        circulosIzq.create(1272, 553, 'circuloIzq');

        circulosAbajo.create(1200, 474, 'circuloAbajo');
        circulosAbajo.create(650, 40, 'circuloAbajo');

        // The player and its settings
        jugadores[0].sprite = this.physics.add.sprite(100, 268, 'cuadrencio');

        jugadores[1].sprite = this.physics.add.sprite(600, 450, 'dio');

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

        var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }

        }, this);
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
             muertesTotales = 0;
             while (jugadores[i].muerte) {
                 i++;
             }
             var that = this;
             terminarRonda(jugadores[i], that);
         }
    }

  
}

class Escena1 extends Phaser.Scene {

    constructor() {
        super("Escena1");
    }



    preload() {
        this.load.image('sky', 'assets/sky.jpeg');
        this.load.image('ground', 'assets/platformN.png');
        this.load.image('cuadrencio', 'assets/cuadrado_verde.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('dio', 'assets/dio.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloArriba', 'assets/circulo_arriba.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloIzq', 'assets/circulo_izq.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloDcha', 'assets/circulo_dcha.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloAbajo', 'assets/circulo_abajo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('triangulo', 'assets/triangulo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('tripletriangulo', 'assets/tripletriangulo.png', { frameWidth: 96, frameHeight: 32 });
    }

    create() {
        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite = "";
            jugadores[i].muerte = false;
        }
        //  A simple background for our game
        this.add.image(640, 360, 'sky').setScale(1);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
        circulosArriba = this.physics.add.staticGroup();
        circulosIzq = this.physics.add.staticGroup();
        circulosDcha = this.physics.add.staticGroup();
        circulosAbajo = this.physics.add.staticGroup();
        triangulos = this.physics.add.staticGroup();

        //Plataformas
        platforms.create(640, 720, 'ground').setScale(5).refreshBody();
        platforms.create(100, 550, 'ground');
        platforms.create(700, 500, 'ground');
        platforms.create(1200, 450, 'ground');
        platforms.create(450, 200, 'ground');
        platforms.create(-50, 300, 'ground');
        platforms.create(750, 16, 'ground');

        triangulos.create(200, 518, 'tripletriangulo');
        triangulos.create(600, 624, 'triangulo');


        circulosIzq.create(1272, 553, 'circuloIzq');

        circulosAbajo.create(1200, 474, 'circuloAbajo');
        circulosAbajo.create(650, 40, 'circuloAbajo');

        // The player and its settings
        jugadores[0].sprite = this.physics.add.sprite(100, 268, 'cuadrencio');

        jugadores[1].sprite = this.physics.add.sprite(600, 450, 'dio');

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

        var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }

        }, this);
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
            muertesTotales = 0;
            while (jugadores[i].muerte) {
                i++;
            }
            var that = this;
            terminarRonda(jugadores[i], that);
        }
    }


}


class Escena2 extends Phaser.Scene {

    constructor() {
        super("Escena2");
    }



    preload() {
        this.load.image('sky', 'assets/sky.jpeg');
        this.load.image('ground', 'assets/platformN.png');
        this.load.image('cuadrencio', 'assets/cuadrado_verde.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('dio', 'assets/dio.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloArriba', 'assets/circulo_arriba.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloIzq', 'assets/circulo_izq.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloDcha', 'assets/circulo_dcha.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloAbajo', 'assets/circulo_abajo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('triangulo', 'assets/triangulo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('tripletriangulo', 'assets/tripletriangulo.png', { frameWidth: 96, frameHeight: 32 });
    }

    create() {
        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite = "";
            jugadores[i].muerte = false;
        }
        //  A simple background for our game
        this.add.image(640, 360, 'sky').setScale(1);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();
        circulosArriba = this.physics.add.staticGroup();
        circulosIzq = this.physics.add.staticGroup();
        circulosDcha = this.physics.add.staticGroup();
        circulosAbajo = this.physics.add.staticGroup();
        triangulos = this.physics.add.staticGroup();

        //Plataformas
        platforms.create(640, 720, 'ground').setScale(5).refreshBody();
        platforms.create(100, 550, 'ground');
        platforms.create(700, 500, 'ground');
        platforms.create(1200, 450, 'ground');
        platforms.create(450, 200, 'ground');
        platforms.create(-50, 300, 'ground');
        platforms.create(750, 16, 'ground');

        triangulos.create(200, 518, 'tripletriangulo');
        triangulos.create(600, 624, 'triangulo');

        // The player and its settings
        jugadores[0].sprite = this.physics.add.sprite(100, 268, 'cuadrencio');

        jugadores[1].sprite = this.physics.add.sprite(600, 450, 'dio');

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

        var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }

        }, this);
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
            muertesTotales = 0;
            while (jugadores[i].muerte) {
                i++;
            }
            var that = this;
            terminarRonda(jugadores[i], that);
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
    player.sprite.x = 10000;
    player.sprite.y = 10000;
    muertesTotales++;
}

function terminarRonda(ganador, that) {
    console.log("Soy el jugador " + (ganador.sprite.name + 1) + " y he ganado, toma ya");

    ganador.puntuacion++;
    console.log("Tengo " + ganador.puntuacion + " bro.");
    idEscenario++;
    if (idEscenario == 3) idEscenario = 0;
    switch (idEscenario) {
        case (0):
            that.scene.start("Escena0");
            break;
        case (1):
            that.scene.start("Escena1");
            break;
        case (2):
            that.scene.start("Escena2");
            break;
    }
}
