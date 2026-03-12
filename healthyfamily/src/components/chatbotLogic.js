export const getBotReply = (msg) => {
  const text = msg.toLowerCase().trim();


  const healthModules = [
    {
      name: "Mental Health",
      keywords: /sad|depressed|stress|anxiety|lonely|panic|alone|low/,
      reply: {
        message: ["🌿 Don't worry! Take deep breaths and try talking to someone you trust.",
                 "Take a small break, relax, and remember every step counts. 💛",
                 "You are stronger than you think! Reach out to someone you trust today.",
                 "💙 Try doing something you enjoy for a few minutes—it can lift your mood!",
                 "Remember to breathe deeply and take things one step at a time. You’ve got this!",
                 "Talking to someone you trust can help lighten your mind. You are not alone.",
                 "🌟 Focus on small wins today. Every positive step matters!",
                 "Self-care is important. Take a walk, listen to music, or just breathe.",
                 "You are valued and important. Be kind to yourself and take things slow."],
        helpline: ["📞9152987821", "📞1800-599-0019"],
        firstAid: "Distract yourself with your hobbies, listen music and set goals for future and step it to achieve."
      }
    },
    {
      name: "Suicide / Self-Harm",
      keywords: /suicide|kill|kill myself|die|self harm|no future/,
      reply: {
        message:[ "💙 You are not alone. Please talk to someone immediately.",
            "Your life matters! Talk to a trusted person right now. 💛",
            "It's okay to ask for help. You are stronger than you think. 🌟",
            "💖 Take a deep breath. Help is just a call away—don’t stay alone.",
            "You are valued and loved. Please speak to someone you trust immediately.",
            "Even when it feels dark, there is hope. Reach out, someone cares about you. 💛",
            "Your feelings are valid. You don’t have to face this alone.",
            "Please call a helpline or trusted person. Talking helps, and you are not alone.",
            "You are important and your life matters. Help is available right now. 🌟",
            "Take one step at a time—reach out to someone who can support you today."],
        helpline: ["📞9152987821", "📞1800-599-0019", "🚑108", "🚨112"],
        firstAid: "You need HELP! \n Stay with trusted people & avoid isolation."
      }
    },
    {
  name: "Emergency / Cardiac",
  keywords: /chest pain|heart pain|pressure chest|breathing problem/,
  reply: {
    message: [
      "🚨 Serious cardiac symptoms detected. Seek medical help immediately!",
      "💓 Chest pain can be serious. Call emergency services right away!",
      "⚠️ Don’t wait! Contact a doctor or call 108 immediately.",
      "Your heart health is critical. Get medical attention now! 🚑",
      "Chest discomfort shouldn’t be ignored. Please seek help immediately!",
      "Act fast! 🚨 If you feel chest pressure or trouble breathing, call emergency services.",
      "Your safety comes first! Reach out for immediate medical care.",
      "💖 Stay calm and contact a hospital or ambulance immediately.",
      "Time matters in cardiac issues. Please call 108 or 112 right away!",
      "Do not ignore these symptoms! Seek urgent medical help immediately."
    ],
    helpline: ["🚑108", "🚨112"],
    firstAid: "Sit down calmly, loosen tight clothes, stay calm, conway someone nearby and call emergency services immediately. Do not delay!"
  }
},

    {
  name: "Fever / Cold / Flu",
  keywords: /fever|cold|cough|flu/,
  reply: {
    message: [
      "🤒 Stay hydrated and rest. If fever lasts more than 3 days, consult a doctor.",
      "💧 Drink plenty of water and get enough sleep to recover faster.",
      "Take care! Rest well and monitor your symptoms closely.",
      "Warm fluids and light meals can help you feel better quickly.",
      "🌿 Try to relax and let your body heal. Seek a doctor if needed.",
      "Monitor your temperature regularly. Rest is important for recovery.",
      "If you feel weak, avoid strenuous activity and stay hydrated.",
      "Light soups and warm drinks can help soothe your throat and body.",
      "Fever or cough? Keep an eye on symptoms and contact a doctor if persistent.",
      "💙 Take it easy, drink fluids, and rest. Your health comes first!"
    ],
    firstAid: "Take rest, stay hydrated and consult a doctor. Healthy food is important for recovery."
  }
},
    {
  name: "Headache / Migraine",
  keywords: /headache|migraine|dizziness|dizzy|stupor/,
  reply: {
    message: [
      "💆 Drink water, rest your eyes, and avoid bright screens.",
      "Take a short break, relax, and try some deep breathing.",
      "A calm, quiet environment can help relieve headache symptoms.",
      "🌿 Stay hydrated and rest—sometimes a short nap helps too.",
      "Avoid loud noises and bright lights; it may reduce discomfort.",
      "Try gentle neck or shoulder stretches to relieve tension.",
      "💙 Massaging your temples or forehead can provide relief.",
      "Eat light meals and drink warm fluids to ease headache symptoms.",
      "Focus on slow, deep breathing and relaxation techniques.",
      "If headache persists, consult a doctor for proper advice."
    ],
  firstAid: "Rest in a quiet, dark room and stay peaceful. Avoid screens and bright lights. If it persists, consult a doctor."
  }
},
{
  name: "Women’s Health",
  keywords: /cramps|period|menstrual|pregnancy|women health|women|girl|pcod|pcos/,
  reply: {
    message: [
      "💗 Stay hydrated, rest, and eat nutritious food. If symptoms persist, consult a doctor.",
      "Take care of yourself! Light exercise and warm fluids can help during periods.",
      "🌸 Gentle stretches or yoga may help reduce cramps and discomfort.",
      "Rest when you need to and keep track of your symptoms for better care.",
      "Eating balanced meals and staying hydrated can improve overall wellness.",
      "💙 Warm baths or heating pads may ease cramps and relax your body.",
      "Monitor your cycle and consult a doctor if you notice anything unusual.",
      "Self-care is important! Take some time to relax and nurture yourself.",
      "Track your health and symptoms—our Women’s Health section can help you stay organized.",
      "Remember, it’s okay to rest and take care of your body during these days."
    ],
    firstAid: "We specially monitor WOMEN’S HEALTH CARE, which is useful for tracking your health & records."
  }
},
     {
  name: "Happy Vibes",
  keywords: /happy|good|glad|joy|excited|nice/,
  reply: {
    message: [
      "Yay! 😄 Thanks for sharing your happiness! ✨",
      "Haha, seeing you happy makes me happy too! 😄",
      "Wow! Such happy vibes, that's awesome! 🌟",
      "Yay! Seeing your smile makes me so happy! 😊",
      "💖 Keep smiling! Happiness is contagious!",
      "Your happiness made my day brighter! 🌞",
      "Keep shining and spreading joy! 🌈",
      "Such positivity! Keep that energy flowing! ✨",
      "Love seeing you in high spirits! 😄 Stay joyful!",
      "Happiness looks great on you! Keep sharing those vibes! 🌟"
    ],
    firstAid: "keep up the positive vibes! Remember to take care of your mental and physical health to maintain that happiness."
  }
},
{
  name: "Diet / Nutrition",
  keywords: /diet|nutrition|food|healthy eating/,
  reply: {
    message: [
      "🥗 Eat balanced meals: Fruits, Protein, Veggies & Water. Avoid skipping meals!",
      "💪 Include protein, fruits, and vegetables in every meal for better health.",
      "Stay hydrated and eat small, frequent meals to maintain energy levels.",
      "🌿 A balanced diet helps your body and mind feel their best.",
      "Try to include a variety of colors in your meals—it's good for nutrition and fun! 🌈",
      "Don't skip meals! Eating regularly helps maintain your metabolism.",
      "🍎 Fresh fruits and veggies daily can improve your energy and immunity.",
      "Include whole grains, lean proteins, and healthy fats for a nutritious diet.",
      "💧 Drink water with meals and snacks to stay hydrated.",
      "Healthy eating is a lifestyle—make small changes and stick to them for long-term benefits!"],
    firstAid:"We have a NUTRITION section to help you track your diet and get healthy meal suggestions for better care!"
  }
},
    {
  name: "Exercise / Fitness",
  keywords: /exercise|yoga|workout|fitness|positive|lifestyle|physical health|welness|/,
  reply: {
    message: [
      "💪 30 mins walking + stretching daily improves health. Check our PHYSICAL HEALTH section for daily tips.",
      "🏃‍♀️ A short walk or light exercise daily keeps your body and mind active!",
      "Yoga or stretching for 15-30 mins can improve flexibility and reduce stress. 🌿",
      "💖 Stay active! Even small exercises throughout the day make a big difference.",
      "🏋️‍♂️ Regular workouts boost energy, mood, and overall wellness.",
      "Take the stairs, stretch breaks, or short walks—every move counts! 🚶",
      "Consistency is key! A little daily activity goes a long way. 💪",
      "Try morning stretches to energize your body for the day ahead.",
      "🧘‍♀️ Mindful movement like yoga can calm your mind and strengthen your body.",
      "Remember, physical health supports mental health too. Stay active and positive!"],
   firstAid: "We specially monitor PHYSICALHEALTH CARE, which is useful for tracking your BODY health & records."
  }
},
   {
  name: "Minor Injuries / First Aid",
  keywords: /bleeding|faint|unconscious|panic attack|accident|first aid|injury| injuries/,
  reply: {
    message: [
      "🩹 Apply pressure & keep the person safe. Contact emergency services immediately.",
      "🚨 Stay calm! Help the injured person and call 108 or 112 right away.",
      "First aid is important! Ensure safety and call for professional help.",
      "💙 Keep the person still, check their breathing, and contact emergency services.",
      "Act fast! Apply pressure to bleeding wounds and call for help immediately.",
      "🩺 If someone faints or is unconscious, keep them lying down and seek medical help.",
      "Stay with the person, monitor their condition, and call an ambulance urgently.",
      "In case of panic attack, help them breathe slowly and stay calm. Seek help if needed.",
      "⚠️ Minor injuries can become serious. Always ensure medical attention quickly.",
      "Ensure safety first, provide basic aid, and contact emergency services immediately. 🚑"],
    helpline: ["🚑108", "🚨112"],
    firstAid:"For minor injuries,apply basic first aid and seek medical attention if necessary. Always prioritize safety and don't hesitate to call for help in emergencies."
  }
},
{
  name: "Chronic Disease Guidance",
  keywords: /diabetes|blood pressure|hypertension|cholesterol|sugar|bp|low sugar/,
  reply: {
    message: [
      "🩺 Maintain a healthy diet, exercise regularly, and monitor your vitals. Consult your doctor regularly for chronic conditions.",
      "💙 Keep track of your blood pressure, sugar levels, and medications daily.",
      "Healthy habits matter! Eat balanced meals and stay physically active.",
      "Check your vitals regularly and follow your doctor's advice closely.",
      "🌿 Regular exercise, proper diet, and hydration help manage chronic conditions.",
      "Don't skip medications and keep a record of your health readings.",
      "Monitor your cholesterol, sugar, and BP levels consistently for better care.",
      "💖 Small daily steps, like walking and healthy eating, make a big difference.",
      "Stay informed about your condition and maintain regular doctor consultations.",
      "Remember: consistency in lifestyle and medication is key to managing chronic diseases."],
    firstAid:"Complesary follow your doctor's advice, maintain a healthy lifestyle."
  }
},

     {
  name: "Covid / Infection",
  keywords: /covid|corona|infection|virus/,
  reply: {
    message: [
      "😷 Follow safety precautions: wear masks, wash hands, and maintain distance. Consult a doctor if symptoms persist.",
      "💧 Stay hydrated, rest well, and monitor your symptoms closely.",
      "Keep masks on in crowded places and sanitize your hands regularly. 🧼",
      "If you feel unwell, isolate yourself and seek medical advice promptly.",
      "🌿 Eat healthy, get enough sleep, and boost your immunity during this time.",
      "Stay safe! Avoid crowded areas and maintain social distancing.",
      "Monitor your temperature and any new symptoms carefully. Consult a doctor if needed.",
      "💙 Wash your hands frequently and follow hygiene guidelines strictly.",
      "Avoid close contact if you or others are feeling unwell. Safety first! ⚠️",
      "Take care of yourself—rest, hydration, and early medical consultation are important."],
    firstAid:"If you have symptoms, isolate yourself, rest, stay hydrated and consult a doctor immediately. Stay strong & take care of your health!"
  }
},
{
  name: "Eye / Vision Care",
  keywords: /eyes|vision|blurry|headache eyes|eyestrain|sight|glasses|contact lenses|eye health|dry eyes| eye irritation/,
  reply: {
    message: [
      "👀 Take regular breaks from screens using the 20-20-20 rule: every 20 mins, look at something 20 feet away for 20 seconds.",
      "💧 Keep your eyes hydrated—use artificial tears if they feel dry.",
      "🥦 Eat eye-friendly foods like carrots, leafy greens, and fish rich in omega-3.",
      "🕶 Wear sunglasses with UV protection when outdoors to prevent damage.",
      "💤 Ensure proper sleep to reduce eye fatigue and improve focus.",
      "💻 Adjust screen brightness and distance to reduce eyestrain.",
      "👓 Regular eye exams help detect vision problems early, even if you wear glasses.",
      "⚠️ If you experience sudden blurry vision or pain, consult an eye doctor immediately.",
      "🧘 Eye relaxation exercises like rolling your eyes or palming can help relieve tension.",
      "🌟 Maintain good lighting while reading or working to reduce strain on your eyes."],
      firstAid:"For eye strain, take breaks every 20 minutes, use water to wash your eyes. If you experience sudden vision changes or pain, seek medical attention immediately."
  }
},
{
  name: "Skin / Hair Care",
  keywords: /skin|acne|rash|hair fall|pimple|dark spots|white spots|eczema|dermatology|scalp care|hair health|skin health|blemish|dandruff/,
  reply: {
    message: [
      "🌿 For healthy skin, drink plenty of water and include fruits and vegetables in your diet.",
      "🧴 Use sunscreen daily to protect your skin from UV damage and premature aging.",
      "💆‍♀️ Gentle cleansing twice a day helps prevent acne and clogged pores.",
      "🧴 Moisturize regularly to keep your skin hydrated and glowing.",
      "🥥 For hair health, use mild shampoos and avoid excessive heat styling.",
      "💇‍♂️ Regular hair trims can reduce split ends and improve hair appearance.",
      "⚠️ Avoid scratching rashes or pimples to prevent infection and scarring.",
      "🥗 Include protein-rich foods like eggs, nuts, and legumes for strong hair.",
      "🛌 Ensure 7–8 hours of sleep daily—good rest supports skin regeneration.",
      "🧘 Stress can affect your skin and hair health, so practice relaxation techniques."
    ],
    firstAid:"For skin issues, keep the area clean and avoid scratching. For hair fall, maintain a healthy diet and avoid harsh treatments. If symptoms persist, consult a dermatologist for proper care and treatment. Alos we have NUTRITION section to help you for better health!"
  }
},
{
  name: "Immunity Boost / Supplements",
  keywords: /vitamin|supplements|immunity|immune system|nutrition|minerals|vitamin c|vitamin d|zinc|multivitamin/,
  reply: {
    message: [
      "🍊 Include vitamin C-rich foods like oranges, guava, and kiwi to support immunity.",
      "🥛 Vitamin D is essential—spend time in sunlight or consider supplements if needed.",
      "🥦 Eat a balanced diet with fruits, vegetables, nuts, and whole grains for overall immune support.",
      "💊 Zinc helps boost immunity—foods like seeds, nuts, and legumes are good sources.",
      "💧 Stay hydrated—water is key for maintaining your immune system.",
      "🛌 Adequate sleep (7–8 hours) helps your body fight infections effectively.",
      "🏃 Regular physical activity can strengthen your immune response.",
      "🧘 Stress management through meditation or relaxation improves immunity.",
      "🧄 Garlic and other antioxidant-rich foods may help your body fight illnesses.",
      "⚖️ Avoid excessive sugar and processed foods, as they can weaken your immune system."
    ],
    firstaid:"If you're experiencing frequent illnesses or symptoms of low immunity, consult a healthcare professional for proper guidence. Remember a health diet-NUTRITION SECTION, regular exercise-PHYSICAL HEALTH SECTION. " 
   }
},
{
  name: "Men’s Health",
  keywords: /men health|prostate|testosterone|male|man health|andropause|fitness male|male wellness|men’s wellness|men health care/,
  reply: {
    message: [
      "💪 Regular exercise and strength training help maintain testosterone levels and overall male health.",
      "🥦 Eat a balanced diet rich in lean proteins, vegetables, fruits, and healthy fats.",
      "🩺 Regular health checkups, including prostate and blood pressure screenings, are important.",
      "🛌 Ensure 7–8 hours of quality sleep to support hormonal balance and mental well-being.",
      "💧 Stay hydrated—adequate water intake helps with energy and metabolic function.",
      "⚖️ Manage stress through meditation, hobbies, or talking with friends to maintain mental health.",
      "🚭 Avoid smoking and limit alcohol for better heart and liver health.",
      "🧘 Practice flexibility and core exercises to prevent injuries and maintain posture.",
      "💉 Keep up with vaccinations and routine lab tests for early detection of issues.",
      "❤️ Emotional well-being is important—don’t hesitate to seek support for anxiety, depression, or relationship stress."
    ],
    firstAid:"Healthy lifestyle, regular checkup is important for a Good Health. Please take care of yourself, Your present is important for your family!!"
  }
},
{
  name: "Brain / Cognitive Health",
  keywords: /focus|memory|brain|cognition|mental clarity|concentration|learning|neuro|thinking|alertness/,
  reply: {
    message: [
      "🧠 Keep your brain active with puzzles, crosswords, or memory games daily.",
      "📚 Reading and learning new skills improves cognitive function over time.",
      "💤 Ensure 7–8 hours of quality sleep—it's crucial for memory and focus.",
      "🥦 Eat brain-boosting foods like nuts, berries, fish, and leafy greens.",
      "💧 Stay hydrated! Even mild dehydration can affect attention and memory.",
      "🏃 Regular physical activity increases blood flow to the brain and enhances cognition.",
      "🧘 Mindfulness or meditation exercises improve focus and reduce mental fatigue.",
      "🎵 Listening to music can boost mood and cognitive performance.",
      "🗒 Note-taking or journaling helps strengthen memory retention.",
      "💡 Challenge yourself daily—learn a new language, instrument, or hobby to stimulate your brain."
    ],
    firstAid:"To maintain brain health, engage in regular mental exercise, physical health is also important to mental health. Make sure to get enough sleep 7-8 hours. Read more books, learn new skills and stay socially active."
  }
},
{
  name: "Nutrition Tracking / Meal Suggestions",
  keywords: /breakfast|lunch|dinner|meal plan|healthy food|meal tracking|nutrition|diet|snacks|balanced diet/,
  reply: {
    message: [
      "🥗 For a healthy lunch, try a mix of lean protein, whole grains, and colorful veggies.",
      "🍳 Breakfast idea: Oats with fruits and nuts for energy throughout the morning.",
      "🥙 Dinner tip: Include fiber-rich foods like beans, lentils, or salads to stay full longer.",
      "🍌 Snack suggestion: A banana or apple with peanut butter is both tasty and nutritious.",
      "💧 Don’t forget to drink water before meals—it aids digestion and hydration.",
      "🥛 Include calcium-rich foods like milk, yogurt, or cheese for strong bones.",
      "🌈 Try to make your plate colorful with a variety of fruits and vegetables each day.",
      "🥤 Limit sugary drinks and replace them with water, coconut water, or fresh juices.",
      "🍲 Meal prep tip: Plan your meals ahead to avoid unhealthy snacking or fast food.",
      "💡 Small portion changes, like choosing brown rice instead of white, can improve overall nutrition."
    ],
    firstAid:"Maintaining a healthy diet is crucial for overall well-being. Use our NUTRITION section to track your meals and get personalized meal suggestion for better health. Also we have RECIPES section to help you with healthy and tasty!"
  }
},
{
  name: "Pregnancy / Newborn Care",
  keywords: /pregnancy|baby|newborn|prenatal|prenatal care|maternal health|postpartum|infant care|childbirth|breastfeeding/,
  reply: {
    message: [
      "🤰 During pregnancy, eat balanced meals rich in protein, iron, and folic acid for a healthy baby.",
      "🍼 For newborns, ensure frequent feeding and proper burping after every feed.",
      "💤 Rest is crucial during pregnancy—take short naps and avoid overexertion.",
      "💧 Stay hydrated, especially if you are breastfeeding or in the third trimester.",
      "🧴 Keep newborn skin clean and moisturized; avoid harsh soaps and chemicals.",
      "👶 Regular pediatric checkups are important to monitor growth and development.",
      "🌿 During pregnancy, mild exercise like walking or prenatal yoga can be beneficial.",
      "🩺 Track prenatal appointments and vaccinations to ensure maternal and infant health.",
      "💖 Emotional well-being matters—talk to loved ones or professionals if stressed.",
      "🍌 Introduce soft, easily digestible foods for babies when starting solids around 6 months."],
  firstAid: "If you thought any risk or emergency, please contact your doctor immediately or go to the nearest hospital. Don't delay & don't take any other medicine without consulting your doctor. Always prioritize safety for you and your baby!"
  }
},
{
  name: "First Aid / Emergency Guidance",
  keywords: /first aid|emergency|injury|bleeding|burn|faint|choking|accident|sprain|fracture/,
  reply: {
    message: [
      "🩹 For minor cuts, clean with water and apply an antiseptic before bandaging.",
      "🔥 For burns, run cool water over the area for 10–20 minutes immediately.",
      "🤕 If you sprain your ankle, rest, ice, compression, and elevate (RICE method).",
      "⚠️ For choking, perform the Heimlich maneuver if trained or seek help immediately.",
      "🛌 If someone faints, lay them flat, elevate legs, and ensure fresh air.",
      "🩺 For nosebleeds, pinch the soft part of the nose and lean forward slightly.",
      "🚑 Call emergency services if bleeding is heavy, unconsciousness occurs, or injuries are severe.",
      "💧 Keep the injured area clean and avoid infection until medical help is available.",
      "🧴 Minor insect bites can be treated with antihistamine cream or cold compress.",
      "⚡ Remember: safety first—prevent accidents and ensure proper supervision for kids and elderly."
    ],
    helpline: ["🚑108", "🚨112", "📞1800-599-0019"],
    firstAid:"In case of an emergency, prioritize safety and call for help immediately. For minor injuries, apply basic first aid and seek medical attention if necessary."
  }
},
{
  name: "Healthy Habits / Routine",
  keywords: /habit|routine|daily routine|self-care|wellness|morning routine|evening routine|healthy lifestyle|daily habits|self improvement|health /,
  reply: {
    message: [
      "🌅 Start your day with a glass of water and some stretching—it sets a positive tone!",
      "📝 Plan your day with a simple to-do list to stay organized and focused.",
      "🥗 Include balanced meals with fruits, veggies, and protein in your daily routine.",
      "💤 Stick to regular sleep patterns for better energy and focus throughout the day.",
      "🏃‍♂️ Move your body daily—walk, stretch, or exercise for at least 30 minutes.",
      "🧘 Take a short meditation or mindfulness break to reset your mind.",
      "📚 Spend some time learning or reading every day—it’s a healthy habit for your brain.",
      "💧 Drink enough water throughout the day to stay hydrated and alert.",
      "🌿 Incorporate self-care activities like journaling, hobbies, or a warm bath into your routine.",
      "💖 Reflect on your day each evening and note something positive—it helps build gratitude and consistency."
    ],
    firstAid: "Building healthy habits is key to long-term wellness. Start small, be consistent, and remember that self-care is not selfish-it's essential for your well-being."
  }
},
{
  name: "Kids & Family Health",
  keywords: /kids|children|child|family health|pediatric|growth|immunization|vaccination|parenting|childcare/,
  reply: {
    message: [
      "👶 Ensure kids get 7–9 hours of sleep daily for proper growth and development.",
      "🥦 Balanced meals with fruits, vegetables, and proteins help children stay healthy.",
      "🏃 Encourage kids to play outside for at least 30 minutes daily for physical activity.",
      "💧 Keep your family hydrated—water is essential for kids and adults alike.",
      "🧴 Teach proper hygiene habits like handwashing to prevent infections.",
      "💉 Keep vaccinations up to date for all children to protect them from serious diseases.",
      "📚 Spend quality time reading or doing educational activities with your children.",
      "🛡 Create a safe home environment—remove sharp objects or potential hazards for kids.",
      "🧘 Encourage short relaxation or mindfulness exercises for children to manage stress.",
      "❤️ Always talk and listen to your kids—emotional support is as important as physical health."
    ],
    firstAid:"For kids and family health, ensure regular checkups, vaccinations, and a balanced diet. Engreage physical activity to keep everyone Healthy and Happy!"
  }
},
{
  name: "Vomit / Nausea",
  keywords: /vomit|vomiting|nausea|throw up|queasy|feeling sick/,
  reply: {
    message: [
      "🤢 Try sipping small amounts of water slowly to stay hydrated.",
      "🍵 Ginger tea or plain crackers may help reduce nausea.",
      "🛌 Rest in a sitting or slightly upright position.",
      "🥣 Avoid heavy or oily foods until you feel better.",
      "💧 Take small sips of ORS or electrolyte drinks.",
      "🌿 Fresh air and deep breathing may help reduce nausea.",
      "🍌 Eat light foods like banana, rice, or toast if you can tolerate them.",
      "⚠️ If vomiting continues for more than 24 hours, consult a doctor.",
      "🚫 Avoid strong smells and spicy foods for a while.",
      "🩺 Seek medical help immediately if there is blood, severe pain, or dehydration."
    ],
    firstAid: "Stay hydrated, rest well, and monitor symptoms carefully. If vomiting persists or is accompanied by severe pain, blood, or signs of Dehydration, seek medical attention immediately."
  }
},

    {
  name: "Reports & Records",
  keywords: /reports|records|medical history/,
  reply: {
    message: [
      "🗂️ We have a REPORT SAVER section to save your medical reports and track your health history for better care!",
      "Keep all your health records in one place with our REPORT SAVER. It's easy and convenient!",
      "💙 Track your medical history and save reports digitally for quick access anytime.",
      "Organize your health documents in our REPORT SAVER to stay on top of your care.",
      "Save your lab reports, prescriptions, and health records securely with us.",
      "📄 REPORT SAVER helps you monitor your medical history and track progress easily.",
      "Digitally storing your health records ensures you never miss important information.",
      "💡 Keep your health history organized—REPORT SAVER makes it simple!",
      "Access and manage your medical reports anytime with our REPORT SAVER feature.",
      "🩺 Track your health progress over time by saving records and reports digitally."
    ],
    firstAid:"Keeping track of your Medical History and Reports is crucial for effective healthcare. Use our REPORT SAVER to store and manage your health records securely and conveniently. "
  }
},

    {
  name: "Rest & Sleep",
  keywords: /sleep|insomnia|tired|rest|sleepless/,
  reply: {
    message: [
      "🛌 Ensure 7-8 hours of sleep daily. Avoid screens before bed and create a calm environment for better rest. Proper SLEEPING is a THERAPY!",
      "💤 Try to stick to a consistent sleep schedule for better energy and mood.",
      "🌙 Reduce screen time and bright lights before bedtime to improve sleep quality.",
      "Take short naps if needed, but avoid long daytime naps to maintain night sleep.",
      "Relax your mind with light reading or meditation before going to bed.",
      "Keep your bedroom cool, quiet, and dark for better rest and recovery.",
      "Avoid caffeine or heavy meals close to bedtime to sleep peacefully.",
      "💙 Deep breathing or gentle stretches before bed can help you fall asleep faster.",
      "Create a bedtime routine that signals your body it's time to rest.",
      "Good sleep improves mood, focus, and overall health. Prioritize your rest! 🌿"
    ],
    firstAid:"If you're having trouble sleeping, create a relaxing bedtime routine, and limit screen time before bed. If insomnia persists, consult a healthcare professional for further evaluation and support."
  }
},

    {
  name: "Hydration",
  keywords: /thirsty|water|dehydrated|hydration/,
  reply: {
    message: [
      "💧 Stay hydrated! Drink water regularly throughout the day to maintain your health and energy levels. Also, we have a REMINDER feature to help you!",
      "Keep sipping water! Hydration is key for energy and overall wellness. 🌿",
      "💦 Feeling thirsty? Drink water and remember to stay hydrated throughout the day.",
      "Water helps your body function better—take small sips often! 💙",
      "Don't forget! Drinking enough water improves mood, focus, and health.",
      "🌟 Hydration matters! Carry a water bottle and take regular sips.",
      "Stay refreshed! Drinking water regularly keeps your mind and body active.",
      "💧 Even mild dehydration can affect energy and mood. Keep drinking water!",
      "Set reminders to drink water and stay hydrated throughout your day! ⏰",
      "Water is life! Regular hydration supports digestion, skin, and overall health."
    ],
    firstAid:"If you feel dehydrated, drink water or oral rehydration solutions. If symptoms persist or worsten please consider Doctor consultation."
  }
},
    {
  name: "Motivation",
  keywords: /tired|unmotivated|lazy|bored|demotivated|sad|stressed|bad/,
  reply: {
    message: [
      "Take a break, do something you enjoy, and remember your progress matters! Then come back stronger! 💪",
      "🌟 Keep going! Every small step you take brings you closer to your goal.",
      "You’ve got this! Take a deep breath and focus on one thing at a time.",
      "Remember: It’s okay to rest. Recharge and then tackle your tasks with fresh energy.",
      "💖 Stay positive! Challenges are stepping stones to success.",
      "Feeling low? Do something that makes you smile or laugh—it helps reset your mood.",
      "Small progress is still progress. Keep moving forward, one step at a time! 🌿",
      "Don’t be too hard on yourself. Celebrate your efforts, no matter how small!",
      "💙 Motivation comes in waves. Ride the wave and keep pushing forward!",
      "Take a moment for yourself, breathe, and remind yourself why you started. You can do this!"
    ],
    firstAid:"When you're feeling unmotivated, take a break, do something you enjoy, Stay positive and remember that every small step counts towards your goals. We would make everthing good and make our life better!"
  }
},

    {
  name: "Greetings",
  keywords: /hi|hello|hey|heyyy|oi/,
  reply: {
    message: [
      "👋 Hello! I'm your Care Buddy. How are you feeling today?",
      "Hey there! 😊 How's your day going?",
      "Hi! 🌟 Ready to check your health today?",
      "Hello! 💖 Hope you’re having a wonderful day. How are you feeling?",
      "Hey! 🌿 Let’s make today healthy and happy. How are you doing?",
      "Hi there! 😄 What’s your mood like today?",
      "Hello! 🌟 I'm here to help you with your health. Feeling good?",
      "Hey! 💙 It’s great to see you. How’s your day so far?",
      "Hi! 🌈 Let’s make today positive and healthy. How are you feeling?",
      "Hello! 😊 Ready to check in on your health and wellbeing today?"
    ],
    firstAid:"(Use keywords: *mood, *issues, *symptoms, *health, *feelings..etc)"
  }
}

  ];

  // Collect all matched modules
  let matchedReplies = [];

  healthModules.forEach((module) => {
    if (module.keywords.test(text)) {
      matchedReplies.push(module.reply);
    }
  });

  // If no matches, give default reply
  if (matchedReplies.length === 0) {
    return {
      message: "🩺 I’m here to help! Can you tell me more about your symptoms or health question?"
    };
  }

   // Combine messages with random selection if array
  const combinedMessage = matchedReplies
    .map((r) => Array.isArray(r.message) ? r.message[Math.floor(Math.random() * r.message.length)] : r.message)
    .join("\n\n");

  // Combine helplines (if any)
  const combinedHelplines = matchedReplies
    .filter((r) => r.helpline)
    .flatMap((r) => r.helpline);

  // Combine first aid (if any)
  const combinedFirstAid = matchedReplies
    .filter((r) => r.firstAid)
    .map((r) => r.firstAid)
    .join("\n");

  return {
    message: combinedMessage,
    ...(combinedHelplines.length > 0 && { helpline: combinedHelplines }),
    ...(combinedFirstAid && { firstAid: combinedFirstAid })
  };
};
