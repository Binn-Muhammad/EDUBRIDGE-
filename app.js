
const $ = (s, ctx=document) => ctx.querySelector(s);
const $$ = (s, ctx=document) => [...ctx.querySelectorAll(s)];

const pillarContent = {
  learning: {label:"Pillar 01", title:"Foundational Learning", text:"Teachers use simple learner checks and short support sessions to strengthen core literacy and numeracy before gaps become bigger."},
  teachers: {label:"Pillar 02", title:"Teacher Micro-Training", text:"Short, practical modules help teachers use learner-centred support, low-resource activities and simple progress checks without adding heavy training demands."},
  packs: {label:"Pillar 03", title:"Learning Access Packs", text:"Curriculum-aligned printable and downloadable activities move between school and home and remain usable when internet access is weak."},
  community: {label:"Pillar 04", title:"Parent & Community Network", text:"Simple communication and follow-up structures help families understand what learners should do outside class and how to report barriers."},
  continuity: {label:"Pillar 05", title:"Learning Continuity", text:"When normal attendance is disrupted, the same familiar system shifts into an offline workflow for materials, teacher follow-up and return-to-learning support."}
};

const coreReadinessItems = [
  "A simple learning-continuity plan exists and is understood by school leadership.",
  "Teacher follow-up roles are assigned for periods when normal attendance is interrupted.",
  "Printable or downloadable learning materials can be prepared before or during a disruption.",
  "Parents/guardians have an approved communication channel for learning updates.",
  "The school can identify learners with limited device, internet or printing access.",
  "There is a way to track learning-pack distribution, participation and learner follow-up."
];

const stateReadinessProfiles = {
  "Oyo": {
    label: "Oyo State context",
    items: [
      "The school has a practical learning-continuity arrangement for temporary access problems such as heavy rainfall, flooding or local transport disruption.",
      "The school has identified how printed learning materials can reach learners across the selected LGA when internet access is unreliable.",
      "Parent/guardian contact records are current enough to support learner follow-up within the selected LGA.",
      "The school has an approved collection/distribution option for learning materials if normal attendance is temporarily interrupted."
    ]
  },
  "Lagos": {
    label: "Lagos State context",
    items: [
      "The school has an alternative learning arrangement for temporary access problems linked to flooding, transport disruption or local closure.",
      "The school can reach learners who may be separated from school by travel or connectivity barriers.",
      "The school has a low-data communication option for families who cannot rely on continuous internet.",
      "Learning materials can be distributed without requiring every learner to own a personal device."
    ]
  },
  "Bayelsa": {
    label: "Bayelsa State context",
    items: [
      "The school has a learning-continuity option when flooding or difficult physical access interrupts attendance.",
      "Printed/offline materials can reach learners through an approved local distribution method.",
      "The school keeps a contact method for families in communities that may become harder to reach.",
      "Teachers know how to continue short learning cycles when normal classroom attendance is not possible."
    ]
  },
  "Borno": {
    label: "Borno State context",
    items: [
      "The school has an education-continuity arrangement for temporary closure, displacement or access restriction.",
      "Learner records and essential offline materials can be kept available if normal school access is interrupted.",
      "Teachers have an approved method to maintain learning contact with reachable families.",
      "The school can restart learning with a re-entry assessment when learners return."
    ]
  },
  "Adamawa": {
    label: "Adamawa State context",
    items: [
      "The school has an education-continuity arrangement for temporary closure, displacement, flooding or access restriction.",
      "The school can provide low-tech learning support to learners who cannot remain in normal classes.",
      "Teachers have an approved method to maintain learning contact with reachable families.",
      "The school can conduct a re-entry learning check when normal attendance resumes."
    ]
  },
  "Yobe": {
    label: "Yobe State context",
    items: [
      "The school has an education-continuity arrangement for temporary closure, displacement or access restriction.",
      "Offline learning materials can be prepared for learners who may lose normal classroom access.",
      "Teachers have an approved learner follow-up method during disruption.",
      "The school can reassess learning and organise catch-up support after learners return."
    ]
  },
  "Kaduna": {
    label: "Kaduna State context",
    items: [
      "The school has a learning-continuity arrangement for temporary closure, displacement or local access restriction.",
      "The school can identify learners who may need printed/offline support if attendance is interrupted.",
      "Teachers have an approved family contact and follow-up structure.",
      "A return-to-learning assessment can be conducted before normal curriculum pacing resumes."
    ]
  },
  "Katsina": {
    label: "Katsina State context",
    items: [
      "The school has a learning-continuity arrangement for temporary closure, displacement or local access restriction.",
      "Low-tech learning materials can reach learners who lose normal classroom access.",
      "Teachers have an approved method for tracking learners reached during disruption.",
      "The school can conduct a re-entry learning check and organise targeted catch-up."
    ]
  },
  "Zamfara": {
    label: "Zamfara State context",
    items: [
      "The school has a learning-continuity arrangement for temporary closure, displacement or local access restriction.",
      "Offline materials can be prepared and distributed through an approved method.",
      "The school can track which learners have been reached and who still needs support.",
      "Teachers can reassess learning and organise catch-up when normal attendance returns."
    ]
  },
  "Niger": {
    label: "Niger State context",
    items: [
      "The school has a continuity arrangement for temporary closure, flooding, displacement or local access disruption.",
      "The school can distribute printed/offline learning materials across the selected LGA.",
      "Teachers can maintain an approved follow-up record for learners who are temporarily out of class.",
      "A re-entry assessment and catch-up process is ready for learners returning after disruption."
    ]
  }
};

