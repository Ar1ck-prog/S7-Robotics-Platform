const STORAGE_KEY = 's7-platform-mvp-data-v3';
const SESSION_KEY = 's7-platform-session';
const LANG_KEY = 's7-platform-lang';
const Core = window.S7Core;

const I18N = {
  ru: {
    navStudentDashboard: 'Дашборд',
    navCourses: 'Каталог курсов',
    navLeaderboard: 'Рейтинг',
    navWiki: 'Справочник',
    navMentor: 'Центр ментора',
    studentRole: 'Ученик',
    mentorRole: 'Ментор',
    mentorTitle: 'Кабинет ментора',
    mentorEyebrow: 'Группы, ревью и прогресс',
    lessonTitle: 'Интерактивный урок',
    lessonEyebrow: 'Обучение',
    minuteShort: 'мин',
    coursesTitle: 'Каталог курсов',
    coursesEyebrow: 'Выбор программы',
    openCourse: 'Начать / Открыть',
    lessonPrefix: 'Урок',
    compilerLoaded: 'Код урока загружен. Нажмите компиляцию.',
    courseUnit: 'курс(а)',
    projectUnit: 'проект(а)',
    allReviewed: 'Все работы проверены. Можно посмотреть учеников в зоне риска.',
    pendingBadge: 'Ожидает проверки',
    reviewHint: 'Обратная связь ученику',
    approve: 'Одобрить (+50 XP)',
    reject: 'Вернуть на доработку',
    unknownStudent: 'Неизвестный ученик',
    unknownCourse: 'Неизвестный курс',
    risk: 'Риск',
    ok: 'В норме'
  },
  kk: {
    navStudentDashboard: 'Басқару панелі',
    navCourses: 'Курстар каталогы',
    navLeaderboard: 'Рейтинг',
    navWiki: 'Анықтамалық',
    navMentor: 'Ментор орталығы',
    studentRole: 'Оқушы',
    mentorRole: 'Ментор',
    mentorTitle: 'Ментор кабинеті',
    mentorEyebrow: 'Топтар, ревью және прогресс',
    lessonTitle: 'Интерактивті сабақ',
    lessonEyebrow: 'Оқу',
    minuteShort: 'мин',
    coursesTitle: 'Курстар каталогы',
    coursesEyebrow: 'Бағдарламаны таңдау',
    openCourse: 'Бастау / Ашу',
    lessonPrefix: 'Сабақ',
    compilerLoaded: 'Сабақ коды жүктелді. Компиляцияны басыңыз.',
    courseUnit: 'курс',
    projectUnit: 'жоба',
    allReviewed: 'Барлық жұмыстар тексерілді. Енді тәуекелдегі оқушыларды қарауға болады.',
    pendingBadge: 'Тексеруді күтуде',
    reviewHint: 'Оқушыға кері байланыс',
    approve: 'Қабылдау (+50 XP)',
    reject: 'Қайта тапсыруға қайтару',
    unknownStudent: 'Белгісіз оқушы',
    unknownCourse: 'Белгісіз курс',
    risk: 'Тәуекел',
    ok: 'Жақсы'
  },
  en: {
    navStudentDashboard: 'Dashboard',
    navCourses: 'Course catalog',
    navLeaderboard: 'Leaderboard',
    navWiki: 'Wiki',
    navMentor: 'Mentor center',
    studentRole: 'Student',
    mentorRole: 'Mentor',
    mentorTitle: 'Mentor workspace',
    mentorEyebrow: 'Groups, reviews and progress',
    lessonTitle: 'Interactive lesson',
    lessonEyebrow: 'Learning',
    minuteShort: 'min',
    coursesTitle: 'Course catalog',
    coursesEyebrow: 'Program selection',
    openCourse: 'Start / Open',
    lessonPrefix: 'Lesson',
    compilerLoaded: 'Lesson code loaded. Run compilation.',
    courseUnit: 'course(s)',
    projectUnit: 'project(s)',
    allReviewed: 'All submissions are reviewed. You can focus on students at risk.',
    pendingBadge: 'Waiting for review',
    reviewHint: 'Feedback for the student',
    approve: 'Approve (+50 XP)',
    reject: 'Return for improvement',
    unknownStudent: 'Unknown student',
    unknownCourse: 'Unknown course',
    risk: 'Risk',
    ok: 'On track'
  }
};

