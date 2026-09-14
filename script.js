/* =========================================================
   PRAXIS — script.js
   Plain JS app: state, question banks, rendering, exam engine
   ========================================================= */

/* ---------------- question banks ---------------- */
const QUESTION_BANKS = {
  PHP: [
    { q: "What does PHP stand for?", o: ["Personal Home Page", "Hypertext Preprocessor", "Private Home Processor", "Public Hyperlink Page"], c: 1, d: "Easy" },
    { q: "Which symbol is used to declare a variable in PHP?", o: ["#", "$", "@", "&"], c: 1, d: "Easy" },
    { q: "Which statement outputs text to the browser?", o: ["echo", "write", "display", "scan"], c: 0, d: "Easy" },
    { q: "What is the correct file extension for PHP files?", o: [".pht", ".ph", ".php", ".pp"], c: 2, d: "Easy" },
    { q: "Which keyword is used to define a function?", o: ["func", "def", "function", "method"], c: 2, d: "Easy" },
    { q: "Which comparison operator checks both value and type?", o: ["==", "=", "===", "<>"], c: 2, d: "Easy" },
    { q: "Which superglobal array holds data sent via an HTML POST form?", o: ["$_GET", "$_POST", "$_REQUEST_ONLY", "$_FORM"], c: 1, d: "Medium" },
    { q: "Which function splits a string into an array using a delimiter?", o: ["implode()", "split_str()", "explode()", "str_split_by()"], c: 2, d: "Medium" },
    { q: "Which operator concatenates two strings in PHP?", o: ["+", "&", ".", "::"], c: 2, d: "Medium" },
    { q: "What does isset($var) check for?", o: ["That a variable is a string", "That a variable exists and is not null", "That a variable is numeric", "That a function is defined"], c: 1, d: "Medium" },
    { q: "Which loop is guaranteed to run at least once?", o: ["for", "while", "do...while", "foreach"], c: 2, d: "Medium" },
    { q: "How do you start a PHP session?", o: ["session_start()", "start_session()", "session_open()", "new Session()"], c: 0, d: "Medium" },
    { q: "Which array function merges two arrays into one?", o: ["array_join()", "array_merge()", "array_combine_all()", "merge_array()"], c: 1, d: "Medium" },
    { q: "Which superglobal array holds uploaded file data?", o: ["$_UPLOAD", "$_POST", "$_FILES", "$_DATA"], c: 2, d: "Medium" },
    { q: "Which procedural function opens a MySQL connection via MySQLi?", o: ["mysqli_connect()", "mysql_open()", "db_connect()", "new_connection()"], c: 0, d: "Medium" },
    { q: "Which magic method is invoked when an object is used as a string?", o: ["__string()", "__toString()", "__print()", "__display()"], c: 1, d: "Hard" },
    { q: "Which access modifier restricts a property to only the declaring class?", o: ["public", "protected", "private", "static"], c: 2, d: "Hard" },
    { q: "Which construct is used to handle exceptions?", o: ["try...catch", "on...error", "handle...fail", "check...fault"], c: 0, d: "Hard" },
    { q: "Which function converts a PHP array into a JSON string?", o: ["json_encode()", "json_parse()", "array_to_json()", "encode_json()"], c: 0, d: "Hard" },
    { q: "What is the safest way to build SQL queries with user input in PHP?", o: ["String concatenation", "addslashes() only", "Prepared statements", "urlencode()"], c: 2, d: "Hard" },
  ],
  ADBMS: [
    { q: "What does DBMS stand for?", o: ["Database Management System", "Data Backup Management Service", "Digital Base Modeling System", "Database Model Service"], c: 0, d: "Easy" },
    { q: "Which key uniquely identifies a row and cannot be NULL?", o: ["Foreign key", "Candidate key", "Primary key", "Composite key"], c: 2, d: "Easy" },
    { q: "Which SQL clause filters results after grouping?", o: ["WHERE", "HAVING", "GROUP", "FILTER"], c: 1, d: "Easy" },
    { q: "Which SQL keyword removes duplicate rows from a result set?", o: ["UNIQUE", "DISTINCT", "REMOVE DUP", "FILTERED"], c: 1, d: "Easy" },
    { q: "A 'view' in a database is best described as:", o: ["A physical copy of a table", "A virtual table based on a query", "An index on a column", "A backup of the database"], c: 1, d: "Easy" },
    { q: "Which normal form removes partial dependency on a composite key?", o: ["1NF", "2NF", "3NF", "BCNF"], c: 1, d: "Medium" },
    { q: "Which normal form removes transitive dependency?", o: ["1NF", "2NF", "3NF", "BCNF"], c: 2, d: "Medium" },
    { q: "A candidate key is best described as:", o: ["Any column in a table", "A minimal super key", "A foreign key referencing another table", "A column that allows duplicates"], c: 1, d: "Medium" },
    { q: "Which join returns matched rows plus unmatched rows from both tables?", o: ["INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "FULL OUTER JOIN"], c: 3, d: "Medium" },
    { q: "What does 'denormalization' mean?", o: ["Removing all keys", "Introducing redundancy to improve read performance", "Deleting duplicate tables", "Splitting one table into many"], c: 1, d: "Medium" },
    { q: "What is the purpose of an index in a database?", o: ["Encrypt the data", "Speed up data retrieval", "Enforce foreign keys", "Compress storage"], c: 1, d: "Medium" },
    { q: "Which type of database is MongoDB classified as?", o: ["Relational", "NoSQL / document-oriented", "Graph-only", "Columnar only"], c: 1, d: "Medium" },
    { q: "Expand ACID in the context of transactions.", o: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Concurrency, Indexing, Durability", "Atomicity, Concurrency, Integrity, Design", "Access, Control, Isolation, Data"], c: 0, d: "Hard" },
    { q: "A deadlock in a DBMS occurs when:", o: ["A query returns no rows", "Transactions wait on each other's locks in a cycle", "A table has no primary key", "An index becomes corrupted"], c: 1, d: "Hard" },
    { q: "Two-Phase Locking (2PL) is primarily used to guarantee:", o: ["Faster indexing", "Serializability of transactions", "Smaller storage size", "Automatic normalization"], c: 1, d: "Hard" },
    { q: "The CAP theorem states a distributed system can fully guarantee only:", o: ["All of Consistency, Availability, Partition tolerance", "Two of Consistency, Availability, Partition tolerance", "Only Consistency", "Only Availability"], c: 1, d: "Hard" },
    { q: "What does BCNF improve upon compared to 3NF?", o: ["It is a looser rule than 3NF", "It handles certain anomalies 3NF misses, using stricter key rules", "It only applies to NoSQL", "It removes the need for primary keys"], c: 1, d: "Hard" },
    { q: "A checkpoint in DBMS recovery is used to:", o: ["Delete old logs permanently", "Save a consistent DB state to reduce recovery time", "Lock the entire database", "Create a new schema"], c: 1, d: "Hard" },
    { q: "Timestamp ordering protocol is a technique used for:", o: ["Query optimization", "Concurrency control", "Data compression", "Index rebuilding"], c: 1, d: "Hard" },
    { q: "The Write-Ahead Log (WAL) primarily ensures:", o: ["Faster joins", "Durability and crash recovery", "Automatic normalization", "Data encryption"], c: 1, d: "Hard" },
  ],
  DS: [
    { q: "Which data structure follows LIFO order?", o: ["Queue", "Stack", "Array", "Linked List"], c: 1, d: "Easy" },
    { q: "Which data structure follows FIFO order?", o: ["Stack", "Tree", "Queue", "Graph"], c: 2, d: "Easy" },
    { q: "What is the index of the first element in a standard array?", o: ["1", "0", "-1", "Depends on the language only"], c: 1, d: "Easy" },
    { q: "Which operation adds an element to the top of a stack?", o: ["Pop", "Push", "Enqueue", "Insert"], c: 1, d: "Easy" },
    { q: "Which data structure is used internally to manage function recursion?", o: ["Queue", "Heap", "Stack", "Hash table"], c: 2, d: "Easy" },
    { q: "Each node in a singly linked list stores:", o: ["Only data", "Data and a pointer to the previous node", "Data and a pointer to the next node", "Two pointers and no data"], c: 2, d: "Easy" },
    { q: "What is the time complexity of binary search on a sorted array?", o: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], c: 1, d: "Medium" },
    { q: "Which traversal visits Root, then Left, then Right?", o: ["Inorder", "Postorder", "Preorder", "Level order"], c: 2, d: "Medium" },
    { q: "Which structure is best suited for representing many-to-many relationships?", o: ["Array", "Stack", "Graph", "Queue"], c: 2, d: "Medium" },
    { q: "Which sorting algorithm is stable with O(n log n) worst-case time?", o: ["Quick sort", "Merge sort", "Selection sort", "Bubble sort"], c: 1, d: "Medium" },
    { q: "Which structure is typically used to implement BFS traversal?", o: ["Stack", "Queue", "Heap", "Linked list only"], c: 1, d: "Medium" },
    { q: "Which structure is typically used to implement DFS traversal iteratively?", o: ["Queue", "Stack", "Priority queue", "Hash map"], c: 1, d: "Medium" },
    { q: "A min-heap is primarily used to efficiently retrieve:", o: ["The maximum element", "A random element", "The minimum element", "The middle element"], c: 2, d: "Medium" },
    { q: "An AVL tree is an example of a:", o: ["Self-balancing binary search tree", "Hash table", "Directed graph", "Circular queue"], c: 0, d: "Medium" },
    { q: "A hash table commonly resolves collisions using:", o: ["Recursion", "Chaining", "Sorting", "Binary search"], c: 1, d: "Medium" },
    { q: "What is the worst-case time complexity of quicksort?", o: ["O(n log n)", "O(log n)", "O(n^2)", "O(n)"], c: 2, d: "Hard" },
    { q: "What is the average-case time complexity of inserting into a hash table?", o: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], c: 3, d: "Hard" },
    { q: "What is the space complexity of merge sort?", o: ["O(1)", "O(log n)", "O(n)", "O(n^2)"], c: 2, d: "Hard" },
    { q: "In a balanced binary search tree with n nodes, the height is:", o: ["O(n)", "O(log n)", "O(n^2)", "O(1)"], c: 1, d: "Hard" },
    { q: "Dijkstra's algorithm using a min-heap runs in:", o: ["O(V+E)", "O(V^2)", "O((V+E) log V)", "O(E log E log V)"], c: 2, d: "Hard" },
  ],
};

const SUBJECT_META = {
  PHP: { label: "PHP", icon: "code-2", blurb: "Server-side scripting, syntax, sessions & MySQLi." },
  ADBMS: { label: "ADBMS", icon: "database", blurb: "Normalization, transactions, indexing & concurrency." },
  DS: { label: "Data Structures", icon: "git-branch", blurb: "Stacks, trees, graphs, sorting & complexity." },
};

const EXAM_SECONDS = 30 * 60;

/* ---------------- global state ---------------- */
const state = {
  isDark: false,
  page: "home",
  users: [],
  currentUser: null,
  examSubject: null,
  examSet: null,
  answers: [],
  currentIndex: 0,
  timeLeft: EXAM_SECONDS,
  examStartedAt: null,
  pastResults: [],
  latestResult: null,
  viewedResult: null,
  mobileOpen: false,
  profileSaved: false,
};

let examTimerInterval = null;

/* ---------------- helpers ---------------- */
function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function buildExam(subject) {
  return shuffle(QUESTION_BANKS[subject]).map((item, i) => ({
    id: i, question: item.q, options: item.o, correct: item.c, difficulty: item.d,
  }));
}
function fmtClock(totalSeconds) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
function getQuote(pct) {
  if (pct >= 90) return "Outstanding. You're sitting comfortably above exam-ready.";
  if (pct >= 75) return "Strong performance — you clearly know this material well.";
  if (pct >= 60) return "Solid effort. A little more practice on the weak spots and you'll ace it.";
  if (pct >= 40) return "You're getting there. Revisit the topics you missed and try again.";
  return "Tough round — but every attempt tells you exactly what to study next.";
}
function computeResult(subject, exam, answers, startedAt, secondsUsed) {
  let correct = 0, incorrect = 0, skipped = 0;
  const diffStats = { Easy: { correct: 0, total: 0 }, Medium: { correct: 0, total: 0 }, Hard: { correct: 0, total: 0 } };
  const questionDetails = exam.map((q, i) => {
    const chosen = answers[i];
    diffStats[q.difficulty].total += 1;
    let status = "skipped";
    if (chosen === null || chosen === undefined) {
      skipped += 1;
    } else if (chosen === q.correct) {
      correct += 1; status = "correct"; diffStats[q.difficulty].correct += 1;
    } else {
      incorrect += 1; status = "incorrect";
    }
    return { ...q, chosen: chosen ?? null, status };
  });
  const attempted = correct + incorrect;
  const percentage = Math.round((correct / exam.length) * 100);
  const avgTime = attempted > 0 ? Math.round(secondsUsed / attempted) : 0;
  return {
    id: `${subject}-${Date.now()}`,
    subject,
    dateStr: startedAt.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }),
    timeStr: startedAt.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
    durationUsedStr: fmtClock(secondsUsed),
    totalDurationStr: fmtClock(EXAM_SECONDS),
    percentage, correct, incorrect, skipped, attempted, total: exam.length, avgTime,
    diffStats, questionDetails,
  };
}
function icon(name, size = 18) {
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px"></i>`;
}
function logoHtml(onDark) {
  return `<div class="logo">
    <div class="logo-mark">${icon("clipboard-check", 18)}</div>
    <span class="logo-text ${onDark ? "on-dark" : ""}">Exam</span>
  </div>`;
}

