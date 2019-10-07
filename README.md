# <div align="center"> SSS: Square Square Square!!! </div>
## <div align="center"> Vivimos en una sociedad de cuadrados </div>
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/logo.jpg)

## Game Design Document
#### Introducción:
Este es el documento de ‘SSS: Square Square Square!!!’, un videojuego en red de plataformas 2D competitivo, pudiendo ser comparado con un juego del género ‘Battle Royale’. La meta de este escrito es el de mostrar los elementos principales de los que dispone el proyecto, así como ofrecer futuras mejoras que se irán actualizando.
En los siguientes puntos, trataremos los apartados de ‘declaración del concepto’, ‘público objetivo’, ‘puntos únicos de venta’, ‘plataformas, tecnología y alcance’, ‘mecánicas y flujo del juego’ y ‘arte’.
#### Declaración del concepto:
‘SSS: Square Square Square!!!’ es un videojuego donde cada jugador toma el papel de un cuadrado, y tiene por objetivo saltar sobre otros cuadrados (otros jugadores), al mismo tiempo que esquiva triángulos y usa círculos para impulsarse por el escenario.
El único objetivo existente es saltar sobre tus enemigos o engañarlos para destruirlos usando el entorno a tu favor. De esta forma, el jugador puede imponerse a sí mismo unos ‘subobjetivos’, como conseguir conducir a un enemigo al extremo de una plataforma para dejarle sin espacio para huir o saltar. No será necesario un tutorial, puesto no es un gameplay muy complejo, aunque se le proporcionará un apartado con instrucciones.  
El juego se sustenta en las siguientes características:
  - Diseño sencillo, basado en formas geométricas simples que permiten ofrecer al jugador una experiencia directa de su objetivo principal. 
  - Dinamismo, pues la sensación de tensión y la necesidad de victoria son transmitidas al jugador desde el primer momento.
  - Capacidad de albergar a varios jugadores (multijugador), dada la naturaleza competitiva.
#### Público objetivo:
‘SSS: Square Square Square!!!’ está dirigido a cualquier público (aunque enfocado a jóvenes debido a su estética cartoon y minimalista), optando por transmitir experiencias divertidas por medio de la simbología de formas y colores.  
#### Plataforma(s), Tecnología, y Alcance:
Es un juego pensado para pc, queremos centrarnos en la experiencia multijugador típica de los juegos de ordenador de los 90, como Quake 3 Arena o Unreal Tournament, cada uno en su propia máquina jugando por LAN con una máquina servidor, para conseguir la mayor fluidez posible, pero también, aprovechando la simpleza de los controles, y la cantidad de botones del teclado, existe la posibilidad de juego local en un solo cliente. Se usarán solo elementos 2D, por lo que tendrá un peso lo suficientemente bajo para que se pueda jugar en la mayoría de ordenadores. Lo haremos con Javascript, ya que el juego es muy sencillo y no son necesarios grandes requisitos de PC. Así cualquiera puede unirse al juego, sin importar sus especificaciones. Haremos uso de las librerías de físicas de Phaser 3, con ello conseguiremos animaciones suaves y movimientos realistas para el confort del jugador, sin tener que dedicar mucho tiempo de desarrollo.
#### Mecánicas y flujo del juego:
Como mencionamos anteriormente, en ‘SSS: Square Square Square!!!’ el jugador es un cuadrado que debe derrotar a otros cuadrados. El usuario sentirá tensión ya que debe de planear cómo derrotar a sus enemigos al mismo tiempo que huye o esquiva a los mismos. De esta forma el participante debe pasar toda la partida en constante movimiento, finalizando esta una vez que quede solo un cuadrado. Al ser una partida relativamente corta, el usuario sentirá el deseo de seguir jugando.
El juego se desarrollará por rondas, y en cuanto termine una con un ganador, se le otorgará un punto e inmediatamente se pasará al siguiente nivel. Cuando un jugador llegue al número de victorias necesarias, el juego terminará, entonces el jugador podrá ver su puntuación final. Se mostrará un mensaje de victoria o derrota, dando la opción de volver a jugar o salir.
El juego incluirá las siguientes mecánicas:
  - Movimiento: El jugador tendrá a su disposición la posibilidad de moverse a la izquierda y la derecha. Puede agacharse con el fin de disminuir su hitbox, o bajar a una plataforma inferior si pulsa el botón de salto. Con el salto, el usuario puede situarse sobre plataformas, esquivar trampas y aplastar a los otros cuadrados.
  - Rebotes: El usuario podrá impulsarse al colisionar con círculos (objetos sólidos que estarán repartidos a lo largo del nivel), saliendo el jugador impulsado en el lado contrario en donde esté el círculo situado.
  - Pinchos: Dentro de cada nivel existen unos objetos que actúan como trampa y hacen daño a los cuadrados. Se trata de los triángulos, cuya función consiste en eliminar a cualquier cuadrado que colisione con ellos. Son estáticos, por lo que la única forma de que un cuadrado choque con ellos es por accidente. 

Al iniciar una partida, el mapa en el que se juega se elegirá aleatoriamente. Si el jugador gana, se pasará al siguiente nivel, cuyo mapa será diferente  y, por tanto, los objetos distribuidos a lo largo del mismo también lo serán. Al generarse sin ninguna pauta, el nivel de dificultad de los escenarios no será ascendente. Sin embargo, el jugador no sentirá estar jugando a lo mismo siempre, ya que no jugará siempre en un escenario con el mismo diseño.
#### Arte:
‘SSS: Square Square Square!!!’ precisa, como se mencionó anteriormente, de un estilo artístico muy sencillo, optando por incluir formas de colores planos y geometría simple. Es necesario conocer y visualizar bien los obstáculos y jugadores, por eso se optó por figuras básicas. Sin embargo, se les ha dotado de un estilo cartoon para dar una estética más amigable y familiar. De esta forma no se recarga la pantalla con elementos innecesarios y el jugador puede asignar las distintas formas a los distintos elementos de la pantalla de una forma más sencilla y casi inconsciente.
Por otro lado, los niveles del juego estarán en contraposición con los colores llamativos de los personajes, optando por fondos en tonalidades de escalas de grises para que se diferencie muy bien la utilidad de cada cosa.


![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/triangulo.png)

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/circulo.png)

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/cuadrado.png)

#### Skins

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Squaremma.png)

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Cuadralewis.png)

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/squaredio.png)

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/cuadrathorton.png)

Miembros:
  - Clara Bartolomé Pereira: c.bartolome.2017@alumnos.urjc.es Github: ClaraMegalovania
  - Fernando Doménech Martínez: f.domenech.2017@alumnos.urjc.es Github: Ferdom-M
  - Javier Morales López: j.morales.2017@alumnos.urjc.es Github: JavierMegalovania
  - Elena Rosal del Rey: e.rosal.2017@alumnos.urjc.es Github: ElenaRoRey
  
Trello: https://trello.com/b/cj1rszAa/sss-square-square-square
