var scene;
var camera;
var startTextture;

var cubeMesh;

var num= 32;

var star = new Array(num);
var spin = 0;

initializeScene();

animateScene();

function initializeScene(){
    webGLAvailable = false;
   
    
        renderer = new THREE.WebGLRenderer({antialias: true});
        webGLAvailable = true;
    
        renderer = new THREE.CanvasRenderer();
        renderer.setClearColorHex(0x000000, 1);
    
    canvasWidth = window.innerWidth -10;
    canvasHeight = window.innerHeight -20;

    renderer.setSize(canvasWidth, canvasHeight);

    document.getElementById("WebGLCanvas").appendChild(renderer.domElement);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, canvasWidth / canvasHeight, 1 ,100);
    camera.position.set(0,0,15);
    camera.lookAt(scene.position);
    scene.add(camera);

    startTextture = new THREE.ImageUtils.loadTexture("public/img/Star.jpg");

    for(i=0; i<num; i++){
        var squareGeometry = new THREE.Geometry();
        squareGeometry.vertices.push(new THREE.Vector3(-1,-1,0));
        squareGeometry.vertices.push(new THREE.Vector3(1,-1,0));
        squareGeometry.vertices.push(new THREE.Vector3(1,1,0));
        squareGeometry.vertices.push(new THREE.Vector3(-1,1,0));
        squareGeometry.faces.push(new THREE.Face4(0,1,2,3));
        squareGeometry.faceVertexUvs[0].push([
            new THREE.UV(0.0,0.0),
            new THREE.UV(1.0,0.0),
            new THREE.UV(1.0,1.0),
            new THREE.UV(0.0,1.0)
        ]);
        var squareMaterial = new THREE.MeshBasicMaterial({
            map: startTextture,
            transparent: true,
            combine: THREE.MixOperation,
            blending: THREE.AdditiveBlending,
            color: 0xFFFFFF
        })
        var squareMesh = new THREE.Mesh(squareGeometry, squareMaterial);
        squareMesh.position.set(0.0,0.0,0.0);
        scene.add(squareMesh);

        star[i]= new Object();
        star[i].angle = 0.0;
        star[i].r = Math.random();
        star[i].g = Math.random();
        star[i].b = Math.random();
        star[i].mesh = squareMesh;
    }
}
function animateScene(){
    requestAnimationFrame(animateScene);

    for(i=0; i<num; i++){
        spin += Math.PI*2/num;

        if(spin > (Math.PI*2)){
            spin = 0;
            star[i].angle += i / num;
            star[i].dist -= 0.01;
            if(star[i].dist < 0.0){
                star[i].dist += 0.5;

                star[i].r =Math.random();
                star[i].g =Math.random();
                star[i].b =Math.random();
            }
        }

        star[i].mesh.matrix.setPosition(new THREE.Vector3(star[i].dist, 0, 0));
        var mr = new THREE.Matrix4();
        mr.makeRotationZ(spin);
        star[i].mesh.applyMatrix(mr);

        star[i].mesh.material.color.setRGB(star[i].r, star[i].g, star[i].b);
    }

    renderScene();
}

function renderScene(){
    renderer.render(scene, camera);
}