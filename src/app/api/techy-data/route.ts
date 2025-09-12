
import { NextResponse } from 'next/server';
import { mockLogs, mockTickets } from '@/lib/techy-data';
import { getLogs } from '@/lib/log-store';

export async function GET() {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const allLogs = getLogs(mockLogs);
  
  return NextResponse.json({ logs: allLogs, tickets: mockTickets });
}
