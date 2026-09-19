import os

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

start_str = "    btnPrecheck.onclick = async () => {"
end_str = "    document.getElementById('submitProjectForm').addEventListener('submit', (e) => {"

start_idx = code.find(start_str)
end_idx = code.find(end_str)

new_ai_logic = """    btnPrecheck.onclick = async () => {
      const codeUrl = document.getElementById('inputCodeUrl').value;
      const codeText = document.getElementById('inputCode').value;
      const descText = document.getElementById('inputDescription').value;
      
      if (!codeText) {
        precheckRes.hidden = false;
        precheckRes.innerHTML = `${svgs.error} Пожалуйста, вставьте код для проверки!`;
        return;
      }
      
      btnPrecheck.innerHTML = `${svgs.loading} AI думает...`;
      btnPrecheck.disabled = true;
      precheckRes.hidden = false;
      precheckRes.innerHTML = "<i>Анализирую код через Gemini AI...</i>";
      
      try {
        if (!CONFIG.GEMINI_API_KEY || CONFIG.GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
          throw new Error('API ключ Gemini не настроен');
        }
        
        const prompt = `Действуй как опытный ментор по робототехнике. Ученик прислал код для проверки.
Описание логики ученика: ${codeUrl}
С чем столкнулись: ${descText}

Код ученика:
${codeText}

Оцени код по 100-балльной шкале и дай краткие, полезные советы по улучшению (до 3-х пунктов). Форматируй ответ в HTML (используй <strong>, <ul>, <li>). Не используй markdown. Начни сразу с оценки: "<strong>Оценка: X/100</strong><br><br>Совеы:..."`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        });
        
        const data = await response.json();
        if (data.error) throw new Error(data.error.message);
        
        const aiHtml = data.candidates[0].content.parts[0].text;
        
        precheckRes.innerHTML = `<div class="ai-report" style="text-align:left;">${aiHtml}</div>`;
      } catch (err) {
        precheckRes.innerHTML = `<div class="ai-report" style="color:red;">Ошибка AI: ${err.message}</div>`;
      }
      
      btnPrecheck.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16" style="margin-right:8px;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>AI проверка перед сдачей`;
      btnPrecheck.disabled = false;
    };

"""

code = code[:start_idx] + new_ai_logic + code[end_idx:]

with open('app.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(code)

print('Replaced AI logic!')
