// ===============================
// ONLINE EXAMINATION SYSTEM
// JavaScript
// ===============================

// ---------- Student Data ----------
let student = {
    name: "",
    email: "",
    phone: "",
    course: "",
    password: ""
};

let loggedIn = false;

// ---------- Exam Questions ----------
const questions = [
    {
        question: "Which language is mainly used to structure a web page?",
        options: ["CSS", "HTML", "JavaScript", "Python"],
        answer: 1
    },
    {
        question: "Which language is used to style a web page?",
        options: ["HTML", "CSS", "Java", "SQL"],
        answer: 1
    },
    {
        question: "Which language is used to make web pages interactive?",
        options: ["HTML", "CSS", "JavaScript", "C"],
        answer: 2
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlink Text Management Language",
            "Home Tool Markup Language"
        ],
        answer: 0
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheet",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        answer: 1
    },
    {
        question: "Which symbol is used for an ID selector in CSS?",
        options: [".", "#", "*", "&"],
        answer: 1
    },
    {
        question: "Which symbol is used for a class selector in CSS?",
        options: ["#", ".", "*", "$"],
        answer: 1
    },
    {
        question: "Which tag is used to create a paragraph in HTML?",
        options: ["<p>", "<h1>", "<br>", "<div>"],
        answer: 0
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<url>"],
        answer: 1
    },
    {
        question: "Which tag is used to insert an image?",
        options: ["<image>", "<img>", "<pic>", "<src>"],
        answer: 1
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["var", "int", "string", "define"],
        answer: 0
    },
    {
        question: "Which operator is used for addition in JavaScript?",
        options: ["+", "-", "*", "/"],
        answer: 0
    },
    {
        question: "Which database language is used to manage relational databases?",
        options: ["HTML", "CSS", "SQL", "XML"],
        answer: 2
    },
    {
        question: "What does SQL stand for?",
        options: [
            "Structured Query Language",
            "Simple Query Language",
            "System Query Language",
            "Standard Question Language"
        ],
        answer: 0
    },
    {
        question: "Which command is used to retrieve data from a database?",
        options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
        answer: 2
    },
    {
        question: "Which command is used to add new data into a database?",
        options: ["SELECT", "INSERT", "UPDATE", "CREATE"],
        answer: 1
    },
    {
        question: "Which command is used to remove data from a database?",
        options: ["REMOVE", "DELETE", "DROP", "CLEAR"],
        answer: 1
    },
    {
        question: "Which data type is used to store text in many programming languages?",
        options: ["Integer", "String", "Boolean", "Float"],
        answer: 1
    },
    {
        question: "Which value represents TRUE or FALSE?",
        options: ["String", "Boolean", "Integer", "Character"],
        answer: 1
    },
    {
        question: "Which device is used to connect a computer to a network?",
        options: ["Keyboard", "Router", "Monitor", "Printer"],
        answer: 1
    }
];

// ---------- Exam Variables ----------
let currentQuestion = 0;
let selectedAnswers = new Array(questions.length).fill(null);
let examStarted = false;

let timeRemaining = 60 * 60;
let timerInterval = null;

// ---------- Helper Function ----------
function getElement(id) {
    return document.getElementById(id);
}

// ---------- Page Navigation ----------
function showPage(pageId) {
    const pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = getElement(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// ---------- Home Button ----------
const homeButtons = document.querySelectorAll('[data-page="home"]');

homeButtons.forEach(button => {
    button.addEventListener("click", function () {
        showPage("home");
    });
});

// ---------- Navigation Links ----------
const navLinks = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        event.preventDefault();

        const page = this.getAttribute("data-page");

        if (page === "dashboard" && !loggedIn) {
            alert("Please login first.");
            showPage("login");
            return;
        }

        showPage(page);
    });
});

