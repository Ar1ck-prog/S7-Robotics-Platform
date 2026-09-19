import os

with open('app.js', 'r', encoding='utf-8') as f:
    code = f.read()

new_function = """
async function renderMentorDashboard() {
  document.getElementById('pageTitle').innerText = 'Кабинет Ментора';
  document.getElementById('pageEyebrow').innerText = 'Управление группами';

  if (!supabaseClient) return;

  // 1. Fetch mentor's groups to get student IDs
  const { data: groups } = await supabaseClient.from('groups').select('id, name, invite_code').eq('mentor_id', currentUser.id);
  const groupIds = groups ? groups.map(g => g.id) : [];

  let students = [];
  if (groupIds.length > 0) {
    const { data: members } = await supabaseClient.from('group_members').select('student_id').in('group_id', groupIds);
    if (members && members.length > 0) {
      const studentIds = members.map(m => m.student_id);
      const { data: profiles } = await supabaseClient.from('profiles').select('*').in('id', studentIds);
      students = profiles || [];
    }
  }

  // 2. Fetch submissions for these students
  let submissions = [];
  if (students.length > 0) {
    const studentIds = students.map(s => s.id);
    const { data: subs } = await supabaseClient.from('submissions').select('*').in('student_id', studentIds).order('created_at', { ascending: false });
    submissions = subs || [];
  }

  const pending = submissions.filter(s => s.status === 'pending');
  const approved = submissions.filter(s => s.status === 'approved');

  document.getElementById('mentorPendingCount').innerText = pending.length;
  document.getElementById('mentorStudentsCount').innerText = students.length;
  document.getElementById('mentorApprovedCount').innerText = approved.length;
  
  const riskStudents = students.filter(student => {
    return approved.filter(s => s.student_id === student.id).length === 0;
  });
  const riskMetric = document.getElementById('mentorRiskMetric');
  if (riskMetric) riskMetric.innerText = riskStudents.length;

  const subsList = document.getElementById('mentorSubmissionsList');
  if (subsList) {
    if (pending.length === 0) {
      subsList.innerHTML = '<p class="muted">Нет работ на проверку.</p>';
    } else {
      subsList.innerHTML = pending.map(sub => {
        const student = students.find(s => s.id === sub.student_id);
        const name = student ? escapeHtml(student.name) : 'Неизвестно';
        let mediaHtml = '';
        if (sub.file_url) {
          // If it's a video, use video tag, else img
          const isVideo = sub.file_url.match(/\\.(mp4|webm|ogg)$/i);
          if (isVideo) {
            mediaHtml = `<video src="${sub.file_url}" controls style="max-width:100%; border-radius:4px; margin-top:10px;"></video>`;
          } else {
            mediaHtml = `<a href="${sub.file_url}" target="_blank"><img src="${sub.file_url}" style="max-width:100%; border-radius:4px; margin-top:10px; max-height:200px; object-fit:cover;" /></a>`;
          }
        }
        
        return `
          <div class="mentor-submission-item" style="border:1px solid var(--border); padding:1rem; border-radius:8px; margin-bottom:1rem;">
            <div style="display:flex; justify-content:space-between; margin-bottom:0.5rem;">
              <strong>${name}</strong>
              <span class="badge pending">Ожидает проверки</span>
            </div>
            <div style="font-size:0.9rem; margin-bottom:0.5rem;">
              <strong>Урок:</strong> ${sub.lesson_number}<br/>
              <strong>Логика (для ИИ):</strong> ${escapeHtml(sub.logic_desc || '')}<br/>
              <strong>С чем столкнулся:</strong> ${escapeHtml(sub.description || '')}
            </div>
            ${mediaHtml}
            <details style="margin-top:10px; font-size:0.9rem;">
              <summary style="cursor:pointer; font-weight:bold;">Код ученика</summary>
              <pre style="background:var(--bg); padding:0.5rem; border-radius:4px; margin-top:0.5rem; white-space:pre-wrap; overflow-x:auto;"><code>${escapeHtml(sub.code_text || '')}</code></pre>
            </details>
            <div style="margin-top:1rem; display:flex; gap:0.5rem;">
              <input type="text" id="feedback-${sub.id}" placeholder="Комментарий / Фидбек..." style="flex:1;" />
              <button class="button success compact" onclick="reviewSubmission('${sub.id}', 'approved')">Одобрить</button>
              <button class="button danger compact" onclick="reviewSubmission('${sub.id}', 'rejected')">На доработку</button>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

window.reviewSubmission = async (subId, status) => {
  const fb = document.getElementById(`feedback-${subId}`).value;
  const { error } = await supabaseClient.from('submissions').update({ status, feedback: fb }).eq('id', subId);
  if (error) {
    alert('Ошибка при сохранении решения: ' + error.message);
    return;
  }
  renderMentorDashboard();
};
"""

# check if it exists, if not, append to end of file
if 'function renderMentorDashboard' not in code and 'async function renderMentorDashboard' not in code:
    code += new_function
    with open('app.js', 'w', encoding='utf-8', newline='\n') as f:
        f.write(code)
    print("Added renderMentorDashboard to app.js")
else:
    print("Already exists!")
