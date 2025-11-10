// DOM Elements
const introScreen = document.getElementById('intro-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const menuBtn = document.getElementById('menu-btn');
const shareBtn = document.getElementById('share-btn');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const progressElement = document.getElementById('progress');
const progressTextElement = document.getElementById('progress-text');
const scoreMessageElement = document.getElementById('score-message');
const langButtons = document.querySelectorAll('.lang-btn');

// Audio elements
const correctSound = document.getElementById('correct-sound');
const wrongSound = document.getElementById('wrong-sound');
const completeSound = document.getElementById('complete-sound');

// Game state
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;
let currentLanguage = 'en';
let questions = [];

// Questions data in both English and Hebrew
const questionsData = {
    en: [
        {
            question: "When and where was Nikola Tesla born?",
            options: [
                "1856, Smiljan, Austrian Empire",
                "1843, London",
                "1862, Paris",
                "1870, New York"
            ],
            correct: 0
        },
        {
            question: "What was Tesla's main field of study?",
            options: [
                "Electrical engineering and physics",
                "Medicine",
                "Law",
                "Chemistry"
            ],
            correct: 0
        },
        {
            question: "Which invention made Tesla most famous?",
            options: [
                "Alternating current (AC)",
                "The light bulb",
                "The steam engine",
                "The telegraph"
            ],
            correct: 0
        },
        {
            question: "What company did Tesla work for before founding his own lab?",
            options: [
                "Edison Machine Works",
                "General Electric",
                "Volta",
                "Westinghouse"
            ],
            correct: 0
        },
        {
            question: "When did Nikola Tesla pass away?",
            options: [
                "1943 in New York",
                "1920 in Vienna",
                "1950 in London",
                "1930 in Paris"
            ],
            correct: 0
        },
        {
            question: "What was the name of Tesla's famous laboratory in Colorado Springs?",
            options: [
                "Experimental Station",
                "Lightning Lab",
                "Tesla Tower",
                "Wardenclyffe"
            ],
            correct: 0
        },
        {
            question: "Which famous inventor was Tesla's rival?",
            options: [
                "Thomas Edison",
                "Alexander Graham Bell",
                "Guglielmo Marconi",
                "George Westinghouse"
            ],
            correct: 0
        },
        {
            question: "What was Tesla's proposed system for wireless power transmission called?",
            options: [
                "Wardenclyffe Tower",
                "World Wireless System",
                "Tesla Coil Network",
                "Atmospheric Energy"
            ],
            correct: 1
        },
        {
            question: "In what year did Tesla demonstrate wireless energy transfer?",
            options: [
                "1889",
                "1891",
                "1893",
                "1899"
            ],
            correct: 2
        },
        {
            question: "What was the name of Tesla's first major AC motor patent?",
            options: [
                "The Induction Motor",
                "The Polyphase System",
                "The Tesla Coil",
                "The Alternating Current Dynamo"
            ],
            correct: 0
        },
        {
            question: "Which famous structure did Tesla help design the electrical system for?",
            options: [
                "The Eiffel Tower",
                "The Statue of Liberty",
                "The Empire State Building",
                "The Niagara Falls Power Station"
            ],
            correct: 3
        },
        {
            question: "What was Tesla's vision for the future of communication?",
            options: [
                "Worldwide wireless communication",
                "Fiber optic networks",
                "Satellite communication",
                "Underground cables"
            ],
            correct: 0
        },
        {
            question: "What was Tesla's vision for wireless energy transmission called?",
            options: [
                "World Wireless System",
                "Tesla Coil Network",
                "Global Energy Grid",
                "Wireless Power Transfer"
            ],
            correct: 0
        },
        {
            question: "Which famous structure did Tesla help design the electrical system for?",
            options: [
                "Niagara Falls Power Plant",
                "Eiffel Tower",
                "Empire State Building",
                "Statue of Liberty"
            ],
            correct: 0
        },
        {
            question: "What was the name of Tesla's most ambitious project that was never completed?",
            options: [
                "Wardenclyffe Tower",
                "Tesla's Death Ray",
                "Wireless Light Bulb",
                "Flying Machine"
            ],
            correct: 0
        }
    ],
    he: [
        {
            question: "מתי והיכן נולד ניקולה טסלה?",
            options: [
                "1856, סמיליאן, האימפריה האוסטרו-הונגרית",
                "1843, לונדון",
                "1862, פריז",
                "1870, ניו יורק"
            ],
            correct: 0
        },
        {
            question: "מה היה תחום הלימוד העיקרי של טסלה?",
            options: [
                "הנדסת חשמל ופיזיקה",
                "רפואה",
                "משפטים",
                "כימיה"
            ],
            correct: 0
        },
        {
            question: "איזה מהמצאה הפכה את טסלה למפורסם ביותר?",
            options: [
                "זרם חילופין (AC)",
                "נורת החשמל",
                "מנוע הקיטור",
                "הטלגרף"
            ],
            correct: 0
        },
        {
            question: "באיזו חברה עבד טסלה לפני שהקים את המעבדה שלו?",
            options: [
                "אדיסון",
                "ג'נרל אלקטריק",
                "וולטה",
                "וסטינגהאוס"
            ],
            correct: 0
        },
        {
            question: "מתי נפטר ניקולה טסלה?",
            options: [
                "1943 בניו יורק",
                "1920 בווינה",
                "1950 בלונדון",
                "1930 בפריז"
            ],
            correct: 0
        },
        {
            question: "מה היה שמה של המעבדה המפורסמת של טסלה בקולורדו ספרינגס?",
            options: [
                "תחנת הניסויים",
                "מעבדת הברקים",
                "מגדל טסלה",
                "ורדנקליף"
            ],
            correct: 0
        },
        {
            question: "מי היה המתחרה המפורסם של טסלה?",
            options: [
                "תומאס אדיסון",
                "אלכסנדר גרהם בל",
                "גוליילמו מרקוני",
                "ג'ורג' וסטינגהאוס"
            ],
            correct: 0
        },
        {
            question: "איך נקראה המערכת שהציע טסלה להעברת חשמל אלחוטית?",
            options: [
                "מגדל ורדנקליף",
                "המערכת האלחוטית העולמית",
                "רשת סלילי טסלה",
                "אנרגיה אטמוספרית"
            ],
            correct: 1
        },
        {
            question: "באיזו שנה הדגים טסלה העברת אנרגיה אלחוטית?",
            options: [
                "1889",
                "1891",
                "1893",
                "1899"
            ],
            correct: 2
        },
        {
            question: "מה היה שמו של פטנט המנוע החשמלי החשוב הראשון של טסלה?",
            options: [
                "מנוע האינדוקציה",
                "המערכת הרב-פאזית",
                "סליל טסלה",
                "דינמו זרם חילופין"
            ],
            correct: 0
        },
        {
            question: "איזה מבנה מפורסם טסלה עזר לתכנן את המערכת החשמלית שלו?",
            options: [
                "מגדל אייפל",
                "פסל החירות",
                "בניין האמפייר סטייט",
                "תחנת הכוח במפלי הניאגרה"
            ],
            correct: 3
        },
        {
            question: "מה היה החזון של טסלה לעתיד התקשורת?",
            options: [
                "תקשורת אלחוטית עולמית",
                "רשתות סיבים אופטיים",
                "תקשורת לווינית",
                "כבלים תת-קרקעיים"
            ],
            correct: 0
        },
        {
            question: "איך נקרא החזון של טסלה להעברת אנרגיה אלחוטית?",
            options: [
                "המערכת האלחוטית העולמית",
                "רשת סלילי טסלה",
                "רשת אנרגיה גלובלית",
                "העברת חשמל אלחוטית"
            ],
            correct: 0
        }
    ]
};

// Initialize the game
function init() {
    // Set default language
    currentLanguage = 'en';
    questions = [...questionsData.en];
    
    // Shuffle questions
    shuffleArray(questions);
    
    // Initialize UI text
    updateUIText();
    
    // Event listeners
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);
    menuBtn.addEventListener('click', returnToMenu);
    shareBtn.addEventListener('click', shareScore);
    
    // Language switcher
    langButtons.forEach(button => {
        button.addEventListener('click', () => switchLanguage(button.dataset.lang));
    });
    
    // Initialize particles.js if available
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: '#00adef' },
                shape: { type: 'circle' },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00adef',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: { enable: true, mode: 'grab' },
                    onclick: { enable: true, mode: 'push' },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 0.5 } },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }
}

