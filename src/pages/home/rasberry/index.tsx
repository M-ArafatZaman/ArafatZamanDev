import React, {useEffect, createRef} from 'react';
import * as THREE from 'three';
// @ mui components

const RasberryPI: React.FC = () => {

    // Ref for container
    const ContainerRef: React.RefObject<HTMLDivElement> = createRef();

    // Constructor
    useEffect(() => {
        const WIDTH: number = ContainerRef.current?.clientWidth as number;
        const HEIGHT: number = ContainerRef.current?.clientHeight as number;
        // Create scene, renderer, and camera
        const _scene = new THREE.Scene();
        const _renderer = new THREE.WebGLRenderer();
        const _camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, 0.1, 1000);
        // SETUP
        _renderer.setSize(WIDTH, HEIGHT);
        ContainerRef.current?.appendChild(_renderer.domElement);
        
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const cube = new THREE.Mesh( geometry, material );
        _scene.add( cube );

        _camera.position.z = 5;

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            _renderer.render(_scene, _camera);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
        };
        animate();

        // Destructing
        return () => {
            if (ContainerRef.current !== null) {
                ContainerRef.current.innerHTML = "";
            }
        }
    }, [])


    return (
        <div style={{height: "100%", width: "100%"}} ref={ContainerRef}></div>
    )
};

export default RasberryPI;
