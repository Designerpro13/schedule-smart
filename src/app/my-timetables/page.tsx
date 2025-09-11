
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, FolderClock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import type { PastTimetable } from '@/lib/types';

const hasCurrentTimetable = false; // Mock flag

export default function MyTimetablesPage() {
  const [pastTimetables, setPastTimetables] = useState<PastTimetable[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimetables = async () => {
      try {
        const res = await fetch('/api/timetables');
        const data = await res.json();
        setPastTimetables(data);
      } catch (error) {
        console.error('Failed to fetch past timetables', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTimetables();
  }, []);


  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-background/80 backdrop-blur-sm md:px-6">
        <Link href="/" passHref>
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight font-headline">My Timetables</h1>
      </header>
      <main className="p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Calendar className="w-5 h-5 text-primary" />
                Current Timetable (Fall 2024)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {hasCurrentTimetable ? (
                <div>
                  <p>Display current timetable here...</p>
                </div>
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  <p className="mb-4">You haven't planned your schedule for the current semester yet.</p>
                  <Link href="/scheduler" passHref>
                    <Button>
                      <Calendar className="mr-2 h-4 w-4" />
                      Plan my Schedule
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <FolderClock className="w-5 h-5 text-primary" />
                Past Timetables
              </CardTitle>
              <CardDescription>Review your schedules from previous semesters.</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : pastTimetables.length > 0 ? (
                <Accordion type="single" collapsible className="w-full">
                  {pastTimetables.map((timetable) => (
                    <AccordionItem key={timetable.semester} value={timetable.semester}>
                      <AccordionTrigger className="font-semibold text-lg">
                        {timetable.semester}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {timetable.courses.map((course) => (
                            <div key={course.code} className="p-3 rounded-lg bg-muted/50 flex justify-between items-center">
                              <div>
                                <p className="font-semibold">{course.title} <span className="text-sm font-normal text-muted-foreground font-code">({course.code})</span></p>
                                <p className="text-sm text-muted-foreground">{course.credits} Credits</p>
                              </div>
                              <Badge variant={course.grade.startsWith('A') ? 'default' : 'secondary'}>
                                Grade: {course.grade}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : (
                <p className="text-muted-foreground text-center p-4">No past timetables found.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
