// JavaScript source code
class menu extends Phaser.Scene {
    preload(){
        this.load.image('fondo', 'assets/fondo titulo.jpeg');
        this.load.image('jugar', 'assets/jugar.jpeg');
        this.load.image('creditos', 'assets/creditos.jpeg');
    }

    

    create() {
        this.add.image(400, 300, 'fondo');

        var that = this;
        this.buttonJugar = this.add.sprite(270, 100, 'jugar').setInteractive();
        this.buttonJugar.on('pointerdown', llamarEscena(that));
    }
    
    
    
}

function llamarEscena(that) {
    that.scene.start('Escena');
}