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
var triangulosAbajo;
var triangulosDcha;
var triangulosIzq;
var platforms;
var muertesTotales = 0;
var cursors = new Array(numJugadores);
var gameOver = false;
var idEscenario = 0;
var estaSonando = false;
let musica;
let rebote;

class Escena0 extends Phaser.Scene {

    constructor() {
        super("Escena0");
    }

    

     preload() {
        this.load.image('sky', 'assets/sky.jpeg');
        this.load.image('ground', 'assets/platformN.png');
         this.load.image('ground2', 'assets/platform2N.png');
         this.load.image('wall', 'assets/paredN.png');
         this.load.image('caja', 'assets/caja.png');
         this.load.image('caja1', 'assets/caja1.png');
         this.load.image('caja2', 'assets/caja2.png');
        this.load.image('cuadrencio', 'assets/cuadrado_verde.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('dio', 'assets/dio.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloArriba', 'assets/circulo_arriba.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloIzq', 'assets/circulo_izq.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloDcha', 'assets/circulo_dcha.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloAbajo', 'assets/circulo_abajo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('triangulo', 'assets/triangulo.png', { frameWidth: 32, frameHeight: 32 });
		this.load.image('trianguloAbajo', 'assets/triangulo_abajo.png', { frameWidth: 32, frameHeight: 32 });
		this.load.image('trianguloDcha', 'assets/triangulo_dcha.png', { frameWidth: 32, frameHeight: 32 });
		this.load.image('trianguloIzq', 'assets/triangulo_izq.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('tripletriangulo', 'assets/tripletriangulo.png', { frameWidth: 96, frameHeight: 32 });
         this.load.audio('musica', 'assets/Humble_Match.ogg');
         this.load.audio('rebote', 'assets/rebote.mp3');
     }

    create() {
        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite = "";
            jugadores[i].muerte = false;
        }
       

        if (estaSonando == false) {
            musica = this.sound.add('musica');
            musica.volume = 0.2;
            salto = this.sound.add('salto');
            salto.volume = 0.2;
            muerteSonido = this.sound.add('muerteSonido');
            muerteSonido.volume = 0.4;
            rebote = this.sound.add('rebote');

            musica.play();
            
            musica.setLoop(true);
            estaSonando = true;
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
		triangulosAbajo = this.physics.add.staticGroup();
		triangulosIzq = this.physics.add.staticGroup();
		triangulosDcha = this.physics.add.staticGroup();

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

        jugadores[1].sprite = this.physics.add.sprite(1100, 418, 'dio');

        //  Input Events
        cursors[1] = this.input.keyboard.createCursorKeys();

        cursors[0] = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite.name = i;

            jugadores[i].sprite.setBounce(0.15);
            jugadores[i].sprite.setCollideWorldBounds(true);

            this.physics.add.collider(jugadores[i].sprite, platforms);

            this.physics.add.collider(jugadores[i].sprite, circulosArriba, colisionCirculoArriba);
            this.physics.add.collider(jugadores[i].sprite, circulosIzq, colisionCirculoIzq);
            this.physics.add.collider(jugadores[i].sprite, circulosDcha, colisionCirculoDcha);
            this.physics.add.collider(jugadores[i].sprite, circulosAbajo, colisionCirculoAbajo);

            this.physics.add.collider(jugadores[i].sprite, triangulos, colisionTriangulo);
			this.physics.add.collider(jugadores[i].sprite, triangulosAbajo, colisionTrianguloAbajo);
			this.physics.add.collider(jugadores[i].sprite, triangulosDcha, colisionTrianguloDcha);
			this.physics.add.collider(jugadores[i].sprite, triangulosIzq, colisionTrianguloIzq);
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

        var PKey = this.input.keyboard.addKey('P');
        PKey.on('down', pause, this);

        // And finally the method that handels the pause menu
        function pause() {

            this.scene.pause();
            this.scene.launch('menuPausa');

        };
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
                salto.play();
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
         } else if (muertesTotales == numJugadores) {
             muertesTotales = 0;
             var empato;
             var that = this;
             terminarRonda(empato, this);
         }
    }

  
}

class Escena1 extends Phaser.Scene {

