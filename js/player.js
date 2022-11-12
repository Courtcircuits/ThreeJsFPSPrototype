//camera
//hud -> curseur
//bras




//raycaster -> loot
const SPEED = 0.1;
let alt = 0;


class Player {
    constructor(camera, hud, arm, scene) {
        this.camera = camera;
        this.hud = hud;
        this.arm = arm;
        this.scene = scene;
        this.raycasterTarget = new THREE.Raycaster();
        this.box = new THREE.Mesh(new THREE.BoxGeometry(1, 2, 1),
            new THREE.MeshPhongMaterial({color: 0x0000ff}));
        this.boxCollider = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
        this.scoreElement = document.getElementById("score");
        this.score= 0;
        this.GRAVITYPOWER = 0.05;
        this.collides = false;
    }

    loadAssets(scene) {
        this.camera.position.set(0, 0, 2);
        this.camera.rotation.order = "YXZ";

        this.camera.add(this.arm);

        this.camera.add(this.hud);
        this.hud.position.set(0, 0, -0.1);
        this.arm.position.set(-0.5, -0.5, -0.4);
        this.arm.rotateZ(1);
        this.boxCollider.setFromObject(this.box);
        scene.add(this.camera);
        scene.add(this.box);

    }

    rotateHead(x, y) {
        let scale = 1;
        this.camera.rotation.x = x / scale;
        this.camera.rotation.y = y / scale;
    }

    checkCollisions() {
        
        
    }
    gotHit(){
        this.score++;
        this.scoreElement.innerHTML = this.score.toString();
    }

    
    goFront() {
        this.historic = this.camera.position;
        this.camera.translateZ(-SPEED);
        this.camera.position.y = alt;
        this.move();
        if(this.collides){
            this.camera.position.x = this.historic.x;
            this.camera.position.y = this.historic.y;
            this.camera.position.z = this.historic.z;
            this.move();
        }
    }

    goBack() {
        this.historic = this.camera.position;
        this.camera.translateZ(SPEED);
        this.camera.position.y = alt;
        this.move();
        if(this.collides){
            this.camera.position.x = this.historic.x;
            this.camera.position.y = this.historic.y;
            this.camera.position.z = this.historic.z;
            this.move();
        }
    }

    goLeft() {
        this.historic = this.camera.position;
        this.camera.translateX(-SPEED);
        this.camera.position.y = alt;
        this.move();
        if(this.collides){
            this.camera.position.x = this.historic.x;
            this.camera.position.y = this.historic.y;
            this.camera.position.z = this.historic.z;
            this.move();
        }
    }

    goRight() {
        this.historic = this.camera.position;
        this.camera.translateX(SPEED);
        this.camera.position.y = alt;
        this.move();
        if(this.collides){
            this.camera.position.x = this.historic.x;
            this.camera.position.y = this.historic.y;
            this.camera.position.z = this.historic.z;
            this.move();
        }
    }

    goUp() {
        this.camera.position.y += SPEED;
        alt = this.camera.position.y;
        this.move();
    }

    goDown() {

        this.camera.position.y -= SPEED;
        alt = this.camera.position.y;
        this.move();
    }
    move() {
        this.box.position.y = this.camera.position.y;
        this.box.position.x = this.camera.position.x;
        this.box.position.z = this.camera.position.z;
       
        this.boxCollider.copy(this.box.geometry.boundingBox).applyMatrix4(this.box.matrixWorld); //line for moving colliding object
        this.checkCollisions();
    }


    leftClicked() {
        this.arm.rotation.z += 1;

        this.raycasterTarget.setFromCamera(new THREE.Vector2(0, 0), this.camera);
        const intersects = this.raycasterTarget.intersectObjects(this.scene.children);
        if (intersects.length > 1) {
            if (intersects[1].object.uuid != this.hud.uuid) {
                //intersects[ 1 ].object.material.color.set( 0xff0000 );
                //console.log(intersects[1]);
            }
        }
    }

    rightClicked() {
        this.camera.zoom = 2;
        this.camera.updateProjectionMatrix();
    }

    notRightClicked() {
        this.camera.zoom = 1;
        this.camera.updateProjectionMatrix();
    }

    fall(){//gravity management
        
        this.camera.position.y-=this.GRAVITYPOWER;
        alt = this.camera.position.y;
        this.move();
    }
    retain(){
        this.camera.position.y+=this.GRAVITYPOWER;
        alt = this.camera.position.y;
        this.move();
    }
}