function getCurrentProfile(){
  try { return JSON.parse(localStorage.getItem("edubridgeProfile") || "{}"); }
  catch(e){ return {}; }
}

function getContextReadinessItems(){
  const profile = getCurrentProfile();
  const state = profile.state || document.getElementById("state")?.value || "";
  const lga = profile.lga || document.getElementById("lga")?.value || "";
  const specific = stateReadinessProfiles[state];

  if (specific) {
    return {
      label: specific.label,
      items: specific.items.map(item => item.replaceAll("the selected LGA", lga ? `${lga} LGA` : "the selected LGA"))
    };
  }

  const place = [lga ? `${lga} LGA` : "", state].filter(Boolean).join(", ") || "the school's local area";
  return {
    label: state ? `${state} State context` : "Local context",
    items: [
      `The school has identified the most realistic causes of temporary learning disruption in ${place} and has a learning-continuity response for them.`,
      `The school knows how printed or offline learning materials can reach learners across ${place} when normal attendance is interrupted.`,
      `Parent/guardian contact records are current enough to support learner follow-up in ${place}.`,
      `The school has an approved return-to-learning process that includes a short learning-gap check after disruption.`
    ]
  };
}

function getReadinessItems(){
  const context = getContextReadinessItems();
  return [...coreReadinessItems, ...context.items];
}

const continuityItems = [
  "Confirm the temporary learning arrangement with school leadership.",
  "Prepare or retrieve offline learning packs.",
  "Activate the approved parent/guardian communication structure.",
  "Assign teacher follow-up groups.",
  "Track learners reached and learners needing extra support.",
  "Prepare the return-to-learning check."
];

function downloadFile(name, content){
  const blob = new Blob([content], {type:"text/plain;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
  const count = Number(localStorage.getItem("edubridgeDownloads") || 0) + 1;
  localStorage.setItem("edubridgeDownloads", count);
  updateDashboard();
}

function buildChecklists(){
  const readinessItems = getReadinessItems();
  const context = getContextReadinessItems();
  const checklist = $("#readinessChecklist");
  if (checklist) {
    checklist.innerHTML = readinessItems.map((item,i)=>`
      <label class="check-item"><input type="checkbox" data-readiness="${i}"><span>${item}</span></label>
    `).join("");
  }
  const chip = $("#readinessCountChip");
  if (chip) chip.textContent = `${readinessItems.length} items`;
  const contextText = $("#readinessContextText");
  if (contextText) {
    const p = getCurrentProfile();
    const place = [p.lga ? `${p.lga} LGA` : "", p.state || ""].filter(Boolean).join(", ");
    contextText.textContent = place
      ? `Checklist adapted for ${place}. Core questions remain universal; local-context questions change with the saved school profile.`
      : "Save the school profile first. The checklist will adapt to the selected State and LGA.";
  }
  const banner = $("#stateContextBanner");
  if (banner) banner.querySelector("strong").textContent = context.label;

  if ($("#continuityChecklist")) {
    $("#continuityChecklist").innerHTML = continuityItems.map(item=>`
      <label class="check-item"><input type="checkbox"><span>${item}</span></label>
    `).join("");
  }
}

function initScrolling(){
  $$("[data-scroll]").forEach(link=>{
    link.addEventListener("click", e=>{
      const id = link.getAttribute("href");
      if(!id || !id.startsWith("#")) return;
      e.preventDefault();
      $(id)?.scrollIntoView({behavior:"smooth", block:"start"});
      $("#mainNav")?.classList.remove("open");
      $("#menuToggle")?.setAttribute("aria-expanded","false");
    });
  });

  const sections = $$(".section[id]");
  const navLinks = $$(".main-nav a");
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        navLinks.forEach(a=>a.classList.toggle("active", a.getAttribute("href")==="#"+entry.target.id));
      }
    });
  }, {rootMargin:"-35% 0px -58% 0px", threshold:0});
  sections.forEach(s=>observer.observe(s));
}

function initMenu(){
  $("#menuToggle").addEventListener("click",()=>{
    const open = $("#mainNav").classList.toggle("open");
    $("#menuToggle").setAttribute("aria-expanded", String(open));
  });
}

function initPillars(){
  $$(".pillar").forEach(btn=>{
    btn.addEventListener("click",()=>{
      $$(".pillar").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      const d = pillarContent[btn.dataset.pillar];
      $("#pillarDetail").innerHTML = `
        <div class="detail-label">${d.label}</div>
        <div><h3>${d.title}</h3><p>${d.text}</p></div>
        <a href="#platform" class="text-link">See it in the prototype →</a>`;
      $("#pillarDetail .text-link").addEventListener("click", e=>{
        e.preventDefault(); $("#platform").scrollIntoView({behavior:"smooth"});
      });
    });
  });
}

