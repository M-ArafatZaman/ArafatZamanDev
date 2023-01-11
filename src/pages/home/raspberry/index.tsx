import React, {useEffect, createRef} from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
// @ mui components
// Others
import {APP_THEME} from '../../../appTheme';

const RASPBERRY_PI_MODEL: string = "./models/raspberry_pi/scene.gltf";

/**
 * A function to return a radian from a deg
 * @param deg The degree in degrees
 * @returns The radian
 */
function toRad(deg: number): number {
    return deg * Math.PI/180;
}

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
        _camera.position.z = 7;
        _camera.position.y = 3;
        _camera.rotateX(toRad(-30));
        // SETUP
        const sceneBackgroundColor = APP_THEME.palette.background.paper;
        // The first index is removed because it is a #
        _scene.background = new THREE.Color( parseInt(sceneBackgroundColor.substring(1), 16) ); 
        _renderer.setSize(WIDTH, HEIGHT);
        ContainerRef.current?.appendChild(_renderer.domElement);
        
        // Add lighting
        const AmbientLight = new THREE.AmbientLight( 0xFFFFFF, 1 ); // soft white light
        _scene.add( AmbientLight );
        const DirectionalLight = new THREE.DirectionalLight( 0xffffff, 1 ); // soft white light
        DirectionalLight.position.setY(3);
        console.log(DirectionalLight.position);
        _scene.add( DirectionalLight );
        const HemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 1);
        HemisphereLight.position.setY(3);
        _scene.add(HemisphereLight);
        
        // Load Raspberry PI model
        const loader = new GLTFLoader();
        let loadedRaspberryModel: THREE.Group;

        loader.load(
            RASPBERRY_PI_MODEL,
            (gltf) => {
                loadedRaspberryModel = gltf.scene;
                _scene.add(gltf.scene);
                
            }, undefined, (e) => {
                console.log(e);
            }
        );

        // Animation
        function animate() {
            requestAnimationFrame(animate);
            _renderer.render(_scene, _camera);
            if (loadedRaspberryModel instanceof THREE.Group) {
                loadedRaspberryModel.rotation.y += 0.01;
            }
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
