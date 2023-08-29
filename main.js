import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// create a new scene
const scene = new THREE.Scene();

// add a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.z = 20;
camera.position.y = 2;
camera.position.x = 1;


// create a renderer
const renderer= new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Create a point light
const light = new THREE.PointLight(0xC8C0FF, 100,50);
light.position.set(0, 3, -15);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0xC8C0FF, 0.02);
scene.add(ambientLight);

const light1 = new THREE.PointLight(0xC8C0FF, 3,5);
light1.position.set(2, 2, 19);
scene.add(light1);

// Create a custom shader material for gradient color
const material = new THREE.ShaderMaterial({
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        varying vec2 vUv;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        void main() {
          vec3 blendedColor = mix(color1, color2, vUv.y * 2.0);
          blendedColor = mix(blendedColor, color3, vUv.y * 2.0 - 1.0);
          gl_FragColor = vec4(blendedColor, 1.0);
        }
    `,
    uniforms: {
        color1: { value: new THREE.Color(0xFFBADD) },
        color2: { value: new THREE.Color(0xa8c0ff) },
        color3: { value: new THREE.Color(0xffffff) },
    },
});

// create sphere
const geometry1 = new THREE.SphereGeometry(7, 64, 64);
const sphere1 = new THREE.Mesh(geometry1, material);
scene.add(sphere1);
sphere1.position.z = -12;
sphere1.position.y = -1;
sphere1.rotateZ(10)

const geometry2 = new THREE.SphereGeometry(2, 64, 64);
const material2 = new THREE.MeshStandardMaterial({ color: 0x606060 });
const sphere2 = new THREE.Mesh(geometry2, material2);
scene.add(sphere2);
sphere2.position.y = 15;
sphere2.position.x = -7;
sphere2.position.z = -5;

const geometry3 = new THREE.SphereGeometry(3, 64, 64);
const material3 = new THREE.MeshStandardMaterial({ color: 0x606060 });
const sphere3 = new THREE.Mesh(geometry3, material3);
scene.add(sphere3);
sphere3.position.y = 5;
sphere3.position.x = -7;
sphere3.position.z = -5;

const geometry4 = new THREE.SphereGeometry(0.5, 64, 64);
const material4 = new THREE.MeshStandardMaterial({ color: 0x606060 });
const sphere4 = new THREE.Mesh(geometry4, material4);
scene.add(sphere4);
sphere4.position.y = 12;
sphere4.position.x = -3;
sphere4.position.z = -10;

const geometry5 = new THREE.SphereGeometry(1, 64, 64);
const material5 = new THREE.MeshStandardMaterial({ color: 0x606060 });
const sphere5 = new THREE.Mesh(geometry5, material5);
scene.add(sphere5);
sphere5.position.y = 10;
sphere5.position.x = -3;
sphere5.position.z = -15;

const geometry6 = new THREE.SphereGeometry(2.6, 64, 64);
const material6 = new THREE.MeshStandardMaterial({ color: 0x606060 });
const sphere6 = new THREE.Mesh(geometry6, material6);
scene.add(sphere6);
sphere6.position.y = 11;
sphere6.position.x = 12;
sphere6.position.z = -15;

// add crowns

const mercuryOrbit = new THREE.EllipseCurve(0, 0, 9, 9, 0, 2 * Math.PI, false, 0);
const mercuryOrbitPoints = mercuryOrbit.getPoints(100);
const mercuryOrbitGeometry = new THREE.BufferGeometry().setFromPoints(mercuryOrbitPoints);
const mercuryOrbitMaterial = new THREE.LineBasicMaterial({ color: 0xa8c0ff });
const mercuryOrbitLine = new THREE.Line(mercuryOrbitGeometry, mercuryOrbitMaterial);
mercuryOrbitLine.rotateX(29.8);
mercuryOrbitLine.position.y = 15;
mercuryOrbitLine.position.z = -11;
scene.add(mercuryOrbitLine);

const mercuryOrbit1 = new THREE.EllipseCurve(0, 0, 3.2, 3.2, 0, 2 * Math.PI, false, 0);
const mercuryOrbitPoints1 = mercuryOrbit1.getPoints(100);
const mercuryOrbitGeometry1 = new THREE.BufferGeometry().setFromPoints(mercuryOrbitPoints1);
const mercuryOrbitLine1 = new THREE.Line(mercuryOrbitGeometry1, mercuryOrbitMaterial);
mercuryOrbitLine1.rotateX(29.8);
mercuryOrbitLine1.position.y = 11.9;
mercuryOrbitLine1.position.z = -11;
scene.add(mercuryOrbitLine1);

const mercuryOrbit2 = new THREE.EllipseCurve(0, 0, 5, 5, 0, 2 * Math.PI, false, 0);
const mercuryOrbitPoints2 = mercuryOrbit2.getPoints(100);
const mercuryOrbitGeometry2 = new THREE.BufferGeometry().setFromPoints(mercuryOrbitPoints2);
const mercuryOrbitLine2 = new THREE.Line(mercuryOrbitGeometry2, mercuryOrbitMaterial);
mercuryOrbitLine2.rotateX(29.8);
mercuryOrbitLine2.position.y = 10;
mercuryOrbitLine2.position.z = -11;
scene.add(mercuryOrbitLine2);

const mercuryOrbit3 = new THREE.EllipseCurve(0, 0, 12, 12, 0, 2 * Math.PI, false, 0);
const mercuryOrbitPoints3 = mercuryOrbit3.getPoints(100);
const mercuryOrbitGeometry3 = new THREE.BufferGeometry().setFromPoints(mercuryOrbitPoints3);
const mercuryOrbitLine3 = new THREE.Line(mercuryOrbitGeometry3, mercuryOrbitMaterial);
mercuryOrbitLine3.rotateX(29.8);
mercuryOrbitLine3.position.y = 11;
mercuryOrbitLine3.position.z = -11;
scene.add(mercuryOrbitLine3);

const mercuryOrbit4 = new THREE.EllipseCurve(0, 0, 10, 10, 0, 2 * Math.PI, false, 0);
const mercuryOrbitPoints4 = mercuryOrbit4.getPoints(100);
const mercuryOrbitGeometry4 = new THREE.BufferGeometry().setFromPoints(mercuryOrbitPoints4);
const mercuryOrbitLine4 = new THREE.Line(mercuryOrbitGeometry4, mercuryOrbitMaterial);
mercuryOrbitLine4.rotateX(29.8);
mercuryOrbitLine4.position.y = 5;
mercuryOrbitLine4.position.z = -11;
scene.add(mercuryOrbitLine4);

// add desert gltf
const loader = new GLTFLoader();
let gltfModel;
loader.load('scene.gltf', function ( gltf ) {
  gltfModel = gltf.scene;
  gltfModel.scale.set(25, 25, 25);
  gltfModel.position.y = -3;
  scene.add(gltfModel);

  gltf.animations; // Array<THREE.AnimationClip>
  gltf.scene; // THREE.Group
  gltf.scenes; // Array<THREE.Group>
  gltf.cameras; // Array<THREE.Camera>
  gltf.asset; // Object
});

const loader2 = new GLTFLoader();
let model;
loader2.load('ast/scene.gltf', (gltf) => {
  model = gltf.scene;
  scene.add(model);
  
  model.scale.set(0.6, 0.6, 0.6);
  model.position.y= 1.3;
  model.position.x= 2.5;
  model.position.z= 18;
  model.rotation.y = 1.9;
  gltf.animations; // Array<THREE.AnimationClip>
  gltf.scene; // THREE.Group
  gltf.scenes; // Array<THREE.Group>
  gltf.cameras; // Array<THREE.Camera>
  gltf.asset; // Object
  
});

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

const bloomPass = new UnrealBloomPass();
composer.addPass(bloomPass);

// Adjust bloom parameters
bloomPass.strength = 0.15;
bloomPass.radius = 15;
bloomPass.threshold = 0;

// add orbit control
const controls = new OrbitControls(camera, renderer.domElement);


// changes glow brightness on click
let strength = 0.15;
let clicked = false;

document.addEventListener('click', () => {
    clicked = !clicked;

    if (clicked) {
        strength = 0.25;
        model.traverse((node) => {
          if (node.isMesh) {
            node.material.emissive.set(0xC6FFDD); // Set the emissive color to white
            node.material.emissiveIntensity = 2;   // Set the emissive intensity
          }
        });
    } else {
        strength = 0.15;
        model.traverse((node) => {
          if (node.isMesh) {
            node.material.emissive.set(0x000000); // Set emissive color to black or remove it
            node.material.emissiveIntensity = 0;   // Set emissive intensity to 0 or remove it
          }
        });
    }

    bloomPass.strength = strength;
});

const orbitPoint = new THREE.Vector3(0, 0, -11);

function animate(){
  requestAnimationFrame(animate);

  const radius2 = 9;
  const angle2 = Date.now() * 0.0005;
  sphere2.position.x = orbitPoint.x + radius2 * Math.cos(angle2);
  sphere2.position.z = orbitPoint.z + radius2 * Math.sin(angle2);

  const radius3 = 10;
  const angle3 = Date.now() * 0.0003;
  sphere3.position.x = orbitPoint.x + radius3 * Math.cos(angle3);
  sphere3.position.z = orbitPoint.z + radius3 * Math.sin(angle3);

  const radius4 = 3.2;
  const angle4 = Date.now() * 0.00015;
  sphere4.position.x = orbitPoint.x + radius4 * Math.cos(angle4);
  sphere4.position.z = orbitPoint.z + radius4 * Math.sin(angle4);

  const radius5 = 5;
  const angle5 = Date.now() * 0.0007;
  sphere5.position.x = orbitPoint.x + radius5 * Math.cos(angle5);
  sphere5.position.z = orbitPoint.z + radius5 * Math.sin(angle5);

  const radius6 = 12;
  const angle6 = Date.now() * 0.001;
  sphere6.position.x = orbitPoint.x + radius6 * Math.cos(angle6);
  sphere6.position.z = orbitPoint.z + radius6 * Math.sin(angle6);

  
  
  controls.update();
  composer.render();
}

animate();