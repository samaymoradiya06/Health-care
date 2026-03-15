// ===== App State & Initialization =====
let isAuthenticated = false;

function initApp() {
    checkAuth();
    setupMobileMenu();
    updateAuthUI();
}

// ===== Authentication =====
function checkAuth() {
    const user = localStorage.getItem('healthguard_user');
    isAuthenticated = !!user;
}

function updateAuthUI() {
    document.querySelectorAll('.auth-only').forEach(el => {
        el.classList.toggle('hidden', !isAuthenticated);
    });
    document.querySelectorAll('.guest-only').forEach(el => {
        el.classList.toggle('hidden', isAuthenticated);
    });
}

function getCurrentUser() {
    const user = localStorage.getItem('healthguard_user');
    return user ? JSON.parse(user) : null;
}

function switchLoginMode(role) {
    const roleInput = document.getElementById('loginRole');
    if (!roleInput) return;

    roleInput.value = role;

    const tabs = document.querySelectorAll('.auth-tab');
    if (role === 'user') {
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
        document.querySelector('.auth-header h2').textContent = "Welcome Back";
        document.querySelector('.auth-header p').textContent = "Sign in to access your health dashboard";
    } else {
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
        document.querySelector('.auth-header h2').textContent = "Admin Portal";
        document.querySelector('.auth-header p').textContent = "Sign in to manage the platform";
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.getElementById('loginRole') ? document.getElementById('loginRole').value : 'user';

    try {
        const response = await api.login(email, password);

        if (response.user) {
            // Check if user role matches selected role
            if (role === 'admin' && response.user.role !== 'admin') {
                showToast('Access Denied: You are not an admin', 'error');
                return;
            }

            localStorage.setItem('healthguard_user', JSON.stringify(response.user));
            isAuthenticated = true;
            updateAuthUI();

            showToast(role === 'admin' ? 'Welcome back, Admin!' : `Welcome back, ${response.user.name}!`, 'success');

            setTimeout(() => {
                window.location.href = role === 'admin' ? 'admin-dashboard.html' : 'dashboard.html';
            }, 500);
        } else {
            showToast(response.msg || 'Invalid credentials', 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Server connection failed', 'error');
    }
}

async function handleRegister(event) {
    event.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const mobile = document.getElementById('regMobile').value;
    const age = document.getElementById('regAge').value;
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (password !== confirmPassword) {
        showToast('Passwords do not match!', 'error');
        return;
    }

    try {
        const response = await api.register({
            name, email, mobile, age, password
        });

        if (response.user) {
            showToast('Account created successfully! Please log in.', 'success');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1000);
        } else {
            showToast(response.msg || 'Registration failed', 'error');
        }
    } catch (err) {
        console.error(err);
        showToast('Server connection failed', 'error');
    }
}

function logout() {
    localStorage.removeItem('healthguard_user');
    isAuthenticated = false;
    updateAuthUI();
    showToast('Logged out successfully', 'info');
    setTimeout(() => {
        window.location.href = 'home.html';
    }, 500);
}

// ===== Mobile Menu =====
function setupMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    const actions = document.querySelector('.nav-actions');

    if (!toggle || !menu) return;

    // Create a mobile actions container if it doesn't exist
    let mobileActions = menu.querySelector('.mobile-actions');
    if (!mobileActions) {
        mobileActions = document.createElement('div');
        mobileActions.className = 'mobile-actions';
        menu.appendChild(mobileActions);
    }

    toggle.addEventListener('click', () => {
        const isActive = menu.classList.toggle('active');
        toggle.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        
        if (isActive && actions) {
            // Sync actions to mobile menu
            mobileActions.innerHTML = '';
            
            // Add Register link for guests if not already there
            if (!isAuthenticated) {
                const regLink = document.createElement('a');
                regLink.href = 'register.html';
                regLink.className = 'nav-link mobile-only';
                regLink.innerHTML = '<i class="fas fa-user-plus"></i> Register';
                mobileActions.appendChild(regLink);
            }

            // Copy other actions
            actions.querySelectorAll('a, button').forEach(btn => {
                const clone = btn.cloneNode(true);
                clone.classList.add('mobile-nav-btn');
                if (clone.tagName === 'BUTTON' && btn.onclick) {
                    clone.onclick = btn.onclick;
                }
                mobileActions.appendChild(clone);
            });
        }
    });

    // Close menu when clicking outside or on a link
    document.addEventListener('click', (e) => {
        if (menu.classList.contains('active') && !menu.contains(e.target) && !toggle.contains(e.target)) {
            menu.classList.remove('active');
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            toggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// ===== Toast Notifications =====
function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-times-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };

    toast.innerHTML = `<i class="${icons[type]}"></i><span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===== Password Toggle =====
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
    }
}

// ===== Health Tip Refresh =====
function refreshTip() {
    const tip = healthTips[Math.floor(Math.random() * healthTips.length)];
    const tipText = document.getElementById('tipText');
    const tipIcon = document.getElementById('tipIcon');
    if (tipText && tipIcon) {
        tipText.textContent = tip.tip;
        tipIcon.textContent = tip.icon;
    }
}

// ===== Report Analyzer =====
function analyzeReport(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const results = [];

    for (const [key, value] of formData.entries()) {
        if (value && bloodTestRanges[key]) {
            const numValue = parseFloat(value);
            const range = bloodTestRanges[key];
            let status, statusClass, explanation;

            if (numValue < range.min) {
                status = 'Low';
                statusClass = 'danger';
                explanation = `Your ${range.name} is below normal range. This may indicate deficiency or underlying condition.`;
            } else if (numValue > range.max) {
                status = 'High';
                statusClass = 'warning';
                explanation = `Your ${range.name} is above normal range. Consult a doctor for proper evaluation.`;
            } else {
                status = 'Normal';
                statusClass = 'success';
                explanation = `Your ${range.name} is within the healthy range. Keep up the good work!`;
            }

            results.push({
                name: range.name,
                value: numValue,
                unit: range.unit,
                status,
                statusClass,
                range: `${range.min} - ${range.max}`,
                explanation,
                info: range.info
            });
        }
    }

    const resultsContainer = document.getElementById('analysisResults');

    if (results.length === 0) {
        showToast('Please enter at least one test value', 'warning');
        return;
    }

    resultsContainer.innerHTML = `
        <div class="card mt-3">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-clipboard-list"></i> Analysis Results</h3>
            </div>
            <div class="results-grid">
                ${results.map(r => `
                    <div class="result-card ${r.statusClass}">
                        <div class="result-header">
                            <h4>${r.name}</h4>
                            <span class="status-badge ${r.statusClass}">${r.status}</span>
                        </div>
                        <div class="result-value">${r.value} ${r.unit}</div>
                        <div class="result-range">Normal: ${r.range} ${r.unit}</div>
                        <p class="result-info">${r.info}</p>
                        <p class="result-explanation">${r.explanation}</p>
                    </div>
                `).join('')}
            </div>
            <div class="disclaimer-box mt-3">
                <i class="fas fa-info-circle"></i>
                <p>These results are for informational purposes only. Please consult a healthcare professional for proper interpretation and medical advice.</p>
            </div>
        </div>
    `;
    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// ===== Symptom Checker =====
async function checkSymptoms() {
    const selected = Array.from(document.querySelectorAll('input[name="symptom"]:checked')).map(cb => cb.value);
    const description = document.getElementById('illnessDescription').value.trim();

    if (selected.length === 0 && !description) {
        showToast('Please provide some information (select symptoms or type description)', 'warning');
        return;
    }

    const resultsContainer = document.getElementById('symptomResults');
    const selectedSymptoms = selected.map(s => symptomsData[s]);

    const allConditions = {};
    selectedSymptoms.forEach(symptom => {
        symptom.conditions.forEach(condition => {
            allConditions[condition] = (allConditions[condition] || 0) + 1;
        });
    });

    const sortedConditions = Object.entries(allConditions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    resultsContainer.innerHTML = `
        <div class="card mt-3">
            <div class="card-header">
                <h3 class="card-title"><i class="fas fa-notes-medical"></i> Awareness Information</h3>
            </div>
            
            ${selected.length > 0 ? `
            <div class="selected-symptoms">
                <h4>Your Selected Symptoms:</h4>
                <div class="symptom-tags">
                    ${selectedSymptoms.map(s => `<span class="symptom-tag">${s.icon} ${s.name}</span>`).join('')}
                </div>
            </div>

            <div class="possible-conditions mt-3">
                <h4>Possible Common Conditions:</h4>
                <p class="text-muted mb-2">Based on selected symptoms (not a diagnosis)</p>
                <div class="conditions-list">
                    ${sortedConditions.map(([cond, count]) => `
                        <div class="condition-item">
                            <span class="condition-name">${cond}</span>
                            <span class="match-count">${count}/${selected.length} symptoms match</span>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="advice-section mt-3">
                <h4><i class="fas fa-user-md"></i> When to See a Doctor:</h4>
                <ul class="advice-list">
                    ${selectedSymptoms.map(s => `<li>${s.advice}</li>`).join('')}
                </ul>
            </div>
            ` : `<div class="advice-section mt-3"><h4><i class="fas fa-robot"></i> Analysis based on your description:</h4></div>`}

            <div class="alert-box warning mt-3">
                <i class="fas fa-exclamation-triangle"></i>
                <div>
                    <strong>Important Reminder</strong>
                    <p>This is awareness information only. If symptoms are severe, persistent, or worrying, please consult a healthcare professional immediately.</p>
                </div>
            </div>
        </div>
    `;
    resultsContainer.classList.remove('hidden');
    resultsContainer.scrollIntoView({ behavior: 'smooth' });

    // AI Medicine Awareness Integration
    const adviceSection = resultsContainer.querySelector('.advice-section');
    adviceSection.insertAdjacentHTML('afterend', `
        <div id="aiSuggestions" class="mt-3 card" style="background: rgba(99, 102, 241, 0.05); border: 1px dashed var(--primary);">
            <div class="card-header">
                <h4 class="card-title text-primary"><i class="fas fa-robot"></i> AI Medicine Awareness</h4>
            </div>
            <div class="p-3" id="aiMedicineList">
                <div class="loading-spinner flex-center py-2 text-muted" id="aiLoading">
                    <i class="fas fa-spinner fa-spin"></i> Analyzing symptoms...
                </div>
            </div>
        </div>
    `);

    try {
        const description = document.getElementById('illnessDescription').value;
        const response = await fetch('/api/chat/suggest-medicine', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms: selected, description })
        });
        const data = await response.json();
        
        const aiList = document.getElementById('aiMedicineList');
        if (data.suggestions && data.suggestions.length > 0) {
            aiList.innerHTML = `
                <div class="medicine-tags mb-3">
                    ${data.suggestions.map(s => `
                        <div class="reminder-item" style="border-left: 3px solid var(--primary); background: #fff; padding: 10px; margin-bottom: 10px; border-radius: 8px;">
                            <div class="flex-between">
                                <strong class="text-primary">${s.name}</strong>
                                <span class="badge badge-sm">${s.brand}</span>
                            </div>
                            <p class="text-sm text-muted mt-1">${s.usage}</p>
                        </div>
                    `).join('')}
                </div>

                ${data.advice ? `
                <div class="advice-section mt-2 mb-3">
                    <h4 class="text-sm font-semibold mb-2"><i class="fas fa-lightbulb text-warning"></i> AI Recommendations:</h4>
                    <ul class="advice-list" style="font-size: 0.85rem;">
                        ${data.advice.map(a => `<li>${a}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}

                <div class="alert-box danger py-2" style="font-size: 0.82rem; border-radius: 8px;">
                    <i class="fas fa-exclamation-triangle"></i>
                    <span><strong>Medical Awareness:</strong> ${data.disclaimer}</span>
                </div>
            `;
        } else {
            aiList.innerHTML = `<p class="text-muted text-center py-2">No specific medication data available for this input. Please consult a doctor.</p>`;
        }
    } catch (err) {
        document.getElementById('aiMedicineList').innerHTML = `
            <div class="alert-box error py-2">
                <i class="fas fa-wifi"></i>
                <span>Failed to connect to AI service. Please check your connection.</span>
            </div>
        `;
    }
}

// ===== Medicine Search =====
function searchMedicine(query) {
    const resultsContainer = document.getElementById('medicineResults');
    if (query.trim().length < 2) {
        resultsContainer.innerHTML = '';
        return;
    }

    const matches = Object.entries(medicineData).filter(([key, med]) =>
        med.name.toLowerCase().includes(query.toLowerCase()) ||
        med.brand.toLowerCase().includes(query.toLowerCase()) ||
        med.category.toLowerCase().includes(query.toLowerCase())
    );

    if (matches.length > 0) {
        resultsContainer.innerHTML = `
            <div class="search-results-list mt-3">
                <p class="text-sm text-muted mb-2">Found ${matches.length} matching medicines:</p>
                <div class="results-grid">
                    ${matches.map(([key, med]) => `
                        <div class="result-item card p-3 mb-2 clickable" onclick="showMedicineInfo('${key}')">
                            <div class="flex-between">
                                <strong>${med.name}</strong>
                                <span class="badge badge-sm">${med.category}</span>
                            </div>
                            <small class="text-muted">${med.brand}</small>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        resultsContainer.innerHTML = `
            <div class="alert-box warning mt-3">
                <i class="fas fa-search"></i>
                <span>No medicine found matching "${query}". Try common names like Paracetamol.</span>
            </div>
        `;
    }
}

function showMedicineInfo(key) {
    const med = medicineData[key];
    if (!med) return;

    // document.getElementById('medicineSearch').value = med.name; // Don't overwrite search while looking
    document.getElementById('medicineResults').innerHTML = `
        <div class="mt-3">
            <button class="btn btn-sm btn-text mb-2" onclick="searchMedicine(document.getElementById('medicineSearch').value)">
                <i class="fas fa-arrow-left"></i> Back to results
            </button>
            <div class="medicine-card">
                <div class="medicine-header">
                    <div class="medicine-icon"><i class="fas fa-pills"></i></div>
                    <div>
                        <h3>${med.name}</h3>
                        <p class="brand-names">${med.brand}</p>
                        <span class="category-badge">${med.category}</span>
                    </div>
                </div>

                <div class="medicine-section">
                    <h4><i class="fas fa-info-circle"></i> Purpose</h4>
                    <p>${med.purpose}</p>
                </div>

                <div class="medicine-section">
                    <h4><i class="fas fa-prescription"></i> Dosage</h4>
                    <p>${med.dosage}</p>
                </div>

                <div class="medicine-section">
                    <h4><i class="fas fa-exclamation-circle"></i> Possible Side Effects</h4>
                    <ul>${med.sideEffects.map(e => `<li>${e}</li>`).join('')}</ul>
                </div>

                <div class="medicine-section warnings">
                    <h4><i class="fas fa-exclamation-triangle"></i> Warnings</h4>
                    <ul>${med.warnings.map(w => `<li>${w}</li>`).join('')}</ul>
                </div>
            </div>
        </div>
    `;
    document.getElementById('medicineResults').scrollIntoView({ behavior: 'smooth' });
}

// ===== Habit Tracker =====
async function getHabits() {
    const user = getCurrentUser();
    if (!user || user.role === 'admin') return {};

    // We try to fetch from API, if fails (e.g. server down), return empty
    try {
        const habits = await api.getHabits(user._id || user.id);
        localStorage.setItem('healthguard_habits', JSON.stringify(habits)); // Cache locally
        return habits;
    } catch (e) {
        console.log('Using local habits cache');
        return JSON.parse(localStorage.getItem('healthguard_habits') || '{}');
    }
}

// Helper to get cached habits synchronously for UI rendering
function getCachedHabits() {
    return JSON.parse(localStorage.getItem('healthguard_habits') || '{}');
}

async function updateHabit(type, change) {
    const user = getCurrentUser();
    if (!user) return;

    // Optimistic UI Update
    const habits = getCachedHabits();
    const today = new Date().toISOString().split('T')[0];

    if (!habits[today]) {
        habits[today] = { userId: user._id || user.id, date: today, water: 0, sleep: 0, steps: 0, exercise: 0, medicine: false };
    }

    // Calculate new value
    let newValue = (habits[today][type] || 0) + change;
    if (newValue < 0) newValue = 0;

    habits[today][type] = newValue;
    localStorage.setItem('healthguard_habits', JSON.stringify(habits));

    // Re-render dashboard or habits page parts if needed
    // In a real framework this would be reactive. Here we might reload the page or update specific DOM elements
    location.reload();

    // Sync with Server
    try {
        await api.updateHabit({
            userId: user._id || user.id,
            date: today,
            type,
            value: change, // Pass the change amount
            isDirect: false
        });
    } catch (e) {
        console.error('Failed to sync habit', e);
    }
}

async function updateHabitDirect(type, value) {
    const user = getCurrentUser();
    if (!user) return;

    const habits = getCachedHabits();
    const today = new Date().toISOString().split('T')[0];

    if (!habits[today]) {
        habits[today] = { userId: user._id || user.id, date: today, water: 0, sleep: 0, steps: 0, exercise: 0, medicine: false };
    }

    const finalValue = type === 'medicine' ? value : (parseInt(value) || 0);
    habits[today][type] = finalValue;
    localStorage.setItem('healthguard_habits', JSON.stringify(habits));
    location.reload();

    try {
        await api.updateHabit({
            userId: user._id || user.id,
            date: today,
            type,
            value: finalValue,
            isDirect: true
        });
    } catch (e) {
        console.error('Failed to sync habit', e);
    }
}

async function initHabitsChart() {
    const ctx = document.getElementById('habitsChart');
    if (!ctx) return;

    // Ensure we have fresh habits
    const habits = await getHabits();

    constlabels = [];
    const waterData = [];
    const sleepData = [];
    const stepsData = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        // labels.push(date.toLocaleDateString('en-IN', { weekday: 'short' })); // Typo in original file: constlabels vs labels.push
        // Correcting logic on the fly
    }

    // Re-implementing correctly
    const chartLabels = [];
    const chartWater = [];
    const chartSleep = [];
    const chartSteps = [];

    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        chartLabels.push(date.toLocaleDateString('en-IN', { weekday: 'short' }));

        const dayHabits = habits[dateStr] || {};
        chartWater.push(dayHabits.water || 0);
        chartSleep.push(dayHabits.sleep || 0);
        chartSteps.push((dayHabits.steps || 0) / 1000);
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Water (glasses)',
                    data: chartWater,
                    backgroundColor: 'rgba(99, 102, 241, 0.8)',
                    borderRadius: 8
                },
                {
                    label: 'Sleep (hours)',
                    data: chartSleep,
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderRadius: 8
                },
                {
                    label: 'Steps (K)',
                    data: chartSteps,
                    backgroundColor: 'rgba(245, 158, 11, 0.8)',
                    borderRadius: 8
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: { color: '#94a3b8' }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                },
                y: {
                    ticks: { color: '#94a3b8' },
                    grid: { color: 'rgba(255,255,255,0.1)' }
                }
            }
        }
    });
}