// ---------- Registration ----------
const registerForm = getElement("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = getElement("regName").value.trim();
        const email = getElement("regEmail").value.trim();
        const phone = getElement("regPhone").value.trim();
        const course = getElement("regCourse").value;
        const password = getElement("regPassword").value;
        const confirmPassword = getElement("regConfirmPassword").value;

        if (!name || !email || !phone || !course || !password || !confirmPassword) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Password and Confirm Password do not match.");
            return;
        }

        student.name = name;
        student.email = email;
        student.phone = phone;
        student.course = course;
        student.password = password;

        alert("Registration successful! Please login.");

        registerForm.reset();

        showPage("login");
    });
}

// ---------- Login ----------
const loginForm = getElement("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = getElement("loginEmail").value.trim();
        const password = getElement("loginPassword").value;

        if (!student.email) {
            alert("Please register first.");
            showPage("register");
            return;
        }

        if (email === student.email && password === student.password) {

            loggedIn = true;

            updateStudentInformation();

            alert("Login successful!");

            showPage("dashboard");

        } else {
            alert("Invalid email or password.");
        }
    });
}

// ---------- Update Student Information ----------
function updateStudentInformation() {

    const dashboardStudentName = getElement("dashboardStudentName");
    const dashboardStudentEmail = getElement("dashboardStudentEmail");
    const welcomeName = getElement("welcomeName");

    if (dashboardStudentName) {
        dashboardStudentName.textContent = student.name;
    }

    if (dashboardStudentEmail) {
        dashboardStudentEmail.textContent = student.email;
    }

    if (welcomeName) {
        welcomeName.textContent = student.name;
    }
}

// ---------- Start Exam ----------
const startExamButton = getElement("startExamBtn");

if (startExamButton) {
    startExamButton.addEventListener("click", function () {

        if (!loggedIn) {
            alert("Please login first.");
            showPage("login");
            return;
        }

        currentQuestion = 0;
        selectedAnswers = new Array(questions.length).fill(null);

        examStarted = true;

        timeRemaining = 60 * 60;

        createQuestionPalette();

        showPage("exam");

        renderQuestion();

        startTimer();
    });
}

// ---------- Create Question Palette ----------
function createQuestionPalette() {

    const palette = getElement("questionPalette");

    if (!palette) {
        return;
    }

    palette.innerHTML = "";

    questions.forEach((question, index) => {

        const button = document.createElement("button");

        button.type = "button";
        button.textContent = index + 1;

        button.addEventListener("click", function () {

            currentQuestion = index;

            renderQuestion();
        });

        palette.appendChild(button);
    });

    updateQuestionPalette();
}

// ---------- Update Question Palette ----------
function updateQuestionPalette() {

    const palette = getElement("questionPalette");

    if (!palette) {
        return;
    }

    const buttons = palette.querySelectorAll("button");

    buttons.forEach((button, index) => {

        button.classList.remove("active");
        button.classList.remove("answered");

        if (index === currentQuestion) {
            button.classList.add("active");
        }

        if (selectedAnswers[index] !== null) {
            button.classList.add("answered");
        }
    });
}

// ---------- Render Question ----------
function renderQuestion() {

    const question = questions[currentQuestion];

    if (!question) {
        return;
    }

    const questionNumber = getElement("questionNumber");
    const questionText = getElement("questionText");
    const optionsContainer = getElement("optionsContainer");

    const currentQuestionNumber = getElement("currentQuestionNumber");
    const totalQuestions = getElement("totalQuestions");

    if (questionNumber) {
        questionNumber.textContent = `Question ${currentQuestion + 1}`;
    }

    if (questionText) {
        questionText.textContent = question.question;
    }

    if (currentQuestionNumber) {
        currentQuestionNumber.textContent = currentQuestion + 1;
    }

    if (totalQuestions) {
        totalQuestions.textContent = questions.length;
    }

    if (optionsContainer) {

        optionsContainer.innerHTML = "";

        question.options.forEach((option, index) => {

            const optionLabel = document.createElement("label");

            optionLabel.className = "option";

            if (selectedAnswers[currentQuestion] === index) {
                optionLabel.classList.add("selected");
            }

            optionLabel.innerHTML = `
                <input 
                    type="radio" 
                    name="answer"
                    value="${index}"
                    ${selectedAnswers[currentQuestion] === index ? "checked" : ""}
                >
                <span>${option}</span>
            `;

            const radio = optionLabel.querySelector("input");

            radio.addEventListener("change", function () {

                selectedAnswers[currentQuestion] = index;

                renderQuestion();
            });

            optionsContainer.appendChild(optionLabel);
        });
    }

    updateProgress();

    updateQuestionPalette();

    updateNavigationButtons();
}

