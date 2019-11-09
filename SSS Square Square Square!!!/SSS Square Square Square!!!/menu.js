// JavaScript source code
class menu extends Phaser.Scene {

    constructor() {
        super("Mainmenu");
    }

    preload() {
        this.load.image('fondo', 'assets/fondo_juego.jpg');
        this.load.image('jugar', 'assets/jugar.png');
        this.load.image('jugar_pulsado', 'assets/jugar_pulsado.png');
        this.load.image('creditos', 'assets/creditos.png');
        this.load.image('creditos_pulsado', 'assets/creditos_pulsados.png');
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