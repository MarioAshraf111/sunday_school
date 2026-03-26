// ================== الصوت عند الضغط ==================
function playSound() {
  const audio = document.getElementById("clickSound");
  if(audio) {
    audio.currentTime = 0;
    audio.play();
  }
}

// ================== وسائل الإيضاح ==================
const illustrations = ["اسكتش","صور Ai","اشغال يدوية","صور Ai"];

// ================== الدروس (مرة واحدة فقط) ==================
const lessons = [
  { date: "2026-04-3", lesson: "بانوراما اسبوع الالام", source: "-" },
  { date: "2026-04-10", lesson: "اجازة الجمعة العظيمة", source: "-" },
  { date: "2026-04-17", lesson: "افراح القيامة", source: "https://st-takla.org/books/pope-sheounda-iii/resurrection/happiness.html" },
  { date: "2026-04-24", lesson: "سر الميرون", source: "https://st-takla.org/Coptic-Faith-Creed-Dogma/Coptic-Rite-n-Ritual-Taks-Al-Kanisa/05-The-Seven-Holy-Sacraments__Bishop-Benjamin/Coptic-7-Sacraments_010-Serr-El-Mairoun-Mayroon-Oil.html" }
];

// ================== الخدام لكل فصل ==================
const data = {
  kg1: [" عامة"," -","ام كاراس ياسر","رانيا تواب"],
  kg2: ["عامة","-","رانيا يوسف "," ماريان مجدي"],
  p1: ["عامة ","-","كارولين بنيامين","مورا القس امونيوس"],
  p2: [" عامة","-","نعمات ظريف","رودي صفوت"],
  p3b: ["عامة","-","عادل جاد","باسم خلف"],
  p3g: ["عامة ","-","ماريان تواب "," ايريني مجدي"],
  p4b: ["عامة","-","كيرلس ماهر","يوسف جاد"],
  p4g: ["عامة"," - ","مورين بطرس","فيبي عادل"],
  p5b: ["عامة","-","فادي سامي","توماس سمير"],
  p5g: ["عامة"," - ","ام شنودة","ام افرايم"]
};

// ================== خلط مصفوفة ==================
function shuffleArray(array) {
  return array.sort(() => 0.5 - Math.random());
}

// ================== توزيع وسائل الإيضاح لكل شهر ==================
function assignIllustrations() {
  const monthKey = `illustrations_month_${new Date().getFullYear()}_${new Date().getMonth()+1}`;
  let stored = localStorage.getItem(monthKey);
  if(stored) return JSON.parse(stored);

  const allClasses = Object.keys(data);
  const assigned = {};
  const shuffled = shuffleArray([...illustrations]);

  allClasses.forEach((className, index) => {
    assigned[className] = [];
    lessons.forEach((lesson, lIndex) => {
      const illustration = shuffled[(index + lIndex) % shuffled.length];
      assigned[className].push(illustration);
    });
  });

  localStorage.setItem(monthKey, JSON.stringify(assigned));
  return assigned;
}

// ================== عرض فصل معين (Accordion) ==================
function showClass(className) {
  playSound();

  const content = document.getElementById(`${className}-content`);
  if(!content) return;

  // Toggle visibility
  content.style.display = content.style.display === "block" ? "none" : "block";

  const table = content.querySelector("tbody");
  table.innerHTML = "";

  const servants = data[className];
  const assignedIllustrations = assignIllustrations()[className];

  lessons.forEach((lessonObj, index) => {
    const servant = servants[index % servants.length];
    const illustration = assignedIllustrations[index % assignedIllustrations.length];

    table.innerHTML += `
      <tr>
        <td>${lessonObj.date}</td>
        <td>${servant}</td>
        <td>${lessonObj.lesson}</td>
        <td><a href="${lessonObj.source}" target="_blank">فتح</a></td>
        <td>${illustration}</td>
      </tr>
    `;
  });
}

// ================== درس الجمعة الحالي ==================
function showFridayLessons() {
  playSound();
  const today = new Date().toISOString().split("T")[0];
  Object.keys(data).forEach(className => {
    const assignedIllustrations = assignIllustrations()[className];
    const servants = data[className];
    const table = document.getElementById(`${className}-content`).querySelector("tbody");
    table.innerHTML = "";

    lessons.forEach((lessonObj, index) => {
      if(lessonObj.date === today) {
        const servant = servants[index % servants.length];
        const illustration = assignedIllustrations[index % assignedIllustrations.length];

        table.innerHTML += `
          <tr>
            <td>${lessonObj.date}</td>
            <td>${servant}</td>
            <td>${lessonObj.lesson}</td>
            <td><a href="${lessonObj.source}" target="_blank">فتح</a></td>
            <td>${illustration}</td>
          </tr>
        `;
        document.getElementById(`${className}-content`).style.display = "block";
      }
    });
  });
}

/* ================== البحث باسم الخادم (محجوب مؤقتًا) ==================
function searchServant(name) {
  // مؤقتًا
}

*/
