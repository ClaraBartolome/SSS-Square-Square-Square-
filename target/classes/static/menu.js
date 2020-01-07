// JavaScript source code

let muerteSonido;
let salto;

var J1 = "";
var J2 = "";

var info;
var info2;
var texto;
var texto2;

var numJugadores = 2;
var jugadores = new Array(numJugadores);
var platforms;
var cursors = new Array(numJugadores);


class Mainmenu extends Phaser.Scene {

    constructor() {
        super("Mainmenu");
    }

    preload() {
        this.load.image('logo', 'assets/logo.png');
        this.load.image('fondo', 'assets/fondo_juego.jpg');
        this.load.image('fondo_login', 'assets/FSeleccion.jpg');
        this.load.image('fondo2', 'assets/fondo_juego_2.jpg');
        this.load.image('fondo3', 'assets/creditos_fondo.jpg');
        this.load.image('ok', 'assets/B_OK.png')
        this.load.image('ok_pul', 'assets/B_OK_pul.png')
        this.load.image('cancelar', 'assets/B_OK.png')
        this.load.image('cancelar_pul', 'assets/B_OK_pul.png')

        this.load.image('J1_c', 'assets/Jugador_1.png')
        this.load.image('J2_c', 'assets/Jugador_2.png')
        this.load.image('pausaC', 'assets/Pausa_con.png')
        this.load.image('jugar_local', 'assets/local_transparente.png');
        this.load.image('jugar_local_pulsado', 'assets/local_pulsado.png');
        this.load.image('jugar_online', 'assets/online_transparente.png');
        this.load.image('jugar_online_pulsado', 'assets/online_pulsado.png');
        this.load.image('creditos', 'assets/creditos.png');
        this.load.image('creditos_pulsado', 'assets/creditos_pulsados.png');
        this.load.image('como_jugar', 'assets/boton_como_jugar.png');
        this.load.image('como_jugar_pulsado', 'assets/boton_como_jugar_pulsado.png');
        this.load.image('volver', 'assets/boton_volver.png');
        this.load.image('volver_pulsado', 'assets/boton_volver_pulsado.png');
        this.load.image('triangulo', 'assets/triangulo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('circuloArriba', 'assets/circulo_arriba.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('cuadrencio', 'assets/cuadrencio.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('cuadralino', 'assets/cuadrado_verde.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('cuadradio', 'assets/dio.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('cuadradio_n', 'assets/cuadradio_n.png');
        this.load.image('cuadrabob', 'assets/CuadraBob.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('cuadratricio', 'assets/CuadraTricio.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('cuadrataro', 'assets/cuadrataro.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('cuadrataro_n', 'assets/cuadrataro_n.png');
        this.load.image('cuadrencio_n', 'assets/cuadrencio_n.png');
        this.load.image('cuadralino_n', 'assets/cuadralino_n.png');
        this.load.image('cuadratricio_n', 'assets/cuadratricio_n.png');
        this.load.image('cuadrabob_n', 'assets/cuadrabob_n.png');

        this.load.image('cuadraruto', 'assets/cuadraruto.jpg');
        this.load.image('cuadrasanji', 'assets/cuadrasanji.jpg');
        this.load.image('cuadrasasuke', 'assets/cuadrasasuke.jpg');
        this.load.image('cuadrazoro', 'assets/cuadrazoro.jpg');
        this.load.image('cuadralien', 'assets/cuadralien.jpg');
        this.load.image('cuadragato', 'assets/cuadragato.jpg');
        this.load.image('cuadramomia', 'assets/cuadramomia.png');
        this.load.image('cuadrabarril', 'assets/cuadrabarril.jpg');
        this.load.image('cuadramago', 'assets/cuadrabrujo.jpg');
        this.load.image('cuadrachuche', 'assets/cuadrachuche.jpg');

        this.load.image('cuadraruto_n', 'assets/cuadraruto_n.png');
        this.load.image('cuadrasasuke_n', 'assets/cuadrasuke_n.png');
        this.load.image('cuadrazoro_n', 'assets/cuadrazoro_n.png');
        this.load.image('cuadrasanji_n', 'assets/cuadrasanji_n.png');
        this.load.image('cuadralien_n', 'assets/cuadralien_n.png');
        this.load.image('cuadragato_n', 'assets/cuadragato_n.png');
        this.load.image('cuadramomia_n', 'assets/cuadramomia_n.png');
        this.load.image('cuadrabarril_n', 'assets/cuadrarril_n.png');
        this.load.image('cuadramago_n', 'assets/cuadrabrujo_n.png');
        this.load.image('cuadrachuche_n', 'assets/cuadrachuche_n.png');
        this.load.image('ground', 'assets/platformN.png');
        this.load.image('wall', 'assets/paredN.png');
        this.load.image('reglas', 'assets/Reglas.png');

        this.load.audio('salto', 'assets/salto_1.mp3');
        this.load.audio('muerteSonido', 'assets/muerte.mp3');


    }

    create() {
        J1 = "";
        J2 = "";

        muerteSonido = this.sound.add('muerteSonido');
        muerteSonido.volume = 0.4;
        this.add.image(640, 360, 'fondo');



        this.add.image(300, 150, 'logo').setScale(0.7);

        this.buttonJugarLocal = this.add.sprite(300, 350, 'jugar_local').setScale(0.5).setInteractive();
        this.buttonJugarLocal.on('pointerdown', () => this.clickButtonJugarLocal());
        this.buttonJugarLocal.on('pointerover', () => this.changeSpriteJugarLocalPulsado());
        this.buttonJugarLocal.on('pointerup', () => this.changeSpriteJugarLocal());

        this.buttonJugarOnline = this.add.sprite(300, 450, 'jugar_online').setScale(0.5).setInteractive();
        this.buttonJugarOnline.on('pointerdown', () => this.clickButtonJugarOnline());
        this.buttonJugarOnline.on('pointerover', () => this.changeSpriteJugarOnlinePulsado());
        this.buttonJugarOnline.on('pointerup', () => this.changeSpriteJugarOnline());

        this.buttonComoJugar = this.add.sprite(300, 550, 'como_jugar').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerover', () => this.changeSpriteComoJugarPulsado());
        this.buttonComoJugar.on('pointerup', () => this.changeSpriteComoJugar());

        this.buttonCreditos = this.add.sprite(300, 650, 'creditos').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerover', () => this.changeSpriteCreditosPulsado());
        this.buttonCreditos.on('pointerup', () => this.changeSpriteCreditos());

        var info = ["Usuarios Conectados: " + NusuariosAct];
        var info2 = ["Usuarios Jugando: " + NusuariosJug];
        texto = this.add.text(1000, 50, info, { font: '20px Courier', fill: '#ffffff' });
        texto2 = this.add.text(1000, 100, info2, { font: '20px Courier', fill: '#ffffff' });

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

    clickButtonJugarLocal() {
        muerteSonido.play();
        this.scene.start("local");
    }
    clickButtonJugarOnline() {
        muerteSonido.play();
        this.scene.start("login");
    }
    clickButtonCreditos() {
        muerteSonido.play();
        this.scene.switch("creditos");
    }
    clickButtonComoJugar() {
        muerteSonido.play();
        this.scene.start("ComoJugar");
    }



    changeSpriteJugarLocalPulsado() {
        this.buttonJugarLocal.destroy();
        this.buttonJugarLocal = this.add.sprite(300, 350, 'jugar_local_pulsado').setScale(0.5).setInteractive();
        this.buttonJugarLocal.on('pointerdown', () => this.changeSpriteJugarLocal());
        this.buttonJugarLocal.on('pointerdown', () => this.clickButtonJugarLocal());
        this.buttonJugarLocal.on('pointerout', () => this.changeSpriteJugarLocal());

    }
    changeSpriteJugarLocal() {
        this.buttonJugarLocal.destroy();
        this.buttonJugarLocal = this.add.sprite(300, 350, 'jugar_local').setScale(0.5).setInteractive();
        this.buttonJugarLocal.on('pointerdown', () => this.clickButtonJugarLocal());
        this.buttonJugarLocal.on('pointerover', () => this.changeSpriteJugarLocalPulsado());
        this.buttonJugarLocal.on('pointerup', () => this.changeSpriteJugarLocal());

    }
    changeSpriteJugarOnlinePulsado() {
        this.buttonJugarOnline.destroy();
        this.buttonJugarOnline = this.add.sprite(300, 450, 'jugar_online_pulsado').setScale(0.5).setInteractive();
        this.buttonJugarOnline.on('pointerdown', () => this.changeSpriteJugarOnline());
        this.buttonJugarOnline.on('pointerdown', () => this.clickButtonJugarOnline());
        this.buttonJugarOnline.on('pointerout', () => this.changeSpriteJugarOnline());

    }
    changeSpriteJugarOnline() {
        this.buttonJugarOnline.destroy();
        this.buttonJugarOnline = this.add.sprite(300, 450, 'jugar_online').setScale(0.5).setInteractive();
        this.buttonJugarOnline.on('pointerdown', () => this.clickButtonJugarOnline());
        this.buttonJugarOnline.on('pointerover', () => this.changeSpriteJugarOnlinePulsado());
        this.buttonJugarOnline.on('pointerup', () => this.changeSpriteJugarOnline());

    }
    changeSpriteCreditosPulsado() {
        this.buttonCreditos.destroy();
        this.buttonCreditos = this.add.sprite(300, 650, 'creditos_pulsado').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.changeSpriteCreditos());
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerout', () => this.changeSpriteCreditos());

    }
    changeSpriteCreditos() {
        this.buttonCreditos.destroy();
        this.buttonCreditos = this.add.sprite(300, 650, 'creditos').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerover', () => this.changeSpriteCreditosPulsado());
        this.buttonCreditos.on('pointerup', () => this.changeSpriteJugar());

    }

    changeSpriteComoJugarPulsado() {
        this.buttonComoJugar.destroy();
        this.buttonComoJugar = this.add.sprite(300, 550, 'como_jugar_pulsado').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.changeSpriteComoJugar());
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerout', () => this.changeSpriteComoJugar());

    }
    changeSpriteComoJugar() {
        this.buttonComoJugar.destroy();
        this.buttonComoJugar = this.add.sprite(300, 550, 'como_jugar').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerover', () => this.changeSpriteComoJugarPulsado());
        this.buttonComoJugar.on('pointerup', () => this.changeSpriteJugar());

    }

    update() {
        usuarios();
        info = ["Usuarios Conectados: " + NusuariosAct];
        info2 = ["Usuarios Jugando: " + NusuariosJug];

        // console.log(NusuariosAct);
        //console.log(NusuariosJug);

        texto.setText(info);
        texto2.setText(info2);
    }

}

var suelo1, suelo2;
var techo1, techo2;
var paredI1, paredI2;
var paredD1, paredD2;

var J1posX = 200;
var J1posY = 340;

var J2posX = 1080;
var J2posY = 340;

var J1velX = 0;
var J1velY = 0;
var J2velX = 0;
var J2velY = 0;

var J1muerte = false; 
var J2muerte = false;

var partida = false;

class local extends Phaser.Scene {
    constructor() {
        super("local");
    }

    shadebuttons() {
        this.buttonCuadrencio.setTint(0x727272);
        this.buttonCuadralino.setTint(0x727272);
        this.buttonCuadradio.setTint(0x727272);
        this.buttonCuadrataro.setTint(0x727272);
        this.buttonCuadrabob.setTint(0x727272);
        this.buttonCuadratricio.setTint(0x727272);
        this.buttonCuadraruto.setTint(0x727272);
        this.buttonCuadrasasuke.setTint(0x727272);
        this.buttonCuadrasanji.setTint(0x727272);
        this.buttonCuadrazoro.setTint(0x727272);
        this.buttonCuadralien.setTint(0x727272);
        this.buttonCuadramomia.setTint(0x727272);
        this.buttonCuadragato.setTint(0x727272);
        this.buttonCuadrabarril.setTint(0x727272);
        this.buttonCuadramago.setTint(0x727272);
        this.buttonCuadrachuche.setTint(0x727272);

    }

    create() {
        this.add.image(640, 360, 'fondo_login');

        platforms = this.physics.add.staticGroup();

        suelo1 = platforms.create(200, 506, 'ground').setScale(0.7805);
        techo1 = platforms.create(200, 212, 'ground').setScale(0.7805);
        paredI1 = platforms.create(52, 359, 'wall').setScale(0.7805);
        paredD1 = platforms.create(348, 359, 'wall').setScale(0.7805);

        suelo2 = platforms.create(1080, 506, 'ground').setScale(0.7805);
        techo2 = platforms.create(1080, 212, 'ground').setScale(0.7805);
        paredI2 = platforms.create(932, 359, 'wall').setScale(0.7805);
        paredD2 = platforms.create(1228, 359, 'wall').setScale(0.7805);

        jugadores[0].sprite = this.physics.add.sprite(200, 340, J1);
        jugadores[1].sprite = this.physics.add.sprite(1080, 340, J2);

        jugadores[0].sprite.setVisible(false);
        jugadores[1].sprite.setVisible(false);

        suelo1.setVisible(false);
        techo1.setVisible(false);
        paredI1.setVisible(false);
        paredD1.setVisible(false);

        suelo2.setVisible(false);
        techo2.setVisible(false);
        paredI2.setVisible(false);
        paredD2.setVisible(false);

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

        this.banner1 = this.add.sprite(200, 575, 'cuadrencio_n').setScale(1);
        this.banner1.setVisible(false);
        this.banner2 = this.add.sprite(200, 575, 'cuadrencio_n').setScale(1);
        this.banner2.setVisible(false);

        this.portrait1 = this.add.sprite(200, 360, 'cuadrencio').setScale(10);
        this.portrait1.setVisible(false);
        this.portrait2 = this.add.sprite(1080, 360, 'cuadrencio').setScale(10);
        this.portrait2.setVisible(false);

        //BOTON CUADRENCIO
        this.buttonCuadrencio = this.add.sprite(580, 320, 'cuadrencio').setScale(3).setInteractive();
        this.buttonCuadrencio.on('pointerdown', () => this.clickButton("cuadrencio"));
        this.buttonCuadrencio.on('pointerover', () => this.changeSpritePulsado("cuadrencio", "cuadrencio_n"));
        this.buttonCuadrencio.on('pointerout', () => this.changeSprite());

        //BOTON CUADRALINO
        this.buttonCuadralino = this.add.sprite(700, 320, 'cuadralino').setScale(3).setInteractive();
        this.buttonCuadralino.on('pointerdown', () => this.clickButton("cuadralino"));
        this.buttonCuadralino.on('pointerover', () => this.changeSpritePulsado("cuadralino", "cuadralino_n"));
        this.buttonCuadralino.on('pointerout', () => this.changeSprite());

        //BOTON CUADRADIO
        this.buttonCuadradio = this.add.sprite(580, 430, 'cuadradio').setScale(3).setInteractive();
        this.buttonCuadradio.on('pointerdown', () => this.clickButton("cuadradio"));
        this.buttonCuadradio.on('pointerover', () => this.changeSpritePulsado("cuadradio", "cuadradio_n"));
        this.buttonCuadradio.on('pointerout', () => this.changeSprite());

        //BOTON CUADRATARO
        this.buttonCuadrataro = this.add.sprite(700, 430, 'cuadrataro').setScale(3).setInteractive();
        this.buttonCuadrataro.on('pointerdown', () => this.clickButton("cuadrataro"));
        this.buttonCuadrataro.on('pointerover', () => this.changeSpritePulsado("cuadrataro", "cuadrataro_n"));
        this.buttonCuadrataro.on('pointerout', () => this.changeSprite());

        //BOTON CUADRABOB
        this.buttonCuadrabob = this.add.sprite(580, 540, 'cuadrabob').setScale(3).setInteractive();
        this.buttonCuadrabob.on('pointerdown', () => this.clickButton("cuadrabob"));
        this.buttonCuadrabob.on('pointerover', () => this.changeSpritePulsado("cuadrabob", "cuadrabob_n"));
        this.buttonCuadrabob.on('pointerout', () => this.changeSprite());

        //BOTON CUADRATRICIO
        this.buttonCuadratricio = this.add.sprite(700, 540, 'cuadratricio').setScale(3).setInteractive();
        this.buttonCuadratricio.on('pointerdown', () => this.clickButton("cuadratricio"));
        this.buttonCuadratricio.on('pointerover', () => this.changeSpritePulsado("cuadratricio", "cuadratricio_n"));
        this.buttonCuadratricio.on('pointerout', () => this.changeSprite());

        //BOTON CUADRARUTO
        this.buttonCuadraruto = this.add.sprite(820, 320, 'cuadraruto').setScale(3).setInteractive();
        this.buttonCuadraruto.on('pointerdown', () => this.clickButton("cuadraruto"));
        this.buttonCuadraruto.on('pointerover', () => this.changeSpritePulsado("cuadraruto", "cuadraruto_n"));
        this.buttonCuadraruto.on('pointerout', () => this.changeSprite());

        //BOTON CUADRASASUKE
        this.buttonCuadrasasuke = this.add.sprite(820, 430, 'cuadrasasuke').setScale(3).setInteractive();
        this.buttonCuadrasasuke.on('pointerdown', () => this.clickButton("cuadrasasuke"));
        this.buttonCuadrasasuke.on('pointerover', () => this.changeSpritePulsado("cuadrasasuke", "cuadrasasuke_n"));
        this.buttonCuadrasasuke.on('pointerout', () => this.changeSprite());

        //BOTON CUADRASANJI
        this.buttonCuadrasanji = this.add.sprite(820, 540, 'cuadrasanji').setScale(3).setInteractive();
        this.buttonCuadrasanji.on('pointerdown', () => this.clickButton("cuadrasanji"));
        this.buttonCuadrasanji.on('pointerover', () => this.changeSpritePulsado("cuadrasanji", "cuadrasanji_n"));
        this.buttonCuadrasanji.on('pointerout', () => this.changeSprite());

        //BOTON CUADRAZORO
        this.buttonCuadrazoro = this.add.sprite(460, 320, 'cuadrazoro').setScale(3).setInteractive();
        this.buttonCuadrazoro.on('pointerdown', () => this.clickButton("cuadrazoro"));
        this.buttonCuadrazoro.on('pointerover', () => this.changeSpritePulsado("cuadrazoro", "cuadrazoro_n"));
        this.buttonCuadrazoro.on('pointerout', () => this.changeSprite());

        //BOTON CUADRALIEN
        this.buttonCuadralien = this.add.sprite(460, 430, 'cuadralien').setScale(3).setInteractive();
        this.buttonCuadralien.on('pointerdown', () => this.clickButton("cuadralien"));
        this.buttonCuadralien.on('pointerover', () => this.changeSpritePulsado("cuadralien", "cuadralien_n"));
        this.buttonCuadralien.on('pointerout', () => this.changeSprite());

        //BOTON CUADRAMOMIA
        this.buttonCuadramomia = this.add.sprite(460, 540, 'cuadramomia').setScale(3).setInteractive();
        this.buttonCuadramomia.on('pointerdown', () => this.clickButton("cuadramomia"));
        this.buttonCuadramomia.on('pointerover', () => this.changeSpritePulsado("cuadramomia", "cuadramomia_n"));
        this.buttonCuadramomia.on('pointerout', () => this.changeSprite());

        //BOTON CUADRAGATO
        this.buttonCuadragato = this.add.sprite(580, 210, 'cuadragato').setScale(3).setInteractive();
        this.buttonCuadragato.on('pointerdown', () => this.clickButton("cuadragato"));
        this.buttonCuadragato.on('pointerover', () => this.changeSpritePulsado("cuadragato", "cuadragato_n"));
        this.buttonCuadragato.on('pointerout', () => this.changeSprite());

        //BOTON CUADRABARRIL
        this.buttonCuadrabarril = this.add.sprite(460, 210, 'cuadrabarril').setScale(3).setInteractive();
        this.buttonCuadrabarril.on('pointerdown', () => this.clickButton("cuadrabarril"));
        this.buttonCuadrabarril.on('pointerover', () => this.changeSpritePulsado("cuadrabarril", "cuadrabarril_n"));
        this.buttonCuadrabarril.on('pointerout', () => this.changeSprite());

        //BOTON CUADRAMAGO
        this.buttonCuadramago = this.add.sprite(700, 210, 'cuadramago').setScale(3).setInteractive();
        this.buttonCuadramago.on('pointerdown', () => this.clickButton("cuadramago"));
        this.buttonCuadramago.on('pointerover', () => this.changeSpritePulsado("cuadramago", "cuadramago_n"));
        this.buttonCuadramago.on('pointerout', () => this.changeSprite());

        //BOTON CUADRACHUCHE
        this.buttonCuadrachuche = this.add.sprite(820, 210, 'cuadrachuche').setScale(3).setInteractive();
        this.buttonCuadrachuche.on('pointerdown', () => this.clickButton("cuadrachuche"));
        this.buttonCuadrachuche.on('pointerover', () => this.changeSpritePulsado("cuadrachuche", "cuadrachuche_n"));
        this.buttonCuadrachuche.on('pointerout', () => this.changeSprite());

        //BOTON OK
        this.buttonOK = this.add.sprite(640, 650, 'ok').setScale(1).setInteractive();
        this.buttonOK.on('pointerdown', () => this.clickButtonOK());
        this.buttonOK.on('pointerover', () => this.changeSpriteOKPulsado());
        this.buttonOK.on('pointerout', () => this.changeSpriteOK());

        //BOTON VOLVER
        this.buttonVolver = this.add.sprite(250, 50, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerout', () => this.changeSpriteVolver());

        this.shadebuttons();

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
            }
        }
    }

    //funciones skins
    clickButton(skin) {
        if (J1 == "" || J2 == "") {
            switch (skin) {
                case "cuadrencio":
                    this.buttonCuadrencio.clearTint();
                    break;
                case "cuadralino":
                    this.buttonCuadralino.clearTint();
                    break;
                case "cuadradio":
                    this.buttonCuadradio.clearTint();
                    break;
                case "cuadrataro":
                    this.buttonCuadrataro.clearTint();
                    break;
                case "cuadrabob":
                    this.buttonCuadrabob.clearTint();
                    break;
                case "cuadratricio":
                    this.buttonCuadratricio.clearTint();
                    break;
                case "cuadrazoro":
                    this.buttonCuadrazoro.clearTint();
                    break;
                case "cuadrasanji":
                    this.buttonCuadrasanji.clearTint();
                    break;
                case "cuadraruto":
                    this.buttonCuadraruto.clearTint();
                    break;
                case "cuadrasasuke":
                    this.buttonCuadrasasuke.clearTint();
                    break;
                case "cuadramomia":
                    this.buttonCuadramomia.clearTint();
                    break;
                case "cuadragato":
                    this.buttonCuadragato.clearTint();
                    break;
                case "cuadrabarril":
                    this.buttonCuadrabarril.clearTint();
                    break;
                case "cuadramago":
                    this.buttonCuadramago.clearTint();
                    break;
                case "cuadralien":
                    this.buttonCuadralien.clearTint();
                    break;
                case "cuadrachuche":
                    this.buttonCuadrachuche.clearTint();
                    break;
            }
            if (J1 == "") {
                if (J2 == skin) {
                    switch (skin) {
                        case "cuadrencio":
                            this.buttonCuadrencio.setTint(0x727272);
                            break;
                        case "cuadralino":
                            this.buttonCuadralino.setTint(0x727272);
                            break;
                        case "cuadradio":
                            this.buttonCuadradio.setTint(0x727272);
                            break;
                        case "cuadrataro":
                            this.buttonCuadrataro.setTint(0x727272);
                            break;
                        case "cuadrabob":
                            this.buttonCuadrabob.setTint(0x727272);
                            break;
                        case "cuadratricio":
                            this.buttonCuadratricio.setTint(0x727272);
                            break;
                        case "cuadrazoro":
                            this.buttonCuadrazoro.setTint(0x727272);
                            break;
                        case "cuadrasanji":
                            this.buttonCuadrasanji.setTint(0x727272);
                            break;
                        case "cuadraruto":
                            this.buttonCuadraruto.setTint(0x727272);
                            break;
                        case "cuadrasasuke":
                            this.buttonCuadrasasuke.setTint(0x727272);
                            break;
                        case "cuadramomia":
                            this.buttonCuadramomia.setTint(0x727272);
                            break;
                        case "cuadragato":
                            this.buttonCuadragato.setTint(0x727272);
                            break;
                        case "cuadrabarril":
                            this.buttonCuadrabarril.setTint(0x727272);
                            break;
                        case "cuadramago":
                            this.buttonCuadramago.setTint(0x727272);
                            break;
                        case "cuadralien":
                            this.buttonCuadralien.setTint(0x727272);
                            break;
                        case "cuadrachuche":
                            this.buttonCuadrachuche.setTint(0x727272);
                            break;
                    }
                    J2 = "";

                    this.banner2.destroy();
                    jugadores[1].sprite.setVisible(false);

                    suelo2.setVisible(false);
                    techo2.setVisible(false);
                    paredI2.setVisible(false);
                    paredD2.setVisible(false);
                } else {
                    J1 = skin;
                    this.portrait1.destroy();

                    jugadores[0].sprite = this.physics.add.sprite(200, 340, J1);

                    jugadores[0].sprite.setBounce(0.15);
                    jugadores[0].sprite.setCollideWorldBounds(true);

                    this.physics.add.collider(jugadores[0].sprite, platforms);

                    suelo1.setVisible(true);
                    techo1.setVisible(true);
                    paredI1.setVisible(true);
                    paredD1.setVisible(true);
                }
            } else if (J2 == "") {
                if (J1 == skin) {
                    switch (skin) {
                        case "cuadrencio":
                            this.buttonCuadrencio.setTint(0x727272);
                            break;
                        case "cuadralino":
                            this.buttonCuadralino.setTint(0x727272);
                            break;
                        case "cuadradio":
                            this.buttonCuadradio.setTint(0x727272);
                            break;
                        case "cuadrataro":
                            this.buttonCuadrataro.setTint(0x727272);
                            break;
                        case "cuadrabob":
                            this.buttonCuadrabob.setTint(0x727272);
                            break;
                        case "cuadratricio":
                            this.buttonCuadratricio.setTint(0x727272);
                            break;
                        case "cuadrazoro":
                            this.buttonCuadrazoro.setTint(0x727272);
                            break;
                        case "cuadrasanji":
                            this.buttonCuadrasanji.setTint(0x727272);
                            break;
                        case "cuadraruto":
                            this.buttonCuadraruto.setTint(0x727272);
                            break;
                        case "cuadrasasuke":
                            this.buttonCuadrasasuke.setTint(0x727272);
                            break;
                        case "cuadramomia":
                            this.buttonCuadramomia.setTint(0x727272);
                            break;
                        case "cuadragato":
                            this.buttonCuadragato.setTint(0x727272);
                            break;
                        case "cuadrabarril":
                            this.buttonCuadrabarril.setTint(0x727272);
                            break;
                        case "cuadramago":
                            this.buttonCuadramago.setTint(0x727272);
                            break;
                        case "cuadralien":
                            this.buttonCuadralien.setTint(0x727272);
                            break;
                        case "cuadrachuche":
                            this.buttonCuadrachuche.setTint(0x727272);
                            break;
                    }
                    J1 = "";

                    this.portrait1 = this.add.sprite(200, 360, skin).setScale(10);

                    jugadores[0].sprite.setVisible(false);

                    suelo1.setVisible(false);
                    techo1.setVisible(false);
                    paredI1.setVisible(false);
                    paredD1.setVisible(false);
                }
                else if (J2 == "" && skin != J1) {
                    J2 = skin;
                    this.portrait2.destroy();
                    jugadores[1].sprite = this.physics.add.sprite(1080, 340, J2);

                    jugadores[1].sprite.setBounce(0.15);
                    jugadores[1].sprite.setCollideWorldBounds(true);
                    this.physics.add.collider(jugadores[1].sprite, platforms);

                    suelo2.setVisible(true);
                    techo2.setVisible(true);
                    paredI2.setVisible(true);
                    paredD2.setVisible(true);
                }
            }
        } else {
            if (J1 == skin) {
                switch (skin) {
                    case "cuadrencio":
                        this.buttonCuadrencio.setTint(0x727272);
                        break;
                    case "cuadralino":
                        this.buttonCuadralino.setTint(0x727272);
                        break;
                    case "cuadradio":
                        this.buttonCuadradio.setTint(0x727272);
                        break;
                    case "cuadrataro":
                        this.buttonCuadrataro.setTint(0x727272);
                        break;
                    case "cuadrabob":
                        this.buttonCuadrabob.setTint(0x727272);
                        break;
                    case "cuadratricio":
                        this.buttonCuadratricio.setTint(0x727272);
                        break;
                    case "cuadrazoro":
                        this.buttonCuadrazoro.setTint(0x727272);
                        break;
                    case "cuadrasanji":
                        this.buttonCuadrasanji.setTint(0x727272);
                        break;
                    case "cuadraruto":
                        this.buttonCuadraruto.setTint(0x727272);
                        break;
                    case "cuadrasasuke":
                        this.buttonCuadrasasuke.setTint(0x727272);
                        break;
                    case "cuadramomia":
                        this.buttonCuadramomia.setTint(0x727272);
                        break;
                    case "cuadragato":
                        this.buttonCuadragato.setTint(0x727272);
                        break;
                    case "cuadrabarril":
                        this.buttonCuadrabarril.setTint(0x727272);
                        break;
                    case "cuadramago":
                        this.buttonCuadramago.setTint(0x727272);
                        break;
                    case "cuadralien":
                        this.buttonCuadralien.setTint(0x727272);
                        break;
                    case "cuadrachuche":
                        this.buttonCuadrachuche.setTint(0x727272);
                        break;
                }
                J1 = "";

                this.portrait1 = this.add.sprite(200, 360, skin).setScale(10);

                jugadores[0].sprite.setVisible(false);

                suelo1.setVisible(false);
                techo1.setVisible(false);
                paredI1.setVisible(false);
                paredD1.setVisible(false);
            } else if (J2 == skin) {
                switch (skin) {
                    case "cuadrencio":
                        this.buttonCuadrencio.setTint(0x727272);
                        break;
                    case "cuadralino":
                        this.buttonCuadralino.setTint(0x727272);
                        break;
                    case "cuadradio":
                        this.buttonCuadradio.setTint(0x727272);
                        break;
                    case "cuadrataro":
                        this.buttonCuadrataro.setTint(0x727272);
                        break;
                    case "cuadrabob":
                        this.buttonCuadrabob.setTint(0x727272);
                        break;
                    case "cuadratricio":
                        this.buttonCuadratricio.setTint(0x727272);
                        break;
                    case "cuadrazoro":
                        this.buttonCuadrazoro.setTint(0x727272);
                        break;
                    case "cuadrasanji":
                        this.buttonCuadrasanji.setTint(0x727272);
                        break;
                    case "cuadraruto":
                        this.buttonCuadraruto.setTint(0x727272);
                        break;
                    case "cuadrasasuke":
                        this.buttonCuadrasasuke.setTint(0x727272);
                        break;
                    case "cuadramomia":
                        this.buttonCuadramomia.setTint(0x727272);
                        break;
                    case "cuadragato":
                        this.buttonCuadragato.setTint(0x727272);
                        break;
                    case "cuadrabarril":
                        this.buttonCuadrabarril.setTint(0x727272);
                        break;
                    case "cuadramago":
                        this.buttonCuadramago.setTint(0x727272);
                        break;
                    case "cuadralien":
                        this.buttonCuadralien.setTint(0x727272);
                        break;
                    case "cuadrachuche":
                        this.buttonCuadrachuche.setTint(0x727272);
                        break;
                }
                J2 = "";

                this.portrait2 = this.add.sprite(1080, 360, skin).setScale(10);

                jugadores[1].sprite.setVisible(false);

                suelo2.setVisible(false);
                techo2.setVisible(false);
                paredI2.setVisible(false);
                paredD2.setVisible(false);
            } 
        }
         
    }

    changeSpritePulsado(skin, banner) {
        if (J1 == "") {
            this.banner1.destroy();
            this.portrait1.destroy();

            if (skin == "cuadragato") {
                this.banner1 = this.add.sprite(200, 575, banner).setScale(0.85);
            } else {
                this.banner1 = this.add.sprite(200, 575, banner).setScale(1);
            }
            this.portrait1 = this.add.sprite(200, 360, skin).setScale(10);
        } else {
            if (J2 == "") {
                this.banner2.destroy();
                this.portrait2.destroy();

                if (skin == "cuadragato") {
                    this.banner2 = this.add.sprite(1080, 575, banner).setScale(0.85);
                } else {
                    this.banner2 = this.add.sprite(1080, 575, banner).setScale(1);
                }
                this.portrait2 = this.add.sprite(1080, 360, skin).setScale(10);
            }
        }
    }

    changeSprite() {
        if (J1 == "") {
            this.banner1.destroy();
            this.portrait1.destroy();
        } else {
            if (J2 == "") {
                this.banner2.destroy();
                this.portrait2.destroy();
            }
        }
    }

    //FUNCIONES OK    
    clickButtonOK() {
        if (J1 != "" && J2 != "") {
            muerteSonido.play();
            this.scene.start("JuegoLocal");
        }
    }

    changeSpriteOKPulsado() {
        this.buttonOK.destroy();
        this.buttonOK = this.add.sprite(640, 650, 'ok_pul').setScale(1).setInteractive();
        this.buttonOK.on('pointerdown', () => this.clickButtonOK());
        this.buttonOK.on('pointerdown', () => this.changeSpriteOKPulsado());
        this.buttonOK.on('pointerout', () => this.changeSpriteOK());
    }

    changeSpriteOK() {
        this.buttonOK.destroy();
        this.buttonOK = this.add.sprite(640, 650, 'ok').setScale(1).setInteractive();
        this.buttonOK.on('pointerdown', () => this.clickButtonOK());
        this.buttonOK.on('pointerover', () => this.changeSpriteOKPulsado());
        this.buttonOK.on('pointerup', () => this.changeSpriteOK());
    }

    //FUNCIONES VOLVER
    clickButtonVolver() {
        J1 = "";
        J2 = "";
        muerteSonido.play();
        this.scene.start("Mainmenu");
    }

    changeSpriteVolverPulsado() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(250, 50, 'volver_pulsado').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerdown', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerout', () => this.changeSpriteVolver());
    }

    changeSpriteVolver() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(250, 50, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());
    }
}


