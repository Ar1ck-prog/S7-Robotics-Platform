import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Activity, Award, BookOpen, CheckCircle2, ClipboardCheck, Globe2, GraduationCap, ShieldCheck, Users } from 'lucide-react';
import './styles.css';

type Locale = 'ru' | 'kk' | 'en';

const copy = {
  ru: {
    product: 'S7 Robotics Platform',
    navCourses: 'Курсы',
    navMentor: 'Ментор',
    navArchitecture: 'Архитектура',
    heroTitle: 'S7 Robotics Platform',
    heroText: 'Единая LMS для робототехники: ученик проходит маршрут, отправляет проект, ментор проверяет работу, а прогресс и XP считаются автоматически.',
    studentCta: 'Войти как ученик',
    mentorCta: 'Войти как ментор',
    flowTitle: 'Главный demo-сценарий',
    flow: ['Arduino course', 'Ultrasonic Sensor', 'Project upload', 'Mentor review', 'XP + next lesson'],
    mentorTitle: 'Сильный кабинет ментора',
    mentorText: 'Ментор видит группы, очередь проектов, риск отставания, качество обратной связи и быстрые шаблоны ревью.',
    reviewQueue: 'Очередь проверки',
    activeStudents: 'Активные ученики',
    avgProgress: 'Средний прогресс',
    riskStudents: 'Нужна помощь',
    groups: 'Группы',
    feedbackTemplates: 'Шаблоны фидбека',
    studentPulse: 'Пульс учеников',
    architecture: 'Архитектура под production',
    stack: 'React + TypeScript + Vite + Tailwind, NestJS REST API, PostgreSQL, Redis, JWT, Nginx, Docker Compose.',
    invite: 'Регистрация ментора защищена invite-кодом: s7mentor2026'
  },
  kk: {
    product: 'S7 Robotics Platform',
    navCourses: 'Курстар',
    navMentor: 'Ментор',
    navArchitecture: 'Архитектура',
    heroTitle: 'S7 Robotics Platform',
    heroText: 'Робототехникаға арналған біртұтас LMS: оқушы оқу жолынан өтеді, жобасын жібереді, ментор тексереді, прогресс пен XP автоматты есептеледі.',
    studentCta: 'Оқушы ретінде кіру',
    mentorCta: 'Ментор ретінде кіру',
    flowTitle: 'Негізгі demo-сценарий',
    flow: ['Arduino курсы', 'Ultrasonic Sensor', 'Жобаны жүктеу', 'Ментор тексеруі', 'XP + келесі сабақ'],
    mentorTitle: 'Күшті ментор кабинеті',
    mentorText: 'Ментор топтарды, жобалар кезегін, артта қалу қаупін, кері байланыс сапасын және жылдам ревью үлгілерін көреді.',
    reviewQueue: 'Тексеру кезегі',
    activeStudents: 'Белсенді оқушылар',
    avgProgress: 'Орташа прогресс',
    riskStudents: 'Көмек керек',
    groups: 'Топтар',
    feedbackTemplates: 'Фидбек үлгілері',
    studentPulse: 'Оқушылар пульсі',
    architecture: 'Production архитектурасы',
    stack: 'React + TypeScript + Vite + Tailwind, NestJS REST API, PostgreSQL, Redis, JWT, Nginx, Docker Compose.',
    invite: 'Ментор тіркелуі invite-кодпен қорғалған: s7mentor2026'
  },
  en: {
    product: 'S7 Robotics Platform',
    navCourses: 'Courses',
    navMentor: 'Mentor',
    navArchitecture: 'Architecture',
    heroTitle: 'S7 Robotics Platform',
    heroText: 'One robotics LMS: students follow a clear path, submit projects, mentors review work, and progress with XP is tracked automatically.',
    studentCta: 'Enter as Student',
    mentorCta: 'Enter as Mentor',
    flowTitle: 'Main demo scenario',
    flow: ['Arduino course', 'Ultrasonic Sensor', 'Project upload', 'Mentor review', 'XP + next lesson'],
    mentorTitle: 'Powerful mentor workspace',
    mentorText: 'Mentors can see groups, review queue, learning risks, feedback quality and fast review templates.',
    reviewQueue: 'Review queue',
    activeStudents: 'Active students',
    avgProgress: 'Average progress',
    riskStudents: 'Need help',
    groups: 'Groups',
    feedbackTemplates: 'Feedback templates',
    studentPulse: 'Student pulse',
    architecture: 'Production-ready architecture',
    stack: 'React + TypeScript + Vite + Tailwind, NestJS REST API, PostgreSQL, Redis, JWT, Nginx, Docker Compose.',
    invite: 'Mentor registration is protected with invite code: s7mentor2026'
  }
} satisfies Record<Locale, Record<string, string | string[]>>;