// ===== Emergency First Aid =====
function showFirstAid(type) {
    const aid = emergencyFirstAid[type];
    if (!aid) return;

    const container = document.getElementById('firstAidDetails');
    container.innerHTML = `
        <div class="card first-aid-card" style="border-color: ${aid.color}">
            <div class="first-aid-header" style="background: ${aid.color}20">
                <i class="${aid.icon}" style="color: ${aid.color}"></i>
                <h3>${aid.title}</h3>
            </div>
            
            <div class="first-aid-section">
                <h4><i class="fas fa-exclamation-circle"></i> Symptoms to Recognize</h4>
                <ul class="symptoms-list">
                    ${aid.symptoms.map(s => `<li>${s}</li>`).join('')}
                </ul>
            </div>

            <div class="first-aid-section">
                <h4><i class="fas fa-list-ol"></i> First Aid Steps</h4>
                <ol class="steps-list">
                    ${aid.steps.map(s => `<li>${s}</li>`).join('')}
                </ol>
            </div>

            <div class="emergency-call-action">
                <a href="tel:112" class="btn btn-danger btn-lg">
                    <i class="fas fa-phone-alt"></i> Call Emergency (112)
                </a>
            </div>
        </div>
    `;
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth' });
}

// ===== Profile Functions =====
async function updateProfile(event) {
    event.preventDefault();
    const user = getCurrentUser();

    user.name = document.getElementById('profileName').value;
    user.email = document.getElementById('profileEmail').value;
    user.mobile = document.getElementById('profileMobile').value;
    user.age = document.getElementById('profileAge').value;
    user.bloodGroup = document.getElementById('profileBloodGroup').value;

    try {
        await api.updateProfile(user);

        localStorage.setItem('healthguard_user', JSON.stringify(user));
        showToast('Profile updated successfully!', 'success');
    } catch (e) {
        console.error('Failed to update profile', e);
        showToast('Failed to update profile on server', 'error');
    }
}