function initPlatform(){
  $$(".platform-tab").forEach(tab=>{
    tab.addEventListener("click",()=>{
      $$(".platform-tab").forEach(t=>t.classList.remove("active"));
      $$(".platform-view").forEach(v=>v.classList.remove("active"));
      tab.classList.add("active");
      $("#view-"+tab.dataset.view).classList.add("active");
    });
  });

  $("#saveProfileBtn").addEventListener("click",()=>{
    const profile = {
      name: $("#schoolName").value.trim() || "Demo School",
      state: $("#state").value,
      lga: $("#lga").value,
      level: $("#schoolLevel").value,
      learners: $("#learnerCount").value || 300,
      internet: $("#internetLevel").value,
      printing: $("#printingAccess").value
    };
    localStorage.setItem("edubridgeProfile", JSON.stringify(profile));
    $("#profileStatus").textContent = `${profile.name} saved locally.`;
    buildChecklists();
    $("#readinessResult")?.classList.add("hidden");
    updateDashboard();
  });

  $("#scoreBtn").addEventListener("click",()=>{
    const checks = $$("[data-readiness]");
    const readinessItems = getReadinessItems();
    const score = Math.round(checks.filter(x=>x.checked).length / checks.length * 100);
    localStorage.setItem("edubridgeReadiness", score);
    const gaps = checks.filter(x=>!x.checked).map(x=>readinessItems[Number(x.dataset.readiness)]).slice(0,4);
    const band = score>=80 ? "Strong readiness" : score>=60 ? "Developing readiness" : "Priority support needed";
    $("#readinessResult").classList.remove("hidden");
    $("#readinessResult").innerHTML = `
      <div class="score-row"><div class="score-big">${score}%</div><strong>${band}</strong></div>
      <div class="score-meter"><span style="width:${score}%"></span></div>
      <p><strong>Priority gaps</strong><br>${gaps.length ? gaps.map(g=>"• "+g).join("<br>") : "Core items are currently checked."}</p>
      <button class="mini-btn" id="downloadPlanBtn">Download action plan</button>`;
    $("#downloadPlanBtn").addEventListener("click", downloadActionPlan);
    updateDashboard();
  });

  $("#generateActivityBtn").addEventListener("click",()=>{
    const lvl=$("#activityLevel").value, area=$("#activityArea").value, mode=$("#activityMode").value, len=$("#activityLength").value;
    const core = area==="Literacy"
      ? "Read a short passage. Identify five key words, write two sentences using them, then explain the main idea in your own words."
      : "Use household objects or drawn examples to practise place value, then solve four short word problems and explain one answer.";
    const extra = mode==="Normal School Day" ? "The teacher checks responses in class." : "The activity can be completed with paper and pencil without continuous internet.";
    $("#activityResult").innerHTML = `<strong>${lvl} · ${area} · ${len}</strong><p>${core} ${extra}</p><button class="mini-btn" id="downloadActivityBtn">Download activity</button>`;
    $("#downloadActivityBtn").addEventListener("click",()=>downloadFile("EduBridge_Sample_Activity.txt", `${lvl} | ${area} | ${mode} | ${len}\n\n${core} ${extra}`));
  });

  $$("[data-download]").forEach(btn=>btn.addEventListener("click",()=>downloadResource(btn.dataset.download)));
  $("#downloadContinuityBtn").addEventListener("click", downloadContinuity);
  $("#printBtn").addEventListener("click",()=>window.print());

  const saved = JSON.parse(localStorage.getItem("edubridgeProfile") || "null");
  if(saved){
    $("#schoolName").value=saved.name; $("#state").value=saved.state; $("#schoolLevel").value=saved.level;
    $("#learnerCount").value=saved.learners; $("#internetLevel").value=saved.internet; $("#printingAccess").value=saved.printing;
    $("#profileStatus").textContent=`${saved.name} loaded from this device.`;
  }
}

function downloadActionPlan(){
  const p = JSON.parse(localStorage.getItem("edubridgeProfile") || "{}");
  const rawScore = localStorage.getItem("edubridgeReadiness");
  const scoreText = rawScore ? `${rawScore}%` : "Not yet assessed";

  const internetText = {
    "Reliable": "Reliable internet access",
    "Limited": "Limited or occasional internet access",
    "Very limited": "Very limited internet access",
    "No internet": "No regular internet access"
  }[p.internet] || p.internet || "Not provided";

  const printingText = {
    "Yes": "Printing/photocopying is available",
    "Limited": "Printing/photocopying is available on a limited basis",
    "No": "No regular printing/photocopying access"
  }[p.printing] || p.printing || "Not provided";

  downloadFile("EduBridge_School_Action_Plan.txt",
`EDUBRIDGE NIGERIA
SCHOOL LEARNING SUPPORT & CONTINUITY PLAN

SCHOOL DETAILS
School name: ${p.name || "Not provided"}
State: ${p.state || "Not provided"}
Local Government Area: ${p.lga || "Not provided"}
School level: ${p.level || "Not provided"}
Number of learners: ${p.learners || "Not provided"}

CURRENT ACCESS
Internet: ${internetText}
Printing/photocopying: ${printingText}
School readiness score: ${scoreText}

RECOMMENDED NEXT STEPS
1. Keep a simple record of learners who need additional literacy or numeracy support.
2. Prepare a small set of curriculum-aligned activities that teachers can use in class and, when necessary, send home.
3. Give teachers clear responsibility for learner follow-up and progress checks.
4. Maintain an approved parent or guardian contact method for learning updates and home-support guidance.
5. Where internet access is limited, prioritise printable and downloadable materials that can be prepared in advance.
6. Reassess learners after support activities to identify improvement and any remaining learning gaps.
7. If normal classroom access is interrupted, use the same learner records and prepared materials to support learning continuity.

HOW EDUBRIDGE SUPPORTS THIS SCHOOL
EduBridge helps the school organise learner support, identify practical readiness gaps, prepare offline-friendly learning resources, and track follow-up actions. It is designed to support the school's existing curriculum and teachers, not replace them.

This plan is a prototype planning output generated from the school profile and readiness check.`);
}

