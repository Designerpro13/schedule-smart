
export interface UserProfile {
    name: string;
    avatar: string;
    semester: string;
    major: string;
    year: string;
    creditsCompleted: number;
    creditsRequired: number;
}

export interface User {
    id: string;
    email: string;
    password: string; // In a real app, this would be a hash
    role: 'student' | 'admin';
    profile: UserProfile;
}

export const users: User[] = [
    // Students
    {
        id: 'stu001',
        email: 'alex.doe@university.edu',
        password: 'password123',
        role: 'student',
        profile: {
            name: 'Alex Doe',
            avatar: 'https://picsum.photos/seed/alexdoe/150/150',
            semester: 'Fall 2024',
            major: 'Computer Science',
            year: '3rd Year',
            creditsCompleted: 78,
            creditsRequired: 120,
        },
    },
    {
        id: 'stu002',
        email: 'brian.smith@university.edu',
        password: 'password123',
        role: 'student',
        profile: {
            name: 'Brian Smith',
            avatar: 'https://picsum.photos/seed/briansmith/150/150',
            semester: 'Fall 2024',
            major: 'Physics',
            year: '2nd Year',
            creditsCompleted: 45,
            creditsRequired: 120,
        },
    },
    {
        id: 'stu003',
        email: 'casey.jones@university.edu',
        password: 'password123',
        role: 'student',
        profile: {
            name: 'Casey Jones',
            avatar: 'https://picsum.photos/seed/caseyjones/150/150',
            semester: 'Fall 2024',
            major: 'Humanities',
            year: '4th Year',
            creditsCompleted: 110,
            creditsRequired: 120,
        },
    },
    {
        id: 'stu004',
        email: 'diana.prince@university.edu',
        password: 'password123',
        role: 'student',
        profile: {
            name: 'Diana Prince',
            avatar: 'https://picsum.photos/seed/dianaprince/150/150',
            semester: 'Fall 2024',
            major: 'Mathematics',
            year: '3rd Year',
            creditsCompleted: 82,
            creditsRequired: 120,
        },
    },
    {
        id: 'stu005',
        email: 'edward.nygma@university.edu',
        password: 'password123',
        role: 'student',
        profile: {
            name: 'Edward Nygma',
            avatar: 'https://picsum.photos/seed/edwardnygma/150/150',
            semester: 'Fall 2024',
            major: 'Computer Science',
            year: '1st Year',
            creditsCompleted: 15,
            creditsRequired: 120,
        },
    },
    // Admins
    {
        id: 'adm001',
        email: 'admin.one@university.edu',
        password: 'adminpass',
        role: 'admin',
        profile: {
            name: 'Admin One',
            avatar: 'https://picsum.photos/seed/adminone/150/150',
            semester: 'N/A',
            major: 'Administration',
            year: 'Staff',
            creditsCompleted: 0,
            creditsRequired: 0,
        },
    },
    {
        id: 'adm002',
        email: 'admin.two@university.edu',
        password: 'adminpass',
        role: 'admin',
        profile: {
            name: 'Admin Two',
            avatar: 'https://picsum.photos/seed/admintwo/150/150',
            semester: 'N/A',
            major: 'Administration',
            year: 'Staff',
            creditsCompleted: 0,
            creditsRequired: 0,
        },
    },
];
