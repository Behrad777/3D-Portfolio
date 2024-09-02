import Experience from "../Experience.js";
import * as THREE from "three";

export default class Music {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.roomChildren = {};
        this.camera = this.experience.camera.orthographicCamera; 

        this.setBackgroundMusic();
    }

    setBackgroundMusic() {
        const listener = new THREE.AudioListener();
        this.camera.add(listener); 

        const sound = new THREE.Audio(listener);

        const audioContext = new AudioContext(); // Create AudioContext
        const audioLoader = new THREE.AudioLoader();

        audioLoader.load(
        "./sounds/background-music.mp3",
        (buffer) => {
            audioContext.decodeAudioData(
            buffer,
            (decodedData) => {
                sound.setBuffer(decodedData);
                sound.setLoop(true);
                sound.setVolume(0.5);
                sound.play();
            },
            (error) => {
                console.error("Error decoding audio data:", error);
            }
            );
        },
        (xhr) => {
            // Optional: Progress callback
            console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
            console.error("Error loading audio file:", error);
        }
        );
    }
}