function downloadResource(type){
  const data = {
    teacher:`EDUBRIDGE NIGERIA — TEACHER CONTINUITY GUIDE
1. Confirm the approved learning arrangement with school leadership.
2. Identify learners assigned to your follow-up group.
3. Use prepared low-tech/offline learning activities.
4. Keep instructions short and realistic for home use.
5. Record learners reached, participation and barriers.
6. Support learners needing additional follow-up.
7. On return, check learning gaps before fully moving to new content.`,
    parent:`EDUBRIDGE NIGERIA — PARENT / GUARDIAN GUIDE
• Choose a realistic short learning time.
• Encourage the learner without completing the task for them.
• Keep completed materials for teacher review.
• Use the school's approved communication channel for questions.
• Tell the teacher when access or other barriers prevent participation.`,
    tracking:`EDUBRIDGE NIGERIA — LEARNER FOLLOW-UP SHEET
Learner | Material received | Completed | Follow-up needed | Notes
_______ | _________________ | _________ | ________________ | _____
_______ | _________________ | _________ | ________________ | _____`,
    return:`EDUBRIDGE NIGERIA — RETURN-TO-LEARNING CHECKLIST
[ ] Confirm learners who returned
[ ] Identify learners with missing activities
[ ] Run a simple literacy/numeracy check
[ ] Group learners needing catch-up support
[ ] Review what worked during disruption
[ ] Update the continuity plan`
  };
  downloadFile(`EduBridge_${type}.txt`, data[type]);
}

function downloadContinuity(){
  const p = JSON.parse(localStorage.getItem("edubridgeProfile") || "{}");
  downloadFile("EduBridge_Offline_Continuity_Pack.txt",
`EDUBRIDGE NIGERIA — OFFLINE CONTINUITY PACK
School: ${p.name||"Demo School"}

1. Confirm the approved temporary learning arrangement.
2. Prepare printed/downloaded learning activities.
3. Use the approved parent/guardian communication structure.
4. Assign teacher follow-up groups.
5. Track learner reach, participation and barriers.
6. Prepare a return-to-learning check.

EduBridge supports education continuity only and does not replace emergency or security authorities.`);
}

function updateDashboard(){
  const p = JSON.parse(localStorage.getItem("edubridgeProfile") || "{}");
  const score = localStorage.getItem("edubridgeReadiness");
  $("#dashReadiness").textContent = score ? score+"%" : "—";
  $("#dashLearners").textContent = p.learners || "300";
  $("#dashDownloads").textContent = localStorage.getItem("edubridgeDownloads") || "0";
}

function initBackTop(){
  const btn=$("#backTop");
  window.addEventListener("scroll",()=>btn.classList.toggle("show",window.scrollY>650));
  btn.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}));
}


function openPlatformView(view){
  const tab=document.querySelector(`.platform-tab[data-view="${view}"]`);
  if(!tab) return;
  document.querySelectorAll(".platform-tab").forEach(t=>t.classList.remove("active"));
  document.querySelectorAll(".platform-view").forEach(v=>v.classList.remove("active"));
  tab.classList.add("active");
  document.querySelector("#view-"+view)?.classList.add("active");
  document.querySelector("#platform")?.scrollIntoView({behavior:"smooth",block:"start"});
}
function initAccessibleCards(){
  document.querySelectorAll("[data-jump]").forEach(el=>el.addEventListener("click",()=>document.querySelector("#"+el.dataset.jump)?.scrollIntoView({behavior:"smooth"})));
  document.querySelectorAll("[data-open-view]").forEach(el=>{
    const go=()=>openPlatformView(el.dataset.openView);
    el.addEventListener("click",go);
    el.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}});
  });
}

buildChecklists();
initScrolling();
initMenu();
initAccessibleCards();
initPillars();
initPlatform();
updateDashboard();
initBackTop();

if("serviceWorker" in navigator){
  window.addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js").catch(()=>{}));
}


