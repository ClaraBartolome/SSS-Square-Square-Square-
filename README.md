# <div align="center"> SSS: Square Square Square!!! </div>
## <div align="center"> Vivimos en una sociedad de cuadrados </div>
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/logo.jpg)

## Game Design Document
#### Introducción:
Este es el documento de ‘SSS: Square Square Square!!!’, un videojuego en red de plataformas 2D competitivo, pudiendo ser comparado con un juego del género ‘Battle Royale’. La meta de este escrito es el de mostrar los elementos principales de los que dispone el proyecto, así como ofrecer futuras mejoras que se irán actualizando.
En los siguientes puntos, trataremos los apartados de ‘declaración del concepto’, ‘público objetivo’, ‘puntos únicos de venta’, ‘plataformas, tecnología y alcance’, ‘mecánicas y flujo del juego’ y ‘arte’.
#### Declaración del concepto:
‘SSS: Square Square Square!!!’ es un videojuego donde cada jugador toma el papel de un cuadrado, y tiene por objetivo saltar sobre el otro cuadrado (el otro jugador), al mismo tiempo que esquiva triángulos y usa círculos para impulsarse por el escenario.
El único objetivo existente es saltar sobre tu enemigo o engañarlo para destruirlo usando el entorno a tu favor. De esta forma, el jugador puede imponerse a sí mismo unos ‘subobjetivos’, como conseguir conducir al enemigo al extremo de una plataforma para dejarle sin espacio para huir o saltar. No será necesario un tutorial, puesto no es un gameplay muy complejo, aunque se le proporcionará un apartado con instrucciones.  
El juego se sustenta en las siguientes características:
  - Diseño sencillo, basado en formas geométricas simples que permiten ofrecer al jugador una experiencia directa de su objetivo principal. 
  - Dinamismo, pues la sensación de tensión y la necesidad de victoria son transmitidas al jugador desde el primer momento.
  - Capacidad de albergar a varios jugadores (multijugador), dada la naturaleza competitiva.
