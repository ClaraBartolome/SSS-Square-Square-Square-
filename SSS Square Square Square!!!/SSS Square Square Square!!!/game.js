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
    scene: [Mainmenu, creditos, ComoJugar, Escena0, Escena1, Escena2, Escena3, resultados]
};

var game = new Phaser.Game(config);