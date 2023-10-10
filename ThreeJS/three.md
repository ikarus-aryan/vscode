# Three JS


## Creating a Scene in Three.JS

**things to keep in mind ->**
- **set a scene**
- **add a camera**
    - what is does is -> it emits light on the scene that we have created.
    - here we have used `perspective Camera`. There are few different cameras as well.
    - the first attribute is the `field of view`. it describes the screen that is seen on the display. The values is in degrees. If you increase this degree than it will decrease object size on scene
    - second attribute is the `aspect ratio`. here `innerWidth` returns the interior width of the windows in pixels. `innerHeight` returns the interior height of the windows in pixels.
    - The `window` is the global element for all objects, functions, etc.
    - The next two attributes are the `near` and `far` clipping plane. What that means, is that objects further away from the camera than the value of far or closer than near won't be rendered.
- **renderer**
    - now we have to render the scene we have created and for that we need to set the windows size.
    - we can set the scene size as we want considering that whole window size is 100% both height and width.

``````
//creating canvas
const scene = new THREE.Scene();
// set camera 
const camera = new THREE.PerspectiveCamera(120, window.innerWidth/window.innerHeight, 0.1, 1000);
// render the scene
const renderer = new THREE.WebGLRenderer();
// set canavs size
renderer.setSize(window.innerWidth, window.innerHeight);
// append the canvas to doucment
document.body.appendChild(renderer.domElement);
``````

## Adding a cube

**while creating a cube we need ->**
- **BOXGEOMETRY**
    - this is an object that contains all the points `vertices` and fill `faces` of the cube.
    - then we have to add the colour to the object.
    - merge both object and color.
    - add cube to the scene.
    - now this will add both camera and object in the scene because of which we will not see the object.
    - To see the object we need to move camera a bit that we have done by `camera.position.z=5`.

``````
// adding an object
// here three argumets are (L,B,H);
const geometry = new THREE.BoxGeometry(1,1,1);
//choosing color
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
//adding color to object
const cube = new THREE.Mesh( geometry, material);

scene.add(cube);//add object and camera at same position
// changing camera postion to see the object.
camera.position.z = 5;
``````

## Rendering the SCENE

- To render our object and scene on the screen we need to create a function for that.  That will render both object and scene on the screen.
- To do this we have used `requestAnimationFrame` that will call renderer to draw scene every time.
- main adv. of using this is it pauses when tab is switched.
``````
//rendering object on screen
function animate(){
    requestAnimationFrame(animate);
    //for rotation animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene,camera);
}
animate();
``````