class login extends Phaser.Scene {
	constructor() {
        super("login");
    }

	shadebuttons(){
    	this.buttonCuadrencio.setTint(0x727272);
    	this.buttonCuadralino.setTint(0x727272);
    	this.buttonCuadradio.setTint(0x727272);
    	this.buttonCuadrataro.setTint(0x727272);
    	this.buttonCuadrabob.setTint(0x727272);
    	this.buttonCuadratricio.setTint(0x727272);
    	this.buttonCuadraruto.setTint(0x727272);
        this.buttonCuadrasasuke.setTint(0x727272);
        this.buttonCuadrasanji.setTint(0x727272);
        this.buttonCuadrazoro.setTint(0x727272);
        this.buttonCuadralien.setTint(0x727272);
        this.buttonCuadramomia.setTint(0x727272);
        this.buttonCuadragato.setTint(0x727272);
        this.buttonCuadrabarril.setTint(0x727272);
        this.buttonCuadramago.setTint(0x727272);
        this.buttonCuadrachuche.setTint(0x727272);
    	
    }

    create() {
		
        this.add.image(640, 360, 'fondo_login');     

        partida = false;
        platforms = this.physics.add.staticGroup();

        suelo1 = platforms.create(200, 506, 'ground').setScale(0.7805);
        techo1 = platforms.create(200, 212, 'ground').setScale(0.7805);
        paredI1 = platforms.create(52, 359, 'wall').setScale(0.7805);
        paredD1 = platforms.create(348, 359, 'wall').setScale(0.7805); 
		
        jugadores[0].sprite = this.physics.add.sprite(200, 340, J1);
		
		jugadores[0].sprite.setVisible(false);
		
		suelo1.setVisible(false);
		techo1.setVisible(false);
		paredI1.setVisible(false);
		paredD1.setVisible(false);

        cursors[0] = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

            jugadores[0].sprite.setBounce(0.15);
            jugadores[0].sprite.setCollideWorldBounds(true);

            this.physics.add.collider(jugadores[0].sprite, platforms);

        this.banner1 = this.add.sprite(200, 575, 'cuadrencio_n').setScale(1);
        this.banner1.setVisible(false);

        this.portrait1 = this.add.sprite(200, 360, 'cuadrencio').setScale(10);
        this.portrait1.setVisible(false);

      //BOTON CUADRENCIO
        this.buttonCuadrencio = this.add.sprite(580, 320, 'cuadrencio').setScale(3).setInteractive();
        this.buttonCuadrencio.on('pointerdown', () => this.clickButton("cuadrencio"));
        this.buttonCuadrencio.on('pointerover', () => this.changeSpritePulsado("cuadrencio", "cuadrencio_n"));
        this.buttonCuadrencio.on('pointerout', () => this.changeSprite());
        
      //BOTON CUADRALINO
        this.buttonCuadralino = this.add.sprite(700, 320, 'cuadralino').setScale(3).setInteractive();
        this.buttonCuadralino.on('pointerdown', () => this.clickButton("cuadralino"));
        this.buttonCuadralino.on('pointerover', () => this.changeSpritePulsado("cuadralino", "cuadralino_n"));
        this.buttonCuadralino.on('pointerout', () => this.changeSprite());
        
      //BOTON CUADRADIO
        this.buttonCuadradio = this.add.sprite(580, 430, 'cuadradio').setScale(3).setInteractive();
        this.buttonCuadradio.on('pointerdown', () => this.clickButton("cuadradio"));
        this.buttonCuadradio.on('pointerover', () => this.changeSpritePulsado("cuadradio", "cuadradio_n"));
        this.buttonCuadradio.on('pointerout', () => this.changeSprite());
        
      //BOTON CUADRATARO
        this.buttonCuadrataro = this.add.sprite(700, 430, 'cuadrataro').setScale(3).setInteractive();
        this.buttonCuadrataro.on('pointerdown', () => this.clickButton("cuadrataro"));
        this.buttonCuadrataro.on('pointerover', () => this.changeSpritePulsado("cuadrataro", "cuadrataro_n"));
        this.buttonCuadrataro.on('pointerout', () => this.changeSprite());
        
      //BOTON CUADRABOB
        this.buttonCuadrabob = this.add.sprite(580, 540, 'cuadrabob').setScale(3).setInteractive();
        this.buttonCuadrabob.on('pointerdown', () => this.clickButton("cuadrabob"));
        this.buttonCuadrabob.on('pointerover', () => this.changeSpritePulsado("cuadrabob", "cuadrabob_n"));
        this.buttonCuadrabob.on('pointerout', () => this.changeSprite());
        
      //BOTON CUADRATRICIO
        this.buttonCuadratricio = this.add.sprite(700, 540, 'cuadratricio').setScale(3).setInteractive();
        this.buttonCuadratricio.on('pointerdown', () => this.clickButton("cuadratricio"));
        this.buttonCuadratricio.on('pointerover', () => this.changeSpritePulsado("cuadratricio", "cuadratricio_n"));
        this.buttonCuadratricio.on('pointerout', () => this.changeSprite());
        
        //BOTON CUADRARUTO
        this.buttonCuadraruto = this.add.sprite(820, 320, 'cuadraruto').setScale(3).setInteractive();
        this.buttonCuadraruto.on('pointerdown', () => this.clickButton("cuadraruto"));
        this.buttonCuadraruto.on('pointerover', () => this.changeSpritePulsado("cuadraruto", "cuadraruto_n"));
        this.buttonCuadraruto.on('pointerout', () => this.changeSprite());
    
        //BOTON CUADRASASUKE
        this.buttonCuadrasasuke = this.add.sprite(820, 430, 'cuadrasasuke').setScale(3).setInteractive();
        this.buttonCuadrasasuke.on('pointerdown', () => this.clickButton("cuadrasasuke"));
        this.buttonCuadrasasuke.on('pointerover', () => this.changeSpritePulsado("cuadrasasuke", "cuadrasasuke_n"));
        this.buttonCuadrasasuke .on('pointerout', () => this.changeSprite());

          //BOTON CUADRASANJI
        this.buttonCuadrasanji = this.add.sprite(820, 540, 'cuadrasanji').setScale(3).setInteractive();
        this.buttonCuadrasanji.on('pointerdown', () => this.clickButton("cuadrasanji"));
        this.buttonCuadrasanji.on('pointerover', () => this.changeSpritePulsado("cuadrasanji", "cuadrasanji_n"));
        this.buttonCuadrasanji .on('pointerout', () => this.changeSprite());

        //BOTON CUADRAZORO
        this.buttonCuadrazoro = this.add.sprite(460, 320, 'cuadrazoro').setScale(3).setInteractive();
        this.buttonCuadrazoro.on('pointerdown', () => this.clickButton("cuadrazoro"));
        this.buttonCuadrazoro.on('pointerover', () => this.changeSpritePulsado("cuadrazoro", "cuadrazoro_n"));
        this.buttonCuadrazoro .on('pointerout', () => this.changeSprite());

        //BOTON CUADRALIEN
        this.buttonCuadralien = this.add.sprite(460, 430, 'cuadralien').setScale(3).setInteractive();
        this.buttonCuadralien.on('pointerdown', () => this.clickButton("cuadralien"));
        this.buttonCuadralien.on('pointerover', () => this.changeSpritePulsado("cuadralien", "cuadralien_n"));
        this.buttonCuadralien .on('pointerout', () => this.changeSprite());

        //BOTON CUADRAMOMIA
        this.buttonCuadramomia = this.add.sprite(460, 540, 'cuadramomia').setScale(3).setInteractive();
        this.buttonCuadramomia .on('pointerdown', () => this.clickButton("cuadramomia"));
        this.buttonCuadramomia.on('pointerover', () => this.changeSpritePulsado("cuadramomia", "cuadramomia_n"));
        this.buttonCuadramomia .on('pointerout', () => this.changeSprite());

        //BOTON CUADRAGATO
        this.buttonCuadragato = this.add.sprite(580, 210, 'cuadragato').setScale(3).setInteractive();
        this.buttonCuadragato.on('pointerdown', () => this.clickButton("cuadragato"));
        this.buttonCuadragato.on('pointerover', () => this.changeSpritePulsado("cuadragato", "cuadragato_n"));
        this.buttonCuadragato .on('pointerout', () => this.changeSprite());

         //BOTON CUADRABARRIL
        this.buttonCuadrabarril = this.add.sprite(460, 210, 'cuadrabarril').setScale(3).setInteractive();
        this.buttonCuadrabarril.on('pointerdown', () => this.clickButton("cuadrabarril"));
        this.buttonCuadrabarril.on('pointerover', () => this.changeSpritePulsado("cuadrabarril", "cuadrabarril_n"));
        this.buttonCuadrabarril .on('pointerout', () => this.changeSprite());

        //BOTON CUADRAMAGO
        this.buttonCuadramago = this.add.sprite(700, 210, 'cuadramago').setScale(3).setInteractive();
        this.buttonCuadramago.on('pointerdown', () => this.clickButton("cuadramago"));
        this.buttonCuadramago.on('pointerover', () => this.changeSpritePulsado("cuadramago", "cuadramago_n"));
        this.buttonCuadramago .on('pointerout', () => this.changeSprite());

        //BOTON CUADRACHUCHE
        this.buttonCuadrachuche = this.add.sprite(820, 210, 'cuadrachuche').setScale(3).setInteractive();
        this.buttonCuadrachuche.on('pointerdown', () => this.clickButton("cuadrachuche"));
        this.buttonCuadrachuche.on('pointerover', () => this.changeSpritePulsado("cuadrachuche", "cuadrachuche_n"));
        this.buttonCuadrachuche .on('pointerout', () => this.changeSprite());

        //BOTON OK
        this.buttonOK = this.add.sprite(640, 650, 'ok').setScale(1).setInteractive();
        this.buttonOK.on('pointerdown', () => this.clickButtonOK());
        this.buttonOK.on('pointerover', () => this.changeSpriteOKPulsado());
        this.buttonOK.on('pointerout', () => this.changeSpriteOK());

        //BOTON VOLVER
        this.buttonVolver = this.add.sprite(250, 50, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerout', () => this.changeSpriteVolver());

        this.shadebuttons();
        
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
        }
        
        /*if(id_P != -1 && id_J1 != -1){
        	Comprobar();
        } */
    }