// Nigeria location data: 36 states + FCT, 774 LGAs/Area Councils.
const nigeriaLGAs = {"Abia":["Aba North","Aba South","Arochukwu","Bende","Ikwuano","Isiala Ngwa North","Isiala Ngwa South","Isuikwuato","Obi Ngwa","Ohafia","Osisioma Ngwa","Ugwunagbo","Ukwa East","Ukwa West","Umuahia North","Umuahia South","Umunneochi"],"Adamawa":["Demsa","Fufore","Ganye","Girei","Gombi","Guyuk","Hong","Jada","Lamurde","Madagali","Maiha","Mayo-Belwa","Michika","Mubi North","Mubi South","Numan","Shelleng","Song","Toungo","Yola North","Yola South"],"Akwa Ibom":["Abak","Eastern Obolo","Eket","Esit Eket","Essien Udim","Etim Ekpo","Etinan","Ibeno","Ibesikpo Asutan","Ibiono-Ibom","Ika","Ikono","Ikot Abasi","Ikot Ekpene","Ini","Itu","Mbo","Mkpat-Enin","Nsit-Atai","Nsit-Ibom","Nsit-Ubium","Obot Akara","Okobo","Onna","Oron","Oruk Anam","Udung-Uko","Ukanafun","Uruan","Urue-Offong/Oruko","Uyo"],"Anambra":["Aguata","Anambra East","Anambra West","Anaocha","Awka North","Awka South","Ayamelum","Dunukofia","Ekwusigo","Idemili North","Idemili South","Ihiala","Njikoka","Nnewi North","Nnewi South","Ogbaru","Onitsha North","Onitsha South","Orumba North","Orumba South","Oyi"],"Bauchi":["Alkaleri","Bauchi","Bogoro","Damban","Darazo","Dass","Gamawa","Ganjuwa","Giade","Itas/Gadau","Jama'are","Katagum","Kirfi","Misau","Ningi","Shira","Tafawa Balewa","Toro","Warji","Zaki"],"Bayelsa":["Brass","Ekeremor","Kolokuma/Opokuma","Nembe","Ogbia","Sagbama","Southern Ijaw","Yenagoa"],"Benue":["Ado","Agatu","Apa","Buruku","Gboko","Guma","Gwer East","Gwer West","Katsina-Ala","Konshisha","Kwande","Logo","Makurdi","Obi","Ogbadibo","Ohimini","Oju","Okpokwu","Otukpo","Tarka","Ukum","Ushongo","Vandeikya"],"Borno":["Abadam","Askira/Uba","Bama","Bayo","Biu","Chibok","Damboa","Dikwa","Gubio","Guzamala","Gwoza","Hawul","Jere","Kaga","Kala/Balge","Konduga","Kukawa","Kwaya Kusar","Mafa","Magumeri","Maiduguri","Marte","Mobbar","Monguno","Ngala","Nganzai","Shani"],"Cross River":["Abi","Akamkpa","Akpabuyo","Bakassi","Bekwarra","Biase","Boki","Calabar Municipal","Calabar South","Etung","Ikom","Obanliku","Obubra","Obudu","Odukpani","Ogoja","Yakuur","Yala"],"Delta":["Aniocha North","Aniocha South","Bomadi","Burutu","Ethiope East","Ethiope West","Ika North East","Ika South","Isoko North","Isoko South","Ndokwa East","Ndokwa West","Okpe","Oshimili North","Oshimili South","Patani","Sapele","Udu","Ughelli North","Ughelli South","Ukwuani","Uvwie","Warri North","Warri South","Warri South West"],"Ebonyi":["Abakaliki","Afikpo North","Afikpo South","Ebonyi","Ezza North","Ezza South","Ikwo","Ishielu","Ivo","Izzi","Ohaozara","Ohaukwu","Onicha"],"Edo":["Akoko-Edo","Egor","Esan Central","Esan North-East","Esan South-East","Esan West","Etsako Central","Etsako East","Etsako West","Igueben","Ikpoba-Okha","Oredo","Orhionmwon","Ovia North-East","Ovia South-West","Owan East","Owan West","Uhunmwonde"],"Ekiti":["Ado Ekiti","Efon","Ekiti East","Ekiti South-West","Ekiti West","Emure","Gbonyin","Ido/Osi","Ijero","Ikere","Ikole","Ilejemeje","Irepodun/Ifelodun","Ise/Orun","Moba","Oye"],"Enugu":["Aninri","Awgu","Enugu East","Enugu North","Enugu South","Ezeagu","Igbo Etiti","Igbo Eze North","Igbo Eze South","Isi Uzo","Nkanu East","Nkanu West","Nsukka","Oji River","Udenu","Udi","Uzo-Uwani"],"Gombe":["Akko","Balanga","Billiri","Dukku","Funakaye","Gombe","Kaltungo","Kwami","Nafada","Shongom","Yamaltu/Deba"],"Imo":["Aboh Mbaise","Ahiazu Mbaise","Ehime Mbano","Ezinihitte Mbaise","Ideato North","Ideato South","Ihitte/Uboma","Ikeduru","Isiala Mbano","Isu","Mbaitoli","Ngor Okpala","Njaba","Nkwerre","Nwangele","Obowo","Oguta","Ohaji/Egbema","Okigwe","Orlu","Orsu","Oru East","Oru West","Owerri Municipal","Owerri North","Owerri West","Unuimo"],"Jigawa":["Auyo","Babura","Biriniwa","Birnin Kudu","Buji","Dutse","Gagarawa","Garki","Gumel","Guri","Gwaram","Gwiwa","Hadejia","Jahun","Kafin Hausa","Kaugama","Kazaure","Kiri Kasama","Kiyawa","Maigatari","Malam Madori","Miga","Ringim","Roni","Sule Tankarkar","Taura","Yankwashi"],"Kaduna":["Birnin Gwari","Chikun","Giwa","Igabi","Ikara","Jaba","Jema'a","Kachia","Kaduna North","Kaduna South","Kagarko","Kajuru","Kaura","Kauru","Kubau","Kudan","Lere","Makarfi","Sabon Gari","Sanga","Soba","Zangon Kataf","Zaria"],"Kano":["Ajingi","Albasu","Bagwai","Bebeji","Bichi","Bunkure","Dala","Dambatta","Dawakin Kudu","Dawakin Tofa","Doguwa","Fagge","Gabasawa","Garko","Garun Mallam","Gaya","Gezawa","Gwale","Gwarzo","Kabo","Kano Municipal","Karaye","Kibiya","Kiru","Kumbotso","Kunchi","Kura","Madobi","Makoda","Minjibir","Nasarawa","Rano","Rimin Gado","Rogo","Shanono","Sumaila","Takai","Tarauni","Tofa","Tsanyawa","Tudun Wada","Ungogo","Warawa","Wudil"],"Katsina":["Bakori","Batagarawa","Batsari","Baure","Bindawa","Charanchi","Dan Musa","Dandume","Danja","Daura","Dutsi","Dutsin-Ma","Faskari","Funtua","Ingawa","Jibia","Kafur","Kaita","Kankara","Kankia","Katsina","Kurfi","Kusada","Mai'Adua","Malumfashi","Mani","Mashi","Matazu","Musawa","Rimi","Sabuwa","Safana","Sandamu","Zango"],"Kebbi":["Aleiro","Arewa Dandi","Argungu","Augie","Bagudo","Birnin Kebbi","Bunza","Dandi","Fakai","Gwandu","Jega","Kalgo","Koko/Besse","Maiyama","Ngaski","Sakaba","Shanga","Suru","Wasagu/Danko","Yauri","Zuru"],"Kogi":["Adavi","Ajaokuta","Ankpa","Bassa","Dekina","Ibaji","Idah","Igalamela Odolu","Ijumu","Kabba/Bunu","Kogi","Lokoja","Mopa-Muro","Ofu","Ogori/Magongo","Okehi","Okene","Olamaboro","Omala","Yagba East","Yagba West"],"Kwara":["Asa","Baruten","Edu","Ekiti","Ifelodun","Ilorin East","Ilorin South","Ilorin West","Irepodun","Isin","Kaiama","Moro","Offa","Oke Ero","Oyun","Pategi"],"Lagos":["Agege","Ajeromi-Ifelodun","Alimosho","Amuwo-Odofin","Apapa","Badagry","Epe","Eti-Osa","Ibeju-Lekki","Ifako-Ijaiye","Ikeja","Ikorodu","Kosofe","Lagos Island","Lagos Mainland","Mushin","Ojo","Oshodi-Isolo","Shomolu","Surulere"],"Nasarawa":["Akwanga","Awe","Doma","Karu","Keana","Keffi","Kokona","Lafia","Nasarawa","Nasarawa Egon","Obi","Toto","Wamba"],"Niger":["Agaie","Agwara","Bida","Borgu","Bosso","Chanchaga","Edati","Gbako","Gurara","Katcha","Kontagora","Lapai","Lavun","Magama","Mariga","Mashegu","Mokwa","Munya","Paikoro","Rafi","Rijau","Shiroro","Suleja","Tafa","Wushishi"],"Ogun":["Abeokuta North","Abeokuta South","Ado-Odo/Ota","Ewekoro","Ifo","Ijebu East","Ijebu North","Ijebu North East","Ijebu Ode","Ikenne","Imeko Afon","Ipokia","Obafemi Owode","Odeda","Odogbolu","Ogun Waterside","Remo North","Sagamu","Yewa North","Yewa South"],"Ondo":["Akoko North-East","Akoko North-West","Akoko South-East","Akoko South-West","Akure North","Akure South","Ese Odo","Idanre","Ifedore","Ilaje","Ile Oluji/Okeigbo","Irele","Odigbo","Okitipupa","Ondo East","Ondo West","Ose","Owo"],"Osun":["Atakunmosa East","Atakunmosa West","Aiyedaade","Aiyedire","Boluwaduro","Boripe","Ede North","Ede South","Egbedore","Ejigbo","Ife Central","Ife East","Ife North","Ife South","Ifedayo","Ifelodun","Ila","Ilesa East","Ilesa West","Irepodun","Irewole","Isokan","Iwo","Obokun","Odo Otin","Ola Oluwa","Olorunda","Oriade","Orolu","Osogbo"],"Oyo":["Afijio","Akinyele","Atiba","Atisbo","Egbeda","Ibadan North","Ibadan North-East","Ibadan North-West","Ibadan South-East","Ibadan South-West","Ibarapa Central","Ibarapa East","Ibarapa North","Ido","Irepo","Iseyin","Itesiwaju","Iwajowa","Kajola","Lagelu","Ogbomosho North","Ogbomosho South","Ogo Oluwa","Olorunsogo","Oluyole","Ona Ara","Orelope","Ori Ire","Oyo East","Oyo West","Saki East","Saki West","Surulere"],"Plateau":["Barkin Ladi","Bassa","Bokkos","Jos East","Jos North","Jos South","Kanam","Kanke","Langtang North","Langtang South","Mangu","Mikang","Pankshin","Qua'an Pan","Riyom","Shendam","Wase"],"Rivers":["Abua/Odual","Ahoada East","Ahoada West","Akuku-Toru","Andoni","Asari-Toru","Bonny","Degema","Eleme","Emohua","Etche","Gokana","Ikwerre","Khana","Obio/Akpor","Ogba/Egbema/Ndoni","Ogu/Bolo","Okrika","Omuma","Opobo/Nkoro","Oyigbo","Port Harcourt","Tai"],"Sokoto":["Binji","Bodinga","Dange Shuni","Gada","Goronyo","Gudu","Gwadabawa","Illela","Isa","Kebbe","Kware","Rabah","Sabon Birni","Shagari","Silame","Sokoto North","Sokoto South","Tambuwal","Tangaza","Tureta","Wamako","Wurno","Yabo"],"Taraba":["Ardo Kola","Bali","Donga","Gashaka","Gassol","Ibi","Jalingo","Karim Lamido","Kumi","Lau","Sardauna","Takum","Ussa","Wukari","Yorro","Zing"],"Yobe":["Bade","Bursari","Damaturu","Fika","Fune","Geidam","Gujba","Gulani","Jakusko","Karasuwa","Machina","Nangere","Nguru","Potiskum","Tarmuwa","Yunusari","Yusufari"],"Zamfara":["Anka","Bakura","Birnin Magaji/Kiyaw","Bukkuyum","Bungudu","Gummi","Gusau","Kaura Namoda","Maradun","Maru","Shinkafi","Talata Mafara","Chafe","Zurmi"],"Federal Capital Territory (FCT)":["Abaji","Abuja Municipal Area Council","Bwari","Gwagwalada","Kuje","Kwali"]};

