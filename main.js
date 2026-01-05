import * as THREE from 'three';

// ============================================
// THREE.JS 3D VISUALIZATION SETUP
// ============================================

const canvasContainer = document.getElementById('canvas-container');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 8;

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
canvasContainer.appendChild(renderer.domElement);

// Create multiple spheres for visualization
const spheres = [];
const sphereCount = 20;

for (let i = 0; i < sphereCount; i++) {
    const geometry = new THREE.SphereGeometry(0.3, 32, 32);
    const material = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(i / sphereCount, 0.7, 0.6),
        emissive: new THREE.Color().setHSL(i / sphereCount, 0.5, 0.3),
        transparent: true,
        opacity: 0.8
    });
    const sphere = new THREE.Mesh(geometry, material);
    
    // Position spheres in a circle
    const angle = (i / sphereCount) * Math.PI * 2;
    const radius = 4;
    sphere.position.x = Math.cos(angle) * radius;
    sphere.position.y = Math.sin(angle) * radius;
    sphere.position.z = Math.sin(i) * 2;
    
    sphere.userData = { 
        originalX: sphere.position.x,
        originalY: sphere.position.y,
        originalZ: sphere.position.z,
        angle: angle,
        index: i
    };
    
    scene.add(sphere);
    spheres.push(sphere);
}

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0xffffff, 1, 100);
pointLight1.position.set(5, 5, 5);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0xff00ff, 0.5, 100);
pointLight2.position.set(-5, -5, 5);
scene.add(pointLight2);

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation variables
let rotationSpeed = 0.005;
let scaleMultiplier = 1;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    spheres.forEach((sphere, index) => {
        // Rotate around center
        sphere.userData.angle += rotationSpeed;
        const radius = 4 * scaleMultiplier;
        sphere.position.x = Math.cos(sphere.userData.angle) * radius;
        sphere.position.y = Math.sin(sphere.userData.angle) * radius;
        sphere.position.z = Math.sin(sphere.userData.angle * 2 + index) * 2;
        
        // Individual rotation
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
    });
    
    renderer.render(scene, camera);
}

animate();

// ============================================
// CALCULATOR LOGIC
// ============================================

// Get DOM elements
const sgpaInput = document.getElementById('sgpa-input');
const sgpaPercentage = document.getElementById('sgpa-percentage');
const sgpaError = document.getElementById('sgpa-error');

const sgpaOdd = document.getElementById('sgpa-odd');
const sgpaEven = document.getElementById('sgpa-even');
const ygpaValue = document.getElementById('ygpa-value');
const ygpaPercentage = document.getElementById('ygpa-percentage');
const oddError = document.getElementById('odd-error');
const evenError = document.getElementById('even-error');

// ============================================
// CONVERSION FORMULAS
// ============================================

/**
 * Convert SGPA to Percentage
 * Formula: Percentage = (SGPA - 0.75) × 10
 */
function sgpaToPercentage(sgpa) {
    return (sgpa - 0.75) * 10;
}

/**
 * Calculate YGPA from Odd and Even semester SGPA
 * Formula: YGPA = (SGPA_odd + SGPA_even) / 2
 */
function calculateYGPA(sgpaOdd, sgpaEven) {
    return (sgpaOdd + sgpaEven) / 2;
}

/**
 * Convert YGPA to Percentage
 * Formula: Percentage = (YGPA - 0.75) × 10
 */
function ygpaToPercentage(ygpa) {
    return (ygpa - 0.75) * 10;
}

/**
 * Validate SGPA/YGPA input (must be between 0 and 10)
 */
function isValidGPA(value) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= 0 && num <= 10;
}

// ============================================
// SGPA TO PERCENTAGE CALCULATOR
// ============================================

function updateSGPACalculation() {
    const sgpa = sgpaInput.value;
    
    if (!sgpa) {
        sgpaPercentage.textContent = '--%';
        sgpaError.classList.remove('show');
        return;
    }
    
    if (!isValidGPA(sgpa)) {
        sgpaError.classList.add('show');
        sgpaPercentage.textContent = '--%';
        return;
    }
    
    sgpaError.classList.remove('show');
    const percentage = sgpaToPercentage(parseFloat(sgpa));
    sgpaPercentage.textContent = percentage.toFixed(2) + '%';
    
    // Update 3D visualization based on percentage
    rotationSpeed = 0.005 + (percentage / 1000);
    scaleMultiplier = 0.8 + (percentage / 200);
}

sgpaInput.addEventListener('input', updateSGPACalculation);

// ============================================
// YGPA CALCULATOR
// ============================================

function updateYGPACalculation() {
    const odd = sgpaOdd.value;
    const even = sgpaEven.value;
    
    let hasError = false;
    
    // Validate odd semester SGPA
    if (odd && !isValidGPA(odd)) {
        oddError.classList.add('show');
        hasError = true;
    } else {
        oddError.classList.remove('show');
    }
    
    // Validate even semester SGPA
    if (even && !isValidGPA(even)) {
        evenError.classList.add('show');
        hasError = true;
    } else {
        evenError.classList.remove('show');
    }
    
    // Calculate only if both values are present and valid
    if (!odd || !even || hasError) {
        ygpaValue.textContent = '--';
        ygpaPercentage.textContent = '--%';
        return;
    }
    
    const ygpa = calculateYGPA(parseFloat(odd), parseFloat(even));
    const percentage = ygpaToPercentage(ygpa);
    
    ygpaValue.textContent = ygpa.toFixed(2);
    ygpaPercentage.textContent = percentage.toFixed(2) + '%';
    
    // Update 3D visualization
    rotationSpeed = 0.005 + (percentage / 1000);
    scaleMultiplier = 0.8 + (percentage / 200);
    
    // Update sphere colors based on YGPA
    spheres.forEach((sphere, index) => {
        const hue = (ygpa / 10 + index / sphereCount) % 1;
        sphere.material.color.setHSL(hue, 0.7, 0.6);
        sphere.material.emissive.setHSL(hue, 0.5, 0.3);
    });
}

sgpaOdd.addEventListener('input', updateYGPACalculation);
sgpaEven.addEventListener('input', updateYGPACalculation);

// ============================================
// INITIALIZATION
// ============================================

console.log('🎓 GPAx Calculator Initialized');
console.log('Formulas:');
console.log('- SGPA → Percentage: (SGPA - 0.75) × 10');
console.log('- YGPA: (Odd + Even) / 2');
console.log('- YGPA → Percentage: (YGPA - 0.75) × 10');
