'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { mockFaculty } from '@/lib/data';
import { ArrowLeft, User, Mail, Book } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function FacultyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-background/80 backdrop-blur-sm md:px-6">
        <Link href="/" passHref>
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight font-headline">Faculty List</h1>
      </header>
      <main className="p-4 md:p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockFaculty.map((faculty) => (
            <Card key={faculty.id} className="flex flex-col">
              <CardHeader className="items-center text-center">
                 <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={`https://i.pravatar.cc/150?u=${faculty.id}`} alt={faculty.name} />
                  <AvatarFallback>{faculty.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="font-headline text-xl">{faculty.name}</CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> {faculty.email}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-col items-center text-center">
                  <p className="flex items-center gap-2 font-semibold">
                    <User className="w-4 h-4 text-primary" />
                    {faculty.department}
                  </p>
                  <div className="mt-4">
                    <h4 className="mb-2 font-semibold text-muted-foreground">Subjects</h4>
                    <div className="flex flex-wrap justify-center gap-2">
                      {faculty.subjects.map(subject => (
                        <Badge key={subject} variant="secondary">{subject}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
