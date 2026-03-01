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

const midsemSemester = document.getElementById('midsem-semester');
const midsemSgpaInputs = document.getElementById('midsem-sgpa-inputs');
const midsemCalculateBtn = document.getElementById('midsem-calculate');
const midsemResetBtn = document.getElementById('midsem-reset');
const midsemError = document.getElementById('midsem-error');
const midsemAverageGrade = document.getElementById('midsem-average-grade');
const midsemOverallPercentage = document.getElementById('midsem-overall-percentage');

const dgpaCourse = document.getElementById('dgpa-course');
const dgpaY1 = document.getElementById('dgpa-y1');
const dgpaY2 = document.getElementById('dgpa-y2');
const dgpaY3 = document.getElementById('dgpa-y3');
const dgpaY4 = document.getElementById('dgpa-y4');
const dgpaError = document.getElementById('dgpa-error');
const dgpaValue = document.getElementById('dgpa-value');
const dgpaPercentage = document.getElementById('dgpa-percentage');

const cgpaSemesterCount = document.getElementById('cgpa-semester-count');
const cgpaRows = document.getElementById('cgpa-rows');
const cgpaError = document.getElementById('cgpa-error');
const cgpaValue = document.getElementById('cgpa-value');
const cgpaPercentage = document.getElementById('cgpa-percentage');

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
// MID SEM MARKS CALCULATOR
// ============================================

function getMidSemAverageGrade(averageSGPA) {
    if (averageSGPA >= 9) {
        return 'O';
    }
    if (averageSGPA >= 8) {
        return 'E';
    }
    if (averageSGPA >= 7) {
        return 'A';
    }
    if (averageSGPA >= 6) {
        return 'B';
    }
    if (averageSGPA >= 5) {
        return 'C';
    }
    if (averageSGPA >= 4) {
        return 'D';
    }
    return 'F';
}

function createMidSemRows() {
    const semesterCount = parseInt(midsemSemester.value, 10);
    const rows = [];

    for (let semester = 1; semester <= semesterCount; semester++) {
        rows.push(`
            <div class="midsem-row">
                <label for="midsem-sgpa-${semester}">Sem ${semester}:</label>
                <input type="number" id="midsem-sgpa-${semester}" class="midsem-sgpa" min="0" max="10" step="0.01" placeholder="e.g., 8.2">
            </div>
        `);
    }

    midsemSgpaInputs.innerHTML = rows.join('');
}

function resetMidSemResult() {
    midsemError.classList.remove('show');
    midsemAverageGrade.textContent = '--';
    midsemOverallPercentage.textContent = '--%';
}

function updateMidSemCalculation() {
    const semesterInputs = midsemSgpaInputs.querySelectorAll('.midsem-sgpa');
    let total = 0;

    for (const input of semesterInputs) {
        const inputValue = input.value;

        if (!inputValue || !isValidGPA(inputValue)) {
            midsemError.classList.add('show');
            midsemAverageGrade.textContent = '--';
            midsemOverallPercentage.textContent = '--%';
            return;
        }

        total += parseFloat(inputValue);
    }

    const averageSGPA = total / semesterInputs.length;
    const percentage = sgpaToPercentage(averageSGPA);
    const averageGrade = getMidSemAverageGrade(averageSGPA);

    midsemError.classList.remove('show');
    midsemAverageGrade.textContent = averageGrade;
    midsemOverallPercentage.textContent = percentage.toFixed(2) + '%';

    rotationSpeed = 0.005 + (percentage / 1000);
    scaleMultiplier = 0.8 + (percentage / 200);
}

if (midsemSemester && midsemSgpaInputs && midsemCalculateBtn && midsemResetBtn) {
    midsemSemester.addEventListener('change', () => {
        createMidSemRows();
        resetMidSemResult();
    });

    midsemCalculateBtn.addEventListener('click', updateMidSemCalculation);

    midsemResetBtn.addEventListener('click', () => {
        createMidSemRows();
        resetMidSemResult();
    });

    createMidSemRows();
    resetMidSemResult();
}

// ============================================
// DGPA CALCULATOR
// ============================================

const dgpaInputMap = {
    y1: dgpaY1,
    y2: dgpaY2,
    y3: dgpaY3,
    y4: dgpaY4
};

const dgpaRequirements = {
    '4year': ['y1', 'y2', 'y3', 'y4'],
    lateral: ['y2', 'y3', 'y4'],
    '3year': ['y1', 'y2', 'y3'],
    '2year': ['y1', 'y2'],
    '1year': ['y1']
};

