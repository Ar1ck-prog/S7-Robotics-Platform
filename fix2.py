import os

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

start_idx = code.find("document.getElementById('registerForm').addEventListener('submit',")
end_idx = code.find("document.getElementById('logoutButton').addEventListener('click',", start_idx)

new_register = """document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!supabaseClient) return alert('Supabase error');
  
  const fd = new FormData(e.target);
  const role = fd.get('role');
  const name = String(fd.get('name')).trim();
  const email = String(fd.get('email')).trim().toLowerCase();
  const pass = fd.get('password');
  const confirmPass = fd.get('confirmPassword');
  const mentorCode = fd.get('mentorCode');
  const errorEl = document.getElementById('authError');
  const btn = e.target.querySelector('button');
  
  if (pass !== confirmPass) {
    errorEl.innerText = 'Пароли не совпадают';
    return;
  }
  
  if (role === 'mentor' && mentorCode !== 's7-admin-2026') {
    errorEl.innerText = 'Неверный код доступа для ментора';
    return;
  }
  
  btn.disabled = true;
  btn.innerText = 'Регистрация...';
  errorEl.innerText = '';
  
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password: pass,
    options: {
      data: { name, role }
    }
  });
  
  btn.disabled = false;
  btn.innerText = 'Зарегистрироваться';
  
  if (error) {
    errorEl.innerText = error.message;
    return;
  }
  
  if (data.user) {
    currentUser = { id: data.user.id, name, role, email };
    localStorage.setItem(SESSION_KEY, data.user.id);
    e.target.reset();
    errorEl.innerText = '';
    
    // Group Modal Logic
    const modal = document.getElementById('groupModal');
    const title = document.getElementById('groupModalTitle');
    const desc = document.getElementById('groupModalDesc');
    const input = document.getElementById('groupInput');
    const btnGroup = document.getElementById('btnGroupAction');
    const codeDisplay = document.getElementById('groupCodeDisplay');
    
    if (role === 'mentor') {
      modal.style.display = 'flex';
      codeDisplay.style.display = 'none';
      input.style.display = 'block';
      input.value = '';
      
      title.textContent = 'Создать группу';
      desc.textContent = 'Введите название группы для учеников.';
      input.placeholder = 'Название группы';
      btnGroup.textContent = 'Создать';
      
      btnGroup.onclick = async () => {
        if (btnGroup.textContent === 'Создать') {
          if (!input.value) return;
          const code = 'S7-' + Math.random().toString(36).substring(2, 6).toUpperCase();
          const { error: gErr } = await supabaseClient.from('groups').insert({
            mentor_id: currentUser.id,
            name: input.value,
            invite_code: code
          });
          if (gErr) {
            alert('Ошибка создания группы: ' + gErr.message);
            return;
          }
          input.style.display = 'none';
          codeDisplay.style.display = 'block';
          codeDisplay.textContent = code;
          desc.textContent = 'Группа создана! Отправьте код ученикам:';
          btnGroup.textContent = 'Войти в систему';
        } else {
          modal.style.display = 'none';
          showAppShell();
        }
      };
    } else {
      modal.style.display = 'flex';
      codeDisplay.style.display = 'none';
      input.style.display = 'block';
      input.value = '';
      
      title.textContent = 'Присоединиться к группе';
      desc.textContent = 'Введите код, выданный вашим ментором.';
      input.placeholder = 'Код: S7-ABCD';
      btnGroup.textContent = 'Войти в группу';
      
      btnGroup.onclick = async () => {
        const inviteCode = input.value.trim().toUpperCase();
        if (!inviteCode) return;
        
        btnGroup.disabled = true;
        btnGroup.textContent = 'Проверка...';
        
        const { data: group, error: fetchErr } = await supabaseClient.from('groups').select('id').eq('invite_code', inviteCode).single();
        
        if (fetchErr || !group) {
          alert('Неверный код группы! Пожалуйста, проверьте код.');
          btnGroup.disabled = false;
          btnGroup.textContent = 'Войти в группу';
          return;
        }
        
        const { error: insertErr } = await supabaseClient.from('group_members').insert({
          group_id: group.id,
          student_id: currentUser.id
        });
        
        if (insertErr) {
          alert('Ошибка при вступлении в группу.');
          btnGroup.disabled = false;
          btnGroup.textContent = 'Войти в группу';
          return;
        }
        
        modal.style.display = 'none';
        showAppShell();
      };
    }
  }
});

"""

code = code[:start_idx] + new_register + code[end_idx:]

with open('app.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(code)

print('Updated register form!')