// Start the quiz
function startQuiz() {
    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = score;
    
    // Show quiz screen
    introScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultsScreen.classList.add('hidden');
    
    // Load first question
    showQuestion();
}

// Show current question
function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionNo = currentQuestionIndex + 1;
    const totalQuestions = questions.length;
    
    // Add a subtle animation to the question
    questionElement.style.animation = 'fadeIn 0.5s ease-out';
    questionElement.textContent = currentQuestion.question;
    
    // Clear previous options with a fade out effect
    optionsElement.style.opacity = '0';
    setTimeout(() => {
        optionsElement.innerHTML = '';
        
        // Create a copy of options and shuffle them
        const shuffledOptions = [...currentQuestion.options];
        const correctAnswer = shuffledOptions[currentQuestion.correct];
        
        // Remove the correct answer and shuffle the rest
        shuffledOptions.splice(currentQuestion.correct, 1);
        shuffleArray(shuffledOptions);
        
        // Randomly insert the correct answer at a different position each time
        const correctPosition = Math.floor(Math.random() * (shuffledOptions.length + 1));
        shuffledOptions.splice(correctPosition, 0, correctAnswer);
        
        // Update the correct answer index
        currentQuestion.correct = correctPosition;
        
        // Create option buttons with staggered animation
        shuffledOptions.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.style.animation = `fadeIn 0.3s ease-out ${index * 0.1}s forwards`;
            optionElement.style.opacity = '0';
            
            const prefix = document.createElement('span');
            prefix.className = 'option-prefix';
            prefix.textContent = String.fromCharCode(65 + index) + '.';
            
            const text = document.createElement('span');
            text.className = 'option-text';
            text.textContent = option;
            
            optionElement.appendChild(prefix);
            optionElement.appendChild(text);
            
            optionElement.addEventListener('click', () => selectOption(optionElement, index));
            
            optionsElement.appendChild(optionElement);
        });
        
        optionsElement.style.opacity = '1';
    }, 300); // Slight delay for the fade out effect
    
    // Hide next button until an option is selected
    nextBtn.classList.add('hidden');
    nextBtn.style.opacity = '0';
    nextBtn.style.transform = 'translateY(20px)';
}

