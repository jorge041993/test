/*clousent*/
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

    let loader = new THREE.TextureLoader();
/*tierra*/
    loader.load('public/mundo.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(1,100,100)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 20;
        mesh.position.x = 20;
        scene.add(mesh);
    })
/*mecurio*/
    loader.load('public/mercurio.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(1,100,100)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 10;
        mesh.position.x = 10;
        scene.add(mesh);
    })
/*venus*/
    loader.load('public/venus.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(1,100,100)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 15;
        mesh.position.x = 15;
        scene.add(mesh);
    })
/*marte*/
    loader.load('public/marte.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(1,100,100)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 25;
        mesh.position.x = 25;
        scene.add(mesh);
    })
/*jupiter*/
    loader.load('public/jupiter.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(3,100,100)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = -10;
        mesh.position.x = -27;
        scene.add(mesh);
    })
/*saturno*/
    loader.load('public/saturno.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(3,100,100)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = -10;
        mesh.position.x = -18;
        scene.add(mesh);
    })
/*urano*/
    loader.load('public/urano.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(3,100,100)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 10;
        mesh.position.x = -35;
        scene.add(mesh);
    })
/*neptuno*/
    loader.load('public/neptuno.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(2,100,100)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 10;
        mesh.position.x = -45;
        scene.add(mesh);
    })
/*sol*/
    loader.load('public/sol.jpg', function(texture){
        let geometry = new THREE.SphereGeometry(10,100,100)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 0;
        scene.add(mesh);
    })
/*cubo*/
    loader.load('public/metal.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(10,10,10)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y =-2;
        mesh.position.x = 30;
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