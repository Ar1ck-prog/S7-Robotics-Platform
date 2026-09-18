const test = require('node:test');
const assert = require('node:assert/strict');
const { createSubmission, reviewSubmission, validateSubmission, analyzeArduinoCode, runCompilerSandbox, registerUser } = require('../core');

function state() {
  return {
    users: [{ id: 1, role: 'student', level: 1, xp: 80 }],
    studentProgress: { 1: { 101: 1 } },
    submissions: []
  };
}

test('submission requires meaningful evidence', () => {
  assert.equal(validateSubmission({}).valid, false);
  assert.equal(validateSubmission({ codeUrl: 'javascript:alert(1)' }).valid, false);
  assert.equal(validateSubmission({ code: 'void setup() { Serial.begin(9600); }' }).valid, true);
});

test('approval grants XP once, levels up and unlocks the next lesson', () => {
  const data = state();
  const created = createSubmission(data, { studentId: 1, courseId: 101, lessonNumber: 1, code: 'void setup() { Serial.begin(9600); }' });
  assert.equal(created.valid, true);
  assert.equal(reviewSubmission(data, created.submission.id, 'approve', 'Отличная работа').ok, true);
  assert.deepEqual({ level: data.users[0].level, xp: data.users[0].xp }, { level: 2, xp: 30 });
  assert.equal(data.studentProgress[1][101], 2);
  assert.equal(reviewSubmission(data, created.submission.id, 'approve', '').ok, false);
  assert.equal(data.users[0].xp, 30);
});

test('rejection needs feedback and allows a new submission', () => {
  const data = state();
  const first = createSubmission(data, { studentId: 1, courseId: 101, lessonNumber: 1, codeUrl: 'https://youtu.be/demo' });
  assert.equal(reviewSubmission(data, first.submission.id, 'reject', '').ok, false);
  assert.equal(reviewSubmission(data, first.submission.id, 'reject', 'Проверьте подключение Echo').ok, true);
  assert.equal(createSubmission(data, { studentId: 1, courseId: 101, lessonNumber: 1, codeUrl: 'https://youtu.be/fixed' }).valid, true);
});

test('local AI mentor detects key ultrasonic sensor concepts', () => {
  const result = analyzeArduinoCode('pinMode(9, OUTPUT); pinMode(10, INPUT); pulseIn(10, HIGH); distance = duration * 0.034 / 2; Serial.begin(9600); Serial.println(distance);');
  assert.equal(result.score, 100);
  assert.deepEqual(result.hints, []);
});

test('compiler sandbox catches syntax risk without executing hardware code', () => {
  const arduino = runCompilerSandbox({ language: 'arduino', code: 'void setup() { Serial.begin(9600); }\nvoid loop() { Serial.println(1); }' });
  assert.equal(arduino.ok, true);
  const python = runCompilerSandbox({ language: 'python', code: 'if True\n    print("bad")' });
  assert.equal(python.ok, false);
  assert.match(python.errors[0], /символ :/);
});

test('student registration creates a safe default learning profile', () => {
  const data = state();
  const result = registerUser(data, { name: 'Новый ученик', email: 'NEW@S7.KZ', password: 'robot123', role: 'student' });
  assert.equal(result.valid, true);
  assert.equal(result.user.email, 'new@s7.kz');
  assert.deepEqual({ level: result.user.level, xp: result.user.xp, streak: result.user.streak }, { level: 1, xp: 0, streak: 1 });
  assert.deepEqual(data.studentProgress[result.user.id], {});
});

test('mentor registration requires the exact invite code and unique email', () => {
  const data = state();
  assert.equal(registerUser(data, { name: 'Mentor', email: 'mentor2@s7.kz', password: 'secure1', role: 'mentor', mentorCode: 'wrong' }).valid, false);
  const result = registerUser(data, { name: 'Mentor', email: 'mentor2@s7.kz', password: 'secure1', role: 'mentor', mentorCode: 's7mentor2026' });
  assert.equal(result.valid, true);
  assert.equal(result.user.role, 'mentor');
  assert.equal(registerUser(data, { name: 'Again', email: 'MENTOR2@S7.KZ', password: 'secure1', role: 'student' }).valid, false);
});
