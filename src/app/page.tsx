
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { BookOpen, Calendar, Users, Award, BookCopy, BarChart, Settings, FolderClock, LogOut } from 'lucide-react';
import { useAuth } from '@/context/auth-context';
import { mockPastTimetables } from '@/lib/data'; // Using this to get some completed courses

export default function DashboardPage() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>; // Or a proper loader
    }

    const { name, avatar, semester, major, year, creditsCompleted, creditsRequired } = user.profile;

    const creditProgress = (creditsCompleted / creditsRequired) * 100;
    
    // For demonstration, taking some courses from past timetables.
    const completedCourses = mockPastTimetables[0]?.courses.slice(0, 4) || [];

    const handleLogout = () => {
      logout();
      router.push('/login');
    };

    const quickLinks = [
      { href: '/scheduler', label: 'Plan my Schedule', icon: Calendar },
      { href: '/courses', label: 'Browse Courses', icon: BookOpen },
      { href: '/faculty', label: 'View Faculty', icon: Users },
      { href: '/my-timetables', label: 'My Timetables', icon: FolderClock },
    ];

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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                  <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">{name}</span>
                  <Avatar className="w-9 h-9">
                    <AvatarImage src={avatar} alt={name} />
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </header>

      <main className="grid flex-1 gap-6 p-4 md:grid-cols-3 lg:grid-cols-4 md:p-6">
        <div className="lg:col-span-3 md:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Welcome back, {name.split(' ')[0]}!</CardTitle>
                    <CardDescription>Here's your academic overview for {semester}.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6 sm:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Degree Progress</CardTitle>
                            <Award className="w-4 h-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{creditsCompleted} / {creditsRequired}</div>
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
                            <div className="text-2xl font-bold">{semester}</div>
                            <p className="text-xs text-muted-foreground">{major} &bull; {year}</p>
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
