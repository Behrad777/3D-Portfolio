import EventEmitter from "events";
import Experience from "./Experience";
import gsap from "gsap";
import convert from "./Utils/convertDivsToSpans.js"
export default class Preloader extends EventEmitter{

    constructor(){
        super();
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) =>{
            this.device = device;
        });
        
        this.world.on("worldready", ()=>{
            this.setAssets();
            this.playIntro();
        })
       
    }
    firstIntro(){

        return new Promise((resolve) => {
            this.timeline = new gsap.timeline();
            this.timeline.set(".animatethis", { y: 0, yPercent: 182 });

            this.timeline
            .to(".preloader", {
               opacity: 0,
               delay: 1,
               onComplete: ()=>{
                document.querySelector(".preloader").classList.add(".hidden");
                document.querySelector(".preloader-wrapper").classList.add(".hidden");
               
            }
            })

        if(this.device === "desktop"){
            this.timeline.to(this.room.position, {
                x: -1.2,
                ease: "power1.out",
                duration: 0.7,
            });
        } else{
            this.timeline.to(this.room.position, {
                z: -1,
                ease: "power1.out",
                duration: 0.7,
            })
        }
        this.timeline
        .to(".intro-text .animatethis", {
            yPercent: 0,
            stagger: 0.07,
            ease: "back.out(1.2)",
            
        })
        .to(".arrow-svg-wrapper", {
            opacity: 1
        }, "same")
        .to(".toggle-bar", {
            opacity: 1,
            onComplete: resolve,
        }, "same")
        });
        
        

    }
    onScroll(e){
        if(e.deltaY > 0){
            console.log("added");
            window.removeEventListener("wheel", this.scrollOnceEvent);
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initalY = e.touches[0].clientY;
    }
    
    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let difference = this.initalY - currentY;
        if (difference > 0) {
            window.removeEventListener("touchstart", this.touchStart);
            window.removeEventListener("touchmove", this.touchMove);
            this.playSecondIntro();
        }
        this.intialY = null;
    }

    async playIntro(){
       await this.firstIntro();
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent);
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);


    }
    async playSecondIntro(){
       await this.SecondIntro();
       this.emit("enablecontrols");
    }
    SecondIntro(){

    return new Promise((resolve) => {
        this.Secondtimeline = new gsap.timeline();

                this.Secondtimeline
                .to(".arrow-svg-wrapper", {
                    opacity: 0
                }, "fadeelements")
                .to(".intro-text .animatethis", {
                    yPercent: 182,
                    stagger: 0.07,
                    ease: "back.in(1.2)",
                    
                }, "fadeelements")
                .to(this.room.position, {
                    x: 0,
                    z: 0,
                    y: 0,
                    ease: "power1.out",
                },"same").to(this.roomChildren.cube.rotation, {
                    y: 2 * Math.PI + Math.PI / 4,

                },"same").to(this.roomChildren.cube.scale, {
                    x: 2,
                    y: 1.8,
                    z: 2,
                },"same").to(this.camera.orthographicCamera.position, {
                    y: 1.2,
                    x: -0.2
                },"same").to(this.roomChildren.cube.position, {
                    x: 0,
                    z: 0,
                    y: 1.9,
                },"same")
                .set(this.roomChildren.walls.scale, {
                    x:1.753100872039795,
                    y:1.5777907371520996,
                    z:1.753100872039795
                })
                .set(this.roomChildren.windows.scale, {
                    x:-0.49832260608673096,
                    y:-0.8266670107841492,
                    z:-0.12495356053113937
                })
                .to(
                    this.roomChildren.cube.scale,
                    {
                        x: 0,
                        y: 0,
                        z: 0,
                    })
                    .to(".hero-main-title .animatethis", {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.2)",
                        
                    }, "introtext").to(".hero-main-description .animatethis", {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.7)",
                        
                    }, "introtext").to(".first-sub .animatethis", {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.2)",
                        
                    }, "introtext").to(".second-sub .animatethis", {
                        yPercent: 0,
                        stagger: 0.07,
                        ease: "back.out(1.2)",
                        
                    }, "introtext")
                    .to(
                        this.roomChildren.table.scale,
                        {
                            x:1.5272526741027832,
                            y:1.1892900466918945,
                            z:1.9456233978271484,
                            ease: "back.out(1)"
                        })
                    .to(
                        this.roomChildren.floor_stuff.scale,
                        {
                            x:0.13899843394756317,
                            y:0.13899843394756317,
                            z:0.13899843394756317,
                            ease: "back.out(2.5)",
                            duration: 0.7
                        })
                    .to(
                        this.roomChildren.bed_frame.scale,
                        {
                            x:1.0537070035934448,
                            y:0.5148718953132629,
                            z:0.6129570007324219,
                            ease: "back.out(1)"
                        })
                    .to(
                        this.roomChildren.pillows.scale,
                        {
                            x:0.22920727729797363,
                            y:0.09722374379634857,
                            z:0.3177199065685272,
                            ease: "back.out(1)"
                        })
                        
                        
                    .to(
                        this.roomChildren.rectlight1,
                        {
                            intensity: 2,
                        },"desklights")
                    .to(
                        this.roomChildren.rectlight2,
                        {
                            intensity: 2,
                        },"desklights")
                    
                    .to(
                        this.roomChildren.desk_stuff.scale,
                        {
                            x: 0.06707253307104111,
                            y:0.30157968401908875,
                            z: 0.11456473916769028,
                            ease: "back.out(1)"
                        },"desklights")
                        .to(
                            this.roomChildren.whiteboard.scale,
                            {
                                x:-0.40429970622062683,
                                y:-0.7356520891189575,
                                z:-0.7356520891189575,
                                ease: "back.out(1)"
                            })
                            .to(
                                this.roomChildren.shelf_items.scale,
                                {
                                    x:0.06727652996778488,
                                    y:0.06727652996778488,
                                    z:0.06727652996778488,
                                    ease: "back.out(1)"
                                })
                    .to(".arrow-svg-wrapper", {
                            opacity: 1,
                            onComplete: resolve,
                        })
            
        

        });
    }

    setAssets(){
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));

        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }


}