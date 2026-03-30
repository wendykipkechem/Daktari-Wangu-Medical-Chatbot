const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Greetings in English & Kiswahili
const greetings = [
  "hello", "hi", "hey", "good morning", "good afternoon", "good evening",
  "habari", "hujambo", "salamu", "mambo"
];

// Rotating contact phrases
const contactPhrases = [
  "If symptoms persist, reach out to Dr. Wendy.",
  "For further guidance, consult Dr. Wendy.",
  "Don’t hesitate to contact Dr. Wendy if you feel unwell.",
  "Reach Dr. Wendy for professional advice if needed.",
  "Make sure to check with Dr. Wendy if things don’t improve.",
  "For any concerns, Dr. Wendy is just a message away.",
  "Contact Dr. Wendy for medical assistance if required.",
  "If you feel worse, consult Dr. Wendy immediately.",
  "Dr. Wendy is available for guidance if needed.",
  "Always seek Dr. Wendy’s advice for any health concerns."
];

function getRandomContact() {
  return contactPhrases[Math.floor(Math.random() * contactPhrases.length)];
}

// Disease & symptom responses with emojis
const responses = {
  "headache": ["Try resting in a dark room and staying hydrated.", "🤕"],
  "fever": ["Rest, hydrate, and monitor your temperature.", "🤒"],
  "cough": ["Stay hydrated and try honey. If severe, consult a doctor.", "🤧"],
  "flu": ["Rest, fluids, and consider OTC meds. Consult a doctor if symptoms worsen.", "🤒💊"],
  "diarrhea": ["Stay hydrated and avoid dairy/fatty foods.", "💦"],
  "nausea": ["Drink fluids and eat small bland meals.", "🤢"],
  "sore throat": ["Hydrate, use lozenges, saltwater gargles.", "😷🍬"],
  "rash": ["Avoid scratching, try creams. Consult if accompanied by other symptoms.", "🤕🩹"],
  "back pain": ["Rest, ice/heat packs, pain relievers.", "💆‍♂️🩹"],
  "allergies": ["Avoid triggers, antihistamines may help.", "🤧🌼"],
  "asthma": ["Follow your plan, use inhaler, avoid triggers.", "💨😮‍💨"],
  "stomachache": ["Rest, hydrate, avoid spicy/fatty foods.", "🤢🍲"],
  "constipation": ["Increase fiber, hydrate, mild laxative if needed.", "🥗💧"],
  "anxiety": ["Relaxation techniques, meditation. See mental health professional if severe.", "🧘‍♂️💚"],
  "fatigue": ["Ensure rest, hydration, and balanced diet.", "😴💤"],
  "insomnia": ["Maintain sleep routine, avoid screens at night.", "🌙😴"],
  "cold": ["Stay warm, hydrate, rest.", "🥶💧"],
  "migraine": ["Rest in dark room, avoid triggers, consider OTC meds.", "🤯"],
  "dehydration": ["Drink water and electrolyte solutions.", "💧😓"],
  "ear pain": ["Warm compress, pain relievers. See doctor if persists.", "👂😖"],
  "eye irritation": ["Use artificial tears, avoid rubbing.", "👁️💦"],
  "toothache": ["Oral hygiene, pain relievers. See dentist if persists.", "🦷😬"],
  "joint pain": ["Rest, ice/heat packs, pain relievers.", "🦵💢"],
  "muscle pain": ["Rest, massage, mild pain relievers.", "💪💢"],
  "depression": ["Talk therapy, exercise, professional help if severe.", "😔💛"],
  "skin irritation": ["Avoid irritants, moisturize. Consult if persists.", "🧴😣"],
  "high blood pressure": ["Monitor regularly, reduce salt, exercise.", "💓⚠️"],
  "low blood pressure": ["Stay hydrated, avoid sudden standing.", "💓⚠️"],
  "heartburn": ["Avoid spicy/fatty foods, small meals.", "🔥🥴"],
  "vomiting": ["Hydrate, rest. Seek medical attention if persistent.", "🤮💧"],
  "shortness of breath": ["Sit upright, relax. Consult immediately if severe.", "😮‍💨⚠️"],
  "dizziness": ["Sit/lie down, hydrate. Consult doctor if persistent.", "😵💫"],
  "cold sores": ["Avoid touching, topical meds. Consult if severe.", "👄😷"],
  "skin infection": ["Keep area clean, antibiotics if prescribed. Consult doctor.", "🦠🩹"],
  "allergic reaction": ["Avoid trigger, antihistamines, seek urgent care if severe.", "⚠️🤧"],
  "bronchitis": ["Rest, hydrate, avoid smoke. Consult doctor if worsens.", "💨🤒"],
  "pneumonia": ["Seek medical attention immediately.", "⚠️😷"],
  "chest pain": ["Seek medical attention immediately.", "⚠️💔"],
  "urinary tract infection": ["Hydrate, see doctor for antibiotics.", "🚽😖"],
  "kidney pain": ["Hydrate, rest, consult doctor.", "🩺💦"],
  "menstrual cramps": ["Rest, heat pack, pain relievers.", "🌸😣"],
  "pregnancy nausea": ["Small meals, hydrate, rest. Consult doctor if severe.", "🤰🤢"],
  "allergy sneezing": ["Avoid allergens, antihistamines may help.", "🤧🌼"],
  "food poisoning": ["Hydrate, rest. Consult doctor if persistent.", "🤢⚠️"],
  "burn": ["Cool water, cover, seek medical help if severe.", "🔥🩹"],
  "infection": ["Keep area clean, antibiotics if prescribed. Consult doctor.", "🦠⚠️"]
  // Add more as needed
};

