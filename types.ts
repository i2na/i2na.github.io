export enum ProjectCategory {
  FRONTEND = 'Frontend',
  FULLSTACK = 'Fullstack',
  THREEJS = '3D Web',
  UIUX = 'UI/UX'
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  link?: string;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string; // Markdown-like content
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}