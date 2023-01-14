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
        const _renderer = new THREE.WebGLRenderer({antialias: true});
        // Adjust renderer
        _renderer.toneMapping = THREE.ACESFilmicToneMapping;
        _renderer.outputEncoding = THREE.sRGBEncoding;

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
        const AmbientLight = new THREE.AmbientLight( 0x404040, 1 ); // soft white light
        _scene.add( AmbientLight );

        // Add Directional Light as a grid
        const GRID = [-4, 0, 4];
        for (let z = 0; z < 3; z++) {
            for (let x = 0; x < 3; x++) {
                const DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
                DirectionalLight.position.set(GRID[x], 10, GRID[z]);
                DirectionalLight.target.position.set(GRID[x], 0, GRID[z]);
                _scene.add(DirectionalLight);
                _scene.add(DirectionalLight.target);
            }
        }
        const DirectionalLight = new THREE.DirectionalLight( 0xffffff, .5 ); // soft white light
        DirectionalLight.position.setY(4);
        DirectionalLight.target.position.set(0, 0, 0);
        //_scene.add( DirectionalLight );
        //_scene.add(DirectionalLight.target);
        /* const HemisphereLight = new THREE.HemisphereLight(0xFFFFFF, 0xFFFFFF, 1);
        HemisphereLight.position.setY(3);
        _scene.add(HemisphereLight); */
        
        // Add cube 
        const geo = new THREE.BoxGeometry(1, 1, 1);
        const m1 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

        for (let z = 0; z < 3; z++) {
            for (let x = 0; x < 3; x++) {
                const c = new THREE.Mesh(geo, m1);
                c.position.set(GRID[x], 3, GRID[z]);
                //_scene.add(c);
            };
        }

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