const TEXT_TRANSLATIONS = {
  kk: {
    'Кабинет ученика': 'Оқушы кабинеті',
    'Обзор': 'Шолу',
    'Старт/Пауза': 'Бастау/Үзіліс',
    'Сбросить': 'Қалпына келтіру',
    'Темная тема': 'Қараңғы режим',
    'Уведомления': 'Хабарламалар',
    'Проект принят': 'Жоба қабылданды',
    'Ментор одобрил вашу работу. +50 XP!': 'Ментор жұмысыңызды қабылдады. +50 XP!',
    'Новый курс': 'Жаңа курс',
    'Доступен курс "Умный дом ESP32"': '"ESP32 ақылды үй" курсы қолжетімді',
    'Мой Профиль': 'Менің профилім',
    'роль': 'рөл',
    'Выйти': 'Шығу',
    'Опыт (XP)': 'Тәжірибе (XP)',
    'Задания и бонусы': 'Тапсырмалар мен бонустар',
    'Уровень': 'Деңгей',
    'Ранг:': 'Дәреже:',
    'Новичок': 'Жаңадан бастаушы',
    'Ударный режим': 'Үздіксіз оқу',
    'Дней подряд': 'Күн қатарынан',
    'Продолжить обучение': 'Оқуды жалғастыру',
    'Все курсы': 'Барлық курстар',
    'Ваши достижения': 'Жетістіктеріңіз',
    'Бот Борис': 'Борис боты',
    'Привет! Выполни миссии на сегодня, чтобы получить бонусы.': 'Сәлем! Бүгінгі миссияларды орындап, бонус ал.',
    'Ежедневные миссии': 'Күнделікті миссиялар',
    'Магазин наград': 'Марапаттар дүкені',
    'К курсам': 'Курстарға',
    '+50 XP за проект': '+50 XP жоба үшін',
    'Название урока': 'Сабақ атауы',
    'Видеоинструкция (Сборка)': 'Бейненұсқаулық (құрастыру)',
    'Виртуальная лаборатория Wokwi': 'Wokwi виртуалды зертханасы',
    'Теория и задание': 'Теория және тапсырма',
    '📌 Ваше задание:': '📌 Сіздің тапсырмаңыз:',
    'Схема подключения': 'Қосу схемасы',
    'Код (Python / C++)': 'Код (Python / C++)',
    'Компилятор и Vercel Sandbox': 'Компилятор және Vercel Sandbox',
    'Проверка синтаксиса без выполнения проекта вместо ученика': 'Оқушының орнына жобаны орындамай, синтаксисті тексеру',
    'Язык': 'Тіл',
    'Запустить компиляцию': 'Компиляцияны іске қосу',
    'Взять код урока': 'Сабақ кодын алу',
    'Вставьте код для проверки...': 'Тексеру үшін кодты қойыңыз...',
    'В production код уходит в изолированную Vercel Sandbox function: контейнер без доступа к файлам ученика, с лимитом времени и памяти.': 'Production режимінде код оқшауланған Vercel Sandbox function ішіне жіберіледі: оқушы файлдарына қолжетімсіз, уақыт пен жад лимиті бар контейнер.',
    'Ожидаю код...': 'Код күтілуде...',
    'Код урока загружен. Нажмите компиляцию.': 'Сабақ коды жүктелді. Компиляцияны басыңыз.',
    'Сдача проекта': 'Жобаны тапсыру',
    'Ссылка на видео работы': 'Жұмыс видеосына сілтеме',
    'Ваш код': 'Сіздің кодыңыз',
    'Что получилось и что было сложно': 'Не шықты және не қиын болды',
    'Коротко опишите результат эксперимента...': 'Эксперимент нәтижесін қысқаша сипаттаңыз...',
    'AI Проверка кода перед сдачей': 'Тапсыру алдындағы AI код тексерісі',
    'Отправить ментору': 'Менторға жіберу',
    'Работ на проверку': 'Тексерілетін жұмыстар',
    'Требуют внимания': 'Назар қажет',
    'Ученики': 'Оқушылар',
    'Активные аккаунты': 'Белсенді аккаунттар',
    'Принято проектов': 'Қабылданған жобалар',
    'За всё время': 'Барлық уақыт',
    'Средний SLA проверки': 'Орташа тексеру SLA',
    'Цель: дать фидбек в течение урока': 'Мақсат: сабақ ішінде фидбек беру',
    'Ученики в зоне риска': 'Тәуекелдегі оқушылар',
    'Мало прогресса или нет сдач': 'Прогресс аз немесе тапсыру жоқ',
    'Качество фидбека': 'Фидбек сапасы',
    'Есть конкретная подсказка и следующий шаг': 'Нақты кеңес және келесі қадам бар',
    'Проекты на проверку': 'Тексерілетін жобалар',
    'Приоритет по очереди': 'Кезек бойынша басымдық',
    'Прогресс учеников': 'Оқушылар прогресі',
    'Группы и нагрузка': 'Топтар және жүктеме',
    'Быстрые шаблоны фидбека': 'Жылдам фидбек үлгілері',
    'Справочник инженера (Wiki)': 'Инженер анықтамалығы (Wiki)',
    'Рейтинг учеников': 'Оқушылар рейтингі',
    'Топ за неделю': 'Апта үздіктері'
  },
  en: {
    'Кабинет ученика': 'Student dashboard',
    'Обзор': 'Overview',
    'Старт/Пауза': 'Start/Pause',
    'Сбросить': 'Reset',
    'Темная тема': 'Dark mode',
    'Уведомления': 'Notifications',
    'Проект принят': 'Project approved',
    'Ментор одобрил вашу работу. +50 XP!': 'The mentor approved your work. +50 XP!',
    'Новый курс': 'New course',
    'Доступен курс "Умный дом ESP32"': '"ESP32 Smart Home" course is available',
    'Мой Профиль': 'My profile',
    'роль': 'role',
    'Выйти': 'Log out',
    'Опыт (XP)': 'Experience (XP)',
    'Задания и бонусы': 'Tasks and bonuses',
    'Уровень': 'Level',
    'Ранг:': 'Rank:',
    'Новичок': 'Beginner',
    'Ударный режим': 'Streak',
    'Дней подряд': 'Days in a row',
    'Продолжить обучение': 'Continue learning',
    'Все курсы': 'All courses',
    'Ваши достижения': 'Your achievements',
    'Бот Борис': 'Boris bot',
    'Привет! Выполни миссии на сегодня, чтобы получить бонусы.': 'Hi! Complete today’s missions to earn bonuses.',
    'Ежедневные миссии': 'Daily missions',
    'Магазин наград': 'Reward shop',
    'К курсам': 'Back to courses',
    '+50 XP за проект': '+50 XP for project',
    'Название урока': 'Lesson title',
    'Видеоинструкция (Сборка)': 'Video guide (Assembly)',
    'Виртуальная лаборатория Wokwi': 'Wokwi virtual lab',
    'Теория и задание': 'Theory and task',
    '📌 Ваше задание:': '📌 Your task:',
    'Схема подключения': 'Wiring diagram',
    'Код (Python / C++)': 'Code (Python / C++)',
    'Компилятор и Vercel Sandbox': 'Compiler and Vercel Sandbox',
    'Проверка синтаксиса без выполнения проекта вместо ученика': 'Syntax checking without completing the project for the student',
    'Язык': 'Language',
    'Запустить компиляцию': 'Run compilation',
    'Взять код урока': 'Load lesson code',
    'Вставьте код для проверки...': 'Paste code to check...',
    'В production код уходит в изолированную Vercel Sandbox function: контейнер без доступа к файлам ученика, с лимитом времени и памяти.': 'In production, code goes to an isolated Vercel Sandbox function: a time and memory limited container without access to student files.',
    'Ожидаю код...': 'Waiting for code...',
    'Код урока загружен. Нажмите компиляцию.': 'Lesson code loaded. Run compilation.',
    'Сдача проекта': 'Project submission',
    'Ссылка на видео работы': 'Work video link',
    'Ваш код': 'Your code',
    'Что получилось и что было сложно': 'What worked and what was difficult',
    'Коротко опишите результат эксперимента...': 'Briefly describe the experiment result...',
    'AI Проверка кода перед сдачей': 'AI code check before submission',
    'Отправить ментору': 'Send to mentor',
    'Работ на проверку': 'Works to review',
    'Требуют внимания': 'Need attention',
    'Ученики': 'Students',
    'Активные аккаунты': 'Active accounts',
    'Принято проектов': 'Approved projects',
    'За всё время': 'All time',
    'Средний SLA проверки': 'Average review SLA',
    'Цель: дать фидбек в течение урока': 'Goal: give feedback during the lesson',
    'Ученики в зоне риска': 'Students at risk',
    'Мало прогресса или нет сдач': 'Low progress or no submissions',
    'Качество фидбека': 'Feedback quality',
    'Есть конкретная подсказка и следующий шаг': 'Specific hint and next step included',
    'Проекты на проверку': 'Projects to review',
    'Приоритет по очереди': 'Queue priority',
    'Прогресс учеников': 'Student progress',
    'Группы и нагрузка': 'Groups and workload',
    'Быстрые шаблоны фидбека': 'Quick feedback templates',
    'Справочник инженера (Wiki)': 'Engineer wiki',
    'Рейтинг учеников': 'Student leaderboard',
    'Топ за неделю': 'Weekly top'
  }
};

