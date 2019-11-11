// JavaScript source code
class menuPrincipal extends Phaser.Scene {

    constructor() {
        super("Mainmenu");
    }

    preload() {
        this.load.image('fondo', 'assets/fondo_juego.jpg');
        this.load.image('jugar', 'assets/jugar.png');
        this.load.image('jugar_pulsado', 'assets/jugar_pulsado.png');
        this.load.image('creditos', 'assets/creditos.png');
        this.load.image('creditos_pulsado', 'assets/creditos_pulsados.png');
        this.load.image('como_jugar', 'assets/boton_como_jugar.png');
        this.load.image('como_jugar_pulsado', 'assets/boton_como_jugar_pulsado.png');
        this.load.image('volver', 'assets/boton_volver.png');
        this.load.image('volver_pulsado', 'assets/boton_volver_pulsado.png');
        this.load.image('triangulo', 'assets/triangulo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloArriba', 'assets/circulo_arriba.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('cuadrencio', 'assets/cuadrado_verde.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('dio', 'assets/dio.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('ground', 'assets/platformN.png');
        this.load.image('wall', 'assets/paredN.png');
    }

    create() {


        this.add.image(640, 360, 'fondo');

        this.buttonJugar = this.add.sprite(250, 250, 'jugar').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerover', () => this.changeSpriteJugarPulsado());
        this.buttonJugar.on('pointerup', () => this.changeSpriteJugar());


        this.buttonCreditos = this.add.sprite(250, 400, 'creditos').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerover', () => this.changeSpriteCreditosPulsado());
        this.buttonCreditos.on('pointerup', () => this.changeSpriteCreditos());

        this.buttonComoJugar = this.add.sprite(250, 550, 'como_jugar').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerover', () => this.changeSpriteComoJugarPulsado());
        this.buttonComoJugar.on('pointerup', () => this.changeSpriteComoJugar());

    }

    update() {



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

    clickButtonJugar() {
        this.scene.switch("Escena0");
    }
    clickButtonCreditos() {
        this.scene.switch("creditos");
    }
    clickButtonComoJugar() {
        this.scene.switch("ComoJugar");
    }

    changeSpriteJugarPulsado() {
        this.buttonJugar.destroy();
        this.buttonJugar = this.add.sprite(250, 250, 'jugar_pulsado').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerout', () => this.changeSpriteJugar());

    }
    changeSpriteJugar() {
        this.buttonJugar.destroy();
        this.buttonJugar = this.add.sprite(250, 250, 'jugar').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerover', () => this.changeSpriteJugarPulsado());
        this.buttonJugar.on('pointerup', () => this.changeSpriteJugar());

    }
    changeSpriteCreditosPulsado() {
        this.buttonCreditos.destroy();
        this.buttonCreditos = this.add.sprite(250, 400, 'creditos_pulsado').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerout', () => this.changeSpriteCreditos());

    }
    changeSpriteCreditos() {
        this.buttonCreditos.destroy();
        this.buttonCreditos = this.add.sprite(250, 400, 'creditos').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerover', () => this.changeSpriteCreditosPulsado());
        this.buttonCreditos.on('pointerup', () => this.changeSpriteJugar());

    }

    changeSpriteComoJugarPulsado() {
        this.buttonComoJugar.destroy();
        this.buttonComoJugar = this.add.sprite(250, 550, 'como_jugar_pulsado').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerout', () => this.changeSpriteComoJugar());

    }
    changeSpriteComoJugar() {
        this.buttonComoJugar.destroy();
        this.buttonComoJugar = this.add.sprite(250, 550, 'como_jugar').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerover', () => this.changeSpriteComoJugarPulsado());
        this.buttonComoJugar.on('pointerup', () => this.changeSpriteJugar());

    }

}

// JavaScript source code
class creditos extends Phaser.Scene {

    constructor() {
        super("creditos");
    }

    create() {
        var info = [
            'GRUPO A:NI[ME]',
            'Fernando Doménech Martínez',
            'Elena Rosal',
            'Clara Megalovania Javi Naruto'
        ];

        var texto = this.add.text(100, 400, info, { font: '32px Courier', fill: '#ffffff' });
        texto.setText(info);
        texto.setDepth(999)
        this.add.image(640, 360, 'fondo');

        this.buttonJugar = this.add.sprite(250, 250, 'jugar').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerover', () => this.changeSpriteJugarPulsado());
        this.buttonJugar.on('pointerup', () => this.changeSpriteJugar());



    }

    update() {



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

    clickButtonJugar() {
        this.scene.switch("Escena0");
    }
    clickButtonCreditos() {
        console.log("SQUARE SQUARE SQUARE!!");
    }

    changeSpriteJugarPulsado() {
        this.buttonJugar.destroy();
        this.buttonJugar = this.add.sprite(250, 250, 'jugar_pulsado').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerout', () => this.changeSpriteJugar());

    }
    changeSpriteJugar() {
        this.buttonJugar.destroy();
        this.buttonJugar = this.add.sprite(250, 250, 'jugar').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerover', () => this.changeSpriteJugarPulsado());
        this.buttonJugar.on('pointerup', () => this.changeSpriteJugar());

    }
    changeSpriteCreditosPulsado() {
        this.buttonCreditos.destroy();
        this.buttonCreditos = this.add.sprite(250, 400, 'creditos_pulsado').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerout', () => this.changeSpriteCreditos());

    }
    changeSpriteCreditos() {
        this.buttonCreditos.destroy();
        this.buttonCreditos = this.add.sprite(250, 400, 'creditos').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerover', () => this.changeSpriteCreditosPulsado());
        this.buttonCreditos.on('pointerup', () => this.changeSpriteJugar());

    }

}

var numJugadores = 2;
var jugadores = new Array(numJugadores);
var platforms;
var cursors = new Array(numJugadores);

class ComoJugar extends Phaser.Scene {

    constructor() {
        super("ComoJugar");
    }

    preload() {
        this.load.image('triangulo', 'assets/triangulo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloArriba', 'assets/circulo_arriba.png', { frameWidth: 32, frameHeight: 32 });
    }
    create() {

        this.add.image(640, 360, 'fondo');

        this.buttonVolver = this.add.sprite(250, 50, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());

        this.circulo = this.add.sprite(225, 592, 'circuloArriba');
        this.triangulo = this.add.sprite(665, 584, 'triangulo');

        platforms = this.physics.add.staticGroup();

        platforms.create(322, 369, 'ground').setScale(0.7);
        platforms.create(175, 240, 'wall').setScale(0.7);
        platforms.create(322, 111, 'ground').setScale(0.7);
        platforms.create(450, 240, 'wall').setScale(0.7); 

        platforms.create(958, 369, 'ground').setScale(0.7);
        platforms.create(830, 240, 'wall').setScale(0.7);
        platforms.create(958, 111, 'ground').setScale(0.7);
        platforms.create(1105, 240, 'wall').setScale(0.7); 

        jugadores[0].sprite = this.physics.add.sprite(315, 340, 'cuadrencio');

        jugadores[1].sprite = this.physics.add.sprite(965, 340, 'dio');

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

            jugadores[i].sprite.setBounce(0.3);
            jugadores[i].sprite.setCollideWorldBounds(true);

            this.physics.add.collider(jugadores[i].sprite, platforms);
        }

        var jugador1 = [
            'Jugador 1:',
            'A D para moverse',
            'izquierda y derecha',
            'W para saltar'
        ];

        var jugador2 = [
            'Jugador 2:',
            'Flechas izq. dcha. para',
            'moverse izquierda y derecha',
            'Flecha arriba para saltar'
        ];

        var circulos = [
            'Usa los',
            'para impulsarte'
        ];

        var triangulos = [
            'Evita los',
            '¡Acabarán contigo!'
        ];

        var cuadrados = [
            'Salta sobre tu',
            'oponente para ganar'
        ];

        var textoJugador1 = this.add.text(100, 420, jugador1, { font: '32px Courier', fill: '#ffffff' });
        textoJugador1.setText(jugador1);
        textoJugador1.setDepth(999)

        var textoJugador2 = this.add.text(700, 420, jugador2, { font: '32px Courier', fill: '#ffffff' });
        textoJugador2.setText(jugador2);
        textoJugador2.setDepth(999)

        var textoCirculos = this.add.text(50, 575, circulos, { font: '32px Courier', fill: '#ffffff' });
        textoCirculos.setText(circulos);
        textoCirculos.setDepth(999)

        var textoTriangulos = this.add.text(450, 575, triangulos, { font: '32px Courier', fill: '#ffffff' });
        textoTriangulos.setText(triangulos);
        textoTriangulos.setDepth(999)

        var textoCuadrados = this.add.text(850, 575, cuadrados, { font: '32px Courier', fill: '#ffffff' });
        textoCuadrados.setText(cuadrados);
        textoCuadrados.setDepth(999)


    }

    update() {



        var FKey = this.input.keyboard.addKey('F');

        FKey.on('down', function () {

            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }

        }, this);

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
            }
        }
    }
    clickButtonVolver() {
       
        this.scene.wake("menuPrincipal");
        this.scene.start("menuPrincipal");
        console.log("Volviendo")
    }

    changeSpriteVolverPulsado() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(250, 50, 'volver_pulsado').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerout', () => this.changeSpriteVolver());

    }
    changeSpriteVolver() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(250, 50, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());

    }
 

}