function setupStateLGA() {
  const stateSelect = document.getElementById('state');
  const lgaSelect = document.getElementById('lga');
  if (!stateSelect || !lgaSelect) return;

  function populateLGAs(selectedLGA = '') {
    const state = stateSelect.value;
    lgaSelect.innerHTML = '';
    if (!state || !nigeriaLGAs[state]) {
      lgaSelect.disabled = true;
      lgaSelect.innerHTML = '<option value="">Choose a state first</option>';
      return;
    }
    lgaSelect.disabled = false;
    lgaSelect.innerHTML = '<option value="">Select Local Government Area</option>';
    nigeriaLGAs[state].forEach(name => {
      const option = document.createElement('option');
      option.value = name;
      option.textContent = name;
      if (name === selectedLGA) option.selected = true;
      lgaSelect.appendChild(option);
    });
  }

  stateSelect.addEventListener('change', () => populateLGAs());

  // Restore dependent LGA when an existing local profile is present.
  try {
    const saved = JSON.parse(localStorage.getItem('edubridgeProfile') || 'null');
    if (saved && saved.state) {
      stateSelect.value = saved.state;
      populateLGAs(saved.lga || '');
    } else {
      populateLGAs();
    }
  } catch (e) {
    populateLGAs();
  }
}
document.addEventListener('DOMContentLoaded', setupStateLGA);

