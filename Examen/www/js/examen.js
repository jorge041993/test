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
        camera.position.x = 15;
    
        let planeGeometry = new THREE.PlaneGeometry(200,900);
        planeGeometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
        let groundMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff
        });
        let plane = new THREE.Mesh(planeGeometry, groundMaterial);
        plane.receiveShadow  = true;
        let mesh;
    
        let loader = new THREE.TextureLoader();

        /*luz ambiental*/
  let light = new THREE.AmbientLight(0x804040); // soft white light
  scene.add(light);

        let cilindro1, cilindro2, cilindro3;
    /*mesa 1*/
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(20, 3, 20, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 15;
        mesh.position.x = 0;
        mesh.castShadow = true;
        scene.add(mesh);
    })   

    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CylinderGeometry(5, 4, 13, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 6.9;
        mesh.position.x = 0;
        mesh.castShadow = true;
        cilindro1 = mesh;
        scene.add(mesh);
    })  
    /*sillas*/
    /*aciento1*/
    loader.load('public/blanco.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(10, 3, 10, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 10;
        mesh.position.x = -15;
        mesh.castShadow = true;
        scene.add(mesh);
    }) 
    /*respaldadero1*/
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 10, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 15;
        mesh.position.x = -19.5;
        mesh.castShadow = true;
        scene.add(mesh);
    })
    /*patas de silla1*/
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -19.5;
        mesh.position.z = 4;
        mesh.castShadow = true;
        scene.add(mesh);
    })
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -19.5;
        mesh.position.z = -4;
        mesh.castShadow = true;
        scene.add(mesh);
    })
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -11;
        mesh.position.z = 4;
        mesh.castShadow = true;
        scene.add(mesh);
    })
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -11;
        mesh.position.z = -4;
        mesh.castShadow = true;
        scene.add(mesh);
    })
/*silla2 mesa 1*/
    /*aciento2*/
    loader.load('public/blanco.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(10, 3, 10, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 10;
        mesh.position.x = 15;
        mesh.castShadow = true;
        scene.add(mesh);
    }) 

     /*respaldadero1*/
     loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 10, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 15;
        mesh.position.x = 19.5;
        mesh.castShadow = true;
        scene.add(mesh);
    })

    /*patas de silla1*/
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = 19.5;
        mesh.position.z = 4;
        mesh.castShadow = true;
        scene.add(mesh);
    })
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = 19.5;
        mesh.position.z = -4;
        mesh.castShadow = true;
        scene.add(mesh);
    })
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = 11;
        mesh.position.z = 4;
        mesh.castShadow = true;
        scene.add(mesh);
    })
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = 11;
        mesh.position.z = -4;
        mesh.castShadow = true;
        scene.add(mesh);
    })


    /*mesa 2*/
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(20, 3, 20, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 15;
        mesh.position.x =-50;
        mesh.castShadow = true;
        scene.add(mesh);
    })  

    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CylinderGeometry(5, 4, 13, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 6.9;
        mesh.position.x = -50;
        mesh.castShadow = true;
        cilindro2 = mesh;
        scene.add(mesh);
    })  

    /*silla1 mesa 2*/
    /*aciento1*/
    loader.load('public/blanco.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(10, 3, 10, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 10;
        mesh.position.x = -66;
        mesh.castShadow = true;
        scene.add(mesh);
    }) 

    /*respaldo 1*/
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 10, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 15;
        mesh.position.x = -70.60;
        mesh.castShadow = true;
        scene.add(mesh);
    })

    /*patas de silla1*/
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -70.6;
        mesh.position.z = 4;
        mesh.castShadow = true;
        scene.add(mesh);
    })
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -62.5;
        mesh.position.z = -4;
        mesh.castShadow = true;
        scene.add(mesh);
    })
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -62;
        mesh.position.z = 4;
        mesh.castShadow = true;
        scene.add(mesh);
    })
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -70.6;
        mesh.position.z = -4;
        mesh.castShadow = true;
        scene.add(mesh);
    })

    /*SILLA 2 MESA 2*/

