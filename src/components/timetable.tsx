'use client';

import type { FC, DragEvent } from 'react';
import type { Day, TimetableCourse } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { X, AlertTriangle, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';

interface TimetableProps {
  days: Day[];
  timeSlots: string[];
  timetableCourses: TimetableCourse[];
  onMoveCourse: (courseId: string, newDay: Day, newTime: string) => void;
  onRemoveCourse: (courseId: string) => void;
}

export const Timetable: FC<TimetableProps> = ({
  days,
  timeSlots,
  timetableCourses,
  onMoveCourse,
  onRemoveCourse,
}) => {
  const handleDragStart = (e: DragEvent<HTMLDivElement>, courseId: string) => {
    e.dataTransfer.setData('courseId', courseId);
    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>, day: Day, time: string) => {
    e.preventDefault();
    const courseId = e.dataTransfer.getData('courseId');
    if (courseId) {
      onMoveCourse(courseId, day, time);
    }
  };

  const getCourseForSlot = (day: Day, time: string) => {
    return timetableCourses.find(c => c.day === day && c.time === time);
  };
  
  const getGridRowForTime = (time: string, duration: number): string => {
    const startIndex = timeSlots.indexOf(time) + 2;
    if (startIndex === 1) return 'auto';
    const endIndex = startIndex + duration;
    return `${startIndex} / ${endIndex}`;
  }
  
  return (
    <div className="h-full w-full flex flex-col">
      <div className="grid grid-cols-[60px_repeat(5,1fr)] text-center font-bold font-headline text-sm sticky top-0 bg-background z-10 pb-2">
        <div className="pt-4"></div>
        {days.map(day => <div key={day} className="py-2">{day}</div>)}
      </div>
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-[60px_repeat(5,1fr)] grid-rows-[repeat(11,minmax(96px,1fr))] gap-1 relative">
          {/* Time labels */}
          {timeSlots.map((time, index) => (
            <div key={time} className="text-xs text-right pr-2 text-muted-foreground" style={{gridRow: index + 2, gridColumn: 1}}>
              {time}
            </div>
          ))}

          {/* Grid lines */}
          {days.map((day, dayIndex) => 
            timeSlots.map((time, timeIndex) => (
              <div 
                key={`${day}-${time}`} 
                className="bg-card/50 rounded-md border-dashed border hover:bg-accent transition-colors"
                style={{gridColumn: dayIndex + 2, gridRow: timeIndex + 2}}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, day, time)}
              ></div>
            ))
          )}

          {/* Courses */}
          {timetableCourses.map(course => (
             <div
              key={course.id}
              draggable
              onDragStart={(e) => handleDragStart(e, course.id)}
              onDragEnd={handleDragEnd}
              className={cn(
                'absolute p-1 w-full cursor-grab transition-all duration-200',
                `col-start-${days.indexOf(course.day) + 2}`
              )}
              style={{
                gridRow: getGridRowForTime(course.time, course.duration),
                gridColumn: days.indexOf(course.day) + 2
              }}
            >
              <Card className={cn(
                'h-full flex flex-col justify-between shadow-lg relative transition-all',
                course.hasConflict ? 'border-destructive border-2 bg-destructive/10' : 'border-primary/20'
              )}>
                <CardHeader className="p-2 flex-row items-center justify-between">
                  <CardTitle className="text-sm font-semibold font-headline leading-tight">{course.title}</CardTitle>
                  <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => onRemoveCourse(course.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardHeader>
                <CardContent className="p-2 text-xs text-muted-foreground flex-grow">
                  <p className="font-code font-semibold">{course.code}</p>
                  <p>{course.credits} credits</p>
                </CardContent>
                {course.hasConflict && (
                  <div className="absolute top-2 right-8 p-1 rounded-full bg-destructive/80 text-destructive-foreground">
                    <AlertTriangle className="h-3 w-3" />
                  </div>
                )}
                <GripVertical className="absolute top-1/2 -translate-y-1/2 -left-1.5 h-6 w-3 text-muted-foreground/50" />
              </Card>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
