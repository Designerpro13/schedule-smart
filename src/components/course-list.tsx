
'use client';

import type { FC } from 'react';
import type { Course, Department } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Search, Book } from 'lucide-react';

interface CourseListProps {
  courses: Course[];
  loading: boolean;
  onAddCourse: (course: Course) => void;
  department: Department | 'all';
  onDepartmentChange: (value: Department | 'all') => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const departments: (Department | 'all')[] = ['all', 'Computer Science', 'Mathematics', 'Physics', 'Humanities'];

export const CourseList: FC<CourseListProps> = ({
  courses,
  loading,
  onAddCourse,
  department,
  onDepartmentChange,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="p-4 border-b">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by code or title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={department} onValueChange={(value: Department | 'all') => onDepartmentChange(value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by department" />
          </SelectTrigger>
          <SelectContent>
            {departments.map((dept) => (
              <SelectItem key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))
          ) : courses.length > 0 ? (
            courses.map((course) => (
              <Card key={course.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="font-headline text-lg">{course.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2 pt-1">
                        <span className="font-code text-sm font-semibold text-secondary">{course.code}</span>
                        <span className='text-muted-foreground'>&bull;</span>
                        <span className="text-sm">{course.department}</span>
                      </CardDescription>
                    </div>
                    <div className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded-md">
                      {course.credits} Cr
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{course.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" onClick={() => onAddCourse(course)} className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add to Timetable
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <Book className="mx-auto h-12 w-12" />
              <p className="mt-4 font-semibold">No courses found</p>
              <p className="text-sm">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