/* ---------------- theme ---------------- */
function toggleTheme() {
  state.isDark = !state.isDark;
  document.documentElement.setAttribute("data-theme", state.isDark ? "dark" : "light");
  render(); // re-render so the sun/moon icon flips
}

/* ---------------- navigation ---------------- */
function go(page) {
  if (state.page === "exam" && page !== "exam") {
    clearInterval(examTimerInterval);
  }
  state.page = page;
  state.mobileOpen = false;
  render();
  window.scrollTo(0, 0);
}
function toggleMobileMenu(open) { state.mobileOpen = open; render(); }

/* ---------------- auth ---------------- */
function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const errEl = document.getElementById("auth-error");

  if (state.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    errEl.textContent = "An account with this email already exists. Try logging in.";
    return false;
  }
  if (password.length < 4) {
    errEl.textContent = "Password should be at least 4 characters.";
    return false;
  }
  const user = { id: Date.now(), name, email, password,course };
  state.users.push(user);
  state.currentUser = null;
  go("login");
  return false;
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value;
  const errEl = document.getElementById("auth-error");

  const user = state.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) { errEl.textContent = "No account found for this email. Please register first."; return false; }
  if (user.password !== password) { errEl.textContent = "Incorrect password. Try again."; return false; }
  state.currentUser = user;
  go("dashboard");
  return false;
}
function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  const password = document.getElementById("reg-password").value;
  const course = document.getElementById("reg-course").value;
  const errEl = document.getElementById("auth-error");

  if (state.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    errEl.textContent = "An account with this email already exists. Try logging in.";
    return false;
  }

  if (password.length < 4) {
    errEl.textContent = "Password should be at least 4 characters.";
    return false;
  }

  if (!course) {
    errEl.textContent = "Please select your course.";
    return false;
  }

  const user = {
    id: Date.now(),
    name,
    email,
    password,
    course
  };

  state.users.push(user);

  // Registration → Login
  state.currentUser = null;
  go("login");

  return false;
}

