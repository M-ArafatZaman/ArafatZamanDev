import React, {useEffect, createRef} from 'react';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
// @ mui components
// Others
import {APP_THEME} from '../../../appTheme';
// Utils
import {isAnyPartOfElementInViewport} from '../../../utils';

const RASPBERRY_PI_MODEL: string = "./models/raspberry_pi/scene.gltf";

/**
 * A function to return a radian from a deg
 * @param deg The degree in degrees
 * @returns The radian
 */
function toRad(deg: number): number {
    return deg * Math.PI/180;
}

let OrbitInteraction: boolean = false;

const RaspberryPI: React.FC = () => {

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
        _renderer.shadowMap.enabled = true;
        _renderer.shadowMap.type = THREE.PCFShadowMap;

        const pmremGenerator = new THREE.PMREMGenerator( _renderer );
        pmremGenerator.compileEquirectangularShader();

        // Add camera
        const _camera = new THREE.PerspectiveCamera(75, WIDTH/HEIGHT, 0.1, 1000);
        _camera.position.z = 7;
        _camera.position.y = 3;
        _camera.rotateX(toRad(-30));
        _camera.updateProjectionMatrix();
        // Add controls
        const Controls = new OrbitControls(_camera, _renderer.domElement);
        Controls.update();
        Controls.addEventListener("start", () => {
            OrbitInteraction = true;
        })
        Controls.addEventListener("end", () => {
            OrbitInteraction = false;
        })

        // SETUP
        const sceneBackgroundColor = APP_THEME.palette.background.paper;
        // The first index is removed because it is a #
        _scene.background = new THREE.Color( parseInt(sceneBackgroundColor.substring(1), 16) ); 
        _renderer.setSize(WIDTH, HEIGHT);
        ContainerRef.current?.appendChild(_renderer.domElement);
        
        // Add lighting
        const AmbientLight = new THREE.AmbientLight( 0xD8D8D8, 1 ); // soft white light
        _scene.add( AmbientLight );

        // Add Directional Light as a grid from the top
        const GRID = [-5, 0, 5];
        for (let z = 0; z < 3; z++) {
            for (let x = 0; x < 3; x++) {
                const DirectionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
                DirectionalLight.castShadow = true;
                DirectionalLight.position.set(GRID[x], 10, GRID[z]);
                DirectionalLight.target.position.set(GRID[x], 0, GRID[z]);
                _scene.add(DirectionalLight);
                _scene.add(DirectionalLight.target);
            }
        }

        // Add directional light from 4 different sides
        const PLANE_GRID_X = [0, 6, 0, -6];
        const PLANE_GRID_Y = [6, 0, -6, 0];
        for (let i = 0; i < 4; i++) {
            const PlaneDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
            PlaneDirectionalLight.castShadow = true;
            PlaneDirectionalLight.position.set(PLANE_GRID_X[i], 0, PLANE_GRID_Y[i]);
            PlaneDirectionalLight.target.position.set(0,0,0);
            _scene.add(PlaneDirectionalLight);
            _scene.add(PlaneDirectionalLight.target);
        }
        
        // Add a Directional light from the bottom
        const BottomDirectionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
        BottomDirectionalLight.position.set(0,-10,0);
        BottomDirectionalLight.target.position.set(0,0,0);
        _scene.add(BottomDirectionalLight);
        _scene.add(BottomDirectionalLight.target); 

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
        const animate = () => {
            requestAnimationFrame(animate);
            _renderer.render(_scene, _camera);
            if (loadedRaspberryModel instanceof THREE.Group && !OrbitInteraction && isAnyPartOfElementInViewport(_renderer.domElement)) {
                loadedRaspberryModel.rotation.y += 0.01;
            };
            Controls.update();
        };
        animate();

        // Added resize event listener
        window.addEventListener("resize", () => {
            const width = ContainerRef.current?.clientWidth as number;
            const height = ContainerRef.current?.clientHeight as number;
            _renderer.setSize( width, height );
            _camera.aspect = width / height;
            _camera.updateProjectionMatrix();
        })

        // Destructing
        return () => {
            if (ContainerRef.current !== null) {
                ContainerRef.current.innerHTML = "";
                _renderer.dispose();
            }
        }
    }, [])


    return (
        <div style={{height: "100%", width: "100%"}} ref={ContainerRef}></div>
    )
};

export default RaspberryPI;
