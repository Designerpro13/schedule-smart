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

export type Faculty = {
  id: string;
  name: string;
  email: string;
  department: Department;
  subjects: string[];
};

export type PastCourse = {
  code: string;
  title: string;
  credits: number;
  grade: string;
};

export type PastTimetable = {
  semester: string;
  courses: PastCourse[];
};

export interface UserProfile {
    name: string;
    avatar: string;
    semester: string;
    major: string;
    year: string;
    creditsCompleted: number;
    creditsRequired: number;
}

export interface User {
    id: string;
    email: string;
    // The password should not be sent to the client, 
    // but it's part of the base type.
    password?: string; 
    role: 'student' | 'admin';
    profile: UserProfile;
}
