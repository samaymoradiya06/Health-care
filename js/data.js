// ===== Health Tips Database =====
const healthTips = [
    { tip: "Drink at least 8 glasses of water daily to stay hydrated.", icon: "💧" },
    { tip: "Walk 10,000 steps a day for cardiovascular health.", icon: "🚶" },
    { tip: "Sleep 7-8 hours every night for optimal recovery.", icon: "😴" },
    { tip: "Eat 5 servings of fruits and vegetables daily.", icon: "🥗" },
    { tip: "Practice deep breathing for 5 minutes to reduce stress.", icon: "🧘" },
    { tip: "Limit screen time before bed for better sleep quality.", icon: "📱" },
    { tip: "Wash hands frequently to prevent infections.", icon: "🧼" },
    { tip: "Take breaks every hour when working at a desk.", icon: "⏰" }
];

// ===== Admin Credentials =====
const adminCredentials = {
    email: "samaymoradiya06@gmail.com",
    password: "admin123",
    name: "Admin User",
    role: "admin"
};

// ===== Emergency Numbers (India) =====
const emergencyNumbers = [
    { name: "National Emergency", number: "112", icon: "fas fa-phone-alt", color: "danger" },
    { name: "Ambulance", number: "102 / 108", icon: "fas fa-ambulance", color: "danger" },
    { name: "Police", number: "100", icon: "fas fa-shield-alt", color: "primary" },
    { name: "Fire Brigade", number: "101", icon: "fas fa-fire-extinguisher", color: "warning" },
    { name: "Women Helpline", number: "1091 / 181", icon: "fas fa-female", color: "success" },
    { name: "Child Helpline", number: "1098", icon: "fas fa-child", color: "info" },
    { name: "COVID-19 Helpline", number: "1075", icon: "fas fa-virus", color: "warning" },
    { name: "Mental Health", number: "08046110007", icon: "fas fa-brain", color: "primary" }
];

// ===== Blood Test Normal Ranges =====
const bloodTestRanges = {
    hemoglobin: { min: 12, max: 17, unit: "g/dL", name: "Hemoglobin", info: "Carries oxygen in blood" },
    rbc: { min: 4.5, max: 5.5, unit: "million/μL", name: "RBC Count", info: "Red blood cells carry oxygen" },
    wbc: { min: 4000, max: 11000, unit: "/μL", name: "WBC Count", info: "White blood cells fight infections" },
    platelets: { min: 150000, max: 400000, unit: "/μL", name: "Platelet Count", info: "Helps blood clotting" },
    glucose_fasting: { min: 70, max: 100, unit: "mg/dL", name: "Fasting Glucose", info: "Blood sugar after fasting" },
    glucose_pp: { min: 70, max: 140, unit: "mg/dL", name: "Post-Prandial Glucose", info: "Blood sugar after meal" },
    cholesterol: { min: 0, max: 200, unit: "mg/dL", name: "Total Cholesterol", info: "Fat in blood" },
    hdl: { min: 40, max: 60, unit: "mg/dL", name: "HDL (Good)", info: "Good cholesterol" },
    ldl: { min: 0, max: 100, unit: "mg/dL", name: "LDL (Bad)", info: "Bad cholesterol" },
    triglycerides: { min: 0, max: 150, unit: "mg/dL", name: "Triglycerides", info: "Type of fat in blood" },
    creatinine: { min: 0.7, max: 1.3, unit: "mg/dL", name: "Creatinine", info: "Kidney function marker" },
    urea: { min: 7, max: 20, unit: "mg/dL", name: "Blood Urea", info: "Kidney waste product" },
    uric_acid: { min: 3.5, max: 7.2, unit: "mg/dL", name: "Uric Acid", info: "Waste from digestion" },
    bilirubin: { min: 0.1, max: 1.2, unit: "mg/dL", name: "Bilirubin", info: "Liver function marker" },
    sgpt: { min: 7, max: 56, unit: "U/L", name: "SGPT/ALT", info: "Liver enzyme" },
    sgot: { min: 10, max: 40, unit: "U/L", name: "SGOT/AST", info: "Liver enzyme" },
    tsh: { min: 0.4, max: 4.0, unit: "mIU/L", name: "TSH", info: "Thyroid function" },
    vitamin_d: { min: 30, max: 100, unit: "ng/mL", name: "Vitamin D", info: "Bone health vitamin" },
    vitamin_b12: { min: 200, max: 900, unit: "pg/mL", name: "Vitamin B12", info: "Nerve function vitamin" },
    iron: { min: 60, max: 170, unit: "μg/dL", name: "Serum Iron", info: "Essential mineral" },
    calcium: { min: 8.5, max: 10.5, unit: "mg/dL", name: "Calcium", info: "Bone health mineral" }
};

