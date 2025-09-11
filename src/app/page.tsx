
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import StudentDashboard from '@/components/student-dashboard';

export default function DashboardPage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else if (user.role === 'admin') {
            router.push('/admin/dashboard');
        } else if (user.role === 'techy') {
            router.push('/techy/dashboard');
        }
    }, [user, router]);

    // Render a loading state or null while redirecting
    if (!user || user.role !== 'student') {
        return <div className="flex items-center justify-center min-h-screen">Authenticating...</div>;
    }

    // If the user is a student, render the student dashboard
    return <StudentDashboard />;
}
