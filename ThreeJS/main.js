import * as THREE from 'three';
import WebGL from 'three/addons/capabilities/WebGL.js';

// creating canvas
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//creating object
function create_object(radius){
    const geometry = new THREE.SphereGeometry(radius,32,32);
    const textureLoader = new THREE.TextureLoader();
    const gradientTexture = textureLoader.load('/img/gradient.jpg');
    const material = new THREE.MeshBasicMaterial({ map: gradientTexture });
    return (new THREE.Mesh( geometry, material));
}

//sun
const sun = create_object(8);
scene.add(sun);

//mercury
const mercury = create_object(0.8);
scene.add(mercury);

// venus
const venus = create_object(1);
scene.add(venus);

// earth
const earth = create_object(1.3);
scene.add(earth);

//camera angle
camera.position.z = 80;
camera.position.x = 1;
camera.position.y = 1;

//rotating camera
let isDragging = false;
let previousMousePosition = {
    x: 0,
    y: 0
};

// Add event listeners to the renderer element
renderer.domElement.addEventListener('mousedown', (event) => {
    isDragging = true;
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

renderer.domElement.addEventListener('mouseup', () => {
    isDragging = false;
});

renderer.domElement.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    const deltaMove = {
        x: event.clientX - previousMousePosition.x,
        y: event.clientY - previousMousePosition.y
    };

    // Adjust these values to control the sensitivity of the camera rotation
    const rotationSpeed = 0.001;
    
    // Update camera rotation based on mouse movement
    camera.rotation.x -= deltaMove.y * rotationSpeed;
    camera.rotation.y -= deltaMove.x * rotationSpeed;

    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

// Animation variables
//mercury
let ma = 0;
const mr = 10;

//venus
let va = 0;
const vr = 17;

//earth
let ea = 0;
const er = 25;

//rendering object on screen
function animate(){
    requestAnimationFrame(animate);

    sun.rotation.y += 0.01;

    const x = mr * Math.cos(ma);
    const z = mr * Math.sin(ma);
    mercury.position.set(x, 0, z);
    mercury.rotation.y += 0.01;
    ma += 0.01;

    const x1 = vr * Math.cos(va);
    const z1 = vr * Math.sin(va);
    venus.rotation.y += 0.01;
    venus.position.set(x1,0,z1);
    va += 0.005;

    const x2 = er * Math.cos(ea);
    const z2 = er * Math.sin(ea);
    earth.rotation.y += 0.01;
    earth.position.set(x2,0,z2);
    ea += 0.0057;
    //rotating camera
    const forwardVector = new THREE.Vector3(0, 0, -1);
    forwardVector.applyQuaternion(camera.quaternion);
    const target = new THREE.Vector3().addVectors(camera.position, forwardVector);
    camera.lookAt(target);

    renderer.render(scene,camera);
}
animate();


// const vertices = [];

// for ( let i = 0; i < 10000; i ++ ) {
// 	const x = THREE.MathUtils.randFloatSpread( 2000 );
// 	const y = THREE.MathUtils.randFloatSpread( 2000 );
// 	const z = THREE.MathUtils.randFloatSpread( 2000 );

// 	vertices.push( x, y, z );
// }

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
// const material = new THREE.PointsMaterial( { color: 0x888888 } );
// const points = new THREE.Points( geometry, material );
// scene.add( points );