// ===== Symptoms Database =====
const symptomsData = {
    fever: {
        name: "Fever",
        icon: "🌡️",
        conditions: ["Common Cold", "Flu", "Viral Infection", "Malaria", "Typhoid", "COVID-19"],
        advice: "Rest well, stay hydrated, and monitor temperature. Consult doctor if fever persists over 3 days or exceeds 103°F."
    },
    headache: {
        name: "Headache",
        icon: "🤕",
        conditions: ["Tension Headache", "Migraine", "Dehydration", "Eye Strain", "Sinusitis", "Stress"],
        advice: "Rest in a dark room, stay hydrated, and avoid screens. Seek help if severe or with vision changes."
    },
    cough: {
        name: "Cough",
        icon: "😷",
        conditions: ["Common Cold", "Bronchitis", "Allergies", "Asthma", "COVID-19", "Tuberculosis"],
        advice: "Drink warm fluids, use honey for relief. Consult doctor if cough persists beyond 2 weeks or has blood."
    },
    fatigue: {
        name: "Fatigue",
        icon: "😫",
        conditions: ["Anemia", "Thyroid Issues", "Diabetes", "Depression", "Sleep Disorders", "Vitamin Deficiency"],
        advice: "Ensure adequate sleep, balanced diet. Get blood tests if fatigue is persistent and unexplained."
    },
    chest_pain: {
        name: "Chest Pain",
        icon: "💔",
        conditions: ["Heart Attack", "Angina", "Acid Reflux", "Muscle Strain", "Anxiety", "Pneumonia"],
        advice: "⚠️ URGENT: If severe, call emergency immediately. Don't wait, especially with sweating or arm pain."
    },
    breathing_difficulty: {
        name: "Breathing Difficulty",
        icon: "😰",
        conditions: ["Asthma", "COVID-19", "Pneumonia", "Heart Failure", "Anxiety", "Allergic Reaction"],
        advice: "⚠️ URGENT: Seek immediate medical help if severe. Sit upright and try to stay calm."
    },
    stomach_pain: {
        name: "Stomach Pain",
        icon: "🤢",
        conditions: ["Gastritis", "Food Poisoning", "Appendicitis", "Ulcer", "IBS", "Constipation"],
        advice: "Avoid spicy food, eat light meals. Seek help if pain is severe, persistent, or with vomiting blood."
    },
    joint_pain: {
        name: "Joint Pain",
        icon: "🦴",
        conditions: ["Arthritis", "Gout", "Injury", "Lupus", "Vitamin D Deficiency", "Infection"],
        advice: "Rest the joint, apply ice/heat. Consult doctor if swelling persists or affects daily activities."
    },
    skin_rash: {
        name: "Skin Rash",
        icon: "🔴",
        conditions: ["Allergic Reaction", "Eczema", "Psoriasis", "Fungal Infection", "Heat Rash", "Drug Reaction"],
        advice: "Keep area clean and dry. Avoid scratching. See doctor if spreading rapidly or with fever."
    },
    dizziness: {
        name: "Dizziness",
        icon: "😵",
        conditions: ["Low Blood Pressure", "Dehydration", "Vertigo", "Anemia", "Low Blood Sugar", "Ear Infection"],
        advice: "Sit or lie down immediately. Drink water. Seek help if frequent or with fainting."
    }
};

// ===== Medicine Database =====
const medicineData = {
    paracetamol: {
        name: "Paracetamol (Acetaminophen)",
        brand: "Crocin, Dolo, Calpol",
        purpose: "Pain relief and fever reduction",
        dosage: "500-1000mg every 4-6 hours. Max 4g/day",
        sideEffects: ["Rare liver damage with overdose", "Allergic reactions (rare)"],
        warnings: ["Don't exceed 4g daily", "Avoid with liver disease", "Check other medications for paracetamol content"],
        category: "Analgesic/Antipyretic"
    },
    ibuprofen: {
        name: "Ibuprofen",
        brand: "Brufen, Advil, Combiflam",
        purpose: "Pain, inflammation, and fever",
        dosage: "200-400mg every 4-6 hours. Max 1200mg/day",
        sideEffects: ["Stomach upset", "Heartburn", "Dizziness", "Kidney issues with long use"],
        warnings: ["Take with food", "Avoid in pregnancy", "Not for heart patients", "Can cause stomach bleeding"],
        category: "NSAID"
    },
    cetirizine: {
        name: "Cetirizine",
        brand: "Zyrtec, Alerid, CTZ",
        purpose: "Allergies, hay fever, hives",
        dosage: "10mg once daily",
        sideEffects: ["Drowsiness", "Dry mouth", "Headache"],
        warnings: ["May cause drowsiness - avoid driving", "Use caution in kidney disease"],
        category: "Antihistamine"
    },
    omeprazole: {
        name: "Omeprazole",
        brand: "Omez, Prilosec",
        purpose: "Acid reflux, ulcers, GERD",
        dosage: "20mg once daily before breakfast",
        sideEffects: ["Headache", "Diarrhea", "Vitamin B12 deficiency with long use"],
        warnings: ["Don't use for more than 14 days without doctor", "Take 30 mins before meal"],
        category: "Proton Pump Inhibitor"
    },
    metformin: {
        name: "Metformin",
        brand: "Glycomet, Glucophage",
        purpose: "Type 2 Diabetes management",
        dosage: "500-2000mg daily (as prescribed)",
        sideEffects: ["Nausea", "Diarrhea", "Vitamin B12 deficiency"],
        warnings: ["⚠️ Prescription only", "Take with food", "Monitor kidney function", "Avoid alcohol"],
        category: "Anti-diabetic"
    },
    azithromycin: {
        name: "Azithromycin",
        brand: "Azithral, Zithromax",
        purpose: "Bacterial infections",
        dosage: "500mg once daily for 3 days (as prescribed)",
        sideEffects: ["Nausea", "Diarrhea", "Abdominal pain"],
        warnings: ["⚠️ Prescription only - Complete full course", "Can affect heart rhythm", "Don't take antacids together"],
        category: "Antibiotic"
    },
    amlodipine: {
        name: "Amlodipine",
        brand: "Amlip, Norvasc",
        purpose: "High blood pressure, chest pain",
        dosage: "5-10mg once daily",
        sideEffects: ["Swelling in ankles", "Dizziness", "Flushing"],
        warnings: ["⚠️ Prescription only", "Don't stop suddenly", "Monitor blood pressure regularly"],
        category: "Calcium Channel Blocker"
    },
    aspirin: {
        name: "Aspirin",
        brand: "Dispirin, Ecosprin",
        purpose: "Pain, fever, blood thinning",
        dosage: "75-325mg daily (for heart) or 500mg for pain",
        sideEffects: ["Stomach bleeding", "Bruising", "Allergic reactions"],
        warnings: ["Not for children under 16", "Avoid before surgery", "Take with food", "Can cause bleeding"],
        category: "NSAID/Blood Thinner"
    }
};

