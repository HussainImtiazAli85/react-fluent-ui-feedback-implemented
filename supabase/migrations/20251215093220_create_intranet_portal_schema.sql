/*
  # Intranet Portal Schema

  1. New Tables
    - `quick_links`
      - `id` (uuid, primary key)
      - `title` (text) - Link title
      - `description` (text) - Link description
      - `url` (text) - Link URL
      - `icon` (text) - Icon name
      - `order_index` (integer) - Display order
      - `created_at` (timestamptz)
    
    - `news_announcements`
      - `id` (uuid, primary key)
      - `title` (text) - News title
      - `content` (text) - News content
      - `image_url` (text) - Optional image
      - `published_date` (timestamptz)
      - `created_at` (timestamptz)
    
    - `events`
      - `id` (uuid, primary key)
      - `title` (text) - Event title
      - `description` (text) - Event description
      - `event_date` (timestamptz) - Event date/time
      - `location` (text) - Event location
      - `created_at` (timestamptz)
    
    - `new_hires`
      - `id` (uuid, primary key)
      - `name` (text) - Employee name
      - `position` (text) - Job title
      - `department` (text) - Department
      - `start_date` (date) - Start date
      - `photo_url` (text) - Profile photo
      - `bio` (text) - Short bio
      - `created_at` (timestamptz)
    
    - `documents`
      - `id` (uuid, primary key)
      - `title` (text) - Document title
      - `description` (text) - Document description
      - `file_url` (text) - Document URL
      - `category` (text) - Document category
      - `uploaded_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (typical for intranet portals where all employees can view content)
*/

CREATE TABLE IF NOT EXISTS quick_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  url text NOT NULL,
  icon text DEFAULT 'link',
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS news_announcements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  image_url text DEFAULT '',
  published_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  event_date timestamptz NOT NULL,
  location text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS new_hires (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  department text NOT NULL,
  start_date date NOT NULL,
  photo_url text DEFAULT '',
  bio text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  file_url text NOT NULL,
  category text DEFAULT 'general',
  uploaded_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE quick_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE new_hires ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quick links"
  ON quick_links FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view news announcements"
  ON news_announcements FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view events"
  ON events FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view new hires"
  ON new_hires FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view documents"
  ON documents FOR SELECT
  TO anon, authenticated
  USING (true);

INSERT INTO quick_links (title, description, url, icon, order_index) VALUES
  ('HR Portal', 'Access employee resources', '#', 'users', 1),
  ('IT Support', 'Submit and track tickets', '#', 'headphones', 2),
  ('Time Off', 'Request vacation and sick days', '#', 'calendar', 3),
  ('Benefits', 'View your benefits package', '#', 'heart', 4),
  ('Training', 'Online learning resources', '#', 'graduation-cap', 5),
  ('Directory', 'Find employee contacts', '#', 'book-user', 6),
  ('Policies', 'Company policies and procedures', '#', 'file-text', 7),
  ('Feedback', 'Submit suggestions', '#', 'message-square', 8);

INSERT INTO news_announcements (title, content, published_date) VALUES
  ('Welcome to Q4 2025', 'We are excited to announce new initiatives for the last quarter of 2025. Stay tuned for updates on company expansion and new projects.', now() - interval '2 days'),
  ('New Office Opening', 'We are thrilled to announce the opening of our new office in Seattle! The new space will accommodate our growing team.', now() - interval '5 days'),
  ('Employee Wellness Program', 'Starting next month, we are launching a comprehensive wellness program including gym memberships and mental health resources.', now() - interval '7 days');

INSERT INTO events (title, description, event_date, location) VALUES
  ('Team Building Workshop', 'Join us for a day of team activities and collaboration exercises', now() + interval '5 days', 'Conference Room A'),
  ('Annual Company Meeting', 'Year-end review and 2026 planning session', now() + interval '15 days', 'Main Auditorium'),
  ('Holiday Party', 'Celebrate the season with colleagues', now() + interval '20 days', 'Grand Ballroom');

INSERT INTO new_hires (name, position, department, start_date) VALUES
  ('Sarah Johnson', 'Senior Developer', 'Engineering', current_date - interval '3 days'),
  ('Michael Chen', 'Marketing Manager', 'Marketing', current_date - interval '1 week'),
  ('Emma Williams', 'Product Designer', 'Design', current_date - interval '2 weeks');

INSERT INTO documents (title, description, category, file_url) VALUES
  ('Employee Handbook', 'Complete guide to company policies', 'HR', '#'),
  ('IT Security Guidelines', 'Best practices for data security', 'IT', '#'),
  ('Expense Report Template', 'Template for submitting expenses', 'Finance', '#'),
  ('Brand Guidelines', 'Company branding and style guide', 'Marketing', '#');