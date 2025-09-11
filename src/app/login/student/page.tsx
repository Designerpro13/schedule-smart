
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookCopy, AlertTriangle, PenSquare, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function StudentLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      toast({
        title: 'Login Successful',
        description: `Welcome back, ${user.profile.name}!`,
      });
      if (user.role === 'admin') {
        // This case should ideally not happen from student login, but as a fallback
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAutofill = () => {
    setEmail('alex.doe@university.edu');
    setPassword('password123');
    toast({
      title: 'Demo Credentials Filled',
      description: 'Ready to sign in as a student.',
    });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background">
       <Link href="/login" passHref className="absolute top-4 left-4 z-10">
        <Button variant="outline" size="icon">
          <ArrowLeft className="w-4 h-4" />
        </Button>
      </Link>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 -z-10"></div>
      
      <Card className="w-full max-w-sm bg-white/30 backdrop-blur-lg border-white/40 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookCopy className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline text-foreground">Student Login</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="email">Email</Label>
                <Button variant="ghost" size="icon" type="button" onClick={handleAutofill} className="h-6 w-6 text-muted-foreground" title="Auto-fill for demo">
                    <PenSquare className="h-4 w-4" />
                </Button>
              </div>
              <Input
                id="email"
                type="email"
                placeholder="name@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-background/80"
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                 className="bg-background/80"
                 disabled={loading}
              />
            </div>
            {error && (
              <div className="flex items-center p-2 text-sm rounded-md bg-destructive/10 text-destructive">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>{error}</span>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
            <Separator className="my-2" />
             <p className="text-xs text-muted-foreground">
                Not a student? <Link href="/login/admin" className="underline hover:text-primary">Admin Login</Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
