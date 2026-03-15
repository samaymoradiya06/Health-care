// ===== Page Templates =====

function getHomePage() {
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];
    return `
    <div class="page-enter">
        <!-- Hero Section -->
        <section class="hero">
            <div class="hero-content">
                <div class="hero-badge">🏥 Your Health Companion</div>
                <h1 class="hero-title">Smart Health Awareness<br><span class="gradient-text">& Safety Platform</span></h1>
                <p class="hero-subtitle">Empowering you with health knowledge, medical awareness, and emergency preparedness. Your comprehensive guide to a healthier, safer life.</p>
                <div class="hero-actions">
                    <button class="btn btn-primary btn-lg" onclick="showPage('register')">
                        <i class="fas fa-rocket"></i> Get Started Free
                    </button>
                    <button class="btn btn-outline btn-lg" onclick="showPage('emergency')">
                        <i class="fas fa-ambulance"></i> Emergency Info
                    </button>
                </div>
                <div class="hero-stats">
                    <div class="hero-stat"><span>10K+</span>Health Tips</div>
                    <div class="hero-stat"><span>500+</span>Medicines</div>
                    <div class="hero-stat"><span>24/7</span>Emergency Help</div>
                </div>
            </div>
            <div class="hero-visual">
                <div class="hero-card">
                    <div class="pulse-ring"></div>
                    <i class="fas fa-heartbeat"></i>
                </div>
            </div>
        </section>

        <!-- Health Tip Banner -->
        <section class="tip-banner">
            <div class="tip-content">
                <span class="tip-icon">${randomTip.icon}</span>
                <p><strong>Health Tip:</strong> ${randomTip.tip}</p>
                <button class="btn btn-sm" onclick="refreshTip()"><i class="fas fa-sync-alt"></i></button>
            </div>
        </section>

        <!-- Features Section -->
        <section class="section">
            <div class="section-header">
                <h2 class="section-title">Comprehensive Health Features</h2>
                <p class="section-subtitle">Everything you need to understand, track, and improve your health</p>
            </div>
            <div class="grid grid-3">
                <div class="feature-card">
                    <div class="feature-icon"><i class="fas fa-file-medical-alt"></i></div>
                    <h3>Report Analyzer</h3>
                    <p>Upload blood reports and get easy-to-understand explanations of your health parameters.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon secondary"><i class="fas fa-stethoscope"></i></div>
                    <h3>Symptom Awareness</h3>
                    <p>Learn about symptoms and possible conditions. Know when to seek medical attention.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon accent"><i class="fas fa-pills"></i></div>
                    <h3>Medicine Safety</h3>
                    <p>Get detailed information about medicines, dosages, side effects, and safety warnings.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon success"><i class="fas fa-heartbeat"></i></div>
                    <h3>Habit Tracker</h3>
                    <p>Track water intake, sleep, exercise, and medicine schedules with visual charts.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon danger"><i class="fas fa-first-aid"></i></div>
                    <h3>Emergency First Aid</h3>
                    <p>Quick access to first-aid guides for critical situations. Every second counts.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon info"><i class="fas fa-user-md"></i></div>
                    <h3>Health Profile</h3>
                    <p>Maintain your health history and preferences for personalized recommendations.</p>
                </div>
            </div>
        </section>

        <!-- Emergency Numbers -->
        <section class="section emergency-section">
            <div class="section-header">
                <h2 class="section-title">🚨 Emergency Helplines (India)</h2>
                <p class="section-subtitle">Save these numbers. They can save lives.</p>
            </div>
            <div class="grid grid-4">
                ${emergencyNumbers.map(e => `
                    <div class="emergency-card ${e.color}">
                        <i class="${e.icon}"></i>
                        <h4>${e.name}</h4>
                        <a href="tel:${e.number.split('/')[0].trim()}" class="emergency-number">${e.number}</a>
                    </div>
                `).join('')}
            </div>
        </section>
    </div>`;
}