    //funciones skins
    clickButton(skin) {
        if (J1 == "") {
            switch (skin) {
                case "cuadrencio":
                    this.buttonCuadrencio.clearTint();
                    break;
                case "cuadralino":
                    this.buttonCuadralino.clearTint();
                    break;
                case "cuadradio":
                    this.buttonCuadradio.clearTint();
                    break;
                case "cuadrataro":
                    this.buttonCuadrataro.clearTint();
                    break;
                case "cuadrabob":
                    this.buttonCuadrabob.clearTint();
                    break;
                case "cuadratricio":
                    this.buttonCuadratricio.clearTint();
                    break;
                case "cuadrazoro":
                    this.buttonCuadrazoro.clearTint();
                    break;
                case "cuadrasanji":
                    this.buttonCuadrasanji.clearTint();
                    break;
                case "cuadraruto":
                    this.buttonCuadraruto.clearTint();
                    break;
                case "cuadrasasuke":
                    this.buttonCuadrasasuke.clearTint();
                    break;
                case "cuadramomia":
                    this.buttonCuadramomia.clearTint();
                    break;
                case "cuadragato":
                    this.buttonCuadragato.clearTint();
                    break;
                case "cuadrabarril":
                    this.buttonCuadrabarril.clearTint();
                    break;
                case "cuadramago":
                    this.buttonCuadramago.clearTint();
                    break;
                case "cuadralien":
                    this.buttonCuadralien.clearTint();
                    break;
                case "cuadrachuche":
                    this.buttonCuadrachuche.clearTint();
                    break;
            }
            J1 = skin;
            this.portrait1.destroy();


            jugadores[0].sprite = this.physics.add.sprite(200, 340, J1);

            jugadores[0].sprite.setBounce(0.15);
            jugadores[0].sprite.setCollideWorldBounds(true);

            this.physics.add.collider(jugadores[0].sprite, platforms);

            suelo1.setVisible(true);
            techo1.setVisible(true);
            paredI1.setVisible(true);
            paredD1.setVisible(true);
        } else {
            this.shadebuttons();
            if (J1 == skin) {
                J1 = "";

                this.portrait1 = this.add.sprite(200, 360, skin).setScale(10);  

                jugadores[0].sprite.setVisible(false);

                suelo1.setVisible(false);
                techo1.setVisible(false);
                paredI1.setVisible(false);
                paredD1.setVisible(false);
            } else {
                switch (skin) {
                    case "cuadrencio":
                        this.buttonCuadrencio.clearTint();
                        break;
                    case "cuadralino":
                        this.buttonCuadralino.clearTint();
                        break;
                    case "cuadradio":
                        this.buttonCuadradio.clearTint();
                        break;
                    case "cuadrataro":
                        this.buttonCuadrataro.clearTint();
                        break;
                    case "cuadrabob":
                        this.buttonCuadrabob.clearTint();
                        break;
                    case "cuadratricio":
                        this.buttonCuadratricio.clearTint();
                        break;
                    case "cuadrazoro":
                        this.buttonCuadrazoro.clearTint();
                        break;
                    case "cuadrasanji":
                        this.buttonCuadrasanji.clearTint();
                        break;
                    case "cuadraruto":
                        this.buttonCuadraruto.clearTint();
                        break;
                    case "cuadrasasuke":
                        this.buttonCuadrasasuke.clearTint();
                        break;
                    case "cuadramomia":
                        this.buttonCuadramomia.clearTint();
                        break;
                    case "cuadragato":
                        this.buttonCuadragato.clearTint();
                        break;
                    case "cuadrabarril":
                        this.buttonCuadrabarril.clearTint();
                        break;
                    case "cuadramago":
                        this.buttonCuadramago.clearTint();
                        break;
                    case "cuadralien":
                        this.buttonCuadralien.clearTint();
                        break;
                    case "cuadrachuche":
                        this.buttonCuadrachuche.clearTint();
                        break;
                }
                J1 = skin;

                this.banner1.destroy();
                if (skin == "cuadragato") {
                    this.banner1 = this.add.sprite(200, 575, skin + "_n").setScale(0.85);
                } else {
                    this.banner1 = this.add.sprite(200, 575, skin + "_n").setScale(1);
                }

                jugadores[0].sprite.setVisible(false);

                jugadores[0].sprite = this.physics.add.sprite(200, 340, J1);

                jugadores[0].sprite.setBounce(0.15);
                jugadores[0].sprite.setCollideWorldBounds(true);

                this.physics.add.collider(jugadores[0].sprite, platforms);
            }
        }
    }
    