    constructor() {
        super("Escena1");
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
		triangulosAbajo = this.physics.add.staticGroup();
		triangulosIzq = this.physics.add.staticGroup();
		triangulosDcha = this.physics.add.staticGroup();

        //Plataformas
        platforms.create(640, 720, 'ground').setScale(5).refreshBody();
		platforms.create(640, 0, 'ground').setScale(5).refreshBody();
        platforms.create(1200, 550, 'ground');
        platforms.create(600, 500, 'ground');
        platforms.create(1100, 350, 'ground');
        platforms.create(-20, 200, 'ground');
		platforms.create(1100, 150, 'ground');
        platforms.create(30, 400, 'ground');
        platforms.create(750, 16, 'ground');

		platforms.create(1263,150,'wall');
		platforms.create(1263,360,'wall');

        triangulos.create(150, 623, 'tripletriangulo');
        triangulos.create(900, 624, 'triangulo');
		triangulosAbajo.create(50,232,'trianguloAbajo');//Implementar colision triangulo abajo
		triangulosAbajo.create(500,98,'trianguloAbajo');//Implementar colision triangulo abajo
		triangulosAbajo.create(700,98,'trianguloAbajo');//Implementar colision triangulo abajo
		triangulosIzq.create(1231,450,'trianguloIzq');//Implementar colision triangulo dcha

        circulosIzq.create(1239, 242, 'circuloIzq');
		circulosArriba.create(1100, 325, 'circuloArriba');
		circulosArriba.create(500, 476, 'circuloArriba');
		circulosArriba.create(700, 476, 'circuloArriba');
        circulosAbajo.create(1200, 175, 'circuloAbajo');
        circulosAbajo.create(1000, 175, 'circuloAbajo');
		circulosAbajo.create(100, 225, 'circuloAbajo');

        // The player and its settings
        jugadores[0].sprite = this.physics.add.sprite(100, 368, 'cuadrencio');

        jugadores[1].sprite = this.physics.add.sprite(1180, 520, 'dio');

        //  Input Events
        cursors[1] = this.input.keyboard.createCursorKeys();

        cursors[0] = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite.name = i;

            jugadores[i].sprite.setBounce(0.15);
            jugadores[i].sprite.setCollideWorldBounds(true);

            this.physics.add.collider(jugadores[i].sprite, platforms);

            this.physics.add.collider(jugadores[i].sprite, circulosArriba, colisionCirculoArriba);
            this.physics.add.collider(jugadores[i].sprite, circulosIzq, colisionCirculoIzq);
            this.physics.add.collider(jugadores[i].sprite, circulosDcha, colisionCirculoDcha);
            this.physics.add.collider(jugadores[i].sprite, circulosAbajo, colisionCirculoAbajo);

            this.physics.add.collider(jugadores[i].sprite, triangulos, colisionTriangulo);
			this.physics.add.collider(jugadores[i].sprite, triangulosAbajo, colisionTrianguloAbajo);
			this.physics.add.collider(jugadores[i].sprite, triangulosDcha, colisionTrianguloDcha);
			this.physics.add.collider(jugadores[i].sprite, triangulosIzq, colisionTrianguloIzq);
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

        var PKey = this.input.keyboard.addKey('P');
        PKey.on('down', pause, this);

        // And finally the method that handels the pause menu
        function pause() {

            this.scene.pause();
            this.scene.launch('menuPausa');

        };
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
                salto.play();
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
        } else if (muertesTotales == numJugadores) {
            muertesTotales = 0;
            console.log("empato xd");
            var empato;
            var that = this;
            terminarRonda(empato, this);
        }
    }


}

class Escena2 extends Phaser.Scene {

