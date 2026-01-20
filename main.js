import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.158.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.158.0/examples/jsm/loaders/GLTFLoader.js";

const canvas = document.getElementById("viewer");

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Camera
const camera = new THREE.PerspectiveCamera(
  45,
  canvas.clientWidth / canvas.clientHeight,
  0.1,
  100
);
camera.position.set(0, 0, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(canvas.clientWidth, canvas.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lights
scene.add(new THREE.AmbientLight(0xffffff, 1.2));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Debug helper
scene.add(new THREE.AxesHelper(2));

// Load model
const loader = new GLTFLoader();
loader.load("models/model.glb", (gltf) => {
  const model = gltf.scene;

  // Force visibility
  model.traverse((child) => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: 0xcccccc,
        metalness: 0.2,
        roughness: 0.6,
      });
      child.visible = true;
    }
  });

  // Compute bounding box
  const box = new THREE.Box3().setFromObject(model);
  console.log("Bounding box:", box);

  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());

  // 🚨 If size is (0,0,0), your GLB is broken
  console.log("Model size:", size);

  model.position.sub(center);

  const maxDim = Math.max(size.x, size.y, size.z);
  const scale = maxDim === 0 ? 1 : 2 / maxDim;
  model.scale.setScalar(scale);

  scene.add(model);
});

// Resize
window.addEventListener("resize", () => {
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
});

// Render loop
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();
