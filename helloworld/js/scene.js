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
    camera.position.z = 2;
    camera.position.y = 2;

    let geometry = new THREE.BoxGeometry(1,1,1,1);

/*material de la figura que vamos a crear*/
    let groundMaterial = new THREE.MeshPhongMaterial({
        color: 0xfffff
    });

    /*es el que genera el fractal*/
    let mesh =new THREE.Mesh(geometry, groundMaterial);

    /*crear luz mercurial*/
    let pointLight = new THREE.PointLight(0x404040);

    pointLight.position.y = 80;

    scene.add(mesh);
    scene.add(new THREE.AmbientLight(0x404040));
    scene.add(pointLight);
    
    renderer.render(scene, camera);

    function loop(){
        requestAnimationFrame(loop);
        /*console.log("New Frame");*/
        renderer.render(scene, camera);
    }
    loop();

})();