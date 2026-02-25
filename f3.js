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
  { date: "2026-03-13", lesson: "السامرية", source: "https://www.jw.org/ar/%D8%A7%D9%84%D9%85%D9%83%D8%AA%D8%A8%D8%A9/%D8%A7%D9%84%D9%83%D8%AA%D8%A8/%D8%AF%D8%B1%D9%88%D8%B3-%D9%82%D8%B5%D8%B5-%D8%A7%D9%84%D9%83%D8%AA%D8%A7%D8%A8-%D8%A7%D9%84%D9%85%D9%82%D8%AF%D8%B3-%D9%84%D9%84%D8%A3%D9%88%D9%84%D8%A7%D8%AF/%D9%A1%D9%A2/%D9%8A%D8%B3%D9%88%D8%B9-%D9%88%D8%A7%D9%84%D9%85%D8%B1%D8%A3%D8%A9-%D8%A7%D9%84%D8%B3%D8%A7%D9%85%D8%B1%D9%8A%D8%A9/" },
  { date: "2026-03-20", lesson: "المخلع", source: "https://st-takla.org/books/fr-athnasius-fahmy/lent/sunday5.html" },
  { date: "2026-03-27", lesson: "المولود الأعمي", source: "https://st-takla.org/books/fr-athnasius-fahmy/lent/sunday6.html" }
];

// ================== الخدام لكل فصل ==================
const data = {
  kg1: ["مريم عاطف","رودي صفوت","ام جورج","أميرة فهيم"],
  kg2: ["ناردين بنيامين","نانسي عيسي","مارينا جرجس","ميرنا ناجح"],
  p1: ["مورا القس امونيوس ","دميانة مجدي","نورا مجدي","مريم هلال"],
  p2: ["نعمات ظريف","هيلانة","نورا هاني","حنان عاطف"],
  p3b: [" عادل جاد","باسم خلف","عماد يوسف","عادل جاد"],
  p3g: ["ايريني مجدي","مادونا رضا","بسمة عاطف","مريم فايز"],
  p4b: ["كيرلس ماهر","يوسف جاد","ابراهيم اسحق","مينا منتصر"],
  p4g: ["فيبي عادل","ايريني عيد","ام مكاريوس","انجي سمير"],
  p5b: ["ماريو أشرف","توماس سمير","فادي سامي","كرياكوس سعد"],
  p5g: ["مهرائيل خلف","امل ظريف","مادونا ناجح","نورهان فايز"]
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