/* ---------------- exam engine ---------------- */
function startExam(subject) {
  state.examSubject = subject;
  state.examSet = buildExam(subject);
  state.answers = Array(state.examSet.length).fill(null);
  state.currentIndex = 0;
  state.timeLeft = EXAM_SECONDS;
  state.examStartedAt = new Date();
  go("exam");
  clearInterval(examTimerInterval);
  examTimerInterval = setInterval(tickTimer, 1000);
}

function tickTimer() {
  state.timeLeft -= 1;
  updateTimerDom();
  if (state.timeLeft <= 0) {
    finishExam();
  }
}

function updateTimerDom() {
  const textEl = document.getElementById("exam-timer-text");
  const badgeEl = document.getElementById("exam-timer-badge");
  const bannerEl = document.getElementById("exam-warning-banner");
  if (!textEl || !badgeEl) return; // not on exam page anymore
  textEl.textContent = fmtClock(Math.max(0, state.timeLeft));
  const warn = state.timeLeft <= 60;
  badgeEl.classList.toggle("warn", warn);
  if (bannerEl) bannerEl.style.display = warn ? "block" : "none";
}

function pickOption(index) {
  state.answers[state.currentIndex] = index;
  renderExamOnly();
}
function skipQuestion() {
  state.answers[state.currentIndex] = null;
  goToQuestion(Math.min(state.examSet.length - 1, state.currentIndex + 1));
}
function goToQuestion(i) {
  state.currentIndex = i;
  renderExamOnly();
}
function nextQuestion() { goToQuestion(Math.min(state.examSet.length - 1, state.currentIndex + 1)); }
function prevQuestion() { goToQuestion(Math.max(0, state.currentIndex - 1)); }

function finishExam() {
  clearInterval(examTimerInterval);
  const used = EXAM_SECONDS - Math.max(0, state.timeLeft);
  const result = computeResult(state.examSubject, state.examSet, state.answers, state.examStartedAt, used);
  state.pastResults.push(result);
  state.latestResult = result;
  state.examSet = null;
  go("resultLatest");
}

function openPastResult(id) {
  state.viewedResult = state.pastResults.find((r) => r.id === id) || null;
  go("resultDetail");
}

/* ---------------- render: pieces ---------------- */


function bubblesHtml(count) {
  let out = "";
  for (let i = 0; i < count; i++) {
    const size = 18 + Math.random() * 70;
    const left = Math.random() * 100;
    const delay = (Math.random() * 8).toFixed(2);
    const dur = (10 + Math.random() * 14).toFixed(2);
    out += `<div class="bubble" style="left:${left}%;width:${size}px;height:${size}px;animation-duration:${dur}s;animation-delay:${delay}s;"></div>`;
  }
  return `<div class="bubbles-container">${out}</div>`;
}

