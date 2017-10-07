(function ($) {
// define variables del canvas.
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var player, score, stop, ticker;
var ground = [], water = [], enemies = [], environment = [];

// variables para crear la plataforma de canvas.
var platformHeight, platformLength, gapLength;
var platformWidth = 32;
var platformBase = canvas.height - platformWidth;  
var platformSpacer = 64;

var canUseLocalStorage = 'localStorage' in window && window.localStorage !== null;
var playSound;

// establece la preferencia de sonido.
if (canUseLocalStorage) {
  playSound = (localStorage.getItem('kandi.playSound') === "true")

  if (playSound) {
    $('.sound').addClass('sound-on').removeClass('sound-off');
  }
  else {
    $('.sound').addClass('sound-off').removeClass('sound-on');
  }
}

/**
 * para obtener un numero en el rango definido.
 * @param {integer}
 * @param {integer}
 */
function rand(low, high) {
  return Math.floor( Math.random() * (high - low + 1) + low );
}

/**
 * para definir el limite entre un rango.
 * @param {integer} num -Número para enlazar
 * @param {integer}
 * @param {integer}
 */
function bound(num, low, high) {
  return Math.max( Math.min(num, high), low);
}

/**
 * 
Objeto de pre-cargador de activos. Carga todas las imágenes
 */
var assetLoader = (function() {
  // definicion de diccionario de imágenes
  this.imgs        = {
    'bg'            : 'imgs/bg.png',
    'sky'           : 'imgs/sky.png',
    'backdrop'      : 'imgs/backdrop.png',
    'backdrop2'     : 'imgs/backdrop_ground.png',
    'grass'         : 'imgs/grass.png',
    'avatar_normal' : 'imgs/normal_walk.png',
    'water'         : 'imgs/water.png',
    'grass1'        : 'imgs/grassMid1.png',
    'grass2'        : 'imgs/grassMid2.png',
    'bridge'        : 'imgs/bridge.png',
    'plant'         : 'imgs/plant.png',
    'bush1'         : 'imgs/bush1.png',
    'bush2'         : 'imgs/bush2.png',
    'cliff'         : 'imgs/grassCliffRight.png',
    'spikes'        : 'imgs/spikes.png',
    'box'           : 'imgs/boxCoin.png',
    'slime'         : 'imgs/slime.png'
  };

  // para definir directorio de sonidos
  this.sounds      = {
    'bg'            : 'sounds/bg.mp3',
    'jump'          : 'sounds/jump.mp3',
    'gameOver'      : 'sounds/gameOver.mp3'
  };

  var assetsLoaded = 0;                                // cuántos activos se han cargado
  var numImgs      = Object.keys(this.imgs).length;    // número total de activos de imagen
  var numSounds    = Object.keys(this.sounds).length;  // número total de activos sólidos
  this.totalAssest = numImgs;                          // número total de activos

  /**
   * se asegúra de que todos los elementos se cargan antes de usarlos
   * @param {number} dic  - nombre del diccionario('imgs', 'sounds', 'fonts')
   * @param {number} name - Nombre del activo en el diccionario
   */
  function assetLoaded(dic, name) {
    // no cuentan los activos que ya se han cargado
    if (this[dic][name].status !== 'loading') {
      return;
    }

    this[dic][name].status = 'loaded';
    assetsLoaded++;

    // devolución de llamada de progreso
    if (typeof this.progress === 'function') {
      this.progress(assetsLoaded, this.totalAssest);
    }

    // devolución de llamada terminada
    if (assetsLoaded === this.totalAssest && typeof this.finished === 'function') {
      this.finished();
    }
  }

  /**
   * Comprueba el estado listo de un archivo de audio
   * @param {object} sound - Nombre del elemento de audio que se ha cargado
   */
  function _checkAudioState(sound) {
    if (this.sounds[sound].status === 'loading' && this.sounds[sound].readyState === 4) {
      assetLoaded.call(this, 'sounds', sound);
    }
  }

  /**
   * 
Crear activos, establecer devolución de llamada para la carga de activos, 
establecer la fuente de activos
   */
  this.downloadAll = function() {
    var _this = this;
    var src;

    // para cargar las imagenes.
    for (var img in this.imgs) {
      if (this.imgs.hasOwnProperty(img)) {
        src = this.imgs[img];

        // crear un cierre para la vinculación de eventos
        (function(_this, img) {
          _this.imgs[img] = new Image();
          _this.imgs[img].status = 'loading';
          _this.imgs[img].name = img;
          _this.imgs[img].onload = function() { assetLoaded.call(_this, 'imgs', img) };
          _this.imgs[img].src = src;
        })(_this, img);
      }
    }

    // para cargar los sonidos
    for (var sound in this.sounds) {
      if (this.sounds.hasOwnProperty(sound)) {
        src = this.sounds[sound];

        //crear un cierre para la vinculación de eventos
        (function(_this, sound) {
          _this.sounds[sound] = new Audio();
          _this.sounds[sound].status = 'loading';
          _this.sounds[sound].name = sound;
          _this.sounds[sound].addEventListener('canplay', function() {
            _checkAudioState.call(_this, sound);
          });
          _this.sounds[sound].src = src;
          _this.sounds[sound].preload = 'auto';
          _this.sounds[sound].load();
        })(_this, sound);
      }
    }
  }

  return {
    imgs: this.imgs,
    sounds: this.sounds,
    totalAssest: this.totalAssest,
    downloadAll: this.downloadAll
  };
})();

/**
 * Mostrar el progreso de carga de activos
 * @param {integer} progress - Número de activos cargados
 * @param {integer} total - Número total de activos
 */
assetLoader.progress = function(progress, total) {
  var pBar = document.getElementById('progress-bar');
  pBar.value = progress / total;
  document.getElementById('p').innerHTML = Math.round(pBar.value * 100) + "%";
}

/**
 * para cargar el menú principal
 */
assetLoader.finished = function() {
  mainMenu();
}

/**
 * Crea una hoja de cálculo
 * @param {string} - Ruta de acceso a la imagen
 * @param {number} - Ancho (en px) de cada fotograma.
 * @param {number} - Altura (en px) de cada fotograma.
 */
function SpriteSheet(path, frameWidth, frameHeight) {
  this.image = new Image();
  this.frameWidth = frameWidth;
  this.frameHeight = frameHeight;

  //para calcular el número de fotogramas en una fila después de cargar la imagen.
  var self = this;
  this.image.onload = function() {
    self.framesPerRow = Math.floor(self.image.width / self.frameWidth);
  };

  this.image.src = path;
}

/**
 * Crea una animación a partir de una hoja de cálculo.
 * @param {SpriteSheet} - La hoja de cálculo utilizada para crear la animación.
 * @param {number}      - Número de fotogramas a esperar antes de la transición de la animación.
 * @param {array}       - Rango o secuencia de números de fotograma para la animación
 * @param {boolean}     - Repita la animación una vez completada.
 */
function Animation(spritesheet, frameSpeed, startFrame, endFrame) {

  var animationSequence = [];  // matriz que mantiene el orden de la animación
  var currentFrame = 0;        // el marco actual para dibujar  
  var counter = 0;             // realizar un seguimiento de la velocidad de fotogramas

  // rango de inicio y fin para marcos
  for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
    animationSequence.push(frameNumber);

  /**
   * Actualizar la animación
   */
  this.update = function() {

    // para actualizar al siguiente fotograma si es el momento
    if (counter == (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % animationSequence.length;

    //para actualizar el contador
    counter = (counter + 1) % frameSpeed;
  };

  /**
   * Dibuja el marco actual
   * @param {integer} x - X posición para dibujar
   * @param {integer} y - Y posición para dibujar
   */
  this.draw = function(x, y) {
    // obtener la fila y columnas del marco.
    var row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
    var col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

    ctx.drawImage(
      spritesheet.image,
      col * spritesheet.frameWidth, row * spritesheet.frameHeight,
      spritesheet.frameWidth, spritesheet.frameHeight,
      x, y,
      spritesheet.frameWidth, spritesheet.frameHeight);
  };
}

/**
 * crear un fondo parallax 
 */
var background = (function() {
  var sky   = {};
  var backdrop = {};
  var backdrop2 = {};

  /**
   * para Dibuja los fondos a la pantalla a diferentes velocidades
   */
  this.draw = function() {
    ctx.drawImage(assetLoader.imgs.bg, 0, 0);

    // Fondo de la cacerola
    sky.x -= sky.speed;
    backdrop.x -= backdrop.speed;
    backdrop2.x -= backdrop2.speed;

    // dibujar las imágenes de lado a lado a bucle
    ctx.drawImage(assetLoader.imgs.sky, sky.x, sky.y);
    ctx.drawImage(assetLoader.imgs.sky, sky.x + canvas.width, sky.y);

    ctx.drawImage(assetLoader.imgs.backdrop, backdrop.x, backdrop.y);
    ctx.drawImage(assetLoader.imgs.backdrop, backdrop.x + canvas.width, backdrop.y);

    ctx.drawImage(assetLoader.imgs.backdrop2, backdrop2.x, backdrop2.y);
    ctx.drawImage(assetLoader.imgs.backdrop2, backdrop2.x + canvas.width, backdrop2.y);

    //Si la imagen se desplazó por la pantalla, reinicie.
    if (sky.x + assetLoader.imgs.sky.width <= 0)
      sky.x = 0;
    if (backdrop.x + assetLoader.imgs.backdrop.width <= 0)
      backdrop.x = 0;
    if (backdrop2.x + assetLoader.imgs.backdrop2.width <= 0)
      backdrop2.x = 0;
  };

  /**
   * resetear el fondo desde cero.
   */
  this.reset = function()  {
    sky.x = 0;
    sky.y = 0;
    sky.speed = 0.2;

    backdrop.x = 0;
    backdrop.y = 0;
    backdrop.speed = 0.4;

    backdrop2.x = 0;
    backdrop2.y = 0;
    backdrop2.speed = 0.6;
  }

  return {
    draw: this.draw,
    reset: this.reset
  };
})();

/**
 * Un vector para el espacio 2d
 * @param {integer} x - Centro x coordenada.
 * @param {integer} y - Centro y coordenada
 * @param {integer} dx - Cambiar en x.
 * @param {integer} dy - Cambiar en y.
 */
function Vector(x, y, dx, dy) {
  // posicion 
  this.x = x || 0;
  this.y = y || 0;
  //dirección
  this.dx = dx || 0;
  this.dy = dy || 0;
}

/**
 * para avanzar la posición de los vectores por dx, dy
 */
Vector.prototype.advance = function() {
  this.x += this.dx;
  this.y += this.dy;
};

/**
 * Obtener la distancia mínima entre dos vectores
 * @param {Vector}
 * @return minDist
 */
Vector.prototype.minDist = function(vec) {
  var minDist = Infinity;
  var max     = Math.max( Math.abs(this.dx), Math.abs(this.dy),
                          Math.abs(vec.dx ), Math.abs(vec.dy ) );
  var slice   = 1 / max;

  var x, y, distSquared;

  // para obtener la mitad de cada vector
  var vec1 = {}, vec2 = {};
  vec1.x = this.x + this.width/2;
  vec1.y = this.y + this.height/2;
  vec2.x = vec.x + vec.width/2;
  vec2.y = vec.y + vec.height/2;
  for (var percent = 0; percent < 1; percent += slice) {
    x = (vec1.x + this.dx * percent) - (vec2.x + vec.dx * percent);
    y = (vec1.y + this.dy * percent) - (vec2.y + vec.dy * percent);
    distSquared = x * x + y * y;

    minDist = Math.min(minDist, distSquared);
  }

  return Math.sqrt(minDist);
};

/**
 * El objeto del jugador
 */
var player = (function(player) {
  //agregar propiedades directamente al jugador objeto importado
  player.width     = 60;
  player.height    = 96;
  player.speed     = 6;

  //saltando
  player.gravity   = 1;
  player.dy        = 0;
  player.jumpDy    = -10;
  player.isFalling = false;
  player.isJumping = false;

  //hojas de sprites
  player.sheet     = new SpriteSheet('imgs/normal_walk.png', player.width, player.height);
  player.walkAnim  = new Animation(player.sheet, 4, 0, 15);
  player.jumpAnim  = new Animation(player.sheet, 4, 15, 15);
  player.fallAnim  = new Animation(player.sheet, 4, 11, 11);
  player.anim      = player.walkAnim;

  Vector.call(player, 0, 0, 0, player.dy);

  var jumpCounter = 0;  //cuánto tiempo puede presionarse el botón de salto

  /**
   * Actualizar la posición y la animación del jugador
   */
  player.update = function() {

    //saltar si no está saltando o cayendo
    if (KEY_STATUS.space && player.dy === 0 && !player.isJumping) {
      player.isJumping = true;
      player.dy = player.jumpDy;
      jumpCounter = 12;
      assetLoader.sounds.jump.play();
    }

    //para saltar más alto si la barra de espacio se presiona continuamente
    if (KEY_STATUS.space && jumpCounter) {
      player.dy = player.jumpDy;
    }

    jumpCounter = Math.max(jumpCounter-1, 0);

    this.advance();

    //añadir gravedad
    if (player.isFalling || player.isJumping) {
      player.dy += player.gravity;
    }

    //cambiar la animación si se cae 
    if (player.dy > 0) {
      player.anim = player.fallAnim;
    }
    //la animación del cambio está saltando
    else if (player.dy < 0) {
      player.anim = player.jumpAnim;
    }
    else {
      player.anim = player.walkAnim;
    }

    player.anim.update();
  };

  /**
   *para dibuja al jugador en su posición actual
   */
  player.draw = function() {
    player.anim.draw(player.x, player.y);
  };

  /**
   *Restablecer la posición del jugador
   */
  player.reset = function() {
    player.x = 64;
    player.y = 250;
  };

  return player;
})(Object.create(Vector.prototype));

/**
 * Los Sprites son algo dibujado a la pantalla (tierra, enemigos, etc.)
 * @param {integer} x - Inicio x posición del reproductor
 * @param {integer} y - Inicio de la posición y del reproductor
 * @param {string} type - Tipo de sprite
 */
function Sprite(x, y, type) {
  this.x      = x;
  this.y      = y;
  this.width  = platformWidth;
  this.height = platformWidth;
  this.type   = type;
  Vector.call(this, x, y, 0, 0);

  /**
   * Actualiza la posición del Sprite por la velocidad del jugador
   */
  this.update = function() {
    this.dx = -player.speed;
    this.advance();
  };

  /**
   *Dibuja el sprite en su posición actual
   */
  this.draw = function() {
    ctx.save();
    ctx.translate(0.5,0.5);
    ctx.drawImage(assetLoader.imgs[this.type], this.x, this.y);
    ctx.restore();
  };
}
Sprite.prototype = Object.create(Vector.prototype);

/**
 * Obtener el tipo de una plataforma basada en la altura de plataforma
 * @return Tipo de plataforma
 */
function getType() {
  var type;
  switch (platformHeight) {
    case 0:
    case 1:
      type = Math.random() > 0.5 ? 'grass1' : 'grass2';
      break;
    case 2:
      type = 'grass';
      break;
    case 3:
      type = 'bridge';
      break;
    case 4:
      type = 'box';
      break;
  }
  if (platformLength === 1 && platformHeight < 3 && rand(0, 3) === 0) {
    type = 'cliff';
  }

  return type;
}

/**
 * 
Actualizar toda la posición del suelo y dibujar. También compruebe si hay 
colisión contra el jugador.
 */
function updateGround() {
  // animate ground
  player.isFalling = true;
  for (var i = 0; i < ground.length; i++) {
    ground[i].update();
    ground[i].draw();

    // detener al jugador de caer al aterrizar en una plataforma
    var angle;
    if (player.minDist(ground[i]) <= player.height/2 + platformWidth/2 &&
        (angle = Math.atan2(player.y - ground[i].y, player.x - ground[i].x) * 180/Math.PI) > -130 &&
        angle < -50) {
      player.isJumping = false;
      player.isFalling = false;
      player.y = ground[i].y - player.height + 5;
      player.dy = 0;
    }
  }

  //eliminar el terreno que se ha apagado de la pantalla
  if (ground[0] && ground[0].x < -platformWidth) {
    ground.splice(0, 1);
  }
}

/**
 * para Actualizar toda la posición del agua y dibujar.
 */
function updateWater() {
  // para animar el agua
  for (var i = 0; i < water.length; i++) {
    water[i].update();
    water[i].draw();
  }

  // eliminar el agua que ha salido de la pantalla
  if (water[0] && water[0].x < -platformWidth) {
    var w = water.splice(0, 1)[0];
    w.x = water[water.length-1].x + platformWidth;
    water.push(w);
  }
}

/**
 * para Actualizar toda la posición del entorno y dibujar.
 */
function updateEnvironment() {
  // ambiente animado
  for (var i = 0; i < environment.length; i++) {
    environment[i].update();
    environment[i].draw();
  }

  //eliminar el entorno que ha desaparecido de la pantalla
  if (environment[0] && environment[0].x < -platformWidth) {
    environment.splice(0, 1);
  }
}

/**
 * Actualizar todos los enemigos de posición y dibujar. También compruebe si 
 * hay colisión contra el jugador.
 */
function updateEnemies() {
  // animar a los enemigos
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].update();
    enemies[i].draw();

    //jugador se topó con el enemigo
    if (player.minDist(enemies[i]) <= player.width - platformWidth/2) {
      gameOver();
    }
  }

  //eliminar enemigos que se han apagado de la pantalla
  if (enemies[0] && enemies[0].x < -platformWidth) {
    enemies.splice(0, 1);
  }
}

/**
 * Actualizar la posición de los jugadores y dibujar
 */
function updatePlayer() {
  player.update();
  player.draw();

  // game over
  if (player.y + player.height >= canvas.height) {
    gameOver();
  }
}

/**
 * Spawn nuevos sprites fuera de la pantalla
 */
function spawnSprites() {
  // aumentar la puntuación
  score++;

  // primero crea una brecha
  if (gapLength > 0) {
    gapLength--;
  }
  // para crear terreno
  else if (platformLength > 0) {
    var type = getType();

    ground.push(new Sprite(
      canvas.width + platformWidth % player.speed,
      platformBase - platformHeight * platformSpacer,
      type
    ));
    platformLength--;

    // agregar ambiente aletorios
    spawnEnvironmentSprites();

    //agregar enemigos aleatorios.
    spawnEnemySprites();
  }
  // start over
  else {
    // para Aumentar la diferencia de longitud cada aumento de velocidad de 4
    gapLength = rand(player.speed - 2, player.speed);
    // sólo permiten que un suelo aumente en 1
    platformHeight = bound(rand(0, platformHeight + rand(0, 2)), 0, 4);
    platformLength = rand(Math.floor(player.speed/2), player.speed * 4);
  }
}

/**
 * Spawn nuevo entorno sprites fuera de la pantalla
 */
function spawnEnvironmentSprites() {
  if (score > 40 && rand(0, 20) === 0 && platformHeight < 3) {
    if (Math.random() > 0.5) {
      environment.push(new Sprite(
        canvas.width + platformWidth % player.speed,
        platformBase - platformHeight * platformSpacer - platformWidth,
        'plant'
      ));
    }
    else if (platformLength > 2) {
      environment.push(new Sprite(
        canvas.width + platformWidth % player.speed,
        platformBase - platformHeight * platformSpacer - platformWidth,
        'bush1'
      ));
      environment.push(new Sprite(
        canvas.width + platformWidth % player.speed + platformWidth,
        platformBase - platformHeight * platformSpacer - platformWidth,
        'bush2'
      ));
    }
  }
}

/**
 * Desafiar nuevos enemigos sprites fuera de la pantalla
 */
function spawnEnemySprites() {
  if (score > 100 && Math.random() > 0.96 && enemies.length < 3 && platformLength > 5 &&
      (enemies.length ? canvas.width - enemies[enemies.length-1].x >= platformWidth * 3 ||
       canvas.width - enemies[enemies.length-1].x < platformWidth : true)) {
    enemies.push(new Sprite(
      canvas.width + platformWidth % player.speed,
      platformBase - platformHeight * platformSpacer - platformWidth,
      Math.random() > 0.5 ? 'spikes' : 'slime'
    ));
  }
}

/**
 * Bucle de juego
 */
function animate() {
  if (!stop) {
    requestAnimFrame( animate );
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    background.draw();

    // entidades de actualización
    updateWater();
    updateEnvironment();
    updatePlayer();
    updateGround();
    updateEnemies();

    // sacar la puntuación
    ctx.fillText('Score: ' + score + 'm', canvas.width - 140, 30);

    //desovar un nuevo Sprite
    if (ticker % Math.floor(platformWidth / player.speed) === 0) {
      spawnSprites();
    }

    // para aumentar la velocidad del jugador sólo cuando el jugador está saltando
    if (ticker > (Math.floor(platformWidth / player.speed) * player.speed * 20) && player.dy !== 0) {
      player.speed = bound(++player.speed, 0, 15);
      player.walkAnim.frameSpeed = Math.floor(platformWidth / player.speed) - 1;

      // reiniciar ticker
      ticker = 0;

      /*para generar una plataforma para llenar la brecha creada al aumentar 
      la velocidad del jugador*/
      if (gapLength === 0) {
        var type = getType();
        ground.push(new Sprite(
          canvas.width + platformWidth % player.speed,
          platformBase - platformHeight * platformSpacer,
          type
        ));
        platformLength--;
      }
    }

    ticker++;
  }
}

/**
 * Seguimiento de los eventos de la barra espaciadora
 */
var KEY_CODES = {
  32: 'space'
};
var KEY_STATUS = {};
for (var code in KEY_CODES) {
  if (KEY_CODES.hasOwnProperty(code)) {
     KEY_STATUS[KEY_CODES[code]] = false;
  }
}
document.onkeydown = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
  }
};
document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
};

