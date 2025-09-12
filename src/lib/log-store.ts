import type { SystemLog } from './types';
import { format } from 'date-fns';

// In-memory store for logs. In a real application, this would be a database.
let dynamicLogs: SystemLog[] = [];

// Function to add a new log entry
export const addLog = (message: string, level: SystemLog['level'], user: string) => {
  const newLog: SystemLog = {
    id: `log_dyn_${Date.now()}`,
    timestamp: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
    level,
    message,
    user,
  };
  dynamicLogs.unshift(newLog); // Add to the beginning of the array
};

// Function to get all logs
export const getLogs = (staticLogs: SystemLog[]): SystemLog[] => {
  // Combine static and dynamic logs and sort them by timestamp
  const allLogs = [...dynamicLogs, ...staticLogs];
  allLogs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  return allLogs;
};
