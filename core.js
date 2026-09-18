(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.S7Core = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const REVIEW_XP = 50;

  function ensureStateShape(state) {
    state.submissions = Array.isArray(state.submissions) ? state.submissions : [];
    state.studentProgress = state.studentProgress || {};
    state.users = Array.isArray(state.users) ? state.users : [];
    state.submissions.forEach((submission) => {
      submission.description ||= '';
      submission.feedback ||= '';
      submission.xpAwarded = Boolean(submission.xpAwarded || submission.status === 'approved');
    });
    return state;
  }

  function isSafeHttpUrl(value) {
    if (!value) return false;
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  function validateSubmission(input) {
    const code = String(input.code || '').trim();
    const codeUrl = String(input.codeUrl || '').trim();
    const description = String(input.description || '').trim();
    const errors = [];
    if (!code && !codeUrl) errors.push('Добавьте код или ссылку на демонстрацию проекта.');
    if (code && code.length < 20) errors.push('Код слишком короткий: добавьте рабочий фрагмент программы.');
    if (codeUrl && !isSafeHttpUrl(codeUrl)) errors.push('Ссылка должна начинаться с http:// или https://.');
    if (description.length > 500) errors.push('Описание должно быть короче 500 символов.');
    return { valid: errors.length === 0, errors, value: { code, codeUrl, description } };
  }

  function getLatestSubmission(state, studentId, courseId, lessonNumber) {
    return state.submissions
      .filter((item) => item.studentId === studentId && item.courseId === courseId && item.lessonNumber === lessonNumber)
      .sort((a, b) => b.id - a.id)[0] || null;
  }

  function createSubmission(state, input) {
    ensureStateShape(state);
    const validation = validateSubmission(input);
    if (!validation.valid) return validation;
    const latest = getLatestSubmission(state, input.studentId, input.courseId, input.lessonNumber);
    if (latest && ['pending', 'approved'].includes(latest.status)) {
      return { valid: false, errors: ['Эта работа уже отправлена или принята.'] };
    }
    const submission = {
      id: Date.now(),
      studentId: input.studentId,
      courseId: input.courseId,
      lessonNumber: input.lessonNumber,
      ...validation.value,
      status: 'pending',
      feedback: '',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      xpAwarded: false
    };
    state.submissions.push(submission);
    return { valid: true, submission };
  }

  function grantXp(student, amount) {
    student.level ||= 1;
    student.xp ||= 0;
    student.xp += amount;
    while (student.xp >= student.level * 100) {
      student.xp -= student.level * 100;
      student.level += 1;
    }
  }

  function reviewSubmission(state, submissionId, action, feedback) {
    ensureStateShape(state);
    const submission = state.submissions.find((item) => item.id === submissionId);
    if (!submission) return { ok: false, error: 'Работа не найдена.' };
    if (submission.status !== 'pending') return { ok: false, error: 'Работа уже проверена.' };
    if (!['approve', 'reject'].includes(action)) return { ok: false, error: 'Неизвестное действие.' };
    const note = String(feedback || '').trim();
    if (action === 'reject' && note.length < 5) {
      return { ok: false, error: 'Добавьте ученику короткую подсказку для доработки.' };
    }
    submission.status = action === 'approve' ? 'approved' : 'rejected';
    submission.feedback = note;
    submission.reviewedAt = new Date().toISOString();
    if (action === 'approve' && !submission.xpAwarded) {
      const student = state.users.find((user) => user.id === submission.studentId);
      if (!student) return { ok: false, error: 'Ученик не найден.' };
      grantXp(student, REVIEW_XP);
      submission.xpAwarded = true;
      state.studentProgress[student.id] ||= {};
      const current = state.studentProgress[student.id][submission.courseId] || 1;
      state.studentProgress[student.id][submission.courseId] = Math.max(current, submission.lessonNumber + 1);
    }
    return { ok: true, submission };
  }

  function analyzeArduinoCode(code) {
    const source = String(code || '');
    const checks = [
      { ok: /pinMode\s*\(\s*9\s*,\s*OUTPUT\s*\)/.test(source), hint: 'Проверьте, настроен ли Trig (pin 9) как OUTPUT.' },
      { ok: /pinMode\s*\(\s*10\s*,\s*INPUT\s*\)/.test(source), hint: 'Проверьте, настроен ли Echo (pin 10) как INPUT.' },
      { ok: /pulseIn\s*\(\s*10\s*,\s*HIGH\s*\)/.test(source), hint: 'Нужно измерить длительность HIGH-импульса на Echo через pulseIn.' },
      { ok: /0\.034/.test(source) && /\/\s*2/.test(source), hint: 'Проверьте перевод времени в сантиметры и деление пути сигнала на два.' },
      { ok: /Serial\.begin\s*\(\s*9600\s*\)/.test(source) && /Serial\.print/.test(source), hint: 'Настройте Serial на 9600 и выведите измеренное расстояние.' }
    ];
    const passed = checks.filter((check) => check.ok).length;
    return {
      score: Math.round((passed / checks.length) * 100),
      passed,
      total: checks.length,
      hints: checks.filter((check) => !check.ok).map((check) => check.hint)
    };
  }

  return { REVIEW_XP, ensureStateShape, isSafeHttpUrl, validateSubmission, getLatestSubmission, createSubmission, reviewSubmission, analyzeArduinoCode };
});
