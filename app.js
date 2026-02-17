// State Management
const state = {
    currentPath: [], // ['O/L Commerce', 'Grade 10', 'Notes']
    data: {
        'O/L Commerce': {
            'Grade 10': {
                'Notes': [],
                'Model Papers': [],
                'Unit Papers (Online)': [],
                'Videos': []
            },
            'Grade 11': {
                'Notes': [],
                'Model Papers': [],
                'Unit Papers (Online)': [],
                'Videos': []
            }
        },
        'A/L Accounting': {} // Will generate 16 lessons dynamically
    }
};

// Initialize Data
function init() {
    checkAuth();
    // Generate 16 lessons for A/L Accounting
    for (let i = 1; i <= 16; i++) {
        state.data['A/L Accounting'][`Lesson ${i}`] = {
            'Notes': [],
            'Unit Papers (Online)': [],
            'Videos': []
        };
    }

    // Load data from local storage if valid
    const savedData = localStorage.getItem('lmsData');
    if (savedData) {
        try {
            const parsed = JSON.parse(savedData);
            // Simple merge or replacement. For now, replace if structure matches roughly
            if (parsed['O/L Commerce']) state.data = parsed;
        } catch (e) {
            console.error("Data load error", e);
        }
    }

    renderHome();
}

// Navigation Functions
function navigateTo(view, param) {
    const main = document.getElementById('main-content');

    if (view === 'home') {
        state.currentPath = [];
        renderHome();
    } else if (view === 'subject') {
        state.currentPath = [param];
        if (param === 'O/L Commerce') renderGrades();
        else renderLessons();
    } else if (view === 'grade') {
        state.currentPath.push(param);
        renderCategories();
    } else if (view === 'category') {
        state.currentPath.push(param);
        renderFiles();
    }

    updateBreadcrumb();
}

function goBack() {
    state.currentPath.pop();
    const depth = state.currentPath.length;
    const subject = state.currentPath[0];

    if (depth === 0) renderHome();
    else if (depth === 1) {
        if (subject === 'O/L Commerce') renderGrades();
        else renderLessons();
    }
    else if (depth === 2) renderCategories();
}

