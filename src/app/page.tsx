'use client';

import type { FC } from 'react';
import { useState, useMemo, useEffect, useCallback } from 'react';
import type { Course, TimetableCourse, Day, Department } from '@/lib/types';
import { mockCourses } from '@/lib/data';
import { CourseList } from '@/components/course-list';
import { Timetable } from '@/components/timetable';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, CalendarDays, Mail, AlertTriangle, Info, Clock, Menu } from 'lucide-react';
import { useSessionTimeout } from '@/hooks/use-session-timeout';
import { SessionTimeoutModal } from '@/components/session-timeout-modal';

const MIN_CREDITS = 17;
const MAX_CREDITS = 27;

const DAYS: Day[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TIME_SLOTS = Array.from({ length: 11 }, (_, i) => `${(i + 8).toString().padStart(2, '0')}:00`); // 08:00 to 18:00

const HomePage: FC = () => {
  const [timetable, setTimetable] = useState<TimetableCourse[]>([]);
  const [departmentFilter, setDepartmentFilter] = useState<Department | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const { isModalOpen, handleStay, handleLogout, active, remaining } = useSessionTimeout(15 * 60 * 1000);

  const totalCredits = useMemo(() => {
    return timetable.reduce((acc, course) => acc + course.credits, 0);
  }, [timetable]);

  const creditStatus = useMemo(() => {
    if (totalCredits < MIN_CREDITS) return 'min';
    if (totalCredits > MAX_CREDITS) return 'max';
    return 'ok';
  }, [totalCredits]);

  const checkConflict = useCallback((courseToAdd: TimetableCourse, currentTimetable: TimetableCourse[]): boolean => {
    for (const existingCourse of currentTimetable) {
      if (courseToAdd.id !== existingCourse.id && courseToAdd.day === existingCourse.day) {
        const startA = parseInt(courseToAdd.time.split(':')[0]);
        const endA = startA + courseToAdd.duration;
        const startB = parseInt(existingCourse.time.split(':')[0]);
        const endB = startB + existingCourse.duration;

        if (startA < endB && endA > startB) {
          return true;
        }
      }
    }
    return false;
  }, []);

  const updateConflicts = useCallback((currentTimetable: TimetableCourse[]) => {
    return currentTimetable.map(course => ({
      ...course,
      hasConflict: checkConflict(course, currentTimetable),
    }));
  }, [checkConflict]);

  const addCourse = (course: Course) => {
    if (timetable.some(c => c.id === course.id)) {
      toast({
        variant: 'destructive',
        title: 'Course Already Added',
        description: `${course.code} is already in your timetable.`,
      });
      return;
    }

    // Find the first available slot
    for (const day of DAYS) {
      for (const time of TIME_SLOTS) {
        const newCourse: TimetableCourse = { ...course, day, time, duration: 2 }; // Assume 2h duration
        if (!checkConflict(newCourse, timetable)) {
          const newTimetable = [...timetable, newCourse];
          setTimetable(updateConflicts(newTimetable));
          toast({
            title: 'Course Added',
            description: `${course.code} has been added to your timetable.`,
          });
          return;
        }
      }
    }

    toast({
      variant: 'destructive',
      title: 'No Available Slot',
      description: `Could not find a free slot for ${course.code}. Please make space.`,
    });
  };

  const removeCourse = (courseId: string) => {
    const newTimetable = timetable.filter(c => c.id !== courseId);
    setTimetable(updateConflicts(newTimetable));
    const removedCourse = timetable.find(c => c.id === courseId);
    if(removedCourse){
      toast({
        title: 'Course Removed',
        description: `${removedCourse.code} has been removed from your timetable.`,
      });
    }
  };

  const moveCourse = (courseId: string, newDay: Day, newTime: string) => {
    const newTimetable = timetable.map(c =>
      c.id === courseId ? { ...c, day: newDay, time: newTime } : c
    );
    setTimetable(updateConflicts(newTimetable));
  };
  
  const handleSendEmail = () => {
    if(!email) {
       toast({ variant: "destructive", title: "Email required", description: "Please enter your email address." });
       return;
    }
    console.log(`Sending timetable to ${email}`);
    toast({ title: "Timetable Sent!", description: `Your schedule has been sent to ${email}.` });
  };

  const filteredCourses = useMemo(() => {
    return mockCourses.filter(course => {
      const matchesDepartment = departmentFilter === 'all' || course.department === departmentFilter;
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDepartment && matchesSearch;
    });
  }, [departmentFilter, searchQuery]);
  
  return (
    <div className="min-h-screen w-full">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6 justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight font-headline">CourseCraft</h1>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Menu</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => alert('View course clicked')}>View Course</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => alert('Modify clicked')}>Modify</DropdownMenuItem>
              <DropdownMenuItem onSelect={() => alert('View faculty list clicked')}>View Faculty List</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">{totalCredits}</span>
            <span className="text-muted-foreground">Credits</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">{currentTime}</span>
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button disabled={creditStatus !== 'ok'}>
              <Mail className="mr-2 h-4 w-4" />
              Send to Email
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="font-headline">Send Timetable</DialogTitle>
              <DialogDescription>
                Enter your email address to receive a copy of your timetable.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSendEmail}>Send</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>

      <main className="grid flex-1 grid-cols-1 md:grid-cols-[350px_1fr] lg:grid-cols-[400px_1fr]">
        <aside className="border-r bg-card flex flex-col">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-bold font-headline">Course Browser</h2>
            </div>
            {creditStatus !== 'ok' && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Credit Limit Warning</AlertTitle>
                <AlertDescription>
                  You must have between {MIN_CREDITS} and {MAX_CREDITS} credits. You currently have {totalCredits}.
                </AlertDescription>
              </Alert>
            )}
             {creditStatus === 'ok' && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Credit Load is Valid</AlertTitle>
                <AlertDescription>
                  Your current credit load of {totalCredits} is within the acceptable range.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <CourseList
            courses={filteredCourses}
            onAddCourse={addCourse}
            department={departmentFilter}
            onDepartmentChange={setDepartmentFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </aside>

        <section className="p-4 md:p-6">
          <Timetable
            days={DAYS}
            timeSlots={TIME_SLOTS}
            timetableCourses={timetable}
            onMoveCourse={moveCourse}
            onRemoveCourse={removeCourse}
          />
        </section>
      </main>
      <SessionTimeoutModal isOpen={isModalOpen} onStay={handleStay} onLogout={handleLogout} remainingTime={remaining} />
    </div>
  );
};

export default HomePage;
