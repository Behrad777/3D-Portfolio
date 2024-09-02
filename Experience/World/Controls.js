import Experience from "../Experience.js";
import * as THREE from "three";
import Sizes from "../Utils/Sizes.js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ASScroll from "@ashthornton/asscroll";
import { int } from "three/examples/jsm/nodes/Nodes.js";



export default class Controls{

    constructor(){
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.sizes = this.experience.sizes;
        this.room = this.experience.world.room.actualRoom;

        this.room.children.forEach(child => {
            if (child.type ==="RectAreaLight"){
                this.rectLight = child;
            }
        });

        this.circle1 = this.experience.world.floor.circle1;
        this.circle2 = this.experience.world.floor.circle2;
        this.circle3 = this.experience.world.floor.circle3;

        gsap.registerPlugin(ScrollTrigger);
        this.setSmoothScroll();
        this.setScrollTrigger();
        this.setRayCaster();

        
    }

    setRayCaster(){

        this.raycaster = new THREE.Raycaster();
        this.coords = new THREE.Vector2(); // Initialize this.coords


        document.addEventListener('mousedown', (e) => {
            this.coords.set(
                (e.clientX / this.sizes.width )*2 -1,
                -((e.clientY / this.sizes.height) *2 -1),
            );
        });

        this.raycaster.setFromCamera(this.coords, this.camera.orthographicCamera);

        if (this.scene && this.scene.children) {
            this.intersections = this.raycaster.intersectObjects(this.scene.children, true);

            if (this.intersections.length > 0) {
            }
        } else {
            console.warn("Scene or scene children not properly initialized.");
        }
    }
    
    setupASScroll() {
        const asscroll = new ASScroll({
            ease: 0.3,
            disableRaf: true,
        });

        gsap.ticker.add(asscroll.update);

        ScrollTrigger.defaults({
            scroller: asscroll.containerElement,
        });

        ScrollTrigger.scrollerProxy(asscroll.containerElement, {
            scrollTop(value) {
                if (arguments.length) {
                    asscroll.currentPos = value;
                    return;
                }
                return asscroll.currentPos;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight,
                };
            },
            fixedMarkers: true,
        });

        asscroll.on("update", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", asscroll.resize);

        requestAnimationFrame(() => {
            asscroll.enable({
                newScrollElements: document.querySelectorAll(
                    ".gsap-marker-start, .gsap-marker-end, [asscroll]"
                ),
            });
        });
        return asscroll;
    }
    
    
    setSmoothScroll(){
        this.asscroll = this.setupASScroll();

    }

    setScrollTrigger(){


        let mm = gsap.matchMedia();

        mm.add("(min-width: 900px)", ()=>{
            
            this.firstTimeline = gsap.timeline({
                scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true
                }
            });

            this.firstTimeline.to(this.room.position, {
                x: () => {
                    return this.sizes.width * 0.002;
                }
            });

            //second section
            this.secondTimeline = gsap.timeline({
                scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true
                }
            });

            this.secondTimeline.to(this.room.position, {
                x: () => {
                    return -2;
                },
                z: () => {
                    return this.sizes.height*0.002;
                }
            }, "same");
            
            this.secondTimeline.to(this.room.scale, {
                x: 1.4,
                y: 1.4,
                z:1.4,
            }, "same");
            this.secondTimeline.to(this.rectLight, {
                width: 0.25 * 1.4,
                height: 0.25 * 1.4,
            }, "same");
            this.thirdTimeline = gsap.timeline({
                scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true
                }
            });
    
            this.thirdTimeline.to(this.camera.orthographicCamera.position, {
                y: 1.5,
                x: -4.1,
            });


            this.sections = document.querySelectorAll(".section");

            this.sections.forEach(section => {
                this.progressWrapper = section.querySelector(".progress-wrapper");
                this.progressBar = section.querySelector(".progress-bar");

                if (section.classList.contains("right")) {
                    gsap.to(section, {
                        borderTopLeftRadius: 10,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.4,
                        }
                    });
                    gsap.to(section, {
                        borderBottomLeftRadius: 700,
                        scrollTrigger: {
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.4,
                        }
                    });
                } else{
                    gsap.to(section, {
                        borderTopRightRadius: 10,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.4,
                        }
                    });
                    gsap.to(section, {
                        borderBottomRightRadius: 700,
                        scrollTrigger: {
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.4,
                        }
                    });
                }

                gsap.from(this.progressBar, {
                    scaleY: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.4,
                        pin: this.progressWrapper,
                        pinSpacing: false,
                    }
                })
            });
            
            //circle animations
            this.firstTimeline = gsap.timeline({
                scrollTrigger:{
                    trigger: ".first-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true
                }
            }).to(this.circle1.scale, {
                x: 3,
                y: 3,
                z: 3,
            });

            //second section
            this.secondTimeline = gsap.timeline({
                scrollTrigger:{
                    trigger: ".second-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true
                }
            }).to(this.circle2.scale, {
                x: 3,
                y: 3,
                z: 3,
            });

            
            this.thirdTimeline = gsap.timeline({
                scrollTrigger:{
                    trigger: ".third-move",
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true
                }
            }).to(this.circle3.scale, {
                x: 3,
                y: 3,
                z: 3,
            });
    
            
        });
        

        
        

    
    }



    
    resize(){
    }


    update(){
       

     }


    
    
   
    
}