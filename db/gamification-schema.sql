-- Create a table for user points and levels
CREATE TABLE IF NOT EXISTS user_gamification (
  user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
  points INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for challenges
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  points INTEGER NOT NULL,
  duration TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  active BOOLEAN DEFAULT TRUE
);

-- Create a table for challenge tasks
CREATE TABLE IF NOT EXISTS challenge_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  challenge_id UUID REFERENCES challenges(id) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create a table for user challenges
CREATE TABLE IF NOT EXISTS user_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  challenge_id UUID REFERENCES challenges(id) NOT NULL,
  status TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, challenge_id)
);

-- Create a table for user challenge tasks
CREATE TABLE IF NOT EXISTS user_challenge_tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_challenge_id UUID REFERENCES user_challenges(id) NOT NULL,
  task_id UUID REFERENCES challenge_tasks(id) NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completed_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_challenge_id, task_id)
);

-- Create a table for AI assistant conversations
CREATE TABLE IF NOT EXISTS ai_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) NOT NULL,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RLS policies
ALTER TABLE user_gamification ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_challenge_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for user_gamification
CREATE POLICY "Users can view their own gamification data" 
ON user_gamification FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own gamification data" 
ON user_gamification FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for user_challenges
CREATE POLICY "Users can view their own challenges" 
ON user_challenges FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own challenges" 
ON user_challenges FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own challenges" 
ON user_challenges FOR UPDATE 
USING (auth.uid() = user_id);

-- Create policies for user_challenge_tasks
CREATE POLICY "Users can view their own challenge tasks" 
ON user_challenge_tasks FOR SELECT 
USING (EXISTS (
  SELECT 1 FROM user_challenges 
  WHERE user_challenges.id = user_challenge_tasks.user_challenge_id 
  AND user_challenges.user_id = auth.uid()
));

CREATE POLICY "Users can update their own challenge tasks" 
ON user_challenge_tasks FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM user_challenges 
  WHERE user_challenges.id = user_challenge_tasks.user_challenge_id 
  AND user_challenges.user_id = auth.uid()
));

-- Create policies for ai_conversations
CREATE POLICY "Users can view their own AI conversations" 
ON ai_conversations FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own AI conversations" 
ON ai_conversations FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own AI conversations" 
ON ai_conversations FOR UPDATE 
USING (auth.uid() = user_id);
