"use strict";
// ---------- Road sign drawings (simple SVG) ----------
const S = (inner) => `<svg viewBox="0 0 100 100" width="120" height="120" role="img" aria-hidden="true">${inner}</svg>`;
const SIGNS = {
    stop: S(`<polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#c62828" stroke="#fff" stroke-width="3"/>
     <text x="50" y="58" font-size="24" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">STOP</text>`),
    giveWay: S(`<polygon points="50,92 6,12 94,12" fill="#fff" stroke="#c62828" stroke-width="10" stroke-linejoin="round"/>`),
    noEntry: S(`<circle cx="50" cy="50" r="45" fill="#c62828"/><rect x="20" y="42" width="60" height="16" fill="#fff"/>`),
    speed40: S(`<circle cx="50" cy="50" r="42" fill="#fff" stroke="#c62828" stroke-width="10"/>
     <text x="50" y="62" font-size="34" font-weight="700" text-anchor="middle" fill="#111" font-family="Arial">40</text>`),
    turnLeft: S(`<circle cx="50" cy="50" r="45" fill="#1565c0"/>
     <path d="M65 72 V45 H40 M40 45 l12 -12 M40 45 l12 12" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),
    warning: S(`<polygon points="50,8 94,88 6,88" fill="#fff" stroke="#c62828" stroke-width="9" stroke-linejoin="round"/>
     <text x="50" y="76" font-size="44" font-weight="700" text-anchor="middle" fill="#111" font-family="Arial">!</text>`),
    noParking: S(`<circle cx="50" cy="50" r="42" fill="#1565c0" stroke="#c62828" stroke-width="9"/>
     <line x1="22" y1="78" x2="78" y2="22" stroke="#c62828" stroke-width="9"/>`),
    hospital: S(`<rect x="8" y="8" width="84" height="84" rx="8" fill="#1565c0"/>
     <text x="50" y="68" font-size="56" font-weight="700" text-anchor="middle" fill="#fff" font-family="Arial">H</text>`),
};
const QUESTIONS = [
    // ---------- SIGNS ----------
    { id: "s1", cat: "Signs", sign: SIGNS.stop,
        q: ["What does this sign mean?", "اس نشان کا کیا مطلب ہے؟"],
        options: [
            ["Slow down and continue", "آہستہ کریں اور چلتے رہیں"],
            ["Stop completely, then go when safe", "مکمل طور پر رک جائیں، پھر محفوظ ہو تو چلیں"],
            ["Parking allowed", "پارکنگ کی اجازت ہے"],
            ["Give way only", "صرف راستہ دیں"]
        ],
        answer: 1,
        why: ["An octagon is used only for STOP. Stop completely, look both ways, then go when safe.",
            "آٹھ کونوں والا نشان صرف اسٹاپ کا ہوتا ہے۔ مکمل رکیں، دونوں طرف دیکھیں، پھر چلیں۔"] },
    { id: "s2", cat: "Signs", sign: SIGNS.giveWay,
        q: ["What does this inverted triangle mean?", "یہ الٹی تکون والا نشان کیا بتاتا ہے؟"],
        options: [
            ["Give way to other traffic", "دوسری ٹریفک کو راستہ دیں"],
            ["Danger ahead", "آگے خطرہ ہے"],
            ["No entry", "داخلہ ممنوع"],
            ["Speed limit ends", "رفتار کی حد ختم"]
        ],
        answer: 0,
        why: ["An inverted triangle means Give Way. Let other traffic pass first.",
            "الٹی تکون کا مطلب راستہ دینا ہے۔ دوسری گاڑیوں کو پہلے گزرنے دیں۔"] },
    { id: "s3", cat: "Signs", sign: SIGNS.noEntry,
        q: ["A red circle with a white horizontal bar means:", "سرخ دائرہ جس میں سفید افقی پٹی ہو، اس کا مطلب ہے:"],
        options: [
            ["Road closed for parking", "پارکنگ کے لیے سڑک بند"],
            ["Stop ahead", "آگے اسٹاپ"],
            ["No entry for vehicles", "گاڑیوں کا داخلہ ممنوع"],
            ["One-way road begins", "یک طرفہ سڑک شروع"]
        ],
        answer: 2,
        why: ["Red circle with a white bar = No Entry. Do not enter from this side.",
            "سرخ دائرہ اور سفید پٹی: داخلہ ممنوع۔ اس طرف سے اندر نہ جائیں۔"] },
    { id: "s4", cat: "Signs", sign: SIGNS.speed40,
        q: ["A white circle with a red border and the number 40 means:", "سفید دائرہ، سرخ کنارہ اور اس میں 40 کا مطلب:"],
        options: [
            ["Minimum speed 40", "کم از کم رفتار 40"],
            ["Maximum speed 40 km/h", "زیادہ سے زیادہ رفتار 40 کلومیٹر فی گھنٹہ"],
            ["Distance 40 metres", "فاصلہ 40 میٹر"],
            ["Road number 40", "سڑک نمبر 40"]
        ],
        answer: 1,
        why: ["A red-bordered circle is a prohibition. With a number, it is the maximum speed limit.",
            "سرخ کنارے والا دائرہ ممانعت ہوتا ہے۔ عدد لکھا ہو تو وہ رفتار کی زیادہ سے زیادہ حد ہے۔"] },
    { id: "s5", cat: "Signs", sign: SIGNS.turnLeft,
        q: ["A blue circle with a left-turn arrow means:", "نیلا دائرہ جس میں بائیں مڑنے کا تیر ہو، اس کا مطلب:"],
        options: [
            ["Left turn forbidden", "بائیں مڑنا منع ہے"],
            ["You must turn left", "آپ کو بائیں مڑنا ہے"],
            ["Left lane closed", "بائیں لین بند ہے"],
            ["Curve to the left ahead", "آگے بائیں موڑ ہے"]
        ],
        answer: 1,
        why: ["A blue circle is an order (mandatory). You must turn in the direction of the arrow.",
            "نیلا دائرہ حکم ہوتا ہے۔ تیر کی طرف مڑنا لازمی ہے۔"] },
    { id: "s6", cat: "Signs", sign: SIGNS.warning,
        q: ["A triangle with a red border and '!' is a:", "سرخ کنارے اور '!' والی تکون ہے:"],
        options: [
            ["Prohibition sign", "ممانعتی نشان"],
            ["Information sign", "معلوماتی نشان"],
            ["General warning sign", "عمومی انتباہی نشان"],
            ["Parking sign", "پارکنگ کا نشان"]
        ],
        answer: 2,
        why: ["A triangle means warning. Danger may be ahead: slow down and stay alert.",
            "تکون انتباہ کے لیے ہوتی ہے۔ آگے خطرہ ہو سکتا ہے، رفتار کم کریں اور چوکس رہیں۔"] },
    { id: "s7", cat: "Signs", sign: SIGNS.noParking,
        q: ["A blue circle with a red border and a red diagonal line means:", "نیلا دائرہ، سرخ کنارہ اور سرخ ترچھی لکیر کا مطلب:"],
        options: [
            ["No parking / no stopping", "پارکنگ / رکنا منع ہے"],
            ["Parking available", "پارکنگ دستیاب ہے"],
            ["Bus stop", "بس اسٹاپ"],
            ["Turn left only", "صرف بائیں مڑیں"]
        ],
        answer: 0,
        why: ["A red slash means prohibited. Do not park or stop here.",
            "سرخ ترچھی لکیر کا مطلب ممانعت ہے۔ یہاں گاڑی کھڑی نہ کریں۔"] },
    { id: "s8", cat: "Signs", sign: SIGNS.hospital,
        q: ["A blue square with 'H' usually shows:", "نیلا چوکور جس میں 'H' ہو، عموماً ظاہر کرتا ہے:"],
        options: [
            ["Highway", "ہائی وے"],
            ["Hospital nearby", "قریب ہسپتال ہے"],
            ["Hotel", "ہوٹل"],
            ["Horn prohibited", "ہارن ممنوع"]
        ],
        answer: 1,
        why: ["A blue square/rectangle gives information. 'H' means hospital: drive slowly and avoid honking.",
            "نیلا چوکور معلومات کے لیے ہوتا ہے۔ 'H' کا مطلب ہسپتال ہے۔ یہاں ہارن نہ بجائیں اور آہستہ چلیں۔"] },
    { id: "s9", cat: "Signs",
        q: ["Which shape is normally used for WARNING signs?", "انتباہی نشانوں کی عام شکل کون سی ہے؟"],
        options: [
            ["Triangle", "تکون"],
            ["Octagon", "آٹھ کونوں والی"],
            ["Blue square", "نیلا چوکور"],
            ["Diamond with H", "H والا ہیرا"]
        ],
        answer: 0,
        why: ["Triangle = warning, circle = order or prohibition, rectangle = information, octagon = stop.",
            "تکون انتباہ، دائرہ حکم یا ممانعت، چوکور معلومات اور آٹھ کونوں والی شکل اسٹاپ ہے۔"] },
    { id: "s10", cat: "Signs",
        q: ["Which colour is normally used for MANDATORY (must do) signs?", "لازمی (ضرور کرنے والے) نشانوں کا رنگ عموماً کون سا ہوتا ہے؟"],
        options: [
            ["Red border on white", "سفید پر سرخ کنارہ"],
            ["Blue circle", "نیلا دائرہ"],
            ["Yellow square", "پیلا چوکور"],
            ["Green triangle", "سبز تکون"]
        ],
        answer: 1,
        why: ["A blue circle means 'must do'. A red border means 'must not do'.",
            "نیلا دائرہ یعنی ضرور کرنا ہے۔ سرخ کنارہ یعنی منع ہے۔"] },
    // ---------- RULES ----------
    { id: "r1", cat: "Rules",
        q: ["In Pakistan, vehicles keep to which side of the road?", "پاکستان میں گاڑیاں سڑک کے کس طرف چلتی ہیں؟"],
        options: [["Right", "دائیں"], ["Left", "بائیں"], ["Middle", "درمیان"], ["Any side", "کسی بھی طرف"]],
        answer: 1,
        why: ["Pakistan has left-hand traffic: keep to the left.",
            "پاکستان میں بائیں ہاتھ کی ٹریفک ہے، گاڑی بائیں طرف چلتی ہے۔"] },
    { id: "r2", cat: "Rules",
        q: ["A red traffic light means:", "سرخ بتی کا مطلب ہے:"],
        options: [
            ["Slow down", "آہستہ ہوں"],
            ["Stop behind the line", "لائن کے پیچھے رک جائیں"],
            ["Proceed with horn", "ہارن دے کر گزر جائیں"],
            ["Turn only", "صرف مڑیں"]
        ],
        answer: 1,
        why: ["At red, stop behind the line until the light turns green.",
            "سرخ بتی پر لائن کے پیچھے رکیں، سبز ہونے تک انتظار کریں۔"] },
    { id: "r3", cat: "Rules",
        q: ["A steady amber (yellow) light means:", "مستقل پیلی بتی کا مطلب ہے:"],
        options: [
            ["Speed up", "رفتار بڑھائیں"],
            ["Stop if you can do so safely", "محفوظ ہو تو رک جائیں"],
            ["Go if no police", "پولیس نہ ہو تو چلیں"],
            ["Park here", "یہاں پارک کریں"]
        ],
        answer: 1,
        why: ["Amber means the signal is about to change. Stop if you can do so safely.",
            "پیلی بتی کا مطلب ہے سگنل بدلنے والا ہے۔ محفوظ طریقے سے رک سکیں تو رک جائیں۔"] },
    { id: "r4", cat: "Rules",
        q: ["Normally, in left-hand traffic you should overtake on the:", "بائیں ہاتھ کی ٹریفک میں عام طور پر اوورٹیک کس طرف سے کیا جاتا ہے؟"],
        options: [
            ["Right side", "دائیں طرف سے"],
            ["Left side", "بائیں طرف سے"],
            ["Either side always", "ہمیشہ کسی بھی طرف سے"],
            ["Shoulder", "کچی پٹی سے"]
        ],
        answer: 0,
        why: ["Normally you overtake on the right, when the road ahead is clear.",
            "عام طور پر آگے والی گاڑی کو دائیں طرف سے اوورٹیک کرتے ہیں، جب راستہ صاف ہو۔"] },
    { id: "r5", cat: "Rules",
        q: ["Where is overtaking NOT allowed?", "اوورٹیک کہاں منع ہے؟"],
        options: [
            ["Straight empty road", "سیدھی خالی سڑک"],
            ["On a bend or hill crest", "موڑ یا چڑھائی کی چوٹی پر"],
            ["Wide dual road", "چوڑی ڈبل روڈ"],
            ["Where you can see far ahead", "جہاں دور تک نظر آئے"]
        ],
        answer: 1,
        why: ["Never overtake on bends, hill crests, junctions or pedestrian crossings: you can't see what's coming.",
            "موڑ، چڑھائی کی چوٹی، چوراہے اور پیدل کراسنگ پر اوورٹیک نہ کریں، سامنے کا منظر نظر نہیں آتا۔"] },
    { id: "r6", cat: "Rules",
        q: ["At a roundabout you should give way to:", "گول چکر پر آپ کو راستہ دینا ہے:"],
        options: [
            ["Traffic already on the roundabout", "پہلے سے چکر میں موجود ٹریفک کو"],
            ["Whoever is faster", "جو زیادہ تیز ہو"],
            ["Traffic joining behind you", "پیچھے سے شامل ہونے والوں کو"],
            ["Nobody", "کسی کو نہیں"]
        ],
        answer: 0,
        why: ["Vehicles already on the roundabout have right of way.",
            "گول چکر میں پہلے سے موجود گاڑیوں کو حقِ اولیت ہوتا ہے۔"] },
    { id: "r7", cat: "Rules",
        q: ["Using a hand-held mobile phone while driving is:", "ڈرائیونگ کے دوران ہاتھ میں موبائل فون استعمال کرنا:"],
        options: [
            ["Allowed on empty roads", "خالی سڑک پر جائز ہے"],
            ["Allowed in traffic jams only", "صرف ٹریفک جام میں جائز ہے"],
            ["Dangerous and not allowed", "خطرناک اور ممنوع ہے"],
            ["Allowed for short calls", "مختصر کال کے لیے جائز ہے"]
        ],
        answer: 2,
        why: ["A phone takes your attention off the road. If you must talk, stop in a safe place.",
            "فون سے توجہ ہٹ جاتی ہے۔ ضرورت ہو تو محفوظ جگہ رک کر بات کریں۔"] },
    { id: "r8", cat: "Rules",
        q: ["Driving after drinking alcohol or taking drugs is:", "شراب یا نشہ کر کے گاڑی چلانا:"],
        options: [
            ["Fine if you feel okay", "ٹھیک محسوس ہو تو جائز"],
            ["Fine at night", "رات کو جائز"],
            ["Prohibited and very dangerous", "ممنوع اور انتہائی خطرناک"],
            ["Fine for short trips", "مختصر سفر میں جائز"]
        ],
        answer: 2,
        why: ["Alcohol and drugs slow your reactions. Never.",
            "نشہ ردعمل کی رفتار کم کر دیتا ہے۔ کبھی نہیں۔"] },
    { id: "r9", cat: "Rules",
        q: ["A solid line on your side of the road centre means:", "سڑک کے بیچ میں آپ کی طرف ٹھوس لکیر کا مطلب ہے:"],
        options: [
            ["You may overtake freely", "آزادانہ اوورٹیک کریں"],
            ["Do not cross it to overtake", "اسے عبور کر کے اوورٹیک نہ کریں"],
            ["Parking lane", "پارکنگ لین"],
            ["Bus lane only", "صرف بس لین"]
        ],
        answer: 1,
        why: ["A solid line means do not cross. A broken line allows it when it is safe.",
            "ٹھوس لکیر کا مطلب ہے عبور نہ کریں۔ ٹوٹی ہوئی لکیر میں محفوظ ہو تو اجازت ہوتی ہے۔"] },
    { id: "r10", cat: "Rules",
        q: ["When should you signal before turning?", "مڑنے سے پہلے سگنل کب دینا چاہیے؟"],
        options: [
            ["After you start turning", "مڑنا شروع کرنے کے بعد"],
            ["Early, before you turn or change lane", "مڑنے یا لین بدلنے سے پہلے ہی"],
            ["Only at night", "صرف رات کو"],
            ["Never in town", "شہر میں کبھی نہیں"]
        ],
        answer: 1,
        why: ["Signal early so the driver behind understands your plan.",
            "انڈیکیٹر پہلے دیں تاکہ پیچھے والے کو سمجھ آ جائے۔"] },
    // ---------- SAFETY ----------
    { id: "f1", cat: "Safety",
        q: ["Who must wear a seat belt?", "سیٹ بیلٹ کس کو باندھنی چاہیے؟"],
        options: [
            ["Only the driver", "صرف ڈرائیور"],
            ["Driver and all passengers (where fitted)", "ڈرائیور اور تمام مسافر (جہاں لگی ہو)"],
            ["Only front passenger", "صرف اگلی سیٹ کا مسافر"],
            ["Nobody in town", "شہر میں کسی کو نہیں"]
        ],
        answer: 1,
        why: ["A seat belt saves lives. Driver and all passengers should wear one.",
            "سیٹ بیلٹ جان بچاتی ہے۔ ڈرائیور اور سب مسافروں کو باندھنی چاہیے۔"] },
    { id: "f2", cat: "Safety",
        q: ["A good following distance is:", "آگے والی گاڑی سے مناسب فاصلہ ہے:"],
        options: [
            ["As close as possible", "جتنا ممکن ہو قریب"],
            ["At least a 2-second gap, more in rain", "کم از کم 2 سیکنڈ کا فاصلہ، بارش میں زیادہ"],
            ["Only 1 metre", "صرف 1 میٹر"],
            ["Bumper to bumper", "بمپر سے بمپر"]
        ],
        answer: 1,
        why: ["Two-second rule: when the car ahead passes a marker, you should pass it two counts later. Leave more in rain.",
            "دو سیکنڈ اصول: آگے والی گاڑی کسی نشان سے گزرے تو آپ دو گنتی بعد گزریں۔ بارش میں فاصلہ زیادہ رکھیں۔"] },
    { id: "f3", cat: "Safety",
        q: ["On a wet road you should:", "گیلی سڑک پر آپ کو کرنا چاہیے:"],
        options: [
            ["Brake hard", "زور سے بریک لگانا"],
            ["Reduce speed and brake gently", "رفتار کم کریں اور نرمی سے بریک لگائیں"],
            ["Speed up", "رفتار بڑھانا"],
            ["Use high beam", "ہائی بیم استعمال کرنا"]
        ],
        answer: 1,
        why: ["Tyres grip less on a wet road. Slow down and brake gently.",
            "گیلی سڑک پر ٹائر کی گرفت کم ہوتی ہے۔ آہستہ چلیں اور نرمی سے بریک لگائیں۔"] },
    { id: "f4", cat: "Safety",
        q: ["If you feel sleepy while driving, you should:", "ڈرائیونگ میں نیند محسوس ہو تو:"],
        options: [
            ["Turn up music and continue", "گانے تیز کر کے چلتے رہیں"],
            ["Stop in a safe place and rest", "محفوظ جگہ رک کر آرام کریں"],
            ["Drive faster to arrive early", "جلدی پہنچنے کے لیے تیز چلائیں"],
            ["Open the window and keep going", "کھڑکی کھول کر چلتے رہیں"]
        ],
        answer: 1,
        why: ["Drowsiness is extremely dangerous. Stop somewhere safe and rest.",
            "نیند سب سے خطرناک ہے۔ محفوظ جگہ رک کر آرام کریں۔"] },
    { id: "f5", cat: "Safety",
        q: ["Before changing lanes you should:", "لین بدلنے سے پہلے آپ کو کرنا چاہیے:"],
        options: [
            ["Only use the horn", "صرف ہارن بجانا"],
            ["Check mirror, signal, and check blind spot", "شیشہ دیکھیں، سگنل دیں اور بلائنڈ اسپاٹ چیک کریں"],
            ["Just speed up", "بس رفتار بڑھانا"],
            ["Close your eyes and go", "آنکھیں بند کر کے جانا"]
        ],
        answer: 1,
        why: ["Mirror, then signal, then blind spot (look over your shoulder), then change lane.",
            "شیشہ، پھر سگنل، پھر بلائنڈ اسپاٹ (کندھے کے اوپر سے دیکھیں)، اس کے بعد لین بدلیں۔"] },
    { id: "f6", cat: "Safety",
        q: ["Dipped (low) headlights should be used:", "ڈِپ (لو) ہیڈ لائٹس کب استعمال کرنی چاہئیں؟"],
        options: [
            ["When there is oncoming traffic at night", "رات کو سامنے سے ٹریفک آ رہی ہو"],
            ["Never", "کبھی نہیں"],
            ["Only in the day", "صرف دن میں"],
            ["Only on motorways", "صرف موٹروے پر"]
        ],
        answer: 0,
        why: ["High beam dazzles oncoming drivers. Use low beam when traffic is coming towards you.",
            "ہائی بیم سامنے والے کی آنکھوں کو چندھیا دیتی ہے۔ سامنے گاڑی ہو تو لو بیم رکھیں۔"] },
    { id: "f7", cat: "Safety",
        q: ["Hazard lights are used when:", "ہیزرڈ لائٹس کب استعمال ہوتی ہیں؟"],
        options: [
            ["You want to park anywhere", "جہاں چاہیں پارک کرنے کے لیے"],
            ["Your vehicle is broken down or a danger exists", "گاڑی خراب ہو یا خطرہ ہو"],
            ["Overtaking", "اوورٹیک کرتے وقت"],
            ["Turning left", "بائیں مڑتے وقت"]
        ],
        answer: 1,
        why: ["Hazard lights warn others of a breakdown or danger, not an excuse to park anywhere.",
            "ہیزرڈ (چاروں انڈیکیٹر) خرابی یا خطرے کی اطلاع کے لیے ہیں، پارکنگ کے بہانے کے لیے نہیں۔"] },
    { id: "f8", cat: "Safety",
        q: ["Before reversing you should:", "ریورس کرنے سے پہلے آپ کو کرنا چاہیے:"],
        options: [
            ["Look all around and reverse slowly", "چاروں طرف دیکھ کر آہستہ ریورس کریں"],
            ["Reverse quickly", "تیزی سے ریورس کریں"],
            ["Rely on horn only", "صرف ہارن پر بھروسا کریں"],
            ["Reverse with eyes forward", "سامنے دیکھتے ہوئے ریورس کریں"]
        ],
        answer: 0,
        why: ["A child or object may be behind you. Check mirrors, look over your shoulder, and reverse slowly.",
            "پیچھے بچہ یا کوئی چیز ہو سکتی ہے۔ شیشے دیکھیں، پیچھے مڑ کر دیکھیں اور آہستہ ریورس کریں۔"] },
    // ---------- SITUATIONS ----------
    { id: "t1", cat: "Situations",
        q: ["An ambulance with siren is behind you. You should:", "پیچھے سے سائرن بجاتی ایمبولینس آ رہی ہے۔ آپ کو کرنا چاہیے:"],
        options: [
            ["Speed up", "رفتار بڑھانا"],
            ["Move to the side safely and let it pass", "محفوظ طریقے سے ایک طرف ہو کر گزرنے دینا"],
            ["Stay in the middle", "بیچ سڑک میں رہنا"],
            ["Stop suddenly in the road", "اچانک سڑک پر رک جانا"]
        ],
        answer: 1,
        why: ["Give emergency vehicles way. Move to the side, stop if needed, but never brake suddenly.",
            "ایمبولینس کو راستہ دیں۔ کنارے ہو جائیں، ضرورت ہو تو رک جائیں مگر اچانک بریک نہ لگائیں۔"] },
    { id: "t2", cat: "Situations",
        q: ["A pedestrian is waiting at a zebra crossing. You should:", "زیبرا کراسنگ پر پیدل شخص انتظار کر رہا ہے۔ آپ کو کرنا چاہیے:"],
        options: [
            ["Honk and pass", "ہارن بجا کر گزرنا"],
            ["Slow down and give way", "رفتار کم کر کے راستہ دینا"],
            ["Overtake quickly", "جلدی سے اوورٹیک کرنا"],
            ["Ignore them", "نظر انداز کرنا"]
        ],
        answer: 1,
        why: ["Let pedestrians cross first at a zebra crossing.",
            "زیبرا کراسنگ پر پیدل شخص کو پہلے گزرنے دیں۔"] },
    { id: "t3", cat: "Situations",
        q: ["Parking is NOT allowed:", "پارکنگ کہاں منع ہے؟"],
        options: [
            ["Near a junction or bend", "چوراہے یا موڑ کے قریب"],
            ["In a marked bay", "نشان زدہ جگہ میں"],
            ["In your own driveway", "اپنے گھر کے راستے میں"],
            ["Where signs allow it", "جہاں نشان اجازت دے"]
        ],
        answer: 0,
        why: ["Don't park near junctions, bends, pedestrian crossings or in front of driveways.",
            "چوراہے، موڑ، پیدل کراسنگ اور گیراج کے سامنے گاڑی کھڑی نہ کریں۔"] },
    { id: "t4", cat: "Situations",
        q: ["Your car breaks down on the road. First you should:", "سڑک پر گاڑی خراب ہو جائے تو سب سے پہلے:"],
        options: [
            ["Stand in the road", "سڑک کے بیچ کھڑے ہوں"],
            ["Move it aside if possible, turn on hazard lights", "ممکن ہو تو ایک طرف کر کے ہیزرڈ لائٹس چلائیں"],
            ["Leave it with doors open", "دروازے کھلے چھوڑ دیں"],
            ["Sleep inside", "گاڑی میں سو جائیں"]
        ],
        answer: 1,
        why: ["Move to a safe edge, turn on hazard lights and place a warning triangle behind the car.",
            "محفوظ کنارے پر کریں، ہیزرڈ لائٹس چلائیں اور پیچھے وارننگ ٹرائی اینگل رکھیں۔"] },
    { id: "t5", cat: "Situations",
        q: ["In fog you should:", "دھند میں آپ کو کرنا چاہیے:"],
        options: [
            ["Use high beam", "ہائی بیم استعمال کریں"],
            ["Slow down and use low/fog lights", "رفتار کم کریں اور لو بیم یا فوگ لائٹس چلائیں"],
            ["Follow close behind another car", "دوسری گاڑی کے بہت قریب چلیں"],
            ["Overtake", "اوورٹیک کریں"]
        ],
        answer: 1,
        why: ["High beam reflects back in fog. Use low beam or fog lights and drive slowly.",
            "دھند میں ہائی بیم الٹا آنکھوں میں لگتی ہے۔ لو بیم یا فوگ لائٹ اور کم رفتار رکھیں۔"] },
    { id: "t6", cat: "Situations",
        q: ["Near hospitals and schools you should:", "ہسپتال اور اسکول کے قریب آپ کو کرنا چاہیے:"],
        options: [
            ["Drive slowly and avoid unnecessary horn", "آہستہ چلیں اور غیر ضروری ہارن سے بچیں"],
            ["Use horn a lot", "بہت ہارن بجائیں"],
            ["Race", "ریس لگائیں"],
            ["Park on the road", "سڑک پر پارک کریں"]
        ],
        answer: 0,
        why: ["Avoid noise in quiet zones and stay alert for children.",
            "خاموش علاقوں میں شور نہ کریں اور بچوں کی وجہ سے چوکس رہیں۔"] },
    { id: "t7", cat: "Situations",
        q: ["On a motorway, slow vehicles should normally use the:", "موٹروے پر آہستہ گاڑیاں عام طور پر کس لین میں چلیں؟"],
        options: [
            ["Right lane", "دائیں لین"],
            ["Left lane", "بائیں لین"],
            ["Any lane", "کوئی بھی لین"],
            ["Emergency lane", "ایمرجنسی لین"]
        ],
        answer: 1,
        why: ["Left lane is for slow traffic, right lane for overtaking. The emergency lane is for emergencies only.",
            "بائیں لین آہستہ گاڑیوں کے لیے اور دائیں لین اوورٹیک کے لیے ہے۔ ایمرجنسی لین صرف ہنگامی حالت میں۔"] },
    { id: "t8", cat: "Situations",
        q: ["Coming to a junction with no sign or signal, you should:", "ایسے چوراہے پر جہاں کوئی نشان یا سگنل نہ ہو:"],
        options: [
            ["Go fast", "تیز چلیں"],
            ["Slow down, look both ways, give way as needed", "آہستہ ہوں، دونوں طرف دیکھیں اور ضرورت پر راستہ دیں"],
            ["Honk and go", "ہارن دے کر گزر جائیں"],
            ["Close your eyes", "آنکھیں بند کر لیں"]
        ],
        answer: 1,
        why: ["Always slow down, look both ways and give way where needed.",
            "ہمیشہ آہستہ ہوں، دونوں طرف دیکھیں اور جہاں ضرورت ہو راستہ دیں۔"] },
];
const PRACTICAL = [
    { title: ["1. Getting in (cockpit check)", "۱۔ گاڑی میں بیٹھتے ہی (کاک پٹ چیک)"], items: [
            ["Adjust seat: pedals comfortable, back supported", "سیٹ ایڈجسٹ کریں: پیڈل آسانی سے پہنچیں، کمر کو سہارا ہو"],
            ["Set rear-view and side mirrors", "اندرونی اور سائیڈ شیشے سیٹ کریں"],
            ["Fasten seat belt", "سیٹ بیلٹ باندھیں"],
            ["Doors closed, check handbrake", "دروازے بند ہوں، ہینڈ بریک چیک کریں"],
            ["Start engine in neutral (manual)", "نیوٹرل میں انجن اسٹارٹ کریں (مینول)"],
        ] },
    { title: ["2. Moving off", "۲۔ گاڑی چلانا شروع کرنا"], items: [
            ["Mirror → signal → blind spot check", "شیشہ ← سگنل ← بلائنڈ اسپاٹ چیک"],
            ["Smooth clutch and accelerator, no jerk", "کلچ اور ایکسیلریٹر نرمی سے، جھٹکا نہ لگے"],
            ["Correct gear changes at the right time (manual)", "صحیح وقت پر درست گیئر تبدیل کریں (مینول)"],
        ] },
    { title: ["3. Road behaviour", "۳۔ سڑک پر رویہ"], items: [
            ["Keep left, stay in lane", "بائیں طرف رہیں، لین کی پابندی کریں"],
            ["Keep a safe following distance", "آگے والی گاڑی سے محفوظ فاصلہ رکھیں"],
            ["Signal early before turning or changing lane", "مڑنے یا لین بدلنے سے پہلے سگنل دیں"],
            ["Give way to pedestrians at zebra crossings", "زیبرا کراسنگ پر پیدل چلنے والوں کو راستہ دیں"],
            ["Stop fully at stop signs", "اسٹاپ سائن پر مکمل رکیں"],
            ["Give way at roundabouts and junctions", "گول چکر اور چوراہوں پر راستہ دیں"],
        ] },
    { title: ["4. Manoeuvres (what the examiner may ask)", "۴۔ مینوور (جو ایگزامنر کہہ سکتا ہے)"], items: [
            ["Reverse parking (in a straight line)", "ریورس پارکنگ (سیدھی لائن میں)"],
            ["Parallel parking", "پیرالل پارکنگ"],
            ["Hill start (no rolling back)", "چڑھائی پر گاڑی چلانا (پیچھے نہ لڑھکے)"],
            ["3-point turn / U-turn", "تھری پوائنٹ ٹرن / یو ٹرن"],
            ["Emergency stop (under control)", "ایمرجنسی اسٹاپ (قابو کے ساتھ)"],
        ] },
    { title: ["5. Test day", "۵۔ ٹیسٹ کا دن"], items: [
            ["Carry your documents (CNIC, learner permit, fee receipt; confirm the exact list with your licensing office)",
                "اپنے کاغذات ساتھ رکھیں (شناختی کارڈ، لرنر پرمٹ، فیس رسید؛ درست فہرست اپنے لائسنسنگ آفس سے پوچھ لیں)"],
            ["Arrive early and stay calm", "جلدی پہنچیں اور گھبرائیں نہیں"],
            ["Listen carefully to the examiner; ask if unsure", "ایگزامنر کی ہدایت غور سے سنیں؛ سمجھ نہ آئے تو پوچھیں"],
            ["Practise an hour before; sleep well the night before", "ایک گھنٹہ پہلے مشق کریں، رات کو پوری نیند لیں"],
        ] },
];
// ---------- Day-by-day plan ----------
const PLAN = [
    { date: "2026-11-06", task: ["Signs quiz (shapes and colours) + cockpit check practice", "سائنز کوئز (شکلیں اور رنگ) + کاک پٹ چیک کی مشق"] },
    { date: "2026-11-07", task: ["Rules quiz + keeping left, lane discipline", "رولز کوئز + بائیں طرف رہنا، لین کی پابندی"] },
    { date: "2026-11-08", task: ["Safety quiz + smooth moving off and clutch control", "سیفٹی کوئز + نرمی سے چلنا اور کلچ پر قابو"] },
    { date: "2026-11-09", task: ["Situations quiz + roundabouts and junctions", "سچویشنز کوئز + گول چکر اور چوراہے"] },
    { date: "2026-11-10", task: ["Redo weak questions + reverse parking", "کمزور سوالات دوبارہ + ریورس پارکنگ"] },
    { date: "2026-11-11", task: ["Full quiz (all topics) + parallel parking", "مکمل کوئز (سب موضوعات) + پیرالل پارکنگ"] },
    { date: "2026-11-12", task: ["Hill start + emergency stop", "چڑھائی پر اسٹارٹ + ایمرجنسی اسٹاپ"] },
    { date: "2026-11-13", task: ["Full quiz, aim for 80%+ + 3-point turn", "مکمل کوئز، ہدف 80٪ سے اوپر + تھری پوائنٹ ٹرن"] },
    { date: "2026-11-14", task: ["Weak questions + full mock drive like the examiner", "کمزور سوالات + ایگزامنر جیسی مکمل مشقی ڈرائیو"] },
    { date: "2026-11-15", task: ["Light revision + get documents ready", "ہلکی دہرائی + کاغذات تیار کریں"] },
    { date: "2026-11-16", task: ["Rest, short quiz only, sleep early", "آرام، صرف مختصر کوئز، جلدی سو جائیں"] },
    { date: "2026-11-17", task: ["Test day: documents, arrive early, stay calm", "ٹیسٹ کا دن: کاغذات، جلدی پہنچیں، گھبرائیں نہیں"] },
];
// ---------- Interface strings ----------
const UI = {
    title: ["Driving Test Prep", "ڈرائیونگ ٹیسٹ کی تیاری"],
    sub: ["Computer test + Practical test", "کمپیوٹر ٹیسٹ + پریکٹیکل ٹیسٹ"],
    date: ["17 November 2026", "۱۷ نومبر ۲۰۲۶"],
    daysLeft: ["days left", "دن باقی"],
    testToday: ["Test is today. Good luck!", "آج ٹیسٹ ہے، نیک تمنائیں!"],
    testDone: ["Test day has passed", "ٹیسٹ کا دن گزر چکا"],
    tabQuiz: ["Quiz", "کوئز"],
    tabPractical: ["Practical", "پریکٹیکل"],
    tabPlan: ["Plan", "پلان"],
    tabProgress: ["Progress", "پیش رفت"],
    topic: ["Topic", "موضوع"],
    count: ["Questions", "سوالات"],
    All: ["All topics", "تمام موضوعات"],
    Signs: ["Road signs", "نشانات"],
    Rules: ["Rules", "قوانین"],
    Safety: ["Safety", "حفاظت"],
    Situations: ["Situations", "صورتحال"],
    Weak: ["Weak questions", "کمزور سوالات"],
    start: ["Start", "شروع کریں"],
    hint: ["Pick a topic and press Start.", "موضوع چنیں اور شروع کریں دبائیں۔"],
    question: ["Question {a} of {b}", "سوال {a} از {b}"],
    next: ["Next question", "اگلا سوال"],
    seeResult: ["See result", "نتیجہ دیکھیں"],
    correct: ["Correct!", "درست!"],
    incorrect: ["Incorrect.", "غلط۔"],
    score: ["{a} of {b} correct", "{b} میں سے {a} درست"],
    msgHigh: ["Excellent! You are test-ready.", "بہت خوب! آپ ٹیسٹ کے لیے تیار ہیں۔"],
    msgMid: ["Good. A little more practice.", "اچھا، تھوڑی اور مشق کریں۔"],
    msgLow: ["Review the topics and try again.", "موضوعات دوبارہ دیکھیں اور پھر کوشش کریں۔"],
    weakSaved: ["{n} wrong answers were saved to Weak questions.", "{n} غلط جوابات \"کمزور سوالات\" میں محفوظ ہو گئے۔"],
    again: ["Try again", "دوبارہ کوئز"],
    noWeak: ["No weak questions yet. Take a quiz first!", "ابھی کوئی کمزور سوال نہیں۔ پہلے کوئز دیں!"],
    practicalNote: ["Tick each item after practising it in the car.", "ہر چیز گاڑی میں مشق کرنے کے بعد ٹک کریں۔"],
    planNote: ["A small daily plan until 17 November.", "۱۷ نومبر تک روزانہ کا مختصر پلان۔"],
    day: ["Day {n}", "دن {n}"],
    testDay: ["Test day", "ٹیسٹ کا دن"],
    solved: ["Questions solved", "حل شدہ سوالات"],
    accuracy: ["Accuracy", "درستی"],
    best: ["Best quiz score", "بہترین کوئز اسکور"],
    checklist: ["Practical checklist", "پریکٹیکل چیک لسٹ"],
    weakCount: ["Weak questions", "کمزور سوالات"],
    reset: ["Reset progress", "پیش رفت صاف کریں"],
    resetConfirm: ["All progress will be deleted. Sure?", "تمام پیش رفت ختم ہو جائے گی۔ یقین ہے؟"],
    footer: ["This is a practice tool. Confirm exact rules with your licensing office or the official guide.",
        "یہ مشق کا ٹول ہے۔ اصل قوانین اپنے لائسنسنگ آفس یا سرکاری گائیڈ سے ضرور تصدیق کریں۔"],
    langBtn: ["اردو", "English"],
    themeBtn: ["Switch theme", "تھیم تبدیل کریں"],
};
// ---------- Config ----------
const TEST_DATE = new Date("2026-11-17T00:00:00+05:00");
const STORE_KEY = "driving-prep-v2";
const LANG_KEY = "driving-prep-lang";
const THEME_KEY = "driving-prep-theme";
const defaultStore = () => ({ attempts: 0, correct: 0, wrong: [], best: 0, checks: {}, planDone: {} });
function lsGet(k) { try {
    return localStorage.getItem(k);
}
catch {
    return null;
} }
function lsSet(k, v) { try {
    localStorage.setItem(k, v);
}
catch { /* ignore */ } }
function load() {
    try {
        const raw = lsGet(STORE_KEY);
        return raw ? { ...defaultStore(), ...JSON.parse(raw) } : defaultStore();
    }
    catch {
        return defaultStore();
    }
}
let store = load();
const save = () => lsSet(STORE_KEY, JSON.stringify(store));
// ---------- Language ----------
let lang = 0; // 0 = English, 1 = Urdu
const $ = (id) => document.getElementById(id);
function tx(key, vars = {}) {
    let s = UI[key][lang];
    for (const k of Object.keys(vars))
        s = s.split(`{${k}}`).join(String(vars[k]));
    return s;
}
function fmt(n) {
    return lang === 1 ? n.toLocaleString("ur-PK", { useGrouping: false }) : String(n);
}
const pct = (n) => (lang === 1 ? `${fmt(n)}٪` : `${n}%`);
const LETTERS = [["A", "B", "C", "D"], ["الف", "ب", "ج", "د"]];
function applyLang() {
    const html = document.documentElement;
    html.lang = lang === 1 ? "ur" : "en";
    html.dir = lang === 1 ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.textContent = UI[el.dataset.i18n][lang];
    });
    $("theme").setAttribute("aria-label", tx("themeBtn"));
    document.title = tx("title");
}
function toggleLang() {
    lang = lang === 0 ? 1 : 0;
    lsSet(LANG_KEY, String(lang));
    applyLang();
    renderAll();
}
// ---------- Theme ----------
function applyTheme(t) { document.documentElement.dataset.theme = t; }
function toggleTheme() {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    lsSet(THEME_KEY, next);
}
// ---------- Countdown ----------
function renderCountdown() {
    const days = Math.ceil((TEST_DATE.getTime() - Date.now()) / 86400000);
    if (days > 0) {
        $("cd-num").textContent = fmt(days);
        $("cd-label").textContent = tx("daysLeft");
    }
    else {
        $("cd-num").textContent = "✓";
        $("cd-label").textContent = days === 0 ? tx("testToday") : tx("testDone");
    }
}
// ---------- Tabs ----------
let currentTab = "quiz";
function showTab(name) {
    currentTab = name;
    document.querySelectorAll(".panel").forEach(p => (p.hidden = p.id !== `tab-${name}`));
    document.querySelectorAll(".tabs button").forEach(b => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
    if (name === "progress")
        renderProgress();
}
let view = "idle";
let run = [];
let pos = 0;
let score = 0;
let picked = null; // position the user picked
let runWrong = 0;
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
function startQuiz() {
    const cat = $("cat").value;
    const count = Number($("count").value);
    let pool = QUESTIONS;
    if (cat === "Weak")
        pool = QUESTIONS.filter(q => store.wrong.includes(q.id));
    else if (cat !== "All")
        pool = QUESTIONS.filter(q => q.cat === cat);
    if (pool.length === 0) {
        view = "noweak";
        renderQuiz();
        return;
    }
    run = shuffle(pool).slice(0, count).map(q => ({ q, order: shuffle(q.options.map((_, i) => i)) }));
    pos = 0;
    score = 0;
    runWrong = 0;
    picked = null;
    view = "question";
    renderQuiz();
}
function renderQuiz() {
    const area = $("quiz-area");
    if (view === "idle") {
        area.innerHTML = `<p class="note">${tx("hint")}</p>`;
        return;
    }
    if (view === "noweak") {
        area.innerHTML = `<p class="note">${tx("noWeak")}</p>`;
        return;
    }
    if (view === "result") {
        renderResult();
        return;
    }
    const { q, order } = run[pos];
    const correctPos = order.indexOf(q.answer);
    const opts = order.map((orig, i) => {
        let cls = "opt";
        if (picked !== null) {
            if (i === correctPos)
                cls += " right";
            else if (i === picked)
                cls += " wrong";
        }
        return `<button class="${cls}" data-i="${i}" ${picked !== null ? "disabled" : ""}>
      <span class="letter">${LETTERS[lang][i]}</span><span>${q.options[orig][lang]}</span></button>`;
    }).join("");
    const feedback = picked === null ? "" :
        `<div class="why ${picked === correctPos ? "ok" : "bad"}"><strong>${picked === correctPos ? tx("correct") : tx("incorrect")}</strong> ${q.why[lang]}</div>
     <button id="next" class="primary block">${pos === run.length - 1 ? tx("seeResult") : tx("next")}</button>`;
    area.innerHTML = `
    <div class="meta"><span>${tx("question", { a: fmt(pos + 1), b: fmt(run.length) })}</span><span class="tag">${UI[q.cat][lang]}</span></div>
    <div class="bar"><div style="width:${((pos + (picked !== null ? 1 : 0)) / run.length) * 100}%"></div></div>
    <div class="qwrap${q.sign ? " has-sign" : ""}">
      ${q.sign ? `<div class="sign">${q.sign}</div>` : ""}
      <div><h2 class="q">${q.q[lang]}</h2><div class="opts">${opts}</div></div>
    </div>
    ${feedback}`;
    document.querySelectorAll(".opt").forEach(b => b.addEventListener("click", () => pickAnswer(Number(b.dataset.i))));
    const next = document.getElementById("next");
    if (next)
        next.addEventListener("click", () => {
            picked = null;
            pos++;
            if (pos < run.length)
                renderQuiz();
            else {
                view = "result";
                renderQuiz();
            }
        });
}
function pickAnswer(i) {
    if (picked !== null)
        return;
    picked = i;
    const { q, order } = run[pos];
    const ok = i === order.indexOf(q.answer);
    store.attempts++;
    if (ok) {
        score++;
        store.correct++;
        store.wrong = store.wrong.filter(id => id !== q.id);
    }
    else {
        runWrong++;
        if (!store.wrong.includes(q.id))
            store.wrong.push(q.id);
    }
    save();
    renderQuiz();
}
function renderResult() {
    const p = Math.round((score / run.length) * 100);
    if (p > store.best) {
        store.best = p;
        save();
    }
    const msg = p >= 80 ? tx("msgHigh") : p >= 60 ? tx("msgMid") : tx("msgLow");
    $("quiz-area").innerHTML = `
    <div class="result">
      <div class="ring" style="--p:${p}"><span>${pct(p)}</span></div>
      <p class="score">${tx("score", { a: fmt(score), b: fmt(run.length) })}</p>
      <p>${msg}</p>
      ${runWrong ? `<p class="note">${tx("weakSaved", { n: fmt(runWrong) })}</p>` : ""}
      <button id="again" class="primary">${tx("again")}</button>
    </div>`;
    $("again").addEventListener("click", startQuiz);
}
// ---------- Practical checklist ----------
function renderPractical() {
    $("practical-area").innerHTML = PRACTICAL.map((g, gi) => {
        const done = g.items.filter((_, ii) => store.checks[`${gi}-${ii}`]).length;
        return `<section class="card">
      <div class="card-head"><h3>${g.title[lang]}</h3><span class="chip">${fmt(done)}/${fmt(g.items.length)}</span></div>
      ${g.items.map((it, ii) => {
            const key = `${gi}-${ii}`;
            return `<label class="check"><input type="checkbox" data-key="${key}" ${store.checks[key] ? "checked" : ""}/><span>${it[lang]}</span></label>`;
        }).join("")}
    </section>`;
    }).join("");
    document.querySelectorAll("#practical-area input").forEach(c => c.addEventListener("change", () => { store.checks[c.dataset.key] = c.checked; save(); renderPractical(); }));
}
// ---------- Plan ----------
function renderPlan() {
    const today = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Karachi" });
    const months = lang === 1 ? "نومبر" : "Nov";
    $("plan-area").innerHTML = PLAN.map((p, i) => {
        const title = i === PLAN.length - 1 ? tx("testDay") : tx("day", { n: fmt(i + 1) });
        const dd = Number(p.date.slice(8));
        return `<label class="check plan ${p.date === today ? "today" : ""}">
      <input type="checkbox" data-date="${p.date}" ${store.planDone[p.date] ? "checked" : ""}/>
      <span><strong>${title}</strong> <small>${fmt(dd)} ${months}</small><br/>${p.task[lang]}</span>
    </label>`;
    }).join("");
    document.querySelectorAll("#plan-area input").forEach(c => c.addEventListener("change", () => { store.planDone[c.dataset.date] = c.checked; save(); }));
}
// ---------- Progress ----------
function renderProgress() {
    const acc = store.attempts ? Math.round((store.correct / store.attempts) * 100) : 0;
    const items = Object.values(store.checks).filter(Boolean).length;
    const total = PRACTICAL.reduce((n, g) => n + g.items.length, 0);
    const stat = (v, k) => `<div class="stat"><b>${v}</b><span>${tx(k)}</span></div>`;
    $("progress-area").innerHTML = `
    <div class="stats">
      ${stat(fmt(store.attempts), "solved")}
      ${stat(pct(acc), "accuracy")}
      ${stat(pct(store.best), "best")}
      ${stat(`${fmt(items)}/${fmt(total)}`, "checklist")}
      ${stat(fmt(store.wrong.length), "weakCount")}
    </div>
    <button id="reset" class="ghost">${tx("reset")}</button>`;
    $("reset").addEventListener("click", () => {
        if (confirm(tx("resetConfirm"))) {
            store = defaultStore();
            save();
            view = "idle";
            renderAll();
        }
    });
}
// ---------- Init ----------
function renderAll() {
    renderCountdown();
    renderQuiz();
    renderPractical();
    renderPlan();
    if (currentTab === "progress")
        renderProgress();
}
function init() {
    lang = lsGet(LANG_KEY) === "1" ? 1 : 0;
    const saved = lsGet(THEME_KEY);
    applyTheme(saved ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    document.querySelectorAll(".tabs button").forEach(b => b.addEventListener("click", () => showTab(b.dataset.tab)));
    $("start").addEventListener("click", startQuiz);
    $("lang").addEventListener("click", toggleLang);
    $("theme").addEventListener("click", toggleTheme);
    applyLang();
    renderAll();
    setInterval(renderCountdown, 60000);
    showTab("quiz");
}
document.addEventListener("DOMContentLoaded", init);
