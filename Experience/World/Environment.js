import Experience from "../Experience.js";
import * as THREE from "three";
import Sizes from "../Utils/Sizes.js";
import gsap from "gsap";


export default class Environment{

    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        
        this.setSunlight();

        
        
    }
    
    

    setSunlight(){
        

        this.sunlight = new THREE.DirectionalLight("#ffffff", 2.5);
        this.sunlight.castShadow = true;
        this.sunlight.shadow.camera.far = 20;
        this.sunlight.shadow.mapSize.set(2048,2048);
        this.sunlight.shadow.normalBias = 0.05;
        this.sunlight.position.set(-2,8,4);
        this.scene.add(this.sunlight);

        this.ambientLight = new THREE.AmbientLight("#ffffff", 0.9);
        this.scene.add(this.ambientLight);
    }

    
    switchTheme(theme){
        if(theme ==="dark"){
            gsap.to(this.sunlight.color, {
                r: 0.1450980392156863,
                g: 0.12156862745098039,
                b: 0.2784313725490196,
            });
            gsap.to(this.ambientLight.color, {
                r: 0.1450980392156863,
                g: 0.12156862745098039,
                b: 0.2784313725490196,
            });
            gsap.to(this.sunlight, {
                intensity: 1
            });
            gsap.to(this.ambientLight, {
                intensity: 0.8
            });
        } else{
            gsap.to(this.sunlight.color, {
                r: 255/255,
                g: 255/255,
                b: 255/255,
            });
            gsap.to(this.ambientLight.color, {
                r: 255/255,
                g: 255/255,
                b: 255/255,
            });
            gsap.to(this.sunlight, {
                intensity: 2
            });
            gsap.to(this.ambientLight, {
                intensity: 1
            });
        }
    }

   
    
    resize(){
    }


    update(){
    }
    
    
    
    
}