export interface QuickLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: string;
  order_index: number;
  created_at: string;
}

export interface NewsAnnouncement {
  id: string;
  title: string;
  title_ar?: string;
  content: string;
  content_ar?: string;
  image_url: string;
  published_date: string;
  category: string;
  author: string;
  department: string;
  excerpt: string;
  excerpt_ar?: string;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  event_date: string;
  location: string;
  created_at: string;
}

export interface NewHire {
  id: string;
  name: string;
  position: string;
  department: string;
  start_date: string;
  photo_url: string;
  bio: string;
  created_at: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  file_url: string;
  category: string;
  uploaded_at: string;
  created_at: string;
}