#### Público objetivo:
‘SSS: Square Square Square!!!’ está dirigido a cualquier público (aunque enfocado a jóvenes debido a su estética cartoon y minimalista), optando por transmitir experiencias divertidas por medio de la simbología de formas y colores.  
#### Plataforma(s), Tecnología, y Alcance:
Es un juego pensado para pc, queremos centrarnos en la experiencia multijugador típica de los juegos de ordenador de los 90, como Quake 3 Arena o Unreal Tournament, cada uno en su propia máquina jugando por LAN con una máquina servidor, para conseguir la mayor fluidez posible, pero también, aprovechando la simpleza de los controles, y la cantidad de botones del teclado, existe la posibilidad de juego local en un solo cliente. Se usarán solo elementos 2D, por lo que tendrá un peso lo suficientemente bajo para que se pueda jugar en la mayoría de ordenadores. Lo haremos con Javascript, ya que el juego es muy sencillo y no son necesarios grandes requisitos de PC. Así cualquiera puede unirse al juego, sin importar sus especificaciones. Haremos uso de las librerías de físicas de Phaser 3, con ello conseguiremos animaciones suaves y movimientos realistas para el confort del jugador, sin tener que dedicar mucho tiempo de desarrollo.
#### Mecánicas y flujo del juego:
Como mencionamos anteriormente, en ‘SSS: Square Square Square!!!’ el jugador es un cuadrado que debe derrotar a otros cuadrados. El usuario sentirá tensión ya que debe de planear cómo derrotar a sus enemigos al mismo tiempo que huye o esquiva a los mismos y a los triángulos. De esta forma el participante debe pasar toda la partida en constante movimiento, finalizando esta una vez que quede solo un cuadrado. Al ser una partida relativamente corta, el usuario sentirá el deseo de seguir jugando. El juego se desarrollará por rondas, y en cuanto termine una con un ganador, se le otorgará un punto e inmediatamente se pasará al siguiente nivel. Si un jugador colisiona con un triángulo, este muere y su rival se lleva un punto. Cuando un jugador llegue al número de victorias necesarias, el juego terminará, entonces se saltará a la pantalla del podio, en la que se mostrará quién ha ganado, y desde la cual se podrá volver al menú principal. El juego incluirá las siguientes mecánicas:
Movimiento: El jugador tendrá a su disposición la posibilidad de moverse a la izquierda y la derecha. Puede agacharse con el fin de disminuir su hitbox, o bajar a una plataforma inferior si pulsa el botón de salto. Con el salto, el usuario puede situarse sobre plataformas, esquivar trampas y aplastar a los otros cuadrados.
Rebotes: El usuario podrá impulsarse al colisionar con semicírculos (objetos sólidos que estarán repartidos a lo largo del nivel), saliendo el jugador impulsado hacia el lado en donde apunte el semicírculo.
Pinchos: Dentro de cada nivel existen unos objetos que actúan como trampa y hacen daño a los cuadrados. Se trata de los triángulos, cuya función consiste en eliminar a cualquier cuadrado que colisione con ellos. Son estáticos, por lo que la única forma de que un cuadrado choque con ellos es por accidente.
Al iniciar una partida, se empieza por el nivel uno. Si el jugador gana, se pasará al siguiente nivel, cuyo mapa será diferente y, por tanto, los objetos distribuidos a lo largo del mismo también lo serán. El nivel de dificultad de los escenarios no será ascendente, pero al ser los niveles tan diferentes la forma de afrontar uno es muy diferente que de afrontar otro, por lo que el jugador no sentirá estar jugando a lo mismo siempre. Cuando un jugador llegue a 10 puntos, se saltará a la pantalla del podio, en la que se verá quién ha ganado, y desde la cual se podrá volver al menú principal.
En cualquier momento de la partida, se puede pausar el juego, quedándose toda la pantalla en un tono grisáceo, y mostrando las instrucciones de lo que se puede hacer (pulsar p para continuar o n para ir al menu).
Los efectos de sonidos son sencillos y se adecuan a cada movimiento, dando la impresión de rebote al colisionar con las semiesferas , un sonido de elevación cuando un cuadrado salta… La música de fondo también es ideal para nuestro juego, puesto que es sencilla y al mismo tiempo muy animada e incita al competivismo. Asimismo, ninguno de los efectos de sonido ni la música es nuestra, todas han sido sacadas de la página que se muestra en la webgrafía.

#### Pantallas y escenarios
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Nivel_1.png)
Primer nivel del juego.

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Nivel_2.png)
Segundo nivel del juego.

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Nivel_3.png)
Tercer nivel del juego.
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Nivel_4.png)
Cuarto nivel del juego.

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Podio.png)
Pantalla del podio. Los jugadores se pueden mover por todo el escenario, pero si uno salta encima del otro, no ocurre nada. De esa página el usuario solo puede salir dando al botón de volver, que le llevará al menú principal.

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Pausa.png)
Pantalla de pausa, a la cual se accede pulsando p, y volviendo a pulsar p para reanudar el nivel en el cual se encuentran los jugadores. Si por su parte se pulsa la tecla n, se vuelve al menu principal.

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Menu.png)
Pantalla de menú principal. Se muestra el logo del juego y tres botones. El botón de jugar hace que empiece el juego. El de cómo jugar muestra  una pantalla en la que se explican los controles y elementos del juego. El de los créditos solo muestra el nombre de los desarrolladores.

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Tutorial.png)
Pantalla de cómo jugar. Se muestra como ejecutar el movimientos y qué hace cada elemento del juego. Asimismo, los jugadores pueden moverse en sus respectivos cuadrados. Pulsando en volver se vuelve al menú principal.

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Creditos.png)
Pantalla de créditos. Pulsando en volver se vuelve al menú principal.


