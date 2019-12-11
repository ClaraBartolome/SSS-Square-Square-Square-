// JavaScript source code
var config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        parent: 'phaser-example',
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1500 },
            debug: false
        }
    },
    scene: [Mainmenu, login, creditos, ComoJugar, Escena0, resultados, menuPausa, sigRonda]
};

var game = new Phaser.Game(config);

//prueba();