import React, {useEffect, createRef} from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// @ mui components
// Others
import {APP_THEME} from '../../../appTheme';

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
        _camera.position.z = 2;
        // SETUP
        const sceneBackgroundColor = APP_THEME.palette.background.paper;
        // The first index is removed because it is a #
        _scene.background = new THREE.Color( parseInt(sceneBackgroundColor.substring(1), 16) ); 
        _renderer.setSize(WIDTH, HEIGHT);
        ContainerRef.current?.appendChild(_renderer.domElement);
        
        // Add lighting
        const AmbientLight = new THREE.AmbientLight( 0xAAABAB ); // soft white light
        _scene.add( AmbientLight );
        const DirectionalLight = new THREE.DirectionalLight( 0xffffff ); // soft white light
        _scene.add( DirectionalLight );
        
        // Component
        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
        const cube = new THREE.Mesh( geometry, material );
        _scene.add( cube );


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