function getLoginPage() {
    return `
    <div class="auth-page page-enter">
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-header">
                    <i class="fas fa-heartbeat auth-logo"></i>
                    <h2>Welcome Back</h2>
                    <p>Sign in to access your health dashboard</p>
                </div>
                <form id="loginForm" onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label class="form-label">Email or Mobile</label>
                        <input type="text" class="form-input" id="loginEmail" placeholder="Enter email or mobile" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <div class="password-input">
                            <input type="password" class="form-input" id="loginPassword" placeholder="Enter password" required>
                            <button type="button" class="password-toggle" onclick="togglePassword('loginPassword')">
                                <i class="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div class="form-group flex-between">
                        <label class="form-checkbox">
                            <input type="checkbox" id="rememberMe"> Remember me
                        </label>
                        <a href="#" class="text-primary" onclick="showPage('forgot')">Forgot Password?</a>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block btn-lg">
                        <i class="fas fa-sign-in-alt"></i> Sign In
                    </button>
                </form>
                <div class="auth-footer">
                    <p>Don't have an account? <a href="#" onclick="showPage('register')">Register Now</a></p>
                </div>
            </div>
        </div>
    </div>`;
}

function getRegisterPage() {
    return `
    <div class="auth-page page-enter">
        <div class="auth-container">
            <div class="auth-card">
                <div class="auth-header">
                    <i class="fas fa-user-plus auth-logo"></i>
                    <h2>Create Account</h2>
                    <p>Join HealthGuard for better health awareness</p>
                </div>
                <form id="registerForm" onsubmit="handleRegister(event)">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" id="regName" placeholder="Enter full name" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Age</label>
                            <input type="number" class="form-input" id="regAge" placeholder="Age" min="1" max="120" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <input type="email" class="form-input" id="regEmail" placeholder="Enter email" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Mobile Number</label>
                        <input type="tel" class="form-input" id="regMobile" placeholder="Enter mobile number" pattern="[0-9]{10}">
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" class="form-input" id="regPassword" placeholder="Create password (min 6 chars)" minlength="6" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Confirm Password</label>
                        <input type="password" class="form-input" id="regConfirmPassword" placeholder="Confirm password" required>
                    </div>
                    <div class="form-group">
                        <label class="form-checkbox">
                            <input type="checkbox" required> I agree to the <a href="#" class="text-primary">Terms & Privacy Policy</a>
                        </label>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block btn-lg">
                        <i class="fas fa-user-plus"></i> Create Account
                    </button>
                </form>
                <div class="auth-footer">
                    <p>Already have an account? <a href="#" onclick="showPage('login')">Sign In</a></p>
                </div>
            </div>
        </div>
    </div>`;
}

