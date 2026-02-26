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
  { date: "2026-03-6", lesson: "الابن الشاطر", source: "https://madraset-elshamamsa.com/articles/Cartoon/ElEbnElDal.php" },
  { date: "2026-03-13", lesson: "السامرية", source: "https://st-takla.org/books/fr-athnasius-fahmy/lent/sunday4.html" },
  { date: "2026-03-20", lesson: "المخلع", source: "https://st-takla.org/books/fr-athnasius-fahmy/lent/sunday5.html" },
  { date: "2026-03-27", lesson: "المولود الأعمي", source: "https://st-takla.org/books/fr-athnasius-fahmy/lent/sunday6.html" }
];

// ================== الخدام لكل فصل ==================
const data = {
  kg1: ["مريم عاطف"," ايريني عيد","ام جورج","أميرة فهيم"],
  kg2: ["ناردين بنيامين","نانسي عيسي","مارينا جرجس","ميرنا ناجح"],
  p1: ["مورا القس امونيوس ","دميانة مجدي","نورا مجدي","مريم هلال"],
  p2: ["نعمات ظريف","رودي صفوت","نورا هاني","حنان عاطف"],
  p3b: [" عادل جاد","باسم خلف","عماد يوسف","عادل جاد"],
  p3g: ["ايريني مجدي","مادونا رضا","بسمة عاطف","مريم فايز"],
  p4b: ["كيرلس ماهر","يوسف جاد","ابراهيم اسحق","مينا منتصر"],
  p4g: ["فيبي عادل","امل ظريف ","ام مكاريوس","انجي سمير"],
  p5b: ["ماريو أشرف","توماس سمير","فادي سامي","كرياكوس سعد"],
  p5g: ["مهرائيل خلف","هيلانة ","مادونا ناجح","نورهان فايز"]
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