// ---------- Progress ----------
function updateProgress() {

    const answered = selectedAnswers.filter(
        answer => answer !== null
    ).length;

    const percentage = Math.round(
        (answered / questions.length) * 100
    );

    const progressPercent = getElement("progressPercent");
    const progressBar = getElement("progressBar");

    if (progressPercent) {
        progressPercent.textContent = `${percentage}%`;
    }

    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

// ---------- Previous Button ----------
const previousBtn = getElement("previousBtn");

if (previousBtn) {
    previousBtn.addEventListener("click", function () {

        if (currentQuestion > 0) {

            currentQuestion--;

            renderQuestion();
        }
    });
}

// ---------- Next Button ----------
const nextBtn = getElement("nextBtn");

if (nextBtn) {
    nextBtn.addEventListener("click", function () {

        if (selectedAnswers[currentQuestion] === null) {

            alert("Please select an answer before continuing.");

            return;
        }

        if (currentQuestion < questions.length - 1) {

            currentQuestion++;

            renderQuestion();

        } else {

            const confirmSubmit = confirm(
                "You have reached the last question. Do you want to submit the exam?"
            );

            if (confirmSubmit) {
                submitExam();
            }
        }
    });
}

// ---------- Navigation Button State ----------
function updateNavigationButtons() {

    const previous = getElement("previousBtn");
    const next = getElement("nextBtn");

    if (previous) {
        previous.disabled = currentQuestion === 0;
    }

    if (next) {

        if (currentQuestion === questions.length - 1) {
            next.textContent = "Submit Exam";
        } else {
            next.textContent = "Next";
        }
    }
}

// ---------- Timer ----------
function startTimer() {

    clearInterval(timerInterval);

    updateTimerDisplay();

    timerInterval = setInterval(function () {

        if (timeRemaining > 0) {

            timeRemaining--;

            updateTimerDisplay();

        } else {

            clearInterval(timerInterval);

            alert("Time is over. Your exam will be submitted automatically.");

            submitExam();
        }

    }, 1000);
}

// ---------- Timer Display ----------
function updateTimerDisplay() {

    const timer = getElement("timer");

    if (!timer) {
        return;
    }

    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;

    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");

    timer.textContent =
        `${formattedMinutes}:${formattedSeconds}`;
}

// ---------- Submit Exam ----------
function submitExam() {

    clearInterval(timerInterval);

    examStarted = false;

    let correct = 0;

    selectedAnswers.forEach((answer, index) => {

        if (answer === questions[index].answer) {
            correct++;
        }
    });

    const wrong = questions.length - correct;

    const percentage = Math.round(
        (correct / questions.length) * 100
    );

    const scorePercentage = getElement("scorePercentage");
    const correctAnswers = getElement("correctAnswers");
    const wrongAnswers = getElement("wrongAnswers");
    const totalMarks = getElement("totalMarks");
    const resultStatus = getElement("resultStatus");

    if (scorePercentage) {
        scorePercentage.textContent = `${percentage}%`;
    }

    if (correctAnswers) {
        correctAnswers.textContent = correct;
    }

    if (wrongAnswers) {
        wrongAnswers.textContent = wrong;
    }

    if (totalMarks) {
        totalMarks.textContent = `${correct} / ${questions.length}`;
    }

    if (resultStatus) {

        if (percentage >= 40) {
            resultStatus.textContent = "PASS";
            resultStatus.className = "result-status pass";
        } else {
            resultStatus.textContent = "FAIL";
            resultStatus.className = "result-status fail";
        }
    }

    createAnswerReview();

    showPage("result");
}

// ---------- Answer Review ----------
function createAnswerReview() {

    const answerReview = getElement("answerReview");

    if (!answerReview) {
        return;
    }

    answerReview.innerHTML = "";

    questions.forEach((question, index) => {

        const item = document.createElement("div");

        const userAnswer = selectedAnswers[index];

        let status = "";

        if (userAnswer === question.answer) {
            status = "Correct";
            item.className = "review-item correct";
        } else if (userAnswer === null) {
            status = "Not Answered";
            item.className = "review-item unanswered";
        } else {
            status = "Wrong";
            item.className = "review-item wrong";
        }

        const selectedText =
            userAnswer !== null
                ? question.options[userAnswer]
                : "Not Answered";

        const correctText =
            question.options[question.answer];

        item.innerHTML = `
            <h4>Question ${index + 1}</h4>
            <p><strong>${question.question}</strong></p>
            <p>Your Answer: ${selectedText}</p>
            <p>Correct Answer: ${correctText}</p>
            <strong>${status}</strong>
        `;

        answerReview.appendChild(item);
    });
}

// ---------- Result Home Button ----------
const resultHomeBtn = getElement("resultHomeBtn");

if (resultHomeBtn) {

    resultHomeBtn.addEventListener("click", function () {

        showPage("dashboard");
    });
}

// ---------- Profile ----------
const profileBtn = getElement("profileBtn");

if (profileBtn) {

    profileBtn.addEventListener("click", function () {

        openProfile();
    });
}

// ---------- Open Profile ----------
function openProfile() {

    const modal = getElement("profileModal");

    if (!modal) {
        return;
    }

    const profileName = getElement("profileName");
    const profileEmail = getElement("profileEmail");
    const profilePhone = getElement("profilePhone");
    const profileCourse = getElement("profileCourse");

    if (profileName) {
        profileName.textContent = student.name;
    }

    if (profileEmail) {
        profileEmail.textContent = student.email;
    }

    if (profilePhone) {
        profilePhone.textContent = student.phone;
    }

    if (profileCourse) {
        profileCourse.textContent = student.course;
    }

    modal.classList.add("show");
}


// ---------- Close Profile ----------
const closeProfileBtn = document.getElementById("closeProfileBtn");

if (closeProfileBtn) {
    closeProfileBtn.addEventListener("click", function () {
        document.getElementById("profileModal").classList.remove("show");
    });
}

// ---------- Close Modal When Clicking Outside ----------
const profileModal = getElement("profileModal");

if (profileModal) {

    profileModal.addEventListener("click", function (event) {

        if (event.target === profileModal) {
            profileModal.classList.remove("show");
        }
    });
}

// ---------- Logout ----------
const logoutBtn = getElement("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

        loggedIn = false;

        clearInterval(timerInterval);

        alert("You have been logged out.");

        showPage("home");
    });
}

// ---------- Register Page Button ----------
const goRegisterBtn = getElement("goRegisterBtn");

if (goRegisterBtn) {

    goRegisterBtn.addEventListener("click", function () {

        showPage("register");
    });
}

// ---------- Login Page Button ----------
const goLoginBtn = getElement("goLoginBtn");

if (goLoginBtn) {

    goLoginBtn.addEventListener("click", function () {

        showPage("login");
    });
}

// ---------- Initialize ----------
document.addEventListener("DOMContentLoaded", function () {

    showPage("home");

    console.log("Online Examination System Loaded Successfully.");
});
