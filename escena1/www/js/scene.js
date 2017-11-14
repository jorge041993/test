(function() {
  //vertex shader calcular posiciones y vertices de los primitivos
  //y el frament shader calcula el color y la posicion de los primitivos

  let scene = new THREE.Scene();
  const aspectRatio = window.innerWidth / window.innerHeight;
  let camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.soft = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;


  camera.position.z = 60;
  camera.position.y = 15;


  let planeGeometry = new THREE.PlaneGeometry(200, 900);
  planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  let groundMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff
  });
  let plane = new THREE.Mesh(planeGeometry, groundMaterial);
  plane.receiveShadow = true;
  let mesh;

  let loader = new THREE.TextureLoader();

  /*luz ambiental*/
  let light = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(light);


  let cubo, piramide, toroide, texturas = [];

  texturas.push(loader.load('public/rojote.jpg'));
  texturas.push(loader.load('public/aluminio.jpg'));
  let geometry = new THREE.CubeGeometry(15, 15, 15, 100, 50, false);
  let material = new THREE.MeshBasicMaterial({
    map: texturas[0]
  });

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 20;
  mesh.position.x = 0;
  mesh.castShadow = true;
  cubo = mesh;
  cubo.textura = 0;
  scene.add(mesh);

  geometry = new THREE.CylinderGeometry(0.5, 15, 15, 4, 1, false);
  material = new THREE.MeshBasicMaterial({
    map: texturas[0]
  });

  mesh = new THREE.Mesh(geometry, material);

  mesh.position.y = 20;
  mesh.position.x = 40;
  mesh.castShadow = true;
  piramide = mesh;
  piramide.textura = 0;
  scene.add(mesh);

  geometry = new THREE.TorusGeometry(10, 5, 15, 100, 50, false);
  material = new THREE.MeshBasicMaterial({
    map: texturas[0]
  });

  mesh = new THREE.Mesh(geometry, material);
  mesh.position.y = 20;
  mesh.position.x = -40;
  mesh.castShadow = true;
  toroide = mesh;
  toroide.textura = 0;
  scene.add(mesh);





  //let geometry = new THREE.BoxGeometry(10,10,10,10);

  // let groundMaterial = new THREE.MeshPhongMaterial({
  // color: 0xffffff
  //});

  //let mesh = new THREE.Mesh(geometry, groundMaterial);

  let wallGeometry = new THREE.BoxGeometry(200, 100, 10, 2);
  let wallMaterial = new THREE.MeshBasicMaterial({
    map: loader.load('public/hola.jpg')
  });
  let wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
  wallMesh.position.z -= 40;
  scene.add(wallMesh);

  let pointLight = new THREE.PointLight(0x606060);

  pointLight.position.y = 60;
  pointLight.position.z = 20;

  pointLight.castShadow = true;

  scene.background = new THREE.Color(0xeeeeee);
  scene.add(new THREE.AmbientLight(0x404040));
  scene.add(plane);
  scene.add(pointLight);

  let controls = new THREE.OrbitControls(camera, renderer.domElement);

  window.tecla = function(event) {
    switch (event.key) {
      case "1":
        toroide.material.map = texturas[(++toroide.textura) % 2];
        break;
      case "2":
        cubo.material.map = texturas[(++cubo.textura) % 2];
        break;
      case "3":
        piramide.material.map = texturas[(++piramide.textura) % 2];
        break;
      case "4":

        break;
      default:

    }
  };


  function loop() {
    requestAnimationFrame(loop);
    cubo.rotation.y += 0.01;
    piramide.rotation.z += 0.01;
    toroide.rotation.x += 0.01;
    renderer.render(scene, camera);
  }

  loop();
})();
