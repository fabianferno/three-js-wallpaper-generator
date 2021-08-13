import "./fonts/fonts.css";
import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

var url = window.location.href;
if (url.indexOf("?") > -1) {
  const urlParams = new URLSearchParams(window.location.search);
  var text = urlParams.get("text");
  var sub_text = urlParams.get("subtext");
}

document.getElementById("text-holder").innerHTML =
  text !== undefined ? text : "Super Skywalker";
document.getElementById("sub-text-holder").innerHTML =
  sub_text !== undefined ? sub_text : "// THIS TOO SHALL PASS /";
// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/NormalMap.png");

// Debug
//const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Objects
const sphereGeomtry = new THREE.SphereBufferGeometry(0.5, 64, 64);
const torusGeometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);

// Materials
const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.color = new THREE.Color(0x282929);
material.normalMap = normalTexture;

// Mesh
const sphere = new THREE.Mesh(sphereGeomtry, material);
const torus = new THREE.Mesh(torusGeometry, material);

sphere.position.set(0, 0, 0);
torus.position.set(-0.6, -0.2, -0.5);
scene.add(sphere);
scene.add(torus);

// Light 1
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// Light 2
const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-3, 2.13, 0.34);
pointLight2.intensity = 10;
scene.add(pointLight2);

// Constrols GUI
// const light1 = gui.addFolder("Light 1")

// light1.add(pointLight2.position, 'x').min(-3).max(3).step(0.01)
// light1.add(pointLight2.position, 'y').min(-6).max(6).step(0.01)
// light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
// light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

// const pointLightHelper = new THREE.PointLightHelper(pointLight2,1)
// scene.add(pointLightHelper)

// Light 3
const pointLight3 = new THREE.PointLight(0xe1ff, 2);
pointLight3.position.set(3, -4.49, -1.05);
pointLight3.intensity = 3.46;
scene.add(pointLight3);

// Controls GUI
// const light2 = gui.addFolder("Light 2")

// light2.add(pointLight3.position, 'x').min(-3).max(3).step(0.01)
// light2.add(pointLight3.position, 'y').min(-6).max(6).step(0.01)
// light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
// light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

// const light2Color = {
//   color: 0xe1ff
// }

// light2.addColor(light2Color,"color")
//   .onChange(() => {
//     pointLight3.color.set(light2Color.color)
//   })

// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3,1)
// scene.add(pointLightHelper2)

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

// const camera = new THREE.OrthographicCamera(
//   sizes.width / -2,
//   sizes.width / 2,
//   sizes.height / 2,
//   sizes.height / -2,
//   1,
//   1000
// );

camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

//Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

document.addEventListener("mousemove", onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function updateSphere(event) {
  sphere1.position.y = window.scrollY * 0.001;
}

window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.position.z += -0.15 * (targetY - sphere.rotation.x);
  sphere.rotation.z += -0.1 * (targetY - sphere.rotation.x);

  // Update objects
  torus.rotation.y = 0.5 * elapsedTime;

  torus.rotation.y += 0.5 * (targetX - torus.rotation.y);
  torus.rotation.x += 0.05 * (targetY - torus.rotation.x);
  torus.position.z += 0.15 * (targetY - torus.rotation.x);
  torus.rotation.z += -0.1 * (targetY - torus.rotation.x);

  // Update Orbital Controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
