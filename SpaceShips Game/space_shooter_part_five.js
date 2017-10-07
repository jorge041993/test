
 /* Hace que Inicialice el juego.*/

var game = new Game();

function init() {
	game.init();
}


/* 
Definir un objeto para mantener todas nuestras
imágenes para el juego para que las imágenes 
sólo se crean una vez. Este tipo de objeto se conoce como
singleton*/

var imageRepository = new function() {
	// Define imagenes
	this.background = new Image();
	this.spaceship = new Image();
	this.bullet = new Image();
	this.enemy = new Image();
	this.enemyBullet = new Image();

	// Carga las imagenes al juego antes de iniciar el juego
	var numImages = 5;
	var numLoaded = 0;
	function imageLoaded() {
		numLoaded++;
		if (numLoaded === numImages) {
			window.init();
		}
	}
	this.background.onload = function() {
		imageLoaded();
	}
	this.spaceship.onload = function() {
		imageLoaded();
	}
	this.bullet.onload = function() {
		imageLoaded();
	}
	this.enemy.onload = function() {
		imageLoaded();
	}
	this.enemyBullet.onload = function() {
		imageLoaded();
	}

	// Estabecer Imagenes SRC
	this.background.src = "imgs/bg.png";
	this.spaceship.src = "imgs/ship.png";
	this.bullet.src = "imgs/bullet.png";
	this.enemy.src = "imgs/enemy.png";
	this.enemyBullet.src = "imgs/bullet_enemy.png";
}


/*
Crea el objeto Drawable que es la clase base
para todos los objetos dibujables, establece
variables default que todos los objetos secundarios 
heredaran asi como las funciones.
 */
function Drawable() {
	this.init = function(x, y, width, height) {
		// Variables Predeterminadas
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	this.speed = 0;
	this.canvasWidth = 0;
	this.canvasHeight = 0;
	this.collidableWith = "";
	this.isColliding = false;
	this.type = "";

	//Definir función abstracta para implementar en objetos secundarios
	this.draw = function() {
	};
	this.move = function() {
	};
	this.isCollidableWith = function(object) {
		return (this.collidableWith === object.type);
	};
}


/* Crea el objeto de fondo
El fondo se dibuja en el "fondo"
Crea la ilucion de moverse por panoramica
 */
function Background() {
	//Redefine la velocidad del fondo para la panoramización.
	this.speed = 1; 

	// Implementa la función abstracta
	this.draw = function() {
		//Fondo de la cacerola
		this.y += this.speed;
		//this.context.clearRect(0,0, this.canvasWidth, this.canvasHeight);
		this.context.drawImage(imageRepository.background, this.x, this.y);

		// Dibuja otra imagen en el borde superior de la primera imagen
		this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);

		// Si la imagen se desplazo por la pantalla, reinicie
		if (this.y >= this.canvasHeight)
			this.y = 0;
	};
}
// Establecer fondo para heredar propiedades de Drawable
Background.prototype = new Drawable();


/* Crea el objeto Bullet que la nave dispara
 */
function Bullet(object) {
	//Es verdadero si la viñeta esta actualmente en uso
	this.alive = false; 
	var self = object;
	/*
	 Establece los valores de marcador
	 */
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.alive = true;
	};

	/*
	 Usa un Rectangulo drity para borrar la bala y la mueve
	 Devuelve true si la viñeta se movió desde la pantalla, indicando que
	 a bala está lista para ser despejada por la piscina, de lo contrario dibuja la bala
	 */
	this.draw = function() {
		this.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);
		this.y -= this.speed;

		if (this.isColliding) {
			return true;
		}
		else if (self === "bullet" && this.y <= 0 - this.height) {
			return true;
		}
		else if (self === "enemyBullet" && this.y >= this.canvasHeight) {
			return true;
		}
		else {
			if (self === "bullet") {
				this.context.drawImage(imageRepository.bullet, this.x, this.y);
			}
			else if (self === "enemyBullet") {
				this.context.drawImage(imageRepository.enemyBullet, this.x, this.y);
			}

			return false;
		}
	};

	/*
	 Restablece los valores de marcador
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
Bullet.prototype = new Drawable();


/**
 Los Indices del cuadrante se enumeran asi 1|0 y 2|3
 */
