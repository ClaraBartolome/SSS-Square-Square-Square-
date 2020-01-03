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

var cursors = new Array(numJugadores);

var idEscenario = 0;
var estaSonando = false;

let musica;
let rebote;

//VARIABLES PARA EL CAMBIO DE RONDA
var counter = 3;
var contador = '';
var alphaC = 1;
var ronda = 0;
var timedEvent;


var partida = false;


class Escena0 extends Phaser.Scene {

    constructor() {
        super("Escena0");
    }

    preload() {
        this.load.image('pausa', 'assets/Fondo_pausa.png');
        this.load.image('sky', 'assets/sky.jpeg');
        this.load.image('ground2', 'assets/platform2N.png');
        this.load.image('caja', 'assets/caja.png');
        this.load.image('3', 'assets/3.png');
        this.load.image('2', 'assets/2.png');
        this.load.image('1', 'assets/1.png');
        this.load.image('caja1', 'assets/caja1.png');
        this.load.image('finR', 'assets/findelaronda.png');
        this.load.image('caja2', 'assets/caja2.png');
        this.load.image('siguienteR', 'assets/siguiente.png');
        this.load.image('resultadosR', 'assets/resultados.png');
        this.load.image('pausaSprite', 'assets/pausa.png');
        this.load.image('circuloIzq', 'assets/circulo_izq.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloDcha', 'assets/circulo_dcha.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloAbajo', 'assets/circulo_abajo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('trianguloAbajo', 'assets/triangulo_abajo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('trianguloDcha', 'assets/triangulo_dcha.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('trianguloIzq', 'assets/triangulo_izq.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('tripletriangulo', 'assets/tripletriangulo.png', { frameWidth: 96, frameHeight: 32 });
        this.load.audio('musica', 'assets/Humble_Match.ogg');
        this.load.audio('rebote', 'assets/rebote.mp3');
    }

    create() {
        for (var i = 0; i < numJugadores; i++) {
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
        this.add.image(640, 360, 'sky').setScale(1);

        platforms = this.physics.add.staticGroup();
        circulosArriba = this.physics.add.staticGroup();
        circulosIzq = this.physics.add.staticGroup();
        circulosDcha = this.physics.add.staticGroup();
        circulosAbajo = this.physics.add.staticGroup();
        triangulos = this.physics.add.staticGroup();
        triangulosAbajo = this.physics.add.staticGroup();
        triangulosIzq = this.physics.add.staticGroup();
        triangulosDcha = this.physics.add.staticGroup();

        switch (idEscenario) {
            case (0):
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
                
                J1posX = 100;
            	J1posY = 268;
            	
            	J2posX = 1100;
            	J2posY = 418; 
                
                if(n == 1){               	
                	jugadores[0].sprite = this.physics.add.sprite(J1posX, J1posY, J1);
                    jugadores[1].sprite = this.physics.add.sprite(J2posX, J2posY, J2);
                }   
                if(n == 2){               	
                	jugadores[1].sprite = this.physics.add.sprite(J1posX, J1posY, J2);
                    jugadores[0].sprite = this.physics.add.sprite(J2posX, J2posY, J1);
                } 

                break;
            case (1):
                platforms.create(640, 720, 'ground').setScale(5).refreshBody();
                platforms.create(640, 0, 'ground').setScale(5).refreshBody();
                platforms.create(1200, 550, 'ground');
                platforms.create(600, 500, 'ground');
                platforms.create(1100, 350, 'ground');
                platforms.create(-20, 200, 'ground');
                platforms.create(1100, 150, 'ground');
                platforms.create(30, 400, 'ground');
                platforms.create(750, 16, 'ground');

                platforms.create(1263, 150, 'wall');
                platforms.create(1263, 360, 'wall');

                triangulos.create(150, 623, 'tripletriangulo');
                triangulos.create(900, 624, 'triangulo');
                triangulosAbajo.create(50, 232, 'trianguloAbajo');
                triangulosAbajo.create(500, 98, 'trianguloAbajo');
                triangulosAbajo.create(700, 98, 'trianguloAbajo');
                triangulosIzq.create(1231, 450, 'trianguloIzq');

                circulosIzq.create(1239, 242, 'circuloIzq');
                circulosArriba.create(1100, 325, 'circuloArriba');
                circulosArriba.create(500, 476, 'circuloArriba');
                circulosArriba.create(700, 476, 'circuloArriba');
                circulosAbajo.create(1200, 175, 'circuloAbajo');
                circulosAbajo.create(1000, 175, 'circuloAbajo');
                circulosAbajo.create(100, 225, 'circuloAbajo');

                J1posX = 100;
            	J1posY = 368;
            	
            	J2posX = 1180;
            	J2posY = 520; 
                
                if(n == 1){               	
                	jugadores[0].sprite = this.physics.add.sprite(J1posX, J1posY, J1);
                    jugadores[1].sprite = this.physics.add.sprite(J2posX, J2posY, J2);
                }   
                if(n == 2){               	
                	jugadores[1].sprite = this.physics.add.sprite(J1posX, J1posY, J2);
                    jugadores[0].sprite = this.physics.add.sprite(J2posX, J2posY, J1);
                } 

                break;
            case (2):
                platforms.create(640, 720, 'ground').setScale(5).refreshBody();
                platforms.create(0, 720, 'wall').setScale(5).refreshBody();
                platforms.create(1280, 720, 'wall').setScale(5).refreshBody();

                platforms.create(640, 550, 'ground');

                platforms.create(230, 350, 'ground2');
                platforms.create(1050, 350, 'ground2');

                circulosArriba.create(460, 526, 'circuloArriba');
                circulosArriba.create(650, 526, 'circuloArriba');
                circulosArriba.create(600, 526, 'circuloArriba');
                circulosArriba.create(700, 526, 'circuloArriba');
                circulosArriba.create(750, 526, 'circuloArriba');
                circulosArriba.create(550, 526, 'circuloArriba');
                circulosArriba.create(500, 526, 'circuloArriba');
                circulosArriba.create(800, 526, 'circuloArriba');

                circulosIzq.create(1191, 170, 'circuloIzq');
                circulosIzq.create(1191, 220, 'circuloIzq');
                circulosIzq.create(1191, 270, 'circuloIzq');
                circulosIzq.create(1191, 320, 'circuloIzq');

                circulosDcha.create(89, 170, 'circuloDcha');
                circulosDcha.create(89, 220, 'circuloDcha');
                circulosDcha.create(89, 270, 'circuloDcha');
                circulosDcha.create(89, 320, 'circuloDcha');

                triangulos.create(150, 624, 'tripletriangulo');
                triangulos.create(250, 624, 'tripletriangulo');
                triangulos.create(350, 624, 'tripletriangulo');

                triangulos.create(930, 624, 'tripletriangulo');
                triangulos.create(1030, 624, 'tripletriangulo');
                triangulos.create(1130, 624, 'tripletriangulo');

                if(n == 1){               	
                	jugadores[0].sprite = this.physics.add.sprite(J1posX, J1posY, J1);
                    jugadores[1].sprite = this.physics.add.sprite(J2posX, J2posY, J2);
                }   
                if(n == 2){               	
                	jugadores[1].sprite = this.physics.add.sprite(J1posX, J1posY, J2);
                    jugadores[0].sprite = this.physics.add.sprite(J2posX, J2posY, J1);
                }
				
                break;
            case (3):
                platforms.create(640, 720, 'ground').setScale(5).refreshBody();
                platforms.create(640, 0, 'ground').setScale(5).refreshBody();
                platforms.create(1200, 500, 'ground');
                platforms.create(600, 400, 'ground');
                platforms.create(100, 300, 'ground');

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

                J1posX = 150;
            	J1posY = 268;
            	
            	J2posX = 1100;
            	J2posY = 468; 
                
                if(n == 1){               	
                	jugadores[0].sprite = this.physics.add.sprite(J1posX, J1posY, J1);
                    jugadores[1].sprite = this.physics.add.sprite(J2posX, J2posY, J2);
                }   
                if(n == 2){               	
                	jugadores[1].sprite = this.physics.add.sprite(J1posX, J1posY, J2);
                    jugadores[0].sprite = this.physics.add.sprite(J2posX, J2posY, J1);
                } 
                
                break;
            case (4):
                platforms.create(640, 720, 'ground').setScale(12).refreshBody();
                platforms.create(640, 0, 'ground').setScale(12).refreshBody();
                platforms.create(0, 720, 'wall').setScale(5).refreshBody();
                platforms.create(1280, 720, 'wall').setScale(5).refreshBody();
                var i = 96;
                while (i != 1216) {
                    circulosArriba.create(i, 520, 'circuloArriba');
                    circulosAbajo.create(i, 200, 'circuloAbajo');
                    i = i + 32;
                }
                i = 232;
                while (i != 520) {
                    circulosIzq.create(1192, i, 'circuloIzq');
                    circulosDcha.create(88, i, 'circuloDcha');
                    i = i + 32;
                }

                platforms.create(0, 360, 'ground');
                platforms.create(1280, 360, 'ground');
				
				J1posX = 150;
            	J1posY = 330;
            	
            	J2posX = 1130;
            	J2posY = 330; 
                
                if(n == 1){               	
                	jugadores[0].sprite = this.physics.add.sprite(J1posX, J1posY, J1);
                    jugadores[1].sprite = this.physics.add.sprite(J2posX, J2posY, J2);
                }   
                if(n == 2){               	
                	jugadores[1].sprite = this.physics.add.sprite(J1posX, J1posY, J2);
                    jugadores[0].sprite = this.physics.add.sprite(J2posX, J2posY, J1);
                }
                break;
            case (5):
                platforms.create(640, 720, 'ground').setScale(5).refreshBody();
                platforms.create(100, 150, 'ground');
                platforms.create(830, 500, 'ground');
                platforms.create(1200, 420, 'ground2');
                platforms.create(430, 420, 'ground2');
                platforms.create(830, 300, 'ground2');

                circulosIzq.create(1272, 620, 'circuloIzq');
                circulosIzq.create(1272, 580, 'circuloIzq');
                circulosArriba.create(40, 632, 'circuloArriba');
                circulosArriba.create(85, 632, 'circuloArriba');
                circulosArriba.create(830, 276, 'circuloArriba');
                circulosArriba.create(1190, 396, 'circuloArriba');
                circulosArriba.create(450, 396, 'circuloArriba');
                circulosDcha.create(8, 70, 'circuloDcha');
                circulosDcha.create(8, 115, 'circuloDcha');

                triangulos.create(680, 468, 'tripletriangulo');
                triangulos.create(777, 468, 'tripletriangulo');
                triangulos.create(874, 468, 'tripletriangulo');
                triangulos.create(971, 468, 'tripletriangulo');
				
				J1posX = 150;
            	J1posY = 118;
            	
            	J2posX = 1235;
            	J2posY = 388; 
                
                if(n == 1){               	
                	jugadores[0].sprite = this.physics.add.sprite(J1posX, J1posY, J1);
                    jugadores[1].sprite = this.physics.add.sprite(J2posX, J2posY, J2);
                }   
                if(n == 2){               	
                	jugadores[1].sprite = this.physics.add.sprite(J1posX, J1posY, J2);
                    jugadores[0].sprite = this.physics.add.sprite(J2posX, J2posY, J1);
                }
                break;
        }

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
		if (!jugadores[0].muerte) {
            if (jugadores[0].sprite.body.velocity.x > -320 && jugadores[i].sprite.body.velocity.x < 320) {
                if (cursors[0].left.isDown) {
                    jugadores[0].sprite.body.velocity.x = -320;
                }
                else if (cursors[0].right.isDown) {
                    jugadores[0].sprite.body.velocity.x = 320;
                }
            }
            if (jugadores[0].sprite.body.touching.down) {
                if (jugadores[0].sprite.body.velocity.x > 20) {
                    jugadores[0].sprite.setAccelerationX(-800);
                } else if (jugadores[0].sprite.body.velocity.x < -20) {
                    jugadores[0].sprite.setAccelerationX(800);
                } else {
                    jugadores[0].sprite.setAccelerationX(0);
                    jugadores[0].sprite.body.velocity.x = 0;
                }
            } else {
                if (jugadores[0].sprite.body.velocity.x > 20) {
                    jugadores[0].sprite.setAccelerationX(-1400);
                } else if (jugadores[0].sprite.body.velocity.x < -20) {
                    jugadores[0].sprite.setAccelerationX(1400);
                } else {
                    jugadores[0].sprite.setAccelerationX(0);
                    jugadores[0].sprite.body.velocity.x = 0;
                }
            }
            if (cursors[0].up.isDown && jugadores[0].sprite.body.touching.down) {
                jugadores[0].sprite.body.velocity.y = -600;
                salto.play();
            }
			J1posX = jugadores[0].sprite.body.x;
			J1posY = jugadores[0].sprite.body.y;
        }
        
        if(id_P != -1 && id_J1 != -1){
        	Comprobar();
        }
        if(partida){
        	Actualizar();
        }
        
        if(!jugadores[1].muerte){
			jugadores[1].sprite.body.x = J2posX;
			jugadores[1].sprite.body.y = J2posY; 
        }
        
        if (muertesTotales_on == (numJugadores - 1)) {
            var i = 0;
            //muertesTotales_on = 0;
            Res_Websockets();
            while (jugadores[i].muerte) {
                i++;
            }
            var that = this;
            this.scene.pause();
            that.scene.pause();
            terminarRonda(jugadores[i], that);
        } else if (muertesTotales_on == numJugadores) {
            //muertesTotales_on = 0;
        	Res_Websockets();
            var empato;
            var that = this;

            that.scene.pause();
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
        this.add.image(640, 360, 'sky').setScale(1);

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

        if (jugadores[0].puntuacion > jugadores[1].puntuacion) {
        	
        	J1posX = 640;
        	J1posY = 520;
        	
        	J2posX = 704;
        	J2posY = 560; 
            
            if(n == 1){               	
            	jugadores[0].sprite = this.physics.add.sprite(J1posX, J1posY, J1);
                jugadores[1].sprite = this.physics.add.sprite(J2posX, J2posY, J2);
            }   
            if(n == 2){               	
            	jugadores[0].sprite = this.physics.add.sprite(J1posX, J1posY, J2);
                jugadores[1].sprite = this.physics.add.sprite(J2posX, J2posY, J1);
            } 

        } else {
        	
        	J1posX = 640;
        	J1posY = 520;
        	
        	J2posX = 704;
        	J2posY = 560; 
            
            if(n == 1){               	
            	jugadores[1].sprite = this.physics.add.sprite(J1posX, J1posY, J1);
                jugadores[0].sprite = this.physics.add.sprite(J2posX, J2posY, J2);
            }   
            if(n == 2){               	
            	jugadores[1].sprite = this.physics.add.sprite(J1posX, J1posY, J2);
                jugadores[0].sprite = this.physics.add.sprite(J2posX, J2posY, J1);
            } 
        	
        }

        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].puntuacion = 0;
            jugadores[i].muerte = false;
        }
        idEscenario = 0;
        muertesTotales_on = 0;

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
        if (cursors[0].left.isDown) {
            jugadores[0].sprite.body.velocity.x = -320;
        }
        else if (cursors[0].right.isDown) {
            jugadores[0].sprite.body.velocity.x = 320;
        }
		if (jugadores[0].sprite.body.touching.down) {
            if (jugadores[0].sprite.body.velocity.x > 20) {
                jugadores[0].sprite.setAccelerationX(-800);
            } else if (jugadores[0].sprite.body.velocity.x < -20) {
                jugadores[0].sprite.setAccelerationX(800);
            } else {
                jugadores[0].sprite.setAccelerationX(0);
                jugadores[0].sprite.body.velocity.x = 0;
            }
        } else {
            if (jugadores[0].sprite.body.velocity.x > 20) {
                jugadores[0].sprite.setAccelerationX(-1400);
            } else if (jugadores[0].sprite.body.velocity.x < -20) {
                jugadores[0].sprite.setAccelerationX(1400);
            } else {
                jugadores[0].sprite.setAccelerationX(0);
                jugadores[0].sprite.body.velocity.x = 0;
            }
        }
        if (cursors[0].up.isDown && jugadores[0].sprite.body.touching.down) {
            jugadores[0].sprite.body.velocity.y = -600;
            salto.play();
        }
		J1posX = jugadores[0].sprite.body.x;
		J1posY = jugadores[0].sprite.body.y;
        
        if(id_P != -1 && id_J1 != -1){
        	Comprobar();
        }
        if(partida){
        	Actualizar();
        }
        
		jugadores[1].sprite.body.x = J2posX;
		jugadores[1].sprite.body.y = J2posY; 

    }

    clickButtonVolver() {
    	musica.stop();
        estaSonando = false;
        for (var i = 0; i < numJugadores; i++) {
            jugadores[i].puntuacion = 0;
            jugadores[i].muerte = false;
        }
        
        this.scene.stop("Escena0");
        this.scene.stop("resultados");

        idEscenario = 0;
        muertesTotales_on = 0;
        cerrar();
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

    create() {
        musica.volume = 0.07;
        this.add.image(640, 360, 'pausa').setScale(1);
        this.add.image(640, 360, 'pausaSprite').setScale(1);

        var PKey = this.input.keyboard.addKey('P');
        PKey.on('down', play, this);

        var NKey = this.input.keyboard.addKey('N');
        NKey.on('down', quit, this);

        function play() {
            musica.volume = 0.2;
            this.scene.resume("Escena0");
            this.scene.stop("menuPausa");
        };

        function quit() {
            musica.stop();
            estaSonando = false;
            for (var i = 0; i < numJugadores; i++) {
                jugadores[i].puntuacion = 0;
                jugadores[i].muerte = false;
            }

            this.scene.stop("Escena0");

            idEscenario = 0;
            muertesTotales_on = 0;
            cerrar();
            this.scene.start("Mainmenu");
        };
    }
}





class sigRonda extends Phaser.Scene {
    constructor() {
        super("sigRonda");
    }

    create() {
        musica.volume = 0.07;
        this.add.image(640, 360, 'pausa').setScale(1);
        counter = 3;
        alphaC = 1;
        ronda++;
        this.add.image(640, 100, 'finR').setScale(1);
        var image1 = this.add.image(300, 250, J1 +"_n").setScale(1);
        var image2 = this.add.image(900, 250, J2 +"_n").setScale(1);
        var P1 = jugadores[0].puntuacion;
        var P2 = jugadores[1].puntuacion;

        var info2 = [J1 + ":" + jugadores[0].puntuacion + " " + J2 + ":" + jugadores[1].puntuacion,];
        console.log(J1);
        if (idEscenario == 7) {
        	this.add.image(640, 325, 'resultadosR').setScale(1);
        } else {
        	this.add.image(640, 325, 'siguienteR').setScale(1);
        }
        
        var texto = this.add.text(image1.width + 200, image1.y - image1.height/2 - 5, P1, { font: '50px Courier', fill: '#ffffff'});
        texto.setStroke('#000041', '5');
        var texto2 = this.add.text(image2.x + image2.width - 100, image2.y - image2.height/2 - 5, P2, { font: '50px Courier', fill: '#ffffff'});
        texto2.setStroke('#000041', '5');
        
        contador = this.add.image(650, 550, '3').setScale(1);
        contador.setAlpha(alphaC);

        timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, repeat: 2 });
        var timedEvent2 = this.time.addEvent({ delay: 10, callback: modAlpha, callbackScope: this, repeat: -1 });

        var NKey = this.input.keyboard.addKey('N');
        NKey.on('down', quit, this);

        function quit() {
            musica.stop();
            estaSonando = false;
            for (var i = 0; i < numJugadores; i++) {
                jugadores[i].puntuacion = 0;
                jugadores[i].muerte = false;
            }

            this.scene.stop("Escena0");

            idEscenario = 0;
            muertesTotales_on = 0;
            this.scene.start("Mainmenu");
        };
        
        function onEvent () {
            counter--; // One second 
            if (counter == 0) {
                alphaC = 0;
            } else {
                alphaC = 1;
            }
            
        }

        function modAlpha() {
            alphaC = alphaC - 0.015; // One second
            if (alphaC <= 0) {
                alphaC = 1;
            }
        }
    }

    update() {
        contador.setAlpha(alphaC);
        
        switch(counter){
        case(2):
        	contador.destroy();
    		contador = this.add.image(650, 550, '2').setScale(1);
    		contador.setAlpha(alphaC);
    		break;
        case(1):
        	contador.destroy();
    		contador = this.add.image(650, 550, '1').setScale(1);
    		contador.setAlpha(alphaC);
    		break;
        case(0):
        	var that = this;
        	play(that);
        	break;
        }
		
        function play(that) {
            musica.volume = 0.2;

            if (idEscenario == 6) { idEscenario = 0; }
			if (idEscenario == 7) {
                musica.stop();
                estaSonando = false;
                that.scene.start("resultados");
            } else {
				that.scene.start("Escena0");
                that.scene.stop("sigRonda");
            }
        };
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
    if (sprite2.y >= sprite.y + 32 && sprite2.body.touching.up) {
        muerteSonido.play();
        morir(jugadores[sprite2.name]);
    } else if (sprite.y >= sprite2.y + 32 && sprite.body.touching.up) {
        muerteSonido.play();
        morir(jugadores[sprite.name]);
    }
}

function morir(player) {
    if(!player.muerte){
		player.sprite.setTint(0x9c9c9c);
	}	
    player.muerte = true;
    Morir(player.muerte);
    player.sprite = "";
    //muertesTotales_on++;
}

function terminarRonda(ganador, that) {
    if (ganador != undefined) {
        ganador.puntuacion++;

    } else {

    }

    idEscenario++;
    if (ganador.puntuacion == 10) {
        idEscenario = 7;
    }
    //AQUI IRIA LA LLAMADA A LA ESCENA DE ENTRE RONDAS. MISMAMENTE

    that.scene.launch("sigRonda");
}

