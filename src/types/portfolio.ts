export interface MetricStat {
  label: string;
  value: string;
  description: string;
  iconName: string;
  changeIndicator?: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI / ML' | 'Data Systems' | 'Full-Stack' | 'Cloud Infra';
  problem: string;
  solution: string;
  businessImpact: string;
  metrics: string[];
  techStack: string[];
  githubUrl: string;
  liveDemoUrl: string;
  architectureNotes: string;
  featured: boolean;
  radarScore: number; // 0 to 100 benchmark metric
}

export interface SkillNode {
  name: string;
  level: number; // 0-100
  nodeType: 'core' | 'framework' | 'db' | 'cloud';
  description: string;
  linkedSkills?: string[];
  tag: string;
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  icon: string;
  description: string;
  skills: SkillNode[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  location: string;
  duration: string;
  type: string;
  description: string;
  metrics: string[];
  achievements: string[];
  techUsed: string[];
}

export interface UserProfile {
  name: string;
  handle: string;
  role: string;
  subRole: string;
  experienceLevel: string;
  tagline: string;
  summary: string;
  location: string;
  availability: string;
  statusText: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  resumeUrl: string;
  stats: MetricStat[];
}

export interface PortfolioData {
  profile: UserProfile;
  projects: Project[];
  skillCategories: SkillCategory[];
  experience: ExperienceItem[];
  terminalWelcomeMessage: string[];
}
