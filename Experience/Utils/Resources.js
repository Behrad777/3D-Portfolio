import EventEmitter from "events";
import Experience from "../Experience.js"
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { DRACOLoader } from "three/examples/jsm/Addons.js";
import { FBXLoader } from "three/examples/jsm/Addons.js";

export default class Resources extends EventEmitter{

    constructor(assets){
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;

        this.setLoaders();
        this.startLoading();
        //this.LoadAnimatedModel
        
    }

    setLoaders(){
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }
    startLoading(){
        for (const asset of this.assets) {
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                });
            } 

    }
    }
    

    singleAssetLoaded(asset,file){
        this.items[asset.name] = file;
        this.loaded++;


        if (this.loaded === this.queue) {
            this.emit("ready");
        }
    }
        


}