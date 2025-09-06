'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Construction } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ModifyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex items-center h-16 px-4 border-b bg-background/80 backdrop-blur-sm md:px-6">
        <Link href="/" passHref>
          <Button variant="outline" size="icon" className="mr-4">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold tracking-tight font-headline">Modify</h1>
      </header>
      <main className="flex items-center justify-center flex-1 p-4 text-center md:p-6">
        <Card className="max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-4 text-2xl font-headline">
              <Construction className="w-8 h-8 text-primary" />
              <span>Under Construction</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This page is currently being built. Please check back later for features to modify courses or your timetable.
            </p>
            <Link href="/" passHref>
              <Button className="mt-6">Go back to Homepage</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
