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
const nav = document.querySelector('nav');
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

// ============================================
// PAGE NAVIGATION
// ============================================

function switchPage(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.page === pageName) {
            btn.classList.add('active');
        }
    });
    
    // If on results page, update the results display
    if (pageName === 'results') {
        updateResultsPage();
    }
}

function updateResultsPage() {
    const sgpaInput = document.getElementById('sgpa-input');
    const sgpaOddInput = document.getElementById('sgpa-odd');
    const sgpaEvenInput = document.getElementById('sgpa-even');
    
    const sgpaValue = sgpaInput.value;
    const oddValue = sgpaOddInput.value;
    const evenValue = sgpaEvenInput.value;
    
    // Update SGPA results
    if (sgpaValue) {
        const sgpaPercent = ((sgpaValue - 0.75) * 10).toFixed(2);
        document.getElementById('result-sgpa').textContent = parseFloat(sgpaValue).toFixed(2);
        document.getElementById('result-sgpa-percent').textContent = sgpaPercent;
    } else {
        document.getElementById('result-sgpa').textContent = '-';
        document.getElementById('result-sgpa-percent').textContent = '-';
    }
    
    // Update YGPA results
    if (oddValue && evenValue) {
        const ygpa = ((parseFloat(oddValue) + parseFloat(evenValue)) / 2).toFixed(2);
        const ygpaPercent = ((ygpa - 0.75) * 10).toFixed(2);
        document.getElementById('result-ygpa').textContent = ygpa;
        document.getElementById('result-ygpa-percent').textContent = ygpaPercent;
        
        // Update performance bar
        const performancePercent = Math.min(parseFloat(ygpaPercent), 100);
        const performanceBar = document.getElementById('performance-bar');
        performanceBar.style.width = performancePercent + '%';
        
        // Show congratulations for good marks (>80%)
        showCongratulations(parseFloat(ygpaPercent));
        updatePerformanceText(parseFloat(ygpaPercent));
    } else {
        document.getElementById('result-ygpa').textContent = '-';
        document.getElementById('result-ygpa-percent').textContent = '-';
        document.getElementById('performance-bar').style.width = '0%';
        document.getElementById('congratulations-container').innerHTML = '';
        document.getElementById('performance-text').textContent = 'Ready to calculate...';
    }
}

function showCongratulations(percentage) {
    const container = document.getElementById('congratulations-container');
    
    let message = '';
    let emojis = '';
    
    if (percentage >= 90) {
        message = '🌟 Outstanding Performance! 🌟';
        emojis = '🎉 ⭐ 🏆';
    } else if (percentage >= 80) {
        message = '🎊 Excellent Work! 🎊';
        emojis = '🎉 ✨ 👏';
    } else if (percentage >= 70) {
        message = '👍 Great Job! 👍';
        emojis = '😊 💪 👏';
    } else if (percentage >= 60) {
        message = '📈 Good Effort! Keep Improving 📈';
        emojis = '💫 🚀 🎯';
    } else {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = `
        <div class="congratulations">
            <div>
                ${emojis.split(' ').map(e => `<span class="congratulations-emoji">${e}</span>`).join('')}
            </div>
            <h2>${message}</h2>
            <p>Your performance score: <strong>${percentage.toFixed(2)}%</strong></p>
            <p>Keep working hard to achieve your goals!</p>
        </div>
    `;
}

function updatePerformanceText(percentage) {
    const textElement = document.getElementById('performance-text');
    
    if (percentage >= 90) {
        textElement.textContent = '⭐ Outstanding - Exceptional performance!';
        textElement.style.color = '#00f5ff';
    } else if (percentage >= 80) {
        textElement.textContent = '✨ Excellent - Keep it up!';
        textElement.style.color = '#7eb3ff';
    } else if (percentage >= 70) {
        textElement.textContent = '👍 Good - On the right track!';
        textElement.style.color = '#a8e6cf';
    } else if (percentage >= 60) {
        textElement.textContent = '📈 Satisfactory - Room for improvement!';
        textElement.style.color = '#ffd93d';
    } else {
        textElement.textContent = '💪 Keep pushing forward!';
        textElement.style.color = '#ff6b6b';
    }
}

// Setup navigation event listeners
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        switchPage(btn.dataset.page);
        // Close hamburger menu on mobile
        const hamburger = document.getElementById('hamburger');
        const navLinks = document.getElementById('nav-links');
        if (hamburger && hamburger.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
});

// ============================================
// MOBILE HAMBURGER MENU
// ============================================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// ============================================
// INITIALIZATION
// ============================================

console.log('🎓 GPAx Calculator Initialized');
console.log('Formulas:');
console.log('- SGPA → Percentage: (SGPA - 0.75) × 10');
console.log('- YGPA: (Odd + Even) / 2');
console.log('- YGPA → Percentage: (YGPA - 0.75) × 10');

// Initialize first page as active
switchPage('sgpa');
