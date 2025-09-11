'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';
import type { Course, User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Shield, BookCopy, Users, BarChart, Settings, LogOut, Edit, Trash2, AlertTriangle, UserCog } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [updatedCourseData, setUpdatedCourseData] = useState<{ credits: number; description: string }>({ credits: 0, description: '' });

  const [isManageUserDialogOpen, setIsManageUserDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [updatedUserRole, setUpdatedUserRole] = useState<'student' | 'admin'>('student');


  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else if (user.role !== 'admin') {
      router.push('/');
    } else {
      fetchAdminData();
    }
  }, [user, router]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [coursesRes, usersRes] = await Promise.all([
        fetch('/api/courses'),
        fetch('/api/users'),
      ]);
      const coursesData = await coursesRes.json();
      const usersData = await usersRes.json();
      setCourses(coursesData);
      setUsers(usersData);
    } catch (error) {
      console.error('Failed to fetch admin data', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch admin data.',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleEditCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setUpdatedCourseData({ credits: course.credits, description: course.description });
    setIsEditDialogOpen(true);
  };

  const handleUpdateCourse = () => {
    if (!selectedCourse) return;
    const updatedCourses = courses.map(c =>
      c.id === selectedCourse.id ? { ...c, ...updatedCourseData } : c
    );
    setCourses(updatedCourses);

    toast({
      title: 'Success!',
      description: `Course ${selectedCourse.code} has been updated.`,
    });
    setIsEditDialogOpen(false);
    setSelectedCourse(null);
  };
  
  const handleDeleteCourse = (courseId: string) => {
    setCourses(courses.filter(c => c.id !== courseId));
    toast({
      title: 'Course Removed',
      description: 'The course has been removed from the list.',
    });
  };
  
  const handleManageUserClick = (userToManage: User) => {
    setSelectedUser(userToManage);
    setUpdatedUserRole(userToManage.role);
    setIsManageUserDialogOpen(true);
  };

  const handleUpdateUserRole = () => {
    if (!selectedUser) return;
    const updatedUsers = users.map(u =>
      u.id === selectedUser.id ? { ...u, role: updatedUserRole } : u
    );
    setUsers(updatedUsers);

    toast({
      title: 'User Role Updated',
      description: `${selectedUser.profile.name}'s role has been changed to ${updatedUserRole}.`,
    });
    setIsManageUserDialogOpen(false);
    setSelectedUser(null);
  };


  if (!user || user.role !== 'admin') {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  const conflictCourses = courses.slice(0, 3);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 border-b bg-background/80 backdrop-blur-sm md:px-6">
        <div className="flex items-center gap-4">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight font-headline">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
           <span className="text-sm font-medium text-muted-foreground hidden sm:inline-block">{user.profile.name}</span>
           <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
           </Button>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <Tabs defaultValue="courses">
          <TabsList className="mb-4">
            <TabsTrigger value="courses"><BookCopy className="mr-2 h-4 w-4" />Course Management</TabsTrigger>
            <TabsTrigger value="users"><Users className="mr-2 h-4 w-4" />User Management</TabsTrigger>
            <TabsTrigger value="conflicts"><AlertTriangle className="mr-2 h-4 w-4" />Conflict Monitoring</TabsTrigger>
          </TabsList>
          
          <TabsContent value="courses">
            <Card>
              <CardHeader>
                <CardTitle>All Courses</CardTitle>
                <CardDescription>View, edit, or remove courses from the catalog.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Credits</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell><Skeleton className="h-5 w-20" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                          <TableCell><Skeleton className="h-5 w-16" /></TableCell>
                          <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      courses.map((course) => (
                        <TableRow key={course.id}>
                          <TableCell className="font-code font-semibold">{course.code}</TableCell>
                          <TableCell>{course.title}</TableCell>
                          <TableCell>{course.department}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditCourseClick(course)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteCourse(course.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>User Accounts</CardTitle>
                <CardDescription>Manage all registered user accounts.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                     {loading ? (
                      Array.from({ length: 5 }).map((_, i) => (
                        <TableRow key={i}>
                          <TableCell><div className="flex items-center gap-4"><Skeleton className="h-10 w-10 rounded-full" /><Skeleton className="h-5 w-32" /></div></TableCell>
                          <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                          <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
                          <TableCell className="text-right"><Skeleton className="h-8 w-24 ml-auto" /></TableCell>
                        </TableRow>
                      ))
                    ) : (
                      users.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <Avatar>
                                <AvatarImage src={u.profile.avatar} alt={u.profile.name} />
                                <AvatarFallback>{u.profile.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{u.profile.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>{u.email}</TableCell>
                          <TableCell>
                            <Badge variant={u.role === 'admin' ? 'destructive' : 'secondary'}>
                              {u.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                             <Button variant="outline" size="sm" onClick={() => handleManageUserClick(u)} disabled={user?.id === u.id}>
                               <UserCog className="h-4 w-4 mr-2" />
                               Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="conflicts">
            <Card>
              <CardHeader>
                <CardTitle>Scheduling Conflict Monitoring</CardTitle>
                <CardDescription>A read-only view of potential scheduling conflicts. This is a simplified mock-up.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-amber-50 border-amber-200">
                  <div className="flex items-start">
                    <AlertTriangle className="h-6 w-6 text-amber-600 mr-3" />
                    <div>
                      <h4 className="font-bold text-amber-800">Faculty Double-Booking Alert</h4>
                      <p className="text-sm text-amber-700">Dr. Isaac Newton is scheduled for both <span className="font-semibold">Calculus I (MATH 150)</span> and <span className="font-semibold">Classical Mechanics (PHY 100)</span> on Mondays at 10:00 AM.</p>
                    </div>
                  </div>
                </div>
                 <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">High-Conflict Courses</CardTitle>
                    <CardDescription>These courses are frequently involved in student scheduling conflicts.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Course</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead className="text-right">Conflict Rate</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {conflictCourses.map((course, index) => (
                             <TableRow key={course.id}>
                               <TableCell className="font-semibold font-code">{course.code}: <span className="font-sans font-normal">{course.title}</span></TableCell>
                               <TableCell>{course.department}</TableCell>
                               <TableCell className="text-right font-medium text-destructive">{[25, 18, 12][index]}%</TableCell>
                             </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                  </CardContent>
                 </Card>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </main>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Course: {selectedCourse?.code}</DialogTitle>
            <DialogDescription>
              Make changes to the course details here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="credits" className="text-right">
                Credits
              </Label>
              <Input
                id="credits"
                type="number"
                value={updatedCourseData.credits}
                onChange={(e) => setUpdatedCourseData({ ...updatedCourseData, credits: parseInt(e.target.value, 10) || 0 })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
               <textarea
                 id="description"
                 value={updatedCourseData.description}
                 onChange={(e) => setUpdatedCourseData({ ...updatedCourseData, description: e.target.value })}
                 className="col-span-3 min-h-[100px] p-2 border rounded-md"
               />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleUpdateCourse}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isManageUserDialogOpen} onOpenChange={setIsManageUserDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Manage User: {selectedUser?.profile.name}</DialogTitle>
            <DialogDescription>
              Update user details here. Click save to apply changes.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="user-role" className="text-right">
                Role
              </Label>
              <Select value={updatedUserRole} onValueChange={(value: 'student' | 'admin') => setUpdatedUserRole(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsManageUserDialogOpen(false)}>Cancel</Button>
            <Button type="submit" onClick={handleUpdateUserRole}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