// ===== Emergency First Aid =====
const emergencyFirstAid = {
    heart_attack: {
        title: "Heart Attack",
        icon: "fas fa-heartbeat",
        color: "#ef4444",
        symptoms: ["Chest pain/pressure", "Pain in arm, jaw, or back", "Shortness of breath", "Cold sweat", "Nausea"],
        steps: [
            "Call emergency services (112) immediately",
            "Help the person sit down and rest in a comfortable position",
            "Loosen any tight clothing",
            "If the person has aspirin and is not allergic, give 325mg to chew",
            "If person becomes unconscious, be ready for CPR",
            "Stay calm and keep the person calm until help arrives"
        ]
    },
    stroke: {
        title: "Stroke",
        icon: "fas fa-brain",
        color: "#8b5cf6",
        symptoms: ["Face drooping on one side", "Arm weakness", "Speech difficulty", "Time is critical", "Sudden confusion", "Vision problems"],
        steps: [
            "Remember F.A.S.T: Face, Arms, Speech, Time",
            "Call emergency services (112) immediately",
            "Note the time symptoms started",
            "Keep the person lying down with head slightly elevated",
            "Don't give food or water",
            "Don't give any medication",
            "Keep them calm and still"
        ]
    },
    choking: {
        title: "Choking",
        icon: "fas fa-lungs",
        color: "#f59e0b",
        symptoms: ["Unable to speak or breathe", "Clutching throat", "Turning blue", "Weak cough"],
        steps: [
            "Ask 'Are you choking?' - if they can't respond, act fast",
            "Stand behind the person",
            "Place your fist above the navel",
            "Grasp fist with other hand",
            "Perform quick upward thrusts (Heimlich maneuver)",
            "Repeat until object is dislodged",
            "If unconscious, start CPR and call 112"
        ]
    },
    burns: {
        title: "Burns",
        icon: "fas fa-fire",
        color: "#f97316",
        symptoms: ["Red, blistered skin", "Swelling", "Pain", "Charred skin (severe)"],
        steps: [
            "Remove from heat source immediately",
            "Cool the burn under running water for 10-20 minutes",
            "Remove jewelry/clothing near burn (if not stuck)",
            "Cover loosely with sterile bandage",
            "Don't apply ice, butter, or toothpaste",
            "Don't break blisters",
            "Seek medical help for large or severe burns"
        ]
    },
    bleeding: {
        title: "Severe Bleeding",
        icon: "fas fa-tint",
        color: "#dc2626",
        symptoms: ["Heavy blood flow", "Blood soaking through bandage", "Weakness", "Pale skin"],
        steps: [
            "Call emergency services if severe",
            "Apply direct pressure with clean cloth",
            "Keep pressure continuous for at least 10 minutes",
            "If blood soaks through, add more cloth on top",
            "Elevate the injured area above the heart if possible",
            "Apply tourniquet only as last resort for limbs",
            "Keep the person warm and calm"
        ]
    },
    fracture: {
        title: "Fracture",
        icon: "fas fa-bone",
        color: "#6366f1",
        symptoms: ["Severe pain", "Swelling", "Deformity", "Unable to move limb", "Bruising"],
        steps: [
            "Keep the injured area still",
            "Apply ice wrapped in cloth to reduce swelling",
            "Immobilize the area with a splint if possible",
            "Don't try to straighten the bone",
            "Support the injury in position found",
            "Treat for shock if necessary",
            "Get medical help immediately"
        ]
    }
};