    changeSpritePulsado(skin, banner) {
        if (J1 == "") {
            this.banner1.destroy();
            this.portrait1.destroy();

            if (skin == "cuadragato") {
                this.banner1 = this.add.sprite(200, 575, banner).setScale(0.85);
            } else {
                this.banner1 = this.add.sprite(200, 575, banner).setScale(1);
            }
			this.portrait1 = this.add.sprite(200, 360, skin).setScale(10);     
		}
	}
    
    changeSprite() {
        if (J1 == "") {
            this.banner1.destroy();
            this.portrait1.destroy();
    	}
    }
  
  //FUNCIONES OK    
    clickButtonOK() {
		if(J1 != ""){
			muerteSonido.play();
			//jugador();
			Nuevo_Jugador();        
            this.scene.start("SalaEspera");
		}
    }

    
    changeSpriteOKPulsado() {
		this.buttonOK.destroy();
		this.buttonOK = this.add.sprite(640, 650, 'ok_pul').setScale(1).setInteractive();
		this.buttonOK.on('pointerdown', () => this.clickButtonOK());
		this.buttonOK.on('pointerdown', () => this.changeSpriteOKPulsado());
		this.buttonOK.on('pointerout', () => this.changeSpriteOK());
    }
    
    changeSpriteOK() {
    	this.buttonOK.destroy();
        this.buttonOK = this.add.sprite(640, 650, 'ok').setScale(1).setInteractive();
        this.buttonOK.on('pointerdown', () => this.clickButtonOK());
        this.buttonOK.on('pointerover', () => this.changeSpriteOKPulsado());
        this.buttonOK.on('pointerup', () => this.changeSpriteOK()); 
    }