// Select an option
function selectOption(selectedElement, selectedIndex) {
    // If already selected, do nothing
    if (selectedOption !== null) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    const options = document.querySelectorAll('.option');
    
    // Mark the selected option
    selectedOption = selectedIndex;
    
    // Disable all options
    options.forEach(option => {
        option.classList.add('disabled');
    });
    
    // Check if answer is correct
    const isCorrect = selectedIndex === currentQuestion.correct;
    
    if (isCorrect) {
        // Correct answer
        selectedElement.classList.add('correct');
        score++;
        scoreElement.textContent = score;
        correctSound.play();
        createConfetti(selectedElement);
    } else {
        // Wrong answer
        selectedElement.classList.add('wrong');
        // Show correct answer
        options[currentQuestion.correct].classList.add('show-correct');
        wrongSound.play();
    }
    
    // Show next button
    nextBtn.style.display = 'block';
    nextBtn.style.opacity = '0';
    nextBtn.style.transform = 'translateY(20px)';
    nextBtn.classList.remove('hidden');
    
    // Animate the next button in
    setTimeout(() => {
        nextBtn.style.transition = 'all 0.3s ease-out';
        nextBtn.style.opacity = '1';
        nextBtn.style.transform = 'translateY(0)';
    }, 100);
}

// Create confetti effect
function createConfetti(element) {
    const colors = ['#00adef', '#00f2fe', '#ffffff', '#00ff88', '#ffcc00'];
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        // Random size between 6 and 12px
        const size = Math.random() * 6 + 6;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        
        // Random movement
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 50;
        const rotation = (Math.random() - 0.5) * 20;
        
        document.body.appendChild(confetti);
        
        // Animate
        const animation = confetti.animate([
            { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
            { 
                transform: `translate(
                    ${Math.cos(angle) * velocity}px, 
                    ${Math.sin(angle) * velocity - 50}px
                ) rotate(${rotation}turn)`,
                opacity: 0 
            }
        ], {
            duration: 1000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
        });
        
        // Remove after animation
        animation.onfinish = () => confetti.remove();
    }
}