function setDGPAVisibleInputs() {
    const selectedCourse = dgpaCourse.value;
    const requiredKeys = dgpaRequirements[selectedCourse] || [];

    document.querySelectorAll('.dgpa-input').forEach(group => {
        const key = group.dataset.key;
        if (requiredKeys.includes(key)) {
            group.classList.remove('hidden-field');
        } else {
            group.classList.add('hidden-field');
        }
    });
}

function calculateDGPAByCourse(course, values) {
    if (course === '4year') {
        return (values.y1 + values.y2 + (1.5 * values.y3) + (1.5 * values.y4)) / 5;
    }
    if (course === 'lateral') {
        return (values.y2 + (1.5 * values.y3) + (1.5 * values.y4)) / 4;
    }
    if (course === '3year') {
        return (values.y1 + values.y2 + values.y3) / 3;
    }
    if (course === '2year') {
        return (values.y1 + values.y2) / 2;
    }
    return values.y1;
}

function updateDGPACalculation() {
    const selectedCourse = dgpaCourse.value;
    const requiredKeys = dgpaRequirements[selectedCourse] || [];
    const values = {};

    let hasInvalidInput = false;
    let hasMissingInput = false;

    requiredKeys.forEach(key => {
        const input = dgpaInputMap[key];
        const inputValue = input.value;

        if (!inputValue) {
            hasMissingInput = true;
            return;
        }

        if (!isValidGPA(inputValue)) {
            hasInvalidInput = true;
            return;
        }

        values[key] = parseFloat(inputValue);
    });

    if (hasInvalidInput) {
        dgpaError.classList.add('show');
        dgpaValue.textContent = '--';
        dgpaPercentage.textContent = '--%';
        return;
    }

    dgpaError.classList.remove('show');

    if (hasMissingInput) {
        dgpaValue.textContent = '--';
        dgpaPercentage.textContent = '--%';
        return;
    }

    const dgpa = calculateDGPAByCourse(selectedCourse, values);
    const percentage = sgpaToPercentage(dgpa);

    dgpaValue.textContent = dgpa.toFixed(2);
    dgpaPercentage.textContent = percentage.toFixed(2) + '%';

    rotationSpeed = 0.005 + (percentage / 1000);
    scaleMultiplier = 0.8 + (percentage / 200);
}

if (dgpaCourse) {
    dgpaCourse.addEventListener('change', () => {
        setDGPAVisibleInputs();
        updateDGPACalculation();
    });

    Object.values(dgpaInputMap).forEach(input => {
        input.addEventListener('input', updateDGPACalculation);
    });

    setDGPAVisibleInputs();
}

// ============================================
// CGPA CALCULATOR
// ============================================

function createCGPASemesterRows() {
    const semesterCount = parseInt(cgpaSemesterCount.value, 10);
    const rowItems = [];

    for (let index = 1; index <= semesterCount; index++) {
        rowItems.push(`
            <div class="cgpa-row">
                <div class="cgpa-row-title">Semester ${index}</div>
                <div class="cgpa-row-inputs">
                    <div class="input-group no-margin">
                        <label for="credit-index-${index}">Credit Index</label>
                        <input type="number" id="credit-index-${index}" class="cgpa-credit-index" data-sem="${index}" min="0" step="0.01" placeholder="e.g., 180">
                    </div>
                    <div class="input-group no-margin">
                        <label for="credits-${index}">Credits</label>
                        <input type="number" id="credits-${index}" class="cgpa-credits" data-sem="${index}" min="0" step="0.01" placeholder="e.g., 24">
                    </div>
                </div>
            </div>
        `);
    }

    cgpaRows.innerHTML = rowItems.join('');
}

function updateCGPACalculation() {
    const creditIndexInputs = cgpaRows.querySelectorAll('.cgpa-credit-index');
    const creditInputs = cgpaRows.querySelectorAll('.cgpa-credits');

    let totalCreditIndex = 0;
    let totalCredits = 0;
    let hasMissingInput = false;
    let hasInvalidInput = false;

    creditIndexInputs.forEach((creditIndexInput, index) => {
        const creditsInput = creditInputs[index];
        const creditIndexValue = creditIndexInput.value;
        const creditsValue = creditsInput.value;

        if (!creditIndexValue || !creditsValue) {
            hasMissingInput = true;
            return;
        }

        const creditIndex = parseFloat(creditIndexValue);
        const credits = parseFloat(creditsValue);

        if (isNaN(creditIndex) || isNaN(credits) || creditIndex < 0 || credits <= 0) {
            hasInvalidInput = true;
            return;
        }

        totalCreditIndex += creditIndex;
        totalCredits += credits;
    });

    if (hasInvalidInput || (hasMissingInput && totalCreditIndex > 0)) {
        cgpaError.classList.add('show');
    } else {
        cgpaError.classList.remove('show');
    }

    if (hasMissingInput || hasInvalidInput || totalCredits <= 0) {
        cgpaValue.textContent = '--';
        cgpaPercentage.textContent = '--%';
        return;
    }

    const cgpa = totalCreditIndex / totalCredits;
    const percentage = sgpaToPercentage(cgpa);

    cgpaValue.textContent = cgpa.toFixed(2);
    cgpaPercentage.textContent = percentage.toFixed(2) + '%';

    rotationSpeed = 0.005 + (percentage / 1000);
    scaleMultiplier = 0.8 + (percentage / 200);
}