function QuadTree(boundBox, lvl) {
	var maxObjects = 10;
	this.bounds = boundBox || {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	var objects = [];
	this.nodes = [];
	var level = lvl || 0;
	var maxLevels = 5;

	/*
	 * borra el quadTree y todos los nodos de objetos
	 */
	this.clear = function() {
		objects = [];

		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].clear();
		}

		this.nodes = [];
	};

	/*
	 Obtener todos los objetos en el quadTree
	 */
	this.getAllObjects = function(returnedObjects) {
		for (var i = 0; i < this.nodes.length; i++) {
			this.nodes[i].getAllObjects(returnedObjects);
		}

		for (var i = 0, len = objects.length; i < len; i++) {
			returnedObjects.push(objects[i]);
		}

		return returnedObjects;
	};

	/*
	 * Devulve todos los objetos con los que el objeto podria colisionar
	 */
	this.findObjects = function(returnedObjects, obj) {
		if (typeof obj === "undefined") {
			console.log("UNDEFINED OBJECT");
			return;
		}

		var index = this.getIndex(obj);
		if (index != -1 && this.nodes.length) {
			this.nodes[index].findObjects(returnedObjects, obj);
		}

		for (var i = 0, len = objects.length; i < len; i++) {
			returnedObjects.push(objects[i]);
		}

		return returnedObjects;
	};

	/*
	 Inserte el objeto en el quadTree
	 Si el arbol excede la capacidad,
	 se dividira y agregara todos los 
	 objetos a sus nodos correspondientes
	 */
	this.insert = function(obj) {
		if (typeof obj === "undefined") {
			return;
		}

		if (obj instanceof Array) {
			for (var i = 0, len = obj.length; i < len; i++) {
				this.insert(obj[i]);
			}

			return;
		}

		if (this.nodes.length) {
			var index = this.getIndex(obj);
			/* Solo agrefue el objeto a un subnodo
			si puede encajar completamente dentro de uno*/ 
			if (index != -1) {
				this.nodes[index].insert(obj);

				return;
			}
		}

		objects.push(obj);

		/*Evitar la division infinita */
		if (objects.length > maxObjects && level < maxLevels) {
			if (this.nodes[0] == null) {
				this.split();
			}

			var i = 0;
			while (i < objects.length) {

				var index = this.getIndex(objects[i]);
				if (index != -1) {
					this.nodes[index].insert((objects.splice(i,1))[0]);
				}
				else {
					i++;
				}
			}
		}
	};

	/*
	 Determine a que nodeo pertenece el objeto
	 */
	this.getIndex = function(obj) {

		var index = -1;
		var verticalMidpoint = this.bounds.x + this.bounds.width / 2;
		var horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

		// El objeto puede caber completamente dentro del cuadrante superior
		var topQuadrant = (obj.y < horizontalMidpoint && obj.y + obj.height < horizontalMidpoint);
		// El objeto puede encajar completamente dentro del dilema inferior
		var bottomQuadrant = (obj.y > horizontalMidpoint);

		// El objeto puede caber completamente dentro de los cuadrantes izquierdos
	
		if (obj.x < verticalMidpoint &&
				obj.x + obj.width < verticalMidpoint) {
			if (topQuadrant) {
				index = 1;
			}
			else if (bottomQuadrant) {
				index = 2;
			}
		}
		// El Objeto puede arreglar completamente dentro de los bits correctos
		else if (obj.x > verticalMidpoint) {
			if (topQuadrant) {
				index = 0;
			}
			else if (bottomQuadrant) {
				index = 3;
			}
		}

		return index;
	};

	/*
	 Divide el nodo en 4 subnodos
	 */
	this.split = function() {
		// Bitwise or [html5rocks]
		var subWidth = (this.bounds.width / 2) | 0;
		var subHeight = (this.bounds.height / 2) | 0;

		this.nodes[0] = new QuadTree({
			x: this.bounds.x + subWidth,
			y: this.bounds.y,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[1] = new QuadTree({
			x: this.bounds.x,
			y: this.bounds.y,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[2] = new QuadTree({
			x: this.bounds.x,
			y: this.bounds.y + subHeight,
			width: subWidth,
			height: subHeight
		}, level+1);
		this.nodes[3] = new QuadTree({
			x: this.bounds.x + subWidth,
			y: this.bounds.y + subHeight,
			width: subWidth,
			height: subHeight
		}, level+1);
	};
}


/**
El objeto de grupo personalizado permite que los objetos Bullet
sean gestionados para prevenir la recoleccion de basura
 * La piscina funciona de la siguiente manera:
 * - Cuando se inicializa la agrupación, se activa una matriz con
 * Objetos de bala.
 * - Cuando la piscina necesita crear un nuevo objeto para su uso,
 * el último elemento de la matriz y comprueba si está actualmente
 * en uso o no. Si está en uso, la piscina está llena. Si es
 * no en uso, la agrupación "engendra" el último elemento de la matriz y
 * a continuación, pops desde el final y lo empujó de nuevo a la parte delantera de
 * la matriz. Esto hace que la piscina tenga objetos libres en la parte de atrás
 * y objetos usados ​​en la parte delantera.
 * - Cuando la piscina anima sus objetos, comprueba si la
 * objeto está en uso (no hay necesidad de dibujar objetos no utilizados) y si lo es,
 * lo dibuja. Si la función draw () devuelve true, el objeto es
 * listo para ser limpiado para que "borre" el objeto y use el
 * array function splice () para quitar el elemento de la matriz y
 * lo empuja hacia atrás.
 * Hacer esto hace que la creación / destrucción de objetos en la piscina
 * constante.
 */
function Pool(maxSize) {
	// max balas permitidas en la picina
	var size = maxSize;
	var pool = [];

	this.getPool = function() {
		var obj = [];
		for (var i = 0; i < size; i++) {
			if (pool[i].alive) {
				obj.push(pool[i]);
			}
		}
		return obj;
	}

	/*
	 Rellena el conjunto de agrupaciones con el objeto dado
	 */
	this.init = function(object) {
		if (object == "bullet") {
			for (var i = 0; i < size; i++) {
				// Inicialice el objeto
				var bullet = new Bullet("bullet");
				bullet.init(0,0, imageRepository.bullet.width,
										imageRepository.bullet.height);
				bullet.collidableWith = "enemy";
				bullet.type = "bullet";
				pool[i] = bullet;
			}
		}
		else if (object == "enemy") {
			for (var i = 0; i < size; i++) {
				var enemy = new Enemy();
				enemy.init(0,0, imageRepository.enemy.width,
									 imageRepository.enemy.height);
				pool[i] = enemy;
			}
		}
		else if (object == "enemyBullet") {
			for (var i = 0; i < size; i++) {
				var bullet = new Bullet("enemyBullet");
				bullet.init(0,0, imageRepository.enemyBullet.width,
										imageRepository.enemyBullet.height);
				bullet.collidableWith = "ship";
				bullet.type = "enemyBullet";
				pool[i] = bullet;
			}
		}
	};

	/*
	 Agarra el último elemento de la lista y lo inicializa y 
	 lo empuja al frente de la matriz
	 */
	this.get = function(x, y, speed) {
		if(!pool[size - 1].alive) {
			pool[size - 1].spawn(x, y, speed);
			pool.unshift(pool.pop());
		}
	};

	/*
	 Utilizado para que la nave pueda conseguir dos balas a la vez. Si  
	 sólo la función get () se utiliza dos veces, el buque es capaz de
	  fuego y sólo tienen 1 bala de spawn en lugar de 2.
	 */
	this.getTwo = function(x1, y1, speed1, x2, y2, speed2) {
		if(!pool[size - 1].alive && !pool[size - 2].alive) {
			this.get(x1, y1, speed1);
			this.get(x2, y2, speed2);
		}
	};

	/*
	Dibuja cualquier balas en uso. Si una bala se apaga de la pantalla,
	lo borra y lo empuja al frente de la matriz.
	 */
	this.animate = function() {
		for (var i = 0; i < size; i++) {
			
            //Sólo dibuja hasta que encontremos una bala que no está viva
			if (pool[i].alive) {
				if (pool[i].draw()) {
					pool[i].clear();
					pool.push((pool.splice(i,1))[0]);
				}
			}
			else
				break;
		}
	};
}


/**
  Cree el objeto Ship que controla el reproductor. El barco es
  dibujado en el lienzo "barco" y usa rectángulos sucios para moverse
  alrededor de la pantalla
 */
function Ship() {
	this.speed = 3;
	this.bulletPool = new Pool(30);
	var fireRate = 15;
	var counter = 0;
	this.collidableWith = "enemyBullet";
	this.type = "ship";

	this.init = function(x, y, width, height) {
		// Variables Default
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.alive = true;
		this.isColliding = false;
		this.bulletPool.init("bullet");
	}

	this.draw = function() {
		this.context.drawImage(imageRepository.spaceship, this.x, this.y);
	};
	this.move = function() {
		counter++;
		// Determine si la accion es accion de movimiento
		if (KEY_STATUS.left || KEY_STATUS.right ||
				KEY_STATUS.down || KEY_STATUS.up) {
			 
            //El barco se movió, así que borre su imagen actual para que pueda
			// ser rediseñado en su nueva ubicación
			this.context.clearRect(this.x, this.y, this.width, this.height);

			/* Actualiza xyy de acuerdo con la dirección a mover y
			redibujar el barco. Cambiar las sentencias else if's to if
            tener movimiento diagonal */
			if (KEY_STATUS.left) {
				this.x -= this.speed
				// Reproductor Kep dentro de la pantalla
				if (this.x <= 0) // 
					this.x = 0;
			} else if (KEY_STATUS.right) {
				this.x += this.speed
				if (this.x >= this.canvasWidth - this.width)
					this.x = this.canvasWidth - this.width;
			} else if (KEY_STATUS.up) {
				this.y -= this.speed
				if (this.y <= this.canvasHeight/4*3)
					this.y = this.canvasHeight/4*3;
			} else if (KEY_STATUS.down) {
				this.y += this.speed
				if (this.y >= this.canvasHeight - this.height)
					this.y = this.canvasHeight - this.height;
			}
		}

		// Redibujar el barco
		if (!this.isColliding) {
			this.draw();
		}
		else {
			this.alive = false;
			game.gameOver();
		}

		if (KEY_STATUS.space && counter >= fireRate && !this.isColliding) {
			this.fire();
			counter = 0;
		}
	};

	/*
	 Dispara dos balas
	 */
	this.fire = function() {
		this.bulletPool.getTwo(this.x+6, this.y, 3,
		                       this.x+33, this.y, 3);
		game.laser.get();
	};
}
Ship.prototype = new Drawable();


/**
 Creea el objeto buque enemigo
 */
function Enemy() {
	var percentFire = .01;
	var chance = 0;
	this.alive = false;
	this.collidableWith = "bullet";
	this.type = "enemy";

	/*
	 * Establece los valores del Enemigo
	 */
	this.spawn = function(x, y, speed) {
		this.x = x;
		this.y = y;
		this.speed = speed;
		this.speedX = 0;
		this.speedY = speed;
		this.alive = true;
		this.leftEdge = this.x - 90;
		this.rightEdge = this.x + 90;
		this.bottomEdge = this.y + 140;
	};

	/*
	 Mover al enemigo
	 */
	this.draw = function() {
		this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.x <= this.leftEdge) {
			this.speedX = this.speed;
		}
		else if (this.x >= this.rightEdge + this.width) {
			this.speedX = -this.speed;
		}
		else if (this.y >= this.bottomEdge) {
			this.speed = 1.5;
			this.speedY = 0;
			this.y -= 5;
			this.speedX = -this.speed;
		}

		if (!this.isColliding) {
			this.context.drawImage(imageRepository.enemy, this.x, this.y);

			// El Enemigo tiene la oportunidad de disparar a cada movimiento
			chance = Math.floor(Math.random()*101);
			if (chance/100 < percentFire) {
				this.fire();
			}

			return false;
		}
		else {
			game.playerScore += 10;
			game.explosion.get();
			return true;
		}
	};

	/*
	 * Dispara una bala
	 */
	this.fire = function() {
		game.enemyBulletPool.get(this.x+this.width/2, this.y+this.height, -2.5);
	};

	/*
	 * Restablece los valores enemigos
	 */
	this.clear = function() {
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.speedX = 0;
		this.speedY = 0;
		this.alive = false;
		this.isColliding = false;
	};
}
Enemy.prototype = new Drawable();


 /**
Crea el objeto Game que contiene todos los objetos y datos para el juego
 */
function Game() {
	/*
	 Obtiene información de lienzo y contexto y configura todos los juegos
	 objetos Devuelve true si el lienzo es compatible y false sDevuelve true si el lienzo es compatible y falso si
	 no lo es. Esto es para detener el script de animacion
	 constantemente ejecutandose en navegadores que no admiten el lienzo
	 */
	this.init = function() {
		// Obtener los elementos de lienzo
		this.bgCanvas = document.getElementById('background');
		this.shipCanvas = document.getElementById('ship');
		this.mainCanvas = document.getElementById('main');

		//Prueba para ver si el lienzo es compatible. Solo necesitas
		//revisa canvas
		if (this.bgCanvas.getContext) {
			this.bgContext = this.bgCanvas.getContext('2d');
			this.shipContext = this.shipCanvas.getContext('2d');
			this.mainContext = this.mainCanvas.getContext('2d');

			//Inicializar objetos para contener su contexto y lienzo
			// informacion
			Background.prototype.context = this.bgContext;
			Background.prototype.canvasWidth = this.bgCanvas.width;
			Background.prototype.canvasHeight = this.bgCanvas.height;

			Ship.prototype.context = this.shipContext;
			Ship.prototype.canvasWidth = this.shipCanvas.width;
			Ship.prototype.canvasHeight = this.shipCanvas.height;

			Bullet.prototype.context = this.mainContext;
			Bullet.prototype.canvasWidth = this.mainCanvas.width;
			Bullet.prototype.canvasHeight = this.mainCanvas.height;

			Enemy.prototype.context = this.mainContext;
			Enemy.prototype.canvasWidth = this.mainCanvas.width;
			Enemy.prototype.canvasHeight = this.mainCanvas.height;

			// Inicializar el objeto de fondo
			this.background = new Background();
			this.background.init(0,0); // Set draw point to 0,0

			// Inicializar el objeto de buque
			this.ship = new Ship();
			// Establezca el barco para iniciar la parte inferior del lienzo
			this.shipStartX = this.shipCanvas.width/2 - imageRepository.spaceship.width;
			this.shipStartY = this.shipCanvas.height/4*3 + imageRepository.spaceship.height*2;
			this.ship.init(this.shipStartX, this.shipStartY,
			               imageRepository.spaceship.width, imageRepository.spaceship.height);

			// Inicializar el objeto de grupo enemigo
			this.enemyPool = new Pool(30);
			this.enemyPool.init("enemy");
			this.spawnWave();

			this.enemyBulletPool = new Pool(50);
			this.enemyBulletPool.init("enemyBullet");

			// Inicio de QuadTree
			this.quadTree = new QuadTree({x:0,y:0,width:this.mainCanvas.width,height:this.mainCanvas.height});

			this.playerScore = 0;

			// Archivos de audio
			this.laser = new SoundPool(10);
			this.laser.init("laser");

			this.explosion = new SoundPool(20);
			this.explosion.init("explosion");

			this.backgroundAudio = new Audio("sounds/kick_shock.wav");
			this.backgroundAudio.loop = true;
			this.backgroundAudio.volume = .25;
			this.backgroundAudio.load();

			this.gameOverAudio = new Audio("sounds/game_over.wav");
			this.gameOverAudio.loop = true;
			this.gameOverAudio.volume = .25;
			this.gameOverAudio.load();

			this.checkAudio = window.setInterval(function(){checkReadyState()},1000);
		}
	};

	// Generar una nueva ola de enemigos
	this.spawnWave = function() {
		var height = imageRepository.enemy.height;
		var width = imageRepository.enemy.width;
		var x = 100;
		var y = -height;
		var spacer = y * 1.5;
		for (var i = 1; i <= 18; i++) {
			this.enemyPool.get(x,y,2);
			x += width + 25;
			if (i % 6 == 0) {
				x = 100;
				y += spacer
			}
		}
	}

	// Iniciar el bucle de animación
	this.start = function() {
		this.ship.draw();
		this.backgroundAudio.play();
		animate();
	};

	// Reiniciar el juego
	this.restart = function() {
		this.gameOverAudio.pause();

		document.getElementById('game-over').style.display = "none";
		this.bgContext.clearRect(0, 0, this.bgCanvas.width, this.bgCanvas.height);
		this.shipContext.clearRect(0, 0, this.shipCanvas.width, this.shipCanvas.height);
		this.mainContext.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);

		this.quadTree.clear();

		this.background.init(0,0);
		this.ship.init(this.shipStartX, this.shipStartY,
		               imageRepository.spaceship.width, imageRepository.spaceship.height);

		this.enemyPool.init("enemy");
		this.spawnWave();
		this.enemyBulletPool.init("enemyBullet");

		this.playerScore = 0;

		this.backgroundAudio.currentTime = 0;
		this.backgroundAudio.play();

		this.start();
	};

	// Juego Terminado
	this.gameOver = function() {
		this.backgroundAudio.pause();
		this.gameOverAudio.currentTime = 0;
		this.gameOverAudio.play();
		document.getElementById('game-over').style.display = "block";
	};
}

/*
 Asegúrese de que el sonido del juego se ha cargado antes de iniciar el juego
 */
function checkReadyState() {
	if (game.gameOverAudio.readyState === 4 && game.backgroundAudio.readyState === 4) {
		window.clearInterval(game.checkAudio);
		document.getElementById('loading').style.display = "none";
		game.start();
	}
}


/*
 Una piscina de sonido para utilizar para efectos de sonido
 */
function SoundPool(maxSize) {
// Max balas permitidas en la piscina
	var size = maxSize; 
	var pool = [];
	this.pool = pool;
	var currSound = 0;

	/*
	 Rellena el conjunto de agrupaciones con el objeto dado
	 */
	this.init = function(object) {
		if (object == "laser") {
			for (var i = 0; i < size; i++) {
				//Inicialice el objeto
				laser = new Audio("sounds/laser.wav");
				laser.volume = .12;
				laser.load();
				pool[i] = laser;
			}
		}
		else if (object == "explosion") {
			for (var i = 0; i < size; i++) {
				var explosion = new Audio("sounds/explosion.wav");
				explosion.volume = .1;
				explosion.load();
				pool[i] = explosion;
			}
		}
	};

	/*
	 Reproduce un sonido
	 */
	this.get = function() {
		if(pool[currSound].currentTime == 0 || pool[currSound].ended) {
			pool[currSound].play();
		}
		currSound = (currSound + 1) % size;
	};
}


/*
  El bucle de animación. Llama a la solicitudAnimationFrame shim to
 optimizar el bucle del juego y dibuja todos los objetos del juego. Esto
 la función debe ser una función gobal y no puede estar dentro de un
 objeto
 */
function animate() {
	document.getElementById('score').innerHTML = game.playerScore;

	// Insertar objetos en quadtree
	game.quadTree.clear();
	game.quadTree.insert(game.ship);
	game.quadTree.insert(game.ship.bulletPool.getPool());
	game.quadTree.insert(game.enemyPool.getPool());
	game.quadTree.insert(game.enemyBulletPool.getPool());

	detectCollision();

	// No más enemigos
	if (game.enemyPool.getPool().length === 0) {
		game.spawnWave();
	}

	// Animar objetos de juego
	if (game.ship.alive) {
		requestAnimFrame( animate );

		game.background.draw();
		game.ship.move();
		game.ship.bulletPool.animate();
		game.enemyPool.animate();
		game.enemyBulletPool.animate();
	}
}

function detectCollision() {
	var objects = [];
	game.quadTree.getAllObjects(objects);

	for (var x = 0, len = objects.length; x < len; x++) {
		game.quadTree.findObjects(obj = [], objects[x]);

		for (y = 0, length = obj.length; y < length; y++) {

			// Detectar algoritmo de colision
			if (objects[x].collidableWith === obj[y].type &&
				(objects[x].x < obj[y].x + obj[y].width &&
			     objects[x].x + objects[x].width > obj[y].x &&
				 objects[x].y < obj[y].y + obj[y].height &&
				 objects[x].y + objects[x].height > obj[y].y)) {
				objects[x].isColliding = true;
				obj[y].isColliding = true;
			}
		}
	}
};


// Los códigos de claves que se asignarán cuando un usuario presione un botón.
//Código original de Doug McInnes
KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}