function marketingNav() {
  const links = [["home", "Home"], ["about", "About"], ["contact", "Contact"]];
  return `
  <div class="navbar">
    <div class="navbar-inner">
      <a onclick="go('home')">${logoHtml(false)}</a>
      <div class="flex" style="align-items:center;gap:8px;">
        <div class="nav-links">
          ${links.map(([key, label]) => `<button class="nav-link ${state.page === key ? "active" : ""}" onclick="go('${key}')">${label}</button>`).join("")}
        </div>
        <button class="icon-btn" onclick="toggleTheme()">${icon(state.isDark ? "sun" : "moon", 18)}</button>
        <button class="btn" onclick="go('login')">Log in</button>
        <button class="btn btn-primary" onclick="go('register')">Register</button>
      </div>
    </div>
  </div>`;
}

function livePreviewHtml() {
  const boxColors = ["var(--success)", "var(--success)", "var(--success)", "var(--success)", "var(--skip)", "var(--skip)", "var(--primary)", "var(--skip)", "var(--skip)", "var(--skip)", "var(--skip)", "var(--skip)", "var(--accent)", "var(--skip)", "var(--skip)", "var(--skip)", "var(--skip)", "var(--skip)", "var(--skip)", "var(--skip)"];
  let boxes = "";
  for (let i = 0; i < 20; i++) boxes += `<div style="background:${boxColors[i]}">${i + 1}</div>`;
  return `
  <div class="preview-card">
    <div class="flex-between" style="margin-bottom:4px;">
      <span class="pill">Question 07 / 20</span>
      <span class="muted flex" style="align-items:center;gap:5px;font-size:13px;font-weight:600;">${icon("clock", 14)} 21:48</span>
    </div>
    <p class="preview-q">Which data structure follows LIFO order?</p>
    <div id="preview-options"></div>
    <div class="preview-palette">${boxes}</div>
    <p class="muted" style="margin-top:10px;font-size:11px;text-align:center;">Live interaction preview — try clicking an option</p>
  </div>`;
}

function renderPreviewOptions(pickedIdx) {
  const opts = ["Queue", "Stack", "Array", "Graph"];
  const html = opts.map((opt, i) => {
    const sel = i === pickedIdx;
    return `<button class="option-btn ${sel ? "selected" : ""}" style="padding:10px 12px;font-size:13.5px;margin-bottom:8px;" onclick="previewPick(${i})">
      <span class="option-dot" style="width:20px;height:20px;">${sel ? icon("check-circle-2", 13) : ""}</span>${opt}
    </button>`;
  }).join("");
  const el = document.getElementById("preview-options");
  if (el) el.innerHTML = html;
}
let previewPicked = null;
function previewPick(i) { previewPicked = i; renderPreviewOptions(previewPicked); if (window.lucide) lucide.createIcons(); }

function homePage() {
  const steps = [
    ["Register", "Create your account and get ready for your online examination."],
    ["Pick a subject", "Choose PHP, ADBMS, or Data Structures. Each has 20 MCQs and a 30-minute clock."],
    ["Take the exam", "Track your progress on the 20-box question palette as you answer, skip, and revisit."],
    ["Read the analysis", "Get a percentage, a difficulty breakdown, and a question-by-question review."],
  ];
  return `
  <div class="hero-wrap">
    ${bubblesHtml(14)}
    <div class="hero-inner">
      <div class="hero-copy">
        <span class="pill" style="margin-bottom:18px;display:inline-block;">Timed practice exams, done properly</span>
        <h1 class="display hero-title">Online Examination System</h1>
        <p class="hero-sub">Test your knowledge with PHP, ADBMS, and Data Structures exams. Each subject includes 20 MCQs, a 30-minute timer, instant results, and complete answer analysis.</p>
        <div class="flex gap-12" style="flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="go('register')">Create your account ${icon("arrow-right", 17)}</button>
          <button class="btn" onclick="go('login')">I already have one</button>
        </div>
      </div>
      <div class="hero-preview">${livePreviewHtml()}</div>
    </div>
  </div>

  <div class="section">
    <div class="container">
      <h2 class="display section-title reveal">Three subjects, one format</h2>
      <div class="grid-auto">
        ${Object.entries(SUBJECT_META).map(([key, meta]) => `
          <div class="card reveal">
            <div class="icon-tile">${icon(meta.icon, 22)}</div>
            <h3 class="display" style="font-size:19px;font-weight:700;margin-bottom:6px;">${meta.label}</h3>
            <p class="muted" style="font-size:13.5px;line-height:1.6;">${meta.blurb}</p>
            <p style="font-size:12px;color:var(--primary);font-weight:700;margin-top:12px;">20 MCQs · 30 minutes</p>
          </div>`).join("")}
      </div>
    </div>
  </div>

  <div class="section-soft">
    <div class="container">
      <h2 class="display section-title reveal">How the Examination Works</h2>
      <div class="steps-grid">
        ${steps.map((s, i) => `
          <div class="reveal">
            <div class="step-num">${i + 1}</div>
            <h4 class="display" style="font-size:17px;font-weight:700;margin-bottom:6px;">${s[0]}</h4>
            <p class="muted" style="font-size:13.5px;line-height:1.6;">${s[1]}</p>
          </div>`).join("")}
      </div>
    </div>
  </div>

  <div class="container" style="padding:60px 20px 80px;text-align:center;">
    <div class="reveal">
      <h2 class="display" style="font-size:26px;font-weight:700;margin-bottom:14px;">Ready to see where you stand?</h2>
      <p class="muted" style="margin-bottom:22px;">Registration takes under a minute. No card, no catch.</p>
      <button class="btn btn-primary" onclick="go('register')">Get started</button>
    </div>
  </div>`;
}

