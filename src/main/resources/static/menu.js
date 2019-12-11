// JavaScript source code

let muerteSonido;
let salto;

var J1 = "cuadrencio";
var J2 = "cuadralino";

var info;
var info2;
var texto;
var texto2;



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
        this.load.image('J1_c', 'assets/Jugador_1.png')
        this.load.image('J2_c', 'assets/Jugador_2.png')
        this.load.image('pausaC', 'assets/Pausa_con.png')
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
        this.load.image('ground', 'assets/platformN.png');
        this.load.image('wall', 'assets/paredN.png');
        this.load.image('reglas', 'assets/Reglas.png');
        
        this.load.audio('salto', 'assets/salto_1.mp3');
        this.load.audio('muerteSonido', 'assets/muerte.mp3');
        
        prueba(); //MANDA AL SERVIDOR LA ID DE UN USUARIO ACTIVO NUEVO
   
    }

    create() {
        muerteSonido = this.sound.add('muerteSonido');
        muerteSonido.volume = 0.4;
        this.add.image(640, 360, 'fondo');
        


        this.add.image(300, 150, 'logo').setScale(0.7);

        this.buttonJugar = this.add.sprite(300, 350, 'jugar').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerover', () => this.changeSpriteJugarPulsado());
        this.buttonJugar.on('pointerup', () => this.changeSpriteJugar());

        this.buttonComoJugar = this.add.sprite(300, 450, 'como_jugar').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerover', () => this.changeSpriteComoJugarPulsado());
        this.buttonComoJugar.on('pointerup', () => this.changeSpriteComoJugar());

        this.buttonCreditos = this.add.sprite(300, 550, 'creditos').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerover', () => this.changeSpriteCreditosPulsado());
        this.buttonCreditos.on('pointerup', () => this.changeSpriteCreditos());

        var info = ["Usuarios Conectados: " + NusuariosAct];
        var info2 = ["Usuarios Jugando: " + NusuariosJug];
        texto = this.add.text(1000, 50, info, { font: '20px Courier', fill: '#ffffff' });
        texto2 = this.add.text(1000, 100, info2, { font: '20px Courier', fill: '#ffffff' });
        
        J1 = "cuadrencio";
        J2 = "cuadralino";
        
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
        muerteSonido.play();
        this.scene.switch("login");
    }
    clickButtonCreditos() {
        muerteSonido.play();
        this.scene.switch("creditos");
    }
    clickButtonComoJugar() {
        muerteSonido.play();
        this.scene.start("ComoJugar");
    }

    changeSpriteJugarPulsado() {
        this.buttonJugar.destroy();
        this.buttonJugar = this.add.sprite(300, 350, 'jugar_pulsado').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.changeSpriteJugar());
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerout', () => this.changeSpriteJugar());

    }
    changeSpriteJugar() {
        this.buttonJugar.destroy();
        this.buttonJugar = this.add.sprite(300, 350, 'jugar').setScale(0.5).setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButtonJugar());
        this.buttonJugar.on('pointerover', () => this.changeSpriteJugarPulsado());
        this.buttonJugar.on('pointerup', () => this.changeSpriteJugar());

    }
    changeSpriteCreditosPulsado() {
        this.buttonCreditos.destroy();
        this.buttonCreditos = this.add.sprite(300, 550, 'creditos_pulsado').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.changeSpriteCreditos());
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerout', () => this.changeSpriteCreditos());

    }
    changeSpriteCreditos() {
        this.buttonCreditos.destroy();
        this.buttonCreditos = this.add.sprite(300, 550, 'creditos').setScale(0.5).setInteractive();
        this.buttonCreditos.on('pointerdown', () => this.clickButtonCreditos());
        this.buttonCreditos.on('pointerover', () => this.changeSpriteCreditosPulsado());
        this.buttonCreditos.on('pointerup', () => this.changeSpriteJugar());

    }

    changeSpriteComoJugarPulsado() {
        this.buttonComoJugar.destroy();
        this.buttonComoJugar = this.add.sprite(300, 450, 'como_jugar_pulsado').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.changeSpriteComoJugar());
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerout', () => this.changeSpriteComoJugar());

    }
    changeSpriteComoJugar() {
        this.buttonComoJugar.destroy();
        this.buttonComoJugar = this.add.sprite(300, 450, 'como_jugar').setScale(0.5).setInteractive();
        this.buttonComoJugar.on('pointerdown', () => this.clickButtonComoJugar());
        this.buttonComoJugar.on('pointerover', () => this.changeSpriteComoJugarPulsado());
        this.buttonComoJugar.on('pointerup', () => this.changeSpriteJugar());

    }
    
    update(){
    	usuarios();
    	 info = ["Usuarios Conectados: " + NusuariosAct];
         info2 = ["Usuarios Jugando: " + NusuariosJug];
         
        // console.log(NusuariosAct);
         //console.log(NusuariosJug);
         
         texto.setText(info);
         texto2.setText(info2);
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
    	
    }
	
	destroybuttons(){
		this.cuadrataro_n.destroy();
		this.cuadradio_n.destroy();
		this.cuadrencio_n.destroy();
		this.cuadralino_n.destroy();
		this.cuadrabob_n.destroy();
		this.cuadratricio_n.destroy();
    	
    }
	

    create() {
        this.add.image(640, 360, 'fondo_login');     

        
        //BOTON CUADRENCIO
        this.buttonCuadrencio = this.add.sprite(560, 320, 'cuadrencio').setScale(3).setInteractive();
        this.buttonCuadrencio.on('pointerdown', () => this.clickButtonCuadrencio());
        this.buttonCuadrencio.on('pointerover', () => this.changeSpriteCuadrencioPulsado());
        this.buttonCuadrencio.on('pointerout', () => this.changeSpriteCuadrencio());
        
        this.cuadrencio_n = this.add.sprite(620, 200, 'cuadrencio_n').setScale(1);
        
        this.cuadrencio_n.setVisible(false);
        
        
      //BOTON CUADRALINO
        this.buttonCuadralino = this.add.sprite(680, 320, 'cuadralino').setScale(3).setInteractive();
        this.buttonCuadralino.on('pointerdown', () => this.clickButtonCuadralino());
        this.buttonCuadralino.on('pointerover', () => this.changeSpriteCuadralinoPulsado());
        this.buttonCuadralino.on('pointerout', () => this.changeSpriteCuadralino());
        
        this.cuadralino_n = this.add.sprite(620, 200, 'cuadralino_n').setScale(1);
        
        this.cuadralino_n.setVisible(false);
        
        
      //BOTON CUADRADIO
        this.buttonCuadradio = this.add.sprite(560, 430, 'cuadradio').setScale(3).setInteractive();
        this.buttonCuadradio.on('pointerdown', () => this.clickButtonCuadradio());
        this.buttonCuadradio.on('pointerover', () => this.changeSpriteCuadradioPulsado());
        this.buttonCuadradio.on('pointerout', () => this.changeSpriteCuadradio());
        
        this.cuadradio_n = this.add.sprite(620, 200, 'cuadradio_n').setScale(1);
        
        this.cuadradio_n.setVisible(false);
        
        
      //BOTON CUADRATARO
        this.buttonCuadrataro = this.add.sprite(680, 430, 'cuadrataro').setScale(3).setInteractive();
        this.buttonCuadrataro.on('pointerdown', () => this.clickButtonCuadrataro());
        this.buttonCuadrataro.on('pointerover', () => this.changeSpriteCuadrataroPulsado());
        this.buttonCuadrataro.on('pointerout', () => this.changeSpriteCuadrataro());
        
        this.cuadrataro_n = this.add.sprite(620, 200, 'cuadrataro_n').setScale(1);
        
        this.cuadrataro_n.setVisible(false);
        
        
      //BOTON CUADRABOB
        this.buttonCuadrabob = this.add.sprite(560, 530, 'cuadrabob').setScale(3).setInteractive();
        this.buttonCuadrabob.on('pointerdown', () => this.clickButtonCuadrabob());
        this.buttonCuadrabob.on('pointerover', () => this.changeSpriteCuadrabobPulsado());
        this.buttonCuadrabob.on('pointerout', () => this.changeSpriteCuadrabob());
        
        this.cuadrabob_n = this.add.sprite(620, 200, 'cuadrabob_n').setScale(1);
        
        this.cuadrabob_n.setVisible(false);
        
        
      //BOTON CUADRATRICIO
        this.buttonCuadratricio = this.add.sprite(680, 530, 'cuadratricio').setScale(3).setInteractive();
        this.buttonCuadratricio.on('pointerdown', () => this.clickButtonCuadratricio());
        this.buttonCuadratricio.on('pointerover', () => this.changeSpriteCuadratricioPulsado());
        this.buttonCuadratricio.on('pointerout', () => this.changeSpriteCuadratricio());
        
        this.cuadratricio_n = this.add.sprite(620, 200, 'cuadratricio_n').setScale(1);
        
        this.cuadratricio_n.setVisible(false);
        
        
      //BOTON OK
        this.buttonOK = this.add.sprite(1050, 600, 'ok').setScale(1).setInteractive();
        this.buttonOK.on('pointerdown', () => this.clickButtonOK());
        this.buttonOK.on('pointerover', () => this.changeSpriteOKPulsado());
        this.buttonOK.on('pointerout', () => this.changeSpriteOK());
        
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
    
    
    
    
    //funciones cuadrencio
    clickButtonCuadrencio() {
        muerteSonido.play();
        J1 = "cuadrencio";
        J2 = "cuadralino";  
        this.shadebuttons();
        this.buttonCuadrencio.clearTint();
        
    }
    
    changeSpriteCuadrencioPulsado() {
    	this.destroybuttons();
		this.cuadrencio_n = this.add.sprite(620, 200, 'cuadrencio_n').setScale(1);
    }
    
    changeSpriteCuadrencio() {
    	if(J1 != "cuadrencio"){
    		this.destroybuttons();
    	}
		
    }
    
    //FUNCIONES CUADRALINO
    clickButtonCuadralino() {
        J1 = "cuadralino";
        J2 = "cuadrencio";
        this.shadebuttons();
        this.buttonCuadralino.clearTint();
    }
    
    changeSpriteCuadralinoPulsado() {
    	this.destroybuttons();
		this.cuadralino_n = this.add.sprite(620, 200, 'cuadralino_n').setScale(1);
    }
    
    changeSpriteCuadralino() {
    	if(J1 != "cuadralino"){
    		this.destroybuttons();
    	}
    }
    
    //FUNCIONES CUADRADIO      
    clickButtonCuadradio() {
        J1 = "cuadradio";
        J2 = "cuadrataro";
        this.shadebuttons();
        this.buttonCuadradio.clearTint();
    }
    
    changeSpriteCuadradioPulsado() {;
    this.destroybuttons();
	this.cuadradio_n = this.add.sprite(620, 200, 'cuadradio_n').setScale(1);
    }
    
    changeSpriteCuadradio() {
    	if(J1 != "cuadradio"){
    		this.destroybuttons();
    	}
    }
    
  //FUNCIONES CUADRATARO     
    clickButtonCuadrataro() {
        J1 = "cuadrataro";
        J2 = "cuadradio";
        this.shadebuttons();
        this.buttonCuadrataro.clearTint();
    }
    
    changeSpriteCuadrataroPulsado() {;
    	this.destroybuttons();
		this.cuadrataro_n = this.add.sprite(620, 200, 'cuadrataro_n').setScale(1);
    }
    
    changeSpriteCuadrataro() {
    	if(J1 != "cuadrataro"){
    		this.destroybuttons();
    	}
    	
    }
    
  //FUNCIONES CUADRABOB    
    clickButtonCuadrabob() {
        J1 = "cuadrabob";
        J2 = "cuadratricio";
        this.shadebuttons();
        this.buttonCuadrabob.clearTint();

    }
    
    changeSpriteCuadrabobPulsado() {
    	this.destroybuttons();
		this.cuadrabob_n = this.add.sprite(620, 200, 'cuadrabob_n').setScale(1);
    }
    
    changeSpriteCuadrabob() {
    	if(J1 != "cuadrabob"){
    		this.destroybuttons();
    	}
    }
    
  //FUNCIONES CUADRATRICIO    
    clickButtonCuadratricio() {
        J1 = "cuadratricio";
        J2 = "cuadrabob";
        this.shadebuttons();
        this.buttonCuadratricio.clearTint();
    }
    
    changeSpriteCuadratricioPulsado() {
    	this.destroybuttons();
		this.cuadratricio_n = this.add.sprite(620, 200, 'cuadratricio_n').setScale(1);
    }
    
    changeSpriteCuadratricio() {
    	if(J1 != "cuadratricio"){
    		this.destroybuttons();
    	}
    }
    
  //FUNCIONES OK    
    clickButtonOK() {
        muerteSonido.play();
        jugador();
        this.scene.switch("Escena0");
    }
    
    changeSpriteOKPulsado() {
		this.buttonOK.destroy();
		this.buttonOK = this.add.sprite(1050, 600, 'ok_pul').setScale(1).setInteractive();
		this.buttonOK.on('pointerdown', () => this.clickButtonOK());
		this.buttonOK.on('pointerdown', () => this.changeSpriteOKPulsado());
		this.buttonOK.on('pointerout', () => this.changeSpriteOK());
    }
    
    changeSpriteOK() {
    	this.buttonOK.destroy();
        this.buttonOK = this.add.sprite(1050, 600, 'ok').setScale(1).setInteractive();
        this.buttonOK.on('pointerdown', () => this.clickButtonOK());
        this.buttonOK.on('pointerover', () => this.changeSpriteOKPulsado());
        this.buttonOK.on('pointerup', () => this.changeSpriteOK()); 
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
        this.scene.switch("Mainmenu");

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

var numJugadores = 2;
var jugadores = new Array(numJugadores);
var platforms;
var cursors = new Array(numJugadores);

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

        jugadores[0].sprite = this.physics.add.sprite(315, 340, J1);

        jugadores[1].sprite = this.physics.add.sprite(965, 340, J2);

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