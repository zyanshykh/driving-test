type Category = "Rules" | "Signs" | "Safety" | "Situations";

interface Question {
  id: string;
  cat: Category;
  q: string;
  options: string[];
  answer: number; // index in options
  why: string; // Hinglish explanation
  sign?: string; // inline SVG
}

// ---------- Road sign drawings (simple SVG) ----------
const S = (inner: string): string =>
  `<svg viewBox="0 0 100 100" width="110" height="110" role="img" aria-hidden="true">${inner}</svg>`;

const SIGNS = {
  stop: S(
    `<polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#c62828" stroke="#fff" stroke-width="3"/>
     <text x="50" y="58" font-size="24" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">STOP</text>`
  ),
  giveWay: S(
    `<polygon points="50,92 6,12 94,12" fill="#fff" stroke="#c62828" stroke-width="10" stroke-linejoin="round"/>`
  ),
  noEntry: S(
    `<circle cx="50" cy="50" r="45" fill="#c62828"/><rect x="20" y="42" width="60" height="16" fill="#fff"/>`
  ),
  speed40: S(
    `<circle cx="50" cy="50" r="42" fill="#fff" stroke="#c62828" stroke-width="10"/>
     <text x="50" y="62" font-size="34" font-weight="700" text-anchor="middle" fill="#111" font-family="Arial">40</text>`
  ),
  turnLeft: S(
    `<circle cx="50" cy="50" r="45" fill="#1565c0"/>
     <path d="M65 72 V45 H40 M40 45 l12 -12 M40 45 l12 12" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  ),
  warning: S(
    `<polygon points="50,8 94,88 6,88" fill="#fff" stroke="#c62828" stroke-width="9" stroke-linejoin="round"/>
     <text x="50" y="76" font-size="44" font-weight="700" text-anchor="middle" fill="#111" font-family="Arial">!</text>`
  ),
  noParking: S(
    `<circle cx="50" cy="50" r="42" fill="#1565c0" stroke="#c62828" stroke-width="9"/>
     <line x1="22" y1="78" x2="78" y2="22" stroke="#c62828" stroke-width="9"/>`
  ),
  hospital: S(
    `<rect x="8" y="8" width="84" height="84" rx="8" fill="#1565c0"/>
     <text x="50" y="68" font-size="56" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">H</text>`
  ),
};