#### Arte:
‘SSS: Square Square Square!!!’ precisa, como se mencionó anteriormente, de un estilo artístico muy sencillo, optando por incluir formas de colores planos y geometría simple. Es necesario conocer y visualizar bien los obstáculos y jugadores, por eso se optó por figuras básicas. Sin embargo, se les ha dotado de un estilo cartoon para dar una estética más amigable y familiar. De esta forma no se recarga la pantalla con elementos innecesarios y el jugador puede asignar las distintas formas a los distintos elementos de la pantalla de una forma más sencilla y casi inconsciente.
Por otro lado, los niveles del juego estarán en contraposición con los colores llamativos de los personajes, optando por fondos en tonalidades de escalas de grises para que se diferencie muy bien la utilidad de cada cosa.


#### Fase 3:
En esta fase ya existe comunicación entre cliente y servidor. A parte de esta nueva funcionalidad, se han realizado mejoras visuales. Con el uso de API REST, ahora es posible mirar cuántos jugadores hay dentro del juego y, dentro de los mismo, cuántos de ellos están jugando en este mismo momento. Aquí se muestran las capturas de la mejora visual con respecto a la fase anterior.

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/captura1_f3.png)
Créditos

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/captura2_f3.png)
Tutorial

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/captura3_f3.png)
Menú principal (el cambio es que arriba a la derecha se observan el número de jugadores conectados y jugando).

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/captura4_f3.png)
Selección de skins

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/captura5_f3.png)
Fin de ronda

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/captura3_f3.png)
Pausa

#### Diagrama de clases
Solo tenemos dos clases, que son controller y jugador. La clase jugador es usada en la clase controller. Es una relación de agregación, puesto que un jugador sí puede existir sin un controlador.

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/diagrama.png)

Para ejecutar el juego, es necesario ejecutar el .jar del juego. Es recomendable, aunque no es necesario, instalar ngrok en la máquina, para asegurarse que la comunicación entre cliente servidor se está efectuando correctamente. El URL a cargar en el navegador para poder empezar a jugar es http://localhost:8080/, o, si usamos ngrok, usaremos la que este nos de. En caso de usar ngrok, habría que ejecutar "ngrok http 8080" en la consola. Es necesario instalar java 8.
 
 
##### Arte original:
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Base/triangulo.png)

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Base/circulo.png)

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Base/cuadrado.png)

##### Arte nuevo:
Semiesferas

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/circulo_arriba.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/circulo_abajo.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/circulo_dcha.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/circulo_izq.png)

Triángulos

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/triangulo.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/triangulo_abajo.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/triangulo_dcha.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/triangulo_izq.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/tripletriangulo.png)

Podio

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/caja.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/caja1.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/caja2.png)

Rediseño del logo

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/logo.png)

Plataformas, paredes y suelo

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/platformN.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/platform2N.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/paredN.png)


#### Skins


![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Skins/Cuadralewis.png)

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Skins/squaredio.png)

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Skins/cuadrathorton.png)

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Skins/MasSkinsXd.jpeg)

#### Nuevas skins
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/CuadraBob.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/CuadraTricio.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/Cuadrataro.png)

Predeterminadas

![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/cuadrado_verde.png)
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/cuadrencio.png)

#### Nivel 
 
![alt text](https://github.com/ClaraMegalovania/SSS-Square-Square-Square-/blob/master/Arte/nivel.jpeg)

Miembros:
  - Clara Bartolomé Pereira: c.bartolome.2017@alumnos.urjc.es Github: ClaraMegalovania
  - Fernando Doménech Martínez: f.domenech.2017@alumnos.urjc.es Github: Ferdom-M
  - Javier Morales López: j.morales.2017@alumnos.urjc.es Github: JavierMegalovania
  - Elena Rosal del Rey: e.rosal.2017@alumnos.urjc.es Github: ElenaRoRey
  
Trello: https://trello.com/b/cj1rszAa/sss-square-square-square
