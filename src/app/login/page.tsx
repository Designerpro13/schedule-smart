
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Shield, Wrench } from 'lucide-react';

export default function LoginSelectionPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 -z-10"></div>
      
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
        <Card className="relative w-full max-w-sm bg-card shadow-2xl border-border/50">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline text-foreground">Welcome to CourseCraft</CardTitle>
            <CardDescription>Please select your role to sign in.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <Link href="/login/student" passHref>
              <Button className="w-full" size="lg">
                <User className="mr-2" />
                I am a Student
              </Button>
            </Link>
            <Link href="/login/admin" passHref>
              <Button variant="secondary" className="w-full" size="lg">
                <Shield className="mr-2" />
                I am an Admin
              </Button>
            </Link>
            <Link href="/login/techy" passHref>
              <Button variant="outline" className="w-full" size="lg">
                <Wrench className="mr-2" />
                I am Tech Support
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