/*silla2 mesa 2*/
    /*aciento2*/
    loader.load('public/blanco.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(10, 3, 10, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 10;
        mesh.position.x = -35;
        mesh.castShadow = true;
        scene.add(mesh);
    }) 

    /*respaldo 2*/
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 10, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 15;
        mesh.position.x = -30.6;
        mesh.castShadow = true;
        scene.add(mesh);
    })

    /*patas de silla2*/
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -39.5;
        mesh.position.z = 4;
        mesh.castShadow = true;
        scene.add(mesh);
    })

    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -39.5;
        mesh.position.z = -4;
        mesh.castShadow = true;
        scene.add(mesh);
    })

    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -30.7;
        mesh.position.z = 4;
        mesh.castShadow = true;
        scene.add(mesh);
    })

    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 5;
        mesh.position.x = -30.7;
        mesh.position.z = -4;
        mesh.castShadow = true;
        scene.add(mesh);
    })

    /*mesa 3*/
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(20, 3, 20, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 15;
        mesh.position.x = -25;
        mesh.position.z = 45;
        mesh.castShadow = true;
        scene.add(mesh);
    })  
    
    loader.load('public/mesa.jpg', function(texture){
        let geometry = new THREE.CylinderGeometry(5, 4, 13, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 6.9;
        mesh.position.x = -25;
        mesh.position.z =45
        mesh.castShadow = true;
        cilindro3 = mesh;
        scene.add(mesh);
    })  

    /*silla1 mesa 3*/
    /*aciento1*/
    loader.load('public/blanco.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(10, 3, 10, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 10;
        mesh.position.x = -10;
        mesh.position.z = 45;
        mesh.castShadow = true;
        scene.add(mesh);
    }) 
 /*respaldo 1*/
 loader.load('public/mesa.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(1, 10, 10, 100, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 15;
    mesh.position.x = -5.5;
    mesh.position.z = 45;
    mesh.castShadow = true;
    
    scene.add(mesh);
})

 /*patas de silla1*/
 loader.load('public/mesa.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 5;
    mesh.position.x = -14;
    mesh.position.z = 49.4;
    mesh.castShadow = true;
    scene.add(mesh);
})

loader.load('public/mesa.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 5;
    mesh.position.x = -6;
    mesh.position.z = 49.4;
    mesh.castShadow = true;
    scene.add(mesh);
})

loader.load('public/mesa.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 5;
    mesh.position.x = -6;
    mesh.position.z = 40.9;
    mesh.castShadow = true;
    scene.add(mesh);
})

loader.load('public/mesa.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 5;
    mesh.position.x = -14;
    mesh.position.z = 40.9;
    mesh.castShadow = true;
    scene.add(mesh);
})

/*silla2 mesa 3*/
    /*aciento2*/
    loader.load('public/blanco.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(10, 3, 10, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 10;
        mesh.position.x = -40;
        mesh.position.z = 45;
        mesh.castShadow = true;
        scene.add(mesh);
    }) 
 /*respaldo 2*/
 loader.load('public/mesa.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(1, 10, 10, 100, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 15;
    mesh.position.x = -44.7;
    mesh.position.z = 45;
    mesh.castShadow = true;
    
    scene.add(mesh);
})

 /*patas de silla2*/
 loader.load('public/mesa.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 5;
    mesh.position.x = -44.8;
    mesh.position.z = 49.4;
    mesh.castShadow = true;
    scene.add(mesh);
})

loader.load('public/mesa.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 5;
    mesh.position.x = -35.9;
    mesh.position.z = 49.4;
    mesh.castShadow = true;
    scene.add(mesh);
})

loader.load('public/mesa.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 5;
    mesh.position.x = -44.8;
    mesh.position.z = 40.9;
    mesh.castShadow = true;
    scene.add(mesh);
})

loader.load('public/mesa.jpg', function(texture){
    let geometry = new THREE.CubeGeometry(1, 10, 1, 100, 1, false)
    let material = new THREE.MeshBasicMaterial({
        map: texture
    })

    mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = 5;
    mesh.position.x = -35.5;
    mesh.position.z = 40.9;
    mesh.castShadow = true;
    scene.add(mesh);
})

    /*mesa de barra*/
    loader.load('public/barra.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(10, 30, 60, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 15;
        mesh.position.x = 55;
       mesh.castShadow = true;
        scene.add(mesh);
    }) 
    loader.load('public/cartas.jpg', function(texture){
        let geometry = new THREE.CubeGeometry(13, 1, 60, 100, 1, false)
        let material = new THREE.MeshBasicMaterial({
            map: texture
        })

        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 30;
        mesh.position.x = 55;
       mesh.castShadow = true;
        scene.add(mesh);
    }) 

        //let geometry = new THREE.BoxGeometry(10,10,10,10);
    
       // let groundMaterial = new THREE.MeshPhongMaterial({
           // color: 0xffffff
        //});
    
        //let mesh = new THREE.Mesh(geometry, groundMaterial);
/*pared*/
        let wallGeometry = new THREE.BoxGeometry(400,200 , 10, 2);
        let wallMaterial = new THREE.MeshBasicMaterial({
          map: loader.load('public/cafe1.jpg')
        });
        let wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
        wallMesh.position.z -= 40;
        scene.add(wallMesh);
    
        let pointLight = new THREE.PointLight(0xf49319);

        
        pointLight.position.y = 60;
        pointLight.position.z = 100;

    
        pointLight.castShadow = true;
    
        scene.background = new THREE.Color(0xA56D48);
        scene.add(new THREE.AmbientLight(0x404040));
        scene.add(plane);
        scene.add(pointLight);
    
        let controls = new THREE.OrbitControls(camera, renderer.domElement);
    
    
        function loop(){
            requestAnimationFrame(loop);
            cilindro1.rotation.y += 0.1;
            cilindro2.rotation.y += 0.1;
            cilindro3.rotation.y += 0.1;
            renderer.render(scene, camera);
        }
    
        loop();
    
    })();