    constructor() {
        super("Escena2");
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
		triangulosAbajo = this.physics.add.staticGroup();
		triangulosIzq = this.physics.add.staticGroup();
		triangulosDcha = this.physics.add.staticGroup();

       //SUELO Y PAREDES
        platforms.create(640, 720, 'ground').setScale(5).refreshBody(); //SUELO
        platforms.create(0, 720, 'wall').setScale(5).refreshBody(); //PARED IZDA
        platforms.create(1280, 720, 'wall').setScale(5).refreshBody(); //PARED DCHA

        //PLATAFORMAS

        platforms.create(640, 550, 'ground'); //medio abajo

        platforms.create(230, 350, 'ground2'); //Arriba izda
        platforms.create(1050, 350, 'ground2'); //Arriba dcha

        //Circulos plat abajo
        circulosArriba.create(460, 526, 'circuloArriba');
        circulosArriba.create(650, 526, 'circuloArriba');
        circulosArriba.create(600, 526, 'circuloArriba');
        circulosArriba.create(700, 526, 'circuloArriba');
        circulosArriba.create(750, 526, 'circuloArriba');
        circulosArriba.create(550, 526, 'circuloArriba');
        circulosArriba.create(500, 526, 'circuloArriba');
        circulosArriba.create(800, 526, 'circuloArriba');

        //circulos lado dcho
        circulosIzq.create(1191, 170, 'circuloIzq');
        circulosIzq.create(1191, 220, 'circuloIzq');
        circulosIzq.create(1191, 270, 'circuloIzq');
        circulosIzq.create(1191, 320, 'circuloIzq');

        //circulos lado izdo
        circulosDcha.create(89, 170, 'circuloDcha');
        circulosDcha.create(89, 220, 'circuloDcha');
        circulosDcha.create(89, 270, 'circuloDcha');
        circulosDcha.create(89, 320, 'circuloDcha');

        //TRIANGULOS

        triangulos.create(150, 624, 'tripletriangulo');
        triangulos.create(250, 624, 'tripletriangulo');
        triangulos.create(350, 624, 'tripletriangulo');

        triangulos.create(930, 624, 'tripletriangulo');
        triangulos.create(1030, 624, 'tripletriangulo');
        triangulos.create(1130, 624, 'tripletriangulo');




        // The player and its settings
           jugadores[0].sprite = this.physics.add.sprite(250, 318, 'cuadrencio');

        jugadores[1].sprite = this.physics.add.sprite(1050, 318, 'dio');

        //  Input Events
        cursors[1] = this.input.keyboard.createCursorKeys();

        cursors[0] = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite.name = i;

            jugadores[i].sprite.setBounce(0.15);
            jugadores[i].sprite.setCollideWorldBounds(true);

            this.physics.add.collider(jugadores[i].sprite, platforms);

            this.physics.add.collider(jugadores[i].sprite, circulosArriba, colisionCirculoArriba);
            this.physics.add.collider(jugadores[i].sprite, circulosIzq, colisionCirculoIzq);
            this.physics.add.collider(jugadores[i].sprite, circulosDcha, colisionCirculoDcha);
            this.physics.add.collider(jugadores[i].sprite, circulosAbajo, colisionCirculoAbajo);

            this.physics.add.collider(jugadores[i].sprite, triangulos, colisionTriangulo);
			this.physics.add.collider(jugadores[i].sprite, triangulosAbajo, colisionTrianguloAbajo);
			this.physics.add.collider(jugadores[i].sprite, triangulosDcha, colisionTrianguloDcha);
			this.physics.add.collider(jugadores[i].sprite, triangulosIzq, colisionTrianguloIzq);
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

        var PKey = this.input.keyboard.addKey('P');
        PKey.on('down', pause, this);

        // And finally the method that handels the pause menu
        function pause() {

            this.scene.pause();
            this.scene.launch('menuPausa');

        };
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
                salto.play();
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
        } else if (muertesTotales == numJugadores) {
            muertesTotales = 0;
            console.log("empato xd");
            var empato;
            var that = this;
            terminarRonda(empato, this);
        }
    }


}

class Escena3 extends Phaser.Scene {

