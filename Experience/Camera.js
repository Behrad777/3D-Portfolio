import Experience from "./Experience.js";
import Sizes from "./Utils/Sizes.js";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


export default class Camera{

    constructor(){
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        

        this.createPerspectiveCamera();
        this.createOrthographicCamera();
        this.serOrbitControls();


        
    }

    
   
   

    createPerspectiveCamera(){
        this.perspectiveCamera = new THREE.PerspectiveCamera(35, this.sizes.aspect, 0.1, 1000);
        this.scene.add(this.perspectiveCamera);
        this.perspectiveCamera.position.z = 7;
        this.perspectiveCamera.position.y = 6;
        this.perspectiveCamera.position.x = 6;

    }
    
    createOrthographicCamera(){
        this.orthographicCamera = new THREE.OrthographicCamera(
            
            (-this.sizes.aspect * this.sizes.frustrum)/1.5,
            (this.sizes.aspect * this.sizes.frustrum)/1.5,
            (this.sizes.frustrum)/1.5,
            (-this.sizes.frustrum)/1.5,
            -10,
            10

        );
        this.orthographicCamera.position.y = 0.3; //was 1 before
        this.orthographicCamera.position.x = 0.09;
        this.orthographicCamera.rotation.x = -Math.PI/6;



        this.scene.add(this.orthographicCamera);


      
    }
    
    resize(){
        this.perspectiveCamera.aspect = this.sizes.aspect;
        this.perspectiveCamera.updateProjectionMatrix();

        this.orthographicCamera.left = (-this.sizes.aspect * this.sizes.frustrum)/1.5;
        this.orthographicCamera.right = (this.sizes.aspect * this.sizes.frustrum)/1.5;
        this.orthographicCamera.top  = (this.sizes.frustrum/1.5);
        this.orthographicCamera.bottom = (-this.sizes.frustrum/1.5);

        this.orthographicCamera.updateProjectionMatrix();
    }


    update(){
        this.controls.update();

    }

    serOrbitControls(){
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom=true;
    }
    
    
    
    
}