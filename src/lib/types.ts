export type Department = 'Computer Science' | 'Mathematics' | 'Physics' | 'Humanities';

export type Course = {
  id: string;
  code: string;
  title: string;
  credits: number;
  department: Department;
  description: string;
};

export type TimetableCourse = Course & {
  day: Day;
  time: string; // e.g., "09:00"
  duration: number; // hours
  hasConflict?: boolean;
};

export type Day = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
