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
  { date: "2026-05-1", lesson: "  استشهاد مارجرجس", source: "https://st-takla.org/Saints/Saint-George_.html" },
  { date: "2026-05-8", lesson: "تاريخ دخول المسيحية مصر(استشهاد مارمرقس) ", source: "https://st-takla.org/books/helmy-elkommos/biblical-criticism/new-testament/479.html" },
  { date: "2026-05-15", lesson: "مجمع نيقية (نياحة البابا اثناسيوس الرسولي) ", source: "https://st-takla.org/Coptic-History/CopticHistory_02-History-of-the-Coptic-Church-Councils-n-Christian-Heresies/Encyclopedia-Coptica-History__005-Magma3-Nekia-325.html" },
  { date: "2026-05-22", lesson: " عيد الصعود", source: "https://st-takla.org/Coptic-Faith-Creed-Dogma/Coptic-Rite-n-Ritual-Taks-Al-Kanisa/07-Jesus-Mastery-Feast__Anba-Benyameen/Rites-of-Coptic-Small-n-Big-Mastery-Feasts_045-Eid-Ascension-Feast.html" },
  { date: "2026-05-29", lesson: "  عيد حلول الروح القدس ", source: "https://st-takla.org/Coptic-Faith-Creed-Dogma/Coptic-Rite-n-Ritual-Taks-Al-Kanisa/07-Jesus-Mastery-Feast__Anba-Benyameen/Rites-of-Coptic-Small-n-Big-Mastery-Feasts_046-Eid-Penticost.html" },

];

// ================== الخدام لكل فصل ==================
const data = {
  kg1: ["أم جورج","ام كاراس ياسر","أميرة فهيم","مريم عاطف"," ايريني عيد"],
  kg2: ["ناردين بنيامين","رانيا يوسف","نانسي عيسي","ميرنا اشرف  ","ميرنا ناجح"],
  p1: ["كارولين بنيامين ","نورا مجدي","مريم هلال","دميانة مجدي","مورا القس امونيوس"],
  p2: ["نورا هاني","نعمات ظريف","حنان عاطف","رودي صفوت","نورا هاني"],
  p3b: ["عادل جاد","باسم خلف","عماد يوسف "," عادل جاد","باسم خلف"],
  p3g: [" مادونا رضا","بسمة عاطف","ماريان تواب","مريم فايز","ايريني مجدي"],
  p4b: ["كيرلس ماهر","يوسف جاد","ابراهيم اسحق"," مينا منتصر","كيرلس ماهر"],
  p4g: ["مورين بطرس","انجي سمير ","ام مكاريوس ","فيبي عادل","امل ظريف"],
  p5b: ["ماريو أشرف","توماس سمير","فادي سامي","كرياكوس سعد","توماس سمير"],
  p5g: ["ام شنودة","هيلانة","مهرائيل خلف","مادونا ناجح","نورهان فايز"]
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
