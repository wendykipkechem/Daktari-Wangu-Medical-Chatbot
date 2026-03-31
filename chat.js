const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

// Greetings in English & Kiswahili
const greetings = [
  "hello", "hi", "hey", "good morning", "good afternoon", "good evening",
  "habari", "hujambo", "salamu", "mambo"
];

// Disease & symptom responses with medicines, dosages, instructions & severity
const responses = {
  "headache": {
    advice: "Rest in a dark room, stay hydrated, and avoid loud noises.",
    medicines: "Paracetamol 500mg every 6 hours as needed.",
    severity: "mild",
    emoji: "🤕",
    tips: "If headaches persist for more than 3 days or worsen, consult a doctor."
  },
  "fever": {
    advice: "Drink plenty of fluids, rest, and monitor your temperature.",
    medicines: "Paracetamol 500mg every 6 hours if temperature >38°C.",
    severity: "moderate",
    emoji: "🤒",
    tips: "Seek medical help if fever exceeds 40°C or lasts more than 3 days."
  },
  "cough": {
    advice: "Drink warm fluids and honey. Avoid smoke and cold air.",
    medicines: "Cough syrup 10ml, 3 times daily.",
    severity: "mild",
    emoji: "🤧",
    tips: "If cough persists beyond 2 weeks or is accompanied by blood, see a doctor."
  },
  "flu": {
    advice: "Rest, drink fluids, and avoid spreading germs.",
    medicines: "Paracetamol 500mg every 6 hours for fever. OTC cold meds if needed.",
    severity: "moderate",
    emoji: "🤒💊",
    tips: "Flu vaccines help prevent future infections."
  },
  "diarrhea": {
    advice: "Stay hydrated and avoid fatty or dairy foods.",
    medicines: "Oral Rehydration Salts (ORS) 1L every 6 hours.",
    severity: "moderate",
    emoji: "💦",
    tips: "Seek help if diarrhea lasts more than 2 days or if there is blood in stools."
  },
  "nausea": {
    advice: "Eat small bland meals and drink fluids.",
    medicines: "Domperidone 10mg, 3 times a day before meals.",
    severity: "mild",
    emoji: "🤢",
    tips: "If nausea persists for more than 2 days or causes dehydration, consult a doctor."
  },
  "sore throat": {
    advice: "Hydrate, use lozenges, and gargle with saltwater twice daily.",
    medicines: "Antiseptic throat spray as needed.",
    severity: "mild",
    emoji: "😷🍬",
    tips: "If pain is severe, accompanied by fever, or lasts more than a week, see a doctor."
  },
  "rash": {
    advice: "Keep area clean, avoid scratching, and use creams if necessary.",
    medicines: "Hydrocortisone cream twice daily.",
    severity: "mild",
    emoji: "🤕🩹",
    tips: "Consult doctor if rash spreads rapidly or is accompanied by fever."
  },
  "back pain": {
    advice: "Rest, use hot/cold packs, and gentle stretching.",
    medicines: "Ibuprofen 400mg every 8 hours as needed.",
    severity: "moderate",
    emoji: "💆‍♂️🩹",
    tips: "See doctor if pain persists more than 2 weeks or radiates to legs."
  },
  "allergies": {
    advice: "Avoid triggers such as pollen, dust, or animal dander.",
    medicines: "Cetirizine 10mg once daily.",
    severity: "mild",
    emoji: "🤧🌼",
    tips: "Seek urgent care if you have difficulty breathing or swelling of lips/tongue."
  }, // ✅ comma fixed

  "menstrual cramps": {
    advice: "Rest, use a heating pad on your abdomen, and perform light stretching.",
    medicines: "Ibuprofen 400mg every 6–8 hours as needed.",
    severity: "moderate",
    emoji: "🌸😣",
    tips: "Seek medical advice if cramps are severe, irregular, or accompanied by heavy bleeding."
  },
  "high blood pressure": {
    advice: "Reduce salt intake, exercise regularly, and monitor blood pressure.",
    medicines: "Lisinopril 10mg once daily if prescribed by doctor.",
    severity: "moderate",
    emoji: "💓⚠️",
    tips: "Regular checkups are important to avoid complications."
  },
  "low blood pressure": {
    advice: "Drink more fluids, rise slowly from sitting/lying positions.",
    medicines: "Fluids with electrolytes; medication only if prescribed.",
    severity: "mild",
    emoji: "💓⚠️",
    tips: "Seek medical advice if you feel dizzy or faint frequently."
  },
  "heartburn": {
    advice: "Avoid spicy/fatty foods, eat smaller meals, and avoid lying down immediately after eating.",
    medicines: "Antacids like Gaviscon as needed.",
    severity: "mild",
    emoji: "🔥🥴",
    tips: "If heartburn is frequent, consult a doctor for further evaluation."
  },
  "vomiting": {
    advice: "Rest, sip water or oral rehydration solution slowly.",
    medicines: "Ondansetron 4mg as prescribed for nausea/vomiting.",
    severity: "moderate",
    emoji: "🤮💧",
    tips: "Seek medical attention if vomiting is persistent or accompanied by severe pain."
  },
  "urinary tract infection": {
    advice: "Drink plenty of water and maintain hygiene.",
    medicines: "Ciprofloxacin 500mg twice daily for 3 days if prescribed.",
    severity: "moderate",
    emoji: "🚽😖",
    tips: "Consult doctor if you notice blood in urine or fever."
  },
  "kidney pain": {
    advice: "Rest, stay hydrated, and avoid heavy physical activity.",
    medicines: "Paracetamol 500mg for pain if needed.",
    severity: "moderate",
    emoji: "🩺💦",
    tips: "Seek medical care if pain is severe or persistent."
  },
  "pregnancy nausea": {
    advice: "Eat small meals frequently, stay hydrated, and rest.",
    medicines: "Vitamin B6 25mg twice daily if recommended.",
    severity: "mild",
    emoji: "🤰🤢",
    tips: "Seek medical advice if vomiting is severe or causes dehydration."
  },
  "food poisoning": {
    advice: "Drink plenty of fluids, rest, and avoid solid food until symptoms ease.",
    medicines: "ORS and antibiotics only if prescribed.",
    severity: "moderate",
    emoji: "🤢⚠️",
    tips: "Seek urgent care if vomiting is persistent or you notice blood in stools."
  },

"diarrhoea": {
  advice: "Drink plenty of clean fluids such as water and oral rehydration solutions (ORS), eat light foods, and rest.",
  medicines: "ORS sachets, Zinc tablets (10–20mg daily for 10–14 days), and antidiarrheal medication if prescribed.",
  severity: "moderate",
  emoji: "💧🚽",
  tips: "Seek medical attention if diarrhoea lasts more than 2–3 days, contains blood, or leads to dehydration (dry mouth, dizziness, reduced urination)."
},


  "burn": {
    advice: "Cool the burn under running water for 15–20 minutes, avoid popping blisters.",
    medicines: "Apply antibiotic ointment if necessary.",
    severity: "moderate",
    emoji: "🔥🩹",
    tips: "Seek immediate medical attention if burn is large, deep, or on the face/hands."
  }
};