/**
 * Solicitud de animación Polyfill
 */
var requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||
          function(callback, element){
            window.setTimeout(callback, 1000 / 60);
          };
})();

/**
 * 
Mostrar el menú principal después de cargar todos los activos
 */
function mainMenu() {
  for (var sound in assetLoader.sounds) {
    if (assetLoader.sounds.hasOwnProperty(sound)) {
      assetLoader.sounds[sound].muted = !playSound;
    }
  }

  $('#progress').hide();
  $('#main').show();
  $('#menu').addClass('main');
  $('.sound').show();
}

/**
 * Comienza el juego - restablece todas las variables y entidades, 
 * spawn ground y water.
 */
function startGame() {
  document.getElementById('game-over').style.display = 'none';
  ground = [];
  water = [];
  environment = [];
  enemies = [];
  player.reset();
  ticker = 0;
  stop = false;
  score = 0;
  platformHeight = 2;
  platformLength = 15;
  gapLength = 0;

  ctx.font = '16px arial, sans-serif';

  for (var i = 0; i < 30; i++) {
    ground.push(new Sprite(i * (platformWidth-3), platformBase - platformHeight * platformSpacer, 'grass'));
  }

  for (i = 0; i < canvas.width / 32 + 2; i++) {
    water.push(new Sprite(i * platformWidth, platformBase, 'water'));
  }

  background.reset();

  animate();

  assetLoader.sounds.gameOver.pause();
  assetLoader.sounds.bg.currentTime = 0;
  assetLoader.sounds.bg.loop = true;
  assetLoader.sounds.bg.play();
}