function aboutPage() {
  return `
  <div class="container-narrow anim-fade" style="padding:60px 20px;">
    <h1 class="display" style="font-size:34px;font-weight:700;margin-bottom:18px;">About Online Examination System</h1>
    <p class="muted" style="font-size:16px;line-height:1.8;margin-bottom:18px;">
      Online Examination System is a simple and user-friendly examination platform designed for students.
It provides exams in PHP, ADBMS, and Data Structures with 20 multiple-choice questions and a 30-minute timer.
      Each exam has 20 multiple-choice questions and a strict 30-minute timer, so practice feels close to the real thing.
    </p>
    <h2 class="display" style="font-size:20px;font-weight:700;margin:30px 0 12px;">How it works</h2>
    <ol class="muted" style="font-size:15px;line-height:2;padding-left:20px;">
      <li>Register for an account — this is required before you can log in.</li>
      <li>Log in and choose a subject from your dashboard.</li>
      <li>Answer questions using the palette to track answered, current, and skipped items.</li>
      <li>Submit when ready, or let the timer submit automatically at zero.</li>
      <li>Review your percentage, a quote for your score band, a difficulty breakdown, and every question with the correct answer marked.</li>
      <li>Revisit any attempt later from Past Exams.</li>
    </ol>
  </div>`;
}

function contactPage() {
  const team = [["Nisha", "FRONTEND DEVELOPER"], ["Manasvi", "BACKEND DEVELOPER"], ["Krupali", "DATABASE ADMINISTRATOR"]];
  return `
  <div class="container-narrow anim-fade" style="padding:60px 20px;">
    <h1 class="display" style="font-size:34px;font-weight:700;margin-bottom:10px;">Contact us</h1>
    <p class="muted" style="margin-bottom:30px;">The team behind Online Examination System.</p>
    <div class="grid-auto">
      ${team.map(([name, role]) => `
        <div class="team-card">
          <div class="team-avatar">${name[0]}</div>
          <h3 style="font-weight:700;font-size:16px;">${name}</h3>
          <p class="muted" style="font-size:13px;margin-bottom:10px;">${role}</p>
          <span class="flex" style="align-items:center;gap:6px;color:var(--primary);font-size:13px;font-weight:600;">
  ${icon("user-round", 14)} ${role}
</span>
        </div>`).join("")}
    </div>
  </div>`;
}

function authShell(title, subtitle, formHtml, footerHtml) {
  return `
  <div class="auth-shell">
    ${bubblesHtml(20)}
    <div class="auth-card">
      <div style="margin-bottom:22px;">${logoHtml(false)}</div>
      <h1 class="display" style="font-size:26px;font-weight:700;margin-bottom:6px;">${title}</h1>
      <p class="muted" style="font-size:14px;margin-bottom:24px;">${subtitle}</p>
      ${formHtml}
      <div id="auth-error" class="error-text"></div>
      <div style="margin-top:20px;text-align:center;font-size:13.5px;" class="muted">${footerHtml}</div>
    </div>
  </div>`;
}

function loginPage() {
  const form = `
    <form onsubmit="return handleLogin(event)">

      <label class="field">
        <span class="field-label">Email</span>
        <input id="login-email" type="email" required placeholder="you@example.com">
      </label>

      <label class="field">
        <span class="field-label">Password</span>

        <div style="position:relative;">
          <input
            id="login-password"
            type="password"
            required
            placeholder="••••••••"
            style="padding-right:50px;width:100%;"
          >

          <button
            type="button"
            onclick="togglePassword('login-password', this)"
            style="
              position:absolute;
              right:10px;
              top:50%;
              transform:translateY(-50%);
              border:none;
              background:transparent;
              cursor:pointer;
              padding:6px;
              color:var(--muted);
            "
            title="Show password"
          >
            ${icon("eye", 19)}
          </button>
        </div>

        <div style="text-align:right;margin-top:7px;">
          <a
            href="javascript:void(0)"
            onclick="forgotPassword()"
            style="color:var(--primary);font-size:13px;font-weight:700;"
          >
            Forgot Password?
          </a>
        </div>
      </label>

      <label class="field">
        <span class="field-label">Course</span>

        <select id="login-course" required>
          <option value="">Select your course</option>
          <option value="BCA">BCA</option>
          <option value="BBA">BBA</option>
          <option value="MBA">MBA</option>
          <option value="MCA">MCA</option>
          <option value="B.Sc IT">B.Sc IT</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <button type="submit" class="btn btn-primary btn-block">
        Log in
      </button>

    </form>`;

  return authShell(
    "Welcome back",
    "Log in to continue your practice.",
    form,
    `New here? <a style="color:var(--primary);font-weight:700;" onclick="go('register')">Create an account</a>`
  );
}

function registerPage() {
  const form = `
    <form onsubmit="return handleRegister(event)">

      <label class="field">
        <span class="field-label">Full name</span>
        <input
          id="reg-name"
          required
          placeholder="Jordan Patel"
        >
      </label>

      <label class="field">
        <span class="field-label">Email</span>
        <input
          id="reg-email"
          type="email"
          required
          placeholder="you@example.com"
        >
      </label>

      <label class="field">
        <span class="field-label">Password</span>

        <div style="position:relative;">
          <input
            id="reg-password"
            type="password"
            required
            placeholder="At least 4 characters"
            style="padding-right:50px;width:100%;"
          >

          <button
            type="button"
            onclick="togglePassword('reg-password', this)"
            style="
              position:absolute;
              right:10px;
              top:50%;
              transform:translateY(-50%);
              border:none;
              background:transparent;
              cursor:pointer;
              padding:6px;
              color:var(--muted);
            "
            title="Show password"
          >
            ${icon("eye", 19)}
          </button>
        </div>
      </label>

      <label class="field">
        <span class="field-label">Course</span>

        <select id="reg-course" required>
          <option value="">Select your course</option>
          <option value="BCA">BCA</option>
          <option value="BBA">BBA</option>
          <option value="MBA">MBA</option>
          <option value="MCA">MCA</option>
          <option value="B.Sc IT">B.Sc IT</option>
          <option value="Other">Other</option>
        </select>
      </label>

      <button type="submit" class="btn btn-primary btn-block">
        Register
      </button>

    </form>`;

  return authShell(
    "Create your account",
    "Registration is required before you can log in.",
    form,
    `Already registered? <a style="color:var(--primary);font-weight:700;" onclick="go('login')">Log in</a>`
  );
}