// Rendering Functions
function renderHome() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div style="text-align: center; margin-bottom: 3rem;">
            <h2>Welcome to Smart Learning</h2>
            <p style="color: var(--text-muted);">Select your stream to start learning</p>
        </div>
        <div class="grid-container">
            <div class="card" onclick="navigateTo('subject', 'O/L Commerce')">
                <div class="card-icon"><i class="fa-solid fa-chart-line"></i></div>
                <h3>O/L Commerce</h3>
                <p>Grade 10 & 11 Commerce content including Notes, Papers & Videos.</p>
            </div>
            <div class="card" onclick="navigateTo('subject', 'A/L Accounting')">
                <div class="card-icon"><i class="fa-solid fa-calculator"></i></div>
                <h3>A/L Accounting</h3>
                <p>Complete A/L Accounting syllabus covering all 16 lessons.</p>
            </div>
        <div class="about-commerce">
            <h3>වාණිජ විද්‍යාව සහ ඔබේ අනාගතය</h3>
            <p>
                වාණිජ විද්‍යාව (Commerce) යනු හුදෙක් විෂයක් පමණක් නොව, එය නූතන ව්‍යාපාරික ලෝකයේ ජීවනාලියයි. 
                ආර්ථිකය, ගිණුම්කරණය සහ ව්‍යාපාර අධ්‍යයනය තුළින් ඔබේ අනාගතය සාර්ථක කරගැනීමට නිවැරදි අඩිතාලම මෙතැනින් සකසාගන්න.
            </p>
        </div>

        <div class="footer-socials">
            <a href="https://www.facebook.com/share/17ELWaTkaP/" target="_blank" class="social-item">
                <i class="fa-brands fa-facebook"></i>
                <div class="social-text">
                    <span class="label">Follow on Facebook</span>
                    <span class="value">Nirosh Mallawaarachchi</span>
                </div>
            </a>
            <a href="https://www.tiktok.com/@niroshmallawaarachchi?_r=1&_t=ZS-93zmDObU1h7" target="_blank" class="social-item">
                <i class="fa-brands fa-tiktok"></i>
                <div class="social-text">
                    <span class="label">Follow on TikTok</span>
                    <span class="value">Nirosh Mallawaarachchi</span>
                </div>
            </a>
            <a href="https://youtube.com/@niroshmallawaarachchi?si=slVnqR-ImeWoWhwR" target="_blank" class="social-item">
                <i class="fa-brands fa-youtube"></i>
                <div class="social-text">
                    <span class="label">Subscribe on YouTube</span>
                    <span class="value">Nirosh Mallawaarachchi</span>
                </div>
            </a>
            <a href="https://wa.me/94717315117" target="_blank" class="social-item">
                <i class="fa-brands fa-whatsapp"></i>
                <div class="social-text">
                    <span class="label">Contact via WhatsApp</span>
                    <span class="value">071-7315117</span>
                </div>
            </a>
        </div>
    `;
    updateBreadcrumb();
}

function renderGrades() {
    const main = document.getElementById('main-content');
    main.innerHTML = `
        <div class="action-bar">
            <div class="breadcrumb" id="breadcrumb"></div>
            <button class="primary-btn" onclick="goBack()"><i class="fa-solid fa-arrow-left"></i> Back</button>
        </div>
        <div class="grid-container">
            <div class="card" onclick="navigateTo('grade', 'Grade 10')">
                <div class="card-icon"><i class="fa-solid fa-user-graduate"></i></div>
                <h3>Grade 10</h3>
                <p>Foundations of Commerce</p>
            </div>
            <div class="card" onclick="navigateTo('grade', 'Grade 11')">
                <div class="card-icon"><i class="fa-solid fa-certificate"></i></div>
                <h3>Grade 11</h3>
                <p>Advanced O/L Preparation</p>
            </div>
        </div>
    `;
    updateBreadcrumb();
}

function renderLessons() {
    const main = document.getElementById('main-content');
    let lessonsHtml = '';

    for (let i = 1; i <= 16; i++) {
        lessonsHtml += `
            <div class="folder-item" onclick="navigateTo('grade', 'Lesson ${i}')">
                <div class="folder-icon"><i class="fa-regular fa-folder-open"></i></div>
                <h3>Lesson ${i}</h3>
            </div>
        `;
    }

    main.innerHTML = `
        <div class="action-bar">
            <div class="breadcrumb" id="breadcrumb"></div>
            <button class="primary-btn" onclick="goBack()"><i class="fa-solid fa-arrow-left"></i> Back</button>
        </div>
        <div class="folder-grid">
            ${lessonsHtml}
        </div>
    `;
    updateBreadcrumb();
}

function renderCategories() {
    // Current Path: [Subject, Grade/Lesson]
    const subject = state.currentPath[0];
    const unit = state.currentPath[1];
    const categories = Object.keys(state.data[subject][unit]);

    const main = document.getElementById('main-content');

    let html = `
        <div class="action-bar">
            <div class="breadcrumb" id="breadcrumb"></div>
            <button class="primary-btn" onclick="goBack()"><i class="fa-solid fa-arrow-left"></i> Back</button>
        </div>
        <div class="grid-container">
    `;

    categories.forEach(cat => {
        let icon = 'fa-file';
        if (cat.includes('Video')) icon = 'fa-play-circle';
        if (cat.includes('Notes')) icon = 'fa-book';
        if (cat.includes('Paper')) icon = 'fa-file-signature';

        html += `
            <div class="card" onclick="navigateTo('category', '${cat}')">
                <div class="card-icon"><i class="fa-solid ${icon}"></i></div>
                <h3>${cat}</h3>
                <p>${state.data[subject][unit][cat].length} Files</p>
            </div>
        `;
    });

    html += `</div>`;
    main.innerHTML = html;
    updateBreadcrumb();
}

function renderFiles() {
    const subject = state.currentPath[0];
    const unit = state.currentPath[1];
    const category = state.currentPath[2];
    const files = state.data[subject][unit][category];

    const main = document.getElementById('main-content');

    let fileListHtml = files.length ? '' : '<p style="text-align:center; color:var(--text-muted); padding: 2rem;">No content uploaded yet.</p>';

    files.forEach((file, index) => {
        let iconClass = 'fa-file';
        if (category === 'Videos') iconClass = 'fa-video';

        fileListHtml += `
            <div class="file-item">
                <div class="file-info">
                    <div class="file-type-icon"><i class="fa-solid ${iconClass}"></i></div>
                    <div>
                        <h4>${file.title}</h4>
                        <small style="color: var(--text-muted)">${new Date(file.date).toLocaleDateString()}</small>
                    </div>
                </div>
                <div class="actions">
                    <button class="btn-icon" onclick="downloadFile('${file.url || '#'}')" title="Download"><i class="fa-solid fa-download"></i></button>
                    <button class="btn-icon" onclick="deleteFile(${index})" style="border-color: #ff5252; color: #ff5252;" title="Delete"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });

    main.innerHTML = `
        <div class="action-bar">
            <div class="breadcrumb" id="breadcrumb"></div>
            <div style="display:flex; gap:10px;">
                <button class="primary-btn" onclick="openUploadModal()">
                    <i class="fa-solid fa-cloud-arrow-up"></i> Upload
                </button>
                <button class="primary-btn" onclick="goBack()" style="background:transparent; border:1px solid var(--glass-border);">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
            </div>
        </div>
        <div class="file-list">
            ${fileListHtml}
        </div>
    `;
    updateBreadcrumb();
}