    //FUNCIONES VOLVER
    clickButtonVolver() {
        J1 = "";
        muerteSonido.play();
        this.scene.start("Mainmenu");
    }

    changeSpriteVolverPulsado() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(250, 50, 'volver_pulsado').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerdown', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerout', () => this.changeSpriteVolver());
    }

    changeSpriteVolver() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(250, 50, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());
    }
}

// JavaScript source code
class creditos extends Phaser.Scene {

    constructor() {
        super("creditos");
    }

    create() {
        muerteSonido = this.sound.add('muerteSonido');
        muerteSonido.volume = 0.4;


        this.add.image(640, 360, 'fondo3');


        this.buttonVolver = this.add.sprite(200, 100, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());
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

    clickButtonVolver() {
        muerteSonido.play();
        this.scene.start("Mainmenu");

    }

    changeSpriteVolverPulsado() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(200, 100, 'volver_pulsado').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.changeSpriteVolver());
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerout', () => this.changeSpriteVolver());

    }
    changeSpriteVolver() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(200, 100, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());

    }

}


class ComoJugar extends Phaser.Scene {

    constructor() {
        super("ComoJugar");
    }
    create() {
        salto = this.sound.add('salto');
        muerteSonido = this.sound.add('muerteSonido');
        salto.volume = 0.2;
        muerteSonido.volume = 0.4;
        this.add.image(640, 360, 'fondo2');

        this.buttonVolver = this.add.sprite(250, 50, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());
        

        platforms = this.physics.add.staticGroup();

        platforms.create(322, 369, 'ground').setScale(0.7);
        platforms.create(322, 111, 'ground').setScale(0.7);
        platforms.create(180, 240, 'wall').setScale(0.7);
        platforms.create(455, 240, 'wall').setScale(0.7); 

        platforms.create(958, 369, 'ground').setScale(0.7);
        platforms.create(958, 111, 'ground').setScale(0.7);
        platforms.create(825, 240, 'wall').setScale(0.7);
        platforms.create(1105, 240, 'wall').setScale(0.7); 

        jugadores[0].sprite = this.physics.add.sprite(315, 340, "cuadrencio");

        jugadores[1].sprite = this.physics.add.sprite(965, 340, "cuadralino");

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




        var FKey = this.input.keyboard.addKey('F');
        
        this.reglas = this.add.sprite(640, 625, 'reglas');
        this.Jug1 = this.add.sprite(280, 475, 'J1_c');
        this.Jug2  = this.add.sprite(1000, 475, 'J2_c');
        this.Pause  = this.add.sprite(1000, 50, 'pausaC');

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
        muerteSonido.play();
        this.scene.start("Mainmenu");
    }

