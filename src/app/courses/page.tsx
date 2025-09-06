'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { mockCourses } from '@/lib/data';
import { ArrowLeft, Book } from 'lucide-react';

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-background/80 backdrop-blur-sm md:px-6">
        <Link href="/" passHref>
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight font-headline">All Courses</h1>
      </header>
      <main className="p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockCourses.map((course) => (
            <Card key={course.id} className="flex flex-col">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="font-headline text-lg">{course.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 pt-1">
                      <span className="font-code text-sm font-semibold text-secondary">{course.code}</span>
                      <span className="text-muted-foreground">&bull;</span>
                      <span className="text-sm">{course.department}</span>
                    </CardDescription>
                  </div>
                  <div className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                    {course.credits} Cr
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </CardContent>
              <CardFooter>
                  <Button variant="secondary" size="sm" className="w-full">
                    <Book className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
