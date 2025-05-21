// Symptom Checker Logic
document.getElementById("symptom-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Get symptom data
    const symptom1 = document.getElementById("symptom1").value.toLowerCase();
    const symptom2 = document.getElementById("symptom2").value.toLowerCase();
    const symptom3 = document.getElementById("symptom3").value.toLowerCase();

    // Placeholder for disease result
    const diseaseText = document.getElementById("disease-text");

    // Basic disease prediction logic (for demo purposes)
    const diseasePrediction = checkDisease(symptom1, symptom2, symptom3);

    // Display the result
    diseaseText.innerText = diseasePrediction;
});

// Function to check the disease based on symptoms
function checkDisease(symptom1, symptom2, symptom3) {
    // Simple mapping for demo purposes
    const diseaseMap = {
        "fever": "Flu",
        "cough": "Cold",
        "headache": "Migraine",
        "fatigue": "Anemia",
        "nausea": "Food Poisoning",
        "shortness of breath": "Asthma",
        "sore throat": "Strep Throat",
        "chest pain": "Heart Disease",
        "diarrhea": "Gastroenteritis",
        "vomiting": "Food Poisoning",
        "rash": "Allergy",
        "dizziness": "Vertigo",
        "blurred vision": "Glaucoma",
        "runny nose": "Allergic Rhinitis",
        "muscle pain": "Influenza",
        "joint pain": "Arthritis",
        "abdominal pain": "Appendicitis",
        "weight loss": "Diabetes",
        "weight gain": "Hypothyroidism",
        "insomnia": "Anxiety",
        "anxiety": "Generalized Anxiety Disorder",
        "depression": "Depressive Disorder",
        "palpitations": "Arrhythmia",
        "sweating": "Hyperthyroidism",
        "itching": "Eczema",
        "frequent urination": "Diabetes",
        "burning urination": "Urinary Tract Infection",
        "back pain": "Kidney Stones",
        "yellow skin": "Hepatitis",
        "swelling": "Congestive Heart Failure",
        "dry mouth": "Dehydration",
        "red eyes": "Conjunctivitis",
        "hair loss": "Alopecia",
        "loss of smell": "COVID-19",
        "loss of taste": "COVID-19",
        "sensitivity to light": "Meningitis",
        "cold hands": "Raynaud’s Disease",
        "tingling": "Neuropathy"
    };

    let potentialDisease = [];

    // Check each symptom and map to diseases
    [symptom1, symptom2, symptom3].forEach(symptom => {
        for (const [key, value] of Object.entries(diseaseMap)) {
            if (symptom.includes(key)) {
                potentialDisease.push(value);
            }
        }
    });

    // Return result
    if (potentialDisease.length > 0) {
        return `Possible Diseases: ${[...new Set(potentialDisease)].join(", ")}`;
    } else {
        return "No matching disease found. Please consult a doctor for more accurate diagnosis.";
    }
}