const QUESTIONS: Question[] = [
  // ---------- SIGNS ----------
  { id: "s1", cat: "Signs", sign: SIGNS.stop, q: "What does this sign mean?",
    options: ["Slow down and continue", "Come to a complete stop, then go when safe", "Parking allowed", "Give way only"],
    answer: 1, why: "Octagon (8 sides) sirf STOP ka hota hai. Poora ruko, dono taraf dekho, phir chalo." },
  { id: "s2", cat: "Signs", sign: SIGNS.giveWay, q: "What does this inverted triangle sign mean?",
    options: ["Give way to other traffic", "Danger ahead", "No entry", "Speed limit ends"],
    answer: 0, why: "Ulta triangle = Give Way. Dusri traffic ko pehle guzarne do." },
  { id: "s3", cat: "Signs", sign: SIGNS.noEntry, q: "A red circle with a white horizontal bar means:",
    options: ["Road closed for parking", "Stop ahead", "No entry for vehicles", "One-way road begins"],
    answer: 2, why: "Laal circle + safed patti = No Entry. Is taraf se andar na jao." },
  { id: "s4", cat: "Signs", sign: SIGNS.speed40, q: "A white circle with a red border and the number 40 means:",
    options: ["Minimum speed 40", "Maximum speed 40 km/h", "Distance 40 metres", "Road number 40"],
    answer: 1, why: "Laal border wala circle = mana hai. Number likha ho to woh maximum speed limit hai." },
  { id: "s5", cat: "Signs", sign: SIGNS.turnLeft, q: "A blue circle with a left-turn arrow means:",
    options: ["Left turn forbidden", "You must turn left", "Left lane closed", "Curve to the left ahead"],
    answer: 1, why: "Neela circle = hukam (mandatory). Arrow ki taraf mudna zaroori hai." },
  { id: "s6", cat: "Signs", sign: SIGNS.warning, q: "A triangle with a red border and '!' is a:",
    options: ["Prohibition sign", "Information sign", "General warning sign", "Parking sign"],
    answer: 2, why: "Triangle = warning. Aage khatra ho sakta hai, speed kam karo aur alert raho." },
  { id: "s7", cat: "Signs", sign: SIGNS.noParking, q: "A blue circle with a red border and a red diagonal line means:",
    options: ["No parking / no stopping", "Parking available", "Bus stop", "Turn left only"],
    answer: 0, why: "Red slash = mana hai. Is jagah gaari khari nahi karni." },
  { id: "s8", cat: "Signs", sign: SIGNS.hospital, q: "A blue square with 'H' usually shows:",
    options: ["Highway", "Hospital nearby", "Hotel", "Horn prohibited"],
    answer: 1, why: "Neela rectangle/square = information. 'H' = hospital. Yahan horn na bajao aur dheere chalo." },
  { id: "s9", cat: "Signs", q: "Which shape is normally used for WARNING signs?",
    options: ["Triangle", "Octagon", "Blue square", "Diamond with H"],
    answer: 0, why: "Triangle = warning, circle = order/prohibition, rectangle = information, octagon = stop." },
  { id: "s10", cat: "Signs", q: "Which colour is normally used for MANDATORY (must do) signs?",
    options: ["Red border on white", "Blue circle", "Yellow square", "Green triangle"],
    answer: 1, why: "Neela circle = must do. Laal border = mana hai." },

  // ---------- RULES ----------
  { id: "r1", cat: "Rules", q: "In Pakistan, vehicles keep to which side of the road?",
    options: ["Right", "Left", "Middle", "Any side"],
    answer: 1, why: "Pakistan mein left-hand traffic hai: gaari left par chalti hai." },
  { id: "r2", cat: "Rules", q: "A red traffic light means:",
    options: ["Slow down", "Stop behind the line", "Proceed with horn", "Turn only"],
    answer: 1, why: "Red = stop line ke peechay ruko jab tak green na ho." },
  { id: "r3", cat: "Rules", q: "A steady amber (yellow) light means:",
    options: ["Speed up", "Stop if you can do so safely", "Go if no police", "Park here"],
    answer: 1, why: "Amber = signal badalne wala hai. Agar safely ruk sakte ho to ruko." },
  { id: "r4", cat: "Rules", q: "Normally, in left-hand traffic you should overtake on the:",
    options: ["Right side", "Left side", "Either side always", "Shoulder"],
    answer: 0, why: "Aam tor par aage wali gaari ko right se overtake karte hain (jab rasta saaf ho)." },
  { id: "r5", cat: "Rules", q: "Where is overtaking NOT allowed?",
    options: ["Straight empty road", "On a bend or hill crest", "Wide dual road", "Where you can see far ahead"],
    answer: 1, why: "Mod, chadhai ki choti, junction aur pedestrian crossing par overtake nahi karte — samne ka nazar nahi aata." },
  { id: "r6", cat: "Rules", q: "At a roundabout you should give way to:",
    options: ["Traffic already on the roundabout", "Whoever is faster", "Traffic joining behind you", "Nobody"],
    answer: 0, why: "Roundabout mein pehle se mojood gaariyon ko right of way hota hai." },
  { id: "r7", cat: "Rules", q: "Using a hand-held mobile phone while driving is:",
    options: ["Allowed on empty roads", "Allowed in traffic jams only", "Dangerous and not allowed", "Allowed for short calls"],
    answer: 2, why: "Phone se tawajjo hat jati hai. Zaroorat ho to side par safe jagah ruk kar baat karo." },
  { id: "r8", cat: "Rules", q: "Driving after drinking alcohol or taking drugs is:",
    options: ["Fine if you feel okay", "Fine at night", "Prohibited and very dangerous", "Fine for short trips"],
    answer: 2, why: "Nasha reaction time kam kar deta hai. Kabhi bhi nahi." },
  { id: "r9", cat: "Rules", q: "A solid line on your side of the road centre means:",
    options: ["You may overtake freely", "Do not cross it to overtake", "Parking lane", "Bus lane only"],
    answer: 1, why: "Solid line = cross mat karo / overtake mat karo. Toota hua (broken) line mein ijazat hoti hai jab safe ho." },
  { id: "r10", cat: "Rules", q: "Before turning you should signal:",
    options: ["After you start turning", "Early, before you turn or change lane", "Only at night", "Never in town"],
    answer: 1, why: "Indicator pehle do taake peechay wale ko samajh aaye." },

  // ---------- SAFETY ----------
  { id: "f1", cat: "Safety", q: "Who must wear a seat belt?",
    options: ["Only the driver", "Driver and all passengers (where fitted)", "Only front passenger", "Nobody in town"],
    answer: 1, why: "Seat belt jaan bachati hai. Driver aur sab passengers ko lagana chahiye." },
  { id: "f2", cat: "Safety", q: "A good following distance is:",
    options: ["As close as possible", "At least a 2-second gap, more in rain", "Only 1 metre", "Bumper to bumper"],
    answer: 1, why: "2-second rule: aage wali gaari kisi nishan se guzre, aap 2 gino ke baad guzro. Baarish mein zyada gap." },
  { id: "f3", cat: "Safety", q: "On a wet road you should:",
    options: ["Brake hard", "Reduce speed and brake gently", "Speed up", "Use high beam"],
    answer: 1, why: "Geeli sadak par tyre ki grip kam hoti hai. Dheere chalo, aram se brake lagao." },
  { id: "f4", cat: "Safety", q: "If you feel sleepy while driving, you should:",
    options: ["Turn up music and continue", "Stop in a safe place and rest", "Drive faster to arrive early", "Open the window and keep going"],
    answer: 1, why: "Neend sab se khatarnak hai. Safe jagah ruk kar araam karo." },
  { id: "f5", cat: "Safety", q: "Before changing lanes you should:",
    options: ["Only use the horn", "Check mirror, signal, and check blind spot", "Just speed up", "Close your eyes and go"],
    answer: 1, why: "Mirror → signal → blind spot (kandhay ke upar dekho) → phir lane badlo." },
  { id: "f6", cat: "Safety", q: "Dipped (low) headlights should be used:",
    options: ["When there is oncoming traffic at night", "Never", "Only in the day", "Only on motorways"],
    answer: 0, why: "High beam samne wale ki aankhon ko chaundhiya deti hai. Samne gaari ho to low beam." },
  { id: "f7", cat: "Safety", q: "Hazard lights are used when:",
    options: ["You want to park anywhere", "Your vehicle is broken down or a danger exists", "Overtaking", "Turning left"],
    answer: 1, why: "Hazard (four indicators) breakdown ya khatre ki khabar dene ke liye hain, parking ke bahane ke liye nahi." },
  { id: "f8", cat: "Safety", q: "Before reversing you should:",
    options: ["Look all around and reverse slowly", "Reverse quickly", "Rely on horn only", "Reverse with eyes forward"],
    answer: 0, why: "Peechay bachay/cheez ho sakti hai. Mirrors + peechay mud kar dekho, dheere reverse karo." },

  // ---------- SITUATIONS ----------
  { id: "t1", cat: "Situations", q: "An ambulance with siren is behind you. You should:",
    options: ["Speed up", "Move to the side safely and let it pass", "Stay in the middle", "Stop suddenly in the road"],
    answer: 1, why: "Ambulance ko raasta do. Side par ho jao, zaroorat ho to ruk jao, magar achanak brake nahi." },
  { id: "t2", cat: "Situations", q: "A pedestrian is waiting at a zebra crossing. You should:",
    options: ["Honk and pass", "Slow down and give way", "Overtake quickly", "Ignore them"],
    answer: 1, why: "Zebra crossing par pedestrian ko pehle guzarne do." },
  { id: "t3", cat: "Situations", q: "Parking is NOT allowed:",
    options: ["Near a junction or bend", "In a marked bay", "In your own driveway", "Where signs allow it"],
    answer: 0, why: "Junction, mod, pedestrian crossing aur driveway ke samne gaari khari nahi karte." },
  { id: "t4", cat: "Situations", q: "Your car breaks down on the road. First you should:",
    options: ["Stand in the road", "Move it aside if possible, turn on hazard lights", "Leave it with doors open", "Sleep inside"],
    answer: 1, why: "Safe side par karo, hazard lights lagao, aur warning triangle peechay rakho." },
  { id: "t5", cat: "Situations", q: "In fog you should:",
    options: ["Use high beam", "Slow down and use low/fog lights", "Follow close behind another car", "Overtake"],
    answer: 1, why: "Fog mein high beam wapas aankhon mein lagti hai. Low beam / fog light aur kam speed." },
  { id: "t6", cat: "Situations", q: "Near hospitals and schools you should:",
    options: ["Drive slowly and avoid unnecessary horn", "Use horn a lot", "Race", "Park on the road"],
    answer: 0, why: "Silent zones mein shor na karo aur bachon ki wajah se alert raho." },
  { id: "t7", cat: "Situations", q: "On a motorway, slow vehicles should normally use the:",
    options: ["Right lane", "Left lane", "Any lane", "Emergency lane"],
    answer: 1, why: "Left lane slow ke liye; right lane overtake ke liye. Emergency lane sirf emergency mein." },
  { id: "t8", cat: "Situations", q: "Coming to a junction with no sign or signal, you should:",
    options: ["Go fast", "Slow down, look both ways, give way as needed", "Honk and go", "Close your eyes"],
    answer: 1, why: "Hamesha slow, dono taraf dekho aur jahan zaroorat ho right of way do." },
];