document.addEventListener('DOMContentLoaded', () => {
  const saveBtn = document.getElementById('saveProfileBtn');
  if (!saveBtn) return;
  saveBtn.addEventListener('click', () => {
    const state = document.getElementById('state')?.value || '';
    const lga = document.getElementById('lga')?.value || '';
    if (!state || !lga) {
      const status = document.getElementById('profileStatus');
      if (status) status.textContent = 'Please select both State and Local Government Area.';
      return;
    }
    try {
      const saved = JSON.parse(localStorage.getItem('edubridgeProfile') || '{}');
      saved.state = state;
      saved.lga = lga;
      localStorage.setItem('edubridgeProfile', JSON.stringify(saved));
    } catch(e) {}
  });
});


function printReadinessReport(){
  const p = getCurrentProfile();
  const items = getReadinessItems();
  const checks = $$("[data-readiness]");
  const checkedCount = checks.filter(x=>x.checked).length;
  const score = checks.length ? Math.round(checkedCount/checks.length*100) : 0;
  const band = score>=80 ? "Strong readiness" : score>=60 ? "Developing readiness" : "Priority support needed";
  const rows = items.map((item,i)=>{
    const yes = checks[i]?.checked;
    return `<tr><td>${i+1}</td><td>${item}</td><td class="${yes?'yes':'no'}">${yes?'YES':'NO'}</td></tr>`;
  }).join("");

  const place = [p.lga ? `${p.lga} LGA` : "LGA not provided", p.state || "State not provided"].join(", ");
  const w = window.open("", "_blank", "width=950,height=760");
  if(!w) return alert("Please allow pop-ups to print the readiness report.");

  w.document.write(`<!doctype html><html><head><title>EduBridge Readiness Report</title>
    <style>
      body{font-family:Arial,sans-serif;color:#1f2a24;margin:38px}
      h1{color:#174A36;margin-bottom:2px}.sub{color:#66736B;margin-top:0}
      .meta{display:grid;grid-template-columns:1fr 1fr;gap:8px 28px;background:#f7f3e8;padding:16px;border-radius:10px;margin:18px 0}
      .score{display:flex;align-items:center;gap:18px;margin:18px 0}.score b{font-size:36px;color:#174A36}
      table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #d8e2dc;padding:9px;text-align:left}th{background:#174A36;color:#fff}
      .yes{color:#17663e;font-weight:bold}.no{color:#a3362a;font-weight:bold}
      .note{font-size:11px;color:#66736B;margin-top:18px}
      @media print{body{margin:20px}.no-print{display:none}}
    </style></head><body>
    <h1>EduBridge Nigeria</h1>
    <p class="sub">School Readiness & Learning Continuity Report</p>
    <div class="meta">
      <div><strong>School:</strong> ${p.name || "Not provided"}</div>
      <div><strong>School level:</strong> ${p.level || "Not provided"}</div>
      <div><strong>State:</strong> ${p.state || "Not provided"}</div>
      <div><strong>Local Government Area:</strong> ${p.lga || "Not provided"}</div>
      <div><strong>Estimated learners:</strong> ${p.learners || "Not provided"}</div>
      <div><strong>Context:</strong> ${place}</div>
    </div>
    <div class="score"><b>${score}%</b><div><strong>${band}</strong><br><span>${checkedCount} of ${checks.length} readiness items confirmed</span></div></div>
    <table><thead><tr><th>#</th><th>Readiness item</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>
    <p class="note">The state/LGA questions are planning prompts for education continuity and are not an official security or emergency risk assessment.</p>
    <script>window.onload=()=>{window.print();}<\/script>
    </body></html>`);
  w.document.close();
}