/* ---------------- app shell (post-login) ---------------- */
function sidebarHtml(mobile) {
  const items = [
    ["dashboard", "book-open", "Exams"],
    ["profile", "user", "Profile"],
    ["editProfile", "edit-3", "Edit Profile"],
    ["pastExams", "bar-chart-3", "Past Exams"],
    ["results", "award", "Results"],
    ["about", "info", "About"],
    ["contact", "phone", "Contact"],
  ];
  return `
  <div class="sidebar ${mobile ? "" : "sidebar-desktop"}">
    <div class="sidebar-header">
      ${logoHtml(true)}
      ${mobile ? `<button class="close-sidebar-btn" onclick="toggleMobileMenu(false)">${icon("x", 20)}</button>` : ""}
    </div>
    <div class="sidebar-nav">
      ${items.map(([key, ic, label]) => `<button class="sidebar-link ${state.page === key ? "active" : ""}" onclick="go('${key}')">${icon(ic, 17)} ${label}</button>`).join("")}
    </div>
    <div class="sidebar-footer">
      <button class="sidebar-logout" onclick="handleLogout()">${icon("log-out", 16)} Logout</button>
    </div>
  </div>`;
}

function topBarHtml() {
  const name = state.currentUser?.name?.split(" ")[0] || "there";
  const initial = (state.currentUser?.name || "U")[0].toUpperCase();
  return `
  <div class="topbar">
    <button class="hamburger-btn" onclick="toggleMobileMenu(true)">${icon("menu", 22)}</button>
    <span class="display muted" style="font-size:15px;font-weight:600;">Welcome, ${escapeHtml(name)}</span>
    <div class="flex" style="align-items:center;gap:12px;">
      <button class="icon-btn" onclick="toggleTheme()">${icon(state.isDark ? "sun" : "moon", 18)}</button>
      <div class="avatar">${initial}</div>
    </div>
  </div>`;
}

/* ---------------- dashboard ---------------- */
function dashboardPage() {
  return `
  <div class="dash-wrap anim-fade">
    <h1 class="display" style="font-size:26px;font-weight:700;margin-bottom:6px;">Choose an exam</h1>
    <p class="muted" style="margin-bottom:26px;">Every exam is 20 MCQs with a 30-minute timer.</p>
    <div class="grid-auto">
      ${Object.entries(SUBJECT_META).map(([key, meta]) => `
        <div class="subject-card">
          <div class="icon-tile">${icon(meta.icon, 23)}</div>
          <h3 class="display" style="font-size:20px;font-weight:700;margin-bottom:6px;">${meta.label}</h3>
          <p class="muted" style="font-size:13.5px;line-height:1.6;margin-bottom:18px;flex:1;">${meta.blurb}</p>
          <div class="tag-row"><span>20 MCQs</span><span>30 minutes</span></div>
          <button class="btn btn-primary btn-block" onclick="startExam('${key}')">Start exam ${icon("chevron-right", 16)}</button>
        </div>`).join("")}
    </div>
  </div>`;
}

/* ---------------- exam page ---------------- */
function examPage() {
  const exam = state.examSet;
  const q = exam[state.currentIndex];
  const warn = state.timeLeft <= 60;

  const optionsHtml = q.options.map((opt, i) => {
    const picked = state.answers[state.currentIndex] === i;
    return `<button class="option-btn ${picked ? "selected" : ""}" onclick="pickOption(${i})">
      <span class="option-dot">${picked ? icon("check-circle-2", 14) : ""}</span>${escapeHtml(opt)}
    </button>`;
  }).join("");

  const paletteHtml = exam.map((_, i) => {
    let bg = "var(--skip)";
    if (i === state.currentIndex) bg = "var(--primary)";
    else if (state.answers[i] !== null) bg = "var(--success)";
    return `<button class="palette-btn" style="background:${bg}" onclick="goToQuestion(${i})">${i + 1}</button>`;
  }).join("");

  const isLast = state.currentIndex === exam.length - 1;

  return `
  <div class="exam-wrap">
    <div class="exam-top">
      <span class="pill">${SUBJECT_META[state.examSubject].label} · Question ${state.currentIndex + 1} / ${exam.length}</span>
      <div id="exam-timer-badge" class="timer-badge ${warn ? "warn" : ""}">${icon("timer", 17)} <span id="exam-timer-text">${fmtClock(state.timeLeft)}</span></div>
    </div>
    <div id="exam-warning-banner" class="warning-banner" style="display:${warn ? "block" : "none"}">
      ⚠️ Less than a minute left — your exam will auto-submit at 00:00.
    </div>
    <div class="exam-body">
      <div class="exam-question-card">
        <span class="difficulty-tag">${q.difficulty}</span>
        <h2 class="display question-text">${escapeHtml(q.question)}</h2>
        <div>${optionsHtml}</div>
        <div class="exam-nav-row">
          <button class="btn" onclick="prevQuestion()" ${state.currentIndex === 0 ? "disabled" : ""}>Previous</button>
          <div class="exam-nav-right">
            <button class="btn" style="color:var(--text-muted)" onclick="skipQuestion()">Skip</button>
            ${isLast
              ? `<button class="btn btn-success" onclick="finishExam()">Submit exam</button>`
              : `<button class="btn btn-primary" onclick="nextQuestion()">Next</button>`}
          </div>
        </div>
      </div>
      <div class="palette-card">
        <h4 style="font-size:13px;font-weight:700;margin-bottom:12px;">Question palette</h4>
        <div class="palette-grid">${paletteHtml}</div>
        <div class="palette-legend">
          <span><span class="legend-dot" style="background:var(--success)"></span>Answered</span>
          <span><span class="legend-dot" style="background:var(--primary)"></span>Current</span>
          <span><span class="legend-dot" style="background:var(--skip)"></span>Skipped</span>
        </div>
        <button class="btn btn-danger-soft btn-block" style="margin-top:18px;" onclick="finishExam()">End &amp; submit now</button>
      </div>
    </div>
  </div>`;
}

/* renderExamOnly re-renders just the exam content area, keeping the timer interval alive */
function renderExamOnly() {
  const appEl = document.getElementById("app");
  appEl.innerHTML = shellWrap(examPage(), true);
  if (window.lucide) lucide.createIcons();
}