function changePassword(event) {
    event.preventDefault();
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const user = getCurrentUser();

    if (user.password !== currentPassword) {
        showToast('Current password is incorrect', 'error');
        return;
    }

    if (newPassword.length < 6) {
        showToast('New password must be at least 6 characters', 'error');
        return;
    }

    user.password = newPassword;
    localStorage.setItem('healthguard_user', JSON.stringify(user));

    const users = JSON.parse(localStorage.getItem('healthguard_users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex > -1) {
        users[userIndex] = user;
        localStorage.setItem('healthguard_users', JSON.stringify(users));
    }

    showToast('Password changed successfully!', 'success');
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
}

function exportData() {
    const user = getCurrentUser();
    const habits = getHabits();
    const data = { user, habits, exportedAt: new Date().toISOString() };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'healthguard_data.json';
    a.click();
    URL.revokeObjectURL(url);

    showToast('Data exported successfully!', 'success');
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This cannot be undone.')) {
        const user = getCurrentUser();
        const users = JSON.parse(localStorage.getItem('healthguard_users') || '[]');
        const filteredUsers = users.filter(u => u.id !== user.id);
        localStorage.setItem('healthguard_users', JSON.stringify(filteredUsers));
        localStorage.removeItem('healthguard_user');
        localStorage.removeItem('healthguard_habits');
        logout();
        showToast('Account deleted successfully', 'info');
    }
}