    constructor() {
        super("Escena3");
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
        triangulosAbajo = this.physics.add.staticGroup();
        triangulosIzq = this.physics.add.staticGroup();
        triangulosDcha = this.physics.add.staticGroup();

        platforms.create(640, 720, 'ground').setScale(5).refreshBody();
        platforms.create(640, 0, 'ground').setScale(5).refreshBody();
        platforms.create(1200, 500, 'ground');
        platforms.create(600, 400, 'ground');
        platforms.create(100, 300, 'ground');
        //platforms.create(750, 16, 'ground');


        triangulos.create(49, 623, 'tripletriangulo');
        triangulos.create(146, 623, 'tripletriangulo');
        triangulos.create(243, 623, 'tripletriangulo');
        triangulos.create(340, 623, 'tripletriangulo');
        triangulos.create(437, 623, 'tripletriangulo');
        triangulos.create(534, 623, 'tripletriangulo');
        triangulos.create(631, 623, 'tripletriangulo');
        triangulos.create(728, 623, 'tripletriangulo');
        triangulos.create(825, 623, 'tripletriangulo');
        triangulos.create(922, 623, 'tripletriangulo');
        triangulos.create(1019, 623, 'tripletriangulo');
        triangulos.create(1116, 623, 'tripletriangulo');
        triangulos.create(1213, 623, 'tripletriangulo');
        triangulos.create(1310, 623, 'tripletriangulo');

        circulosArriba.create(500, 376, 'circuloArriba');
        circulosArriba.create(700, 376, 'circuloArriba');
        circulosArriba.create(220, 276, 'circuloArriba');
        circulosArriba.create(1050, 476, 'circuloArriba');



        // The player and its settings
        jugadores[0].sprite = this.physics.add.sprite(150, 268, 'cuadrencio');

        jugadores[1].sprite = this.physics.add.sprite(1100, 468, 'dio');

        //  Input Events
        cursors[1] = this.input.keyboard.createCursorKeys();

        cursors[0] = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite.name = i;

            jugadores[i].sprite.setBounce(0.15);
            jugadores[i].sprite.setCollideWorldBounds(true);

            this.physics.add.collider(jugadores[i].sprite, platforms);

            this.physics.add.collider(jugadores[i].sprite, circulosArriba, colisionCirculoArriba);
            this.physics.add.collider(jugadores[i].sprite, circulosIzq, colisionCirculoIzq);
            this.physics.add.collider(jugadores[i].sprite, circulosDcha, colisionCirculoDcha);
            this.physics.add.collider(jugadores[i].sprite, circulosAbajo, colisionCirculoAbajo);

            this.physics.add.collider(jugadores[i].sprite, triangulos, colisionTriangulo);
            this.physics.add.collider(jugadores[i].sprite, triangulosAbajo, colisionTrianguloAbajo);
            this.physics.add.collider(jugadores[i].sprite, triangulosDcha, colisionTrianguloDcha);
            this.physics.add.collider(jugadores[i].sprite, triangulosIzq, colisionTrianguloIzq);
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

        var PKey = this.input.keyboard.addKey('P');
        PKey.on('down', pause, this);

        // And finally the method that handels the pause menu
        function pause() {

            this.scene.pause();
            this.scene.launch('menuPausa');

        };
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
                salto.play();
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
        } else if (muertesTotales == numJugadores) {
            muertesTotales = 0;
            console.log("empato xd");
            var empato;
            var that = this;
            terminarRonda(empato, this);
        }
    }


}

class resultados extends Phaser.Scene {

    constructor() {
        super("resultados");
    }
    preload() {
        this.load.image('volver', 'assets/boton_volver.png');
        this.load.image('volver_pulsado', 'assets/boton_volver_pulsado.png');
    }

    create() {
        jugadores[0].sprite = "";
        jugadores[1].sprite = "";
        this.add.image(640, 360, 'sky').setScale(1);


        
        //  A simple background for our game
        

        //  The platforms group contains the ground and the 2 ledges we can jump on
        platforms = this.physics.add.staticGroup();

        platforms.create(640, 720, 'ground').setScale(5).refreshBody();
        platforms.create(640, 0, 'ground').setScale(5).refreshBody();

        platforms.create(640, 632, 'caja');
        platforms.create(640, 568, 'caja1');
        platforms.create(704, 608, 'caja2');


        this.buttonVolver = this.add.sprite(250, 40, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());


        // The player and its settings
        if (jugadores[0].puntuacion > jugadores[1].puntuacion) {
            jugadores[0].sprite = this.physics.add.sprite(640, 520, 'cuadrencio');

            jugadores[1].sprite = this.physics.add.sprite(704, 560, 'dio');
        } else {
            jugadores[0].sprite = this.physics.add.sprite(704, 560, 'cuadrencio');

            jugadores[1].sprite = this.physics.add.sprite(640, 520, 'dio');
        }
        
        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].puntuacion = 0;
            jugadores[i].muerte = false;
        }
        idEscenario = 0;
        muertesTotales = 0;

        //  Input Events
        cursors[1] = this.input.keyboard.createCursorKeys();

        cursors[0] = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].sprite.setBounce(0.15);
            jugadores[i].sprite.setCollideWorldBounds(true);

            this.physics.add.collider(jugadores[i].sprite, platforms);
        }

        this.physics.add.collider(jugadores[0].sprite, jugadores[1].sprite);

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
            if (cursors[i].left.isDown) {
                jugadores[i].sprite.body.velocity.x = -320;

            }
            else if (cursors[i].right.isDown) {
                jugadores[i].sprite.body.velocity.x = 320;

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
                salto.play();
            }
        }

    }

    clickButtonVolver() {

        this.scene.start("Mainmenu");

    }

    changeSpriteVolverPulsado() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(250, 40, 'volver_pulsado').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.changeSpriteVolver());
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerout', () => this.changeSpriteVolver());

    }
    changeSpriteVolver() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(250, 40, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());

    }

}