/* ---------------- result page ---------------- */
function scoreRingSvg(percentage) {
  const r = 80, c = 2 * Math.PI * r;
  const offset = c - (percentage / 100) * c;
  const color = percentage >= 60 ? "var(--success)" : percentage >= 40 ? "var(--accent)" : "var(--danger)";
  return `
  <svg width="190" height="190" viewBox="0 0 190 190">
    <circle cx="95" cy="95" r="${r}" fill="none" stroke="var(--bg-soft)" stroke-width="16"/>
    <circle cx="95" cy="95" r="${r}" fill="none" stroke="${color}" stroke-width="16" stroke-linecap="round"
      stroke-dasharray="${c}" stroke-dashoffset="${offset}" transform="rotate(-90 95 95)"
      style="transition: stroke-dashoffset 1.1s cubic-bezier(.3,.9,.4,1)"/>
    <text x="95" y="90" text-anchor="middle" font-size="34" font-weight="800" fill="var(--text)" font-family="Fraunces, serif">${percentage}%</text>
    <text x="95" y="112" text-anchor="middle" font-size="12" fill="var(--text-muted)">score</text>
  </svg>`;
}

function difficultyBarHtml(label, stat) {
  const pct = stat.total ? Math.round((stat.correct / stat.total) * 100) : 0;
  return `
  <div class="diff-row">
    <div class="diff-label-row"><span>${label}</span><span>${stat.correct}/${stat.total} correct</span></div>
    <div class="diff-bar-track"><div class="diff-bar-fill" style="width:${pct}%"></div></div>
  </div>`;
}

function resultPageHtml(result, standalone) {
  if (!result) {
    return `<div class="empty-state">${icon("help-circle", 40)}<p class="muted">No result to show yet — take an exam first.</p></div>`;
  }
  const reviewHtml = result.questionDetails.map((q, i) => {
    const isCorrect = q.status === "correct";
    const isSkipped = q.status === "skipped";
    const cls = isSkipped ? "" : isCorrect ? "correct" : "incorrect";
    const statusHtml = isSkipped
      ? `<span class="status-skipped">${icon("circle", 13)} Skipped</span>`
      : isCorrect
        ? `<span class="status-correct">${icon("check-circle", 13)} Correct</span>`
        : `<span class="status-incorrect">${icon("x-circle", 13)} Incorrect</span>`;
    const optionsHtml = q.options.map((opt, oi) => {
      let optClass = "";
      let note = "";
      if (oi === q.correct) { optClass = "correct-answer"; note = `<span class="review-option-note">✓ correct answer</span>`; }
      else if (oi === q.chosen && !isCorrect) { optClass = "wrong-choice"; note = `<span class="review-option-note">✗ your answer</span>`; }
      return `<div class="review-option ${optClass}">${escapeHtml(opt)}${note}</div>`;
    }).join("");
    return `
    <div class="review-item ${cls}">
      <div class="review-item-top"><span class="muted">Q${i + 1} · ${q.difficulty}</span>${statusHtml}</div>
      <p class="review-q-text">${escapeHtml(q.question)}</p>
      <div>${optionsHtml}</div>
    </div>`;
  }).join("");

  return `
  <div class="result-wrap anim-fade">
    ${standalone ? `<button class="btn" style="border:none;color:var(--primary);margin-bottom:16px;" onclick="go('pastExams')">← Back to past exams</button>` : ""}
    <div class="result-header">
      ${scoreRingSvg(result.percentage)}
      <div style="flex:1 1 280px;">
        <span class="pill">${SUBJECT_META[result.subject].label}</span>
        <p class="display result-quote">${result.quoteOverride || getQuote(result.percentage)}</p>
        <p class="muted" style="font-size:13px;">${result.dateStr} at ${result.timeStr} · Duration used ${result.durationUsedStr} of ${result.totalDurationStr}</p>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stat-card"><p class="display stat-val">${result.attempted}</p><p class="stat-label">Attempted</p></div>
      <div class="stat-card"><p class="display stat-val" style="color:var(--success)">${result.correct}</p><p class="stat-label">Correct</p></div>
      <div class="stat-card"><p class="display stat-val" style="color:var(--danger)">${result.incorrect}</p><p class="stat-label">Incorrect</p></div>
      <div class="stat-card"><p class="display stat-val" style="color:var(--text-muted)">${result.skipped}</p><p class="stat-label">Skipped</p></div>
      <div class="stat-card"><p class="display stat-val" style="color:var(--primary)">${result.avgTime}s</p><p class="stat-label">Avg time/Q</p></div>
    </div>
    <div class="card" style="margin-bottom:22px;">
      <h3 class="display" style="font-size:17px;font-weight:700;margin-bottom:16px;">Paper analysis</h3>
      ${difficultyBarHtml("Easy", result.diffStats.Easy)}
      ${difficultyBarHtml("Medium", result.diffStats.Medium)}
      ${difficultyBarHtml("Hard", result.diffStats.Hard)}
    </div>
    <div class="card">
      <h3 class="display" style="font-size:17px;font-weight:700;margin-bottom:18px;">Question-by-question review</h3>
      ${reviewHtml}
    </div>
  </div>`;
}

/* ---------------- past exams ---------------- */
function pastExamsPage() {
  if (state.pastResults.length === 0) {
    return `<div class="empty-state">${icon("bar-chart-3", 40)}<p class="muted">No exams taken yet. Head to Exams to take your first one.</p></div>`;
  }
  const cards = [...state.pastResults].reverse().map((r) => `
    <button class="past-card" onclick="openPastResult('${r.id}')">
      <div class="past-card-top">
        <span class="pill">${SUBJECT_META[r.subject].label}</span>
        <span class="display past-score" style="color:${r.percentage >= 60 ? "var(--success)" : r.percentage >= 40 ? "var(--accent)" : "var(--danger)"}">${r.percentage}%</span>
      </div>
      <p class="muted" style="font-size:13px;margin-bottom:4px;">${r.dateStr} · ${r.timeStr}</p>
      <p class="muted" style="font-size:12.5px;">${r.correct} correct · ${r.incorrect} incorrect · ${r.skipped} skipped</p>
    </button>`).join("");
  return `
  <div class="dash-wrap anim-fade">
    <h1 class="display" style="font-size:24px;font-weight:700;margin-bottom:20px;">Past exams</h1>
    <div class="past-grid">${cards}</div>
  </div>`;
}