const originalTextNodes = new WeakMap();

let currentLang = localStorage.getItem(LANG_KEY) || 'ru';
function t(key) {
  return (I18N[currentLang] || I18N.ru)[key] || I18N.ru[key] || key;
}

function translatePhrase(value) {
  if (currentLang === 'ru') return value;
  return TEXT_TRANSLATIONS[currentLang]?.[value] || value;
}

function translateStatic(root = document.body) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ['SCRIPT', 'STYLE', 'CODE', 'PRE', 'TEXTAREA', 'OPTION'].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return node.nodeValue.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach((node) => {
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
    const original = originalTextNodes.get(node);
    const trimmed = original.trim();
    const translated = translatePhrase(trimmed);
    node.nodeValue = original.replace(trimmed, translated);
  });
  root.querySelectorAll('[placeholder],[title]').forEach((el) => {
    ['placeholder', 'title'].forEach((attr) => {
      if (!el.hasAttribute(attr)) return;
      const key = `original${attr[0].toUpperCase()}${attr.slice(1)}`;
      if (!el.dataset[key]) el.dataset[key] = el.getAttribute(attr);
      el.setAttribute(attr, translatePhrase(el.dataset[key]));
    });
  });
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.innerText = value;
}

const NAV_ITEMS = {
  student: [
    { id: 'student-dashboard', labelKey: 'navStudentDashboard', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>' },
    { id: 'course-catalog', labelKey: 'navCourses', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>' },
    { id: 'leaderboard', labelKey: 'navLeaderboard', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
    { id: 'wiki', labelKey: 'navWiki', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>' }
  ],
  mentor: [
    { id: 'mentor-dashboard', labelKey: 'navMentor', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>' }
  ]
};

const INITIAL_DATA = {
  users: [
    { id: 1, email: 'student@s7.kz', password: '1234', role: 'student', name: 'Алихан Ермек', level: 1, xp: 0, streak: 3 },
    { id: 2, email: 'mentor@s7.kz', password: '1234', role: 'mentor', name: 'Ментор S7' },
    { id: 3, email: 's2@s7.kz', password: '1234', role: 'student', name: 'Ерасыл Серік', level: 2, xp: 150, streak: 5 },
    { id: 4, email: 's3@s7.kz', password: '1234', role: 'student', name: 'Аяулым Марат', level: 1, xp: 80, streak: 2 }
  ],
  courses: [
    { id: 101, title: 'Arduino Robotics', desc: 'Основы электроники и программирования на C++', totalLessons: 12 },
    { id: 102, title: 'LEGO SPIKE Prime', desc: 'Сборка и программирование на Python', totalLessons: 10 },
    { id: 103, title: 'ESP32 IoT', desc: 'Интернет вещей и умные устройства', totalLessons: 8 },
  ],
  studentProgress: {
    1: { 101: 1, 102: 1 } 
  },
  lessons: {
    101: [
      {
        number: 1,
        title: 'Ультразвуковой датчик HC-SR04',
        video: 'https://www.youtube.com/embed/tPEE9ZwTmy0',
        wokwiId: '322233630654874194',
        theory: 'Ультразвуковой датчик измеряет расстояние до объекта, испуская звуковые импульсы и замеряя время их возврата. Это базовый элемент зрения вашего робота. С его помощью робот может видеть препятствия и объезжать их.',
        schema: 'VCC -> 5V<br>GND -> GND<br>Trig -> Pin 9<br>Echo -> Pin 10',
        code: `long duration;\nint distance;\n\nvoid setup() {\n  pinMode(9, OUTPUT); // Trig\n  pinMode(10, INPUT);  // Echo\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  digitalWrite(9, LOW);\n  delayMicroseconds(2);\n  digitalWrite(9, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(9, LOW);\n  \n  duration = pulseIn(10, HIGH);\n  distance = duration * 0.034 / 2;\n  \n  Serial.println(distance);\n  delay(100);\n}`,
        task: 'Соберите схему в Wokwi или в жизни по видеоинструкции, загрузите код и добейтесь, чтобы монитор порта выводил правильное расстояние в сантиметрах.'
      }
    ],
    102: [
      {
        number: 1,
        title: 'Сборка робота-грузоподъёмника',
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        theory: 'Сегодня мы собираем робота-грузоподъёмника (Forklift). Он использует средний мотор для подъема вил и два больших мотора для движения. Наша цель — запрограммировать его на Python для автоматического захвата и переноса груза.',
        schema: 'Левый мотор -> Порт A<br>Правый мотор -> Порт B<br>Подъемный мотор -> Порт C<br>Датчик расстояния -> Порт D',
        code: `import hub\nfrom spike import PrimeHub, MotorPair, Motor\n\nhub = PrimeHub()\nbase = MotorPair('A', 'B')\nlift = Motor('C')\n\n# Опускаем вилы\nlift.run_for_degrees(-90, 50)\n\n# Едем к грузу\nbase.move(20, 'cm', 0, 50)\n\n# Поднимаем груз\nlift.run_for_degrees(90, 50)\n\n# Возвращаемся\nbase.move(-20, 'cm', 0, 50)`,
        task: 'Соберите грузоподъемник по видео. Скопируйте Python код в приложение SPIKE. Измените код так, чтобы робот останавливался ровно перед грузом, используя датчик расстояния, а затем поднимал его. Снимите видео вашей работы и отправьте ментору.'
      },
      {
        number: 2,
        title: 'Движение по линии на Python',
        video: 'https://www.youtube.com/embed/j1_aDq_jMjc',
        theory: 'Для движения по линии мы будем использовать датчик цвета. Мы напишем пропорциональный (P) регулятор на Python, который позволит роботу двигаться плавно.',
        schema: 'Моторы -> Порты A и B<br>Датчик цвета -> Порт E (направлен вниз)',
        code: `from spike import PrimeHub, MotorPair, ColorSensor\n\nhub = PrimeHub()\nbase = MotorPair('A', 'B')\nsensor = ColorSensor('E')\n\nTARGET = 50  # граница между белым и черным\nKp = 0.8\n\nwhile True:\n    error = TARGET - sensor.get_reflected_light()\n    correction = int(error * Kp)\n    base.start(correction, 30)`,
        task: 'Настройте значение Kp. Если робот дергается — уменьшите Kp (например, 0.4). Снимите видео, как робот уверенно проходит трассу, и отправьте ментору.'
      }
    ]
  },
  submissions: []
};

let state = null;
let currentUser = null;
let currentView = '';
let currentParams = {};

// --- SVGs ---
const svgs = {
  rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>`,
  sparkle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`,
  badge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15l-2 5-9-5 9-5 2 5z"></path><path d="M12 15l2 5 9-5-9-5-2 5z"></path></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="vertical-align:-3px;margin-right:8px;color:#ef4444"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
  success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="vertical-align:-3px;margin-right:8px;color:#10b981"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  loading: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="vertical-align:-3px;margin-right:8px;" class="anim-spin"><circle cx="12" cy="12" r="10"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>`,
  hint: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="vertical-align:-3px;margin-right:8px;color:#f59e0b"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-7 7c0 2 1 3 2 4.5 1.5 2 1.5 2.5 1.5 4.5h7c0-2 0-2.5 1.5-4.5 1-1.5 2-2.5 2-4.5a7 7 0 0 0-7-7z"/></svg>`
};

// --- Features State ---
let isDarkTheme = localStorage.getItem('s7-dark-theme') === 'true';
let pomodoroState = { active: false, timeLeft: 25 * 60, interval: null };

// --- Init ---
function loadData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      state = Core.ensureStateShape(JSON.parse(saved));
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      state = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveData();
    }
  } else {
    state = JSON.parse(JSON.stringify(INITIAL_DATA));
    saveData();
  }
}

function saveData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function initApp() {
  loadData();
  document.documentElement.lang = currentLang === 'kk' ? 'kk' : currentLang;
  
  if (isDarkTheme) document.body.classList.add('dark-mode');

  // Landing Page Listeners
  document.getElementById('btnGoAuth').onclick = () => showAuth('login');
  document.getElementById('btnStartLearning').onclick = () => showAuth('register', 'student');
  document.getElementById('btnBecomeMentor').onclick = () => showAuth('register', 'mentor');
  document.getElementById('btnBackToLanding').onclick = showLanding;
  document.getElementById('btnLoginMode').onclick = () => setAuthMode('login');
  document.getElementById('btnRegisterMode').onclick = () => setAuthMode('register');
  document.getElementById('registerRole').onchange = updateMentorCodeVisibility;
  const langSelect = document.getElementById('languageSelect');
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.onchange = (event) => {
      currentLang = event.target.value;
      localStorage.setItem(LANG_KEY, currentLang);
      document.documentElement.lang = currentLang === 'kk' ? 'kk' : currentLang;
      renderNav();
      if (currentView) navigate(currentView, currentParams);
      translateStatic(document.body);
    };
  }

  // Features Listeners
  document.getElementById('btnThemeToggle').onclick = () => {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-mode', isDarkTheme);
    localStorage.setItem('s7-dark-theme', isDarkTheme);
  };

  document.getElementById('btnNotifications').onclick = () => { const dd = document.getElementById('notificationsDropdown'); dd.hidden = !dd.hidden; document.getElementById('notifCount').hidden = true; };

  document.getElementById('btnTimerToggle').onclick = togglePomodoro; document.getElementById('btnTimerReset').onclick = () => { pomodoroState.active = false; pomodoroState.timeLeft = 25 * 60; document.getElementById('timerDisplay').innerText = '25:00'; clearInterval(pomodoroState.interval); document.getElementById('btnTimerToggle').innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="12"><polygon points="5 3 19 12 5 21 5 3"/></svg>`; };

  const sessionId = localStorage.getItem(SESSION_KEY);
  if (sessionId) {
    currentUser = state.users.find(u => u.id == sessionId);
    if (currentUser) {
      showAppShell();
      return;
    }
  }
  showLanding();
}

function togglePomodoro() {
  const btn = document.getElementById('btnTimerToggle');
  const display = document.getElementById('timerDisplay');
  
  if (pomodoroState.active) {
    clearInterval(pomodoroState.interval);
    pomodoroState.active = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="12"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
  } else {
    pomodoroState.active = true;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="12"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
    
    pomodoroState.interval = setInterval(() => {
      pomodoroState.timeLeft--;
      if (pomodoroState.timeLeft <= 0) {
        clearInterval(pomodoroState.interval);
        pomodoroState.active = false;
        pomodoroState.timeLeft = 25 * 60;
        alert('Фокус-таймер завершен! Отдохните 5 минут.');
        btn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor" width="12"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
      }
      const m = Math.floor(pomodoroState.timeLeft / 60).toString().padStart(2, '0');
      const s = (pomodoroState.timeLeft % 60).toString().padStart(2, '0');
      display.innerText = `${m}:${s}`;
    }, 1000);
  }
}

function getRank(level) {
  if (level >= 5) return 'Мастер S7';
  if (level >= 3) return 'Продвинутый';
  if (level >= 2) return 'Инженер';
  return 'Новичок';
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>'"]/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[char]);
}

// --- Screens ---
function showLanding() {
  document.getElementById('landingScreen').hidden = false;
  document.getElementById('authScreen').hidden = true;
  document.querySelector('.app-shell').hidden = true;
  translateStatic(document.getElementById('landingScreen'));
}

function setAuthMode(mode) {
  const isRegister = mode === 'register';
  document.getElementById('loginForm').hidden = isRegister;
  document.getElementById('registerForm').hidden = !isRegister;
  document.getElementById('btnLoginMode').classList.toggle('active', !isRegister);
  document.getElementById('btnRegisterMode').classList.toggle('active', isRegister);
  document.getElementById('authSubtitle').innerText = isRegister ? 'Новый аккаунт' : 'Вход в LMS';
  document.getElementById('authError').innerText = '';
  translateStatic(document.getElementById('authScreen'));
}

function updateMentorCodeVisibility() {
  const isMentor = document.getElementById('registerRole').value === 'mentor';
  document.getElementById('mentorCodeField').hidden = !isMentor;
  document.querySelector('#mentorCodeField input').required = isMentor;
}

function showAuth(mode = 'login', role = 'student') {
  document.getElementById('landingScreen').hidden = true;
  document.getElementById('authScreen').hidden = false;
  document.querySelector('.app-shell').hidden = true;
  setAuthMode(mode);
  if (mode === 'register') {
    document.getElementById('registerRole').value = role;
    updateMentorCodeVisibility();
  }
  translateStatic(document.getElementById('authScreen'));
}

function showAppShell() {
  document.getElementById('landingScreen').hidden = true;
  document.getElementById('authScreen').hidden = true;
  document.querySelector('.app-shell').hidden = false;
  
  document.getElementById('currentUserName').innerText = currentUser.name;
  document.getElementById('currentUserRole').innerText = currentUser.role === 'student' ? t('studentRole') : t('mentorRole');
  document.querySelector('.duo-stats').hidden = currentUser.role !== 'student';

  renderNav();

  if (currentUser.role === 'student') {
    document.getElementById('studentXpPanel').hidden = false;
    updateStudentXpUI();
    navigate('student-dashboard');
  } else {
    document.getElementById('studentXpPanel').hidden = true;
    navigate('mentor-dashboard');
  }
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const email = String(fd.get('email')).trim().toLowerCase();
  const pass = fd.get('password');
  const role = fd.get('role');

  const user = state.users.find(u => u.email === email && u.password === pass && u.role === role);
  if (user) {
    currentUser = user;
    localStorage.setItem(SESSION_KEY, user.id);
    document.getElementById('authError').innerText = '';
    showAppShell();
  } else {
    document.getElementById('authError').innerText = 'Неверный email, пароль или роль';
  }
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const result = Core.registerUser(state, {
    role: fd.get('role'),
    name: fd.get('name'),
    email: fd.get('email'),
    password: fd.get('password'),
    mentorCode: fd.get('mentorCode')
  });
  if (!result.valid) {
    document.getElementById('authError').innerText = result.errors.join(' ');
    return;
  }
  currentUser = result.user;
  saveData();
  localStorage.setItem(SESSION_KEY, currentUser.id);
  e.target.reset();
  document.getElementById('authError').innerText = '';
  showAppShell();
});

document.getElementById('logoutButton').addEventListener('click', () => {
  currentUser = null;
  localStorage.removeItem(SESSION_KEY);
  showLanding();
});

document.getElementById('btnProfile').addEventListener('click', () => {
  navigate('profile');
});

// --- Navigation ---
function renderNav() {
  const nav = document.getElementById('mainNav');
  nav.innerHTML = '';

  const items = NAV_ITEMS[currentUser.role] || [];
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'nav-item';
    btn.innerHTML = `${item.icon} ${t(item.labelKey)}`;
    btn.dataset.view = item.id;
    btn.onclick = () => navigate(item.id);
    nav.appendChild(btn);
  });
  translateStatic(nav);
}

function navigate(viewId, params = {}) {
  currentView = viewId;
  currentParams = params;
  const viewContainer = document.getElementById('appView');
  const template = document.getElementById('view-' + viewId);
  
  if (!template) {
    viewContainer.innerHTML = '<p>View not found</p>';
    return;
  }

  viewContainer.innerHTML = template.innerHTML;

  viewContainer.querySelectorAll('[data-view-jump]').forEach(btn => {
    btn.onclick = () => navigate(btn.getAttribute('data-view-jump'), JSON.parse(btn.getAttribute('data-params') || '{}'));
  });

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
  });

  if (viewId === 'student-dashboard') renderStudentDashboard();
  if (viewId === 'course-catalog') renderCourseCatalog();
  if (viewId === 'interactive-lesson') renderInteractiveLesson(params.courseId, params.lessonNumber);
  if (viewId === 'mentor-dashboard') renderMentorDashboard();
  if (viewId === 'leaderboard') renderLeaderboard();
  if (viewId === 'wiki') renderWiki();
  if (viewId === 'profile') renderProfile();
  
  updateTopbarStats();
  translateStatic(viewContainer);
  translateStatic(document.querySelector('.topbar'));
}

function updateStudentXpUI() {
  if (currentUser.role !== 'student') return;
  document.getElementById('userAvatar').innerText = getInitials(currentUser.name);
  document.getElementById('userLevelSidebar').innerText = `Уровень ${currentUser.level}`;
  document.getElementById('userXpSidebar').innerText = `${currentUser.xp} XP`;
  
  const xpNeeded = currentUser.level * 100;
  const pct = Math.min(100, Math.max(0, (currentUser.xp / xpNeeded) * 100));
  
  document.getElementById('levelProgressBar').style.width = pct + '%';
  document.getElementById('levelProgressHint').innerText = `До след. уровня: ${xpNeeded - currentUser.xp} XP`;
}

// --- Views Logic ---

function renderStudentDashboard() {
  document.getElementById('pageTitle').innerText = 'Мой путь инженера';
  document.getElementById('pageEyebrow').innerText = 'Кабинет ученика';

  document.getElementById('dashXp').innerText = currentUser.xp;
  document.getElementById('dashLevel').innerText = currentUser.level;
  document.getElementById('dashRank').innerText = getRank(currentUser.level);
  document.getElementById('dashStreak').innerText = currentUser.streak;
  

  // Render Courses
  const list = document.getElementById('myCoursesList');
  const progress = state.studentProgress[currentUser.id] || {};
  const activeCourseIds = Object.keys(progress);
  
  if (activeCourseIds.length === 0) {
    list.innerHTML = '<p class="muted" style="margin:0;">Вы пока не начали ни один курс. Перейдите в каталог!</p>';
  } else {
    // Show only the primary active course as a path
    const cId = activeCourseIds[0];
    const course = state.courses.find(c => c.id == cId);
    const currLesson = progress[cId] || 1;
    const allLessons = state.lessons[cId] || [];
    
    let pathHtml = `<h3 style="text-align:center; margin-bottom: 24px;">${course.title}</h3><div class="duo-path">`;
    
    for (let i = 0; i < course.totalLessons; i++) {
      const lessonNumber = i + 1;
      const isCompleted = lessonNumber < currLesson;
      const isActive = lessonNumber === currLesson;
      const isLocked = lessonNumber > currLesson;
      
      let icon = svgs.rocket;
      if (isCompleted) icon = svgs.check;
      if (isLocked) icon = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`; // lock
      
      let nodeClass = "duo-node";
      if (isCompleted) nodeClass += " completed";
      if (isActive) nodeClass += " active";
      
      pathHtml += `
        <div class="duo-node-wrapper">
          <div class="duo-node-label">Урок ${lessonNumber}</div>
          <div class="${nodeClass}" onclick="${isLocked ? '' : `navigate('interactive-lesson', { courseId: ${cId}, lessonNumber: ${lessonNumber} })`}" style="${isLocked ? 'opacity:0.5;cursor:not-allowed;' : ''}">
            ${icon}
          </div>
        </div>
      `;
    }
    
    pathHtml += `</div>`;
    list.innerHTML = pathHtml;
    list.classList.remove('list'); // Remove standard list padding
  }

  // Render Missions
  const missionsList = document.getElementById('missionsList');
  const hasPendingSub = state.submissions.some(s => s.studentId === currentUser.id && s.status === 'pending');
  const hasApprovedSub = state.submissions.some(s => s.studentId === currentUser.id && s.status === 'approved');
  
  missionsList.innerHTML = `
    <div class="mission-item ${hasApprovedSub ? 'mission-done' : ''}">
      <div class="mission-icon">${svgs.rocket}</div>
      <div class="mission-text">
        <strong>Сдать 1 проект ментору</strong>
        <small>+50 XP</small>
      </div>
      ${hasApprovedSub ? '<button class="button success compact">Выполнено</button>' : '<button class="button ghost compact">В процессе</button>'}
    </div>
    <div class="mission-item">
      <div class="mission-icon">${svgs.sparkle}</div>
      <div class="mission-text">
        <strong>Использовать AI Mentor</strong>
        <small>+10 XP</small>
      </div>
      <button class="button ghost compact">В процессе</button>
    </div>
  `;

  // Render Badges
  const badgesList = document.getElementById('badgesList');
  const userBadges = [
    { title: 'Первый запуск', icon: svgs.rocket, earned: true },
    { title: 'Ночной кодер', icon: svgs.sparkle, earned: currentUser.xp > 50 },
    { title: 'Мастер C++', icon: svgs.badge, earned: false },
    { title: 'Точный ПИД', icon: svgs.check, earned: false }
  ];
  
  badgesList.innerHTML = userBadges.map(b => `
    <div class="badge-item ${b.earned ? 'earned' : ''}">
      <div class="badge-item-icon">${b.icon}</div>
      <strong>${b.title}</strong>
    </div>
  `).join('');

  // Render XP Shop
  document.getElementById('shopUserXp').innerText = currentUser.xp;
  const shopList = document.getElementById('xpShopList');
  const shopItems = [
    { title: 'Стикерпак S7', cost: 300, icon: svgs.badge },
    { title: 'Умная ручка', cost: 800, icon: svgs.sparkle },
    { title: 'Доп. консультация (1ч)', cost: 1500, icon: svgs.rocket },
    { title: 'Футболка Инженера', cost: 5000, icon: svgs.check }
  ];
  
  shopList.innerHTML = shopItems.map(item => `
    <div class="list-row" style="align-items:center; display:flex; justify-content:space-between;">
      <div style="display:flex; align-items:center; gap:8px;">
        <span style="font-size:24px;">${item.icon}</span>
        <strong>${item.title}</strong>
      </div>
      <button class="button compact ${currentUser.xp >= item.cost ? 'primary' : 'secondary'}" ${currentUser.xp < item.cost ? 'disabled' : ''} onclick="alert('Куплено за ${item.cost} XP!')">
        ${item.cost} XP
      </button>
    </div>
  `).join('');
}

