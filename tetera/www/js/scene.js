(function(){

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

    let planeGeometry = new THREE.PlaneGeometry(200,900);
    planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    let groundMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    });
    let plane = new THREE.Mesh(planeGeometry, groundMaterial);
    plane.receiveShadow  = true;
    let mesh;

    let loader = new THREE.TextureLoader();
/*tetera*/
    loader.load('public/hola.jpg', function(texture){
        let geometry = new THREE.CylinderGeometry(6, 15, 20, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 15;
        mesh.position.x = 0;
        mesh.castShadow = true;
        scene.add(mesh);
    })
/*pico de tetera*/
    loader.load('public/mango.jpg', function(texture){
        let geometry = new THREE.CylinderGeometry(8, 7, 1, 5, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 25.5;
        mesh.position.x = 0;
        mesh.castShadow = true;
        scene.add(mesh);
    })


  /*tapadera*/
    loader.load('public/negro.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(3,10,10)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 27;

        mesh.castShadow = true;
        scene.add(mesh);
    })
  /*mango de la tetera*/
  loader.load('public/mango.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(8, 2, 1, 5, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 20;
    mesh.position.x = 12.2;
    mesh.castShadow = true;
    scene.add(mesh);
})

loader.load('public/mango.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(8, 2, 1, 5, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 10;
    mesh.position.x = 14.2;
    mesh.castShadow = true;
    scene.add(mesh);
})

loader.load('public/mango.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(2, 12, 1, 5, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 15;
    mesh.position.x = 17;
    mesh.castShadow = true;
    scene.add(mesh);
})


    

    //let geometry = new THREE.BoxGeometry(10,10,10,10);

   // let groundMaterial = new THREE.MeshPhongMaterial({
       // color: 0xffffff
    //});

    //let mesh = new THREE.Mesh(geometry, groundMaterial);

    let pointLight = new THREE.PointLight(0x606060);

    pointLight.position.y = 60;
    pointLight.position.z = 20;

    pointLight.castShadow = true;

    scene.background = new THREE.Color(0xeeeeee);
    scene.add(new THREE.AmbientLight(0x404040));
    scene.add(plane);
    scene.add(pointLight);

    let controls = new THREE.OrbitControls(camera, renderer.domElement);


    function loop(){
        requestAnimationFrame(loop);
        /*mesh.rotation.x += 0.01;*/
        renderer.render(scene, camera);
    }

    loop();

})();