// ---------- Practical test checklist ----------
interface ChecklistGroup { title: string; items: string[]; }

const PRACTICAL: ChecklistGroup[] = [
  { title: "1. Gaari mein baithte hi (cockpit check)", items: [
    "Seat adjust: pedals aaram se, kamar support",
    "Rear-view + side mirrors set",
    "Seat belt lagayi",
    "Doors band, handbrake check",
    "Neutral mein engine start (manual)",
  ]},
  { title: "2. Chalna shuru karna (moving off)", items: [
    "Mirror → signal → blind spot check",
    "Clutch / accelerator smooth, jhatka nahi",
    "Sahi gear (manual) — 1st se 2nd time par",
  ]},
  { title: "3. Road par behaviour", items: [
    "Left side par chalna, lane discipline",
    "Safe following distance",
    "Indicator pehle dena (turn / lane change)",
    "Zebra crossing par pedestrian ko raasta",
    "Stop sign par poora rukna",
    "Roundabout / junction par give way",
  ]},
  { title: "4. Manoeuvres (jo examiner mangta hai)", items: [
    "Reverse parking (seedhi line mein)",
    "Parallel parking",
    "Hill start (rolling back nahi)",
    "3-point / U-turn",
    "Emergency stop (control ke saath)",
  ]},
  { title: "5. Test wale din", items: [
    "Documents saath rakhna (CNIC, learner permit, fee receipt — apne licensing office se confirm karo)",
    "Jaldi pohanchna, ghabrana nahi",
    "Examiner ki hidayat dhyan se suno; samajh na aaye to poochho",
    "Aik ghanta pehle practice karo, raat ko poori neend",
  ]},
];
