export interface CoupleInfo {
  partner1: string;
  partner2: string;
  startDate: string; // ISO date format YYYY-MM-DD
  songTitle: string;
  subheading: string;
}

export interface StoryMilestone {
  id: string;
  date: string;
  displayDate: string;
  title: string;
  tag: string;
  content: string[];
  image?: string;
  location?: string;
  iconType: 'heart' | 'sparkles' | 'coffee' | 'star' | 'sunset' | 'ring';
}

export interface PolaroidPhoto {
  id: string;
  image: string;
  caption: string;
  date: string;
  location: string;
  rotation: string; // e.g. -rotate-2, rotate-3
  note: string;
}
