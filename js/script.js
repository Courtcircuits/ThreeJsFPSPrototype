const scene = new THREE.Scene(); //Ici on crée l'instance d'une scene 
//const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
/*
camera est une camera qui va "observer" la scène
Paramètres :
1. FOV
2. Ratio : Ici, les dimensions de la fenêtre pour l'avoir en plein écran
3. Near : C'est à dire la distance à laquelle l'objet le plus proche sera affiché
4. Far : la distance pour laquelle l'objet le plus éloigné sera affiché

*/

const renderer = new THREE.WebGLRenderer();

const ratio = 1;

renderer.setSize(window.innerWidth / ratio, window.innerHeight / ratio);

renderer.setPixelRatio(window.devicePixelRatio);

renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100vh';
document.body.appendChild(renderer.domElement);//Permet de visualiser le rendu sur la page.




const material = new THREE.MeshPhongMaterial({color: 0x53687E}); //Lui ajoute un material
const materialWithoutLight = new THREE.MeshPhongMaterial({color: 0x53687E, side: THREE.DoubleSide}); //Lui ajoute un material

const wall = new Wall(1,5,20,10,1.5,3,scene);

const walls = [wall];

const color = 0x404040;
const intensity = 2;
//const light = new THREE.DirectionalLight(color, intensity);
const ambientLight = new THREE.AmbientLight(color, intensity);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(color, 1);
scene.add(directionalLight);
directionalLight.position.set(1,4,2);

// const width = 90;  // ui: width
// const height = 90;  // ui: height
// const solGeom = new THREE.PlaneGeometry(width, height);
// const sol = new THREE.Mesh(solGeom, materialWithoutLight);

// sol.position.set(0, -1, 0);

// sol.rotation.x = -Math.PI/2;

const floor = new Floor(90,90,scene);

// scene.add(sol);

scene.background = new THREE.Color(0xDA667B);

const SENSITIVITY = 0.005;
let mouseX = 0;
let mouseY = 0;
let scale = 1;
let compensation = 0;
let isPointerLock = false;
const MOUSECLICK =[false,false];
let click=false;

document.addEventListener("mousedown", (event)=>{
    renderer.domElement.requestPointerLock();
    
    if(!isPointerLock){
        isPointerLock = true;
    }else{
        if(event.buttons===1){
            MOUSECLICK[0]=true;
        }else if(event.buttons===2){
            MOUSECLICK[1]=true;
        }
    }
})
document.addEventListener("mouseup",()=>{
    if(MOUSECLICK[0])MOUSECLICK[0]=false;
    if(MOUSECLICK[1])MOUSECLICK[1]=false;
})

let MOUSEAXIS = [];

document.addEventListener("mousemove", (event) => {
    mouseX-=(event.movementX)*SENSITIVITY;
    //camera.rotation.y = mouseX / scale;
    mouseY-=(event.movementY)*SENSITIVITY;
    //camera.rotation.x = (mouseY) / scale;
    if(mouseY>Math.PI/2){
        mouseY+=event.movementY*SENSITIVITY;
    }else if(mouseY<-Math.PI/2){
        mouseY+=event.movementY*SENSITIVITY;
    }
    
    MOUSEAXIS[1]=mouseY;
    MOUSEAXIS[0]=mouseX;
})

const KEYS = [];

document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "z":
            KEYS[0] = true;

            break;
        case "s":
            KEYS[1] = true;

            break;
        case "q":
            KEYS[2] = true;

            break;
        case "d":
            KEYS[3] = true;

            break;
        case "a":
            KEYS[4] = true;

            break;
        case "e":
            KEYS[5] = true;

            break;
    }

})
let running = true;

document.addEventListener("keypress", (event) => {
    if (event.key === " ") {
        running = !running;
    }
})

document.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "z":
            KEYS[0] = false;

            break;
        case "s":
            KEYS[1] = false;

            break;
        case "q":
            KEYS[2] = false;

            break;
        case "d":
            KEYS[3] = false;

            break;
        case "a":
            KEYS[4] = false;

            break;
        case "e":
            KEYS[5] = false;

            break;
    }
})


const hudGeometry = new THREE.CircleGeometry(0.002,32);
const hudMaterial = new THREE.MeshBasicMaterial({color : 0xFFCAB1});

const armGeometry = new THREE.BoxGeometry(0.25,0.25,0.5);
const armMaterial = new THREE.MeshPhongMaterial({color : 0xF5D3C8});

let player = new Player(new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000), new THREE.Mesh(hudGeometry, hudMaterial), new THREE.Mesh(armGeometry, armMaterial),scene);


const lootList = [new Loot(0,0,4,scene),new Loot(3,0,9,scene)];


function initialization(){
    player.loadAssets(scene);
}

function loop() {
    //console.log(KEYS);
    if (running) {
        if (KEYS[0]) {//front
            player.goFront();
        }
        if (KEYS[1]) {//back
            player.goBack();
        }
        if (KEYS[2]) {//left
            player.goLeft();
        }
        if (KEYS[3]) {//right
            player.goRight();
        }
        if (KEYS[4]) {//up
            player.goUp();
        }
        if (KEYS[5]) {//down
            player.goDown();
        }
        if(MOUSECLICK[0]){//here you manage click event
            player.leftClicked();
        }
        if(MOUSECLICK[1]){
            player.rightClicked();
        }else{
            player.notRightClicked();
        }
        
        player.rotateHead(MOUSEAXIS[1],MOUSEAXIS[0]);


        
    }

}

let now;
const fps = 180;
let then = Date.now();

const animate = ()=>{
    now = Date.now();
    let delta = now-then;
    if(delta>1000/fps){
        then=now;
        loop();
        renderer.render(scene, player.camera);
    }
    requestAnimationFrame(animate);
}

initialization();
animate();