import Experience from "../Experience";
import * as THREE from "three";
export default class Floor{

    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.room = this.experience.world.room.actualRoom;

        this.setFloor();
        this.setCircles();

    }

    setFloor(){
        this.geometry = new THREE.PlaneGeometry(300,300);
        this.material = new THREE.MeshStandardMaterial({
            color:0xfdc4b6

        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.plane.rotation.set(-Math.PI/2,0,0);
        this.plane.receiveShadow = true;

        this.scene.add(this.plane);
    }

    setCircles(){
        const geometry = new THREE.CircleGeometry( 5, 32 ); 
        const material1 = new THREE.MeshStandardMaterial( { color: 0x7EA5A4 } ); 
        const material2 = new THREE.MeshStandardMaterial( { color: 0x82273e } ); 
        const material3 = new THREE.MeshStandardMaterial( { color: 0xEE5F63} ); 

        this.circle1 = new THREE.Mesh( geometry, material1 ); 
        this.circle2 = new THREE.Mesh( geometry, material2 ); 
        this.circle3 = new THREE.Mesh( geometry, material3 ); 

        this.circle1.position.y = 0.01;
        this.circle2.position.y = 0.02;
        this.circle3.position.y = 0.03;

        this.circle1.scale.set(0,0,0);  
        this.circle2.scale.set(0,0,0); 
        this.circle3.scale.set(0,0,0); 

        this.circle1.rotation.x =
        this.circle2.rotation.x = 
        this.circle3.rotation.x = 
        -Math.PI/2;

        this.circle1.position.x =
        this.circle2.position.x = 
        this.circle3.position.x =
        0.8;
        

        this.circle1.receiveShadow =
        this.circle2.receiveShadow = 
        this.circle3.receiveShadow = 
        true;

        this.scene.add(this.circle1);
        this.scene.add(this.circle2);
        this.scene.add(this.circle3);


    }


}