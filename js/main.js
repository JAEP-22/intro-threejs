import * as THREE from 'https://cdn.jsdelivr.net/npm/three@latest/build/three.module.js';

// Configuración básica
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Crear el Sol
const sunGeometry = new THREE.SphereGeometry(2, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
scene.add(sun);

// Crear un planeta
const planetGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const planetMaterial = new THREE.MeshStandardMaterial({ color: 0x0077ff });
const planet = new THREE.Mesh(planetGeometry, planetMaterial);
scene.add(planet);

// Crear una luna
const moonGeometry = new THREE.SphereGeometry(0.2, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({ color: 0xaaaaaa });
const moon = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moon);

// Agregar luz
const pointLight = new THREE.PointLight(0xffffff, 1.5);
pointLight.position.set(0, 0, 0); // Luz centrada en el Sol
scene.add(pointLight);

// Posicionar la cámara
camera.position.z = 10;

// Variables para orbitar
let planetAngle = 0; // Ángulo inicial del planeta
let moonAngle = 0; // Ángulo inicial de la luna

// Animación
function animate() {
    requestAnimationFrame(animate);

    // Orbitar el planeta alrededor del Sol
    planetAngle += 0.01;
    const planetRadius = 5;
    planet.position.x = planetRadius * Math.cos(planetAngle);
    planet.position.z = planetRadius * Math.sin(planetAngle);

    // Orbitar la luna alrededor del planeta
    moonAngle += 0.02;
    const moonRadius = 1;
    moon.position.x = planet.position.x + moonRadius * Math.cos(moonAngle);
    moon.position.z = planet.position.z + moonRadius * Math.sin(moonAngle);

    renderer.render(scene, camera);
}
animate();