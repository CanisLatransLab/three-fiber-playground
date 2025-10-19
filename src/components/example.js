import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');
// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// scene
const scene = new THREE.Scene();

// camera
const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 1.5, 6);
camera.lookAt(0, 0, 0);

// controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.target.set(0, 0, 0);

// renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(sizes.width, sizes.height);

renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace; // r150+
renderer.physicallyCorrectLights = true;

// clay material (PBR)
const clayMat = new THREE.MeshPhysicalMaterial({
  color: 0xf2efe9,
  roughness: 0.95,
  metalness: 0.0,
  sheen: 0.2,
  clearcoat: 0.06,
  clearcoatRoughness: 0.6,
  transmission: 0,
});

// sample geometry
const geo = new THREE.SphereGeometry(1, 64, 64);
const mesh = new THREE.Mesh(geo, clayMat);
scene.add(mesh);

// extra geometries
const hexGeo = new THREE.CylinderGeometry(1, 1, 0.3, 6, 1);
const torusGeo = new THREE.TorusGeometry(0.75, 0.25, 32, 96);

// additional objects
const meshL = new THREE.Mesh(hexGeo, clayMat);
meshL.position.x = -2.5;
meshL.rotation.x = Math.PI / 2; // face the camera
scene.add(meshL);

const meshR = new THREE.Mesh(torusGeo, clayMat);
meshR.position.x = 2.5;
scene.add(meshR);

// lighting (important)
const key = new THREE.DirectionalLight(0xffffff, 2.2);
key.position.set(5, 5, 5);
scene.add(key);

const fill = new THREE.HemisphereLight(0xffffff, 0xdedede, 0.7);
scene.add(fill);

const rim = new THREE.DirectionalLight(0xffffff, 1.0);
rim.position.set(-3, 2, -2);
scene.add(rim);

// subtle AO or environment
const env = new THREE.AmbientLight(0xffffff, 0.22);
scene.add(env);

// handle resize
window.addEventListener('resize', () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// render loop
function animate() {
  mesh.rotation.y += 0.003;
  meshL.rotation.z += 0.003;
  meshR.rotation.y += 0.003;
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();
