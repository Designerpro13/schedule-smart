import type { SystemLog, SupportTicket } from './types';
import { format } from 'date-fns';

const now = new Date();

export const mockLogs: SystemLog[] = [
  {
    id: 'log001',
    timestamp: format(new Date(now.getTime() - 2 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss'),
    level: 'INFO',
    message: 'User `alex.doe@university.edu` logged in successfully.',
    user: 'alex.doe@university.edu',
  },
  {
    id: 'log002',
    timestamp: format(new Date(now.getTime() - 5 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss'),
    level: 'WARN',
    message: 'API endpoint `/api/courses` slow response: 1500ms.',
    user: 'System',
  },
  {
    id: 'log003',
    timestamp: format(new Date(now.getTime() - 10 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss'),
    level: 'ERROR',
    message: 'Failed to process payment for user `casey.jones@university.edu`. Gateway timeout.',
    user: 'casey.jones@university.edu',
  },
  {
    id: 'log004',
    timestamp: format(new Date(now.getTime() - 12 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss'),
    level: 'DEBUG',
    message: 'Checking for timetable conflicts for user `brian.smith@university.edu`.',
    user: 'brian.smith@university.edu',
  },
  {
    id: 'log005',
    timestamp: format(new Date(now.getTime() - 15 * 60 * 1000), 'yyyy-MM-dd HH:mm:ss'),
    level: 'INFO',
    message: 'Admin `admin.one@university.edu` updated course `CS 101`.',
    user: 'admin.one@university.edu',
  },
];

export const mockTickets: SupportTicket[] = [
  {
    id: 'TKT-001',
    subject: 'Cannot access my timetable',
    requester: 'Diana Prince',
    requester_email: 'diana.prince@university.edu',
    submitted: format(new Date(now.getTime() - 2 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm'),
    status: 'Open',
  },
  {
    id: 'TKT-002',
    subject: 'Course credits not updating',
    requester: 'Edward Nygma',
    requester_email: 'edward.nygma@university.edu',
    submitted: format(new Date(now.getTime() - 24 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm'),
    status: 'In Progress',
  },
  {
    id: 'TKT-003',
    subject: 'Login page is slow',
    requester: 'Admin Two',
    requester_email: 'admin.two@university.edu',
    submitted: format(new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm'),
    status: 'Closed',
  },
  {
    id: 'TKT-004',
    subject: 'Faculty list is not showing all professors',
    requester: 'Casey Jones',
    requester_email: 'casey.jones@university.edu',
    submitted: format(new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd HH:mm'),
    status: 'Resolved',
  },
];