function buildLongContinuityPlan(){
  const duration = Number($("#continuityDuration")?.value || 2);
  const focus = $("#continuityFocus")?.value || "Foundational Literacy + Numeracy";
  const channel = $("#continuityChannel")?.value || "Printed packs";
  const cycles = Math.max(1, Math.ceil(duration/2));
  const out = $("#continuityPlanOutput");
  if(out){
    out.innerHTML = `
      <div class="cycle-intro">
        <span>${duration}-week continuity plan</span>
        <h4>${cycles} learning cycle${cycles===1?"":"s"} — not one repeated pack.</h4>
        <p><strong>Starting point:</strong> latest learner data + a quick baseline check. Then each cycle adds or reinforces ${focus.toLowerCase()} content and uses a short check to decide the next step. Primary delivery: ${channel}.</p>
      </div>
      <div class="cycle-steps">
        <article><b>01</b><strong>Baseline</strong><span>Identify current learning level and priority gaps.</span></article>
        <article><b>02</b><strong>Teach</strong><span>Deliver new curriculum-aligned work for the next 1–2 weeks.</span></article>
        <article><b>03</b><strong>Check</strong><span>Use a short paper, phone or teacher follow-up check.</span></article>
        <article><b>04</b><strong>Adapt</strong><span>Advance, reinforce or simplify the next cycle using new evidence.</span></article>
        <article><b>05</b><strong>Re-enter</strong><span>Assess learning loss and create a catch-up plan when school resumes.</span></article>
      </div>`;
  }
  $("#fiveMonthExample")?.classList.toggle("hidden", duration < 20);
}

document.addEventListener("DOMContentLoaded", ()=>{
  $("#printReadinessBtn")?.addEventListener("click", printReadinessReport);
  $("#buildContinuityPlanBtn")?.addEventListener("click", buildLongContinuityPlan);
  $("#continuityDuration")?.addEventListener("change", buildLongContinuityPlan);
});

document.addEventListener("DOMContentLoaded", ()=>{
  const b = $("#downloadContinuityBtn");
  if(!b) return;
  b.addEventListener("click", ()=>{
    const p = getCurrentProfile();
    const duration = Number($("#continuityDuration")?.value || 2);
    const focus = $("#continuityFocus")?.value || "Foundational Literacy + Numeracy";
    const channel = $("#continuityChannel")?.value || "Printed packs";
    const cycles = Math.max(1, Math.ceil(duration/2));
    downloadFile("EduBridge_Continuity_Learning_Plan.txt",
`EDUBRIDGE NIGERIA — CONTINUITY LEARNING PLAN

SCHOOL
${p.name || "Not provided"}
${p.lga || "LGA not provided"}, ${p.state || "State not provided"}

DISRUPTION PLAN
Duration: ${duration} weeks
Learning focus: ${focus}
Delivery: ${channel}
Suggested learning cycles: ${cycles}

HOW THE MODEL WORKS
1. BASELINE — Use the latest learner record plus a short starting check.
2. TEACH — Provide new curriculum-aligned learning for the next 1–2 weeks.
3. CHECK — Use a short reassessment or approved teacher/family follow-up.
4. ADAPT — Advance, reinforce or simplify the next learning cycle based on new evidence.
5. REVIEW — Track learners reached, participation and learning progress.
6. RE-ENTRY — Reassess learning and prepare catch-up support when normal attendance resumes.

Important: existing learner data is only the starting point. EduBridge does not assume one old assessment can guide months of learning.`);
  });
});
