// JavaScript source code
class menu extends Phaser.Scene {

    constructor() {
        super("Mainmenu");
    }

    preload() {
        this.load.image('fondo', 'assets/fondo_juego.jpg');
        this.load.image('jugar', 'assets/jugar.jpeg');
        this.load.image('creditos', 'assets/creditos.jpeg');
    }

    create() {
        this.add.image(640, 360, 'fondo');

        this.buttonJugar = this.add.sprite(640, 360, 'jugar').setInteractive();
        this.buttonJugar.on('pointerdown', () => this.clickButton());
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

    clickButton() {
        this.scene.switch("Escena0");
    }

}