-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;

-- Create a more secure policy that only allows users to insert their own profile
CREATE POLICY "Users can insert their own profile" 
ON user_profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Users can insert their own preferences" ON user_preferences;

-- Create a more secure policy that only allows users to insert their own preferences
CREATE POLICY "Users can insert their own preferences" 
ON user_preferences FOR INSERT 
WITH CHECK (auth.uid() = user_id);
