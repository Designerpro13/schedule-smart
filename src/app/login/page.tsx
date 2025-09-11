
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BookCopy, AlertTriangle, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showBypass, setShowBypass] = useState(false);
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
        description: `Welcome back, ${user.name}!`,
      });
      if (user.role === 'admin') {
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

  const handleStudentBypass = async () => {
    setLoading(true);
    try {
      const user = await login('alex.doe@university.edu', 'password123');
      toast({
        title: 'Bypass Successful',
        description: `Logged in as ${user.name} for debugging.`,
      });
      router.push('/');
    } catch (err: any) {
      setError('Bypass login failed.');
      toast({
        variant: 'destructive',
        title: 'Bypass Login Failed',
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleAdminBypass = async () => {
    setLoading(true);
    try {
      const user = await login('admin.one@university.edu', 'adminpass');
      toast({
        title: 'Bypass Successful',
        description: `Logged in as ${user.name} for debugging.`,
      });
      router.push('/admin/dashboard');
    } catch (err: any) {
      setError('Bypass login failed.');
      toast({
        variant: 'destructive',
        title: 'Bypass Login Failed',
        description: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 -z-10"></div>
      
      <Card className="w-full max-w-sm bg-white/30 backdrop-blur-lg border-white/40 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BookCopy className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline text-foreground">CourseCraft</CardTitle>
          <CardDescription>Sign in to access your dashboard</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
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
            {showBypass && (
              <>
                <p className="text-xs text-muted-foreground pt-2">Debug Options</p>
                <Button type="button" variant="secondary" className="w-full" onClick={handleStudentBypass} disabled={loading}>
                  Bypass as Student
                </Button>
                <Button type="button" variant="secondary" className="w-full" onClick={handleAdminBypass} disabled={loading}>
                  Bypass as Admin
                </Button>
              </>
            )}
             <Separator className="my-2" />
             <div className="w-full flex justify-end">
                <Button variant="ghost" size="icon" onClick={() => setShowBypass(!showBypass)} className="h-7 w-7 text-muted-foreground">
                    <Settings className="h-4 w-4" />
                </Button>
             </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
