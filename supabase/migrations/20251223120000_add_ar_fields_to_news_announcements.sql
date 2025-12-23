/*
  # Add Arabic fields to news_announcements

  Adds optional Arabic columns so UI can render Arabic news content when i18n language is 'ar'.

  Columns:
  - title_ar
  - content_ar
  - excerpt_ar
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_announcements' AND column_name = 'title_ar'
  ) THEN
    ALTER TABLE news_announcements ADD COLUMN title_ar text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_announcements' AND column_name = 'content_ar'
  ) THEN
    ALTER TABLE news_announcements ADD COLUMN content_ar text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'news_announcements' AND column_name = 'excerpt_ar'
  ) THEN
    ALTER TABLE news_announcements ADD COLUMN excerpt_ar text;
  END IF;
END $$;

-- Best-effort: keep excerpt_ar in sync when content_ar exists
UPDATE news_announcements
SET excerpt_ar = substring(content_ar, 1, 100)
WHERE (excerpt_ar IS NULL OR excerpt_ar = '')
  AND content_ar IS NOT NULL
  AND content_ar <> '';
