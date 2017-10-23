/*clousent*/
(function(){
    let scene = new THREE.Scene();
    const aspectRadio = window.innerWidth / window.innerHeight;
    
    let camera = new THREE.PerspectiveCamera(75, aspectRadio, 0.1, 100);

    let renderer = new THREE.WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);
    
    renderer.render(scene, camera);

    function loop(){
        requestAnimationFrame(loop);
        /*console.log("New Frame");*/
        renderer.render(scene, camera);
    }
    loop();

})();