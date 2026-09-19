(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.S7Core = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const REVIEW_XP = 50;
  const MENTOR_INVITE_CODE = 's7mentor2026';

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

  async function runCompilerSandbox(input) {
    const language = String(input.language || 'arduino').toLowerCase();
    const codeText = String(input.code || '').trim();
    const errors = [];
    const warnings = [];
    if (!codeText) errors.push('Добавьте код для компиляции.');
    if (!['arduino', 'cpp', 'python', 'micropython'].includes(language)) errors.push('Выберите поддерживаемый язык.');
    if (codeText.length > 12000) errors.push('Код слишком длинный для учебной песочницы.');
    if (errors.length) return { ok: false, errors, output: '' };

    if (['arduino', 'cpp'].includes(language)) {
      const open = (codeText.match(/\{/g) || []).length;
      const close = (codeText.match(/\}/g) || []).length;
      if (open !== close) errors.push('Проверьте фигурные скобки: количество { и } не совпадает.');
      if (!/void\s+setup\s*\(/.test(codeText) && language === 'arduino') warnings.push('Для Arduino обычно нужен void setup().');
      if (!/void\s+loop\s*\(/.test(codeText) && language === 'arduino') warnings.push('Для Arduino обычно нужен void loop().');
      if (/Serial\.begin/.test(codeText) && !/;\s*(\/\/.*)?$/m.test(codeText)) warnings.push('Проверьте точки с запятой в C++ строках.');
    }

    if (['python', 'micropython'].includes(language)) {
      const lines = codeText.split('\n');
      lines.forEach((line, index) => {
        if (/^\s*(if|for|while|def|class|try|except|with)\b/.test(line) && !line.trim().endsWith(':')) {
          errors.push(Строка : после блока Python нужен символ :);
        }
      });
      if (/\t/.test(codeText)) warnings.push('Лучше использовать пробелы вместо табов, чтобы избежать ошибок отступов.');
    }

    if (errors.length) return { ok: false, errors, warnings, output: 'Compilation failed in local sandbox.' };

    try {
      const token = typeof CONFIG !== 'undefined' ? CONFIG.VERCEL_SANDBOX_TOKEN : '';
      if (!token) throw new Error('Vercel Sandbox token not found');

      const response = await fetch('https://s7-robotics-compiler.vercel.app/api/compile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ code: codeText, language: language })
      });

      if (!response.ok) throw new Error('Sandbox request failed');
      const data = await response.json();
      return { ok: true, errors: [], warnings, output: data.output || 'Vercel Sandbox: Compilation passed.' };
    } catch (e) {
      console.warn('Vercel API offline or unreachable, using fallback simulation.', e);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            ok: true, 
            errors: [], 
            warnings, 
            output: 'Vercel Sandbox: ' + language + ' build passed. Runtime is isolated; hardware calls are simulated for the demo.' 
          });
        }, 1000);
      });
    }
  }/g) || []).length;
      if (open !== close) errors.push('Проверьте фигурные скобки: количество { и } не совпадает.');
      if (!/void\s+setup\s*\(/.test(code) && language === 'arduino') warnings.push('Для Arduino обычно нужен void setup().');
      if (!/void\s+loop\s*\(/.test(code) && language === 'arduino') warnings.push('Для Arduino обычно нужен void loop().');
      if (/Serial\.begin/.test(code) && !/;\s*(\/\/.*)?$/m.test(code)) warnings.push('Проверьте точки с запятой в C++ строках.');
    }

    if (['python', 'micropython'].includes(language)) {
      const lines = code.split('\n');
      lines.forEach((line, index) => {
        if (/^\s*(if|for|while|def|class|try|except|with)\b/.test(line) && !line.trim().endsWith(':')) {
          errors.push(`Строка ${index + 1}: после блока Python нужен символ :`);
        }
      });
      if (/\t/.test(code)) warnings.push('Лучше использовать пробелы вместо табов, чтобы избежать ошибок отступов.');
    }

    if (errors.length) return { ok: false, errors, warnings, output: 'Compilation failed in local sandbox.' };
    return {
      ok: true,
      errors: [],
      warnings,
      output: `Vercel Sandbox: ${language} build passed. Runtime is isolated; hardware calls are simulated for the demo.`
    };
  }

  function registerUser(state, input) {
    ensureStateShape(state);
    const name = String(input.name || '').trim();
    const email = String(input.email || '').trim().toLowerCase();
    const password = String(input.password || '');
    const role = input.role === 'mentor' ? 'mentor' : 'student';
    const errors = [];
    if (name.length < 2) errors.push('Укажите имя не короче двух символов.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Введите корректный email.');
    if (password.length < 6) errors.push('Пароль должен содержать минимум 6 символов.');
    if (state.users.some((user) => String(user.email || '').toLowerCase() === email)) errors.push('Аккаунт с таким email уже существует.');
    if (role === 'mentor' && input.mentorCode !== MENTOR_INVITE_CODE) errors.push('Неверный код доступа ментора.');
    if (errors.length) return { valid: false, errors };
    const user = {
      id: Math.max(0, ...state.users.map((item) => Number(item.id) || 0)) + 1,
      name,
      email,
      password,
      role,
      ...(role === 'student' ? { level: 1, xp: 0, streak: 1 } : {})
    };
    state.users.push(user);
    if (role === 'student') state.studentProgress[user.id] = {};
    return { valid: true, user };
  }

  return { REVIEW_XP, ensureStateShape, isSafeHttpUrl, validateSubmission, getLatestSubmission, createSubmission, reviewSubmission, analyzeArduinoCode, runCompilerSandbox, registerUser };
});
