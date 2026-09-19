-- =============================================
-- 1. Таблица submissions
-- =============================================
CREATE TABLE public.submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  course_id TEXT NOT NULL,
  lesson_number INTEGER NOT NULL,
  logic_desc TEXT,
  code_text TEXT,
  description TEXT,
  file_url TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Студенты видят свои решения"
  ON public.submissions FOR SELECT
  USING (auth.uid() = student_id);

CREATE POLICY "Менторы видят решения своих студентов"
  ON public.submissions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members gm
      JOIN public.groups g ON gm.group_id = g.id
      WHERE gm.student_id = submissions.student_id
      AND g.mentor_id = auth.uid()
    )
  );

CREATE POLICY "Студенты могут добавлять решения"
  ON public.submissions FOR INSERT
  WITH CHECK (auth.uid() = student_id);

CREATE POLICY "Менторы могут обновлять статус (оценивать)"
  ON public.submissions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.group_members gm
      JOIN public.groups g ON gm.group_id = g.id
      WHERE gm.student_id = submissions.student_id
      AND g.mentor_id = auth.uid()
    )
  );

-- =============================================
-- 2. Бакет для файлов project_files
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('project_files', 'project_files', true);

CREATE POLICY "Авторизованные пользователи могут загружать файлы" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'project_files' AND 
  auth.role() = 'authenticated'
);

CREATE POLICY "Все могут просматривать файлы" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'project_files');