function renderCourseCatalog() {
  document.getElementById('pageTitle').innerText = t('coursesTitle');
  document.getElementById('pageEyebrow').innerText = t('coursesEyebrow');

  const list = document.getElementById('courseCatalogList');
  list.innerHTML = '';

  state.courses.forEach(c => {
    const div = document.createElement('div');
    div.className = 'course-card';
    div.innerHTML = `
      <h3>${c.title}</h3>
      <p>${c.desc}</p>
      <div class="progress-bar"><span style="width: 0%"></span></div>
      <button class="button primary">${t('openCourse')}</button>
    `;
    
    const progress = state.studentProgress[currentUser.id]?.[c.id];
    if (progress) {
      const pct = Math.round((progress / c.totalLessons) * 100);
      div.querySelector('.progress-bar span').style.width = pct + '%';
    }

    div.querySelector('button').onclick = () => {
      let lNum = progress || 1;
      if (!progress) {
        if (!state.studentProgress[currentUser.id]) state.studentProgress[currentUser.id] = {};
        state.studentProgress[currentUser.id][c.id] = 1;
        saveData();
      }
      navigate('interactive-lesson', { courseId: c.id, lessonNumber: lNum });
    };

    list.appendChild(div);
  });
}

function renderInteractiveLesson(courseId, lessonNumber) {
  document.getElementById('pageTitle').innerText = t('lessonTitle');
  document.getElementById('pageEyebrow').innerText = t('lessonEyebrow');

  const lessons = state.lessons[courseId];
  const lesson = lessons?.find(l => l.number == lessonNumber);

  if (!lesson) {
    document.getElementById('lessonTitle').innerText = 'Урок в разработке...';
    document.querySelector('.lesson-layout').hidden = true;
    return;
  }

  document.getElementById('lessonTitle').innerText = `${t('lessonPrefix')} ${lesson.number}: ${lesson.title}`;
  const totalLessons = state.courses.find(c => c.id == courseId)?.totalLessons || 1;
  const progressPercent = Math.round((lessonNumber / totalLessons) * 100);
  document.getElementById('lessonProgressBar').style.width = `${progressPercent}%`;
  document.getElementById('lessonTheory').innerHTML = lesson.theory;
  document.getElementById('lessonSchema').innerHTML = lesson.schema;
  document.getElementById('lessonCode').innerText = lesson.code;
  const compilerCode = document.getElementById('compilerCode');
  if (compilerCode && !compilerCode.value.trim()) compilerCode.value = lesson.code || '';
  
  if (lesson.task) {
    document.getElementById('lessonTask').innerHTML = lesson.task;
  }

  const videoCard = document.getElementById('lessonVideoCard');
  if (lesson.video) {
    videoCard.hidden = false;
    document.getElementById('lessonVideo').innerHTML = `<iframe src="${lesson.video}" frameborder="0" allowfullscreen></iframe>`;
  } else {
    videoCard.hidden = true;
  }

  const simCard = document.getElementById('lessonSimulatorCard');
  if (lesson.wokwiId) {
    simCard.hidden = false;
    document.getElementById('lessonSimulator').innerHTML = `<iframe src="https://wokwi.com/projects/${lesson.wokwiId}?embedded=1" style="width:100%; height:100%; border:none;"></iframe>`;
  } else {
    simCard.hidden = true;
  }

  document.querySelector('.lesson-layout').hidden = false;
  const existingSub = Core.getLatestSubmission(state, currentUser.id, Number(courseId), Number(lessonNumber));
  const form = document.getElementById('submitProjectForm');
  const statusLabel = document.getElementById('submissionStatus');
  const btnSubmit = document.getElementById('btnSubmitProject');

  if (existingSub) {
    form.querySelector('[name=codeUrl]').value = existingSub.codeUrl || '';
    const codeElem = form.querySelector('[name=code]');
    if (codeElem) codeElem.value = existingSub.code || '';
    form.querySelector('[name=description]').value = existingSub.description || '';
    
    if (existingSub.status === 'pending') {
      statusLabel.innerText = 'На проверке ментором...';
      statusLabel.className = 'submission-status status-pending';
      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Отправлено';
    } else if (existingSub.status === 'approved') {
      statusLabel.innerText = 'Проект принят! Ментор начислил XP.';
      statusLabel.className = 'submission-status status-approved';
      btnSubmit.hidden = true;
      const nextBtn = document.createElement('button');
      nextBtn.className = 'button success';
      nextBtn.innerText = 'Следующий урок →';
      nextBtn.style.width = '100%';
      nextBtn.type = 'button';
      nextBtn.onclick = () => {
        navigate('interactive-lesson', { courseId, lessonNumber: lessonNumber + 1 });
      };
      form.appendChild(nextBtn);
    } else if (existingSub.status === 'rejected') {
      statusLabel.innerText = `Нужна доработка: ${existingSub.feedback}`;
      statusLabel.className = 'submission-status status-rejected';
    }
  } else {
    statusLabel.innerText = '';
  }

  form.onsubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const result = Core.createSubmission(state, {
      studentId: currentUser.id,
      courseId: Number(courseId),
      lessonNumber: Number(lessonNumber),
      codeUrl: fd.get('codeUrl'),
      code: fd.get('code'),
      description: fd.get('description')
    });
    if (!result.valid) {
      statusLabel.innerText = result.errors.join(' ');
      statusLabel.className = 'submission-status status-rejected';
      return;
    }
    saveData();
    navigate('interactive-lesson', { courseId, lessonNumber });
  };

  const btnPrecheck = document.getElementById('btnAiPrecheck');
  const precheckRes = document.getElementById('aiPrecheckResult');
  if (btnPrecheck && precheckRes) {
    btnPrecheck.onclick = async () => {
      const codeUrl = document.getElementById('inputCodeUrl').value;
      const codeText = document.getElementById('inputCode').value;
      
      if (!codeUrl && !codeText) {
        precheckRes.hidden = false;
        precheckRes.innerHTML = `${svgs.error} Вставьте код или ссылку перед проверкой!`;
        return;
      }
      
      btnPrecheck.innerHTML = `${svgs.loading} AI анализирует код...`;
      btnPrecheck.disabled = true;
      precheckRes.hidden = false;
      precheckRes.innerHTML = "<i>Обращение к AI Ментору...</i>";
      
      if (codeText && codeText.length > 5) {
        const report = Core.analyzeArduinoCode(codeText);
        const hints = report.hints.length
          ? `<ul>${report.hints.map((hint) => `<li>${escapeHtml(hint)}</li>`).join('')}</ul>`
          : '<p>Ключевые части решения на месте. Проверьте показания на разных расстояниях и пограничные случаи.</p>';
        precheckRes.innerHTML = `<div class="ai-report"><div class="ai-score">Готовность: ${report.score}%</div><div class="ai-feedback"><strong>Проверено:</strong> ${report.passed} из ${report.total} инженерных критериев.</div><div class="ai-mentor-hint"><strong>Подсказки, не готовое решение:</strong>${hints}</div></div>`;
      } else {
        precheckRes.innerHTML = `${svgs.success} <strong>AI Mentor:</strong> Ссылка прикреплена. Ментор посмотрит видео!`;
      }
      
      btnPrecheck.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="margin-right:8px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>AI Проверка кода перед сдачей`;
      btnPrecheck.disabled = false;
    };
  }

  const btnLoadLessonCode = document.getElementById('btnLoadLessonCode');
  const btnRunCompiler = document.getElementById('btnRunCompiler');
  const compilerOutput = document.getElementById('compilerOutput');
  if (btnLoadLessonCode && compilerCode) {
    btnLoadLessonCode.onclick = () => {
      compilerCode.value = lesson.code || '';
      compilerOutput.innerText = t('compilerLoaded');
    };
  }
  if (btnRunCompiler && compilerOutput) {
    btnRunCompiler.onclick = async () => {
      const language = document.getElementById('compilerLanguage').value;
      btnRunCompiler.disabled = true;
      compilerOutput.innerText = 'Vercel Sandbox: starting isolated compile...';
      let result;
      try {
        const response = await fetch('/api/compiler/run', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ language, code: compilerCode.value })
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const apiResult = await response.json();
        result = {
          ok: apiResult.ok,
          output: `${apiResult.provider || 'vercel-sandbox'}\n${apiResult.stdout || ''}\n${apiResult.stderr || ''}`.trim(),
          errors: apiResult.ok ? [] : [apiResult.stderr || apiResult.hint || 'Sandbox build failed'],
          warnings: []
        };
      } catch {
        result = Core.runCompilerSandbox({ language, code: compilerCode.value });
      }
      const lines = [
        result.ok ? '✅ Build passed' : '❌ Build failed',
        result.output,
        ...(result.errors || []).map((error) => `error: ${error}`),
        ...(result.warnings || []).map((warning) => `warning: ${warning}`)
      ].filter(Boolean);
      compilerOutput.innerText = lines.join('\n');
      btnRunCompiler.disabled = false;
    };
  }
}