// Move to next question
function nextQuestion() {
    // Remove all answer feedback
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'wrong', 'show-correct', 'disabled', 'selected');
        option.style.animation = '';
    });
    
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        selectedOption = null;
        showQuestion();
        nextBtn.classList.add('hidden');
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    // Hide quiz screen
    quizScreen.classList.add('hidden');
    
    // Show results screen
    resultsScreen.classList.remove('hidden');
    
    // Update final score to show as fraction (e.g., "5/10")
    finalScoreElement.textContent = `${score}/${questions.length}`;
    
    // Show score message
    const scorePercentage = (score / questions.length) * 100;
    let message = '';
    
    if (scorePercentage >= 90) {
        message = currentLanguage === 'en' 
            ? '⚡ Amazing! You\'re a Tesla expert!' 
            : '⚡ מדהים! אתה מומחה לטסלה!';
    } else if (scorePercentage >= 70) {
        message = currentLanguage === 'en'
            ? '👏 Great job! You know a lot about Tesla!'
            : '👏 עבודה מצוינת! אתה מכיר הרבה על טסלה!';
    } else if (scorePercentage >= 50) {
        message = currentLanguage === 'en'
            ? '👍 Good effort! Keep learning about Tesla\'s inventions!'
            : '👍 מאמץ טוב! המשיכו ללמוד על ההמצאות של טסלה!';
    } else {
        message = currentLanguage === 'en'
            ? '💡 Keep exploring the world of Tesla!'
            : '💡 המשיכו לחקור את עולמו של טסלה!';
    }
    
    scoreMessageElement.textContent = message;
    
    // Update UI text in case language was changed during quiz
    updateUIText();
    
    // Play completion sound
    completeSound.play();
}

// Return to main menu
function returnToMenu() {
    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    
    // Show intro screen
    quizScreen.classList.add('hidden');
    resultsScreen.classList.add('hidden');
    introScreen.classList.remove('hidden');
    
    // Reset questions order
    shuffleArray(questions);
}

// Restart the quiz
function restartQuiz() {
    // Reset game state
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    
    // Reset score display
    scoreElement.textContent = score;
    
    // Hide results screen and show quiz screen
    resultsScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    // Reset any UI states
    nextBtn.classList.add('hidden');
    
    // Clear any selected options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct', 'wrong', 'selected', 'disabled');
    });
    
    // Shuffle questions and options
    shuffleArray(questions);
    
    // Load first question
    showQuestion();
    
    // Force a reflow to ensure smooth transition
    quizScreen.offsetHeight;
}

// Share score
function shareScore() {
    const shareText = currentLanguage === 'en'
        ? `I scored ${score}/${questions.length} in Tesla Trivia! ⚡ Can you beat me?`
        : `קיבלתי ${score}/${questions.length} בחידון טסלה! ⚡ תצליח/י להביס אותי?`;
    
    if (navigator.share) {
        navigator.share({
            title: 'Tesla Trivia Challenge',
            text: shareText,
            url: window.location.href
        }).catch(console.error);
    } else {
        // Fallback for browsers that don't support Web Share API
        navigator.clipboard.writeText(shareText).then(() => {
            alert(currentLanguage === 'en' 
                ? 'Score copied to clipboard!'
                : 'התוצאה הועתקה ללוח!');
        });
    }
}

// Switch language
function switchLanguage(lang) {
    if (lang === currentLanguage) return;
    
    currentLanguage = lang;
    questions = [...questionsData[lang]];
    
    // Update active button
    langButtons.forEach(btn => {
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Update UI text based on language
    updateUIText();
    
    // If in quiz, update current question
    if (!quizScreen.classList.contains('hidden')) {
        showQuestion();
    }
}

// Update UI text based on language
function updateUIText() {
    if (currentLanguage === 'he') {
        document.documentElement.dir = 'rtl';
        startBtn.textContent = 'התחל חידון';
        nextBtn.textContent = 'שאלה הבאה';
        restartBtn.textContent = 'שחק שוב';
        menuBtn.innerHTML = '<i class="fas fa-home"></i> חזור להתחלה';
        shareBtn.innerHTML = '<i class="fas fa-share"></i> שתף תוצאה';
        
        if (!introScreen.classList.contains('hidden')) {
            document.querySelector('.subtitle').textContent = 'הגאון הנשכח';
        }
    } else {
        document.documentElement.dir = 'ltr';
        startBtn.textContent = 'Start Quiz';
        nextBtn.textContent = 'Next Question';
        restartBtn.textContent = 'Play Again';
        menuBtn.innerHTML = '<i class="fas fa-home"></i> Back to Menu';
        shareBtn.innerHTML = '<i class="fas fa-share"></i> Share Score';
        
        if (!introScreen.classList.contains('hidden')) {
            document.querySelector('.subtitle').textContent = 'The Forgotten Genius';
        }
    }
}

// Utility function to shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
