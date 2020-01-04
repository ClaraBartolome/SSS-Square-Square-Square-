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
    scene: [Mainmenu, local, login, creditos, ComoJugar, SalaEspera, ContadorSalaEspera, Escena0, resultados, menuPausa, sigRonda, JuegoLocal, resultadosLocal, menuPausaLocal, sigRondaLocal],
    antialias: false
};

var game = new Phaser.Game(config);

//prueba();