class menuPausa extends Phaser.Scene {
    constructor() {
        super("menuPausa");
    }

    preload() {
        this.load.image('pausa', 'assets/Fondo_pausa.png');
    }

    create() {
        musica.volume = 0.07;
        this.add.image(640, 360, 'pausa').setScale(1);
        var info = "Pausa";
        var info2 = ["Para volver al juego", "pulsa P", "Para salir al menú principal", "pulsa N"];
        var texto = this.add.text(525, 200, info, { font: '72px Courier', fill: '#ffffff' });
        texto.setText(info);
        texto.setDepth(999);

        var texto = this.add.text(300, 300, info2, { font: '48px Courier', fill: '#ffffff' });
        texto.setText(info2);
        texto.setDepth(999)

        var PKey = this.input.keyboard.addKey('P');
        PKey.on('down', play, this);

        var NKey = this.input.keyboard.addKey('N');
        NKey.on('down', quit, this);



        // And finally the method that handels the pause menu
        function play() {
            musica.volume = 0.2;
            switch (idEscenario) {
                case (0):
                    this.scene.resume("Escena0");
                    break;
                case (1):
                    this.scene.resume("Escena1");
                    break;
                case (2):
                    this.scene.resume("Escena2");
                    break;
                case (3):
                    this.scene.resume("Escena3");
                    break;
            }
            
            this.scene.stop("menuPausa");

        };

        function quit() {
            musica.stop();
            estaSonando = false;
            for (var i = 0; i < numJugadores; i++) {
                jugadores[i].puntuacion = 0;
                jugadores[i].muerte = false;
            }
            switch (idEscenario) {
                case (0):
                    this.scene.stop("Escena0");
                    break;
                case (1):
                    this.scene.stop("Escena1");
                    break;
                case (2):
                    this.scene.stop("Escena2");
                    break;
                case (3):
                    this.scene.stop("Escena3");
                    break;
            }

            idEscenario = 0;
            muertesTotales = 0;
            this.scene.start("Mainmenu");
        };

    }


    update() {

    }
}

function colisionCirculoArriba(player, circulos) {
    rebote.play();
    player.body.velocity.y = -1000;
}

function colisionCirculoIzq(player, circulos) {
    rebote.play();
    player.body.velocity.x = -1000;
}

function colisionCirculoDcha(player, circulos) {
    rebote.play();
    player.body.velocity.x = 1000;
}

function colisionCirculoAbajo(player, circulos) {
    rebote.play();
    player.body.velocity.y = 1000;
}

function colisionTriangulo(sprite, triangulo) {
    if (triangulo.body.touching.up) {
        muerteSonido.play();
        morir(jugadores[sprite.name]);
    }
}

function colisionTrianguloAbajo(sprite, triangulo) {
    if (triangulo.body.touching.down) {
        muerteSonido.play();
        morir(jugadores[sprite.name]);
    }
}

function colisionTrianguloDcha(sprite, triangulo) {
    if (triangulo.body.touching.right) {
        muerteSonido.play();
        morir(jugadores[sprite.name]);
    }
}

function colisionTrianguloIzq(sprite, triangulo) {
    if (triangulo.body.touching.left) {
        muerteSonido.play();
        morir(jugadores[sprite.name]);
    }
}

function comprobacionPisacion(sprite, sprite2) {
    if (sprite2.body.touching.up) {
        muerteSonido.play();
        morir(jugadores[sprite2.name]);
    } if (sprite.body.touching.up) {
        muerteSonido.play();
        morir(jugadores[sprite.name]);
    }
}

function morir(player) {
    player.sprite.setTint(0x9c9c9c);
    player.muerte = true;
    player.sprite.x = 10000;
    player.sprite.y = 10000;
    muertesTotales++;
}

function terminarRonda(ganador, that) {
    if (ganador != undefined) { 
        ganador.puntuacion++;
    }
    idEscenario++;
    if (ganador.puntuacion == 10) {
        idEscenario = 5;
    }
    
    if (idEscenario == 4) { idEscenario = 0; }
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
		case (3):
            that.scene.start("Escena3");
            break;
        case (5):
            musica.stop();
            estaSonando = false;
            that.scene.start("resultados");
            
            break;
    }
}
