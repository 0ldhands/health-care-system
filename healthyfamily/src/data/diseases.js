export const diseaseData = [

  {
    id: 1,
    name: "Common Cold",
    category: "Respiratory",
    symptoms: ["cough","sneezing","runny nose","sore throat","mild fever"],
    severity: "Low",
    emergency: false,
    precautions: ["Take rest","Drink warm fluids","Steam inhalation"],
    info: "Common viral infection affecting upper respiratory tract.",
    doctor: "General Physician"
  },

  {
    id: 2,
    name: "Migraine",
    category: "Neurological",
    symptoms: ["severe headache","nausea","light sensitivity","dizziness","vomiting"],
    severity: "Medium",
    emergency: false,
    precautions: ["Rest in dark room","Avoid loud sounds","Stay hydrated"],
    info: "Recurring intense headache disorder.",
    doctor: "Neurologist"
  },

  {
    id: 3,
    name: "Influenza (Flu)",
    category: "Respiratory",
    symptoms: ["high fever","chills","body pain","fatigue","dry cough"],
    severity: "Medium",
    emergency: false,
    precautions: ["Rest","Drink fluids","Monitor temperature"],
    info: "Contagious viral respiratory infection.",
    doctor: "General Physician"
  },

  {
    id: 4,
    name: "Food Poisoning",
    category: "Digestive",
    symptoms: ["vomiting","diarrhea","stomach cramps","nausea","fever"],
    severity: "Medium",
    emergency: false,
    precautions: ["Drink ORS","Stay hydrated","Avoid solid food temporarily"],
    info: "Illness caused by contaminated food.",
    doctor: "Gastroenterologist"
  },

  {
    id: 5,
    name: "Hypertension",
    category: "Cardiac",
    symptoms: ["high blood pressure","headache","chest pain","blurred vision","dizziness"],
    severity: "High",
    emergency: false,
    precautions: ["Reduce salt","Exercise","Monitor BP"],
    info: "High blood pressure condition.",
    doctor: "Cardiologist"
  },

  {
    id: 6,
    name: "Diabetes",
    category: "Hormonal",
    symptoms: ["frequent urination","excess thirst","fatigue","blurred vision","weight loss"],
    severity: "High",
    emergency: false,
    precautions: ["Monitor sugar","Avoid sugar","Exercise"],
    info: "Blood sugar regulation disorder.",
    doctor: "Endocrinologist"
  },

  {
    id: 7,
    name: "Heart Attack Risk",
    category: "Cardiac",
    symptoms: ["chest pain","shortness of breath","left arm pain","sweating","nausea"],
    severity: "Critical",
    emergency: true,
    precautions: ["Seek immediate help","Avoid exertion","Call ambulance"],
    info: "Emergency cardiac condition.",
    doctor: "Cardiologist"
  },

  {
    id: 8,
    name: "Asthma",
    category: "Respiratory",
    symptoms: ["breathing difficulty","wheezing","chest tightness","cough"],
    severity: "High",
    emergency: true,
    precautions: ["Use inhaler","Avoid dust","Stay calm"],
    info: "Chronic lung condition affecting breathing.",
    doctor: "Pulmonologist"
  },

  {
    id: 9,
    name: "Anemia",
    category: "Blood",
    symptoms: ["fatigue","pale skin","dizziness","weakness","shortness of breath"],
    severity: "Medium",
    emergency: false,
    precautions: ["Iron rich food","Supplements","Regular checkup"],
    info: "Low hemoglobin levels.",
    doctor: "General Physician"
  },

  {
    id: 10,
    name: "Acidity / Gastritis",
    category: "Digestive",
    symptoms: ["stomach burning","acid reflux","bloating","nausea","burping"],
    severity: "Low",
    emergency: false,
    precautions: ["Avoid spicy food","Eat on time","Drink water"],
    info: "Stomach acid irritation condition.",
    doctor: "Gastroenterologist"
  },

  {
    id: 11,
    name: "Allergy",
    category: "Immune",
    symptoms: ["sneezing","itching","skin rash","watery eyes","runny nose"],
    severity: "Low",
    emergency: false,
    precautions: ["Avoid allergens","Take antihistamines","Wear mask"],
    info: "Body immune reaction to allergens.",
    doctor: "Dermatologist"
  },

  {
    id: 12,
    name: "Urinary Tract Infection",
    category: "Urinary",
    symptoms: ["burning urination","frequent urination","lower abdomen pain","fever"],
    severity: "Medium",
    emergency: false,
    precautions: ["Drink water","Maintain hygiene","Medical consultation"],
    info: "Bacterial infection in urinary tract.",
    doctor: "Urologist"
  },

  {
    id: 13,
    name: "Depression",
    category: "Mental Health",
    symptoms: ["sadness","loss of interest","sleep problems","low energy","hopelessness"],
    severity: "High",
    emergency: false,
    precautions: ["Talk to someone","Therapy","Regular routine"],
    info: "Mental health condition affecting mood.",
    doctor: "Psychiatrist"
  },



  // ================= RESPIRATORY =================
  {
    id: 14,
    name: "Bronchitis",
    category: "Respiratory",
    symptoms: ["persistent cough","mucus","fatigue","chest discomfort","mild fever"],
    severity: "Medium",
    emergency: false,
    precautions: ["Rest","Drink fluids","Avoid smoke"],
    info: "Inflammation of bronchial tubes.",
    doctor: "Pulmonologist"
  },

  {
    id: 15,
    name: "Pneumonia",
    category: "Respiratory",
    symptoms: ["high fever","chest pain","breathing difficulty","cough","fatigue"],
    severity: "High",
    emergency: true,
    precautions: ["Seek doctor","Take antibiotics if prescribed","Rest"],
    info: "Lung infection causing inflammation.",
    doctor: "Pulmonologist"
  },

  // ================= SKIN =================
  {
    id: 16,
    name: "Fungal Infection",
    category: "Skin",
    symptoms: ["itching","red patches","skin peeling","burning sensation"],
    severity: "Low",
    emergency: false,
    precautions: ["Keep skin dry","Use antifungal cream","Avoid sweating"],
    info: "Common fungal skin infection.",
    doctor: "Dermatologist"
  },

  {
    id: 17,
    name: "Acne",
    category: "Skin",
    symptoms: ["pimples","oily skin","blackheads","whiteheads"],
    severity: "Low",
    emergency: false,
    precautions: ["Clean face","Avoid oily food","Dermatology care"],
    info: "Common skin condition due to clogged pores.",
    doctor: "Dermatologist"
  },

  // ================= DIGESTIVE =================
  {
    id: 18,
    name: "Constipation",
    category: "Digestive",
    symptoms: ["hard stool","abdominal pain","bloating","infrequent bowel movement"],
    severity: "Low",
    emergency: false,
    precautions: ["Eat fiber","Drink water","Exercise"],
    info: "Difficulty passing stool.",
    doctor: "General Physician"
  },

  {
    id: 19,
    name: "Diarrhea",
    category: "Digestive",
    symptoms: ["loose stool","dehydration","stomach cramps","nausea"],
    severity: "Medium",
    emergency: false,
    precautions: ["ORS","Hydration","Avoid street food"],
    info: "Frequent loose bowel movements.",
    doctor: "General Physician"
  },

  // ================= MENTAL HEALTH =================
  {
    id: 20,
    name: "Anxiety Disorder",
    category: "Mental Health",
    symptoms: ["restlessness","rapid heartbeat","fear","sweating","overthinking"],
    severity: "High",
    emergency: false,
    precautions: ["Breathing exercises","Meditation","Therapy"],
    info: "Excessive fear and worry disorder.",
    doctor: "Psychiatrist"
  },

  {
    id: 21,
    name: "Insomnia",
    category: "Mental Health",
    symptoms: ["difficulty sleeping","night waking","fatigue","low concentration"],
    severity: "Medium",
    emergency: false,
    precautions: ["Sleep routine","Avoid phone at night","Relaxation"],
    info: "Sleep disorder affecting rest quality.",
    doctor: "Psychologist"
  },

  // ================= WOMEN HEALTH =================
  {
    id: 22,
    name: "PCOS",
    category: "Women Health",
    symptoms: ["irregular periods","weight gain","acne","hair growth","mood swings"],
    severity: "High",
    emergency: false,
    precautions: ["Exercise","Balanced diet","Hormone monitoring"],
    info: "Hormonal disorder affecting ovaries.",
    doctor: "Gynecologist"
  },

  {
    id: 23,
    name: "Menstrual Cramps",
    category: "Women Health",
    symptoms: ["lower abdomen pain","back pain","nausea","fatigue"],
    severity: "Low",
    emergency: false,
    precautions: ["Heat pad","Rest","Hydration"],
    info: "Pain during menstruation.",
    doctor: "Gynecologist"
  },

  // ================= GENERAL INFECTION =================
  {
    id: 24,
    name: "Dengue",
    category: "Infection",
    symptoms: ["high fever","joint pain","skin rash","headache","eye pain"],
    severity: "Critical",
    emergency: true,
    precautions: ["Hospital check","Mosquito protection","Hydration"],
    info: "Mosquito-borne viral infection.",
    doctor: "General Physician"
  },

  {
    id: 25,
    name: "Typhoid",
    category: "Infection",
    symptoms: ["prolonged fever","weakness","stomach pain","loss of appetite"],
    severity: "High",
    emergency: true,
    precautions: ["Clean water","Doctor consultation","Antibiotics"],
    info: "Bacterial infection through contaminated food.",
    doctor: "General Physician"
  },

  // ================= LIFESTYLE =================
  {
    id: 26,
    name: "Obesity",
    category: "Lifestyle",
    symptoms: ["excess weight","fatigue","joint pain","breathlessness"],
    severity: "High",
    emergency: false,
    precautions: ["Exercise","Healthy diet","Lifestyle change"],
    info: "Excess body fat affecting health.",
    doctor: "Nutritionist"
  },

  {
    id: 27,
    name: "Vitamin D Deficiency",
    category: "Nutrition",
    symptoms: ["bone pain","fatigue","weakness","muscle pain"],
    severity: "Medium",
    emergency: false,
    precautions: ["Sunlight exposure","Supplements","Healthy diet"],
    info: "Low vitamin D levels.",
    doctor: "General Physician"
  },

{
  id: 28,
  name: "Chickenpox",
  category: "Children",
  symptoms: ["skin rash","fever","itching","fatigue","loss of appetite"],
  severity: "Medium",
  emergency: false,
  precautions: ["Isolation","Calamine lotion","Rest"],
  info: "Highly contagious viral infection common in children.",
  doctor: "Pediatrician"
},

{
  id: 29,
  name: "Measles",
  category: "Children",
  symptoms: ["high fever","red rash","cough","runny nose","watery eyes"],
  severity: "High",
  emergency: true,
  precautions: ["Vaccination","Doctor consultation","Isolation"],
  info: "Serious viral infection spreading through air.",
  doctor: "Pediatrician"
},

{
  id: 30,
  name: "Ear Infection",
  category: "Children",
  symptoms: ["ear pain","fever","irritability","sleep issues"],
  severity: "Medium",
  emergency: false,
  precautions: ["Warm compress","Doctor visit","Pain relief"],
  info: "Common bacterial infection in children.",
  doctor: "ENT Specialist"
},

{
  id: 31,
  name: "Pregnancy Nausea",
  category: "Women",
  symptoms: ["morning sickness","vomiting","fatigue","food aversion"],
  severity: "Low",
  emergency: false,
  precautions: ["Small meals","Hydration","Rest"],
  info: "Common during early pregnancy.",
  doctor: "Gynecologist"
},

{
  id: 32,
  name: "Menopause Symptoms",
  category: "Women",
  symptoms: ["hot flashes","mood swings","sleep problems","irregular periods"],
  severity: "Medium",
  emergency: false,
  precautions: ["Healthy diet","Exercise","Medical advice"],
  info: "Hormonal changes during aging.",
  doctor: "Gynecologist"
},

{
  id: 33,
  name: "Prostate Enlargement",
  category: "Men",
  symptoms: ["frequent urination","weak urine flow","night urination"],
  severity: "Medium",
  emergency: false,
  precautions: ["Doctor checkup","Avoid caffeine","Hydration"],
  info: "Common in older men.",
  doctor: "Urologist"
},

{
  id: 34,
  name: "Hair Loss",
  category: "Men",
  symptoms: ["hair thinning","bald patches","scalp visibility"],
  severity: "Low",
  emergency: false,
  precautions: ["Balanced diet","Stress control","Dermatology consult"],
  info: "Hormonal or genetic condition.",
  doctor: "Dermatologist"
},

{
  id: 35,
  name: "Arthritis",
  category: "Old Age",
  symptoms: ["joint pain","stiffness","swelling","reduced movement"],
  severity: "High",
  emergency: false,
  precautions: ["Light exercise","Physiotherapy","Pain management"],
  info: "Joint inflammation common in elderly.",
  doctor: "Orthopedic"
},

{
  id: 36,
  name: "Alzheimer's Disease",
  category: "Old Age",
  symptoms: ["memory loss","confusion","behavior changes","forgetfulness"],
  severity: "Critical",
  emergency: true,
  precautions: ["Medical supervision","Brain activities","Support care"],
  info: "Progressive neurological disorder.",
  doctor: "Neurologist"
},

{
  id: 37,
  name: "Osteoporosis",
  category: "Old Age",
  symptoms: ["bone weakness","back pain","frequent fractures"],
  severity: "High",
  emergency: false,
  precautions: ["Calcium intake","Exercise","Bone density test"],
  info: "Weak bones due to aging.",
  doctor: "Orthopedic"
}
]