function updateBreadcrumb() {
    const breadcrumb = document.getElementById('breadcrumb');
    if (!breadcrumb) return;

    let html = `<span onclick="navigateTo('home')" style="cursor:pointer">Home</span>`;
    state.currentPath.forEach((item, index) => {
        if (index === 0 && item === 'O/L Commerce') {
            html += ` <i class="fa-solid fa-chevron-right" style="font-size:0.8rem; margin:0 5px;"></i> <span onclick="navigateTo('subject', '${item}')" style="cursor:pointer">${item}</span>`;
        } else if (index === 0 && item === 'A/L Accounting') {
            html += ` <i class="fa-solid fa-chevron-right" style="font-size:0.8rem; margin:0 5px;"></i> <span onclick="navigateTo('subject', '${item}')" style="cursor:pointer">${item}</span>`;
        }
        else if (index === 1) {
            html += ` <i class="fa-solid fa-chevron-right" style="font-size:0.8rem; margin:0 5px;"></i> <span onclick="navigateTo('grade', '${item}')" style="cursor:pointer">${item}</span>`;
        }
        else {
            html += ` <i class="fa-solid fa-chevron-right" style="font-size:0.8rem; margin:0 5px;"></i> ${item}`;
        }
    });
    breadcrumb.innerHTML = html;
}

// Upload Handling
const modal = document.getElementById('upload-modal');
const closeBtn = document.querySelector('.close-modal');
const uploadForm = document.getElementById('upload-form');

function openUploadModal() {
    const categoryInputs = document.getElementById('file-category');
    // Pre-select current category
    const cat = state.currentPath[2];
    if (cat) {
        categoryInputs.innerHTML = `<option value="${cat}">${cat}</option>`;
        document.getElementById('file-type').value = getFileTypeFromCategory(cat);
    }

    modal.classList.remove('hidden');
}

function getFileTypeFromCategory(cat) {
    if (cat.includes('Notes')) return 'notes';
    if (cat.includes('Model')) return 'model_papers';
    if (cat.includes('Unit')) return 'unit_papers';
    if (cat.includes('Video')) return 'videos';
    return 'notes';
}

closeBtn.onclick = () => modal.classList.add('hidden');
window.onclick = (e) => {
    if (e.target === modal) modal.classList.add('hidden');
}

uploadForm.onsubmit = (e) => {
    e.preventDefault();
    const title = document.getElementById('file-title').value;
    const type = document.getElementById('file-type').value; // Just metadata in this mock
    const fileInput = document.getElementById('file-input');

    // In a real app, handle file upload here. 
    // Here we just fake it
    const newItem = {
        title: title,
        date: new Date().toISOString(),
        url: '#', // Placeholder
        type: type
    };

    // Add to state
    const subject = state.currentPath[0];
    const unit = state.currentPath[1];
    const category = state.currentPath[2];

    state.data[subject][unit][category].push(newItem);

    // Save to local storage
    localStorage.setItem('lmsData', JSON.stringify(state.data));

    modal.classList.add('hidden');
    uploadForm.reset();
    renderFiles(); // Refresh view
    alert('File uploaded successfully!');
}

function deleteFile(index) {
    if (confirm('Are you sure you want to delete this file?')) {
        const subject = state.currentPath[0];
        const unit = state.currentPath[1];
        const category = state.currentPath[2];

        state.data[subject][unit][category].splice(index, 1);
        localStorage.setItem('lmsData', JSON.stringify(state.data));
        renderFiles();
    }
}

function downloadFile(url) {
    alert("Functionality to download files would connect to backend here. This is a demo.");
}

function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }
}

// Initial Run
document.addEventListener('DOMContentLoaded', init);
