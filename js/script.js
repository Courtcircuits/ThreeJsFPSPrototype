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


renderer.setSize(window.innerWidth / 10, window.innerHeight / 10);

renderer.setPixelRatio(window.devicePixelRatio);

renderer.domElement.style.width = '100%';
renderer.domElement.style.height = '100vh';
document.body.appendChild(renderer.domElement);//Permet de visualiser le rendu sur la page.

const geometry = new THREE.BoxGeometry(3, 2, 2);//crée l'objet
const material = new THREE.MeshPhongMaterial({color: 0x53687E}); //Lui ajoute un material
const materialWithoutLight = new THREE.MeshPhongMaterial({color: 0x53687E, side: THREE.DoubleSide}); //Lui ajoute un material

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const color = 0xF5DDDD;
const intensity = 1;
const light = new THREE.DirectionalLight(color, intensity);
light.position.set(-1, 2, 4);
scene.add(light);

const width = 9;  // ui: width
const height = 9;  // ui: height
const solGeom = new THREE.PlaneGeometry(width, height);
const sol = new THREE.Mesh(solGeom, materialWithoutLight);

sol.position.set(0, -1, 0);
sol.rotation.x = 1.5;
scene.add(sol);


camera.position.z = 5;
camera.position.x = 0;
camera.position.y = 0;


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

const SENSITIVITY = -3;
let mouseX = 0;
let mouseY = 0;
let scale = 1;

camera.rotation.order = "YXZ";

document.addEventListener("mousemove", (event) => {

    mouseX = -(event.clientX / renderer.domElement.clientWidth) * Math.PI * 2 + Math.PI;
    mouseY = -(event.clientY / renderer.domElement.clientHeight) * 4 + 2;


    console.log(Math.sin(mouseY));

    camera.rotation.x = mouseY / scale;
    camera.rotation.y = mouseX / scale;

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


        animate();
    }

}