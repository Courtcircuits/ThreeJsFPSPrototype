//camera
//hud -> curseur
//bras


//raycaster -> loot
const SPEED = 0.1;
let alt = 0;



class Player{
    constructor(camera,hud,arm,scene){
        this.camera=camera;
        this.hud=hud;
        this.arm=arm;
        this.scene=scene;
        this.raycasterTarget = new THREE.Raycaster();
    }
    goFront(){
        this.camera.translateZ(-SPEED);
        this.camera.position.y = alt;
    }
    goBack(){
        this.camera.translateZ(SPEED);
        this.camera.translateY = 0;
        this.camera.position.y = alt;
    }
    loadAssets(){
        this.camera.position.set(0,0,2);
        this.camera.rotation.order = "YXZ";
    
        this.camera.add(this.arm);
        
        this.camera.add(this.hud);
        this.hud.position.set(0,0,-0.1);
        this.arm.position.set(-0.5,-0.5,-0.4);
        this.arm.rotateZ(1);
    }
    rotateHead(x,y){
        let scale =1;
        this.camera.rotation.x = x / scale;
        this.camera.rotation.y = y / scale;
    }
    goLeft(){
        this.camera.translateX(-SPEED);
        this.camera.position.y = alt;
    }
    goRight(){
        this.camera.translateX(SPEED);
        this.camera.position.y = alt;
    }
    goUp(){
        this.camera.position.y += SPEED;
        alt = this.camera.position.y;
    }
    goDown(){
        this.camera.position.y -= SPEED;
        alt = this.camera.position.y;
    }
    leftClicked(){
        this.arm.rotation.z+=1;
        
        this.raycasterTarget.setFromCamera(new THREE.Vector2(0,0),this.camera);
        const intersects = this.raycasterTarget.intersectObjects( this.scene.children );
        if(intersects.length>1){
            if(intersects[1].object.uuid!=this.hud.uuid){
                intersects[ 1 ].object.material.color.set( 0xff0000 );
            }
        }
    }
    rightClicked(){
        this.camera.zoom=2;
        this.camera.updateProjectionMatrix();
    }
    notRightClicked(){
        this.camera.zoom=1;
        this.camera.updateProjectionMatrix();
    }
}











