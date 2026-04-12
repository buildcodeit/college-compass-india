
CREATE TYPE public.college_type AS ENUM ('IIT', 'NIT', 'IIIT', 'Private', 'Govt');

CREATE TABLE public.colleges (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT NOT NULL,
  type public.college_type NOT NULL,
  nirf_rank INTEGER,
  courses TEXT[] NOT NULL DEFAULT '{}',
  fees TEXT,
  placements_avg TEXT,
  placements_highest TEXT,
  cutoff TEXT,
  rating NUMERIC(2,1),
  established INTEGER,
  website TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.colleges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Colleges are publicly readable"
  ON public.colleges FOR SELECT
  USING (true);

CREATE TABLE public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  college_id TEXT NOT NULL REFERENCES public.colleges(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, college_id)
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookmarks"
  ON public.bookmarks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can add bookmarks"
  ON public.bookmarks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove bookmarks"
  ON public.bookmarks FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX idx_colleges_type ON public.colleges(type);
CREATE INDEX idx_colleges_state ON public.colleges(state);
CREATE INDEX idx_colleges_nirf_rank ON public.colleges(nirf_rank);
