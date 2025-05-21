// Symptom Checker Logic
document.getElementById("symptom-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Get symptom data
    const symptom1 = document.getElementById("symptom1").value.toLowerCase();
    const symptom2 = document.getElementById("symptom2").value.toLowerCase();
    const symptom3 = document.getElementById("symptom3").value.toLowerCase();

    // Combine all symptoms into one string
    const combinedSymptoms = [symptom1, symptom2, symptom3].filter(Boolean).join(", ");

    // Placeholder for disease result
    const diseaseText = document.getElementById("disease-text");

    // Disease prediction
    const diseasePrediction = checkDisease(combinedSymptoms);

    // Display the result
    diseaseText.innerText = diseasePrediction;
});

// Function to check the disease based on symptoms
function checkDisease(symptom) {
    let diseases = {
        "fever": "Viral Flu, Malaria, COVID-19, Typhoid",
        "cough": "Common Cold, Bronchitis, COVID-19, Tuberculosis",
        "headache": "Migraine, Tension Headache, Stress, Meningitis",
        "fatigue": "Anemia, Thyroid Problems, Diabetes, Depression",
        "rash": "Allergy, Chickenpox, Measles, Eczema",
        "shortness of breath": "Asthma, Pneumonia, COVID-19, Heart Disease",
        "sore throat": "Strep Throat, Common Cold, Tonsillitis",
        "nausea": "Food Poisoning, Gastroenteritis, Pregnancy",
        "vomiting": "Food Poisoning, Gastroenteritis, Pregnancy",
        "joint pain": "Arthritis, Lupus, Lyme Disease",
        "chest pain": "Heart Attack, Angina, GERD",
        "diarrhea": "Food Poisoning, IBS, Cholera",
        "abdominal pain": "Appendicitis, Gastritis, Ulcers",
        "chills": "Malaria, Flu, Pneumonia",
        "dizziness": "Low Blood Pressure, Vertigo, Dehydration",
        "sweating excessively": "Hyperthyroidism, Hypoglycemia, Anxiety",
        "runny nose": "Allergies, Common Cold, Sinus Infection",
        "weight loss": "Diabetes, Hyperthyroidism, Cancer",
        "high blood pressure": "Hypertension, Kidney Disease, Heart Disease",
        "weakness": "Anemia, Chronic Fatigue Syndrome, Stroke",
        "difficulty swallowing": "GERD, Esophageal Cancer, Stroke",
        "fever, cough, chestpain": "Flu, Malaria, Common Cold, Angina, COVID-19"
    };

    // Exact match for combined symptoms
    if (diseases[symptom]) {
        return diseases[symptom];
    }

    // Fallback to individual symptoms
    let possibleDiseases = [];
    for (const [key, value] of Object.entries(diseases)) {
        if (symptom.includes(key)) {
            possibleDiseases.push(value);
        }
    }

    if (possibleDiseases.length > 0) {
        return `Possible Diseases: ${[...new Set(possibleDiseases.join(", ").split(", "))].join(", ")}`;
    } else {
        return "No matching disease found. Consult a doctor.";
    }
}