    changeSpriteVolverPulsado() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(250, 50, 'volver_pulsado').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.changeSpriteVolver());
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

var encontrada = false;
class SalaEspera extends Phaser.Scene {

    constructor() {
        super("SalaEspera");
    }
    preload() {
        this.load.image('buscando', 'assets/BuscandoJugadores.png');
    }
    create() {
        encontrada = false; 

        salto = this.sound.add('salto');
        muerteSonido = this.sound.add('muerteSonido');
        salto.volume = 0.2;
        muerteSonido.volume = 0.4;
        this.add.image(640, 360, 'fondo2');

        this.buscando = this.add.image(900, 250, 'buscando');

        this.buttonVolver = this.add.sprite(250, 50, 'volver').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.clickButtonVolver());
        this.buttonVolver.on('pointerover', () => this.changeSpriteVolverPulsado());
        this.buttonVolver.on('pointerup', () => this.changeSpriteVolver());


        platforms = this.physics.add.staticGroup();

        platforms.create(322, 369, 'ground').setScale(0.7);
        platforms.create(322, 111, 'ground').setScale(0.7);
        platforms.create(180, 240, 'wall').setScale(0.7);
        platforms.create(455, 240, 'wall').setScale(0.7);

        jugadores[0].sprite = this.physics.add.sprite(315, 340, J1);