function renderMentorDashboard() {
  document.getElementById('pageTitle').innerText = t('mentorTitle');
  document.getElementById('pageEyebrow').innerText = t('mentorEyebrow');

  const pending = state.submissions.filter(s => s.status === 'pending');
  const students = state.users.filter(user => user.role === 'student');
  const approved = state.submissions.filter(submission => submission.status === 'approved');
  const riskStudents = students.filter((student) => {
    const progress = state.studentProgress[student.id] || {};
    const acceptedProjects = approved.filter(submission => submission.studentId === student.id).length;
    return Object.keys(progress).length === 0 || acceptedProjects === 0;
  });
  document.getElementById('mentorPendingCount').innerText = pending.length;
  document.getElementById('mentorStudentsCount').innerText = students.length;
  document.getElementById('mentorApprovedCount').innerText = approved.length;
  document.getElementById('mentorRiskMetric').innerText = riskStudents.length;
  document.getElementById('mentorSlaMetric').innerText = pending.length ? `18 ${t('minuteShort')}` : `0 ${t('minuteShort')}`;

  const studentsList = document.getElementById('mentorStudentsList');
  studentsList.innerHTML = students.map((student) => {
    const progress = state.studentProgress[student.id] || {};
    const activeCourses = Object.keys(progress).length;
    const acceptedProjects = approved.filter(submission => submission.studentId === student.id).length;
    const risk = activeCourses === 0 || acceptedProjects === 0;
    return `<div class="student-overview"><div class="avatar">${escapeHtml(getInitials(student.name))}</div><div><strong>${escapeHtml(student.name)}</strong><small>${activeCourses} ${t('courseUnit')} · ${acceptedProjects} ${t('projectUnit')}</small></div><span class="badge ${risk ? 'pending' : 'active'}">${risk ? t('risk') : t('ok')}</span></div>`;
  }).join('') || '<p class="muted">Ученики пока не зарегистрированы.</p>';

  const groupsList = document.getElementById('mentorGroupsList');
  if (groupsList) {
    const groups = [
      { name: 'Arduino A1', progress: 72, queue: pending.length },
      { name: 'SPIKE Junior', progress: 64, queue: 1 },
      { name: 'ESP32 IoT', progress: 48, queue: 3 }
    ];
    groupsList.innerHTML = groups.map(group => `
      <div class="mentor-group-row">
        <div><strong>${group.name}</strong><small>${group.queue} работ(ы) в очереди</small></div>
        <span>${group.progress}%</span>
        <div class="progress-bar"><span style="width:${group.progress}%"></span></div>
      </div>
    `).join('');
  }

  const templates = document.getElementById('mentorFeedbackTemplates');
  if (templates) {
    templates.innerHTML = [
      'Проверь GND и питание датчика перед повторной сдачей.',
      'Добавь Serial output и покажи измерения на трех расстояниях.',
      'Хорошая работа: теперь попробуй обработать случай distance < 10 см.'
    ].map(item => `<button class="mentor-template" type="button">${escapeHtml(item)}</button>`).join('');
  }

  const list = document.getElementById('mentorSubmissionsList');
  list.innerHTML = '';

  if (pending.length === 0) {
    list.innerHTML = `<p class="muted" style="margin:0;">${t('allReviewed')}</p>`;
    return;
  }

  pending.forEach(sub => {
    const student = state.users.find(u => u.id == sub.studentId);
    const course = state.courses.find(c => c.id == sub.courseId);

    const div = document.createElement('div');
    div.className = 'list-row';
    div.style.flexDirection = 'column';
    div.style.alignItems = 'stretch';
    div.style.gap = '12px';
    
    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div>
          <strong>${escapeHtml(student?.name || t('unknownStudent'))}</strong>
          <small>${escapeHtml(course?.title || t('unknownCourse'))} · Урок ${sub.lessonNumber}</small>
        </div>
        <span class="badge pending">${t('pendingBadge')}</span>
      </div>
      <div style="background:var(--surface); padding:12px; border-radius:8px; border:1px solid var(--line);">
        ${sub.codeUrl ? `<p style="margin:0 0 8px; font-size:14px;"><strong>Демо:</strong> <a href="${escapeHtml(sub.codeUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(sub.codeUrl)}</a></p>` : ''}
        ${sub.code ? `<pre class="submission-code"><code>${escapeHtml(sub.code)}</code></pre>` : ''}
        <p style="margin:8px 0 0; font-size:14px; color:var(--muted);">${escapeHtml(sub.description || 'Без описания')}</p>
      </div>
      <label class="review-note">${t('reviewHint')}
        <textarea class="review-feedback" rows="2" maxlength="500" placeholder="Что получилось и что улучшить"></textarea>
      </label>
      <p class="review-error" hidden></p>
      <div style="display:flex; gap:12px; margin-top:8px;">
        <button class="button success compact btn-approve" style="flex:1;">${t('approve')}</button>
        <button class="button ghost compact btn-reject" style="flex:1;">${t('reject')}</button>
      </div>
    `;

    const review = (action) => {
      const result = Core.reviewSubmission(state, sub.id, action, div.querySelector('.review-feedback').value);
      const error = div.querySelector('.review-error');
      if (!result.ok) {
        error.hidden = false;
        error.innerText = result.error;
        return;
      }
      saveData();
      renderMentorDashboard();
    };
    div.querySelector('.btn-approve').onclick = () => review('approve');
    div.querySelector('.btn-reject').onclick = () => review('reject');

    list.appendChild(div);
  });
}

function renderLeaderboard() {
  document.getElementById('pageTitle').innerText = 'Рейтинг';
  document.getElementById('pageEyebrow').innerText = 'Глобальный лидерборд';

  const list = document.getElementById('leaderboardList');
  list.innerHTML = '';

  const students = state.users.filter(u => u.role === 'student')
    .sort((a, b) => (b.level * 1000 + b.xp) - (a.level * 1000 + a.xp));

  students.forEach((s, i) => {
    const div = document.createElement('div');
    div.className = 'list-row';
    div.innerHTML = `
      <div style="display:flex; align-items:center; gap:16px;">
        <div class="rank-badge">${i + 1}</div>
        <div>
          <strong>${s.name}</strong>
          <small>Уровень ${s.level} · ${getRank(s.level)}</small>
        </div>
      </div>
      <div class="leaderboard-xp">${s.level * 100 + s.xp} XP</div>
    `;
    list.appendChild(div);
  });
}

function renderWiki() {
  document.getElementById('pageTitle').innerText = 'Справочник';
  document.getElementById('pageEyebrow').innerText = 'База знаний инженера';
}

function renderProfile() {
  document.getElementById('pageTitle').innerText = 'Профиль';
  document.getElementById('pageEyebrow').innerText = 'Мой аккаунт';
  
  document.getElementById('profileAvatar').innerText = getInitials(currentUser.name);
  
  document.getElementById('inputProfileName').value = currentUser.name;
  document.getElementById('inputProfileEmail').value = currentUser.email;

  const xpElem = document.getElementById('profileXp');
  const levelElem = document.getElementById('profileLevel');
  const streakElem = document.getElementById('profileStreak');
  
  if (currentUser.role === 'student') {
    xpElem.innerText = currentUser.xp;
    levelElem.innerText = currentUser.level;
    streakElem.innerText = currentUser.streak || 0;
  } else {
    xpElem.innerText = '-';
    levelElem.innerText = '-';
    streakElem.innerText = '-';
  }

  // Find mentor
  const mentor = state.users.find(u => u.role === 'mentor');
  if (mentor) {
    const mName = document.getElementById('mentorName');
    if (mName) mName.innerText = mentor.name;
  }

  document.getElementById('profileForm').onsubmit = (e) => {
    e.preventDefault();
    const newName = document.getElementById('inputProfileName').value.trim();
    if (newName) {
      currentUser.name = newName;
      saveData();
      document.getElementById('currentUserName').innerText = currentUser.name;
      document.getElementById('profileAvatar').innerText = getInitials(currentUser.name);
      alert('Профиль успешно обновлён!');
    }
  };
}

// Start
document.addEventListener('DOMContentLoaded', initApp);

function updateTopbarStats() {
  const elStreak = document.getElementById('globalStreak');
  const elXp = document.getElementById('globalXp');
  if (elStreak) elStreak.innerText = currentUser.streak ?? 0;
  if (elXp) elXp.innerText = currentUser.xp ?? 0;
}