// Track user symptoms detected
let userSymptoms = [];

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

// Main message handling
function sendMessage() {
  const text = userInput.value.trim().toLowerCase();
  if (!text) return;

  addMessage("user", userInput.value);
  userInput.value = "";

  setTimeout(() => {
    let matchedResponses = [];

    // Greeting - enhanced with dynamic responses
    if (isGreeting(text)) {
      const greetingReplies = [
        "Hello! 😊 I can suggest medicines, care instructions, and tips based on your symptoms.",
        "Hi there! 🤗 Describe your symptoms and I'll help you with advice and medications.",
        "Hey! 👋 Tell me what you're feeling and I'll suggest some care tips.",
        "Habari! 🌟 I can guide you on medicines and home care for your symptoms."
      ];
      const randomIndex = Math.floor(Math.random() * greetingReplies.length);
      matchedResponses.push(greetingReplies[randomIndex]);
    }

    // Detect multiple symptoms in one message
    for (let key in responses) {
      if (text.includes(key) && !userSymptoms.includes(key)) {
        userSymptoms.push(key);
        const r = responses[key];
        matchedResponses.push(
          `Symptom: ${key}\nAdvice: ${r.advice}\nMedicine: ${r.medicines}\nSeverity: ${r.severity}\nTips: ${r.tips}\nEmoji: ${r.emoji}`
        );
      }
    }

    // Final response
    let finalResponse = matchedResponses.length > 0
      ? matchedResponses.join("\n\n")
      : "Sorry, I couldn't recognize any symptom. Can you describe it differently? 🤔";

    addMessage("bot", finalResponse);
  }, 700);
}

// Initial greeting
addMessage("bot", "Welcome to Daktari Wangu! I can suggest medicines, care instructions, and tips based on your symptoms. 😊");