// Track user symptoms
let userSymptoms = [];
let symptomSeverity = {};

// Add message to chat box
function addMessage(sender, text) {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.textContent = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Check if input is greeting
function isGreeting(text) {
  return greetings.some(greet => text.includes(greet));
}

// Listen for Enter key
userInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = userInput.value.trim().toLowerCase();
  if (!text) return;

  addMessage("user", userInput.value);
  userInput.value = "";

  setTimeout(() => {
    let matchedResponses = [];

    // Greeting
    if (isGreeting(text)) {
      matchedResponses.push(["Hello! How can I assist you today?", "😊"]);
    }

    // Detect symptoms
    for (let key in responses) {
      if (text.includes(key) && !userSymptoms.includes(key)) {
        userSymptoms.push(key);
        symptomSeverity[key] = responses[key][2]; // store severity level
        matchedResponses.push(responses[key]);
      }
    }

    // Check for urgent/critical symptoms
    const criticalSymptoms = userSymptoms.filter(s => symptomSeverity[s] === "critical");
    const urgentSymptoms = userSymptoms.filter(s => symptomSeverity[s] === "urgent");

    let priorityAlert = "";
    if (criticalSymptoms.length > 0) {
      priorityAlert = "⚠️ Alert: You reported critical symptoms (" + criticalSymptoms.join(", ") + "). Seek immediate medical attention! " + getRandomContact();
    } else if (urgentSymptoms.length > 0) {
      priorityAlert = "⚠️ Notice: You reported urgent symptoms (" + urgentSymptoms.join(", ") + "). Please consult a doctor soon. " + getRandomContact();
    }

    // Construct final response
    let finalResponse = matchedResponses.length > 0
      ? matchedResponses.map(r => r[0] + " " + r[1] + " " + getRandomContact()).join(" | ")
      : "Thank you for sharing. " + getRandomContact();

    if (priorityAlert) {
      finalResponse += " | " + priorityAlert;
    }

    addMessage("bot", finalResponse);
  }, 700);
}

// Initial greeting
addMessage("bot", "Welcome to Daktari Wangu! " + getRandomContact() + " 😊");