if (cgpaSemesterCount && cgpaRows) {
    cgpaSemesterCount.addEventListener('change', () => {
        createCGPASemesterRows();
        cgpaError.classList.remove('show');
        cgpaValue.textContent = '--';
        cgpaPercentage.textContent = '--%';
    });

    cgpaRows.addEventListener('input', updateCGPACalculation);

    createCGPASemesterRows();
}

// ============================================
// NOTICES FETCHING & DISPLAY
// ============================================

async function loadNotices() {
    const container = document.getElementById('notices-container');
    
    try {
        container.innerHTML = '<div class="loading">Loading notices...</div>';
        
        const allNotices = [];
        
        // Fetch from multiple sources
        const sources = [
            { url: 'https://www.makautexam.net/', type: 'exam', name: 'MAKAUT Exam Portal' },
            { url: 'https://makautwb.ac.in/page.php?id=340', type: 'general', name: 'MAKAUT Announcements' },
            { url: 'https://makautexam.net/routine.html', type: 'exam', name: 'Exam Routine' }
        ];
        
        // Fetch notices from all sources
        for (const source of sources) {
            try {
                const response = await fetch(source.url);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                
                // Extract notice links
                const links = doc.querySelectorAll('a[href*=".pdf"], a[href*="makautexam"], a[href*="makautwb"]');
                
                links.forEach(link => {
                    const title = link.textContent.trim();
                    const href = link.getAttribute('href');
                    
                    if (title && href && title.length > 5) {
                        // Check if it's an exam-related notice
                        const isExam = /exam|routine|result|grade|form.fill|enrollment|admit|ca4|ppr/i.test(title);
                        
                        allNotices.push({
                            title,
                            href: href.startsWith('http') ? href : source.url.split('/').slice(0, 3).join('/') + (href.startsWith('/') ? href : '/' + href),
                            isExam,
                            source: source.name,
                            priority: isExam ? 0 : 1
                        });
                    }
                });
            } catch (error) {
                // Skip failed sources silently
            }
        }
        
        if (allNotices.length === 0) {
            container.innerHTML = `
                <div class="error-message">
                    <p>📊 Unable to load notices at the moment</p>
                    <p style="font-size: 0.9rem;">Visit <a href="https://www.makautexam.net/" target="_blank">MAKAUT Exam Portal</a> or <a href="https://makautwb.ac.in/page.php?id=340" target="_blank">MAKAUT Announcements</a></p>
                </div>
            `;
            return;
        }
        
        // Remove duplicates and sort by priority (exam first)
        const uniqueNotices = Array.from(
            new Map(allNotices.map(n => [n.title, n])).values()
        ).sort((a, b) => a.priority - b.priority).slice(0, 30);
        
        // Create notice elements
        container.innerHTML = uniqueNotices.map((notice, index) => {
            const isNew = index < 8;
            const badge = notice.isExam ? '📝 EXAM' : '📌';
            return `
                <div class="notice-item" ${notice.isExam ? 'style="border-left-color: #ff6b6b;"' : ''}>
                    <div class="notice-title">
                        <span style="color: ${notice.isExam ? '#ff6b6b' : '#00f5ff'}; margin-right: 8px; font-size: 0.9rem; font-weight: bold;">${badge}</span>
                        ${notice.title}
                        ${isNew ? '<span style="color: #ffd93d; font-size: 0.7rem; margin-left: auto; background: rgba(255,217,61,0.2); padding: 2px 6px; border-radius: 4px;">NEW</span>' : ''}
                    </div>
                    <div style="font-size: 0.8rem; color: #7eb3ff; margin: 8px 0;">📍 ${notice.source}</div>
                    <a href="${notice.href}" target="_blank" class="notice-link">📥 Download / View</a>
                </div>
            `;
        }).join('');
        
    } catch (error) {
        console.error('Error loading notices:', error);
        container.innerHTML = `
            <div class="error-message">
                <p>⚠️ Error loading notices</p>
                <p style="font-size: 0.9rem;">Visit <a href="https://www.makautexam.net/" target="_blank">MAKAUT Exam Portal</a></p>
            </div>
        `;
    }
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
    
    // If on notices page, load notices
    if (pageName === 'notices') {
        loadNotices();
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

// Initialize first page as active
switchPage('sgpa');
