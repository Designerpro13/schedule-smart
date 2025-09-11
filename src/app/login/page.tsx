
'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Shield, Wrench } from 'lucide-react';

export default function LoginSelectionPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 -z-10"></div>
      
      <Card className="w-full max-w-sm bg-white/30 backdrop-blur-lg border-white/40 shadow-2xl">
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
              I am a Tech Support
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
