'use client';

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Calendar, Users, Award, BookCopy, BarChart, Settings, FolderClock } from 'lucide-react';

const student = {
  name: 'Alex Doe',
  id: '123456',
  email: 'alex.doe@university.edu',
  avatar: 'https://i.pravatar.cc/150?u=alexdoe',
  major: 'Computer Science',
  year: '3rd Year',
  semester: 'Fall 2024',
  creditsCompleted: 78,
  creditsRequired: 120,
};

const quickLinks = [
  { href: '/scheduler', label: 'Plan my Schedule', icon: Calendar },
  { href: '/courses', label: 'Browse Courses', icon: BookOpen },
  { href: '/faculty', label: 'View Faculty', icon: Users },
  { href: '/my-timetables', label: 'My Timetables', icon: FolderClock },
];

const completedCourses = [
    { code: 'CS 101', title: 'Intro to Programming', credits: 4, grade: 'A' },
    { code: 'MATH 150', title: 'Calculus I', credits: 5, grade: 'B+' },
    { code: 'PHY 100', title: 'Classical Mechanics', credits: 4, grade: 'A-' },
    { code: 'HUM 120', title: 'World History', credits: 3, grade: 'B' },
];

export default function DashboardPage() {
    const creditProgress = (student.creditsCompleted / student.creditsRequired) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-background/80 backdrop-blur-sm md:px-6 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <BookCopy className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight font-headline">CourseCraft Dashboard</h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">{student.name}</span>
            <Avatar className="w-9 h-9">
              <AvatarImage src={student.avatar} alt={student.name} />
              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
            </Avatar>
        </div>
      </header>

      <main className="grid flex-1 gap-6 p-4 md:grid-cols-3 lg:grid-cols-4 md:p-6">
        <div className="lg:col-span-3 md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Welcome back, {student.name.split(' ')[0]}!</CardTitle>
                    <CardDescription>Here's your academic overview for {student.semester}.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Degree Progress</CardTitle>
                            <Award className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{student.creditsCompleted} / {student.creditsRequired}</div>
                            <p className="text-xs text-muted-foreground">credits completed</p>
                            <Progress value={creditProgress} className="mt-2 h-2" />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Current Semester</CardTitle>
                             <Calendar className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{student.semester}</div>
                            <p className="text-xs text-muted-foreground">{student.major} &bull; {student.year}</p>
                        </CardContent>
                    </Card>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 font-headline">
                        <BookOpen className="w-5 h-5 text-primary" />
                        Recently Completed Courses
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {completedCourses.map(course => (
                            <div key={course.code} className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
                                <div>
                                    <p className="font-semibold">{course.title} <span className="text-sm font-normal text-muted-foreground font-code">({course.code})</span></p>
                                    <p className="text-sm text-muted-foreground">{course.credits} Credits</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-primary">{course.grade}</p>
                                    <p className="text-xs text-muted-foreground">Grade</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>

        <aside className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Settings className="w-5 h-5 text-primary" />
                Quick Actions
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              {quickLinks.map((link) => (
                <Link key={link.href} href={link.href} passHref>
                  <Button variant="outline" className="flex flex-col items-center justify-center h-24 text-center w-full p-2">
                    <link.icon className="w-6 h-6 mb-2" />
                    <span className="text-xs font-semibold leading-tight">{link.label}</span>
                  </Button>
                </Link>
              ))}
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <BarChart className="w-5 h-5 text-primary" />
                Student Analytics
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-center text-muted-foreground p-4">
                    Charts and analytics coming soon.
                </p>
            </CardContent>
          </Card>
        </aside>
      </main>
    </div>
  );
}
