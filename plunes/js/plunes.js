(function(){
    /*para crear nuestra escena*/
    let scene = new THREE.Scene();
    const aspectRadio = window.innerWidth / window.innerHeight;
    
    let camera = new THREE.PerspectiveCamera(75, aspectRadio, 0.1, 100);

    let renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    /*posicion de la camara*/
    camera.position.z = 30;
    camera.position.y = 5;
    let mesh;
/*cilindro*/
    let loader = new THREE.TextureLoader();
      loader.load('public/cilindro.jpg', function(texture){
        let geometry = new THREE.CylinderGeometry(5,5,5)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 0;
        scene.add(mesh);
    })
    /*cubo*/
    loader.load('public/metal.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(5,5,5)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y =0;
        mesh.position.x = 15;
        scene.add(mesh);
    })
    /*tringulo*/
    loader.load('public/metal.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(5,5,5)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 0;
        mesh.position.x = -15;
        scene.add(mesh);
    })

    //let geometry = new THREE.BoxGeometry(1,1,1,1);

/*material de la figura que vamos a crear*/
    let groundMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff
    });

    /*es el que genera el fractal*/
   // let mesh =new THREE.Mesh(geometry, groundMaterial);

    /*crear luz mercurial*/
    let pointLight = new THREE.PointLight(0x404040);

    pointLight.position.y = 80;

    //scene.background = new THREE.color(0xeeeeee);
    scene.add(mesh);
    scene.add(new THREE.AmbientLight(0x404040));
    scene.add(pointLight);
    
    renderer.render(scene, camera);

    function loop(){
        requestAnimationFrame(loop);
       mesh.rotation.y += 0.01;
       mesh.rotation.z += 0.01;
       mesh.rotation.z += 0.01;
        /*console.log("New Frame");*/
        renderer.render(scene, camera);
    }
    loop();

})();