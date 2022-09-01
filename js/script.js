const scene = new THREE.Scene(); //Ici on crée l'instance d'une scene 
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
/*
camera est une camera qui va "observer" la scène
Paramètres :
1. FOV
2. Ratio : Ici, les dimensions de la fenêtre pour l'avoir en plein écran
3. Near : C'est à dire la distance à laquelle l'objet le plus proche sera affiché
4. Far : la distance pour laquelle l'objet le plus éloigné sera affiché

*/

const renderer = new THREE.WebGLRenderer();

const ratio = 5;

renderer.setSize(window.innerWidth / ratio, window.innerHeight / ratio);

renderer.setPixelRatio(window.devicePixelRatio);

renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100vh';
document.body.appendChild(renderer.domElement);//Permet de visualiser le rendu sur la page.



const geometry = new THREE.BoxGeometry(3, 2, 2);//crée l'objet
const material = new THREE.MeshPhongMaterial({color: 0x53687E}); //Lui ajoute un material
const materialWithoutLight = new THREE.MeshPhongMaterial({color: 0x53687E, side: THREE.DoubleSide}); //Lui ajoute un material

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const cube2 = new THREE.Mesh(new THREE.BoxGeometry(1,1,1), material);
scene.add(cube2);
cube2.position.set(2,4,3);

const color = 0x404040;
const intensity = 2;
//const light = new THREE.DirectionalLight(color, intensity);
const ambientLight = new THREE.AmbientLight(color, intensity);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(color, 1);
scene.add(directionalLight);
directionalLight.position.set(1,4,2);

const width = 9;  // ui: width
const height = 9;  // ui: height
const solGeom = new THREE.PlaneGeometry(width, height);
const sol = new THREE.Mesh(solGeom, materialWithoutLight);

sol.position.set(0, -1, 0);
sol.rotation.x = 1.5;
scene.add(sol);


camera.position.set(0,0,2);

const hudGeometry = new THREE.CircleGeometry(0.01,32);
const hudMaterial = new THREE.MeshBasicMaterial({color : 0xFFCAB1});
const hud = new THREE.Mesh(hudGeometry, hudMaterial);

const armGeometry = new THREE.BoxGeometry(0.25,0.25,0.5);
const armMaterial = new THREE.MeshPhongMaterial({color : 0xF5D3C8});
const arm = new THREE.Mesh(armGeometry, armMaterial);

camera.add(arm);
camera.add(hud);
hud.position.set(0,0,-1);
arm.position.set(-0.5,-0.5,-0.4);
arm.rotateZ(1);
scene.add(camera);
scene.background = new THREE.Color(0xDA667B);


function animate() {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

const SENSITIVITY = 0.005;
let mouseX = 0;
let mouseY = 0;
let scale = 1;
let compensation = 0;

camera.rotation.order = "YXZ";

document.addEventListener("click", ()=>{
    renderer.domElement.requestPointerLock();
})

let MOUSE = [];

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
    
    MOUSE[1]=mouseY;
    MOUSE[0]=mouseX;
})

const KEYS = [];

document.addEventListener("keydown", (event) => {
    //console.log(event);
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

const gameLoopHandler = setInterval(gameLoop, 24);

const SPEED = 0.1;

let alt = 0;

function gameLoop() {
    //console.log(KEYS);
    if (running) {
        if (KEYS[0]) {
            camera.translateZ(-SPEED);
            camera.position.y = alt;
        }
        if (KEYS[1]) {
            camera.translateZ(SPEED);
            camera.translateY = 0;
            camera.position.y = alt;
        }
        if (KEYS[2]) {
            camera.translateX(-SPEED);
            camera.position.y = alt;
        }
        if (KEYS[3]) {
            camera.translateX(SPEED);
            camera.position.y = alt;
        }
        if (KEYS[4]) {

            camera.position.y += SPEED;
            alt = camera.position.y;
        }
        if (KEYS[5]) {
            camera.position.y -= SPEED;
            alt = camera.position.y;
        }
        // if(MOUSE[1]>Math.PI/2){
        //     camera.rotation.x=Math.PI/2;
            
        // }else if(MOUSE[1]<-Math.PI/2){
        //     camera.rotation.x=-Math.PI/2;
        // }else{
            
        // }
        camera.rotation.x = MOUSE[1] / scale;
        camera.rotation.y = MOUSE[0] / scale;

        animate();
    }

}