function getDashboardPage() {
    const user = getCurrentUser();
    const habits = getHabits();
    const today = new Date().toISOString().split('T')[0];
    const todayHabits = habits[today] || {};

    return `
    <div class="dashboard-page page-enter">
        <section class="section">
            <div class="dashboard-header">
                <div>
                    <h1>Welcome back, ${user.name}! 👋</h1>
                    <p class="text-muted">Here's your health summary for today</p>
                </div>
                <div class="date-display">
                    <i class="fas fa-calendar-alt"></i>
                    ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-4 mt-3">
                <div class="stat-card">
                    <div class="stat-icon primary"><i class="fas fa-tint"></i></div>
                    <div>
                        <div class="stat-value">${todayHabits.water || 0}/8</div>
                        <div class="stat-label">Glasses of Water</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon success"><i class="fas fa-bed"></i></div>
                    <div>
                        <div class="stat-value">${todayHabits.sleep || 0}h</div>
                        <div class="stat-label">Hours of Sleep</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon warning"><i class="fas fa-walking"></i></div>
                    <div>
                        <div class="stat-value">${todayHabits.steps || 0}</div>
                        <div class="stat-label">Steps Today</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon danger"><i class="fas fa-pills"></i></div>
                    <div>
                        <div class="stat-value">${todayHabits.medicine ? '✓' : '✗'}</div>
                        <div class="stat-label">Medicine Taken</div>
                    </div>
                </div>
            </div>

            <!-- Quick Actions -->
            <div class="card mt-3">
                <div class="card-header">
                    <h3 class="card-title"><i class="fas fa-bolt"></i> Quick Actions</h3>
                </div>
                <div class="quick-actions">
                    <button class="quick-action-btn" onclick="showPage('reports')">
                        <i class="fas fa-file-medical"></i>
                        <span>Analyze Report</span>
                    </button>
                    <button class="quick-action-btn" onclick="showPage('symptoms')">
                        <i class="fas fa-stethoscope"></i>
                        <span>Check Symptoms</span>
                    </button>
                    <button class="quick-action-btn" onclick="showPage('medicine')">
                        <i class="fas fa-pills"></i>
                        <span>Medicine Info</span>
                    </button>
                    <button class="quick-action-btn" onclick="showPage('habits')">
                        <i class="fas fa-chart-line"></i>
                        <span>Track Habits</span>
                    </button>
                    <button class="quick-action-btn danger" onclick="showPage('emergency')">
                        <i class="fas fa-ambulance"></i>
                        <span>Emergency</span>
                    </button>
                </div>
            </div>

            <!-- Health Alerts -->
            <div class="grid grid-2 mt-3">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-bell"></i> Health Reminders</h3>
                    </div>
                    <div class="reminder-list">
                        <div class="reminder-item">
                            <i class="fas fa-tint text-primary"></i>
                            <span>Drink more water - ${8 - (todayHabits.water || 0)} glasses remaining</span>
                        </div>
                        <div class="reminder-item">
                            <i class="fas fa-walking text-warning"></i>
                            <span>Take a 10-minute walk break</span>
                        </div>
                        <div class="reminder-item">
                            <i class="fas fa-eye text-success"></i>
                            <span>20-20-20 rule: Look away from screen</span>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-lightbulb"></i> Today's Health Tip</h3>
                    </div>
                    <div class="tip-of-day">
                        <span class="tip-emoji">${healthTips[new Date().getDate() % healthTips.length].icon}</span>
                        <p>${healthTips[new Date().getDate() % healthTips.length].tip}</p>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

function getReportsPage() {
    return `
    <div class="reports-page page-enter">
        <section class="section">
            <div class="section-header">
                <h2 class="section-title">📊 Report Analyzer</h2>
                <p class="section-subtitle">Enter your blood test values to understand your health parameters</p>
            </div>

            <div class="analyzer-container">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-edit"></i> Enter Test Values</h3>
                    </div>
                    <form id="reportForm" onsubmit="analyzeReport(event)">
                        <div class="test-grid">
                            ${Object.entries(bloodTestRanges).slice(0, 12).map(([key, val]) => `
                                <div class="test-input-group">
                                    <label class="form-label">${val.name} (${val.unit})</label>
                                    <input type="number" step="0.01" class="form-input" name="${key}" placeholder="Enter value">
                                </div>
                            `).join('')}
                        </div>
                        <button type="submit" class="btn btn-primary btn-lg mt-3">
                            <i class="fas fa-search"></i> Analyze Report
                        </button>
                    </form>
                </div>

                <div id="analysisResults" class="analysis-results hidden">
                    <!-- Results will appear here -->
                </div>
            </div>
        </section>
    </div>`;
}

function getSymptomsPage() {
    return `
    <div class="symptoms-page page-enter">
        <section class="section">
            <div class="section-header">
                <h2 class="section-title">🩺 Symptom Awareness</h2>
                <p class="section-subtitle">Select your symptoms to learn about possible conditions. <strong>This is for awareness only, not diagnosis.</strong></p>
            </div>

            <div class="symptoms-container">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-list-check"></i> Select Your Symptoms</h3>
                    </div>
                    <div class="symptoms-grid">
                        ${Object.entries(symptomsData).map(([key, val]) => `
                            <label class="symptom-checkbox">
                                <input type="checkbox" name="symptom" value="${key}">
                                <span class="symptom-label">
                                    <span class="symptom-icon">${val.icon}</span>
                                    <span>${val.name}</span>
                                </span>
                            </label>
                        `).join('')}
                    </div>
                    <button class="btn btn-primary btn-lg mt-3" onclick="checkSymptoms()">
                        <i class="fas fa-search"></i> Check Symptoms
                    </button>
                </div>

                <div id="symptomResults" class="symptom-results hidden">
                    <!-- Results will appear here -->
                </div>
            </div>

            <div class="disclaimer-box mt-3">
                <i class="fas fa-exclamation-triangle"></i>
                <p><strong>Important Disclaimer:</strong> This tool provides general health awareness information only. It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider for medical concerns.</p>
            </div>
        </section>
    </div>`;
}

function getMedicinePage() {
    return `
    <div class="medicine-page page-enter">
        <section class="section">
            <div class="section-header">
                <h2 class="section-title">💊 Medicine Safety</h2>
                <p class="section-subtitle">Search for medicine information, dosages, and safety warnings</p>
            </div>

            <div class="medicine-container">
                <div class="search-box">
                    <i class="fas fa-search"></i>
                    <input type="text" id="medicineSearch" class="form-input" placeholder="Search medicine (e.g., Paracetamol, Ibuprofen...)" oninput="searchMedicine(this.value)">
                </div>

                <div class="medicine-suggestions">
                    <p class="text-muted mb-2">Popular searches:</p>
                    <div class="suggestion-tags">
                        ${Object.keys(medicineData).map(key => `
                            <button class="suggestion-tag" onclick="showMedicineInfo('${key}')">${medicineData[key].name.split(' ')[0]}</button>
                        `).join('')}
                    </div>
                </div>

                <div id="medicineResults" class="medicine-results">
                    <!-- Results will appear here -->
                </div>
            </div>

            <div class="disclaimer-box mt-3">
                <i class="fas fa-exclamation-triangle"></i>
                <p><strong>Important:</strong> Always consult a doctor or pharmacist before taking any medication. Never self-medicate for serious conditions. This information is for educational purposes only.</p>
            </div>
        </section>
    </div>`;
}

function getHabitsPage() {
    const habits = getHabits();
    const today = new Date().toISOString().split('T')[0];
    const todayHabits = habits[today] || { water: 0, sleep: 0, steps: 0, exercise: 0, medicine: false };

    return `
    <div class="habits-page page-enter">
        <section class="section">
            <div class="section-header">
                <h2 class="section-title">📈 Habit Tracker</h2>
                <p class="section-subtitle">Track your daily health habits and see your progress</p>
            </div>

            <div class="habits-container">
                <!-- Today's Habits -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-calendar-day"></i> Today's Progress</h3>
                        <span class="date-badge">${new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div class="habits-grid">
                        <div class="habit-tracker-card">
                            <div class="habit-icon water"><i class="fas fa-tint"></i></div>
                            <h4>Water Intake</h4>
                            <div class="habit-value">${todayHabits.water}/8 glasses</div>
                            <div class="habit-controls">
                                <button class="btn btn-sm" onclick="updateHabit('water', -1)">-</button>
                                <button class="btn btn-sm btn-primary" onclick="updateHabit('water', 1)">+</button>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-fill water" style="width: ${(todayHabits.water / 8) * 100}%"></div>
                            </div>
                        </div>

                        <div class="habit-tracker-card">
                            <div class="habit-icon sleep"><i class="fas fa-bed"></i></div>
                            <h4>Sleep</h4>
                            <div class="habit-value">${todayHabits.sleep} hours</div>
                            <input type="range" min="0" max="12" value="${todayHabits.sleep}" onchange="updateHabitDirect('sleep', this.value)">
                            <div class="progress-bar">
                                <div class="progress-fill sleep" style="width: ${(todayHabits.sleep / 8) * 100}%"></div>
                            </div>
                        </div>

                        <div class="habit-tracker-card">
                            <div class="habit-icon steps"><i class="fas fa-walking"></i></div>
                            <h4>Steps</h4>
                            <div class="habit-value">${todayHabits.steps.toLocaleString()} steps</div>
                            <input type="number" class="form-input" value="${todayHabits.steps}" onchange="updateHabitDirect('steps', this.value)" placeholder="Enter steps">
                            <div class="progress-bar">
                                <div class="progress-fill steps" style="width: ${Math.min((todayHabits.steps / 10000) * 100, 100)}%"></div>
                            </div>
                        </div>

                        <div class="habit-tracker-card">
                            <div class="habit-icon exercise"><i class="fas fa-dumbbell"></i></div>
                            <h4>Exercise</h4>
                            <div class="habit-value">${todayHabits.exercise} mins</div>
                            <input type="number" class="form-input" value="${todayHabits.exercise}" onchange="updateHabitDirect('exercise', this.value)" placeholder="Minutes">
                            <div class="progress-bar">
                                <div class="progress-fill exercise" style="width: ${Math.min((todayHabits.exercise / 30) * 100, 100)}%"></div>
                            </div>
                        </div>
                    </div>

                    <div class="medicine-reminder mt-3">
                        <label class="form-checkbox medicine-check">
                            <input type="checkbox" ${todayHabits.medicine ? 'checked' : ''} onchange="updateHabitDirect('medicine', this.checked)">
                            <span><i class="fas fa-pills"></i> Medicine taken today</span>
                        </label>
                    </div>
                </div>

                <!-- Weekly Chart -->
                <div class="card mt-3">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-chart-bar"></i> Weekly Progress</h3>
                    </div>
                    <div class="chart-container">
                        <canvas id="habitsChart"></canvas>
                    </div>
                </div>
            </div>
        </section>
    </div>`;
}

function getEmergencyPage() {
    return `
    <div class="emergency-page page-enter">
        <section class="section">
            <div class="section-header emergency-header">
                <h2 class="section-title">🚨 Emergency Awareness</h2>
                <p class="section-subtitle">Quick access to emergency information and first-aid guides</p>
            </div>

            <!-- Emergency Numbers -->
            <div class="card emergency-card">
                <div class="card-header">
                    <h3 class="card-title text-danger"><i class="fas fa-phone-alt"></i> Emergency Helplines (India)</h3>
                </div>
                <div class="emergency-numbers-grid">
                    ${emergencyNumbers.map(e => `
                        <a href="tel:${e.number.split('/')[0].trim()}" class="emergency-number-card ${e.color}">
                            <i class="${e.icon}"></i>
                            <div>
                                <h4>${e.name}</h4>
                                <span class="number">${e.number}</span>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>

            <!-- Emergency Situations -->
            <div class="section-header mt-4">
                <h3 class="section-title">🏥 First Aid Guides</h3>
                <p class="section-subtitle">Click on any emergency situation for step-by-step first aid instructions</p>
            </div>

            <div class="emergency-grid">
                ${Object.entries(emergencyFirstAid).map(([key, val]) => `
                    <div class="first-aid-card" onclick="showFirstAid('${key}')" style="--card-color: ${val.color}">
                        <div class="first-aid-icon" style="background: ${val.color}20; color: ${val.color}">
                            <i class="${val.icon}"></i>
                        </div>
                        <h4>${val.title}</h4>
                        <p class="text-muted">Click for first aid steps</p>
                    </div>
                `).join('')}
            </div>

            <div id="firstAidDetails" class="first-aid-details hidden">
                <!-- First aid details will appear here -->
            </div>
        </section>
    </div>`;
}

function getProfilePage() {
    const user = getCurrentUser();
    return `
    <div class="profile-page page-enter">
        <section class="section">
            <div class="section-header">
                <h2 class="section-title">👤 My Profile</h2>
                <p class="section-subtitle">Manage your account and health information</p>
            </div>

            <div class="profile-container">
                <div class="card profile-card">
                    <div class="profile-header">
                        <div class="profile-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div>
                            <h3>${user.name}</h3>
                            <p class="text-muted">${user.email}</p>
                        </div>
                    </div>
                    <form id="profileForm" onsubmit="updateProfile(event)">
                        <div class="form-group">
                            <label class="form-label">Full Name</label>
                            <input type="text" class="form-input" id="profileName" value="${user.name}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Email</label>
                            <input type="email" class="form-input" id="profileEmail" value="${user.email}" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Mobile</label>
                            <input type="tel" class="form-input" id="profileMobile" value="${user.mobile || ''}" placeholder="Enter mobile">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Age</label>
                            <input type="number" class="form-input" id="profileAge" value="${user.age || ''}" placeholder="Enter age">
                        </div>
                        <div class="form-group">
                            <label class="form-label">Blood Group</label>
                            <select class="form-input form-select" id="profileBloodGroup">
                                <option value="">Select Blood Group</option>
                                ${['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg =>
        `<option value="${bg}" ${user.bloodGroup === bg ? 'selected' : ''}>${bg}</option>`
    ).join('')}
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Save Changes
                        </button>
                    </form>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title"><i class="fas fa-shield-alt"></i> Security</h3>
                    </div>
                    <form onsubmit="changePassword(event)">
                        <div class="form-group">
                            <label class="form-label">Current Password</label>
                            <input type="password" class="form-input" id="currentPassword" placeholder="Enter current password">
                        </div>
                        <div class="form-group">
                            <label class="form-label">New Password</label>
                            <input type="password" class="form-input" id="newPassword" placeholder="Enter new password">
                        </div>
                        <button type="submit" class="btn btn-outline">
                            <i class="fas fa-key"></i> Change Password
                        </button>
                    </form>
                </div>

                <div class="card danger-zone">
                    <div class="card-header">
                        <h3 class="card-title text-danger"><i class="fas fa-exclamation-triangle"></i> Data & Privacy</h3>
                    </div>
                    <p class="text-muted mb-2">Your data is stored locally on this device only.</p>
                    <button class="btn btn-outline" onclick="exportData()">
                        <i class="fas fa-download"></i> Export My Data
                    </button>
                    <button class="btn btn-danger mt-2" onclick="deleteAccount()">
                        <i class="fas fa-trash"></i> Delete Account
                    </button>
                </div>
            </div>
        </section>
    </div>`;
}