/**
 * para Termina el juego y reinicia
 */
function gameOver() {
  stop = true;
  $('#score').html(score);
  $('#game-over').show();
  assetLoader.sounds.bg.pause();
  assetLoader.sounds.gameOver.currentTime = 0;
  assetLoader.sounds.gameOver.play();
}

/**
 * Manejadores de clics para las diferentes pantallas de menú
 */
$('.credits').click(function() {
  $('#main').hide();
  $('#credits').show();
  $('#menu').addClass('credits');
});
$('.back').click(function() {
  $('#credits').hide();
  $('#main').show();
  $('#menu').removeClass('credits');
});
$('.sound').click(function() {
  var $this = $(this);
  // apagar sonido
  if ($this.hasClass('sound-on')) {
    $this.removeClass('sound-on').addClass('sound-off');
    playSound = false;
  }
  // encender sonido
  else {
    $this.removeClass('sound-off').addClass('sound-on');
    playSound = true;
  }

  if (canUseLocalStorage) {
    localStorage.setItem('kandi.playSound', playSound);
  }

  // silenciar o silenciar todos los sonidos
  for (var sound in assetLoader.sounds) {
    if (assetLoader.sounds.hasOwnProperty(sound)) {
      assetLoader.sounds[sound].muted = !playSound;
    }
  }
});
$('.play').click(function() {
  $('#menu').hide();
  startGame();
});
$('.restart').click(function() {
  $('#game-over').hide();
  startGame();
});

assetLoader.downloadAll();
})(jQuery);