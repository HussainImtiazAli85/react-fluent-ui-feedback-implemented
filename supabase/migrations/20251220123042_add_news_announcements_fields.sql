/*
  # Add fields to news_announcements table
  
  1. Changes
    - Add `category` field to categorize news (info, warning, success, urgent)
    - Add `author` field to track who posted the announcement
    - Add `department` field to identify the posting department
    - Add `excerpt` field for short preview text
  
  2. Data Updates
    - Update existing records with default values
*/

-- Add new columns to news_announcements table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_announcements' AND column_name = 'category'
  ) THEN
    ALTER TABLE news_announcements ADD COLUMN category text DEFAULT 'info';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_announcements' AND column_name = 'author'
  ) THEN
    ALTER TABLE news_announcements ADD COLUMN author text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_announcements' AND column_name = 'department'
  ) THEN
    ALTER TABLE news_announcements ADD COLUMN department text DEFAULT '';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_announcements' AND column_name = 'excerpt'
  ) THEN
    ALTER TABLE news_announcements ADD COLUMN excerpt text DEFAULT '';
  END IF;
END $$;

-- Update existing records with appropriate values
UPDATE news_announcements
SET 
  category = 'info',
  author = 'Administration',
  department = 'Corporate Communications',
  excerpt = substring(content, 1, 100)
WHERE category = 'info' OR category IS NULL;