const mentorCards = [
  { label: 'reviewQueue', value: '7', tone: 'bg-amber-50 text-amber-700', icon: ClipboardCheck },
  { label: 'activeStudents', value: '48', tone: 'bg-blue-50 text-blue-700', icon: Users },
  { label: 'avgProgress', value: '71%', tone: 'bg-emerald-50 text-emerald-700', icon: Activity },
  { label: 'riskStudents', value: '5', tone: 'bg-rose-50 text-rose-700', icon: ShieldCheck }
];

function App() {
  const [locale, setLocale] = useState<Locale>('ru');
  const t = useMemo(() => copy[locale], [locale]);
  const flow = t.flow as string[];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3 font-extrabold">
          <div className="grid size-10 place-items-center rounded-lg bg-blue-600 text-white">S7</div>
          {t.product as string}
        </div>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-600 md:flex">
          <a href="#courses">{t.navCourses as string}</a>
          <a href="#mentor">{t.navMentor as string}</a>
          <a href="#architecture">{t.navArchitecture as string}</a>
        </nav>
        <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
          <Globe2 className="size-4" />
          <select value={locale} onChange={(event) => setLocale(event.target.value as Locale)} className="bg-transparent font-semibold outline-none">
            <option value="ru">RU</option>
            <option value="kk">KZ</option>
            <option value="en">EN</option>
          </select>
        </label>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
        <div>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-700">ROBOTICS • LMS • PRODUCT</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-black tracking-tight md:text-7xl">{t.heroTitle as string}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">{t.heroText as string}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-lg bg-blue-600 px-5 py-3 font-bold text-white shadow-sm">{t.studentCta as string}</button>
            <button className="rounded-lg border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800">{t.mentorCta as string}</button>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-xl bg-slate-950 p-5 text-white">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-cyan-300">{t.flowTitle as string}</span>
              <Award className="size-5 text-amber-300" />
            </div>
            <div className="mt-6 grid gap-3">
              {flow.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-lg bg-white/10 p-3">
                  <span className="grid size-8 place-items-center rounded-full bg-blue-500 text-sm font-black">{index + 1}</span>
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="mentor" className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 max-w-3xl">
          <h2 className="text-3xl font-black">{t.mentorTitle as string}</h2>
          <p className="mt-3 text-slate-600">{t.mentorText as string}</p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {mentorCards.map(({ label, value, tone, icon: Icon }) => (
            <article key={label} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className={`mb-4 grid size-11 place-items-center rounded-lg ${tone}`}><Icon className="size-5" /></div>
              <div className="text-3xl font-black">{value}</div>
              <div className="mt-1 text-sm font-bold text-slate-500">{t[label] as string}</div>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-black">{t.studentPulse as string}</h3>
            {['Arduino A1', 'SPIKE Junior', 'ESP32 IoT'].map((group, index) => (
              <div key={group} className="mt-4 grid gap-2 rounded-lg border border-slate-100 p-4">
                <div className="flex items-center justify-between">
                  <strong>{group}</strong>
                  <span className="text-sm font-bold text-blue-600">{68 + index * 9}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: `${68 + index * 9}%` }} />
                </div>
              </div>
            ))}
          </article>
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="font-black">{t.feedbackTemplates as string}</h3>
            {['Проверь подключение GND', 'Добавь Serial вывод', 'Опиши тест на 3 расстояниях'].map((item) => (
              <button key={item} className="mt-3 flex w-full items-center gap-3 rounded-lg border border-slate-200 px-3 py-3 text-left font-semibold">
                <CheckCircle2 className="size-5 text-emerald-600" />
                {item}
              </button>
            ))}
          </article>
        </div>
      </section>

      <section id="architecture" className="mx-auto max-w-7xl px-6 py-12">
        <div className="rounded-2xl bg-slate-950 p-8 text-white">
          <div className="flex items-center gap-3">
            <BookOpen className="size-7 text-cyan-300" />
            <h2 className="text-3xl font-black">{t.architecture as string}</h2>
          </div>
          <p className="mt-4 max-w-4xl text-slate-300">{t.stack as string}</p>
          <p className="mt-3 font-semibold text-cyan-200">{t.invite as string}</p>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
