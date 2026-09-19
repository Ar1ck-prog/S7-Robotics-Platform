import os

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

start_str = "  form.onsubmit = (e) => {"
end_str = "  const navGrid = document.querySelector('.lesson-nav-grid');"

start_idx = code.find(start_str)
end_idx = code.find(end_str, start_idx)

new_logic = """  form.onsubmit = async (e) => {
    e.preventDefault();
    if (!supabaseClient) return alert('Supabase не настроен!');
    
    const fd = new FormData(e.target);
    const logicDesc = fd.get('codeUrl');
    const codeText = fd.get('code');
    const description = fd.get('description');
    const file = fd.get('projectFile');
    
    btnSubmit.disabled = true;
    btnSubmit.innerText = 'Отправка...';
    
    let fileUrl = null;
    
    if (file && file.size > 0) {
      if (file.size > 5 * 1024 * 1024) {
        alert('Файл слишком большой (максимум 5 МБ)');
        btnSubmit.disabled = false;
        btnSubmit.innerText = 'Отправить проект';
        return;
      }
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${currentUser.id}-${Date.now()}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabaseClient
        .storage
        .from('project_files')
        .upload(fileName, file);
        
      if (uploadError) {
        alert('Ошибка загрузки файла: ' + uploadError.message);
        btnSubmit.disabled = false;
        btnSubmit.innerText = 'Отправить проект';
        return;
      }
      
      const { data: publicUrlData } = supabaseClient
        .storage
        .from('project_files')
        .getPublicUrl(fileName);
        
      fileUrl = publicUrlData.publicUrl;
    }
    
    const { error: dbError } = await supabaseClient.from('submissions').insert({
      student_id: currentUser.id,
      course_id: String(courseId),
      lesson_number: Number(lessonNumber),
      logic_desc: logicDesc,
      code_text: codeText,
      description: description,
      file_url: fileUrl
    });
    
    if (dbError) {
      alert('Ошибка при сохранении: ' + dbError.message);
      btnSubmit.disabled = false;
      btnSubmit.innerText = 'Отправить проект';
      return;
    }
    
    statusLabel.innerText = 'Успешно отправлено!';
    statusLabel.className = 'submission-status status-approved';
    btnSubmit.innerText = 'Отправлено';
  };

"""

code = code[:start_idx] + new_logic + code[end_idx:]

with open('app.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(code)

print('Updated submit logic!')