        cursors[0] = this.input.keyboard.addKeys(
            {
                up: Phaser.Input.Keyboard.KeyCodes.W,
                down: Phaser.Input.Keyboard.KeyCodes.S,
                left: Phaser.Input.Keyboard.KeyCodes.A,
                right: Phaser.Input.Keyboard.KeyCodes.D
            });

        jugadores[0].sprite.setBounce(0.15);
        jugadores[0].sprite.setCollideWorldBounds(true);

        this.physics.add.collider(jugadores[0].sprite, platforms);

        var FKey = this.input.keyboard.addKey('F');

        this.reglas = this.add.sprite(640, 625, 'reglas');
        this.Jug1 = this.add.sprite(280, 475, 'J1_c');

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
        if (id_P != -1 && id_J1 != -1) {
            Comprobar();
        }
        if (partida && !encontrada) {
            encontrada = true;
            this.buscando.setVisible(false);
            this.scene.launch("ContadorSalaEspera");
        }
    }
    
    clickButtonVolver() {
        muerteSonido.play();
        J1 = "";
        //hay que hacer algo de cancelar la busqueda de partida o algo asi
        cerracion();
        this.scene.start("login");
    }

    changeSpriteVolverPulsado() {
        this.buttonVolver.destroy();
        this.buttonVolver = this.add.sprite(250, 50, 'volver_pulsado').setScale(0.5).setInteractive();
        this.buttonVolver.on('pointerdown', () => this.changeSpriteVolver());
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

class ContadorSalaEspera extends Phaser.Scene {
    constructor() {
        super("ContadorSalaEspera");
    }

    preload() {
        this.load.image('pausa', 'assets/Fondo_pausa.png');
        this.load.image('3', 'assets/3.png');
        this.load.image('2', 'assets/2.png');
        this.load.image('1', 'assets/1.png');
    }

    create() {
        this.add.image(640, 360, 'pausa').setScale(1);
        counter = 3;
        alphaC = 1;

        contador = this.add.image(650, 450, '3').setScale(1);
        contador.setAlpha(alphaC);

        timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, repeat: 2 });

        function onEvent() {
            counter--; // One second 
            if (counter == 0) {
                alphaC = 0;
            } else {
                alphaC = 1;
            }

        }
    }

    update() {
        contador.setAlpha(alphaC);

        switch (counter) {
            case (2):
                contador.destroy();
                contador = this.add.image(650, 450, '2').setScale(1);
                contador.setAlpha(alphaC);
                break;
            case (1):
                contador.destroy();
                contador = this.add.image(650, 450, '1').setScale(1);
                contador.setAlpha(alphaC);
                break;
            case (0):
                var that = this;
                play(that);
                break;
        }

        function play(that) {
            that.scene.stop("SalaEspera");
            that.scene.stop("ContadorSalaEspera");
            that.scene.start("Escena0");
            
        };
    }
}