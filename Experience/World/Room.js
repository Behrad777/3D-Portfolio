import Experience from "../Experience.js";
import * as THREE from "three";
import Sizes from "../Utils/Sizes.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";

export default class Room{

    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};


        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.onMouseMove();

        
        
        
    }

    setModel(){
        this.actualRoom.scale.set(0.8,0.8,0.8);
        this.actualRoom.children.forEach((child) => {
                
            child.castShadow = true;
            child.receiveShadow = true;
            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                    groupchild.userData.clickable = true;
                });
            }

            if (child.name === "prism") {
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0;
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.transmission = 0.8;
                child.material.opacity = 1;
                child.material.depthWrite = false;
                child.material.depthTest = false;
                
            }
            child.scale.set(0,0,0);
            if(child.name ==="Cube"){
               child.scale.set(0.3,0.3,0.3);
                child.position.x = 0.08;
                child.position.z = 0;
                child.position.y = 0.4;
                child.rotation.y = Math.PI/4;
                
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        
        
        
        const width = 0.25;
        const height = 0.25;
        const intensity = 0;
        const rectLight = new THREE.RectAreaLight( 0xfff5b6, intensity,  width, height );
        const rectLight2 = new THREE.RectAreaLight( 0xfff5b6, intensity,  width, height );
        
        rectLight.position.set(-1.1, 1.85, -1);
        rectLight.rotation.z= -Math.PI/4;
        rectLight.rotation.x= Math.PI/2;

        rectLight2.position.set(-1.1, 1.95, -1);
        rectLight2.rotation.z= -Math.PI/4;
        rectLight2.rotation.x= -Math.PI/2;

        this.actualRoom.add( rectLight )
        this.actualRoom.add( rectLight2 )

        this.roomChildren["rectlight1"] = rectLight;
        this.roomChildren["rectlight2"] = rectLight2;


        
        const rectLightHelper = new RectAreaLightHelper( rectLight2 );
        //rectLight.add( rectLightHelper );

        this.scene.add(this.actualRoom);
        
    }

   
    
    resize(){
    }


    update(){
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current * 0.07;

    }


    
    
    onMouseMove(){
        window.addEventListener("mousemove", (e)=>{
        this.rotation = ((e.clientX - window.innerWidth /2)*2)/window.innerWidth;

        this.lerp.target = this.rotation;
        
        });
    }
    
}