/* ---------------- profile ---------------- */
function profilePage() {
  const results = state.pastResults;
  const avg = results.length ? Math.round(results.reduce((a, r) => a + r.percentage, 0) / results.length) : 0;
  const best = results.length ? Math.max(...results.map((r) => r.percentage)) : null;
  return `
  <div class="dash-wrap anim-fade" style="max-width:700px;">
    <div class="profile-header">
      <div class="avatar avatar-lg">${(state.currentUser?.name || "U")[0].toUpperCase()}</div>
      <div>
        <h1 class="display" style="font-size:22px;font-weight:700;">${escapeHtml(state.currentUser?.name || "")}</h1>
        <p class="muted" style="font-size:13.5px;">${escapeHtml(state.currentUser?.email || "")}</p>
      </div>
    </div>
    <div class="stats-grid">
      <div class="stat-card"><p class="display stat-val" style="color:var(--primary)">${results.length}</p><p class="stat-label">Exams taken</p></div>
      <div class="stat-card"><p class="display stat-val" style="color:var(--primary)">${avg}%</p><p class="stat-label">Average score</p></div>
      <div class="stat-card"><p class="display stat-val" style="color:var(--primary)">${best !== null ? best + "%" : "—"}</p><p class="stat-label">Best score</p></div>
    </div>
  </div>`;
}

function editProfilePage() {
  return `
  <div class="dash-wrap anim-fade" style="max-width:500px;">
    <h1 class="display" style="font-size:22px;font-weight:700;margin-bottom:18px;">Edit profile</h1>
    <form class="card" onsubmit="return saveProfile(event)">
      <label class="field"><span class="field-label">Full name</span><input id="edit-name" required value="${escapeHtml(state.currentUser?.name || "")}"></label>
      <label class="field"><span class="field-label">Email</span><input id="edit-email" type="email" required value="${escapeHtml(state.currentUser?.email || "")}"></label>
      <button type="submit" class="btn btn-primary">Save changes</button>
      ${state.profileSaved ? `<span class="saved-badge">Saved ✓</span>` : ""}
    </form>
  </div>`;
}

/* ---------------- app shell wrapper ---------------- */
/* ---------------- footer ---------------- */
function footerHtml() {
  return `
    <footer class="site-footer">
      <div class="footer-content">

        <div class="footer-brand">
          <div class="footer-logo">
            <div class="logo-mark">${icon("clipboard-check", 18)}</div>
            <span>Exam</span>
          </div>
          <p>Online Examination System</p>
          <p class="footer-small">
            Simple, smart and student-friendly online examinations.
          </p>
        </div>

        <div class="footer-links">
          <h3>Quick Links</h3>

          <button onclick="go('home')">
            ${icon("home", 15)} Home
          </button>

          <button onclick="go('login')">
            ${icon("log-in", 15)} Login
          </button>

          <button onclick="go('register')">
            ${icon("user-plus", 15)} Register
          </button>
        </div>

        <div class="footer-team">
          <h3>Our Team</h3>
          <p>Nisha — Frontend Developer</p>
          <p>Manasvi — Backend Developer</p>
          <p>Krupali — Question Bank & QA</p>
        </div>

      </div>

      <div class="footer-bottom">
        <p>© 2026 Online Examination System. All Rights Reserved.</p>
      </div>
    </footer>
  `;
}
function shellWrap(innerHtml, isExam) {
  const content = isExam
    ? innerHtml
    : `${topBarHtml()}${innerHtml}`;
  return `
  <div class="app-shell">
    ${sidebarHtml(false)}
    <div style="flex:1;min-width:0;">${content}</div>
  </div>
  ${state.mobileOpen ? `<div class="mobile-overlay">${sidebarHtml(true)}<div class="backdrop" onclick="toggleMobileMenu(false)"></div></div>` : ""}`;
}

/* ---------------- master render ---------------- */
function render() {
  const appEl = document.getElementById("app");

  document.documentElement.setAttribute(
    "data-theme",
    state.isDark ? "dark" : "light"
  );

  let html;

  if (!state.currentUser) {

    if (state.page === "login") {
      html = loginPage();
    }

    else if (state.page === "register") {
      html = registerPage();
    }

    else if (state.page === "about") {
      html = marketingNav() + aboutPage() + footerHtml();
    }

    else if (state.page === "contact") {
      html = marketingNav() + contactPage() + footerHtml();
    }

    else {
      state.page = "home";
      html = marketingNav() + homePage() + footerHtml();
    }

    appEl.innerHTML = html;

  } else {

    let inner;

    if (state.page === "exam" && state.examSet) {
      inner = examPage();
    }

    else if (state.page === "resultLatest") {
      inner = resultPageHtml(state.latestResult, false);
    }

    else if (state.page === "resultDetail") {
      inner = resultPageHtml(state.viewedResult, true);
    }

    else if (state.page === "results") {
      inner = resultPageHtml(
        state.latestResult ||
        state.pastResults[state.pastResults.length - 1],
        false
      );
    }

    else if (state.page === "pastExams") {
      inner = pastExamsPage();
    }

    else if (state.page === "profile") {
      inner = profilePage();
    }

    else if (state.page === "editProfile") {
      inner = editProfilePage();
    }

    else if (state.page === "about") {
      inner = aboutPage();
    }

    else if (state.page === "contact") {
      inner = contactPage();
    }

    else {
      state.page = "dashboard";
      inner = dashboardPage();
    }

    appEl.innerHTML = shellWrap(
      inner,
      state.page === "exam"
    );
  }

  if (state.page === "home" && !state.currentUser) {
    renderPreviewOptions(previewPicked);
  }

  if (window.lucide) {
    lucide.createIcons();
  }

  setupScrollReveal();
}

/* ---------------- scroll reveal ---------------- */
function setupScrollReveal() {
  const els = document.querySelectorAll(".reveal:not(.visible)");
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach((el) => obs.observe(el));
}

/* ---------------- boot ---------------- */
document.addEventListener("DOMContentLoaded", () => {
  render();
});
function handleLogout() {
  const confirmLogout = confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) {
    return;
  }

  state.currentUser = null;
  state.examStarted = false;

  if (typeof timerInterval !== "undefined" && timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }

  state.mobileOpen = false;

  go("home");
}