// Crea la matriz que contiene los KEY_CODES y establece todos sus valores
// a la verdad. Comprobar true / flase es la forma más rápida de verificar el estado
// de una pulsación de tecla y que se presionó cuando se determinó
// cuándo mover y qué dirección
KEY_STATUS = {};
for (code in KEY_CODES) {
  KEY_STATUS[KEY_CODES[code]] = false;
}
/*
Configura el documento para escuchar eventos onkeydown (se dispara cuando
	cualquier tecla del teclado está presionada hacia abajo). Cuando se pulsa una tecla,
	fija la dirección apropiada a verdadero para hacernos saber cuál
	clave que era.
 */
document.onkeydown = function(e) {
	//Firefox y Opera utilizan charCode en lugar de keyCode para
	// devolver la tecla que se pulsó.
	var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
		e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = true;
  }
}
/*
Establece el documento para escuchar los propios eventos de la
cualquier tecla en el teclado se libera). Cuando se suelta una tecla,
 teh la dirección apropiada a falso para hacernos saber que
 clave que era
 */
document.onkeyup = function(e) {
  var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
  if (KEY_CODES[keyCode]) {
    e.preventDefault();
    KEY_STATUS[KEY_CODES[keyCode]] = false;
  }
}


/*
requestAnim shim layer de Paul Irish
Encuentra la primera API que funciona para optimizar el bucle de animación,
De lo contrario, el valor predeterminado es setTimeout ().
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 1000 / 60);
			};
})();